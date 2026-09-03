import { absoluteUrl } from "./seo";
import { site } from "./site";

/**
 * Centralized JSON-LD schema generators.
 * All helpers return plain objects ready to be serialized into
 * `<script type="application/ld+json">` blocks.
 */

export type Crumb = { label: string; href?: string };

/** Organization / ProfessionalService / LocalBusiness (global, on every page). */
export function organizationSchema() {
  const url = site.url;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        founder: {
          "@type": "Person",
          name: site.founderName,
        },
        description: site.tagline,
        url,
        logo: absoluteUrl(site.logo),
        image: absoluteUrl(site.ogImage),
        slogan: site.tagline,
        telephone: site.phoneIntl,
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.streetAddress,
          addressLocality: site.address.addressLocality,
          addressRegion: site.address.addressRegion,
          postalCode: site.address.postalCode,
          addressCountry: site.address.addressCountry,
        },
        openingHours: site.openingHours,
        areaServed: site.areaServed.map((c) => c === "Worldwide" ? { "@type": "Place", name: "Worldwide" } : { "@type": "Country", name: c }),
        sameAs: site.socialProfiles,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phoneIntl,
            contactType: "customer service",
            email: site.email,
            areaServed: site.areaServed,
            availableLanguage: ["en"],
          },
        ],
        knowsAbout: site.services,
        serviceType: site.services,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: site.name,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: site.lang,
        potentialAction: {
          "@type": "SearchAction",
          target: `${url}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/** BreadcrumbList schema generated from a flat crumb array. */
export function breadcrumbSchema(crumbs: Crumb[], path?: string) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    ...crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : path ? { item: absoluteUrl(path) } : {}),
    })),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

/** Service schema for service pages. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  slug: string;
  keywords?: string[];
  related?: { name: string; slug: string }[];
  offers?: { name: string; description: string }[];
}) {
  const url = absoluteUrl(`/services/${opts.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url,
    image: absoluteUrl(site.ogImage),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed.map((c) => c === "Worldwide" ? { "@type": "Place", name: "Worldwide" } : { "@type": "Country", name: c }),
    ...(opts.keywords && opts.keywords.length ? { keywords: opts.keywords.join(", ") } : {}),
    ...(opts.offers && opts.offers.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${opts.name} — Webamazee`,
            itemListElement: opts.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o.name, description: o.description },
            })),
          },
        }
      : {}),
    ...(opts.related && opts.related.length
      ? { hasRelatedService: opts.related.map((r) => ({ "@type": "Service", name: r.name, url: absoluteUrl(`/services/${r.slug}`) })) }
      : {}),
  };
}

/** Article / BlogPosting schema for blog posts. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  slug: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  author: string;
  authorRole?: string;
  keywords?: string[];
  category?: string;
}) {
  const url = absoluteUrl(`/blog/${opts.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: opts.headline,
    description: opts.description,
    image: absoluteUrl(opts.image),
    url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: {
      "@type": "Person",
      name: opts.author,
      ...(opts.authorRole ? { jobTitle: opts.authorRole } : {}),
    },
    publisher: { "@id": `${site.url}/#organization` },
    ...(opts.keywords && opts.keywords.length ? { keywords: opts.keywords.join(", ") } : {}),
    ...(opts.category ? { articleSection: opts.category } : {}),
  };
}

/** FAQPage schema generated automatically from any FAQ list. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** CreativeWork / Article schema for case studies (results-oriented). */
export function caseStudySchema(opts: {
  headline: string;
  description: string;
  slug: string;
  image: string;
  client?: string;
  industry?: string;
  date?: string;
  result?: string[];
}) {
  const url = absoluteUrl(`/case-studies/${opts.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "Article"],
    headline: opts.headline,
    description: opts.description,
    image: absoluteUrl(opts.image),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    creator: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    datePublished: opts.date,
    ...(opts.client ? { sourceOrganization: { "@type": "Organization", name: opts.client } } : {}),
    ...(opts.industry ? { about: { "@type": "Thing", name: opts.industry } } : {}),
    ...(opts.result && opts.result.length
      ? { "result": opts.result.map((r) => ({ "@type": "CreativeWork", description: r })) }
      : {}),
  };
}

/** CreativeWork schema for portfolio projects. */
export function portfolioSchema(opts: {
  name: string;
  description: string;
  slug: string;
  image: string;
}) {
  const url = absoluteUrl(`/work/${opts.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: opts.name,
    description: opts.description,
    image: absoluteUrl(opts.image),
    url,
    creator: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}
