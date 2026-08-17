import type { Metadata } from "next";
import type { CommercialLocationPage } from "./locations-commercial";
import { generateMetadata } from "./metadata";
import { breadcrumbSchema, faqSchema } from "./schema";
import { absoluteUrl } from "./seo";
import { site } from "./site";
import type { SeoEntry } from "./seo";

const LABEL = {
  "digital-marketing": "Digital Marketing",
  "ai-marketing": "AI Marketing",
} as const;

/** Build a SeoEntry for a commercial location page. */
export function commercialLocationEntry(page: CommercialLocationPage): SeoEntry {
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
      { label: "Services", href: "/services" },
      { label: page.h1 },
    ],
    category: LABEL[page.commercialType],
  };
}

/** Full metadata for a commercial location page. */
export function commercialLocationMetadata(page: CommercialLocationPage): Metadata {
  return generateMetadata(commercialLocationEntry(page));
}

/**
 * JSON-LD blocks for a commercial location page: Breadcrumb + Service + FAQ.
 * No LocalBusiness schema is emitted — Webamazee is a global company and these
 * are target SEO pages, not claims of a physical office in the location.
 */
export function commercialLocationSchema(page: CommercialLocationPage): Record<string, unknown>[] {
  const url = absoluteUrl(`/${page.slug}`);
  const crumbs = [
    { label: "Services", href: "/services" },
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
