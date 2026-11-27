/**
 * Merged service page template.
 *
 * Visual language comes from the /services/new* preview designs (1320px
 * container, #0f6dff accent, #0b1528 ink). Content comes from the production
 * data layer in "@/lib/services" so nothing from the production pages is lost:
 * every section, heading, paragraph, list, FAQ and internal link is rendered.
 *
 * Optional extras (quality strip, custom quote, pricing, industries with
 * descriptions, selected work, editorial problem grids) are supplied per
 * service and only fill gaps the production template did not already cover.
 */
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Plus,
  Quote,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import type { Service } from "@/lib/services";
import { getRelatedServices } from "@/lib/services";
import { getCaseStudy } from "@/lib/case-studies";
import { testimonials as googleReviews, GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { JsonLd } from "../seo/json-ld";
import { getServiceSeo } from "@/lib/content-seo";
import { Breadcrumb } from "../layout/breadcrumb";
import { ServiceIcon } from "./service-icon";

export const CALENDLY_URL = "https://calendly.com/webamazee/30min";

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrowCls = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const headingCls = "font-display text-[1.85rem] font-bold leading-[1.16] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";
const primaryCls = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const secondaryCls = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
/** Industry chips that production links to a matching industry SEO page. */
const INDUSTRY_ROUTES: Record<string, string> = {
  "E-Commerce": "/seo-for-ecommerce",
  SaaS: "/seo-for-saas",
  Healthcare: "/seo-for-healthcare",
  Travel: "/seo-for-tourism",
  "Professional Services": "/seo-for-professional-services",
  "Local Business": "/seo-for-local-business",
};

const darkSecondaryCls = "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export type LinkItem = { label: string; href: string; description: string };

export type MergedProject = {
  slug: string;
  name: string;
  image: string;
  tag: string;
  summary: string;
  liveUrl: string;
};

export type MergedServiceExtras = {
  /** Extra quality/benefit points shown beside the "why choose" reasons. */
  qualityPoints?: { title: string; text: string }[];
  /** Editorial problem cards layered on top of the production pains. */
  problemCards?: { title: string; text: string }[];
  /** Genuine case studies surfaced as "selected work". */
  projects?: MergedProject[];
  projectsTitle?: string;
  projectsNote?: string;
  /** Custom-quote block instead of a published package price. */
  customQuote?: { intro: string; includes: string[]; note: string };
  /** Published package pricing, read from the pricing catalogue. */
  pricing?: {
    intro: string;
    packageName?: string;
    usd: number;
    inr: string;
    usdLabel: string;
    inrLabel: string;
    inclusions: string[];
    note: string;
    cta: string;
  };
  /** Industries with a short explanation, in place of the plain chip list. */
  industryNotes?: { name: string; text: string }[];
  localWebsiteLinks: LinkItem[];
  localSeoLinks?: LinkItem[];
  localWebsiteHeading?: { eyebrow: string; title: string; intro: string };
  heroAside?: "image" | "none";
  /** Slug of the case study shown in a hero screenshot. */
  heroProject?: MergedProject;
  closingTitle?: string;
  closingSubtitle?: string;
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={eyebrowCls}>{eyebrow}</p>
      <h2 className={`${headingCls} mt-2`}>{title}</h2>
      {intro && <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}

function HeroFigure({
  project,
  label,
}: {
  project: MergedProject;
  label: string;
}) {
  return (
    <figure className="rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <Image
          src={project.image}
          alt={`Screenshot of the ${project.name} website project`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{label}</p>
          <p className="mt-1 font-display text-base font-bold">{project.name}</p>
        </div>
        <span className="flex flex-wrap gap-x-4 gap-y-1">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline"
          >
            Visit site <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <Link
            href={`/case-studies/${project.slug}`}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0f6dff]"
          >
            Case study <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MergedServicePage({
  service,
  extras,
}: {
  service: Service;
  extras: MergedServiceExtras;
}) {
  const related = getRelatedServices(service);
  const localLinks = extras.localWebsiteLinks;
  const localSeoHrefs = new Set((extras.localSeoLinks ?? []).map((l) => l.href));
  // Never render the same destination twice on one page.
  const filteredLocalLinks = localLinks.filter((l) => !localSeoHrefs.has(l.href));
  const pricing = extras.pricing;

  const next = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <JsonLd data={getServiceSeo(service.slug)?.schema ?? []} />
      <div id="main-content" className="overflow-x-clip">
        {/* 1-2. Breadcrumb + hero */}
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={container}>
            <Breadcrumb crumbs={[{ label: "Services", href: "/services" }, { label: service.shortName }]} />
            <div className={`mt-8 grid items-center gap-9 ${extras.heroAside === "none" ? "" : "lg:grid-cols-2 lg:gap-12"}`}>
              <div>
                <p className={eyebrowCls}>{service.hero.eyebrow}</p>
                <h1 className="mt-4 max-w-2xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.55rem]">
                  {service.hero.title}{" "}
                  <span className="text-[#0f6dff]">{service.hero.highlight}</span>
                </h1>
                <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  {service.hero.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className={primaryCls}>
                    Get a free proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={secondaryCls}>
                    Book a strategy call <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
                <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-slate-500">
                  {service.hero.trust.map((t, i) => (
                    <li key={t} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
                      <span className="inline-flex items-center gap-1.5">
                        <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {extras.heroAside !== "none" && extras.heroProject && (
                <HeroFigure project={extras.heroProject} label="Selected project" />
              )}
            </div>
          </div>
        </section>

        {/* 3. Common problems we solve every day */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Sound familiar?"
              title="Common problems we solve every day"
              intro="If any of these ring true, you are losing traffic, leads and revenue - and you are not alone."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {service.pains.map((pain, i) => (
                <article key={pain.title} className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]/40">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[15px] font-bold">{pain.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{pain.desc}</p>
                  <span className="mt-3 inline-block font-display text-[11px] font-bold text-slate-300">{next(i + 1)}</span>
                </article>
              ))}
            </div>
            {extras.problemCards && extras.problemCards.length > 0 && (
              <div className="mt-8 grid gap-x-8 gap-y-0 border-t border-slate-200 sm:grid-cols-2">
                {extras.problemCards.map((p) => (
                  <div key={p.title} className="border-b border-slate-200 py-4">
                    <h3 className="font-display text-[15px] font-bold">{p.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{p.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. What this service covers */}
        <section className="bg-[#f7f9fc] py-12 sm:py-14">
          <div className={container}>
            <SectionHead eyebrow="Service overview" title="What this service covers" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              <div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-45px_rgba(11,21,40,0.4)]">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0f6dff] text-white">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-bold">{service.name}</h3>
                    <p className="text-[13px] text-slate-600">{service.shortDesc}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-4">
                  {service.overview.map((p, i) => (
                    <p key={i} className="text-[15px] leading-[1.7] text-slate-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
                    <Target aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" /> Who needs this?
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.whoNeeds.map((w) => (
                      <li key={w} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-[#0f6dff]/20 bg-[#eef4ff] p-5">
                  <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
                    <Sparkles aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" /> Common project scenarios
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {service.examples.map((e) => (
                      <li key={e} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                        <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why it matters */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <SectionHead eyebrow="Why it matters" title={`${service.whyMattersTitle} for your business`} />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="space-y-4">
                {service.whyMatters.map((p, i) => (
                  <p key={i} className="text-[15px] leading-[1.7] text-slate-600">
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Baseline first", description: "Start with your current position and goals." },
                  { title: "Relevant measures", description: "Choose indicators that fit the engagement." },
                  { title: "Clear reporting", description: "Review progress in plain language." },
                  { title: "No generic promises", description: "Set expectations around your business context." },
                ].map((principle) => (
                  <div key={principle.title} className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4">
                    <p className="font-display text-[14px] font-bold text-[#0b1528]">{principle.title}</p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. A proven six-step process */}
        <section className="bg-[#f7f9fc] py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Our process"
              title="A proven six-step process"
              intro="Transparent, repeatable and built around measurable outcomes."
            />
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.process.map((step) => (
                <li key={step.step} className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]/40">
                  <span className="font-display text-[13px] font-bold text-[#0f6dff]">{step.step}</span>
                  <h3 className="mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 7. Everything in your engagement */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="What's included"
              title="Everything in your engagement"
              intro="Clear deliverables, tools and reporting - so you always know what you are getting."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.included.map((item) => (
                <article key={item.title} className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                    <ServiceIcon name={item.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 8. A partner built for your success */}
        <section className="bg-[#f7f9fc] py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Why Webamazee"
              title="A partner built for your success"
              intro="Here is what makes working with us different."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr] lg:gap-8">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {service.whyChoose.map((reason) => (
                  <article key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0f6dff] text-white">
                      <ServiceIcon name={reason.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="mt-3.5 font-display text-[15px] font-bold">{reason.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{reason.desc}</p>
                  </article>
                ))}
              </div>
              {extras.qualityPoints && extras.qualityPoints.length > 0 && (
                <div className="rounded-2xl bg-[#0b1528] p-6 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">Built in by default</p>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight">What every project gets</h3>
                  <ul className="mt-4 space-y-3">
                    {extras.qualityPoints.map((q) => (
                      <li key={q.title} className="flex items-start gap-2.5">
                        <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#87b4ff]" />
                        <div>
                          <p className="text-[13px] font-bold leading-snug">{q.title}</p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-300">{q.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 9. We serve businesses in every niche */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Industries"
              title="We serve businesses in every niche"
              intro="Our strategies adapt to your market, audience and goals."
            />
            {extras.industryNotes && extras.industryNotes.length > 0 ? (
              <ul className="mt-8 grid gap-x-8 gap-y-0 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                {extras.industryNotes.map((ind) => (
                  <li key={ind.name} className="border-b border-slate-200 py-4">
                    <h3 className="font-display text-[15px] font-bold">{ind.name}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{ind.text}</p>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {service.industries.map((ind) =>
                INDUSTRY_ROUTES[ind] ? (
                  <Link
                    key={ind}
                    href={INDUSTRY_ROUTES[ind]}
                    aria-label={`Explore SEO for ${ind}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
                  >
                    <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    {ind}
                  </Link>
                ) : (
                  <span
                    key={ind}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-2.5 text-[13px] font-semibold text-slate-700"
                  >
                    <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    {ind}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* 10. Backed by the best tools */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Technology & tools"
              title="Backed by the best tools"
              intro="We use the same platforms top-performing businesses rely on."
            />
            <div className="mt-7 flex flex-wrap gap-2.5">
              {service.techStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 11. Progress measured against your starting point */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Measurement & reporting"
              title="Progress measured against your starting point"
              intro="We agree the measures that matter after reviewing your goals and baseline. No generic averages or guaranteed outcomes."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {service.measurementAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f7f9fc] px-5 py-4">
                  <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff]" />
                  <span className="text-[13.5px] font-semibold">{area}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-slate-500">
              Reporting reflects the data available to your business and the goals agreed for the engagement.
            </p>
          </div>
        </section>

        {/* Pricing / custom quote */}
        {pricing && (
          <section id="pricing" className="scroll-mt-28 bg-[#f7f9fc] py-12 sm:py-14">
            <div className={container}>
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
                <div>
                  <p className={eyebrowCls}>One-time project package</p>
                  <h2 className={`${headingCls} mt-2`}>{service.shortName} pricing</h2>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">{pricing.intro}</p>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-6 py-5 sm:px-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                      {pricing.packageName ?? service.name}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-600">
                      One-time project · starting prices by market
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2">
                    <div className="border-b border-slate-200 p-6 sm:border-b-0 sm:border-r sm:p-8">
                      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">{pricing.usdLabel}</p>
                      <p className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-[2.75rem]">${pricing.usd.toLocaleString("en-US")}</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-600">One-time starting price</p>
                    </div>
                    <div className="bg-[#f7f9fc] p-6 sm:p-8">
                      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-slate-500">{pricing.inrLabel}</p>
                      <p className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-[2.75rem]">₹{pricing.inr}</p>
                      <p className="mt-2 text-[13px] font-semibold text-slate-600">One-time starting price</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-200 px-6 py-6 sm:px-8">
                    <p className="text-[13px] font-bold">Published package inclusions</p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {pricing.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[13px] leading-relaxed text-slate-600">{pricing.note}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link href="/contact" className={primaryCls}>
                        {pricing.cta} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                      <Link href="/pricing" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline">
                        Compare all packages <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {extras.customQuote && (
          <section id="pricing" className="scroll-mt-28 bg-[#f7f9fc] py-12 sm:py-14">
            <div className={container}>
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
                <div>
                  <p className={eyebrowCls}>A solution built around your campaign</p>
                  <h2 className={`${headingCls} mt-2`}>{service.shortName} pricing</h2>
                  <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600">{extras.customQuote.intro}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(11,21,40,0.25)] sm:p-8">
                  <p className={eyebrowCls}>Tailored to your project</p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">Custom quote</h3>
                  <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-slate-600">{extras.customQuote.note}</p>
                  <p className="mt-6 text-[13px] font-bold">Your project can include, as agreed:</p>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {extras.customQuote.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-slate-600">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className={`${primaryCls} mt-7`}>
                    Request a custom quote <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Selected work (genuine case studies) */}
        {extras.projects && extras.projects.length > 0 && (
          <section id="selected-work" className="scroll-mt-28 bg-white py-12 sm:py-14">
            <div className={container}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <p className={eyebrowCls}>Selected work</p>
                  <h2 className={`${headingCls} mt-2`}>{extras.projectsTitle ?? "Projects we have delivered"}</h2>
                  {extras.projectsNote && (
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{extras.projectsNote}</p>
                  )}
                </div>
                <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-bold text-[#0f6dff] hover:underline">
                  View all work <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <div
                className={`mt-8 grid gap-5 ${
                  extras.projects.length === 1 ? "" : extras.projects.length === 2 ? "sm:grid-cols-2 lg:max-w-4xl" : "md:grid-cols-3"
                }`}
              >
                {extras.projects.map((project) => (
                  <article key={project.slug} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="bg-[#edf2f8] p-3">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <Image
                          src={project.image}
                          alt={`${project.name} website project screenshot`}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">{project.tag}</p>
                      <h3 className="mt-2 font-display text-lg font-bold">{project.name}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{project.summary}</p>
                      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff] hover:underline"
                        >
                          View project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                        <Link href={`/case-studies/${project.slug}`} className="inline-flex items-center gap-1 text-[13px] font-bold text-slate-600 hover:text-[#0f6dff]">
                          Case study <ArrowRight aria-hidden="true" className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 12. What our clients say */}
        <section className="bg-[#f7f9fc] py-12 sm:py-14">
          <div className={container}>
            <SectionHead
              eyebrow="Testimonials"
              title="What our clients say"
              intro="Real reviews from our Google Business Profile."
              center
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {googleReviews.map((t) => (
                <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
                  <Quote aria-hidden="true" className="h-6 w-6 text-[#cfe0ff]" />
                  <div className="mt-3 flex gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f6dff] text-xs font-bold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0b57d0] hover:underline"
              >
                Reviews from Google <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 13. Questions about ... */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <p className={eyebrowCls}>FAQ</p>
                <h2 className={`${headingCls} mt-2`}>Questions about {service.shortName}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">Have another question about your project?</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline">
                  Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {service.faqs.map((faq) => (
                  <details key={faq.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[16px] font-bold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] [&::-webkit-details-marker]:hidden">
                      <span>{faq.q}</span>
                      <Plus aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-open:rotate-45 motion-reduce:transition-none" />
                    </summary>
                    <p className="max-w-2xl pb-5 text-[14px] leading-[1.7] text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 14. Explore related services */}
        {related.length > 0 && (
          <section className="bg-[#f7f9fc] py-12 sm:py-14">
            <div className={container}>
              <SectionHead
                eyebrow="Keep going"
                title="Explore related services"
                intro="Combine these for a complete growth strategy."
              />
              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/services/${r.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#0f6dff]/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                      <ServiceIcon name={r.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-[15px] font-bold">{r.name}</h3>
                      <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0f6dff]">
                        Learn more <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 15. Local market links */}
        {filteredLocalLinks.length > 0 && (
          <LocalLinks
            links={filteredLocalLinks}
            eyebrow={extras.localWebsiteHeading?.eyebrow ?? "Location-specific website support"}
            title={extras.localWebsiteHeading?.title ?? "Planning a website for a local market?"}
            intro={
              extras.localWebsiteHeading?.intro ??
              "These contextual pages help businesses choose the right website and market focus without turning every service page into a location page."
            }
          />
        )}

        {extras.localSeoLinks && extras.localSeoLinks.length > 0 && (
          <LocalLinks
            links={extras.localSeoLinks}
            eyebrow="Location-specific SEO support"
            title="SEO for a specific local market?"
            intro="These contextual pages cover how Webamazee approaches search in a named market, without turning every service page into a location page."
          />
        )}

        {/* 16. Closing CTA */}
        <section className="bg-white py-12 sm:py-14">
          <div className={container}>
            <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
                  {service.shortName}
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                  {extras.closingTitle ?? `Ready to grow with ${service.name}?`}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  {extras.closingSubtitle ?? "Get a free audit and a personalised strategy - no obligation."}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-300">
                  {["Free personalised roadmap", "Personal follow-up from our team", "No lock in"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#87b4ff]" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={primaryCls}>
                  Get a free proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={darkSecondaryCls}>
                  Book a call <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <StickyBar />
    </div>
  );
}

function LocalLinks({
  links,
  eyebrow,
  title,
  intro,
}: {
  links: LinkItem[];
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrowCls}>{eyebrow}</p>
          <h2 className={`${headingCls} mt-2`}>{title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{intro}</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 transition-colors hover:border-[#0f6dff]/40 hover:bg-white"
            >
              <span className="font-display text-sm font-bold group-hover:text-[#0b57d0]">{link.label}</span>
              <span className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{link.description}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff]">
                Open page <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_-20px_rgba(11,21,40,0.5)] backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Ready to grow?</p>
            <p className="truncate text-xs text-slate-500">Free audit &amp; strategy call</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link href="/contact" className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#0f6dff] px-5 text-sm font-semibold text-white">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Build a project card from a genuine case study record. */
export function projectFromCaseStudy(slug: string): MergedProject | undefined {
  const cs = getCaseStudy(slug);
  if (!cs) return undefined;
  return {
    slug: cs.slug,
    name: cs.name,
    image: cs.image,
    tag: cs.tag,
    summary: cs.summary,
    liveUrl: cs.liveUrl ?? "",
  };
}
