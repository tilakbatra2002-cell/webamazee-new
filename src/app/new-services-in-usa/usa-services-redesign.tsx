"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Compass,
  Globe2,
  Layers,
  LayoutGrid,
  LineChart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LocationHub } from "@/lib/location-hubs";
import {
  CONTAINER,
  EYEBROW,
  PRIMARY_BTN,
  SECONDARY_BTN,
  SECTION_H2,
  UsaCaseStudiesBand,
  UsaConsultationBanner,
  UsaFaqBand,
  UsaIndustriesBand,
} from "@/components/usa-preview/usa-shared";

type FootprintKey = "local" | "regional" | "national";

const US_FOOTPRINT_MODES: Record<
  FootprintKey,
  {
    label: string;
    short: string;
    audience: string;
    architecture: string;
    priority: string;
    recommendedPath: { label: string; href: string };
  }
> = {
  local: {
    label: "Single-Metro / Local Operations",
    short: "Local Footprint",
    audience:
      "Service providers serving specific cities, metro counties, or verified physical locations.",
    architecture:
      "Verified service-area pages, fast mobile tap-to-call UX, and consistent Google Business Profile accuracy.",
    priority:
      "Avoids generic multi-city doorway pages that undermine credibility and organic performance.",
    recommendedPath: {
      label: "Explore USA Local & Technical SEO",
      href: "/new-seo-services-united-states",
    },
  },
  regional: {
    label: "Multi-State Regional Expansion",
    short: "Multi-State",
    audience:
      "Established companies operating across state corridors or regional B2B service territories.",
    architecture:
      "Distinct regional hubs paired with conversion-focused service pages, sector proof, and clear qualification forms.",
    priority:
      "Separates genuine operational regions cleanly so buyers quickly confirm where you deliver.",
    recommendedPath: {
      label: "Explore USA Web Design & Architecture",
      href: "/new-web-designing-company-united-states",
    },
  },
  national: {
    label: "National US Category Competition",
    short: "Nationwide US",
    audience:
      "SaaS, e-commerce, and specialist B2B firms competing across crowded nationwide search categories.",
    architecture:
      "Comparison pages, intent-clustered topic hubs, high-speed templates, and multi-channel attribution.",
    priority:
      "Connects organic acquisition, dedicated landing pages, and AI-assisted research under strict editorial QA.",
    recommendedPath: {
      label: "Explore USA Digital Marketing",
      href: "/new-digital-marketing-company-usa",
    },
  },
};

const CORE_USA_SERVICES = [
  {
    num: "01",
    title: "Web Design & Development",
    tag: "Websites · Landing Pages · E-Commerce",
    description:
      "Fast, conversion-focused websites engineered for US buyers who compare competitors quickly and demand clear proof before booking.",
    highlights: [
      "Custom B2B, SaaS, and e-commerce storefront engineering",
      "SEO-safe site redesigns and 301 redirect migrations",
      "WCAG-conscious responsive UX built for mobile conversion",
    ],
    previewHref: "/new-web-designing-company-united-states",
    liveHref: "/web-designing-company-united-states",
    cta: "Explore USA Web Design",
    icon: LayoutGrid,
    featured: true,
  },
  {
    num: "02",
    title: "SEO Services",
    tag: "Technical · On-Page · Local & National",
    description:
      "White-hat search strategy built to win qualified organic visibility across crowded US SERPs without spam tactics or empty promises.",
    highlights: [
      "Crawlability, Core Web Vitals, and schema architecture",
      "Commercial keyword mapping and competitor gap analysis",
      "Genuine local service-area SEO and authority building",
    ],
    previewHref: "/new-seo-services-united-states",
    liveHref: "/seo-services-united-states",
    cta: "Explore USA SEO Services",
    icon: Search,
    featured: true,
  },
  {
    num: "03",
    title: "Digital Marketing",
    tag: "SEO · Landing UX · Social · Attribution",
    description:
      "Align organic search, landing-page conversion, content marketing, social media, and analytics into one scalable US growth program.",
    highlights: [
      "Conversion-optimized campaign landing experiences",
      "Paid social amplification backed by clear attribution",
      "Cross-channel measurement focused on qualified pipeline",
    ],
    previewHref: "/new-digital-marketing-company-usa",
    liveHref: "/digital-marketing-company-usa",
    cta: "Explore USA Digital Marketing",
    icon: LineChart,
    featured: false,
  },
  {
    num: "04",
    title: "AI Marketing",
    tag: "Intent Research · Workflows · Human QA",
    description:
      "Scale US search research, content optimization, and competitor analysis faster—guided by human strategists and strict fact-checking.",
    highlights: [
      "AI-assisted query clustering and topical gap analysis",
      "Editorial workflows with human voice & factual verification",
      "Search readiness without black-box hype or false promises",
    ],
    previewHref: "/new-ai-marketing-company-usa",
    liveHref: "/ai-marketing-company-usa",
    cta: "Explore USA AI Marketing",
    icon: Sparkles,
    featured: false,
  },
];

const WHY_WEBAMAZEE_USA = [
  {
    num: "01",
    title: "Engineering and marketing built together",
    desc: "Website architecture, page speed, internal links, and demand generation are planned by one connected team rather than fragmented vendors.",
  },
  {
    num: "02",
    title: "Specificity over generic US agency language",
    desc: "American buyers evaluate options fast. We structure copy around explicit scope, real deliverables, and direct proof rather than vague buzzwords.",
  },
  {
    num: "03",
    title: "Honest international delivery model",
    desc: "Webamazee operates remotely as a global digital growth company—delivering overlapping US coverage without claiming physical offices we do not have.",
  },
  {
    num: "04",
    title: "Human-led AI acceleration",
    desc: "We apply AI tooling where it speeds up keyword clustering and competitive analysis while senior strategists own strategy, editing, and QA.",
  },
  {
    num: "05",
    title: "Accountability tied to real business metrics",
    desc: "Progress is measured around technical health, Search Console demand, conversion quality, and pipeline readiness—never vanity impressions.",
  },
];

const REMOTE_COLLAB_PILLARS = [
  {
    code: "EST – PST",
    title: "Scheduled US Time-Zone Overlap",
    desc: "Live kickoffs, architecture walkthroughs, and sprint reviews scheduled cleanly within North American business hours.",
  },
  {
    code: "ASYNC",
    title: "Written Briefs & Video Walkthroughs",
    desc: "Detailed milestone documentation and recorded staging reviews keep stakeholders aligned without unnecessary calendar clutter.",
  },
  {
    code: "STAGING",
    title: "Live Staging Link Feedback",
    desc: "Inspect responsive layouts, copy hierarchies, and technical checks directly on staging URLs prior to production rollout.",
  },
  {
    code: "OWNERSHIP",
    title: "Direct Access & Asset Control",
    desc: "Your US organization keeps clean administrative ownership over domains, Search Console, analytics, and website code.",
  },
];

const USA_FOUR_STAGE_PROCESS = [
  {
    step: "01",
    title: "Discovery & Competitive Baseline",
    desc: "Audit your current site, search footprint, offer clarity, and top US category rivals before locking priorities.",
  },
  {
    step: "02",
    title: "Architecture & Messaging",
    desc: "Map page hierarchies, commercial intent clusters, internal linking, and wireframe conversion flows around US buyer behavior.",
  },
  {
    step: "03",
    title: "Design, Build & Optimization",
    desc: "Ship fast, accessible front-end pages, schema markup, technical SEO fixes, and human-edited content through staged QA.",
  },
  {
    step: "04",
    title: "Measure, Attribute & Scale",
    desc: "Track search clicks, landing-page conversions, and qualified lead sources to prioritize next-quarter expansion.",
  },
];

const US_ENGLISH_HUB_FAQS = [
  {
    q: "What services does Webamazee provide for US businesses?",
    a: "Webamazee provides custom website development, e-commerce storefronts, technical and on-page SEO, multi-channel digital marketing, and human-led AI marketing for businesses targeting the United States.",
  },
  {
    q: "Does Webamazee have a physical office in the United States?",
    a: "No. Webamazee is an international digital growth company serving US clients remotely with planned EST–PST collaboration windows and transparent documentation.",
  },
  {
    q: "Which US service should our company prioritize first?",
    a: "Start at the primary bottleneck: businesses with outdated positioning or slow templates usually begin with Web Design or Redesign, while established sites needing organic demand start with SEO or Digital Marketing.",
  },
  {
    q: "How much do website or digital marketing services for the USA cost?",
    a: "Pricing depends on page count, custom functionality, e-commerce catalog complexity, and market competition. We provide a clear written scope and fixed estimate after a discovery conversation.",
  },
  {
    q: "How long does a US website launch take?",
    a: "Timeline depends on page scope, content readiness, integrations, and stakeholder review turnaround. A realistic milestone schedule is agreed before kickoff.",
  },
  {
    q: "Can Webamazee redesign an existing US website without hurting Google rankings?",
    a: "Yes. Every redesign starts with an inventory of existing URLs, backlinks, and high-performing pages, paired with structured 301 redirect mapping prior to launch.",
  },
  {
    q: "What SEO strategy works best for regional vs nationwide US targeting?",
    a: "Regional operators need authentic local signals and distinct state/metro hubs where they actually operate, whereas nationwide brands benefit from deep commercial service hubs and comparison content.",
  },
  {
    q: "Can you build scalable e-commerce storefronts for US shoppers?",
    a: "Yes. We design and develop e-commerce sites focused on fast category navigation, clear product detail structure, reliable checkout UX, and search readiness.",
  },
  {
    q: "Can website development and digital marketing run under one connected plan?",
    a: "Yes. Planning site architecture, SEO structure, campaign landing pages, and analytics tracking together avoids costly rework after launch.",
  },
  {
    q: "Do you guarantee specific Google rankings, traffic figures, or leads?",
    a: "No ethical agency can guarantee search positions or revenue outcomes. We provide transparent strategy, disciplined technical execution, and honest reporting against an agreed baseline.",
  },
];

export function UsaServicesRedesign({ hub }: { hub: LocationHub }) {
  const [footprint, setFootprint] = useState<FootprintKey>("national");
  const activeMode = US_FOOTPRINT_MODES[footprint];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. HERO + INTERACTIVE US MARKET FOOTPRINT MATRIX */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-[#0f6dff]"
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  USA Hub
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United States · Global Delivery Partner
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.35rem]">
                  {hub.h1}
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Compete in crowded US categories with sharper positioning,
                  conversion-ready websites, white-hat SEO, and accountable
                  digital marketing—delivered remotely across US time zones
                  without pretending to operate a local US office.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Start a US Project Discussion
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#usa-services" className={SECONDARY_BTN}>
                    Compare 4 Core Services
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-5 border-t border-slate-200/80 pt-6 text-[13px] text-slate-600">
                  <span className="inline-flex items-center gap-2 font-medium text-[#0b1528]">
                    <Globe2
                      aria-hidden="true"
                      className="h-4 w-4 text-[#0f6dff]"
                    />
                    Global agency serving US teams remotely
                  </span>
                  <span className="inline-flex items-center gap-2 font-medium text-[#0b1528]">
                    <Clock
                      aria-hidden="true"
                      className="h-4 w-4 text-[#0f6dff]"
                    />
                    EST–PST meeting overlap
                  </span>
                </div>
              </div>

              {/* Right: US Market Scope Interactive Planner */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1528] text-white">
                        <Compass aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-[#0b1528]">
                          US Market Architecture Selector
                        </p>
                        <p className="text-[11.5px] text-slate-500">
                          Match your website &amp; search plan to real geographic
                          coverage
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    role="tablist"
                    aria-label="US market footprint modes"
                    className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1"
                  >
                    {(Object.keys(US_FOOTPRINT_MODES) as FootprintKey[]).map(
                      (key) => {
                        const isSelected = footprint === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setFootprint(key)}
                            className={`rounded-lg px-2.5 py-2 text-[12px] font-semibold transition-all ${
                              isSelected
                                ? "bg-white text-[#0f6dff] shadow-sm"
                                : "text-slate-600 hover:text-[#0b1528]"
                            }`}
                          >
                            {US_FOOTPRINT_MODES[key].short}
                          </button>
                        );
                      }
                    )}
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        {activeMode.label}
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0b1528]">
                        {activeMode.audience}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                          <Layers
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-[#0f6dff]"
                          />
                          Recommended Stack
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                          {activeMode.architecture}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                          <ShieldCheck
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-[#0f6dff]"
                          />
                          Credibility Safeguard
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                          {activeMode.priority}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#0b1528] px-4 py-3 text-white">
                      <span className="text-[12.5px] text-slate-300">
                        Recommended next step:
                      </span>
                      <Link
                        href={activeMode.recommendedPath.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#7bb2ff] transition-colors hover:text-white"
                      >
                        {activeMode.recommendedPath.label}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. GLOBAL POSITIONING & US MARKET NEEDS */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Built For Competitive US Buyers</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Clarity and verified proof beat broad claims in crowded US
                  markets
                </h2>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.7] text-slate-600">
                  <p>
                    US buyers compare multiple providers in seconds. Broad
                    agency statements are far less persuasive than explicit
                    audience fit, transparent scope, technical speed, and a
                    direct route to next steps.
                  </p>
                  <p>
                    This hub connects Webamazee&apos;s US-focused web design,
                    SEO, digital marketing, and AI-assisted marketing
                    services—delivered transparently as a global partner with
                    zero fabricated US office claims.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {hub.needs.map((need, idx) => (
                  <div
                    key={need.title}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-[#0b1528]">
                      {need.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {need.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. FOUR VISUALLY DISTINCT USA SERVICE ENTRY POINTS */}
        <section
          id="usa-services"
          className="scroll-mt-24 bg-[#f4f8ff] py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Core USA Disciplines</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Four focused entry points tailored to your growth stage
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] leading-relaxed text-slate-600">
                Start with the immediate priority—site engineering, search
                visibility, connected campaigns, or AI research systems—or unify
                all four.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {CORE_USA_SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.num}
                    className={`group flex flex-col justify-between rounded-2xl border p-7 transition-all duration-200 sm:p-8 ${
                      service.featured
                        ? "border-[#0f6dff]/30 bg-white shadow-[0_18px_40px_-28px_rgba(15,109,255,0.35)]"
                        : "border-slate-200 bg-white hover:border-[#0f6dff]/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff] ring-1 ring-[#0f6dff]/15">
                            <Icon aria-hidden="true" className="h-5 w-5" />
                          </span>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                              {service.num} · {service.tag}
                            </span>
                            <h3 className="mt-0.5 font-display text-xl font-bold text-[#0b1528]">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-[15px] leading-[1.7] text-slate-600">
                        {service.description}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#0b1528]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                      <Link
                        href={service.previewHref}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0f6dff] transition-colors group-hover:text-[#0b57d0]"
                      >
                        {service.cta}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                      <Link
                        href={service.liveHref}
                        className="text-[12px] font-medium text-slate-400 transition-colors hover:text-[#0b1528]"
                      >
                        Live page
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. WHY WEBAMAZEE */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Why Webamazee</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  One unified growth and engineering team—without agency bloat
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  Splitting design, technical SEO, content, and analytics across
                  disconnected contractors creates sluggish handoffs. We plan and
                  ship them together.
                </p>
              </div>

              <div className="divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
                {WHY_WEBAMAZEE_USA.map((point) => (
                  <div
                    key={point.num}
                    className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-5"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff] sm:col-span-2 sm:pt-1">
                      {point.num}
                    </span>
                    <div className="sm:col-span-10">
                      <h3 className="font-display text-lg font-bold text-[#0b1528]">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. HOW REMOTE COLLABORATION WORKS ACROSS US TIME ZONES */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Remote Collaboration Across US Time Zones
                </p>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Predictable execution from New York to San Francisco
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[12.5px] text-slate-200">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#60a5fa]" />
                Remote international delivery · No local US office claims
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {REMOTE_COLLAB_PILLARS.map((item) => (
                <div
                  key={item.code}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="inline-block rounded-full bg-[#0f6dff]/20 px-2.5 py-0.5 font-display text-[11px] font-bold tracking-[0.12em] text-[#7bb2ff]">
                    {item.code}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INDUSTRIES SERVED */}
        <UsaIndustriesBand
          title="Digital architecture built around US industry buying journeys"
          variant="white"
        />

        {/* 7. SELECTED REAL CASE STUDIES (INTERNATIONAL PORTFOLIO) */}
        <UsaCaseStudiesBand variant="slate" />

        {/* 8. FOUR-STAGE PROCESS */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Four-Stage Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                From baseline diagnosis to accountable launch and scale
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {USA_FOUR_STAGE_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                >
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                    STAGE {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0b1528]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. USEFUL USA-SPECIFIC FAQS */}
        <UsaFaqBand
          faqs={US_ENGLISH_HUB_FAQS}
          title="Clear answers for US businesses planning their next build or campaign"
          subtitle="Direct answers on scope, remote collaboration, e-commerce, SEO migrations, and realistic reporting."
          idPrefix="usa-hub-faq"
          variant="slate"
        />

        {/* 10. FINAL CONSULTATION CTA */}
        <UsaConsultationBanner
          eyebrow="Plan Your US Growth Roadmap"
          title="Connect Website Performance, SEO, and Digital Strategy Under One Roof"
          subtitle="Schedule a consultation across your preferred US time zone to audit your current site and review practical next steps."
          primaryLabel="Schedule a Consultation"
          secondaryLabel="Send Project Details"
          bullets={[
            "Honest scope aligned to your actual US market coverage",
            "EST–PST scheduling overlap & written sprint recaps",
            "Clear pricing before any implementation starts",
          ]}
        />
      </div>
    </div>
  );
}
