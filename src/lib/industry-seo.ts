import type { Metadata } from "next";
import type { Industry } from "./industries";
import { generateMetadata } from "./metadata";
import { breadcrumbSchema, faqSchema } from "./schema";
import { absoluteUrl } from "./seo";
import { site } from "./site";
import type { SeoEntry } from "./seo";

/** Build a SeoEntry for an industry SEO landing page. */
export function industryEntry(industry: Industry): SeoEntry {
  return {
    title: industry.metaTitle,
    metaTitle: industry.metaTitle,
    metaDescription: industry.metaDescription,
    canonical: `/${industry.slug}`,
    path: `/${industry.slug}`,
    keywords: industry.keywords,
    ogImage: site.ogImage,
    twitterImage: site.ogImage,
    schemaType: "website",
    slug: industry.slug,
    breadcrumb: [{ label: "Services", href: "/services" }, { label: industry.name }],
    category: "SEO",
  };
}

/** Full metadata for an industry page. */
export function industryMetadata(industry: Industry): Metadata {
  return generateMetadata(industryEntry(industry));
}

/**
 * JSON-LD blocks for an industry page: Breadcrumb + Service + FAQPage.
 * No LocalBusiness schema is emitted. Webamazee is a global company and these
 * are industry landing pages, not claims of a physical office or reviews.
 */
export function industrySchema(industry: Industry): Record<string, unknown>[] {
  const url = absoluteUrl(`/${industry.slug}`);
  const serviceName = `${industry.h1Title} ${industry.h1Highlight}`;

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: serviceName,
    serviceType: `SEO for ${industry.name}`,
    description: industry.metaDescription,
    url,
    image: absoluteUrl(site.ogImage),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed.map((c) =>
      c === "Worldwide" ? { "@type": "Place", name: "Worldwide" } : { "@type": "Country", name: c }
    ),
    keywords: industry.keywords.join(", "),
    hasRelatedService: industry.relatedServices.map((r) => ({
      "@type": "Service",
      name: r.name,
      url: absoluteUrl(`/services/${r.slug}`),
    })),
  };

  return [breadcrumbSchema([{ label: "Services", href: "/services" }, { label: industry.name }], `/${industry.slug}`), service, faqSchema(industry.faqs)];
}
