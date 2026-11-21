"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Gauge,
  LayoutTemplate,
  Monitor,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import {
  CONTAINER,
  EYEBROW,
  PRIMARY_BTN,
  SECONDARY_BTN,
  SECTION_H2,
  UkBreadcrumb,
  UkCaseStudiesBand,
  UkConsultationBanner,
  UkFaqBand,
  UkIndustriesBand,
  UkSiblingServicesBand,
} from "@/components/uk-preview/uk-shared";

type InterfaceMode = "desktop" | "mobile" | "migration";

const APPROACH_PILLARS = [
  {
    code: "01",
    title: "Plain-English Service Scope",
    desc: "UK buyers expect to see what is included, who a service suits, and where you operate without decoding vague jargon.",
  },
  {
    code: "02",
    title: "Regional vs UK-Wide Structure",
    desc: "Local operators and nationwide firms need distinct page hierarchies—built without manufactured office claims.",
  },
  {
    code: "03",
    title: "Proof Near Decisions",
    desc: "Process clarity, genuine work examples, and relevant FAQs reduce buyer hesitation right beside enquiry actions.",
  },
  {
    code: "04",
    title: "Migration-Aware Continuity",
    desc: "When replacing an older site, established URLs, internal links, and search equity are inventoried before design starts.",
  },
];

const CUSTOM_TECH_STACKS = [
  {
    name: "Next.js & React",
    fit: "Custom interfaces & integrations",
    desc: "Tailored architectures where custom layouts, performance discipline, or complex integrations are required.",
  },
  {
    name: "WordPress + Elementor",
    fit: "Editorial & marketing teams",
    desc: "Flexible visual content management when internal teams want straightforward control over routine page updates.",
  },
  {
    name: "WooCommerce & Shopify",
    fit: "E-commerce storefronts",
    desc: "Product discovery, inventory, payment gateways, and streamlined checkout tuned to the catalogue size.",
  },
  {
    name: "Semantic HTML & Headless CMS",
    fit: "Structured scalable publishing",
    desc: "Clean headings, accessible markup, and modular content models built to support new service lines cleanly.",
  },
];

const BUSINESS_WEB_ELEMENTS = [
  {
    step: "01",
    title: "Above-the-Fold Value & Scope",
    detail:
      "Immediately clarifies what you offer, which UK market or sector you serve, and the simplest next step.",
  },
  {
    step: "02",
    title: "Structured Service Breakdowns",
    detail:
      "Scannable deliverables, audience suitability, and plain-English answers that qualify enquiries before a call.",
  },
  {
    step: "03",
    title: "Proportionate Enquiry Journeys",
    detail:
      "Short, focused forms paired with Calendly booking and direct email routes positioned beside decision points.",
  },
  {
    step: "04",
    title: "Honest Proof & Credibility",
    detail:
      "Real portfolio walkthroughs, transparent team workflow, and realistic expectations rather than inflated slogans.",
  },
];

const MIGRATION_STEPS = [
  {
    phase: "Audit",
    title: "URL & Equity Inventory",
    desc: "Catalogue high-value pages, organic landing URLs, and inbound link targets on the existing UK domain.",
  },
  {
    phase: "Map",
    title: "301 Redirect Matrix",
    desc: "Map every retired or reorganised URL cleanly to its closest relevant destination to avoid dead-end 404s.",
  },
  {
    phase: "Verify",
    title: "Staging & Metadata QA",
    desc: "Check titles, canonicals, internal links, forms, and schema on staging prior to DNS switchover.",
  },
  {
    phase: "Monitor",
    title: "Post-Launch Index Checks",
    desc: "Validate XML sitemaps, crawl logs, and Search Console coverage immediately after go-live.",
  },
];

const FOUNDATIONS = [
  {
    icon: Smartphone,
    title: "Mobile-First Ergonomics",
    desc: "Designed for real phones first—comfortable tap targets, readable contrast, sticky navigation discipline, and concise mobile forms.",
    checks: ["Responsive grid adaptation", "Thumb-friendly enquiry controls", "Zero horizontal scroll"],
  },
  {
    icon: Gauge,
    title: "Core Web Vitals & Speed",
    desc: "Lightweight asset delivery, responsive Next/Image optimisation, clean script loading, and disciplined layout stability.",
    checks: ["Optimised WebP/AVIF imagery", "Minimal render-blocking code", "Stable visual hierarchy"],
  },
  {
    icon: ShieldCheck,
    title: "Search-Friendly Architecture",
    desc: "Logical heading structure, descriptive metadata, crawlable navigation, and clean canonical paths built into the template.",
    checks: ["Semantic H1-H3 hierarchy", "Clean internal link graph", "Structured data readiness"],
  },
];

const DEV_PROCESS = [
  {
    step: "01",
    title: "Discovery & Scope",
    desc: "Clarify commercial goals, UK service footprint, audience expectations, and any existing URLs to retain.",
    output: "Sitemap & written project brief",
  },
  {
    step: "02",
    title: "Architecture & UI Design",
    desc: "Structure wireframes, visual hierarchy, responsive components, and conversion paths for stakeholder sign-off.",
    output: "Interactive layout prototypes",
  },
  {
    step: "03",
    title: "Build & Migration QA",
    desc: "Develop responsive pages, configure CMS/commerce, map redirects, and test forms across viewports.",
    output: "Staging site & QA sign-off",
  },
  {
    step: "04",
    title: "Launch & Handover",
    desc: "Publish with indexation checks, analytics setup, and clear editorial guidance so your team stays self-sufficient.",
    output: "Live site & editing handover",
  },
];

export function UkWebDesignRedesign({ page }: { page: LocationPage }) {
  const [interfaceMode, setInterfaceMode] = useState<InterfaceMode>("desktop");

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. PREMIUM HERO WITH WEBSITE INTERFACE COMPOSER */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-[#f9fbff] to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UkBreadcrumb current="Web Design & Development" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United Kingdom · Web Design Studio
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.3rem]">
                  Web Design &amp; Development Built for{" "}
                  <span className="text-[#0f6dff]">UK Customer Trust</span>
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Webamazee designs and builds fast, conversion-focused websites
                  for UK businesses—combining plain-English service clarity,
                  custom front-end engineering, and search-safe redesign
                  planning from the ground up.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Discuss Your UK Website
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#web-approach" className={SECONDARY_BTN}>
                    Explore Web Approach
                  </Link>
                </div>

                <div className="mt-9 grid max-w-xl grid-cols-1 gap-4 border-t border-slate-200/90 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Custom UX &amp; UI
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-slate-600">
                      Tailored layouts without bloated templates
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      SEO-Safe Migration
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-slate-600">
                      URL inventory &amp; redirect planning built in
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      UK Time-Zone Sync
                    </p>
                    <p className="mt-1 text-[13px] font-medium text-slate-600">
                      Remote delivery with scheduled reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Browser Interface Composer */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_26px_65px_-28px_rgba(11,21,40,0.2)] sm:p-5">
                  {/* Browser Chrome */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0f6dff]/60" />
                      <span className="ml-2 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                        uk-client-architecture.preview
                      </span>
                    </div>

                    <div
                      role="tablist"
                      aria-label="Interface blueprint views"
                      className="inline-flex rounded-full bg-slate-100 p-1"
                    >
                      {(
                        [
                          { id: "desktop", label: "Desktop", icon: Monitor },
                          { id: "mobile", label: "Mobile", icon: Smartphone },
                          { id: "migration", label: "Migration", icon: RefreshCw },
                        ] as const
                      ).map((tab) => {
                        const Icon = tab.icon;
                        const active = interfaceMode === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            role="tab"
                            aria-selected={active}
                            onClick={() => setInterfaceMode(tab.id)}
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-semibold transition-all ${
                              active
                                ? "bg-white text-[#0f6dff] shadow-sm"
                                : "text-slate-600 hover:text-[#0b1528]"
                            }`}
                          >
                            <Icon aria-hidden="true" className="h-3 w-3" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mockup Viewport Body */}
                  {interfaceMode === "desktop" && (
                    <div className="mt-4 space-y-3 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                      {/* Mock Site Topbar */}
                      <div className="flex items-center justify-between rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded bg-[#0f6dff]" />
                          <span className="text-[11.5px] font-bold text-[#0b1528]">
                            UK Service Brand
                          </span>
                        </div>
                        <div className="hidden items-center gap-3 text-[10.5px] font-medium text-slate-500 sm:flex">
                          <span>Services</span>
                          <span>Approach</span>
                          <span>Work</span>
                          <span className="rounded-full bg-[#0f6dff] px-2.5 py-0.5 text-white">
                            Enquire
                          </span>
                        </div>
                      </div>

                      {/* Mock Hero Split inside Wireframe */}
                      <div className="grid gap-3 sm:grid-cols-12">
                        <div className="rounded-xl border border-slate-200/80 bg-white p-4 sm:col-span-7">
                          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                            Clear UK Scope
                          </span>
                          <p className="mt-1.5 font-display text-[15px] font-bold leading-snug text-[#0b1528]">
                            Specialist Services Explained Clearly for UK Buyers
                          </p>
                          <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">
                            Visible deliverables, genuine coverage area, and a
                            short route to book or request a scope quote.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <span className="rounded-full bg-[#0f6dff] px-3 py-1 text-[10.5px] font-semibold text-white">
                              Primary Action
                            </span>
                            <span className="rounded-full border border-slate-200 px-3 py-1 text-[10.5px] font-semibold text-slate-600">
                              View Scope
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-[#0f6dff]/20 bg-[#0b1528] p-4 text-white sm:col-span-5">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#60a5fa]">
                              Enquiry Rail
                            </p>
                            <p className="mt-1 text-[12px] font-semibold">
                              3-Field Qualification
                            </p>
                          </div>
                          <div className="my-2.5 space-y-1.5">
                            <div className="h-6 rounded border border-white/15 bg-white/5 px-2 text-[10px] leading-6 text-slate-300">
                              Service needed
                            </div>
                            <div className="h-6 rounded border border-white/15 bg-white/5 px-2 text-[10px] leading-6 text-slate-300">
                              Website URL (optional)
                            </div>
                          </div>
                          <span className="rounded-lg bg-[#0f6dff] py-1.5 text-center text-[10.5px] font-semibold">
                            Request Written Proposal
                          </span>
                        </div>
                      </div>

                      {/* Mock Bottom Trust Row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          "Semantic HTML",
                          "Mobile Breakpoints",
                          "Redirect Safeguards",
                        ].map((chip) => (
                          <div
                            key={chip}
                            className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 text-center text-[11px] font-semibold text-[#0b1528]"
                          >
                            {chip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interfaceMode === "mobile" && (
                    <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-5 sm:flex-row sm:items-stretch">
                      <div className="w-full max-w-[210px] shrink-0 rounded-2xl border-2 border-[#0b1528] bg-white p-3 shadow-sm">
                        <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-slate-200" />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="h-2.5 w-16 rounded bg-[#0b1528]" />
                            <span className="h-4 w-4 rounded bg-slate-100" />
                          </div>
                          <p className="font-display text-[12px] font-bold leading-tight text-[#0b1528]">
                            Fast Mobile Clarity
                          </p>
                          <p className="text-[10px] leading-snug text-slate-500">
                            Readable typography and direct tap-to-contact paths.
                          </p>
                          <div className="rounded-full bg-[#0f6dff] py-1.5 text-center text-[10px] font-semibold text-white">
                            Book Call (min-h-12)
                          </div>
                          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-[9.5px] text-slate-600">
                            Zero horizontal overflow across 390px viewports.
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col justify-between space-y-2.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          Mobile-First Execution
                        </p>
                        {[
                          {
                            label: "Readable Type Scale",
                            note: "16px+ body copy with crisp hierarchy on small screens.",
                          },
                          {
                            label: "Accessible Tap Targets",
                            note: "Navigation, accordions, and buttons sized for thumbs.",
                          },
                          {
                            label: "Direct Mobile Conversion",
                            note: "Short enquiry forms and one-tap call or Calendly access.",
                          },
                        ].map((m) => (
                          <div
                            key={m.label}
                            className="rounded-xl border border-slate-200/80 bg-white p-3"
                          >
                            <p className="text-[12px] font-bold text-[#0b1528]">
                              {m.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-slate-500">
                              {m.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {interfaceMode === "migration" && (
                    <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                        Redesign Safeguard · Legacy URL Mapping
                      </p>
                      <div className="mt-3 space-y-2">
                        {[
                          {
                            from: "/services/legacy-consulting",
                            to: "/services/uk-advisory",
                            status: "301 Mapped",
                          },
                          {
                            from: "/our-work/client-case",
                            to: "/case-studies/client-case",
                            status: "301 Mapped",
                          },
                          {
                            from: "/contact-us.html",
                            to: "/contact",
                            status: "301 Mapped",
                          },
                        ].map((row) => (
                          <div
                            key={row.from}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200/90 bg-white px-3 py-2 text-[11.5px]"
                          >
                            <span className="font-mono text-slate-500 line-through">
                              {row.from}
                            </span>
                            <span className="font-mono font-semibold text-[#0b1528]">
                              -&gt; {row.to}
                            </span>
                            <span className="rounded-full bg-[#f4f8ff] px-2.5 py-0.5 text-[10.5px] font-bold text-[#0f6dff]">
                              {row.status}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
                        Every UK redesign starts with an inventory of useful
                        URLs, internal links, and canonicals so search equity
                        is protected during transition.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WEBSITE DESIGN & DEVELOPMENT APPROACH */}
        <section
          id="web-approach"
          className="scroll-mt-24 border-b border-slate-200/80 bg-white py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Design &amp; Development Approach</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Architecture built around how UK buyers evaluate credibility
                </h2>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.72] text-slate-600">
                  {page.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
                  {APPROACH_PILLARS.map((item) => (
                    <div key={item.code} className="bg-white p-6 sm:p-7">
                      <span className="font-display text-[11px] font-bold tracking-[0.14em] text-[#0f6dff]">
                        {item.code}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CUSTOM WEBSITE DEVELOPMENT */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Custom Website Development
                </p>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Engineered around your offer, not locked inside a rigid theme
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-300">
                  Platform recommendations depend on your team, editing needs,
                  and integration requirements. From custom Next.js builds to
                  maintainable WordPress setups, every build prioritises clean
                  markup, fast loads, and clear ownership.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/services/website-development"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f6dff] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1d78ff]"
                  >
                    Website Development Service
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/landing-page-development"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/50"
                  >
                    Landing Page Builds
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {CUSTOM_TECH_STACKS.map((stack) => (
                  <div
                    key={stack.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <Code2 aria-hidden="true" className="h-5 w-5 text-[#60a5fa]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#7bb2ff]">
                        {stack.fit}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-white">
                      {stack.name}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                      {stack.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BUSINESS WEBSITE DESIGN */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Business Website Design</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Turn specialist services into an unmistakable buyer journey
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  Whether your organisation serves one UK county or competes
                  nationwide, buyers leave quickly when service boundaries,
                  next steps, and credibility feel ambiguous. Our interface
                  layouts put decision-critical details up front.
                </p>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-[#f4f8ff] p-6">
                  <LayoutTemplate
                    aria-hidden="true"
                    className="h-5 w-5 text-[#0f6dff]"
                  />
                  <h3 className="mt-3 font-display text-base font-bold text-[#0b1528]">
                    Built for B2B &amp; Service Credibility
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                    Each page template pairs crisp typography with clear proof
                    and contextual calls to action—no generic filler blocks.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {BUSINESS_WEB_ELEMENTS.map((item) => (
                    <div
                      key={item.step}
                      className="grid gap-2 py-5 sm:grid-cols-[52px_1fr] sm:gap-4 sm:py-6"
                    >
                      <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-[#0b1528]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. E-COMMERCE DEVELOPMENT */}
        <section className="border-y border-slate-200/80 bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-28px_rgba(11,21,40,0.22)]">
                  <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 text-[11.5px] font-semibold text-slate-500">
                    <span>Verified E-Commerce Build · India (2025)</span>
                    <Link
                      href="/work/kabir-oil-mill"
                      className="inline-flex items-center gap-1 text-[#0f6dff] hover:underline"
                    >
                      Kabir Oil Mill
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                  <div className="relative aspect-[16/10] w-full bg-slate-100">
                    <Image
                      src="/images/portfolio/kabir-oil-mill-live-homepage.webp"
                      alt="Kabir Oil Mill e-commerce store designed and built by Webamazee"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className={EYEBROW}>E-Commerce Development</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Online stores built around product clarity &amp; smooth checkout
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  E-commerce sites succeed when category taxonomy, product
                  specifications, delivery expectations, and cart-to-checkout UX
                  remove purchase hesitation. We build maintainable storefronts
                  with WooCommerce, Shopify, or custom architectures.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Structured product & category navigation",
                    "Conversion-ready product detail layouts",
                    "Reliable cart & payment gateway integration",
                    "Clean product metadata & index control",
                  ].map((pt) => (
                    <div
                      key={pt}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-200/90 bg-white p-3.5 text-[13.5px] font-medium text-[#0b1528]"
                    >
                      <ShoppingBag
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                      />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link href="/services/ecommerce-development" className={PRIMARY_BTN}>
                    Explore E-Commerce Builds
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/work/kabir-oil-mill"
                    className="text-[13.5px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                  >
                    Inspect Kabir Oil Mill (India) -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. WEBSITE REDESIGN & MIGRATION */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Website Redesign &amp; Migration</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Modernise an established UK site without discarding search
                  equity
                </h2>
              </div>
              <Link
                href="/services/website-redesign"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                Explore Website Redesign
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {MIGRATION_STEPS.map((item, idx) => (
                <div
                  key={item.phase}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#0f6dff]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                        {item.phase}
                      </span>
                      <span className="font-display text-xs font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#0f6dff]/20 bg-[#f4f8ff] px-6 py-4">
              <p className="text-[14px] text-slate-700">
                Careful migration reduces avoidable traffic disruption—without
                making impossible guarantees on unchanged search positions.
              </p>
              <Link
                href="/blog/redesign-before-after-seo"
                className="shrink-0 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
              >
                Read our website redesign SEO guide -&gt;
              </Link>
            </div>
          </div>
        </section>

        {/* 7. RESPONSIVE DESIGN, PERFORMANCE & SEO FOUNDATIONS */}
        <section className="border-y border-slate-200/80 bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Technical Foundations</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Responsive design, speed and search structure baked in
                </h2>
              </div>
              <Link
                href="/blog/core-web-vitals-guide"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                Core Web Vitals guide
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {FOUNDATIONS.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7"
                  >
                    <div>
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                        {f.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600">
                        {f.desc}
                      </p>
                    </div>
                    <ul className="mt-6 space-y-2 border-t border-slate-100 pt-4">
                      {f.checks.map((c) => (
                        <li
                          key={c}
                          className="flex items-center gap-2 text-[13px] font-medium text-[#0b1528]"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0f6dff]" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. INDUSTRIES SERVED */}
        <UkIndustriesBand
          title="Websites designed around UK sector buying behaviour"
          variant="white"
        />

        {/* 9. SELECTED EXISTING CASE STUDIES */}
        <UkCaseStudiesBand variant="slate" />

        {/* 10. FOUR-STAGE DEVELOPMENT PROCESS */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Development Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Four structured stages from brief to launch handover
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                Planned UK time-zone reviews and written milestones keep every
                decision tied to the agreed scope.
              </p>
            </div>

            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-8 right-8 top-9 hidden h-px bg-[#0f6dff]/20 lg:block"
              />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {DEV_PROCESS.map((stage) => (
                  <div
                    key={stage.step}
                    className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1528] font-display text-sm font-bold text-white">
                        {stage.step}
                      </span>
                      <h3 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                        {stage.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                        {stage.desc}
                      </p>
                    </div>
                    <div className="mt-6 border-t border-slate-100 pt-3.5">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Deliverable
                      </p>
                      <p className="mt-0.5 text-[12.5px] font-semibold text-[#0b1528]">
                        {stage.output}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. RELEVANT FAQS */}
        <UkFaqBand
          faqs={page.faqs}
          title="Questions about web design for UK businesses"
          subtitle="Straightforward answers on scope, platforms, redesign migrations, and remote UK collaboration."
          idPrefix="uk-web-faq"
          variant="white"
        />

        {/* SIBLING UK LINKS */}
        <UkSiblingServicesBand
          currentSlug="web-designing-company-united-kingdom"
          globalServices={[
            { label: "Website Development", href: "/services/website-development" },
            { label: "Website Redesign", href: "/services/website-redesign" },
            { label: "E-Commerce Development", href: "/services/ecommerce-development" },
            { label: "Landing Page Development", href: "/services/landing-page-development" },
            { label: "Technical SEO", href: "/services/technical-seo" },
          ]}
        />

        {/* 12. STRONG CONSULTATION CTA */}
        <UkConsultationBanner
          eyebrow="Plan Your UK Website"
          title="Let's Build a Clearer, Faster Website for Your UK Audience"
          subtitle="Book a 30-minute consultation to review your current site, target scope, and redesign or build priorities—with transparent written scoping."
          primaryLabel="Book a Free Consultation"
          secondaryLabel="Plan Your UK Website"
          bullets={[
            "Review existing site UX, URLs, and scope",
            "Platform guidance matched to editing needs",
            "Written fixed-scope proposal with milestones",
          ]}
        />
      </div>
    </div>
  );
}
