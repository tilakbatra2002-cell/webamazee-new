/**
 * Sitemap module — public entry point for the XML sitemap architecture.
 *
 * Every XML sitemap file (the `/sitemap.xml` index plus the category children)
 * is generated from the content registries via this module. There are no
 * hand-maintained URL lists anywhere.
 */
export {
  BASE_URL,
  MAX_URLS_PER_SITEMAP,
  SITEMAP_CATEGORIES,
  humanDateToIso,
  buildSitemapIndex,
  getCategoryEntriesByFilename,
} from "./config";
export type { SitemapEntry } from "./config";
export {
  escapeXml,
  buildUrlsetXml,
  buildSitemapIndexXml,
  xmlResponseHeaders,
} from "./xml";
