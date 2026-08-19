import type { Metadata } from "next";
import type { LocationPage } from "./locations";
import { generateMetadata } from "./metadata";
import { breadcrumbSchema, faqSchema } from "./schema";
import { absoluteUrl } from "./seo";
import { site } from "./site";
import type { SeoEntry } from "./seo";

/** Build a SeoEntry for a location page (reuses the centralized generator). */
export function locationEntry(page: LocationPage): SeoEntry {
  return {
    title: page.metaTitle,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    canonical: `/${page.slug}`,
    path: `/${page.slug}`,
    keywords: page.keywords,
    ogImage: site.ogImage,
    twitterImage: site.ogImage,
    schemaType: "website",
    slug: page.slug,
    breadcrumb: [
      { label: page.service === "web-design" ? "Web Design" : "SEO Services", href: page.service === "web-design" ? "/services/website-development" : "/services/seo-services" },
      { label: page.h1 },
    ],
    category: page.service === "web-design" ? "Web Design" : "SEO",
  };
}

/** Full metadata for a location page. */
export function locationMetadata(page: LocationPage): Metadata {
  return generateMetadata(locationEntry(page));
}

/** JSON-LD blocks for a location page: Breadcrumb + Service + FAQ. */
export function locationSchema(page: LocationPage): Record<string, unknown>[] {
  const isDesign = page.service === "web-design";
  const serviceSlug = isDesign ? "website-development" : "seo-services";
  const url = absoluteUrl(`/${page.slug}`);
  const crumbs = [
    { label: isDesign ? "Web Design" : "SEO Services", href: `/services/${serviceSlug}` },
    { label: page.h1 },
  ];

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    serviceType: page.h1,
    description: page.metaDescription,
    url,
    image: absoluteUrl(site.ogImage),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: [{ "@type": "Place", name: page.location }],
    keywords: page.keywords.join(", "),
    hasRelatedService: page.relevantServices.map((r) => ({
      "@type": "Service",
      name: r.name,
      url: absoluteUrl(`/services/${r.slug}`),
    })),
  };

  return [breadcrumbSchema(crumbs, `/${page.slug}`), service, faqSchema(page.faqs)];
}

