/** Lightweight HTML inspection used by the SEO audit engine. */

export function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function attr(tag: string, name: string): string | null {
  const re = new RegExp(`\\b${name}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i");
  const m = re.exec(tag);
  return m ? m[2].trim() : null;
}

function eachOpenTag(html: string, tagName: string, cb: (full: string) => void): void {
  const re = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) cb(m[0]);
}

export function getMeta(html: string, name: string): string | null {
  let found: string | null = null;
  eachOpenTag(html, "meta", (tag) => {
    if (found) return;
    const n = (attr(tag, "name") || attr(tag, "property") || "").toLowerCase();
    if (n === name.toLowerCase()) found = attr(tag, "content");
  });
  return found;
}

export function extractTitle(html: string): string | null {
  const m = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!m) return null;
  const text = stripTags(m[1]);
  return text || null;
}

export function extractCanonical(html: string): string | null {
  let found: string | null = null;
  eachOpenTag(html, "link", (tag) => {
    if (found) return;
    const rel = (attr(tag, "rel") || "").toLowerCase();
    if (rel.split(/\s+/).includes("canonical")) found = attr(tag, "href");
  });
  return found;
}

export function extractLang(html: string): string | null {
  const m = /<html\b[^>]*>/i.exec(html);
  if (!m) return null;
  return attr(m[0], "lang");
}

export function extractViewport(html: string): string | null {
  return getMeta(html, "viewport");
}

export function headingInfo(html: string): {
  tags: { tag: string; text: string; isEmpty: boolean }[];
  empty: number;
  h1Count: number;
  h1Text: string | null;
  h2Count: number;
  h3Count: number;
} {
  const tags: { tag: string; text: string; isEmpty: boolean }[] = [];
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const text = stripTags(m[2]);
    tags.push({ tag: `h${m[1]}`, text, isEmpty: text.length === 0 });
  }
  const h1s = tags.filter((t) => t.tag === "h1");
  return {
    tags,
    empty: tags.filter((t) => t.isEmpty).length,
    h1Count: h1s.length,
    h1Text: h1s.find((t) => !t.isEmpty)?.text ?? null,
    h2Count: tags.filter((t) => t.tag === "h2").length,
    h3Count: tags.filter((t) => t.tag === "h3").length,
  };
}

export function wordCount(html: string): number {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");
  const text = stripTags(cleaned);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

export function countImages(html: string): { total: number; missingAlt: number } {
  let total = 0;
  let missingAlt = 0;
  eachOpenTag(html, "img", (tag) => {
    total += 1;
    if (attr(tag, "alt") === null) missingAlt += 1;
  });
  return { total, missingAlt };
}

export function countLinks(
  html: string,
  pageUrl: URL
): { internal: number; external: number } {
  let internal = 0;
  let external = 0;
  eachOpenTag(html, "a", (tag) => {
    const href = attr(tag, "href");
    if (!href) return;
    const lower = href.toLowerCase();
    if (
      lower.startsWith("#") ||
      lower.startsWith("mailto:") ||
      lower.startsWith("tel:") ||
      lower.startsWith("javascript:") ||
      lower.startsWith("data:")
    ) {
      return;
    }
    let target: URL;
    try {
      target = new URL(href, pageUrl);
    } catch {
      return;
    }
    if (target.hostname === pageUrl.hostname) internal += 1;
    else external += 1;
  });
  return { internal, external };
}

function collectJsonLdTypes(node: unknown, types: Set<string>): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) collectJsonLdTypes(item, types);
    return;
  }
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") types.add(t);
  else if (Array.isArray(t)) {
    for (const item of t) if (typeof item === "string") types.add(item);
  }
  if (obj["@graph"]) collectJsonLdTypes(obj["@graph"], types);
}

export function extractSchemaTypes(html: string): string[] {
  const types = new Set<string>();
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    try {
      collectJsonLdTypes(JSON.parse(m[1].trim()), types);
    } catch {
      // Ignore invalid JSON-LD. Detection is not validation.
    }
  }
  const micro = /itemtype=["']https?:\/\/schema\.org\/([A-Za-z0-9]+)["']/gi;
  while ((m = micro.exec(html)) !== null) types.add(m[1]);
  return [...types];
}

export function hasMixedContent(html: string, isHttps: boolean): boolean {
  if (!isHttps) return false;
  return /<(?:img|script|iframe|source|video|audio|embed|object)\b[^>]+\b(?:src|data)=["']http:\/\//i.test(
    html
  ) || /<link\b[^>]+\bhref=["']http:\/\//i.test(html);
}

export function hasAboutSignal(html: string): boolean {
  return /<a\b[^>]*href=["'][^"']*(?:\/about(?:-us)?|\/our-story|\/who-we-are)[^"']*["']/i.test(
    html
  );
}

export function hasContactSignal(html: string): boolean {
  if (/mailto:/i.test(html) || /tel:/i.test(html)) return true;
  if (/<a\b[^>]*href=["'][^"']*\/contact(?:-us)?[^"']*["']/i.test(html)) return true;
  return /(?:\+?\d[\d\s().-]{7,}\d)/.test(stripTags(html).slice(0, 20_000));
}

export function hasAuthorSignal(html: string): boolean {
  if (getMeta(html, "author")) return true;
  if (/<a\b[^>]*rel=["'][^"']*\bauthor\b/i.test(html)) return true;
  if (/itemprop=["']author["']/i.test(html)) return true;
  return false;
}

export function hasFaqSignal(html: string, schemaTypes: string[]): boolean {
  if (schemaTypes.some((t) => /faq/i.test(t))) return true;
  return /<(?:h1|h2|h3)\b[^>]*>\s*(?:faqs?|frequently asked questions)/i.test(html);
}

export function countOccurrences(html: string, re: RegExp): number {
  return (html.match(re) || []).length;
}

export function parseRobotsSitemaps(robotsText: string, base: URL): string[] {
  const urls: string[] = [];
  for (const line of robotsText.split(/\r?\n/)) {
    const m = /^\s*sitemap\s*:\s*(\S+)/i.exec(line);
    if (!m) continue;
    try {
      urls.push(new URL(m[1].trim(), base).href);
    } catch {
      // skip
    }
  }
  return urls;
}

export function robotsBlocksAll(robotsText: string): boolean {
  const lower = robotsText.toLowerCase();
  return /user-agent\s*:\s*\*\s*[\s\S]*?disallow\s*:\s*\/\s*(?:$|#|\n)/i.test(lower);
}
