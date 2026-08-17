import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudySchema({ cs }: { cs: CaseStudy }) {
  const url = `https://webamazee.com/case-studies/${cs.slug}`;

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${cs.title} — Webamazee Case Study`,
    headline: `${cs.title} — Webamazee Case Study`,
    about: cs.summary,
    genre: cs.service,
    industry: cs.industry,
    creator: { "@type": "Organization", name: "Webamazee", url: "https://webamazee.com" },
    url,
    dateCreated: cs.completion,
    inLanguage: "en",
    thumbnailUrl: "https://webamazee.com/og-image.png",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://webamazee.com" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://webamazee.com/case-studies" },
      { "@type": "ListItem", position: 3, name: cs.title, item: url },
    ],
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cs.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
