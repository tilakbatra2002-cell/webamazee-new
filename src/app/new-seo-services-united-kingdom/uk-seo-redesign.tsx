"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Globe2,
  Layers,
  Link2,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import {
  CALENDLY_URL,
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

type InspectorTab = "technical" | "intent" | "local";

const SEO_CHALLENGES = [
  {
    code: "01",
    title: "Local vs National Cannibalisation",
    desc: "When UK businesses publish overlapping regional pages without distinct search intent, multiple URLs compete against each other.",
  },
  {
    code: "02",
    title: "Technical Crawl & Speed Drag",
    desc: "Unchecked redirect chains, duplicate canonicals, heavy scripts, and slow mobile templates limit how efficiently crawlers index key pages.",
  },
  {
    code: "03",
    title: "Thin Commercial Pages",
    desc: "High-intent service pages often lack clear scope, technical proof, and answers to the questions buyers ask before enquiring.",
  },
  {
    code: "04",
    title: "Traffic Detached From Enquiries",
    desc: "Informational articles bring casual clicks that never convert when internal linking and commercial landing pages are disconnected.",
  },
];

const TECHNICAL_SPECS = [
  {
    area: "Crawl & Index Hygiene",
    checks: "Robots rules, XML sitemaps, status codes, orphan URL resolution",
    impact: "Ensures crawlers spend budget on commercial and helpful pages",
  },
  {
    area: "Canonicals & Duplication",
    checks: "Self-canonicals, parameter handling, trailing-slash consistency",
    impact: "Consolidates signals onto the intended primary UK URLs",
  },
  {
    area: "Core Web Vitals",
    checks: "LCP asset loading, CLS stability, INP interaction responsiveness",
    impact: "Supports faster mobile UX and reduced bounce friction",
  },
  {
    area: "Structured Data",
    checks: "Organisation, Breadcrumb, Service, FAQ schema validation",
    impact: "Clarifies entities and service context for search engines",
  },
  {
    area: "Migration & Redirects",
    checks: "301 redirect mapping, internal link rewrites, chain removal",
    impact: "Protects established visibility during site updates",
  },
];

const ON_PAGE_ANATOMY = [
  {
    tag: "Title & Meta",
    role: "Click Relevance",
    detail:
      "Clear commercial phrasing aligned with UK buyer terminology—never keyword-stuffed.",
  },
  {
    tag: "H1 -> H3 Hierarchy",
    role: "Topical Structure",
    detail:
      "Logical nested headings that clarify scope, inclusions, and supporting subtopics cleanly.",
  },
  {
    tag: "Internal Link Flow",
    role: "Authority Distribution",
    detail:
      "Contextual links routing readers between hubs, core UK services, guides, and case studies.",
  },
  {
    tag: "Conversion Alignment",
    role: "Enquiry Readiness",
    detail:
      "Direct audit or consultation paths placed adjacent to commercial information.",
  },
];

const INTENT_MATRIX = [
  {
    stage: "Informational Intent",
    queries: "Problem diagnostics, cost guides, checklists & comparisons",
    pageRole: "Editorial articles & sector guides",
    cta: "Free SEO Audit / Guide link",
  },
  {
    stage: "Commercial Investigation",
    queries: "Service capabilities, agency evaluation, sector suitability",
    pageRole: "Core service & industry pages",
    cta: "Scope review / Case study",
  },
  {
    stage: "Transactional & Regional",
    queries: "UK market or service-area specialist queries",
    pageRole: "Dedicated UK service & hub pages",
    cta: "Consultation / Enquiry form",
  },
];

const SEO_PROCESS_STEPS = [
  {
    step: "01",
    title: "Baseline Technical & Search Audit",
    desc: "Review crawl data, Search Console coverage, speed, indexation, and current keyword rankings to establish an agreed starting baseline.",
  },
  {
    step: "02",
    title: "Keyword & Competitor Mapping",
    desc: "Group commercial and informational terms around real UK search intent and assign one clear primary target per page.",
  },
  {
    step: "03",
    title: "Technical & On-Page Implementation",
    desc: "Resolve crawl blockers, refine titles, semantic headings, internal linking, and structured data across priority templates.",
  },
  {
    step: "04",
    title: "Content & Authority Growth",
    desc: "Publish genuinely helpful commercial and editorial resources alongside ethical, white-hat authority building.",
  },
  {
    step: "05",
    title: "Transparent Reporting & Iteration",
    desc: "Track technical health, indexed visibility, Search Console clicks, and qualified enquiries against the baseline.",
  },
];

export function UkSeoRedesign({ page }: { page: LocationPage }) {
  const [inspectorTab, setInspectorTab] = useState<InspectorTab>("technical");

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. SEO-FOCUSED HERO WITH SEARCH ARCHITECTURE VISUAL */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UkBreadcrumb current="SEO Services UK" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United Kingdom · White-Hat SEO
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.3rem]">
                  Sustainable Organic Growth for{" "}
                  <span className="text-[#0f6dff]">Competitive UK Search</span>
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Webamazee helps UK organisations improve search visibility
                  through technical site health, search-intent architecture, and
                  helpful content—built around transparent measurement rather
                  than empty ranking promises.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/free-seo-audit" className={PRIMARY_BTN}>
                    Run Free Website SEO Audit
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className={SECONDARY_BTN}>
                    Discuss Your UK SEO
                  </Link>
                </div>

                <p className="mt-6 text-[13px] text-slate-500">
                  Ethical white-hat implementation only. Search outcomes depend
                  on starting condition, competition, and consistent execution.
                </p>
              </div>

              {/* Right: Original Search Architecture & Diagnostic Inspector */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0b1528] text-white">
                        <Activity aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-[#0b1528]">
                          UK Search Architecture Inspector
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Core diagnostic pillars reviewed on every engagement
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Diagnostic Mode Tabs */}
                  <div
                    role="tablist"
                    aria-label="SEO diagnostic pillars"
                    className="mt-4 grid grid-cols-3 gap-2"
                  >
                    {(
                      [
                        { id: "technical", label: "Technical Crawl" },
                        { id: "intent", label: "Intent Mapping" },
                        { id: "local", label: "Local vs UK-Wide" },
                      ] as const
                    ).map((tab) => {
                      const active = inspectorTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setInspectorTab(tab.id)}
                          className={`rounded-xl border px-3 py-2 text-[12px] font-semibold transition-all ${
                            active
                              ? "border-[#0f6dff] bg-[#f4f8ff] text-[#0f6dff]"
                              : "border-slate-200 bg-white text-slate-600 hover:text-[#0b1528]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  {inspectorTab === "technical" && (
                    <div className="mt-4 space-y-2.5 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                      {[
                        {
                          item: "Indexation & Canonical Integrity",
                          detail: "One clean canonical URL per distinct UK topic",
                        },
                        {
                          item: "Core Web Vitals & Mobile Delivery",
                          detail: "Measured asset speed & layout stability checks",
                        },
                        {
                          item: "Redirect & Status Hygiene",
                          detail: "Zero internal 404s or multi-hop redirect loops",
                        },
                        {
                          item: "Structured Data Graph",
                          detail: "Service, Breadcrumb & FAQ schema aligned to copy",
                        },
                      ].map((row) => (
                        <div
                          key={row.item}
                          className="flex items-start justify-between gap-3 rounded-lg border border-slate-200/80 bg-white px-3.5 py-2.5"
                        >
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2
                              aria-hidden="true"
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                            />
                            <div>
                              <p className="text-[12.5px] font-bold text-[#0b1528]">
                                {row.item}
                              </p>
                              <p className="text-[11.5px] text-slate-500">
                                {row.detail}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full bg-[#f4f8ff] px-2.5 py-0.5 text-[10.5px] font-bold text-[#0f6dff]">
                            Audited
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {inspectorTab === "intent" && (
                    <div className="mt-4 space-y-2.5 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                      <div className="rounded-lg border border-slate-200/80 bg-white p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          UK Search Hierarchy
                        </p>
                        <div className="mt-2.5 space-y-2 text-[12px]">
                          <div className="flex items-center justify-between rounded bg-[#f4f8ff] px-3 py-2 font-semibold text-[#0b1528]">
                            <span>Hub: /services-in-uk</span>
                            <span className="text-[#0f6dff]">Overview</span>
                          </div>
                          <div className="ml-4 flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-slate-700">
                            <span>Commercial: /seo-services-united-kingdom</span>
                            <span className="text-slate-400">Service Intent</span>
                          </div>
                          <div className="ml-8 flex items-center justify-between rounded border border-slate-200 px-3 py-2 text-slate-700">
                            <span>Sector: /seo-for-professional-services</span>
                            <span className="text-slate-400">Vertical Intent</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[12px] text-slate-600">
                        Each page owns one clear commercial or educational
                        search intent rather than repeating identical terms.
                      </p>
                    </div>
                  )}

                  {inspectorTab === "local" && (
                    <div className="mt-4 grid gap-3 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-slate-200/90 bg-white p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          Genuine Local Operations
                        </p>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                          Service-area pages anchored to verified UK coverage,
                          factual contact data, and local buyer expectations.
                        </p>
                      </div>
                      <div className="rounded-lg border border-slate-200/90 bg-white p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b1528]">
                          UK-Wide Providers
                        </p>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                          Sector-led authority architecture competing on core
                          capabilities rather than thin city-name templates.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#0b1528] px-4 py-3 text-[12px] text-slate-200">
                    <span>Want live diagnostics on your homepage?</span>
                    <Link
                      href="/free-seo-audit"
                      className="font-semibold text-[#7bb2ff] hover:text-white"
                    >
                      Run Instant Check -&gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. COMMON SEO CHALLENGES */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Common UK SEO Challenges</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Why capable UK businesses stay invisible in search
                </h2>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.7] text-slate-600">
                  {page.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
                  {SEO_CHALLENGES.map((item) => (
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

        {/* 3. TECHNICAL SEO */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Technical SEO</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Clean technical foundations crawlers and users rely on
                </h2>
              </div>
              <Link
                href="/services/technical-seo"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                Explore Technical SEO
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="hidden grid-cols-12 border-b border-slate-200 bg-[#f8fafc] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.13em] text-slate-500 md:grid">
                <div className="col-span-3">Technical Area</div>
                <div className="col-span-5">What We Inspect &amp; Resolve</div>
                <div className="col-span-4">Commercial Impact</div>
              </div>
              <div className="divide-y divide-slate-200">
                {TECHNICAL_SPECS.map((spec) => (
                  <div
                    key={spec.area}
                    className="grid gap-3 px-6 py-5 md:grid-cols-12 md:items-center md:gap-4"
                  >
                    <div className="font-display text-[15.5px] font-bold text-[#0b1528] md:col-span-3">
                      {spec.area}
                    </div>
                    <div className="text-[14px] text-slate-600 md:col-span-5">
                      {spec.checks}
                    </div>
                    <div className="text-[13.5px] font-medium text-[#0f6dff] md:col-span-4">
                      {spec.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. ON-PAGE SEO & 5. LOCAL SEO */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-2">
              {/* On-Page SEO */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                    <Layers aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <Link
                    href="/services/seo-services"
                    className="text-[13px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    On-Page SEO Details -&gt;
                  </Link>
                </div>

                <p className={`${EYEBROW} mt-6`}>On-Page SEO</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528] sm:text-3xl">
                  Page structure built for clarity and search relevance
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  On-page optimisation aligns page titles, headings, body depth,
                  and internal links so search engines and UK visitors grasp
                  your offer immediately.
                </p>

                <div className="mt-6 space-y-3">
                  {ON_PAGE_ANATOMY.map((el) => (
                    <div
                      key={el.tag}
                      className="rounded-xl border border-slate-200/80 bg-[#f8fafc] p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-[#0b1528]">
                          {el.tag}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.11em] text-[#0f6dff]">
                          {el.role}
                        </span>
                      </div>
                      <p className="mt-1 text-[13.5px] text-slate-600">
                        {el.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Local SEO */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#0f6dff]/25 bg-[#f4f8ff] p-7 sm:p-9">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-[#0f6dff]/15">
                      <MapPin aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <Link
                      href="/services/local-seo"
                      className="text-[13px] font-semibold text-[#0f6dff] hover:underline"
                    >
                      Local SEO Service -&gt;
                    </Link>
                  </div>

                  <p className={`${EYEBROW} mt-6`}>Local UK Visibility</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528] sm:text-3xl">
                    Regional relevance without thin doorway pages
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                    For UK businesses serving distinct towns, counties, or
                    regional catchment areas, search visibility depends on
                    genuine service context—not copying the same page across
                    dozens of postcode names.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        title: "Accurate Service-Area Clarity",
                        desc: "Reflect real coverage without implying physical UK branch addresses you do not hold.",
                      },
                      {
                        title: "Consistent Entity & Contact Signals",
                        desc: "Align website details, schema, and regional business listings cleanly.",
                      },
                      {
                        title: "Mobile Local Enquiry Paths",
                        desc: "Ensure visitors finding you on local search can contact or book effortlessly.",
                      },
                    ].map((pt) => (
                      <div
                        key={pt.title}
                        className="rounded-xl border border-slate-200/80 bg-white p-4"
                      >
                        <p className="font-display text-sm font-bold text-[#0b1528]">
                          {pt.title}
                        </p>
                        <p className="mt-1 text-[13.5px] text-slate-600">
                          {pt.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="/blog/local-seo-checklist"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Read our practical Local SEO Checklist
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AI SEO & CONTENT OPTIMISATION */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  AI SEO &amp; Content Optimisation
                </p>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Sharper search research paired with human editorial judgement
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-300">
                  Search engines reward genuinely helpful, well-structured
                  content—not automated mass publishing. We use AI tooling to
                  accelerate topic clustering and page diagnostics while human
                  editors control accuracy, tone, and brand fit.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/services/ai-seo"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f6dff] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1f7bff]"
                  >
                    Explore AI SEO
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/ai-content-optimization"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:border-white/50"
                  >
                    Content Optimisation
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Intent-Matched Structuring",
                    desc: "Refine existing pages to answer specific UK buyer questions clearly and cleanly.",
                  },
                  {
                    icon: FileSearch,
                    title: "Semantic Gap Analysis",
                    desc: "Identify subtopics and practical clarifications missing from key service pages.",
                  },
                  {
                    icon: SlidersHorizontal,
                    title: "Human Editorial QA",
                    desc: "Every headline, claim, and technical recommendation is reviewed by specialists.",
                  },
                  {
                    icon: Globe2,
                    title: "Clear Entity Context",
                    desc: "Structured headings and concise summaries supporting modern search parsing.",
                  },
                ].map((box) => {
                  const Icon = box.icon;
                  return (
                    <div
                      key={box.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-[#60a5fa]"
                      />
                      <h3 className="mt-3.5 font-display text-base font-bold text-white">
                        {box.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-300">
                        {box.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 7. KEYWORD & COMPETITOR RESEARCH */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Keyword &amp; Competitor Research</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Target search demand by buyer intent, not vanity volume
                </h2>
              </div>
              <Link
                href="/services/competitor-analysis"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                Explore Competitor Analysis
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {INTENT_MATRIX.map((col, idx) => (
                <div
                  key={col.stage}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7"
                >
                  <div>
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                      0{idx + 1} · SEARCH INTENT
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-[#0b1528]">
                      {col.stage}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                      <strong className="text-[#0b1528]">Focus: </strong>
                      {col.queries}
                    </p>
                  </div>
                  <div className="mt-6 space-y-2 border-t border-slate-200/80 pt-4 text-[13px]">
                    <p className="text-slate-600">
                      <span className="font-semibold text-[#0b1528]">Page type: </span>
                      {col.pageRole}
                    </p>
                    <p className="font-semibold text-[#0f6dff]">
                      Next step: {col.cta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CONTENT STRATEGY & LINK BUILDING */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <Search aria-hidden="true" className="h-6 w-6 text-[#0f6dff]" />
                <p className={`${EYEBROW} mt-5`}>Content Strategy</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                  Authority content built around real buyer questions
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  Rather than publishing unfocused blog posts, we connect
                  commercial service hubs, sector guides, and decision-stage
                  articles into a clear topical ecosystem that strengthens
                  relevant internal links.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services/google-ranking-growth"
                    className="text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Google Ranking Growth -&gt;
                  </Link>
                  <Link
                    href="/blog"
                    className="text-[13.5px] font-semibold text-[#0b1528] hover:text-[#0f6dff]"
                  >
                    Browse Published Guides -&gt;
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <Link2 aria-hidden="true" className="h-6 w-6 text-[#0f6dff]" />
                <p className={`${EYEBROW} mt-5`}>White-Hat Link Building</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                  Sustainable authority without spam or paid link schemes
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  Backlink quality outweighs volume. We focus on relevant
                  editorial placements, digital PR assets, and clean business
                  citations that support long-term domain credibility without
                  exposing your UK site to penalty risk.
                </p>
                <div className="mt-6">
                  <Link
                    href="/services/link-building"
                    className="text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Ethical Link Building -&gt;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. SEO PROCESS & REPORTING (Explicit realistic framing) */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>SEO Process &amp; Reporting</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Structured delivery &amp; honest reporting against an agreed
                  baseline
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
                  Search performance shifts with competition, starting site
                  condition, and implementation pace. We do not guarantee
                  specific Google positions, traffic totals, or fixed
                  timeframes—instead, every month focuses on clear technical
                  work and measurable progress.
                </p>

                <div className="mt-6 rounded-2xl border border-[#0f6dff]/25 bg-[#f4f8ff] p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                    What Reporting Covers
                  </p>
                  <ul className="mt-3.5 space-y-2.5 text-[13.5px] font-medium text-[#0b1528]">
                    <li>• Technical audit &amp; index coverage changes</li>
                    <li>• Search Console impressions &amp; click movement</li>
                    <li>• Page updates shipped &amp; next priority roadmap</li>
                    <li>• Organic enquiry and conversion trends</li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {SEO_PROCESS_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="grid gap-2 py-5 sm:grid-cols-[54px_1fr] sm:gap-4"
                    >
                      <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-[#0b1528]">
                          {item.title}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. INDUSTRIES SERVED */}
        <UkIndustriesBand
          title="SEO frameworks tailored to UK industry search behaviour"
          variant="mist"
        />

        {/* 11. RELEVANT EXISTING CASE STUDIES */}
        <UkCaseStudiesBand variant="white" />

        {/* 12. FAQS */}
        <UkFaqBand
          faqs={page.faqs}
          title="Questions about SEO services in the UK"
          subtitle="Clear answers on realistic timelines, technical scope, local relevance, and how SEO progress is measured."
          idPrefix="uk-seo-faq"
          variant="slate"
        />

        {/* SIBLING UK LINKS */}
        <UkSiblingServicesBand
          currentSlug="seo-services-united-kingdom"
          globalServices={[
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Technical SEO", href: "/services/technical-seo" },
            { label: "Local SEO", href: "/services/local-seo" },
            { label: "AI SEO", href: "/services/ai-seo" },
            { label: "Competitor Analysis", href: "/services/competitor-analysis" },
            { label: "Link Building", href: "/services/link-building" },
          ]}
        />

        {/* 13. FREE SEO AUDIT / CONSULTATION CTA */}
        <UkConsultationBanner
          eyebrow="Start With Live Diagnostics"
          title="Review Your Site Health & Plan Realistic UK Search Growth"
          subtitle="Run an instant homepage SEO audit or book a consultation to discuss your current rankings, technical bottlenecks, and organic priorities."
          primaryLabel="Run Free Website SEO Audit"
          primaryHref="/free-seo-audit"
          primaryExternal={false}
          secondaryLabel="Book Strategy Call"
          secondaryHref={CALENDLY_URL}
          bullets={[
            "Automated homepage technical & schema inspection",
            "Honest gap review with zero ranking guarantees",
            "Clear scope options for technical, local & content SEO",
          ]}
        />
      </div>
    </div>
  );
}
