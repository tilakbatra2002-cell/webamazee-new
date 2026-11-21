"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Compass,
  Link2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
import { useSeoAudit } from "@/components/seo-audit/seo-audit-provider";
import {
  CONTAINER,
  EYEBROW,
  PRIMARY_BTN,
  SECONDARY_BTN,
  SECTION_H2,
  UsaBreadcrumb,
  UsaCaseStudiesBand,
  UsaConsultationBanner,
  UsaFaqBand,
  UsaIndustriesBand,
  UsaSiblingServicesBand,
} from "@/components/usa-preview/usa-shared";

type TreeNodeId = "foundation" | "commercial" | "editorial" | "local";

const SITE_TREE_NODES: {
  id: TreeNodeId;
  code: string;
  label: string;
  role: string;
  signals: string[];
  linkRule: string;
  guardrail: string;
}[] = [
  {
    id: "foundation",
    code: "ROOT",
    label: "Technical Crawl Foundation",
    role: "Ensures Google discovers, parses, and indexes key US pages cleanly.",
    signals: [
      "Verified canonical tags & clean XML sitemaps",
      "Core Web Vitals speed & zero broken redirect hops",
      "Valid Organization, Service & FAQ structured data",
    ],
    linkRule: "Clean internal hierarchy with zero orphaned commercial URLs.",
    guardrail: "Eliminates index bloat and competing parameter URLs.",
  },
  {
    id: "commercial",
    code: "HUBS",
    label: "Commercial Service Pages",
    role: "Matches high-intent US service & product queries to conversion pages.",
    signals: [
      "One clear primary keyword & buyer intent per page",
      "Clear US deliverables, comparison proof & direct CTAs",
      "Strong H1-H3 semantic structure & helpful FAQs",
    ],
    linkRule: "Receives contextual anchor links from guides & parent hubs.",
    guardrail: "Never stuffs repetitive regional keywords onto thin templates.",
  },
  {
    id: "editorial",
    code: "GUIDES",
    label: "Content & AI-Intent Guides",
    role: "Captures earlier comparison research and builds topical authority.",
    signals: [
      "AI-assisted query clustering refined by human editors",
      "Practical buyer answers rather than generic filler posts",
      "Direct internal bridges toward relevant service pages",
    ],
    linkRule: "Supports commercial pages instead of competing against them.",
    guardrail: "Every factual claim and statistic verified before publication.",
  },
  {
    id: "local",
    code: "AREAS",
    label: "Genuine Local Service Areas",
    role: "Supports city or multi-state visibility only where operations exist.",
    signals: [
      "Accurate NAP & Google Business Profile alignment",
      "State or metro context tied to real service coverage",
      "Local schema aligned strictly with verified details",
    ],
    linkRule: "Links cleanly back to core service hubs and parent state pages.",
    guardrail: "Zero fake doorway pages for unserved US cities.",
  },
];

const TECHNICAL_AND_ONPAGE_CARDS = [
  {
    tag: "Technical SEO",
    title: "Crawlability, Speed & Index Hygiene",
    desc: "Fix canonical conflicts, multi-hop redirects, render-blocking scripts, and schema errors so crawlers spend budget on revenue-driving US URLs.",
    href: "/services/technical-seo",
    cta: "Technical SEO Service",
    secondary: { label: "Core Web Vitals Guide", href: "/blog/core-web-vitals-guide" },
  },
  {
    tag: "On-Page SEO",
    title: "Intent-Matched Service Architecture",
    desc: "Structure headings, page copy, metadata, and internal links so each US service page aligns with how buyers research and compare solutions.",
    href: "/services/seo-services",
    cta: "On-Page SEO Service",
    secondary: null,
  },
  {
    tag: "AI SEO",
    title: "Search-Intent Clustering & Semantic Depth",
    desc: "Use AI-assisted query analysis to surface long-tail US buyer questions and structural gaps—reviewed by experienced SEO strategists.",
    href: "/services/ai-seo",
    cta: "Explore AI SEO",
    secondary: { label: "AI SEO Guide", href: "/blog/ai-seo-guide-2026" },
  },
  {
    tag: "Content Optimization",
    title: "Human-Edited Page Refreshes",
    desc: "Upgrade underperforming US service and guide pages with sharper answers, clearer formatting, and stronger buyer usefulness.",
    href: "/services/ai-content-optimization",
    cta: "Content Optimization",
    secondary: { label: "SEO vs AI SEO", href: "/blog/seo-vs-ai-seo" },
  },
];

const ETHICAL_STANDARDS = [
  {
    principle: "Baseline-Driven Transparency",
    detail:
      "We establish verified Search Console impressions, indexed URL counts, technical health, and conversion baselines at kickoff.",
  },
  {
    principle: "Zero Guaranteed Rankings or Timelines",
    detail:
      "Search algorithms and US category competition sit outside any agency's control—we never promise fixed Google positions, traffic multiples, or artificial deadlines.",
  },
  {
    principle: "White-Hat Authority Only",
    detail:
      "No paid link farms, PBNs, cloaking, or thin multi-city doorway pages that expose your domain to algorithmic drops or manual actions.",
  },
  {
    principle: "Lead & Inquiry Reporting",
    detail:
      "Monthly recaps connect crawl fixes, shipped pages, Search Console clicks, and organic lead behavior—not vanity raw impression graphs.",
  },
];

const US_SEO_PROCESS = [
  {
    step: "01",
    title: "Technical & Search Baseline",
    desc: "Crawl the current site, review Google Search Console coverage, speed metrics, and establish a transparent benchmark.",
  },
  {
    step: "02",
    title: "Keyword & Competitor Mapping",
    desc: "Identify commercial keyword gaps against US rivals and assign one primary search intent per priority URL.",
  },
  {
    step: "03",
    title: "Technical & On-Page Fixes",
    desc: "Resolve index blockers, canonical tags, Core Web Vitals issues, heading structure, and internal linking.",
  },
  {
    step: "04",
    title: "Content, Local & Ethical Authority",
    desc: "Optimize service pages, expand helpful buyer guides, align genuine service areas, and earn relevant white-hat links.",
  },
  {
    step: "05",
    title: "Measurement & Iteration",
    desc: "Report honestly on visibility trends, organic leads, and next-month technical or editorial priorities.",
  },
];

const US_ENGLISH_SEO_FAQS = [
  {
    q: "How long does SEO take to show measurable results in the United States?",
    a: "Technical fixes can be indexed quickly, while competitive search visibility builds gradually depending on your domain baseline, content depth, and US market competition. We track steady progress against an agreed baseline rather than guaranteeing fixed timelines.",
  },
  {
    q: "Do you guarantee #1 Google rankings or specific traffic numbers?",
    a: "No ethical agency can guarantee search rankings or exact traffic totals. We deliver transparent white-hat implementation, rigorous prioritization, and honest reporting.",
  },
  {
    q: "Do you offer local SEO for US cities and multi-state businesses?",
    a: "Yes—where your business genuinely operates. We optimize Google Business Profile signals, service-area architecture, and factual local metadata without creating thin spam doorway pages.",
  },
  {
    q: "What does technical SEO include for US websites?",
    a: "Technical SEO covers crawlability, indexation hygiene, canonical setup, redirect chain cleanup, XML sitemaps, structured schema markup, and Core Web Vitals performance.",
  },
  {
    q: "How do keyword research and competitor analysis work for crowded US markets?",
    a: "We analyze how competing US brands structure category pages, identify unaddressed commercial queries, and prioritize topics with strong buyer intent rather than chasing vanity search volume.",
  },
  {
    q: "How do you approach link building safely?",
    a: "We earn relevant authority through white-hat digital PR, helpful industry resources, partnerships, and clean citation hygiene—never buying automated bulk links or private link networks.",
  },
  {
    q: "Can AI SEO and content optimization help without sounding robotic?",
    a: "Yes. We use AI to accelerate keyword clustering and competitive gap discovery while human strategists and editors write, fact-check, and refine every page.",
  },
  {
    q: "Can SEO support an e-commerce store targeting US shoppers?",
    a: "Yes. We optimize category taxonomy, faceted URL crawl controls, product descriptions, schema markup, and internal links around buyer product intent.",
  },
  {
    q: "What does monthly SEO reporting include?",
    a: "Clear summaries of technical fixes shipped, indexed visibility changes, Search Console query clicks, organic engagement, and next-step recommendations.",
  },
  {
    q: "How does Webamazee work remotely with US marketing teams?",
    a: "We collaborate across EST–PST business hours with scheduled calls, written updates, shared Search Console/GA4 dashboards, and clean editorial sign-offs.",
  },
];

export function UsaSeoRedesign({ page }: { page: LocationPage }) {
  const { openAudit } = useSeoAudit();
  const [activeNodeId, setActiveNodeId] = useState<TreeNodeId>("foundation");
  const activeNode =
    SITE_TREE_NODES.find((n) => n.id === activeNodeId) ?? SITE_TREE_NODES[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. HERO WITH ORGANIC VISIBILITY SITE-TREE VISUAL */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UsaBreadcrumb current="SEO Services USA" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United States · White-Hat Search Growth
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[2.95rem] lg:text-[3.3rem]">
                  Strategic SEO Built for{" "}
                  <span className="text-[#0f6dff]">Competitive US Search</span>
                </h1>

                <p className="mt-5 text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  In the United States, search is where buyers compare options
                  and qualify vendors. Webamazee combines technical site health,
                  intent-mapped architecture, and helpful content to win
                  qualified organic demand sustainably.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => openAudit()}
                    className={PRIMARY_BTN}
                  >
                    Get a Free SEO Audit
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                  <Link href="/contact" className={SECONDARY_BTN}>
                    Speak With an SEO Strategist
                  </Link>
                </div>

                <p className="mt-5 text-[12.5px] leading-relaxed text-slate-500">
                  Ethical white-hat methodology only. No fake ranking claims,
                  purchased spam links, or guaranteed timeframes.
                </p>
              </div>

              {/* Right: Original Organic Discovery Site-Tree Visualizer */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1528] text-white">
                        <Activity aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-[#0b1528]">
                          Organic Discovery Architecture Explorer
                        </p>
                        <p className="text-[11.5px] text-slate-500">
                          Click any layer to inspect how US sites earn durable
                          visibility
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Branch Selector */}
                  <div
                    role="tablist"
                    aria-label="Organic SEO architecture layers"
                    className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                  >
                    {SITE_TREE_NODES.map((node) => {
                      const active = node.id === activeNode.id;
                      return (
                        <button
                          key={node.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveNodeId(node.id)}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            active
                              ? "border-[#0f6dff] bg-[#f4f8ff]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span
                            className={`block font-mono text-[10px] font-bold tracking-[0.12em] ${
                              active ? "text-[#0f6dff]" : "text-slate-400"
                            }`}
                          >
                            {node.code}
                          </span>
                          <span className="mt-1 block text-[12px] font-bold leading-snug text-[#0b1528]">
                            {node.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Node Details */}
                  <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4 sm:p-5">
                    <p className="font-display text-base font-bold text-[#0b1528]">
                      {activeNode.label}
                    </p>
                    <p className="mt-1 text-[13px] text-slate-600">
                      {activeNode.role}
                    </p>

                    <div className="mt-4 space-y-2">
                      {activeNode.signals.map((sig) => (
                        <div
                          key={sig}
                          className="flex items-start gap-2.5 rounded-lg bg-white px-3.5 py-2.5 text-[12.5px] text-[#0b1528] ring-1 ring-slate-200/70"
                        >
                          <ShieldCheck
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                          />
                          <span>{sig}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 ring-1 ring-slate-200/80">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          Internal Link Rule
                        </p>
                        <p className="mt-1 text-[12px] text-slate-600">
                          {activeNode.linkRule}
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#0b1528] p-3 text-white">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#7bb2ff]">
                          White-Hat Safeguard
                        </p>
                        <p className="mt-1 text-[12px] text-slate-200">
                          {activeNode.guardrail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. US SEARCH LANDSCAPE CHALLENGES */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Why US Search Is Different</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Winning crowded SERPs requires structure, not guesswork
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  {page.intro[0]}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {page.whyNeeds.map((item, idx) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {item.desc.replace(/\benquiries\b/gi, "inquiries")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. TECHNICAL SEO, ON-PAGE SEO, AI SEO & CONTENT OPTIMIZATION */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Core Search Capabilities</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Technical integrity paired with intent-driven content
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {TECHNICAL_AND_ONPAGE_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-8"
                >
                  <div>
                    <span className="inline-block rounded-full bg-[#f4f8ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      {card.tag}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-bold text-[#0b1528]">
                      {card.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.7] text-slate-600">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                    >
                      {card.cta}
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                    {card.secondary && (
                      <Link
                        href={card.secondary.href}
                        className="text-[13px] font-medium text-slate-500 hover:text-[#0b1528]"
                      >
                        {card.secondary.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. LOCAL SEO + KEYWORD & COMPETITOR RESEARCH + ETHICAL LINK BUILDING */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Local SEO for genuine service areas */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                    <MapPin aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                    Local SEO for Genuine US Service Areas
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                    Whether you serve a single metro area or operate regional US
                    branches, we strengthen Google Business Profile signals,
                    accurate business data, and factual service-area pages—never
                    mass-generating fake city pages.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-slate-200/80 pt-4">
                  <Link
                    href="/services/local-seo"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Local SEO
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/blog/local-seo-checklist"
                    className="text-[12.5px] font-medium text-slate-500 hover:text-[#0b1528]"
                  >
                    Local SEO Checklist
                  </Link>
                </div>
              </div>

              {/* Keyword & Competitor Research */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                    <Compass aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                    Keyword &amp; Competitor Intelligence
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                    High-competition US terms require strategic targeting. We
                    analyze top-ranking competitors to isolate high-intent
                    commercial gaps, comparison opportunities, and realistic
                    growth paths.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-slate-200/80 pt-4">
                  <Link
                    href="/services/competitor-analysis"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Competitor Analysis
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/services/google-ranking-growth"
                    className="text-[12.5px] font-medium text-slate-500 hover:text-[#0b1528]"
                  >
                    Google Ranking Growth
                  </Link>
                </div>
              </div>

              {/* Ethical Link Building */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                    <Link2 aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                    Ethical Authority &amp; Link Building
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                    Quality outweighs link volume in competitive US niches. We
                    focus on earned industry relevance, publishable research,
                    digital PR outreach, and clean citation consistency—zero
                    automated spam networks.
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-slate-200/80 pt-4">
                  <Link
                    href="/services/link-building"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Link Building
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/free-seo-audit"
                    className="text-[12.5px] font-medium text-slate-500 hover:text-[#0b1528]"
                  >
                    Run Free Website Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ETHICAL SEO APPROACH & HONEST REPORTING */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                Ethical SEO &amp; Accountable Measurement
              </p>
              <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                Honest baseline reporting—never guarantees or short-lived tricks
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {ETHICAL_STANDARDS.map((item, idx) => (
                <div
                  key={item.principle}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-[#60a5fa]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {item.principle}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. 5-STEP SEO PROCESS */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>SEO Delivery Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Five repeatable stages from audit baseline to sustained growth
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {US_SEO_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                >
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-[#0b1528]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. INDUSTRIES SERVED */}
        <UsaIndustriesBand
          title="US search strategies tailored to how each sector evaluates vendors"
          variant="mist"
        />

        {/* 8. EXISTING PORTFOLIO PROOF */}
        <UsaCaseStudiesBand variant="white" />

        {/* 9. FAQS */}
        <UsaFaqBand
          faqs={US_ENGLISH_SEO_FAQS}
          title="Questions US companies ask about SEO & reporting"
          subtitle="Straightforward answers on timelines, ethical authority building, local service areas, and technical audits."
          idPrefix="usa-seo-faq"
          variant="slate"
        />

        {/* SIBLING USA LINKS */}
        <UsaSiblingServicesBand
          currentSlug="seo-services-united-states"
          globalServices={[
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Technical SEO", href: "/services/technical-seo" },
            { label: "Local SEO", href: "/services/local-seo" },
            { label: "AI SEO", href: "/services/ai-seo" },
            { label: "Competitor Analysis", href: "/services/competitor-analysis" },
            { label: "Link Building", href: "/services/link-building" },
          ]}
        />

        {/* 10. FREE SEO AUDIT CTA */}
        <UsaConsultationBanner
          eyebrow="Free US SEO Diagnostic"
          title="Pinpoint What Is Holding Back Your Organic Visibility Across US Search"
          subtitle="Request a free SEO audit of your site architecture, index health, and high-intent keywords before committing to any retainer."
          primaryLabel="Get Your Free SEO Audit"
          primaryHref="/free-seo-audit"
          primaryExternal={false}
          secondaryLabel="Discuss SEO Scope"
          secondaryHref="/contact"
          bullets={[
            "Technical crawl, speed & canonical diagnostic",
            "Top keyword & competitor gap review",
            "Honest priority roadmap with zero false promises",
          ]}
        />
      </div>
    </div>
  );
}
