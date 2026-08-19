import Link from "next/link";
import {
  CheckCircle2,
  Globe2,
  Sparkles,
  Target,
  MessageCircleQuestion,
} from "lucide-react";
import type { Industry } from "@/lib/industries";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { industrySchema } from "@/lib/industry-seo";
import {
  ServicesGrid,
  ProcessTimeline,
  StrategyCards,
  TextPanel,
  FeatureGrid,
  RelevantServices,
  FAQSection,
} from "@/components/locations/commercial-sections";

const internalLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function IndustryPage({ industry }: { industry: Industry }) {
  return (
    <>
      <JsonLd data={industrySchema(industry)} />

      {/* 1-2. Breadcrumb + Hero */}
      <PageHero
        eyebrow={industry.eyebrow}
        title={industry.h1Title}
        highlight={industry.h1Highlight}
        subtitle={industry.heroSubtitle}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: industry.name },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/contact" withArrow>
            {industry.heroCtaPrimary}
          </Button>
          <Button size="lg" variant="secondary" href="/contact">
            {industry.heroCtaSecondary}
          </Button>
        </div>
      </PageHero>

      {/* Introduction */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                <Sparkles className="h-3.5 w-3.5" /> {industry.eyebrow}
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {industry.heroSubtitle}
              </h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {industry.intro.map((p, i) => (
                <Reveal key={i}>
                  <p className="text-[16px] leading-relaxed text-slate-600">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Industry specific SEO challenges */}
      <FeatureGrid
        items={industry.challenges}
        title={`Common ${industry.name.toLowerCase()} SEO`}
        highlight="challenges"
      />

      {/* 4. Why SEO matters for this industry */}
      <TextPanel
        eyebrow="Why it matters"
        heading={industry.whyMatters.heading}
        body={industry.whyMatters.body}
        badges={["Search visibility", "Qualified traffic", "Conversion focus", "Sustainable growth"]}
      />

      {/* 5. Webamazee SEO strategy */}
      <StrategyCards
        items={industry.strategy}
        title={`Our ${industry.name.toLowerCase()} SEO strategy`}
        highlight=""
      />

      {/* 6. Core SEO services relevant to the industry */}
      <ServicesGrid services={industry.coreServices} />

      {/* 7. Industry specific growth opportunities */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Growth opportunities"
            title={`${industry.name} SEO growth`}
            highlight="opportunities"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
            {industry.growth.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">{g.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">{g.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SEO process */}
      <ProcessTimeline process={industry.process} intro="A transparent, repeatable process so you always know what is happening and why." />

      {/* 9. Why Webamazee */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Why Webamazee" title="A global SEO partner" highlight="for your business" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industry.whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                  <Globe2 className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-3 font-display text-base font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <p className="mx-auto max-w-2xl text-sm text-slate-500">
              Webamazee is a global digital marketing and SEO company. We work with
              businesses worldwide to build sustainable organic growth.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 10. Related services */}
      <RelevantServices
        links={industry.relatedServices.map((r) => ({ label: r.name, href: `/services/${r.slug}` }))}
      />

      {/* Cross links to other industry pages */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-slate-500">
            Explore SEO for related industries
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {industry.crossLinks.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700"
              >
                <Target className="h-3.5 w-3.5 text-brand-600" /> {c.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <FAQSection
        faqs={industry.faqs}
        title={`Questions about ${industry.name.toLowerCase()} SEO`}
      />

      {/* Contextual footer links */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {internalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
            >
              <MessageCircleQuestion className="h-4 w-4" /> Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Final CTA */}
      <CTABanner
        title={industry.ctaTitle}
        subtitle={industry.ctaSubtitle}
        cta={industry.ctaLabel}
      />
    </>
  );
}
