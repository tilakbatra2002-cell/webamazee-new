import type { CommercialLocationPage } from "@/lib/locations-commercial";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { commercialLocationSchema } from "@/lib/commercial-location-seo";
import { locationHubHref } from "@/lib/location-hubs";
import {
  ServicesGrid,
  ProcessTimeline,
  StrategyCards,
  WhyChooseGrid,
  TextPanel,
  PortfolioSection,
  CrossLinkSection,
  FAQSection,
  FooterLinks,
  RelevantServices,
} from "./commercial-sections";

export function AiMarketingPageView({ page }: { page: CommercialLocationPage }) {
  const hubHref = locationHubHref(page.location);
  return (
    <>
      <JsonLd data={commercialLocationSchema(page)} />

      {/* Hero */}
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        highlight={page.heroHighlight}
        subtitle={page.heroSubtitle}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: page.h1 },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/contact" withArrow>
            Get a Free AI Marketing Audit
          </Button>
          <Button size="lg" variant="secondary" href="/contact">
            Talk to Our Team
          </Button>
        </div>
      </PageHero>

      {/* Introduction */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                AI Marketing Company in {page.location}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                AI that accelerates your marketing, guided by humans
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {page.intro.map((p, i) => (
                <Reveal key={i}>
                  <p className="text-[16px] leading-relaxed text-slate-600">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is AI marketing? */}
      <TextPanel
        eyebrow="The essentials"
        heading={page.whatItMeans.heading}
        body={page.whatItMeans.body}
        badges={["AI research", "Content workflows", "SEO analysis", "Human review"]}
      />

      {/* AI + Human approach */}
      {page.aiApproach && (
        <TextPanel
          eyebrow="Our approach"
          heading={page.aiApproach.heading}
          body={page.aiApproach.body}
        />
      )}

      {/* AI marketing services */}
      <ServicesGrid services={page.commercialServices} />

      {/* How AI can help businesses in [location] */}
      <StrategyCards
        items={page.strategies}
        title={`How AI can help businesses in ${page.location}`}
        highlight=""
      />

      {/* AI SEO & search visibility */}
      {page.aiSearch && (
        <TextPanel eyebrow="Search" heading={page.aiSearch.heading} body={page.aiSearch.body} />
      )}

      {/* Process */}
      <ProcessTimeline process={page.process} intro={page.processIntro} />

      {/* Why Webamazee */}
      <WhyChooseGrid items={page.commercialWhyChoose} location={page.location} />

      {/* Relevant services */}
      <RelevantServices
        links={page.relevantServices.map((r) => ({ label: r.name, href: `/services/${r.slug}` }))}
      />

      {/* Case studies / portfolio */}
      <PortfolioSection links={page.portfolioLinks} />

      {/* Cross-linking cluster */}
      {hubHref && <CrossLinkSection label={`Explore all services in ${page.location}`} links={[{ label: `${page.location} Services Hub`, href: hubHref }]} />}
      <CrossLinkSection label={page.crossTitle ?? "Explore more in the same region"} links={page.crossLinks} />
      <CrossLinkSection label={page.clusterTitle ?? "Our AI marketing services in nearby locations"} links={page.locationCluster} />

      {/* FAQ */}
      <FAQSection
        faqs={page.faqs}
        title={`Questions about AI marketing in ${page.location}`}
      />

      {/* Contextual footer links */}
      <FooterLinks links={page.internalLinks} />

      {/* Final CTA */}
      <CTABanner
        title="Ready to Market Smarter with AI?"
        subtitle="Get a free AI marketing audit and see how AI, guided by human strategy, can accelerate your growth."
        cta="Get a Free AI Marketing Audit"
      />
    </>
  );
}
