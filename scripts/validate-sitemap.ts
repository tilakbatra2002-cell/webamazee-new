/**
 * Automated sitemap validation.
 *
 * Reconstructs the PREVIOUS flat sitemap URL set (exactly as the removed
 * `src/app/sitemap.ts` produced it), then computes the NEW split-sitemap URL
 * set from `@/lib/sitemap` and reports:
 *
 *   - per-category counts
 *   - total unique URLs
 *   - duplicates
 *   - malformed URLs
 *   - non-production domains (localhost, Vercel previews, etc.)
 *   - http:// URLs
 *   - www / non-www inconsistencies
 *   - trailing-slash variants
 *   - sitemap URLs (the .xml children) accidentally included as page URLs
 *   - old-vs-new comparison: removed / added URLs
 *
 * Run: npx tsx --tsconfig tsconfig.json scripts/validate-sitemap.ts
 */
import { sitemapContent } from "@/data";
import { site } from "@/lib/site";
import {
  buildSitemapIndex,
  getCategoryEntriesByFilename,
  SITEMAP_CATEGORIES,
  MAX_URLS_PER_SITEMAP,
} from "@/lib/sitemap";

const BASE = site.url; // https://www.webamazee.com

// ---- Reconstruct the OLD flat sitemap URL set (before this change) --------
function oldSitemapUrls(): string[] {
  const base = BASE;
  const s = sitemapContent();

  const staticPages = s.staticPaths.map((path) => `${base}${path === "/" ? "" : path}`);
  const servicePages = s.serviceSlugs.map((slug) => `${base}/services/${slug}`);
  const blogPages = s.blogSlugs.map((slug) => `${base}/blog/${slug}`);
  const csPages = s.caseStudySlugs.map((slug) => `${base}/case-studies/${slug}`);
  const workPages = s.portfolioSlugs.map((slug) => `${base}/work/${slug}`);
  const prodPages = s.productSlugs.map((slug) => `${base}/products/${slug}`);
  const locPages = s.locationSlugs.map((slug) => `${base}/${slug}`);
  const locHubPages = s.locationHubSlugs.map((slug) => `${base}/${slug}`);
  const indPages = s.industrySlugs.map((slug) => `${base}/${slug}`);

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...csPages,
    ...workPages,
    ...prodPages,
    ...locPages,
    ...locHubPages,
    ...indPages,
  ];
}

// ---- Compute the NEW split-sitemap URL set ---------------------------------
type CategoryResult = { filename: string; urls: string[] };

function newSitemapCategoryResults(): CategoryResult[] {
  const results: CategoryResult[] = [];
  for (const cat of SITEMAP_CATEGORIES) {
    const entries = getCategoryEntriesByFilename(cat.filename);
    results.push({ filename: cat.filename, urls: entries.map((e) => e.loc) });
  }
  return results;
}

// ---- Normalisation helpers -------------------------------------------------
function stripTrailingSlash(url: string): string {
  if (url === `${BASE}/`) return BASE;
  return url.replace(/\/+$/, "");
}
const canonicalForm = (url: string) => stripTrailingSlash(url.replace(/^https:\/\/www\./, "https://"));

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && !!u.hostname;
  } catch {
    return false;
  }
}

// ---- Validation ------------------------------------------------------------
function main() {
  const oldUrls = oldSitemapUrls();
  const categories = newSitemapCategoryResults();
  const index = buildSitemapIndex();

  // Flatten new URLs
  const newUrls: string[] = [];
  for (const c of categories) newUrls.push(...c.urls);

  // Duplicates
  const oldDupes = oldUrls.length - new Set(oldUrls.map(canonicalForm)).size;
  const newDupes = newUrls.length - new Set(newUrls.map(canonicalForm)).size;

  // Malformed / invalid
  const invalidNew = newUrls.filter((u) => !isValidUrl(u));

  // Non-production domains
  const nonProd = newUrls.filter(
    (u) => !/^https:\/\/www\.webamazee\.com\//.test(u.replace(/^https:\/\/www\.webamazee\.com$/, "https://www.webamazee.com/")),
  );

  // http URLs
  const httpUrls = newUrls.filter((u) => u.startsWith("http://"));

  // non-www (excluding base which is www)
  const nonWww = newUrls.filter((u) => /^https:\/\/[^/]/.test(u) && !u.includes("www.webamazee.com"));

  // trailing slash variants
  const trailingSlash = newUrls.filter((u) => u !== `${BASE}` && /\/$/.test(u));

  // sitemap files accidentally included as normal page URLs
  const sitemapAsPage = newUrls.filter((u) => /\.xml$/.test(new URL(u).pathname));

  // old vs new set comparison (canonical form)
  const oldSet = new Set(oldUrls.map(canonicalForm));
  const newSet = new Set(newUrls.map(canonicalForm));
  const removed = [...oldSet].filter((u) => !newSet.has(u));
  const added = [...newSet].filter((u) => !oldSet.has(u));

  console.log("================ SITEMAP VALIDATION REPORT ================");
  console.log("Canonical base:", BASE);
  console.log("Max URLs per sitemap:", MAX_URLS_PER_SITEMAP);
  console.log("");

  console.log("--- Category breakdown (new architecture) ---");
  let totalUrls = 0;
  for (const c of categories) {
    totalUrls += c.urls.length;
    console.log(`  ${c.filename.padEnd(28)} ${String(c.urls.length).padStart(4)} URLs`);
  }
  console.log(`  TOTAL (with per-file entries)             ${String(totalUrls).padStart(4)} URLs`);
  console.log("");

  console.log("--- Sitemap index children ---");
  index.forEach((i) => console.log("  " + i.loc));

  console.log("");
  console.log("--- Checks ---");
  console.log("Old sitemap URLs (flat, previous):", oldUrls.length);
  console.log("New combined sitemap URLs:", newUrls.length);
  console.log("Unique URLs (new, canonical):", newSet.size);
  console.log("Duplicates (old):", oldDupes);
  console.log("Duplicates (new):", newDupes);
  console.log("Malformed/invalid URLs (new):", invalidNew.length, invalidNew.length ? invalidNew : "");
  console.log("Non-production-domain URLs (new):", nonProd.length, nonProd.length ? nonProd : "");
  console.log("http:// URLs (new):", httpUrls.length, httpUrls.length ? httpUrls : "");
  console.log("Non-www URLs (new):", nonWww.length, nonWww.length ? nonWww : "");
  console.log("Trailing-slash variants (new):", trailingSlash.length, trailingSlash.length ? trailingSlash : "");
  console.log("Sitemap .xml files wrongly in page lists (new):", sitemapAsPage.length, sitemapAsPage.length ? sitemapAsPage : "");

  console.log("");
  console.log("--- Old vs New comparison ---");
  console.log("URLs REMOVED:", removed.length);
  removed.forEach((u) => console.log("  - " + u));
  console.log("URLs ADDED:", added.length);
  added.forEach((u) => console.log("  + " + u));

  console.log("");
  const passed =
    newDupes === 0 &&
    invalidNew.length === 0 &&
    nonProd.length === 0 &&
    httpUrls.length === 0 &&
    nonWww.length === 0 &&
    trailingSlash.length === 0 &&
    sitemapAsPage.length === 0 &&
    removed.length === 0 &&
    added.length === 0;
  console.log(passed ? "RESULT: PASS ✓" : "RESULT: FAIL ✗");
}

main();
