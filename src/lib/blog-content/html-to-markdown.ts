/**
 * Converts pasted rich HTML (Word, Google Docs, ChatGPT, CMS output) into the
 * Markdown dialect used by `block-markdown.ts`.
 *
 * Runs in the browser against a detached DOM (no `innerHTML` on the live
 * document), so pasted markup can never execute scripts or styles.
 *
 * Normalisation rules:
 *  - <style>, <meta>, <script>, <link>, comments (except our own cms hints),
 *    Word `o:*` / `w:*` attributes, inline styles, fonts and colours are dropped.
 *  - h1/h2 -> H2, h3 -> H3, h4-h6 -> H3 (editor supports two heading depths).
 *  - strong/b -> **bold**, em/i -> *italic*, a -> [text](href), img -> image block.
 *  - ul/ol -> list items, table -> table block, blockquote -> quote.
 *  - Custom blocks produced by our own renderer are detected:
 *      aside/figure/div with class "callout", div "cta", div "checklist",
 *      pre > code[class^=language-], nav "toc".
 *  - Empty paragraphs (typical Word spacer <p>&nbsp;</p>) are dropped, which the
 *    product decision explicitly allows.
 */

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "META",
  "LINK",
  "TITLE",
  "HEAD",
  "NOSCRIPT",
  "TEMPLATE",
  "SVG",
  "IFRAME",
  "OBJECT",
  "EMBED",
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "FORM",
]);

const BLOCK_TAGS = new Set([
  "ADDRESS",
  "ARTICLE",
  "ASIDE",
  "BLOCKQUOTE",
  "DIV",
  "DL",
  "FIELDSET",
  "FIGCAPTION",
  "FIGURE",
  "FOOTER",
  "FORM",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "HEADER",
  "HR",
  "LI",
  "MAIN",
  "NAV",
  "OL",
  "P",
  "PRE",
  "SECTION",
  "TABLE",
  "TBODY",
  "TD",
  "TFOOT",
  "TH",
  "THEAD",
  "TR",
  "UL",
]);

function isAllCapsShout(text: string): boolean {
  const letters = text.replace(/[^A-Za-z]/g, "");
  return letters.length > 3 && letters === letters.toUpperCase();
}

function escapeLinkText(text: string): string {
  return text.replace(/[[\]]/g, "").trim();
}

/** Inline content → markdown, one line (newlines collapsed to spaces). */
const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

function inlineToMarkdown(node: Node): string {
  if (node.nodeType === TEXT_NODE) {
    return (node.nodeValue ?? "").replace(/\s+/g, " ");
  }
  if (node.nodeType !== ELEMENT_NODE) return "";

  const el = node as Element;
  const tag = el.tagName.toUpperCase();
  if (SKIP_TAGS.has(tag)) return "";

  if (tag === "BR") return "\n";

  const children = () => Array.from(el.childNodes).map(inlineToMarkdown).join("");

  const style = (el.getAttribute("style") ?? "").toLowerCase();
  const styleBold = /font-weight\s*:\s*(bold|[6-9]00)/.test(style) || /font-weight\s*:\s*bolder/.test(style);
  const styleItalic = /font-style\s*:\s*italic/.test(style);

  if ((styleBold || styleItalic) && tag !== "STRONG" && tag !== "B" && tag !== "EM" && tag !== "I") {
    const inner = children().trim();
    if (!inner) return "";
    let out = inner;
    if (styleBold && !(out.startsWith("**") && out.endsWith("**"))) out = `**${out}**`;
    if (styleItalic) out = out.startsWith("*") && !out.startsWith("**") ? out : `*${out}*`;
    return out;
  }

  if (tag === "STRONG" || tag === "B") {
    const inner = children().trim();
    if (!inner) return "";
    // Collapse nested bold produced by Word style spans
    return inner.startsWith("**") && inner.endsWith("**") ? inner : `**${inner}**`;
  }
  if (tag === "EM" || tag === "I") {
    const inner = children().trim();
    if (!inner) return "";
    if (inner.startsWith("*") && inner.endsWith("*") && !inner.startsWith("**")) return inner;
    return `*${inner}*`;
  }
  if (tag === "CODE") {
    const inner = el.textContent ?? "";
    if (!inner.trim()) return "";
    const fence = inner.includes("`") ? "``" : "`";
    return `${fence}${inner}${fence}`;
  }
  if (tag === "A") {
    const href = (el.getAttribute("href") ?? "").trim();
    const inner = children().trim();
    if (!inner) return "";
    if (!href || href.startsWith("javascript:") || href.startsWith("data:")) return inner;
    return `[${escapeLinkText(inner)}](${href})`;
  }
  if (tag === "IMG") {
    const src = (el.getAttribute("src") ?? "").trim();
    const alt = (el.getAttribute("alt") ?? "").trim() || "Article image";
    if (!src) return "";
    return `\u0000IMG:${src}\u0000${alt}\u0000`;
  }
  if (tag === "SUP" || tag === "SUB") {
    return children().trim();
  }

  return children();
}

function textOf(node: Node): string {
  return (node.textContent ?? "").replace(/\u00a0/g, " ").trim();
}

function hasClass(el: Element, name: string): boolean {
  return (el.getAttribute("class") ?? "").split(/\s+/).includes(name);
}

interface Context {
  out: string[];
  imgCounter: number;
}

function pushBlank(ctx: Context) {
  if (ctx.out.length > 0 && ctx.out[ctx.out.length - 1] !== "") ctx.out.push("");
}

function pushBlock(ctx: Context, markdown: string) {
  const md = markdown.trim();
  if (!md) return;
  pushBlank(ctx);
  ctx.out.push(md);
  pushBlank(ctx);
}

function listToMarkdown(list: Element, ctx: Context, depth = 0): void {
  const ordered = list.tagName.toUpperCase() === "OL";
  const start = Number(list.getAttribute("start") ?? "1") || 1;
  let index = 0;
  Array.from(list.children).forEach((child) => {
    if (child.tagName.toUpperCase() !== "LI") return;
    const own: string[] = [];
    const nested: Element[] = [];
    Array.from(child.childNodes).forEach((node) => {
      if (node.nodeType === ELEMENT_NODE) {
        const el = node as Element;
        const t = el.tagName.toUpperCase();
        if (t === "UL" || t === "OL") {
          nested.push(el);
          return;
        }
      }
      own.push(inlineToMarkdown(node));
    });
    const text = own.join("").replace(/\s+/g, " ").trim();
    if (text) {
      const indent = "  ".repeat(depth);
      const marker = ordered ? `${start + index}.` : "-";
      ctx.out.push(`${indent}${marker} ${text}`);
      index += 1;
    }
    nested.forEach((n) => listToMarkdown(n, ctx, depth + 1));
  });
  pushBlank(ctx);
}

function tableToMarkdown(table: Element, ctx: Context): void {
  const rows = Array.from(table.querySelectorAll("tr"));
  if (rows.length === 0) return;

  const matrix = rows.map((row) =>
    Array.from(row.querySelectorAll("th,td")).map((cell) =>
      textOf(cell).replace(/\|/g, "\\|").replace(/\s+/g, " ")
    )
  );

  const headerRow = rows[0].querySelector("th") ? matrix[0] : null;
  const head = headerRow ?? matrix[0].map((_, i) => `Column ${i + 1}`);
  const body = headerRow ? matrix.slice(1) : matrix.slice(1);

  if (head.length === 0) return;

  const lines = [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...body.map((row) => {
      const cells = [...row];
      while (cells.length < head.length) cells.push("");
      return `| ${cells.slice(0, head.length).join(" | ")} |`;
    }),
  ];

  pushBlock(ctx, lines.join("\n"));
}

function quoteToMarkdown(el: Element, ctx: Context): void {
  const clone = el.cloneNode(true) as Element;
  // Split trailing citation (<footer> / <cite>) into a cite line
  const citeEl = clone.querySelector("footer, cite");
  const cite = citeEl ? textOf(citeEl).replace(/^[—–-]\s*/, "") : "";

  const paragraphs: string[] = [];
  Array.from(clone.children).forEach((child) => {
    const tag = child.tagName.toUpperCase();
    if (tag === "FOOTER" || tag === "CITE") return;
    if (tag === "P" || BLOCK_TAGS.has(tag)) {
      const md = inlineToMarkdown(child).replace(/\s+/g, " ").trim();
      if (md) paragraphs.push(md);
    }
  });
  if (paragraphs.length === 0) {
    const fallback = textOf(clone);
    if (!fallback) return;
    paragraphs.push(fallback);
  }

  const body = paragraphs.join("\n").trim();
  const lines = body.split("\n").map((l) => `> ${l}`);
  if (cite) {
    lines.push(">", `> — ${cite}`);
  }
  ctx.out.push(lines.join("\n"));
  pushBlank(ctx);
}

function codeToMarkdown(pre: Element, ctx: Context): void {
  const codeEl = pre.querySelector("code");
  const raw = (codeEl?.textContent ?? pre.textContent ?? "").replace(/\s+$/, "");
  if (!raw.trim()) return;
  const className = codeEl?.getAttribute("class") ?? pre.getAttribute("class") ?? "";
  const lang = className.match(/language-([\w+-]+)/)?.[1] ?? "";
  pushBlock(ctx, `\`\`\`${lang}\n${raw}\n\`\`\``);
}

/** Detects blocks emitted by our own RichContent renderer. */
function customBlockToMarkdown(el: Element, ctx: Context): boolean {
  const tag = el.tagName.toUpperCase();

  if (tag === "ASIDE" && hasClass(el, "callout")) {
    const title = textOf(el.querySelector("p") ?? el).replace(/^\w[\w ]*·\s*/, "");
    const paragraphs = Array.from(el.querySelectorAll("p")).slice(1);
    const text = paragraphs.map((p) => inlineToMarkdown(p).trim()).join("\n\n");
    const variant =
      (el.getAttribute("data-variant") as string | null) ??
      (hasClass(el, "tip") ? "tip" : hasClass(el, "warning") ? "warning" : "info");
    pushBlock(
      ctx,
      `:::callout{title="${escapeAttrValue(title || "Note")}" variant="${variant}"}\n${text}\n:::`
    );
    return true;
  }

  if (hasClass(el, "cta")) {
    const title = textOf(el.querySelector("h2,h3,p") ?? el);
    const link = el.querySelector("a");
    const button = textOf(link ?? el);
    const href = link?.getAttribute("href") ?? "";
    const paragraphs = Array.from(el.querySelectorAll("p")).map((p) => inlineToMarkdown(p).trim());
    const text = paragraphs.filter((p) => p && p !== title).join("\n\n");
    pushBlock(
      ctx,
      `:::cta{title="${escapeAttrValue(title || "Need help?")}" button="${escapeAttrValue(
        button || "Contact us"
      )}"${href ? ` href="${escapeAttrValue(href)}"` : ""}}\n${text}\n:::`
    );
    return true;
  }

  if (hasClass(el, "checklist")) {
    const title = textOf(el.querySelector("h4,h3,h2") ?? el).replace(/\s+/g, " ");
    const items = Array.from(el.querySelectorAll("li")).map((li) => textOf(li));
    if (items.length === 0) return false;
    pushBlock(
      ctx,
      `:::checklist${title ? `{title="${escapeAttrValue(title)}"}` : ""}\n${items
        .map((i) => `- ${i}`)
        .join("\n")}\n:::`
    );
    return true;
  }

  if (tag === "NAV" && el.querySelector('a[href^="#"]')) {
    const items: { text: string; id: string; level: 2 | 3 }[] = [];
    el.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = (a.getAttribute("href") ?? "").replace(/^#/, "");
      const text = textOf(a);
      if (id && text) items.push({ text, id, level: 2 });
    });
    if (items.length > 0) {
      pushBlock(
        ctx,
        `:::toc{title="Table of Contents"}\n${items
          .map((i) => `- [${i.text}](#${i.id})`)
          .join("\n")}\n:::`
      );
      return true;
    }
  }

  return false;
}

function escapeAttrValue(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\s+/g, " ").trim();
}

function walk(node: Node, ctx: Context): void {
  if (node.nodeType === TEXT_NODE) {
    const text = (node.nodeValue ?? "").replace(/\u00a0/g, " ").trim();
    if (text) ctx.out.push(text);
    return;
  }
  if (node.nodeType !== ELEMENT_NODE) return;

  const el = node as Element;
  const tag = el.tagName.toUpperCase();
  if (SKIP_TAGS.has(tag)) return;

  if (customBlockToMarkdown(el, ctx)) return;

  if (tag === "H1" || tag === "H2") {
    const md = inlineToMarkdown(el).replace(/\s+/g, " ").trim();
    if (!md) return;
    // Word/Google Docs wrap the document title in <h1>/<h2> with full bold.
    // The article page owns the H1, so keep the title as a bold lead paragraph.
    const fullyBold = /^\*\*[\s\S]+\*\*$/.test(md);
    if (fullyBold || isAllCapsShout(md)) pushBlock(ctx, md);
    else pushBlock(ctx, `## ${md}`);
    return;
  }
  if (tag === "H3") {
    const md = inlineToMarkdown(el).replace(/\s+/g, " ").trim();
    if (md && !isAllCapsShout(md)) pushBlock(ctx, `### ${md}`);
    return;
  }
  if (tag === "H4" || tag === "H5" || tag === "H6") {
    const md = inlineToMarkdown(el).replace(/\s+/g, " ").trim();
    if (md && !isAllCapsShout(md)) pushBlock(ctx, `### ${md}`);
    return;
  }
  if (tag === "P") {
    const md = inlineToMarkdown(el)
      .split("\n")
      .map((line) => line.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" ");
    if (md) pushBlock(ctx, md);
    return;
  }
  if (tag === "UL" || tag === "OL") {
    listToMarkdown(el as HTMLUListElement, ctx);
    return;
  }
  if (tag === "TABLE") {
    tableToMarkdown(el, ctx);
    return;
  }
  if (tag === "BLOCKQUOTE") {
    quoteToMarkdown(el, ctx);
    return;
  }
  if (tag === "PRE") {
    codeToMarkdown(el, ctx);
    return;
  }
  if (tag === "HR") {
    pushBlank(ctx);
    return;
  }
  if (tag === "IMG") {
    const src = (el.getAttribute("src") ?? "").trim();
    const alt = (el.getAttribute("alt") ?? "").trim() || "Article image";
    if (src) pushBlock(ctx, `![${alt.replace(/\]/g, "")}](${src})`);
    return;
  }

  // Structural containers: recurse, treating inline runs as a paragraph
  const containsBlockChild = Array.from(el.children).some((child) =>
    BLOCK_TAGS.has(child.tagName.toUpperCase())
  );

  if (containsBlockChild || tag === "BODY" || tag === "HTML" || tag === "DIV" ||
      tag === "SECTION" || tag === "ARTICLE" || tag === "MAIN" || tag === "HEADER" ||
      tag === "FOOTER" || tag === "FIGURE" || tag === "SPAN" || tag === "FONT") {
    Array.from(el.childNodes).forEach((child) => walk(child, ctx));
    return;
  }

  const md = inlineToMarkdown(el).replace(/\s+/g, " ").trim();
  if (md) pushBlock(ctx, md);
}

/**
 * Converts pasted HTML into editor Markdown.
 * Returns "" when the markup contains no usable text.
 */
export function htmlToMarkdown(html: string): string {
  if (typeof globalThis.DOMParser === "undefined") return "";
  if (!html || !html.includes("<")) return "";

  const doc = new globalThis.DOMParser().parseFromString(html, "text/html");
  const ctx: Context = { out: [], imgCounter: 0 };

  const root = doc.body ?? doc.documentElement;
  if (!root) return "";

  Array.from(root.childNodes).forEach((child) => walk(child, ctx));

  return ctx.out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Turns an <img> markdown token into a standalone image line. */
export function normaliseImageMarkdown(markdown: string): string {
  return markdown.replace(/\u0000IMG:([^\u0000]+)\u0000([^\u0000]*)\u0000/g, (_m, src, alt) =>
    `![${String(alt).trim() || "Article image"}](${String(src).trim()})`
  );
}
