import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Building2,
  MapPin,
  Layers,
  MessageCircleQuestion,
  Sparkles,
} from "lucide-react";
import type { LocationHub } from "@/lib/location-hubs";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/mohali-preview/reveal";
import { locationHubSchema } from "@/lib/location-hubs";

/**
 * Promoted location-hub layout.
 *
 * Same editorial shell as `PromotedLocationPage`, mapped onto the hub data
 * shape. Every field the original `LocationHubPage` renders is preserved.
 */

const SHELL = "mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10";
const EYEBROW = "text-[11px] font-bold uppercase tracking-[.18em] text-brand-700";
const H2 =
  "font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[2.15rem] lg:text-[2.4rem]";

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <div className="max-w-[46rem]">
        <span className={EYEBROW}>{eyebrow}</span>
        <h2 className={`mt-3 ${H2}`}>{title}</h2>
      </div>
    </Reveal>
  );
}

export function PromotedLocationHubPage({ hub }: { hub: LocationHub }) {
  return (
    <>
      <JsonLd data={locationHubSchema(hub)} />

      {/* ---------------------------------------------------------------- HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f3f7fb] pt-24 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 88% 0%, rgba(15,109,255,.10), transparent 62%)",
          }}
        />
        <div className={`relative ${SHELL} pb-12 pt-6 sm:pb-16`}>
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
              <li>
                <Link href="/" className="rounded-sm hover:text-brand-700">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="rounded-sm hover:text-brand-700">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-ink">
                {hub.h1}
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <Reveal from="left">
              <div>
                <span className={EYEBROW}>Services · {hub.location}</span>
                <h1 className="mt-4 max-w-[20ch] font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-.04em] text-ink sm:text-[2.85rem] lg:text-[3.1rem]">
                  {hub.h1}
                </h1>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.75] text-slate-600 sm:text-base">
                  {hub.heroText}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" href="/contact" withArrow>
                    Get a Free Audit
                  </Button>
                  <Button size="lg" variant="secondary" href="/services">
                    Browse All Services
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={110} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-46px_rgba(11,21,40,.5)]">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin aria-hidden="true" className="h-4 w-4 text-brand-600" />
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">
                  Service area
                </p>
              </div>
              <p className="mt-4 text-[13px] leading-6 text-slate-600">{hub.collaboration}</p>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] leading-5 text-slate-500">
                Webamazee works with businesses remotely through structured
                collaboration. This is a service overview, not a claim of a local
                office.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- INTRODUCTION */}
      <section className="bg-white py-14 sm:py-16">
        <div className={SHELL}>
          <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
            <Reveal>
              <div>
                <span className={EYEBROW}>The context</span>
                <h2 className={`mt-3 ${H2}`}>What businesses in {hub.location} are working with</h2>
              </div>
            </Reveal>
            <Reveal delay={90} className="space-y-4 border-l-2 border-brand-600/20 pl-5">
              {hub.intro.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-slate-600">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- NEEDS */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead eyebrow="What this solves" title={`What businesses in ${hub.location} actually need`} />
          <div className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {hub.needs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.035}>
                <div className="flex gap-4 border-t border-slate-200 py-5">
                  <span className="font-display text-[12px] font-bold tabular-nums leading-[1.7] text-brand-600/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[14.5px] font-bold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.68] text-slate-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- SERVICES */}
      <section className="bg-white py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead eyebrow="Services in your market" title={`Digital services for businesses in ${hub.location}`} />
          <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {hub.services.map((service, i) => (
              <Reveal key={service.href} delay={i * 0.04}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col bg-white p-5 transition hover:bg-brand-50/50"
                >
                  <Globe2 className="h-4 w-4 text-brand-600/70 transition group-hover:text-brand-600" />
                  <h3 className="mt-3 font-display text-[14px] font-bold leading-snug text-ink">{service.name}</h3>
                  <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.6] text-slate-500">{service.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700">
                    {service.cta}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- SEO / ECOM FOCUS */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead eyebrow="Where the focus goes" title={`What we focus on for ${hub.location} businesses`} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5">
                <Layers className="h-4 w-4 text-brand-600/70" />
                <p className="mt-3 text-[13.5px] leading-[1.7] text-slate-600">{hub.seoFocus}</p>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="h-full rounded-xl border border-slate-200 bg-white p-5">
                <Sparkles className="h-4 w-4 text-brand-600/70" />
                <p className="mt-3 text-[13.5px] leading-[1.7] text-slate-600">{hub.ecommerceFocus}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- INDUSTRIES */}
      {hub.industries.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Industries we serve" title={`Businesses we help in ${hub.location}`} />
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {hub.industries.map((industry, i) => (
                <Reveal key={industry.name} delay={i * 0.03}>
                  <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-[#f7f9fc] p-4">
                    <Building2 className="h-4 w-4 text-brand-600/70" />
                    <h3 className="mt-2.5 font-display text-[13.5px] font-bold text-ink">{industry.name}</h3>
                    <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-500">{industry.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- PROJECTS */}
      {hub.projects.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Selected work" title="Relevant Webamazee case studies" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {hub.projects.map((project, i) => (
                <Reveal key={project.href} delay={i * 0.04}>
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-600/40"
                  >
                    <div>
                      <h3 className="font-display text-[14px] font-bold text-ink transition group-hover:text-brand-700">
                        {project.name}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-[1.62] text-slate-500">{project.summary}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-700">
                      View project
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- FAQ */}
      {hub.faqs.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
              <Reveal>
                <div>
                  <span className={EYEBROW}>Frequently asked questions</span>
                  <h2 className={`mt-3 ${H2}`}>Questions about services in {hub.location}</h2>
                  <div className="mt-5 flex items-center gap-2 text-[12.5px] text-slate-500">
                    <MessageCircleQuestion className="h-4 w-4 text-brand-600" />
                    Still unsure? Ask directly.
                  </div>
                </div>
              </Reveal>
              <div>
                <Accordion items={hub.faqs} defaultOpen={0} idPrefix={`hub-${hub.slug}`} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- CTA BANNER */}
      <section className="border-t border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
        <div className={SHELL}>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 px-6 py-9 text-white sm:px-10 sm:py-11">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(55% 70% at 92% 15%, rgba(255,255,255,.14), transparent 65%)",
                }}
              />
              <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-[52ch]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em]">
                    <Sparkles className="h-3 w-3" /> Free 30 minute strategy call
                  </span>
                  <h2 className="mt-3 font-display text-[1.45rem] font-bold leading-snug sm:text-[1.75rem]">
                    Planning a project in {hub.location}?
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-white/80">
                    Share your services, audience and goals. Webamazee will
                    recommend a practical structure and next step.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button href="/contact" variant="secondary" withArrow>
                    Get a Free Website Consultation
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
