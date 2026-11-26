import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Globe2,
  BadgeCheck,
  MessageCircleQuestion,
  Target,
  Building2,
  ArrowUpRight,
  Newspaper,
  MapPin,
  ExternalLink,
  Layers,
  Wallet,
  Users,
  Star,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import type { CommercialLocationPage } from "@/lib/locations-commercial";
import { JsonLd } from "@/components/seo/json-ld";
import { Reveal } from "@/components/mohali-preview/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { locationSchema } from "@/lib/location-seo";
import { commercialLocationSchema } from "@/lib/commercial-location-seo";
import { testimonials, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { AgencyEvidence } from "@/components/sections/agency-evidence";
import { hubServiceCrumbs, locationHubHref } from "@/lib/location-hubs";

/**
 * Promoted location page layout.
 *
 * The visual shell comes from the approved `/new-*` redesign (editorial hero,
 * numbered rows, flat rules instead of card grid). Every section that
 * `LocationPageView` renders is preserved here in the same order, so no
 * production field is dropped on promotion.
 */

const SHELL = "mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10";
const EYEBROW =
  "text-[11px] font-bold uppercase tracking-[.18em] text-brand-700";
const H2 =
  "font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[2.15rem] lg:text-[2.4rem]";

/**
 * Human label for the service a page is about. LocationPage pages use
 * `service`; commercial pages carry richer `commercialType` values, so they
 * must not fall through to the generic "SEO" default.
 */
function serviceLabel(page: AnyLocationPage): string {
  if (page.service === "web-design") return "web design";
  const commercial = page as CommercialLocationPage;
  if (commercial.commercialType === "ai-marketing") return "AI marketing";
  if (commercial.commercialType === "digital-marketing") return "digital marketing";
  return "SEO";
}

/** Breadcrumb / hero service label, matching the production pages' wording. */
function crumbServiceLabel(page: AnyLocationPage): string {
  if (page.service === "web-design") return "Web Design";
  const commercial = page as CommercialLocationPage;
  if (commercial.commercialType === "ai-marketing") return "AI Marketing";
  if (commercial.commercialType === "digital-marketing") return "Digital Marketing";
  return "SEO";
}

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

function industryHref(name: string): string | undefined {
  const value = name.toLowerCase();
  if (value.includes("e-commerce") || value.includes("ecommerce") || value.includes("retail"))
    return "/seo-for-ecommerce";
  if (value.includes("saas") || value.includes("software") || value.includes("tech"))
    return "/seo-for-saas";
  if (value.includes("travel") || value.includes("tourism") || value.includes("hospitality"))
    return "/seo-for-tourism";
  if (value.includes("health") || value.includes("clinic")) return "/seo-for-healthcare";
  if (
    value.includes("professional") ||
    value.includes("b2b") ||
    value.includes("finance") ||
    value.includes("legal")
  )
    return "/seo-for-professional-services";
  if (value.includes("local") || value.includes("real estate") || value.includes("home service"))
    return "/seo-for-local-business";
  return undefined;
}

type AnyLocationPage = LocationPage | CommercialLocationPage;

function isCommercial(p: AnyLocationPage): p is CommercialLocationPage {
  return (p as CommercialLocationPage).commercialType !== undefined;
}

export function PromotedLocationPage({ page }: { page: AnyLocationPage }) {
  const commercial = isCommercial(page) ? page : null;
  const isDesign = page.service === "web-design";
  const label = serviceLabel(page);
  const isNewZealandWebDesign = page.slug === "web-designing-company-new-zealand";
  const hubHref = locationHubHref(page.location);

  return (
    <>
      <JsonLd data={commercial ? commercialLocationSchema(commercial) : locationSchema(page as LocationPage)} />

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
              {(
                hubServiceCrumbs(page.location, crumbServiceLabel(page)) ?? [
                  {
                    label: isDesign ? "Web Design" : crumbServiceLabel(page) + " Services",
                    href: isDesign ? "/services/website-development" : "/services/seo-services",
                  },
                ]
              ).map((crumb, i) => (
                <li key={(crumb.href ?? "crumb") + i} className="flex items-center gap-2">
                  <Link href={crumb.href ?? "/services"} className="rounded-sm hover:text-brand-700">
                    {crumb.label}
                  </Link>
                  <span aria-hidden="true">/</span>
                </li>
              ))}
              <li aria-current="page" className="font-semibold text-ink">
                {page.h1}
              </li>
            </ol>
          </nav>

          <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <Reveal>
              <div>
                <span className={EYEBROW}>{page.eyebrow}</span>
                <h1 className="mt-4 max-w-[20ch] font-display text-[2.2rem] font-bold leading-[1.06] tracking-[-.04em] text-ink sm:text-[2.85rem] lg:text-[3.1rem]">
                  {commercial ? (
                    <>
                      {commercial.heroTitle}{" "}
                      <span className="text-brand-700">{commercial.heroHighlight}</span>
                    </>
                  ) : (
                    page.h1
                  )}
                </h1>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.75] text-slate-600 sm:text-base">
                  {commercial ? commercial.heroSubtitle : page.heroText}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {page.heroCtas && page.heroCtas.length > 0 ? (
                    page.heroCtas.slice(0, 2).map((cta, i) => (
                      <Button
                        key={cta.href + cta.label}
                        size="lg"
                        href={cta.href}
                        variant={i === 0 ? "primary" : "secondary"}
                        withArrow={i === 0}
                      >
                        {cta.label}
                      </Button>
                    ))
                  ) : (
                    <>
                      <Button size="lg" href="/contact" withArrow>
                        Get a Free {isDesign ? "Website Audit" : `${label} Audit`}
                      </Button>
                      <Button size="lg" variant="secondary" href="/contact">
                        Talk to Our Team
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={110} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-46px_rgba(11,21,40,.5)]">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-brand-600" />
                  <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">
                    What shapes this work in {page.location}
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {(page.outcomes ?? []).slice(0, 4).map((outcome) => (
                    <li key={outcome} className="flex gap-2.5">
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
                      />
                      <span className="text-[13px] leading-6 text-slate-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] leading-5 text-slate-500">
                  Webamazee works with businesses remotely through structured
                  collaboration. This is a service overview, not a claim of a
                  local office.
                </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- FEATURED PROJECT PROOF */}
      {page.featuredProject && (
        <section className="bg-white py-12 sm:py-16">
          <div className={SHELL}>
            <div className="grid items-center gap-10 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
              <Reveal>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_50px_-40px_rgba(11,21,40,.7)]">
                  <Image
                    src={page.featuredProject.image}
                    alt={page.featuredProject.imageAlt}
                    width={1200}
                    height={750}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full"
                    priority
                  />
                </div>
              </Reveal>
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.14em] text-brand-700">
                    <MapPin className="h-3 w-3" /> {page.featuredProject.eyebrow}
                  </span>
                  <h2 className="mt-4 font-display text-[1.6rem] font-bold leading-tight tracking-[-.025em] text-ink sm:text-[1.95rem]">
                    {page.featuredProject.heading}
                  </h2>
                  <p className="mt-2.5 text-[12.5px] font-semibold text-slate-500">
                    {page.featuredProject.name} · {page.featuredProject.market} ·{" "}
                    {page.featuredProject.year}
                  </p>
                </Reveal>
                <div className="mt-4 space-y-3.5">
                  {page.featuredProject.body.map((paragraph, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <p className="text-[14.5px] leading-[1.75] text-slate-600">{paragraph}</p>
                    </Reveal>
                  ))}
                </div>
                <Reveal>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {page.featuredProject.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11.5px] font-medium text-slate-600"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href={page.featuredProject.caseStudyHref} withArrow>
                      View Case Study
                    </Button>
                    <a
                      href={page.featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                    >
                      Visit Live Website <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- INTRODUCTION */}
      <section className="bg-white pb-14 sm:pb-16">
        <div className={SHELL}>
          <div className="grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:gap-14">
            <Reveal>
              <div>
                <span className={EYEBROW}>The context</span>
                <h2 className={`mt-3 ${H2}`}>
                  {page.sectionTitles?.intro ??
                    (isNewZealandWebDesign
                      ? "Web Design for New Zealand Businesses"
                      : isDesign
                        ? "A website that works for your business"
                        : label === "SEO"
                          ? "Search visibility that builds your business"
                          : `${label.charAt(0).toUpperCase() + label.slice(1)} that builds your business`)}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={90} className="space-y-4 border-l-2 border-brand-600/20 pl-5">
              {page.intro.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-slate-600">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------- COMMERCIAL (AI / DIGITAL) BLOCKS */}
      {commercial && (
        <>
          {/* what it means */}
          <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
            <div className={SHELL}>
              <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:gap-14">
                <Reveal>
                  <div>
                    <span className={EYEBROW}>The essentials</span>
                    <h2 className={`mt-3 ${H2}`}>{commercial.whatItMeans.heading}</h2>
                  </div>
                </Reveal>
                <Reveal delay={90} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                  {commercial.whatItMeans.body.map((p, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.78] text-slate-600">{p}</p>
                  ))}
                  <ul className="flex flex-wrap gap-2 pt-2">
                    {["AI research", "Content workflows", "SEO analysis", "Human review"].map((b) => (
                      <li key={b} className="rounded-full border border-slate-200 bg-[#f7f9fc] px-2.5 py-1 text-[11.5px] font-medium text-slate-600">{b}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>

          {/* AI + human approach */}
          {commercial.aiApproach && (
            <section className="bg-white py-14 sm:py-16">
              <div className={SHELL}>
                <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:gap-14">
                  <Reveal>
                    <div>
                      <span className={EYEBROW}>Our approach</span>
                      <h2 className={`mt-3 ${H2}`}>{commercial.aiApproach.heading}</h2>
                    </div>
                  </Reveal>
                  <Reveal delay={90} className="space-y-4">
                    {commercial.aiApproach.body.map((p, i) => (
                      <p key={i} className="text-[14.5px] leading-[1.78] text-slate-600">{p}</p>
                    ))}
                  </Reveal>
                </div>
              </div>
            </section>
          )}

          {/* commercial services grid */}
          <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
            <div className={SHELL}>
              <SectionHead eyebrow="Services" title={`Services we deliver in ${commercial.location}`} />
              <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                {commercial.commercialServices.map((service, i) => (
                  <Reveal key={service.slug + service.name} delay={i * 0.03}>
                    <Link href={`/services/${service.slug}`} className="group flex h-full flex-col bg-white p-5 transition hover:bg-brand-50/50">
                      <Layers className="h-4 w-4 text-brand-600/70" />
                      <h3 className="mt-3 font-display text-[14px] font-bold leading-snug text-ink transition group-hover:text-brand-700">{service.name}</h3>
                      <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.6] text-slate-500">{service.desc}</p>
                      <p className="mt-2.5 border-l-2 border-brand-600/25 pl-2.5 text-[12px] font-medium leading-[1.55] text-slate-700">{service.benefit}</p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* strategies */}
          <section className="bg-white py-14 sm:py-16">
            <div className={SHELL}>
              <SectionHead
                eyebrow="Application"
                title={commercial.commercialType === "ai-marketing"
                  ? `How AI can help businesses in ${commercial.location}`
                  : `Digital marketing strategies for businesses in ${commercial.location}`}
              />
              <div className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2">
                {commercial.strategies.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.035}>
                    <div className="border-t border-slate-200 py-5">
                      <h3 className="font-display text-[14.5px] font-bold text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-[1.68] text-slate-500">{item.body}</p>
                      {item.link && (
                        <Link href={item.link.href} className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-700 hover:underline">
                          {item.link.label} <ArrowRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
          {/* AI SEO & search visibility */}
          {commercial.aiSearch && (
            <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
              <div className={SHELL}>
                <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:gap-14">
                  <Reveal>
                    <div>
                      <span className={EYEBROW}>Search</span>
                      <h2 className={`mt-3 ${H2}`}>{commercial.aiSearch.heading}</h2>
                    </div>
                  </Reveal>
                  <Reveal delay={90} className="space-y-4">
                    {commercial.aiSearch.body.map((p, i) => (
                      <p key={i} className="text-[14.5px] leading-[1.78] text-slate-600">{p}</p>
                    ))}
                  </Reveal>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* -------------------------------------------------------- PROOF BAND */}
      {!page.hideStats && <AgencyEvidence />}

      {/* --------------------------------- LOCATION-SPECIFIC SERVICE ROUTES */}
      {page.locationServices && page.locationServices.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead
              eyebrow="Services in your market"
              title={`Digital services for businesses in ${page.location}`}
            />
            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
              {page.locationServices.map((service, i) => (
                <Reveal key={service.href} delay={i * 0.04}>
                  <Link
                    href={service.href}
                    className="group flex h-full flex-col bg-white p-5 transition hover:bg-brand-50/50"
                  >
                    <Globe2 className="h-4 w-4 text-brand-600/70 transition group-hover:text-brand-600" />
                    <h3 className="mt-3 font-display text-[14px] font-bold leading-snug text-ink">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.6] text-slate-500">
                      {service.description}
                    </p>
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
      )}

      {/* ------------------------------------------------------ SEARCH INTENT */}
      {page.intent && page.intent.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead
              eyebrow={isNewZealandWebDesign ? "Enquiry conversion" : "What to expect"}
              title={
                (isNewZealandWebDesign ? "A clear path from visit to" : "What this service") +
                " " +
                (isNewZealandWebDesign ? "enquiry" : "covers")
              }
            />
            <div className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2">
              {page.intent.map((item, i) => (
                <Reveal key={item.heading} delay={i * 0.04}>
                  <div className="border-t border-slate-200 py-5">
                    <div className="flex items-start gap-3">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <div>
                        <h3 className="font-display text-[14.5px] font-bold text-ink">{item.heading}</h3>
                        <p className="mt-1.5 text-[13px] leading-[1.7] text-slate-500">{item.body}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ CORE SERVICE */}
      {page.coreService && page.coreService.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <div className="grid gap-8 lg:grid-cols-[.62fr_1.38fr] lg:gap-14">
              <Reveal>
                <div>
                  <span className={EYEBROW}>How the work is approached</span>
                  <h2 className={`mt-3 ${H2}`}>
                    {page.sectionTitles?.coreService ??
                      (isNewZealandWebDesign
                        ? "What web design and development includes"
                        : isDesign
                          ? "What you get with professional web design"
                          : `What you get with a strategic ${label} engagement`)}
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={90} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
                {page.coreService.map((p, i) => (
                  <p key={i} className="text-[14.5px] leading-[1.78] text-slate-600">
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------- WHY NEEDED */}
      <section className="bg-white py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead
            eyebrow={isNewZealandWebDesign ? "Practical website planning" : "Why it matters"}
            title={
              page.sectionTitles?.whyNeeds ??
              (isNewZealandWebDesign
                ? "What a New Zealand business website should do"
                : `Why businesses in ${page.location} need this service`)
            }
          />
          <div className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {page.whyNeeds.map((item, i) => (
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

      {/* ---------------------------------------------------- WHAT'S INCLUDED */}
      {page.servicesIncluded.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead
              eyebrow={isNewZealandWebDesign ? "Services available" : "Services included"}
              title={
                page.sectionTitles?.servicesIncluded ??
                (isNewZealandWebDesign
                  ? "Website design and development services"
                  : `What's included with ${label} in ${page.location}`)
              }
            />
            <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {page.servicesIncluded.map((service, i) => (
                <Reveal key={service.slug + service.name} delay={i * 0.03}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col bg-white p-5 transition hover:bg-brand-50/50"
                  >
                    <Layers className="h-4 w-4 text-brand-600/70" />
                    <h3 className="mt-3 font-display text-[14px] font-bold leading-snug text-ink transition group-hover:text-brand-700">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.6] text-slate-500">
                      {service.desc}
                    </p>
                    {service.benefit && (
                      <p className="mt-2.5 border-l-2 border-brand-600/25 pl-2.5 text-[12px] font-medium leading-[1.55] text-slate-700">
                        {service.benefit}
                      </p>
                    )}
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- TECHNOLOGIES */}
      {page.technologies && page.technologies.items.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Platforms" title={page.technologies.heading} />
            <p className="mt-4 max-w-[60ch] text-[14.5px] leading-[1.75] text-slate-600">
              {page.technologies.intro}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.technologies.items.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.03}>
                  <div className="h-full rounded-xl border border-slate-200 bg-[#f7f9fc] p-4">
                    <h3 className="font-display text-[13.5px] font-bold text-ink">{item.name}</h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-slate-500">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------- WHY CHOOSE */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Why Webamazee"
            title={
              page.sectionTitles?.whyChoose ??
              (isNewZealandWebDesign
                ? "A considered approach to website design and development"
                : "A global digital growth partner for your business")
            }
          />
          <div className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {(commercial ? commercial.commercialWhyChoose : page.whyChoose).map((item, i) => (
              <Reveal key={item.title} delay={i * 0.035}>
                <div className="border-t border-slate-200 py-5">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-brand-600" />
                    <h3 className="font-display text-[14.5px] font-bold text-ink">{item.title}</h3>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- REMOTE DELIVERY */}
      {page.remoteDelivery && page.remoteDelivery.steps.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Working together" title={page.remoteDelivery.heading} />
            <p className="mt-4 max-w-[62ch] text-[14.5px] leading-[1.75] text-slate-600">
              {page.remoteDelivery.intro}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.remoteDelivery.steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 0.04}>
                  <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-[#f7f9fc] p-4">
                    <span className="font-display text-[11px] font-bold tabular-nums text-brand-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 font-display text-[13.5px] font-bold text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-slate-500">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- PROCESS */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead
            eyebrow={isNewZealandWebDesign ? "Five-step process" : "Our Process"}
            title={
              page.sectionTitles?.process ??
              (isNewZealandWebDesign ? "From the first brief to launch" : "A proven, transparent process")
            }
          />
          {commercial?.processIntro && (
            <p className="mt-4 max-w-[62ch] text-[14.5px] leading-[1.75] text-slate-600">
              {commercial.processIntro}
            </p>
          )}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {page.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.04}>
                <div className="flex h-full flex-col border-t-2 border-brand-600/25 pt-4">
                  <span className="font-display text-[11px] font-bold tabular-nums text-brand-600/60">
                    {step.step}
                  </span>
                  <h3 className="mt-1.5 font-display text-[14px] font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.62] text-slate-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- DEEP DIVES */}
      {page.deepDives && page.deepDives.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <div className="space-y-14">
              {page.deepDives.map((dive) => (
                <div key={dive.heading}>
                  <SectionHead eyebrow={dive.eyebrow ?? "In depth"} title={dive.heading} />
                  {dive.intro && dive.intro.length > 0 && (
                    <div className="mt-5 max-w-[68ch] space-y-4">
                      {dive.intro.map((p, i) => (
                        <Reveal key={i}>
                          <p className="text-[14.5px] leading-[1.78] text-slate-600">{p}</p>
                        </Reveal>
                      ))}
                    </div>
                  )}
                  {dive.groups && dive.groups.length > 0 && (
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {dive.groups.map((group) => (
                        <Reveal key={group.title}>
                          <div className="h-full rounded-xl border border-slate-200 bg-[#f7f9fc] p-5">
                            <h3 className="font-display text-[13.5px] font-bold text-ink">
                              {group.title}
                            </h3>
                            <ul className="mt-2 space-y-1.5">
                              {group.points.map((point) => (
                                <li key={point} className="flex gap-2">
                                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                                  <span className="text-[12.5px] leading-[1.6] text-slate-600">
                                    {point}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Reveal>
                      ))}
                    </div>
                  )}
                  {dive.note && (
                    <p className="mt-5 max-w-[68ch] border-l-2 border-brand-600/25 pl-4 text-[13.5px] leading-[1.7] text-slate-600">
                      {dive.note}
                    </p>
                  )}
                  {dive.links && dive.links.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {dive.links.map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------- RELEVANT SERVICES */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead eyebrow="Related" title="Explore related services" />
          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {page.relevantServices.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.03}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-center justify-between gap-3 bg-white p-4 transition hover:bg-brand-50/50"
                >
                  <span className="font-display text-[13px] font-bold text-ink transition group-hover:text-brand-700">
                    {service.name}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-brand-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CONTENT NOTES */}
      {page.contentNotes.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead
              eyebrow={
                isNewZealandWebDesign ? "Mobile, SEO and migration" : `${page.location} market guidance`
              }
              title={
                isNewZealandWebDesign
                  ? "Foundations for a useful website"
                  : "Planning for your local audience"
              }
            />
            <div className="mt-8 space-y-8">
              {page.contentNotes.map((note) => (
                <Reveal key={note.heading}>
                  <div className="max-w-[68ch]">
                    <h3 className="font-display text-[15px] font-bold text-ink">{note.heading}</h3>
                    <p className="mt-2 text-[14px] leading-[1.78] text-slate-600">{note.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ----------------------------------------------------------- OUTCOMES */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
        <div className={SHELL}>
          <SectionHead
            eyebrow={isNewZealandWebDesign ? "Practical deliverables" : "Business outcomes"}
            title={
              page.sectionTitles?.outcomes ??
              (isNewZealandWebDesign
                ? "A well-planned site can support clearer customer journeys"
                : "What this can help you achieve")
            }
          />
          <p className="mt-4 max-w-[62ch] text-[13px] leading-[1.7] text-slate-500">
            {page.outcomesNote ??
              "Outcomes are not guaranteed: they depend on your market, competition and how the site is maintained. The points below are what the build is designed to support."}
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {page.outcomes.map((outcome, i) => (
              <Reveal key={outcome} delay={i * 0.03}>
                <div className="flex items-start gap-3 border-t border-slate-200 py-3.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <p className="text-[13.5px] leading-[1.65] text-slate-600">{outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- INDUSTRIES */}
      {page.industries && page.industries.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead
              eyebrow="Industries we serve"
              title={page.sectionTitles?.industries ?? `Businesses we help in ${page.location}`}
            />
            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.industries.map((industry, i) => {
                const href = industry.href ?? industryHref(industry.name);
                const content = (
                  <>
                    <Building2 className="h-4 w-4 text-brand-600/70" />
                    <h3 className="mt-2.5 font-display text-[13.5px] font-bold text-ink">{industry.name}</h3>
                    <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-500">{industry.desc}</p>
                  </>
                );
                return (
                  <Reveal key={industry.name} delay={i * 0.03}>
                    {href ? (
                      <Link
                        href={href}
                        className="group flex h-full flex-col rounded-xl border border-slate-200 bg-[#f7f9fc] p-4 transition hover:border-brand-600/35 hover:bg-white"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-[#f7f9fc] p-4">
                        {content}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------ PRICING */}
      {page.pricing && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Budget" title={page.pricing.heading} />
            <div className="mt-8 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
              <div className="space-y-4">
                {page.pricing.intro.map((p, i) => (
                  <Reveal key={i}>
                    <p className="text-[14.5px] leading-[1.78] text-slate-600">{p}</p>
                  </Reveal>
                ))}
                <Reveal>
                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    <Button href={page.pricing.ctaHref} withArrow>
                      {page.pricing.ctaLabel}
                    </Button>
                    {page.pricing.secondaryLabel && page.pricing.secondaryHref && (
                      <Button href={page.pricing.secondaryHref} variant="secondary">
                        {page.pricing.secondaryLabel}
                      </Button>
                    )}
                  </div>
                </Reveal>
                {page.pricing.note && (
                  <Reveal>
                    <p className="text-[12.5px] leading-[1.65] text-slate-500">{page.pricing.note}</p>
                  </Reveal>
                )}
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Wallet className="h-4 w-4 text-brand-600" />
                  <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">
                    What changes the estimate
                  </p>
                </div>
                <div className="mt-3">
                  {page.pricing.factors.map((factor, i) => (
                    <Reveal key={factor.title} delay={i * 0.03}>
                      <div className="flex items-start gap-3 border-t border-slate-100 py-2.5 first:border-t-0">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                        <div>
                          <h3 className="text-[13px] font-bold text-ink">{factor.title}</h3>
                          <p className="mt-0.5 text-[12.5px] leading-[1.6] text-slate-500">
                            {factor.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------- SELECTED PROJECTS */}
      {page.portfolioLinks && page.portfolioLinks.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Selected work" title="Relevant Webamazee case studies" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.portfolioLinks.map((project, i) => (
                <Reveal key={project.href} delay={i * 0.04}>
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-600/40 hover:shadow-[0_18px_36px_-28px_rgba(15,109,255,.5)]"
                  >
                    <div>
                      <h3 className="font-display text-[14px] font-bold text-ink transition group-hover:text-brand-700">
                        {project.label}
                      </h3>
                      {project.description && (
                        <p className="mt-1.5 text-[12.5px] leading-[1.62] text-slate-500">
                          {project.description}
                        </p>
                      )}
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

      {/* ------------------------------------------------------------ REVIEWS */}
      {page.showReviews && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Trust" title="What clients say in their own words" />
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {testimonials.slice(0, 3).map((review) => (
                <Reveal key={review.name}>
                  <figure className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex gap-1 text-amber-400" aria-label={`${review.rating} star review`}>
                      {Array.from({ length: review.rating }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-slate-600">
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="mt-4 border-t border-slate-200 pt-3.5">
                      <p className="font-display text-[13px] font-bold text-ink">{review.name}</p>
                      <p className="mt-0.5 text-[11.5px] text-slate-500">{review.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700 hover:underline"
              >
                View review source <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- BLOG LINKS */}
      {page.blogLinks && page.blogLinks.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <SectionHead eyebrow="Resources" title="Helpful resources from our blog" />
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {page.blogLinks.map((post, i) => (
                <Reveal key={post.href} delay={i * 0.04}>
                  <Link
                    href={post.href}
                    className="group flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-600/35"
                  >
                    <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-brand-600/70" />
                    <span className="font-display text-[13px] font-bold leading-snug text-ink transition group-hover:text-brand-700">
                      {post.label}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------- COMMERCIAL CROSS / CLUSTER LINKS */}
      {commercial && (
        <>
          {hubHref && (
            <section className="bg-white py-8">
              <div className={SHELL}>
                <p className="text-center text-[13px] font-semibold text-slate-500">
                  Explore all services in {commercial.location}
                </p>
                <div className="mt-4 flex justify-center">
                  <Link href={hubHref} className="inline-flex items-center gap-1.5 rounded-lg border border-brand-600/30 bg-brand-50 px-4 py-2 text-[12.5px] font-semibold text-brand-700">
                    {commercial.location} Services Hub <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>
          )}
          {[{ label: commercial.crossTitle ?? "Explore more in the same region", links: commercial.crossLinks },
            { label: commercial.clusterTitle ?? "Our services in nearby locations", links: commercial.locationCluster }].map((group) => (
            <section key={group.label} className="border-t border-slate-200 bg-[#f7f9fc] py-10">
              <div className={SHELL}>
                <p className="text-center text-[13px] font-semibold text-slate-500">{group.label}</p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {group.links.map((link) => (
                    <Link key={link.href + link.label} href={link.href} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700">
                      {link.label}<ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      {/* ------------------------------------------------------ CLUSTER LINKS */}
      {!commercial && page.clusterLinks && page.clusterLinks.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={SHELL}>
            <p className="text-center text-[13px] font-semibold text-slate-500">
              {page.clusterTitle ?? "Explore our services in nearby locations"}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {page.clusterLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
              {hubHref && (
                <Link
                  href={hubHref}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand-600/30 bg-brand-50 px-3 py-1.5 text-[12px] font-semibold text-brand-700 transition hover:border-brand-600/60"
                >
                  All {page.location} services
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- FAQ */}
      {page.faqs.length > 0 && (
        <section className="bg-white py-14 sm:py-16">
          <div className={SHELL}>
            <div className="grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
              <Reveal>
                <div>
                  <span className={EYEBROW}>Frequently asked questions</span>
                  <h2 className={`mt-3 ${H2}`}>
                    Questions about {label} in{" "}
                    {page.location}
                  </h2>
                  <div className="mt-5 flex items-center gap-2 text-[12.5px] text-slate-500">
                    <MessageCircleQuestion className="h-4 w-4 text-brand-600" />
                    Still unsure? Ask directly.
                  </div>
                </div>
              </Reveal>
              <div>
                <Accordion items={page.faqs} defaultOpen={0} idPrefix={`loc-${page.slug}`} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------ FOOTER LINKS */}
      {page.internalLinks.length > 0 && (
        <section className="border-t border-slate-200 bg-[#f7f9fc] py-10">
          <div className={SHELL}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[.16em] text-slate-400">
                <Users className="h-3 w-3" /> Related pages
              </span>
              {page.internalLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-[12.5px] font-medium text-slate-600 transition hover:text-brand-700"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- CTA BANNER */}
      <section className="bg-white py-12 sm:py-14">
        <div className={SHELL}>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-brand-600/20 bg-gradient-to-br from-brand-600 via-brand-600 to-brand-700 px-6 py-9 text-white sm:px-10 sm:py-11">
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
                    <Sparkles className="h-3 w-3" />
                    {isDesign ? "Free 30 minute website call" : `Free 30 minute ${label} call`}
                  </span>
                  <h2 className="mt-3 font-display text-[1.45rem] font-bold leading-snug sm:text-[1.75rem]">
                    {page.ctaTitle ?? "Ready to Grow Your Business Online?"}
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-white/80">
                    {page.ctaSubtitle ??
                      "Let's build a stronger digital presence that turns traffic into real opportunities."}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <Button href={page.ctaHref ?? "/contact"} variant="secondary" withArrow>
                    {page.ctaLabel ?? "Get a Free Website Consultation"}
                  </Button>
                  {page.ctaSecondaryLabel && page.ctaSecondaryHref && (
                    <Button
                      href={page.ctaSecondaryHref}
                      variant="secondary"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                    >
                      {page.ctaSecondaryLabel}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
