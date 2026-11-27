/**
 * Composition shell shared by the five SEO service pages.
 *
 * The shell guarantees the same theme, section rhythm, heading structure and
 * link set on every page. Each page plugs in its own service-specific visual
 * blocks via `variants`, so the pages differ in arrangement without drifting
 * into five different designs.
 */
import type { ReactNode } from "react";
import type { Service } from "@/lib/services";
import { getRelatedServices } from "@/lib/services";
import { testimonials as googleReviews, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { JsonLd } from "@/components/seo/json-ld";
import { getServiceSeo } from "@/lib/content-seo";
import type { LinkItem } from "./seo-types";
import {
  ClosingCta,
  FaqList,
  IncludedGrid,
  IndustriesBlock,
  LocalLinksBlock,
  MeasurementBlock,
  OverviewBlock,
  ProblemsGrid,
  ProcessGrid,
  RelatedServicesBlock,
  SectionHead,
  SeoHero,
  StickyCta,
  TechStackBlock,
  TestimonialsBlock,
  WhyChooseGrid,
} from "./seo-blocks";
import { sectionMuted, sectionWhite } from "./seo-theme";
import { SeoClusterBlock } from "./seo-cluster";

export type SeoPageVariants = {
  /** Optional block rendered right after the hero (page-specific identity). */
  afterHero?: ReactNode;
  /** Rendered after the service overview. */
  afterOverview?: ReactNode;
  /** Rendered after "why it matters". */
  afterWhyMatters?: ReactNode;
  /** Rendered after the process. */
  afterProcess?: ReactNode;
  /** Rendered after the included grid. */
  afterIncluded?: ReactNode;
  /** Rendered after the industries block. */
  afterIndustries?: ReactNode;
  /** Rendered after the measurement block. */
  afterMeasurement?: ReactNode;
  /** Rendered after the FAQ, before related services. */
  afterFaqs?: ReactNode;
  /** Hero image overrides. */
  heroImage: string;
  heroImageAlt: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /**
   * Section headings. The H2 wording is the production wording for every page
   * and is intentionally not customised per page, so no existing heading is
   * lost. Only the eyebrow labels and optional intro lines carry
   * service-specific wording.
   */
  headings: {
    problems: { eyebrow: string; intro?: string };
    overview: { eyebrow: string; intro?: string };
    whyMatters: { eyebrow: string };
    process: { eyebrow: string; intro?: string };
    included: { eyebrow: string; intro?: string };
    whyChoose: { eyebrow: string; intro?: string };
    industries: { eyebrow: string; intro?: string };
    tools: { eyebrow: string; intro?: string };
    measurement: { eyebrow: string; intro?: string };
    testimonials: { eyebrow: string; intro?: string };
    faqEyebrow: string;
  };
  /** Extra trust points shown in the dark "what every engagement gets" panel. */
  commitmentNote?: { label: string; title: string; items: { title: string; text: string }[] };
  localWebsiteLinks?: LinkItem[];
  localSeoLinks?: LinkItem[];
  faqLabel: string;
  closing: { label: string; title: string; subtitle: string };
};

export function SeoServiceShell({
  service,
  variants,
}: {
  service: Service;
  variants: SeoPageVariants;
}) {
  const related = getRelatedServices(service);
  const h = variants.headings;
  const localSeoHrefs = new Set((variants.localSeoLinks ?? []).map((l) => l.href));
  const websiteLinks = (variants.localWebsiteLinks ?? []).filter((l) => !localSeoHrefs.has(l.href));

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <JsonLd data={getServiceSeo(service.slug)?.schema ?? []} />
      <div id="main-content" className="overflow-x-clip">
        <SeoHero
          crumbLabel={service.shortName}
          eyebrowText={service.hero.eyebrow}
          title={service.hero.title}
          highlight={service.hero.highlight}
          subtitle={service.hero.subtitle}
          trust={service.hero.trust}
          image={variants.heroImage}
          imageAlt={variants.heroImageAlt}
          secondaryHref={variants.secondaryHref}
          secondaryLabel={variants.secondaryLabel}
        />

        {variants.afterHero}

        {/* Common problems we solve every day */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.problems.eyebrow}
              title="Common problems we solve every day"
              intro={h.problems.intro}
            />
            <ProblemsGrid items={service.pains} icon={service.icon} />
          </div>
        </section>

        {/* What this service covers */}
        <section className={sectionMuted}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.overview.eyebrow}
              title="What this service covers"
              intro={h.overview.intro}
            />
            <OverviewBlock
              icon={service.icon}
              name={service.name}
              shortDesc={service.shortDesc}
              paragraphs={service.overview}
              whoNeeds={service.whoNeeds}
              examples={service.examples}
            />
          </div>
        </section>

        {variants.afterOverview}

        {/* Why it matters */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div>
                <SectionHead
                  eyebrowText={h.whyMatters.eyebrow}
                  title={`${service.whyMattersTitle} for your business`}
                />
                <div className="mt-5 space-y-4">
                  {service.whyMatters.map((p, i) => (
                    <p key={i} className="text-[15px] leading-[1.7] text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:self-start">
                {[
                  { title: "Baseline first", description: "Start with your current position and goals." },
                  { title: "Relevant measures", description: "Choose indicators that fit the engagement." },
                  { title: "Clear reporting", description: "Review progress in plain language." },
                  { title: "No generic promises", description: "Set expectations around your business context." },
                ].map((principle) => (
                  <div key={principle.title} className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4">
                    <p className="font-display text-[14px] font-bold text-[#0b1528]">{principle.title}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {variants.afterWhyMatters}

        {/* Process */}
        <section className={sectionMuted}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.process.eyebrow}
              title="A proven six-step process"
              intro={h.process.intro}
            />
            <ProcessGrid steps={service.process} />
          </div>
        </section>

        {variants.afterProcess}

        {/* What's included */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.included.eyebrow}
              title="Everything in your engagement"
              intro={h.included.intro}
            />
            <IncludedGrid items={service.included} />
          </div>
        </section>

        {variants.afterIncluded}

        {/* Why Webamazee */}
        <section className={sectionMuted}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.whyChoose.eyebrow}
              title="A partner built for your success"
              intro={h.whyChoose.intro}
            />
            <WhyChooseGrid reasons={service.whyChoose} note={variants.commitmentNote} />
          </div>
        </section>

        {/* Industries */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.industries.eyebrow}
              title="We serve businesses in every niche"
              intro={h.industries.intro}
            />
            <IndustriesBlock industries={service.industries} />
          </div>
        </section>

        {variants.afterIndustries}

        {/* Tech stack */}
        <section className={sectionMuted}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.tools.eyebrow}
              title="Backed by the best tools"
              intro={h.tools.intro}
            />
            <TechStackBlock tools={service.techStack} />
          </div>
        </section>

        {/* Measurement */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.measurement.eyebrow}
              title="Progress measured against your starting point"
              intro={h.measurement.intro}
            />
            <MeasurementBlock areas={service.measurementAreas} />
          </div>
        </section>

        {variants.afterMeasurement}

        {/* Testimonials */}
        <section className={sectionMuted}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <SectionHead
              eyebrowText={h.testimonials.eyebrow}
              title="What our clients say"
              intro={h.testimonials.intro}
              align="center"
            />
            <TestimonialsBlock items={googleReviews} reviewsUrl={GOOGLE_REVIEWS_URL} />
          </div>
        </section>

        {/* FAQ */}
        <section className={sectionWhite}>
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <FaqList faqs={service.faqs} title={`Questions about ${service.shortName}`} eyebrowText={h.faqEyebrow} />
          </div>
        </section>

        {variants.afterFaqs}

        {/* SEO cluster navigation */}
        <SeoClusterBlock currentSlug={service.slug} />

        {/* Related services */}
        {related.length > 0 && (
          <section className={sectionMuted}>
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
              <SectionHead
                eyebrowText="Keep going"
                title="Explore related services"
                intro="Combine these for a complete growth strategy."
              />
              <RelatedServicesBlock
                related={related.map((r) => ({ slug: r.slug, name: r.name, icon: r.icon }))}
              />
            </div>
          </section>
        )}

        {/* Local links */}
        {websiteLinks.length > 0 && (
          <LocalLinksBlock
            links={websiteLinks}
            eyebrowText="Location-specific SEO support"
            title="SEO for a specific local market?"
            intro="These contextual pages cover how Webamazee approaches search in a named market, without turning every service page into a location page."
          />
        )}
        {variants.localSeoLinks && variants.localSeoLinks.length > 0 && (
          <LocalLinksBlock
            links={variants.localSeoLinks}
            eyebrowText="Location-specific SEO support"
            title="SEO for a specific local market?"
            intro="These contextual pages cover how Webamazee approaches search in a named market, without turning every service page into a location page."
          />
        )}

        <ClosingCta
          label={variants.closing.label}
          title={variants.closing.title}
          subtitle={variants.closing.subtitle}
        />
      </div>

      <StickyCta />
    </div>
  );
}
