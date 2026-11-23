import type { ContentBlock } from "@/lib/blog-types";
import { slugify } from "@/lib/cms/slugify";

/**
 * Block ⇄ Markdown conversion used by the single-pane article editor.
 *
 * Design goals:
 *  - Lossless for every block type the CMS stores (paragraph, heading, list,
 *    checklist, quote, code, callout, table, cta, image, toc).
 *  - Human editable: the editor shows plain Markdown, so an entire article can
 *    be pasted and edited in one surface.
 *  - Round-trip safe: `blocksToMarkdown()` → `markdownToBlocks()` returns
 *    semantically identical blocks for all migrated content.
 *
 * Enhanced fenced markers keep custom blocks editable without inventing a new
 * database schema:
 *
 *   :::callout{title="…" variant="tip"}
 *   body text
 *   :::
 *   :::cta{title="…" button="…" href="/contact"}
 *   description
 *   :::
 *   :::checklist{title="…"}
 *   - item
 *   :::
 *
 * Plain HTML comments (invisible in most editors) are emitted next to blocks
 * that would otherwise lose attributes:
 *
 *   <!--cms:image width="1200" height="630" caption="…"-->
 *   ![alt](src)
 */

const CALLOUT_MARKER_RE = /^:::callout(\{[^}]*\})?\s*$/;
const CTA_MARKER_RE = /^:::cta(\{[^}]*\})?\s*$/;
const CHECKLIST_MARKER_RE = /^:::checklist(\{[^}]*\})?\s*$/;
const BLOCK_END_RE = /^:::\s*$/;

type AttrMap = Record<string, string>;

function escapeAttr(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
}

function buildAttrs(attrs: AttrMap): string {
  const parts = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}="${escapeAttr(v)}"`);
  return parts.length > 0 ? `{${parts.join(" ")}}` : "";
}

function parseAttrs(raw?: string): AttrMap {
  const out: AttrMap = {};
  if (!raw) return out;
  const inner = raw.replace(/^\{\s*/, "").replace(/\s*\}$/, "");
  const re = /([a-zA-Z][\w-]*)\s*=\s*"((?:\\"|[^"])*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner)) !== null) {
    out[m[1].toLowerCase()] = m[2]
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .trim();
  }
  return out;
}

function markerName(line: string): "callout" | "cta" | "checklist" | null {
  if (CALLOUT_MARKER_RE.test(line)) return "callout";
  if (CTA_MARKER_RE.test(line)) return "cta";
  if (CHECKLIST_MARKER_RE.test(line)) return "checklist";
  return null;
}

/* ------------------------------------------------------------------ */
/* Blocks → Markdown                                                   */
/* ------------------------------------------------------------------ */

export function blockToMarkdown(block: ContentBlock): string {
  switch (block.type) {
    case "paragraph":
      return block.text.trim();
    case "heading": {
      const level = block.level === 3 ? "###" : "##";
      const text = block.text.trim();
      const explicit = block.id?.trim() ?? "";
      // Existing articles link to hand-written anchors (e.g. #remote-code-execution).
      // Keep them attached to the heading via an invisible comment; the server
      // still derives fresh, unique anchors when no explicit id is present.
      const needsAnchor = explicit.length > 0 && explicit !== slugify(text);
      const anchor = needsAnchor ? `<!--cms:h id="${escapeAttr(explicit)}"-->\n` : "";
      return `${anchor}${level} ${text}`;
    }
    case "list":
      return block.items
        .map((item, i) => (block.ordered ? `${i + 1}. ${item.trim()}` : `- ${item.trim()}`))
        .join("\n");
    case "checklist": {
      const header = `:::checklist${buildAttrs({ title: block.title ?? "" })}`;
      return [header, ...block.items.map((item) => `- ${item.trim()}`), ":::"].join("\n");
    }
    case "quote": {
      const body = block.text
        .trim()
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
      return block.cite ? `${body}\n>\n> — ${block.cite.trim()}` : body;
    }
    case "code": {
      const lang = block.language?.trim() || "";
      return `\`\`\`${lang}\n${block.code.replace(/\s+$/, "")}\n\`\`\``;
    }
    case "callout": {
      const header = `:::callout${buildAttrs({
        title: block.title ?? "",
        variant: block.variant ?? "info",
      })}`;
      return [header, block.text.trim(), ":::"].join("\n");
    }
    case "table": {
      const escCell = (c: string) => c.replace(/\n/g, " ").replace(/\|/g, "\\|").trim();
      const head = `| ${block.head.map(escCell).join(" | ")} |`;
      const divider = `| ${block.head.map(() => "---").join(" | ")} |`;
      const rows = block.rows.map((row) => {
        const cells = row.map(escCell);
        while (cells.length < block.head.length) cells.push("");
        return `| ${cells.slice(0, block.head.length).join(" | ")} |`;
      });
      return [head, divider, ...rows].join("\n");
    }
    case "cta": {
      const header = `:::cta${buildAttrs({
        title: block.title ?? "",
        button: block.button ?? "",
        href: block.href ?? "",
      })}`;
      return [header, block.text.trim(), ":::"].join("\n");
    }
    case "image": {
      const meta = buildAttrs({
        width: block.width ? String(block.width) : "",
        height: block.height ? String(block.height) : "",
        caption: block.caption ?? "",
      });
      const comment = meta ? `<!--cms:image ${meta}-->` : "";
      const image = `![${block.alt.replace(/\]/g, "")}](${block.src})`;
      return comment ? `${comment}\n${image}` : image;
    }
    case "toc": {
      const header = `:::toc${buildAttrs({ title: block.title ?? "Table of Contents" })}`;
      const items = block.items.map(
        (item) => `${item.level === 3 ? "  " : ""}- [${item.text}](#${item.id})`
      );
      return [header, ...items, ":::"].join("\n");
    }
    default:
      return "";
  }
}

export function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks
    .map(blockToMarkdown)
    .map((chunk) => chunk.replace(/\n{3,}/g, "\n\n").trim())
    .filter(Boolean)
    .join("\n\n");
}

/* ------------------------------------------------------------------ */
/* Markdown → Blocks                                                   */
/* ------------------------------------------------------------------ */

function headingLevel(line: string): 2 | 3 | 4 | null {
  const m = line.match(/^(#{2,4})\s+(.*)$/);
  if (!m) return null;
  const len = m[1].length;
  return len === 2 ? 2 : len === 3 ? 3 : 4;
}

function isTableDivider(line: string): boolean {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function isTableRow(line: string): boolean {
  const t = line.trim();
  return t.startsWith("|") && t.endsWith("|") && t.length > 2;
}

function splitTableRow(line: string): string[] {
  const inner = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let current = "";
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (ch === "\\" && inner[i + 1] === "|") {
      current += "|";
      i += 1;
      continue;
    }
    if (ch === "|") {
      cells.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current.trim());
  return cells;
}

function isBlockStart(line: string, next: string | undefined): boolean {
  if (!line.trim()) return true;
  if (/^#{2,4}\s+/.test(line)) return true;
  if (/^```/.test(line)) return true;
  if (markerName(line.trim())) return true;
  if (BLOCK_END_RE.test(line.trim())) return true;
  if (/^<!--cms:image\b/.test(line.trim())) return true;
  if (/^>\s?/.test(line)) return true;
  if (/^[-*+]\s+/.test(line)) return true;
  if (/^\d+[.)]\s+/.test(line)) return true;
  if (isTableRow(line) && next !== undefined && isTableDivider(next)) return true;
  return false;
}

export function markdownToBlocks(markdown: string): ContentBlock[] {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;
  let pendingImageMeta: AttrMap | null = null;
  let pendingHeadingId: string | null = null;

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.trim();

    if (!line) {
      i += 1;
      continue;
    }

    // Heading anchor comment emitted for legacy hand-written IDs
    const anchorMatch = line.match(/^<!--cms:h\s*id="((?:\\"|[^"])*)"\s*-->$/);
    if (anchorMatch) {
      pendingHeadingId = anchorMatch[1].replace(/\\"/g, '"').trim();
      i += 1;
      continue;
    }

    // Image attribute comment
    const metaMatch = line.match(/^<!--cms:image\s*(\{[^}]*\})?\s*-->$/);
    if (metaMatch) {
      pendingImageMeta = metaMatch[1] ? parseAttrs(metaMatch[1]) : {};
      i += 1;
      continue;
    }

    // Enhanced blocks
    const marker = markerName(line);
    if (marker) {
      const attrs = parseAttrs(line.match(/:::(\w+)(\{[^}]*\})?/)?.[2]);
      i += 1;
      const body: string[] = [];
      while (i < lines.length && !BLOCK_END_RE.test(lines[i].trim())) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1; // consume closing :::

      if (marker === "callout") {
        blocks.push({
          type: "callout",
          title: attrs.title || "Note",
          text: body.join("\n").trim(),
          variant:
            attrs.variant === "tip" ||
            attrs.variant === "warning" ||
            attrs.variant === "highlight" ||
            attrs.variant === "info"
              ? attrs.variant
              : "info",
        });
      } else if (marker === "cta") {
        blocks.push({
          type: "cta",
          title: attrs.title || "Need help?",
          text: body.join("\n").trim(),
          button: attrs.button || "Contact us",
          ...(attrs.href ? { href: attrs.href } : {}),
        });
      } else if (marker === "checklist") {
        const items = body
          .map((l) => l.trim())
          .filter((l) => /^[-*+]\s+/.test(l) || l.length > 0)
          .map((l) => l.replace(/^[-*+]\s+/, "").trim())
          .filter(Boolean);
        blocks.push({
          type: "checklist",
          ...(attrs.title ? { title: attrs.title } : {}),
          items: items.length > 0 ? items : [""],
        });
      }
      continue;
    }

    // Inline TOC marker
    if (/^:::toc(\{[^}]*\})?\s*$/.test(line)) {
      const attrs = parseAttrs(line.match(/\{([^}]*)\}/)?.[1]);
      i += 1;
      const body: string[] = [];
      while (i < lines.length && !BLOCK_END_RE.test(lines[i].trim())) {
        body.push(lines[i]);
        i += 1;
      }
      i += 1;
      const items = body
        .join("\n")
        .split("\n")
        .filter((l) => l.trim().length > 0)
        .map((l) => {
          const m = l.match(/^\s*-?\s*\[([^\]]+)\]\(#([^)]+)\)$/);
          if (!m) return null;
          const indented = /^\s{2,}/.test(l);
          return { text: m[1].trim(), id: m[2].trim(), level: (indented ? 3 : 2) as 2 | 3 };
        })
        .filter((x): x is { text: string; id: string; level: 2 | 3 } => Boolean(x));
      if (items.length > 0) {
        blocks.push({
          type: "toc",
          ...(attrs.title ? { title: attrs.title } : {}),
          items,
        });
      }
      continue;
    }

    // Headings
    const level = headingLevel(line);
    if (level !== null) {
      const text = line.replace(/^#{2,4}\s+/, "").trim();
      if (text) {
        blocks.push({
          type: "heading",
          text,
          level: level === 3 ? 3 : 2,
          ...(pendingHeadingId && pendingHeadingId !== slugify(text)
            ? { id: pendingHeadingId }
            : {}),
        });
      }
      pendingHeadingId = null;
      i += 1;
      continue;
    }

    // H1 pasted from another editor → treated as H2 (page renders its own H1)
    if (/^#\s+/.test(line)) {
      const text = line.replace(/^#\s+/, "").trim();
      if (text) blocks.push({ type: "heading", text, level: 2 });
      pendingHeadingId = null;
      i += 1;
      continue;
    }

    // Fenced code
    const fence = line.match(/^```(\w[\w+-]*)?\s*$/);
    if (fence) {
      i += 1;
      const code: string[] = [];
      while (i < lines.length && !/^```\s*$/.test(lines[i].trim())) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({
        type: "code",
        ...(fence[1] ? { language: fence[1] } : {}),
        code: code.join("\n").replace(/\s+$/, ""),
      });
      continue;
    }

    // Table
    if (isTableRow(line) && lines[i + 1] !== undefined && isTableDivider(lines[i + 1])) {
      const head = splitTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        const cells = splitTableRow(lines[i]);
        while (cells.length < head.length) cells.push("");
        rows.push(cells.slice(0, head.length));
        i += 1;
      }
      if (rows.length === 0) rows.push(head.map(() => ""));
      blocks.push({ type: "table", head, rows });
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      let cite: string | undefined;
      let textLines = quoteLines;
      const lastIndex = quoteLines.length - 1;
      const citeMatch = quoteLines[lastIndex]?.match(/^[—–-]\s*(.+)$/);
      if (citeMatch && quoteLines.slice(0, lastIndex).some((l) => l.trim() === "")) {
        cite = citeMatch[1].trim();
        textLines = quoteLines.slice(0, lastIndex).filter((l, idx, arr) => !(idx === arr.length - 1 && !l.trim()));
      }
      blocks.push({
        type: "quote",
        text: textLines.join("\n").trim(),
        ...(cite ? { cite } : {}),
      });
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    // Standalone image
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (imageMatch) {
      const meta = pendingImageMeta ?? {};
      const width = meta.width ? Number(meta.width) : undefined;
      const height = meta.height ? Number(meta.height) : undefined;
      blocks.push({
        type: "image",
        src: imageMatch[2].trim(),
        alt: imageMatch[1].trim() || "Article image",
        ...(Number.isFinite(width) && width ? { width } : {}),
        ...(Number.isFinite(height) && height ? { height } : {}),
        ...(meta.caption ? { caption: meta.caption } : {}),
      });
      pendingImageMeta = null;
      i += 1;
      continue;
    }

    // Paragraph: consume until the next block start
    const paragraphLines: string[] = [line];
    i += 1;
    while (i < lines.length) {
      const nextLine = lines[i];
      const following = lines[i + 1];
      if (!nextLine.trim()) break;
      if (isBlockStart(nextLine, following)) break;
      // Upgraded: markdown image on its own line = its own block
      if (/^!\[([^\]]*)\]\(([^)\s]+)\)$/.test(nextLine.trim())) break;
      paragraphLines.push(nextLine);
      i += 1;
    }
    blocks.push({ type: "paragraph", text: paragraphLines.join("\n").trim() });
  }

  return blocks.filter((block) => {
    if (block.type === "paragraph") return block.text.length > 0;
    if (block.type === "heading") return block.text.length > 0;
    return true;
  });
}
