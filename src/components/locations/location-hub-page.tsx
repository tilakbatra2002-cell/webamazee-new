import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Globe2, MapPin, Sparkles } from "lucide-react";
import type { LocationHub } from "@/lib/location-hubs";
import { locationHubSchema } from "@/lib/location-hubs";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { Button } from "@/components/ui/button";

export function LocationHubPage({ hub }: { hub: LocationHub }) {
  return (
    <>
      <JsonLd data={locationHubSchema(hub)} />
      <PageHero
        eyebrow={`SERVICES · ${hub.location.toUpperCase()}`}
        title={hub.h1}
        highlight=""
        subtitle={hub.heroText}
        crumbs={[{ label: "Services", href: "/services" }, { label: hub.location }]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/contact" withArrow>Discuss Your Goals</Button>
          <Button size="lg" variant="secondary" href="#location-services">Explore Services</Button>
        </div>
      </PageHero>

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                <MapPin className="h-3.5 w-3.5" /> {hub.location} service hub
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold text-ink sm:text-4xl">Choose the right digital starting point</h2>
            </Reveal>
            <div className="mt-6 space-y-5">
              {hub.intro.map((paragraph, index) => <Reveal key={index}><p className="text-[16px] leading-relaxed text-slate-600">{paragraph}</p></Reveal>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Market context" title={`Why ${hub.location} businesses`} highlight="need connected digital services" />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hub.needs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                  <BadgeCheck className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="location-services" className="scroll-mt-24 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Services" title={`Webamazee services in ${hub.location}`} highlight="" />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {hub.services.map((service, index) => (
              <Reveal key={service.href} delay={index * 0.04}>
                <Link href={service.href} className="group flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow">
                  <Globe2 className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-700">{service.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">{service.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Industries" title={`Businesses we support in ${hub.location}`} highlight="" />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hub.industries.map((industry, index) => (
              <Reveal key={industry.name} delay={index * 0.03}>
                {industry.href ? (
                  <Link href={industry.href} className="group flex h-full gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:border-brand-600/25 hover:shadow-glow">
                    <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <span><strong className="font-display text-sm text-ink group-hover:text-brand-700">{industry.name}</strong><span className="mt-1 block text-sm leading-relaxed text-slate-500">{industry.desc}</span></span>
                  </Link>
                ) : (
                  <div className="flex h-full gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft"><Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><span><strong className="font-display text-sm text-ink">{industry.name}</strong><span className="mt-1 block text-sm leading-relaxed text-slate-500">{industry.desc}</span></span></div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Selected work" title="Relevant Webamazee case studies" highlight="" />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
            {hub.projects.map((project, index) => (
              <Reveal key={project.href} delay={index * 0.05}>
                <Link href={project.href} className="group flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow">
                  <Sparkles className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-700">{project.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{project.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">View Case Study <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="FAQ" title={`Questions about digital services in ${hub.location}`} highlight="" />
          <div className="mx-auto mt-12 max-w-3xl"><Accordion items={hub.faqs} defaultOpen={null} /></div>
        </div>
      </section>

      <CTABanner title={`Ready to Grow in ${hub.location}?`} subtitle="Tell us what is limiting your website or marketing today, and we will recommend a focused next step." cta="Get a Free Consultation" />
    </>
  );
}
