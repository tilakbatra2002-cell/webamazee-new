/**
 * Centralized content registry.
 *
 * All content types (services, blogs, case studies, portfolio, FAQs,
 * testimonials) flow through this single module. Metadata, structured data,
 * canonical URLs, OpenGraph/Twitter tags and sitemap entries are all derived
 * here — so adding content to the underlying data files automatically updates
 * every SEO output without editing individual page files.
 *
 * CMS-ready: swap the underlying `getAll*` imports for a Sanity / Payload /
 * Strapi / Contentful client and the rest of the architecture is unchanged.
 */
import { services, getService } from "@/lib/services";
import { posts, getAllPosts, getPost } from "@/lib/blogs";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { projects, getProject } from "@/lib/portfolio";
import { faqs } from "@/lib/faqs";
import { testimonials } from "@/lib/testimonials";
import { products, getProduct, getAllProducts } from "@/lib/products";
import { allLocationPages as locationPages, getAllLocationPages, getLocationPage } from "@/lib/locations";
import { industries, getIndustry, getAllIndustries } from "@/lib/industries";
import { locationHubs, getLocationHub } from "@/lib/location-hubs";
import { site } from "@/lib/site";
import type { SeoEntry } from "@/lib/seo";

// Re-export the raw content for components (single import point).
export {
  services,
  getService,
  posts,
  getAllPosts,
  getPost,
  caseStudies,
  getCaseStudy,
  projects,
  getProject,
  faqs,
  testimonials,
  products,
  getProduct,
  getAllProducts,
  locationPages,
  getAllLocationPages,
  getLocationPage,
  industries,
  getIndustry,
  getAllIndustries,
  locationHubs,
  getLocationHub,
};

const keywordsFrom = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9+, ]/g, "").split(",").map((k) => k.trim()).filter(Boolean).slice(0, 8);

/** Build a SeoEntry for any service. */
export function serviceEntry(slug: string): SeoEntry | undefined {
  const s = getService(slug);
  if (!s) return undefined;
  return {
    title: s.metaTitle ?? s.name,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription ?? s.shortDesc,
    canonical: `/services/${s.slug}`,
    path: `/services/${s.slug}`,
    keywords: [s.keyword, ...keywordsFrom(s.metaDescription)].filter(Boolean),
    ogImage: site.ogImage,
    twitterImage: site.ogImage,
    schemaType: "service",
    slug: s.slug,
    breadcrumb: [{ label: "Services", href: "/services" }, { label: s.shortName }],
    category: "Services",
  };
}

/** Build a SeoEntry for any blog post. */
export function blogEntry(slug: string): SeoEntry | undefined {
  const p = getPost(slug);
  if (!p) return undefined;
  return {
    title: p.title,
    metaTitle: p.seoTitle ?? p.title,
    metaDescription: p.metaDescription ?? p.excerpt,
    canonical: `/blog/${p.slug}`,
    path: `/blog/${p.slug}`,
    keywords: [p.primaryKeyword, ...(p.secondaryKeywords ?? []), p.category, ...keywordsFrom(`${p.title} ${p.excerpt}`)].filter(Boolean) as string[],
    ogImage: p.image,
    twitterImage: p.image,
    schemaType: "blog",
    slug: p.slug,
    breadcrumb: [{ label: "Blog", href: "/blog" }, { label: p.title }],
    category: p.category,
    authors: [p.author],
    datePublished: p.date,
  };
}

/** Build a SeoEntry for any case study. */
export function caseStudyEntry(slug: string): SeoEntry | undefined {
  const c = getCaseStudy(slug);
  if (!c) return undefined;
  return {
    title: c.metaTitle,
    metaTitle: c.metaTitle,
    metaDescription: c.metaDescription,
    canonical: `/case-studies/${c.slug}`,
    path: `/case-studies/${c.slug}`,
    keywords: [c.industry, c.service, c.country, "case study", "Webamazee"],
    ogImage: c.image,
    twitterImage: c.image,
    schemaType: "article",
    slug: c.slug,
    breadcrumb: [{ label: "Case Studies", href: "/case-studies" }, { label: c.name }],
    category: c.service,
    datePublished: c.completion,
  };
}

/** Build a SeoEntry for any portfolio project. */
export function portfolioEntry(slug: string): SeoEntry | undefined {
  const p = getProject(slug);
  if (!p) return undefined;
  return {
    title: `${p.title} Case Study`,
    metaTitle: `${p.title} Case Study`,
    metaDescription: p.summary,
    canonical: `/work/${p.slug}`,
    path: `/work/${p.slug}`,
    keywords: [p.category, p.industry, p.country, "portfolio", "web design", "Webamazee"],
    ogImage: p.image,
    twitterImage: p.image,
    schemaType: "article",
    slug: p.slug,
    breadcrumb: [{ label: "Portfolio", href: "/portfolio" }, { label: p.title }],
    category: p.category,
  };
}

/** Build a SeoEntry for any product. */
export function productEntry(slug: string): SeoEntry | undefined {
  const p = getProduct(slug);
  if (!p) return undefined;
  return {
    title: p.metaTitle,
    metaTitle: p.metaTitle,
    metaDescription: p.metaDescription,
    canonical: p.path,
    path: p.path,
    keywords: ["lead management", "CRM for agencies", "digital marketing CRM", "lead tracking", "Webamazee"],
    ogImage: site.ogImage,
    twitterImage: site.ogImage,
    schemaType: "product",
    slug: p.slug,
    breadcrumb: [{ label: "Products", href: "/products" }, { label: p.shortName }],
    category: "Products",
  };
}

/** Global FAQ entries across all categories. */
export function allFaqs() {
  return faqs;
}

/** Counts used to generate the sitemap automatically. */
export function sitemapContent() {
  return {
    staticPaths: [
      "/",
      "/about",
      "/services",
      "/products",
      "/pricing",
      "/portfolio",
      "/case-studies",
      "/blog",
      "/testimonials",
      "/faq",
      "/contact",
      "/sitemap",
      "/privacy-policy",
      "/terms-and-conditions",
    ],
    serviceSlugs: services.map((s) => s.slug),
    blogSlugs: posts.map((p) => p.slug),
    caseStudySlugs: caseStudies.map((c) => c.slug),
    portfolioSlugs: projects.map((p) => p.slug),
    productSlugs: products.map((p) => p.slug),
    locationSlugs: locationPages.map((p) => p.slug),
    locationHubSlugs: locationHubs.map((hub) => hub.slug),
    industrySlugs: industries.map((i) => i.slug),
  };
}
