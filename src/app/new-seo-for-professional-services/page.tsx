import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry } from "@/lib/industries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { ProfessionalServicesSeoRedesign } from "./professional-services-seo-redesign";

const industry = getIndustry("seo-for-professional-services");
const pagePath = "/new-seo-for-professional-services";
const pageUrl = `${site.url}${pagePath}`;

export const metadata: Metadata = industry
  ? {
      title: industry.metaTitle,
      description: industry.metaDescription,
      keywords: industry.keywords,
      alternates: { canonical: pageUrl },
      robots: { index: false, follow: false },
      openGraph: {
        title: industry.metaTitle,
        description: industry.metaDescription,
        url: pageUrl,
        siteName: site.name,
        locale: site.defaultLocale,
        type: "website",
        images: [
          {
            url: absoluteUrl(site.ogImage),
            width: 1200,
            height: 630,
            alt: industry.metaTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: industry.metaTitle,
        description: industry.metaDescription,
        site: site.twitterHandle,
        images: [absoluteUrl(site.ogImage)],
      },
    }
  : {
      robots: { index: false, follow: false },
    };

export default function NewSeoForProfessionalServicesPage() {
  if (!industry) notFound();

  const serviceName = `${industry.h1Title} ${industry.h1Highlight}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: serviceName,
    serviceType: `SEO for ${industry.name}`,
    description: industry.metaDescription,
    url: pageUrl,
    image: absoluteUrl(site.ogImage),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: site.areaServed.map((c) =>
      c === "Worldwide"
        ? { "@type": "Place", name: "Worldwide" }
        : { "@type": "Country", name: c }
    ),
    keywords: industry.keywords.join(", "),
    hasRelatedService: industry.relatedServices.map((r) => ({
      "@type": "Service",
      name: r.name,
      url: absoluteUrl(`/services/${r.slug}`),
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(
            [{ label: "Services", href: "/services" }, { label: industry.name }],
            pagePath
          ),
          serviceJsonLd,
          faqSchema(industry.faqs),
        ]}
      />
      <ProfessionalServicesSeoRedesign industry={industry} />
    </>
  );
}
