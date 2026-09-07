import { getCategoryEntriesByFilename, buildUrlsetXml, xmlResponseHeaders } from "@/lib/sitemap";

/** Generated category sitemap — https://www.webamazee.com/sitemap-pages.xml (force-static). */
export const dynamic = "force-static";

export function GET() {
  const entries = getCategoryEntriesByFilename("sitemap-pages.xml");
  return new Response(buildUrlsetXml(entries), { headers: xmlResponseHeaders() });
}
