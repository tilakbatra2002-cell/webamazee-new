import type { Metadata } from "next";
import type { LocationPage } from "./locations";
import { generateMetadata } from "./metadata";
import { hubServiceCrumbs } from "./location-hubs";
import { breadcrumbSchema, faqSchema } from "./schema";
import { absoluteUrl } from "./seo";
import { site } from "./site";
import type { SeoEntry } from "./seo";

/** Build a SeoEntry for a location page (reuses the centralized generator). */
export function locationEntry(page: LocationPage): SeoEntry {
  return {
    title: page.metaTitle,
    metaTitle: page.metaTitle,
    absoluteTitle: page.absoluteTitle,
    metaDescription: page.metaDescription,
    canonical: `/${page.slug}`,
    path: `/${page.slug}`,
    keywords: page.keywords,
    ogImage: site.ogImage,
    twitterImage: site.ogImage,
    schemaType: "website",
    slug: page.slug,
    breadcrumb: hubServiceCrumbs(page.location, page.service === "web-design" ? "Web Design" : "SEO") ?? [
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
  const crumbs = hubServiceCrumbs(page.location, isDesign ? "Web Design" : "SEO") ?? [
    { label: isDesign ? "Web Design" : "SEO Services", href: `/services/${serviceSlug}` },
    { label: page.h1 },
  ];

  const service: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    serviceType: page.h1,
    description: page.metaDescription,
    url,
    image: absoluteUrl(site.ogImage),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Place", name: `${page.location}, ${page.country}` },
  };

  // `isRelatedTo` is the valid Service property for related offers;
  // `keywords` and `hasRelatedService` are not part of schema.org/Service.
  if (page.relevantServices.length > 0) {
    service.isRelatedTo = page.relevantServices.map((r) => ({
      "@type": "Service",
      name: r.name,
      url: absoluteUrl(`/services/${r.slug}`),
    }));
  }

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.metaTitle || page.h1,
    description: page.metaDescription,
    inLanguage: site.lang,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(site.ogImage) },
    publisher: { "@id": `${site.url}/#organization` },
  };

  const blocks: Record<string, unknown>[] = [
    { ...breadcrumbSchema(crumbs, `/${page.slug}`), "@id": `${url}#breadcrumb` },
    webPage,
    service,
  ];

  // FAQPage is only emitted when the page actually renders the same questions.
  if (page.faqs.length > 0) blocks.push(faqSchema(page.faqs));

  return blocks;
}

