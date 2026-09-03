import type { Service } from "@/lib/services";
import { getRelatedServices } from "@/lib/services";
import { testimonials as googleReviews } from "@/lib/testimonials";
import { CTABanner } from "../layout/cta-banner";
import { ServiceHero } from "./service-hero";
import {
  PainPoints,
  OverviewSection,
  WhyMatters,
  ProcessTimeline,
  WhatIncluded,
  WhyChooseWebamazee,
  IndustriesServed,
  ServiceTechStack,
  ResultsSection,
  ServiceTestimonials,
  FAQSection,
  RelatedServices,
  StickyCTA,
} from "./service-sections";
import { JsonLd } from "../seo/json-ld";
import { getServiceSeo } from "@/lib/content-seo";

export function ServicePage({ service }: { service: Service }) {
  const related = getRelatedServices(service);

  return (
    <>
      <JsonLd data={getServiceSeo(service.slug)?.schema ?? []} />

      {/* 1-2. Breadcrumb + Hero */}
      <ServiceHero
        icon={service.icon}
        keyword={service.keyword}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        highlight={service.hero.highlight}
        subtitle={service.hero.subtitle}
        trust={service.hero.trust}
        stats={service.hero.stats}
        crumbLabel={service.shortName}
      />

      {/* 3. Client Pain Points */}
      <PainPoints pains={service.pains} icon={service.icon} />

      {/* 4. Service Overview */}
      <OverviewSection
        icon={service.icon}
        title={service.name}
        shortDesc={service.shortDesc}
        paragraphs={service.overview}
        whoNeeds={service.whoNeeds}
        examples={service.examples}
      />

      {/* 5. Why This Service Matters */}
      <WhyMatters
        title={service.whyMattersTitle}
        paragraphs={service.whyMatters}
        stats={service.whyStats}
      />

      {/* 6. Our Process */}
      <ProcessTimeline steps={service.process} />

      {/* 7. What's Included */}
      <WhatIncluded included={service.included} />

      {/* 8. Why Choose Webamazee */}
      <WhyChooseWebamazee reasons={service.whyChoose} />

      {/* 9. Industries We Serve */}
      <IndustriesServed industries={service.industries} />

      {/* 10. Technology Stack */}
      <ServiceTechStack tools={service.techStack} />

      {/* 11. Results & Case Studies */}
      <ResultsSection
        title={service.resultsTitle}
        rows={service.resultsRows}
        story={service.resultsStory}
      />

      {/* 12. Testimonials */}
      <ServiceTestimonials items={googleReviews} />

      {/* 13. FAQs */}
      <FAQSection faqs={service.faqs} shortName={service.shortName} />

      {/* 14. Related Services */}
      {related.length > 0 && (
        <RelatedServices
          related={related.map((r) => ({ slug: r.slug, name: r.name, icon: r.icon }))}
        />
      )}

      {/* 15. Final CTA */}
      <CTABanner
        title={`Ready to grow with ${service.name}?`}
        subtitle="Get a free audit and a personalised strategy - no obligation."
      />

      {/* Mobile sticky CTA */}
      <StickyCTA />
    </>
  );
}
