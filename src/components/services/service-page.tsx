import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
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

const localWebsiteLinks: Record<string, { label: string; href: string; description: string }[]> = {
  "website-development": [
    { label: "Web Designing Company in Zirakpur", href: "/web-designing-company-zirakpur", description: "A dedicated page for Zirakpur businesses planning a new website, WordPress build, store or redesign." },
    { label: "Website Design in Chandigarh", href: "/web-designing-company-chandigarh", description: "Website planning for businesses competing in Chandigarh and the wider Tricity." },
    { label: "Website Development in Mohali", href: "/web-designing-company-mohali", description: "Web design and development support for Mohali technology, B2B and service businesses." },
  ],
  "ecommerce-development": [
    { label: "E-commerce Website Development in Zirakpur", href: "/web-designing-company-zirakpur", description: "How Webamazee approaches online stores and shopping journeys for Zirakpur businesses." },
    { label: "Website Design in Chandigarh", href: "/web-designing-company-chandigarh", description: "Regional website planning for businesses serving the Chandigarh market." },
  ],
  "website-redesign": [
    { label: "Website Redesign for Zirakpur Businesses", href: "/web-designing-company-zirakpur", description: "A focused page covering redesign, mobile experience, trust signals and enquiry paths for Zirakpur." },
    { label: "Web Design in Panchkula", href: "/web-designing-company-panchkula", description: "A nearby Tricity page for businesses where Panchkula intent is more relevant." },
  ],
  "landing-page-development": [
    { label: "Website Design in Zirakpur", href: "/web-designing-company-zirakpur", description: "Website and landing-page planning for Zirakpur businesses that need clearer enquiries." },
    { label: "All Digital Services in Zirakpur", href: "/services-in-zirakpur", description: "The broader Zirakpur service hub for SEO, digital marketing and AI-assisted marketing." },
  ],
};

/** Contextual SEO location pages linked back from the core SEO service pages. */
const localSeoLinks: Record<string, { label: string; href: string; description: string }[]> = {
  "seo-services": [
    { label: "SEO Company in Zirakpur", href: "/seo-services-zirakpur", description: "How Webamazee plans local and technical SEO for businesses targeting Zirakpur and the Tricity." },
    { label: "SEO Services in Chandigarh", href: "/seo-services-chandigarh", description: "Search strategy for businesses competing in Chandigarh and the wider Tricity." },
    { label: "SEO Services in Mohali", href: "/seo-services-mohali", description: "Organic search support for Mohali technology, B2B and service businesses." },
  ],
  "local-seo": [
    { label: "Local SEO in Zirakpur", href: "/seo-services-zirakpur", description: "Google Business Profile, service-area relevance and location pages for the Zirakpur market." },
    { label: "All Digital Services in Zirakpur", href: "/services-in-zirakpur", description: "The Zirakpur hub covering website, SEO, digital marketing and AI-assisted work." },
  ],
  "technical-seo": [
    { label: "Technical SEO for Zirakpur Businesses", href: "/seo-services-zirakpur", description: "Crawlability, indexation, Core Web Vitals and structured data explained for a local market." },
    { label: "Technical SEO in Mohali", href: "/seo-services-mohali", description: "Technical search foundations for Mohali technology and B2B websites." },
  ],
  "ai-seo": [
    { label: "AI SEO for Zirakpur Businesses", href: "/seo-services-zirakpur", description: "How AI-assisted research and AI search optimisation are applied to a local SEO plan." },
    { label: "AI Marketing in Zirakpur", href: "/ai-marketing-company-zirakpur", description: "Human-led AI marketing for businesses serving Zirakpur and the Tricity." },
  ],
  "google-ranking-growth": [
    { label: "Ranking Growth for Zirakpur Searches", href: "/seo-services-zirakpur", description: "A data-led route to improving positions for Zirakpur and Tricity search intent." },
    { label: "SEO Services in Panchkula", href: "/seo-services-panchkula", description: "Search growth for businesses serving Panchkula and nearby markets." },
  ],
  "competitor-analysis": [
    { label: "Competitor Analysis for Zirakpur Markets", href: "/seo-services-zirakpur", description: "How competitor gaps are identified for businesses competing across the Tricity." },
    { label: "SEO Services in Chandigarh", href: "/seo-services-chandigarh", description: "Competitive search research for the Chandigarh market." },
  ],
  "ai-content-optimization": [
    { label: "Content Optimisation for Zirakpur SEO", href: "/seo-services-zirakpur", description: "Question-led content planning for local search intent in Zirakpur." },
    { label: "SEO Services in Mohali", href: "/seo-services-mohali", description: "Content and search intent work for Mohali B2B and technology businesses." },
  ],
  "link-building": [
    { label: "Authority Building for Zirakpur SEO", href: "/seo-services-zirakpur", description: "Relevance-led links, mentions and citations for businesses serving Zirakpur." },
    { label: "Digital Marketing in Zirakpur", href: "/digital-marketing-company-zirakpur", description: "The wider digital marketing context for the Zirakpur market." },
  ],
};

function LocalWebsiteInternalLinks({
  links,
  eyebrow = "Location-specific website support",
  title = "Planning a website for a local market?",
  intro = "These contextual pages help businesses choose the right website and market focus without turning every service page into a location page.",
}: {
  links: { label: string; href: string; description: string }[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
            <MapPin className="h-3.5 w-3.5" /> {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">{intro}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
            >
              <span className="font-display text-sm font-bold text-ink group-hover:text-brand-700">{link.label}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{link.description}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Open page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicePage({ service }: { service: Service }) {
  const related = getRelatedServices(service);

  return (
    <>
      <JsonLd data={getServiceSeo(service.slug)?.schema ?? []} />

      {/* 1-2. Breadcrumb + Hero */}
      <ServiceHero
        slug={service.slug}
        icon={service.icon}
        eyebrow={service.hero.eyebrow}
        title={service.hero.title}
        highlight={service.hero.highlight}
        subtitle={service.hero.subtitle}
        trust={service.hero.trust}
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

      {/* 11. Measurement & Reporting */}
      <ResultsSection focusAreas={service.measurementAreas} />

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

      {localWebsiteLinks[service.slug] && (
        <LocalWebsiteInternalLinks links={localWebsiteLinks[service.slug]} />
      )}

      {localSeoLinks[service.slug] && (
        <LocalWebsiteInternalLinks
          links={localSeoLinks[service.slug]}
          eyebrow="Location-specific SEO support"
          title="SEO for a specific local market?"
          intro="These contextual pages cover how Webamazee approaches search in a named market, without turning every service page into a location page."
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
