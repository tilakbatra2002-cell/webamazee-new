import { buildSitemapIndex, buildSitemapIndexXml, xmlResponseHeaders } from "@/lib/sitemap";

/**
 * Public sitemap entry point — /sitemap.xml
 *
 * A valid XML <sitemapindex> referencing the category child sitemaps. The path
 * is unchanged so existing references (robots.txt, Search Console, etc.) keep
 * working. Prerendered at build time (force-static).
 */
export const dynamic = "force-static";

export function GET() {
  const children = buildSitemapIndex().map((c) => c.loc);
  return new Response(buildSitemapIndexXml(children), { headers: xmlResponseHeaders() });
}
