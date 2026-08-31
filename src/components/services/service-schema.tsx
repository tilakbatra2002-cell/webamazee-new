import type { Service } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";

export function ServiceSchema({ service }: { service: Service }) {
  const url = absoluteUrl(`/services/${service.slug}`);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.shortDesc,
    url,
    image: absoluteUrl("/og-image.png"),
    provider: {
      "@type": "ProfessionalService",
      name: "Webamazee",
      url: absoluteUrl(),
      areaServed: ["Worldwide"],
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      description: `Custom ${service.keyword} from Webamazee. Get a free audit and personalised proposal.`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
