import { getCategoryEntriesByFilename, buildUrlsetXml, xmlResponseHeaders } from "@/lib/sitemap";

/** Generated category sitemap — https://www.webamazee.com/sitemap-case-studies.xml (force-static). */
export const dynamic = "force-static";

export function GET() {
  const entries = getCategoryEntriesByFilename("sitemap-case-studies.xml");
  return new Response(buildUrlsetXml(entries), { headers: xmlResponseHeaders() });
}
