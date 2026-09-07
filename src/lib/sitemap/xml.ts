/**
 * Minimal, spec-correct XML serializers for the sitemap protocol.
 *
 * We build the XML by hand (instead of relying on the framework's single
 * flat-sitemap metadata route) so we can emit a valid `<sitemapindex>` AND
 * multiple child `<urlset>` files, while keeping `lastmod`, `changefreq` and
 * `priority` only when they are genuinely supported / present.
 */
import type { SitemapEntry } from "./config";

/** Escape XML special characters (5 predefined entities). */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Serialize a single <url> element from an entry. */
function urlElement(entry: SitemapEntry): string {
  const lines = ["  <url>", `    <loc>${escapeXml(entry.loc)}</loc>`];
  if (entry.lastmod) lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
  if (entry.changefreq) lines.push(`    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`);
  if (entry.priority !== undefined) {
    lines.push(`    <priority>${entry.priority.toFixed(1)}</priority>`);
  }
  lines.push("  </url>");
  return lines.join("\n");
}

/** Serialize a full `<urlset>` XML document. */
export function buildUrlsetXml(entries: SitemapEntry[]): string {
  const body = entries.map(urlElement).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

/** Serialize a `<sitemapindex>` XML document from a list of child sitemap URLs. */
export function buildSitemapIndexXml(childLocs: string[]): string {
  const body = childLocs
    .map((loc) => "  <sitemap>\n    <loc>" + escapeXml(loc) + "</loc>\n  </sitemap>")
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>`;
}

/** Shared response headers for XML sitemap responses. */
export function xmlResponseHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    "X-Content-Type-Options": "nosniff",
  };
}
