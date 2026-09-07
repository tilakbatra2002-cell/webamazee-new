/**
 * Live sitemap validation — fetches and parses the actual generated sitemap
 * files over HTTP, then runs all the required checks against the SERVED output
 * (not just the in-memory data model).
 *
 *   Run: npx tsx --tsconfig tsconfig.json scripts/validate-sitemap-http.ts
 *   Args: BASE_URL (default http://localhost:3100)
 */
import { sitemapContent } from "@/data";
import { site } from "@/lib/site";

const BASE = process.argv[2] ?? "http://localhost:3100";
const PROD = site.url;
const FILES = [
  "sitemap.xml",
  "sitemap-pages.xml",
  "sitemap-posts.xml",
  "sitemap-services.xml",
  "sitemap-case-studies.xml",
  "sitemap-work.xml",
  "sitemap-products.xml",
  "sitemap-location.xml",
  "sitemap-industry.xml",
];

const canonicalForm = (url: string) =>
  url.replace(/^https:\/\/www\./, "https://").replace(/\/+$/, "");

async function fetchXml(path: string): Promise<string> {
  const res = await fetch(`${BASE}/${path}`);
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`);
  const text = await res.text();
  if (!res.headers.get("content-type")?.includes("xml")) {
    throw new Error(`${path} → wrong content-type`);
  }
  return text;
}

function extractLocs(xml: string, tag: "url" | "sitemap"): string[] {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
  const out: string[] = [];
  let match;
  while ((match = re.exec(xml)) !== null) {
    const loc = match[1].match(/<loc>([\s\S]*?)<\/loc>/)?.[1] ?? "";
    out.push(loc);
  }
  return out;
}

function oldSitemapUrls(): string[] {
  const s = sitemapContent();
  const base = PROD;
  return [
    ...s.staticPaths.map((p) => `${base}${p === "/" ? "" : p}`),
    ...s.serviceSlugs.map((slug) => `${base}/services/${slug}`),
    ...s.blogSlugs.map((slug) => `${base}/blog/${slug}`),
    ...s.caseStudySlugs.map((slug) => `${base}/case-studies/${slug}`),
    ...s.portfolioSlugs.map((slug) => `${base}/work/${slug}`),
    ...s.productSlugs.map((slug) => `${base}/products/${slug}`),
    ...s.locationSlugs.map((slug) => `${base}/${slug}`),
    ...s.locationHubSlugs.map((slug) => `${base}/${slug}`),
    ...s.industrySlugs.map((slug) => `${base}/${slug}`),
  ];
}

async function main() {
  console.log("=== LIVE SITEMAP HTTP VALIDATION ===");
  console.log("Fetched from:", BASE);

  const indexXml = await fetchXml("sitemap.xml");
  const indexLocs = extractLocs(indexXml, "sitemap");
  const expectedChildren = FILES.slice(1).map((f) => `${PROD}/${f}`);
  const indexMissing = expectedChildren.filter((c) => !indexLocs.includes(c));

  // Fetch every child and collect URLs
  const childUrlSets: Record<string, string[]> = {};
  for (const file of FILES.slice(1)) {
    const xml = await fetchXml(file);
    childUrlSets[file] = extractLocs(xml, "url");
  }

  const allUrls = Object.values(childUrlSets).flat();
  const canonicalUrls = allUrls.map(canonicalForm);
  const dupes = allUrls.length - new Set(canonicalUrls).size;

  const invalid = allUrls.filter((u) => {
    try {
      const parsed = new URL(u);
      return parsed.protocol !== "https:" || !parsed.hostname;
    } catch {
      return true;
    }
  });
  const httpUrls = allUrls.filter((u) => u.startsWith("http://"));
  const nonProd = allUrls.filter((u) => !u.startsWith(PROD));
  const trailingSlash = allUrls.filter((u) => u !== PROD && /\/$/.test(u));
  const sitemapAsPage = allUrls.filter((u) => /\.xml$/.test(new URL(u).pathname));

  const oldSet = new Set(oldSitemapUrls().map(canonicalForm));
  const newSet = new Set(canonicalUrls);
  const removed = [...oldSet].filter((u) => !newSet.has(u));
  const added = [...newSet].filter((u) => !oldSet.has(u));

  console.log("\n--- Per-sitemap URL counts (as served) ---");
  for (const [file, urls] of Object.entries(childUrlSets)) {
    console.log(`  ${file.padEnd(28)} ${String(urls.length).padStart(4)}`);
  }
  console.log(`  TOTAL                          ${String(allUrls.length).padStart(4)}`);

  console.log("\n--- Sitemap index children (as served) ---");
  indexLocs.forEach((l) => console.log("  " + l));
  console.log("  Index missing expected children:", indexMissing.length, indexMissing.length ? indexMissing : "");

  console.log("\n--- Checks ---");
  console.log("Duplicate URLs:", dupes, dupes ? "→ CHECK" : "→ OK");
  console.log("Malformed/invalid URLs:", invalid.length, invalid.length ? invalid : "→ OK");
  console.log("http:// URLs:", httpUrls.length, httpUrls.length ? httpUrls : "→ OK");
  console.log("Non-production-domain URLs:", nonProd.length, nonProd.length ? nonProd : "→ OK");
  console.log("Trailing-slash variants:", trailingSlash.length, trailingSlash.length ? trailingSlash : "→ OK");
  console.log("Sitemap .xml files in page lists:", sitemapAsPage.length, sitemapAsPage.length ? sitemapAsPage : "→ OK");

  console.log("\n--- Old vs New ---");
  console.log("Removed:", removed.length, removed.length ? removed : "→ none");
  console.log("Added:", added.length, added.length ? added : "→ none");

  const passed =
    indexMissing.length === 0 &&
    dupes === 0 &&
    invalid.length === 0 &&
    httpUrls.length === 0 &&
    nonProd.length === 0 &&
    trailingSlash.length === 0 &&
    sitemapAsPage.length === 0 &&
    removed.length === 0 &&
    added.length === 0;
  console.log("\n" + (passed ? "RESULT: PASS ✓" : "RESULT: FAIL ✗"));
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
