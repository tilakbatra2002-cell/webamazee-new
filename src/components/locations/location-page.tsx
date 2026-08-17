import Link from "next/link";
import {
  CheckCircle2, Sparkles, ArrowRight, Globe2, BadgeCheck, MessageCircleQuestion,
  Target, Building2, ArrowUpRight, Newspaper, MapPin,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { Button } from "@/components/ui/button";
import { locationSchema } from "@/lib/location-seo";
import { Statistics } from "@/components/sections/statistics";
import { locationHubHref } from "@/lib/location-hubs";

function industryHref(name: string): string | undefined {
  const value = name.toLowerCase();
  if (value.includes("e-commerce") || value.includes("ecommerce") || value.includes("retail")) return "/seo-for-ecommerce";
  if (value.includes("saas") || value.includes("software") || value.includes("tech")) return "/seo-for-saas";
  if (value.includes("travel") || value.includes("tourism") || value.includes("hospitality")) return "/seo-for-tourism";
  if (value.includes("health") || value.includes("clinic")) return "/seo-for-healthcare";
  if (value.includes("professional") || value.includes("b2b") || value.includes("finance") || value.includes("legal")) return "/seo-for-professional-services";
  if (value.includes("local") || value.includes("real estate") || value.includes("home service")) return "/seo-for-local-business";
  return undefined;
}

export function LocationPageView({ page }: { page: LocationPage }) {
  const isDesign = page.service === "web-design";
  const hubHref = locationHubHref(page.location);

  return (
    <>
      <JsonLd data={locationSchema(page)} />

      {/* Breadcrumb + Hero */}
      <PageHero
        eyebrow={page.eyebrow}
        title={page.h1}
        highlight=""
        subtitle={page.heroText}
        crumbs={[
          { label: isDesign ? "Web Design" : "SEO Services", href: isDesign ? "/services/website-development" : "/services/seo-services" },
          { label: page.h1 },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/contact" withArrow>
            Get a Free {isDesign ? "Website Audit" : "SEO Audit"}
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
                <Sparkles className="h-3.5 w-3.5" /> Overview
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                {isDesign ? "A website that works for your business" : "Search visibility that builds your business"}
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

      {/* Approved global Webamazee statistics, sourced centrally. */}
      <Statistics />

      {/* Location-specific service routes */}
      {page.locationServices && page.locationServices.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Services in your market"
              title={`Digital services for businesses in ${page.location}`}
              highlight=""
            />
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.locationServices.map((service, i) => (
                <Reveal key={service.href} delay={i * 0.04}>
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                      <Globe2 className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-700">{service.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      {service.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search intent */}
      {page.intent && page.intent.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="What to expect"
              title="What this service"
              highlight="covers"
            />
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
              {page.intent.map((it, i) => (
                <Reveal key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                    <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <Target className="h-4 w-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-ink">{it.heading}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{it.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core service explanation */}
      {page.coreService && page.coreService.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="The service in detail"
              title={isDesign ? "What you get with professional web design" : "What you get with a strategic SEO engagement"}
              highlight=""
            />
            <div className="mx-auto mt-8 max-w-4xl space-y-5">
              {page.coreService.map((p, i) => (
                <Reveal key={i}>
                  <p className="text-[16px] leading-relaxed text-slate-600">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why businesses need this */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why it matters"
            title={`Why businesses in ${page.location}`}
            highlight={`need this service`}
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.whyNeeds.map((w, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services included */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Services included"
            title={`What's included with`}
            highlight={`${page.service === "web-design" ? "web design" : "SEO"} in ${page.location}`}
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.servicesIncluded.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
                >
                  <span className="flex items-center gap-2 font-display text-sm font-bold text-ink">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" /> {s.name}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                  {s.benefit && (
                    <p className="mt-2 rounded-lg bg-brand-50/70 px-2.5 py-1.5 text-xs font-medium text-brand-700">
                      {s.benefit}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-700">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Webamazee */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Webamazee"
            title="A global digital growth partner"
            highlight="for your business"
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.whyChoose.map((w, i) => (
              <Reveal key={i} delay={i * 0.05}>
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
              Webamazee is a global digital growth company. These pages are
              targeted SEO landing pages for businesses in {page.location} and
              beyond — we help ambitious companies grow online worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Process"
            title="A proven, transparent"
            highlight="process"
          />
          <div className="mx-auto mt-14 max-w-4xl">
            <div className="relative">
              <div className="absolute left-5 top-2 h-[calc(100%-2rem)] w-px bg-line" />
              {page.process.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.05}>
                  <div className="relative mb-6 pl-14 sm:pl-16">
                    <span className="absolute left-5 top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-brand-600/20 bg-white font-display text-sm font-bold text-brand-700 shadow-soft">
                      {s.step}
                    </span>
                    <div className="rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:bg-white hover:shadow-glow">
                      <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Relevant services (internal links) */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Explore related" highlight="services" />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.relevantServices.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow"
                >
                  <span className="font-display text-sm font-bold text-ink">{r.name}</span>
                  <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location-specific commercial guidance */}
      {page.contentNotes.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow={`${page.location} market guidance`} title="Planning for your" highlight="local audience" />
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2">
              {page.contentNotes.map((note, i) => (
                <Reveal key={note.heading} delay={i * 0.05}>
                  <div className="h-full rounded-3xl border border-line bg-surface/50 p-6 shadow-soft">
                    <Target className="h-5 w-5 text-brand-600" />
                    <h3 className="mt-3 font-display text-lg font-bold text-ink">{note.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{note.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Business outcomes"
            title="What this can help you"
            highlight="achieve"
          />
          <p className="mx-auto -mt-4 max-w-2xl text-center text-sm text-slate-500">
            These are potential outcomes based on good practice — not guaranteed
            results. Real outcomes depend on your market, competition and effort.
          </p>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {page.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface/50 p-5 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <p className="text-[15px] leading-relaxed text-slate-700">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries we serve */}
      {page.industries && page.industries.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Industries we serve"
              title={`Businesses we help in ${page.location}`}
              highlight=""
            />
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {page.industries.map((ind, i) => (
                <Reveal key={ind.name} delay={i * 0.04}>
                  {(ind.href ?? industryHref(ind.name)) ? (
                    <Link
                      href={(ind.href ?? industryHref(ind.name))!}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                        <Building2 className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-sm font-bold text-ink group-hover:text-brand-700">{ind.name}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{ind.desc}</p>
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">Explore industry SEO <ArrowRight className="h-3 w-3" /></span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Building2 className="h-5 w-5" /></span>
                      <div><h3 className="font-display text-sm font-bold text-ink">{ind.name}</h3><p className="mt-1 text-sm leading-relaxed text-slate-500">{ind.desc}</p></div>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Selected projects and case studies */}
      {page.portfolioLinks && page.portfolioLinks.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Selected work" title="Relevant Webamazee" highlight="case studies" />
            <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
              {page.portfolioLinks.map((project, i) => (
                <Reveal key={project.href} delay={i * 0.05}>
                  <Link href={project.href} className="group flex h-full flex-col rounded-3xl border border-line bg-surface/40 p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow">
                    <Building2 className="h-5 w-5 text-brand-600" />
                    <h3 className="mt-4 font-display text-base font-bold text-ink group-hover:text-brand-700">{project.label}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{project.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Read case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <div className="mt-7 text-center"><Link href="/portfolio" className="text-sm font-semibold text-brand-700 hover:underline">View the complete portfolio</Link></div>
          </div>
        </section>
      )}

      {/* Supporting blog content */}
      {page.blogLinks && page.blogLinks.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Helpful resources" highlight="from our blog" />
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
              {page.blogLinks.map((b, i) => (
                <Reveal key={b.href} delay={i * 0.04}>
                  <Link
                    href={b.href}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/40 p-4 shadow-soft transition-all duration-300 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <Newspaper className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                      {b.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Location cluster links */}
      {page.clusterLinks && page.clusterLinks.length > 0 && (
        <section className="bg-surface py-12">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-slate-500">
              Explore our services in nearby locations
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {page.clusterLinks.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-600" /> {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title={`Questions about ${page.service === "web-design" ? "web design" : "SEO"} in ${page.location}`}
            highlight=""
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={page.faqs} defaultOpen={null} />
          </div>
        </div>
      </section>

      {/* Contextual footer links */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {hubHref && (
              <Link href={hubHref} className="rounded-full border border-brand-600/25 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 shadow-soft transition-all hover:shadow-glow">
                All Services in {page.location}
              </Link>
            )}
            {page.internalLinks.map((l) => (
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

      <CTABanner
        title={page.ctaTitle ?? "Ready to Grow Your Business Online?"}
        subtitle={page.ctaSubtitle ?? "Let's build a stronger digital presence that turns traffic into real opportunities."}
        cta={page.ctaLabel ?? "Get a Free Audit"}
      />
    </>
  );
}
