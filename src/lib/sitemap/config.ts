/**
 * Central sitemap configuration — a single source of truth for the XML sitemap
 * architecture.
 *
 * DESIGN
 * ------
 * The public entry point remains `/sitemap.xml` (unchanged). It is now a
 * valid XML `<sitemapindex>` that references one child sitemap per content
 * category (pages, posts, services, case studies, work, products, location,
 * industry). Every child sitemap is generated from the SAME content
 * registries that power the website, so adding a new blog post, service,
 * case study, work item, product, location or industry page automatically
 * appears in the relevant sitemap without any manual URL lists.
 *
 * SCALING
 * -------
 * If any single category grows beyond `MAX_URLS_PER_SITEMAP` (the sitemap
 * protocol's 50,000 URL cap) the category is transparently split into
 * multiple chunks. The sitemap index is built from the chunked output, so the
 * architecture keeps working without hardcoding the assumption that a category
 * will always fit in one file.
 */
import { sitemapContent, posts, getPost } from "@/data";
import { site } from "@/lib/site";

/** Canonical production domain — the ONLY origin allowed in these sitemaps. */
export const BASE_URL = site.url;

/** Official sitemap protocol hard limit (Google / Bing). */
export const MAX_URLS_PER_SITEMAP = 50000;

const MONTHLY = "monthly";
const WEEKLY = "weekly";

export type SitemapEntry = {
  /** Full canonical URL (absolutely qualified, no trailing slash). */
  loc: string;
  /** W3C lastmod date (YYYY-MM-DD). Only set from real content data. */
  lastmod?: string;
  /** Sitemap <changefreq> hint. */
  changefreq?: string;
  /** Sitemap <priority> hint (0.0 – 1.0). */
  priority?: number;
};

export type SitemapCategory = {
  /** Stable key (used for internal chunk naming only). */
  key: string;
  /** The child sitemap filename, e.g. "sitemap-pages.xml". */
  filename: string;
  /** Returns ALL entries for the category (single source of truth). */
  entries: () => SitemapEntry[];
};

/** Absolute canonical URL from a site-relative path ("/" stays as root). */
function absUrl(path: string): string {
  if (path === "/") return BASE_URL;
  const clean = path.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${BASE_URL}/${clean}`;
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/**
 * Convert a human date like "Aug 31, 2026" into a W3C date (YYYY-MM-DD).
 * Returns undefined when the string is not a reliably parseable date, so we
 * never fabricate a `lastmod`.
 */
export function humanDateToIso(value?: string): string | undefined {
  if (!value) return undefined;
  const match = value.match(/^([A-Za-z]{3})\.?\s+(\d{1,2}),?\s+(\d{4})$/);
  if (!match) return undefined;
  const month = MONTHS[match[1].slice(0, 3).toLowerCase()];
  if (!month) return undefined;
  const day = String(Number(match[2])).padStart(2, "0");
  const year = match[3];
  return `${year}-${String(month).padStart(2, "0")}-${day}`;
}

// ---------------------------------------------------------------------------
// Per-category entry generators
// ---------------------------------------------------------------------------

function pageEntries(): SitemapEntry[] {
  return sitemapContent().staticPaths.map((path) => ({
    loc: absUrl(path),
    changefreq: path === "/" ? WEEKLY : MONTHLY,
    priority: path === "/" ? 1.0 : 0.8,
  }));
}

function postEntries(): SitemapEntry[] {
  return sitemapContent().blogSlugs.map((slug) => {
    const post = getPost(slug) ?? posts.find((p) => p.slug === slug);
    return {
      loc: absUrl(`/blog/${slug}`),
      // Use the real published date from content data only; never invent one.
      lastmod: humanDateToIso(post?.date),
      changefreq: MONTHLY,
      priority: 0.7,
    };
  });
}

function serviceEntries(): SitemapEntry[] {
  return sitemapContent().serviceSlugs.map((slug) => ({
    loc: absUrl(`/services/${slug}`),
    changefreq: MONTHLY,
    priority: 0.9,
  }));
}

function caseStudyEntries(): SitemapEntry[] {
  return sitemapContent().caseStudySlugs.map((slug) => ({
    loc: absUrl(`/case-studies/${slug}`),
    changefreq: MONTHLY,
    priority: 0.8,
  }));
}

function workEntries(): SitemapEntry[] {
  return sitemapContent().portfolioSlugs.map((slug) => ({
    loc: absUrl(`/work/${slug}`),
    changefreq: MONTHLY,
    priority: 0.8,
  }));
}

function productEntries(): SitemapEntry[] {
  return sitemapContent().productSlugs.map((slug) => ({
    loc: absUrl(`/products/${slug}`),
    changefreq: MONTHLY,
    priority: 0.8,
  }));
}

/**
 * Location / local-SEO pages and regional service hubs. Both come from the
 * location registries (`allLocationPages` + `locationHubs`), which are the
 * genuine geo-targeted landing pages in the repository.
 */
function locationEntries(): SitemapEntry[] {
  const { locationSlugs, locationHubSlugs } = sitemapContent();
  const pages: SitemapEntry[] = locationSlugs.map((slug) => ({
    loc: absUrl(`/${slug}`),
    changefreq: MONTHLY,
    priority: 0.8,
  }));
  const hubs: SitemapEntry[] = locationHubSlugs.map((slug) => ({
    loc: absUrl(`/${slug}`),
    changefreq: MONTHLY,
    priority: 0.9,
  }));
  return [...pages, ...hubs];
}

function industryEntries(): SitemapEntry[] {
  return sitemapContent().industrySlugs.map((slug) => ({
    loc: absUrl(`/${slug}`),
    changefreq: MONTHLY,
    priority: 0.8,
  }));
}

// ---------------------------------------------------------------------------
// Category registry — the sitemap index is generated from this.
// ---------------------------------------------------------------------------

export const SITEMAP_CATEGORIES: SitemapCategory[] = [
  { key: "pages", filename: "sitemap-pages.xml", entries: pageEntries },
  { key: "posts", filename: "sitemap-posts.xml", entries: postEntries },
  { key: "services", filename: "sitemap-services.xml", entries: serviceEntries },
  { key: "case-studies", filename: "sitemap-case-studies.xml", entries: caseStudyEntries },
  { key: "work", filename: "sitemap-work.xml", entries: workEntries },
  { key: "products", filename: "sitemap-products.xml", entries: productEntries },
  { key: "location", filename: "sitemap-location.xml", entries: locationEntries },
  { key: "industry", filename: "sitemap-industry.xml", entries: industryEntries },
];

/** Split a flat entry list into chunks no larger than the protocol limit. */
export function chunkEntries(entries: SitemapEntry[]): SitemapEntry[][] {
  const out: SitemapEntry[][] = [];
  for (let i = 0; i < entries.length; i += MAX_URLS_PER_SITEMAP) {
    out.push(entries.slice(i, i + MAX_URLS_PER_SITEMAP));
  }
  return out.length === 0 ? [[]] : out;
}

/**
 * The child sitemap files the `<sitemapindex>` must reference.
 *
 * Each category maps to one or more files. When a category has more than
 * `MAX_URLS_PER_SITEMAP` entries it is split into `-2`, `-3`, … chunks and
 * every chunk is listed. With the current (small) content set every category
 * resolves to exactly one file.
 */
export function buildSitemapIndex(): { loc: string }[] {
  const children: { loc: string }[] = [];
  for (const cat of SITEMAP_CATEGORIES) {
    const all = cat.entries();
    if (all.length === 0) continue; // never create empty sitemaps
    const chunks = chunkEntries(all);
    chunks.forEach((_chunk, index) => {
      const filename = index === 0 ? cat.filename : `${cat.filename.replace(/\.xml$/, "")}-${index + 1}.xml`;
      children.push({ loc: `${BASE_URL}/${filename}` });
    });
  }
  return children;
}

/** Convenience: return the (single) URL set for a child sitemap filename. */
export function getCategoryEntriesByFilename(filename: string): SitemapEntry[] {
  const cat = SITEMAP_CATEGORIES.find((c) => c.filename === filename);
  if (!cat) return [];
  return cat.entries();
}
