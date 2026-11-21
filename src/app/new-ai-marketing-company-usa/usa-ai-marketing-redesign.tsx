"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Compass,
  Cpu,
  Database,
  FileCheck2,
  Search,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";
import type { CommercialLocationPage } from "@/lib/locations-commercial";
import {
  CONTAINER,
  EYEBROW,
  PRIMARY_BTN,
  SECONDARY_BTN,
  SECTION_H2,
  UsaBreadcrumb,
  UsaConsultationBanner,
  UsaFaqBand,
  UsaIndustriesBand,
  UsaSiblingServicesBand,
} from "@/components/usa-preview/usa-shared";

type TrackId = "research" | "optimization" | "competitor" | "insights";

const AI_SYSTEM_TRACKS: {
  id: TrackId;
  code: string;
  title: string;
  inputs: string;
  humanGate: string;
  deliverable: string;
}[] = [
  {
    id: "research",
    code: "01",
    title: "Intent & Keyword Research",
    inputs:
      "Search Console exports, long-tail buyer questions, and category query logs.",
    humanGate:
      "Strategist filters commercial value, drops noise, and maps one clear topic per URL.",
    deliverable: "Prioritized US search-intent clusters & page roadmaps.",
  },
  {
    id: "optimization",
    code: "02",
    title: "Content Optimization",
    inputs:
      "Existing US service pages, buyer objections, and top SERP topical gaps.",
    humanGate:
      "Editors fact-check claims, enforce US brand tone, and approve every heading change.",
    deliverable: "Sharper service copy & comparison guides built for depth.",
  },
  {
    id: "competitor",
    code: "03",
    title: "Competitor Intelligence",
    inputs:
      "Public messaging structures, service taxonomies, and content coverage from US rivals.",
    humanGate:
      "Lead marketer isolates real market differentiators instead of copying competitors.",
    deliverable: "Whitespace positioning report & differentiated briefs.",
  },
  {
    id: "insights",
    code: "04",
    title: "Workflows & Data Insights",
    inputs:
      "GA4 conversions, Search Console movement, and campaign lead quality logs.",
    humanGate:
      "Account owner reviews findings for context before adjusting sprint priorities.",
    deliverable: "Plain-English insight briefs & repeatable editorial pipelines.",
  },
];

const SUPPORTED_AI_CAPS = [
  {
    icon: Search,
    tag: "AI SEO & Search Intent",
    title: "Search Intent Clustering at US Scale",
    desc: "Group hundreds of commercial, comparison, and informational US buyer queries into logical site hubs faster—with human strategists confirming every target URL.",
    href: "/services/ai-seo",
    cta: "Explore AI SEO",
    extra: { label: "AI SEO Guide", href: "/blog/ai-seo-guide-2026" },
  },
  {
    icon: Sparkles,
    tag: "Content Optimization",
    title: "Existing Page Depth & Readability",
    desc: "Identify missing buyer questions on existing US service pages, restructure headings for clarity, and refine copy through rigorous human editing.",
    href: "/services/ai-content-optimization",
    cta: "Content Optimization",
    extra: { label: "SEO vs AI SEO", href: "/blog/seo-vs-ai-seo" },
  },
  {
    icon: Compass,
    tag: "Competitor Intelligence",
    title: "Faster Category Whitespace Mapping",
    desc: "Compare how leading US providers frame capabilities and spot practical gaps where your organization can answer buyer questions more clearly.",
    href: "/services/competitor-analysis",
    cta: "Competitor Analysis",
    extra: null,
  },
  {
    icon: Workflow,
    tag: "Workflows & Supported Automation",
    title: "Repeatable Briefs, QA & Reporting",
    desc: "Streamline research collation, structured outline generation, schema checklists, and analytics summaries using proven tooling—no unverified auto-publishing.",
    href: "/services/google-ranking-growth",
    cta: "Growth Workflows",
    extra: null,
  },
  {
    icon: Database,
    tag: "Insights & Segment Alignment",
    title: "Data Insights & Audience Relevance",
    desc: "Translate GA4 and Search Console signals into plain-English insights and tailor landing-page messaging by industry segment where data supports it.",
    href: "/blog/measuring-marketing-roi",
    cta: "Marketing ROI Guide",
    extra: null,
  },
  {
    icon: Bot,
    tag: "Search & AI Readiness",
    title: "Clear Structure for Modern Discovery",
    desc: "Clean semantic HTML, factual service clarity, and valid schema help traditional crawlers and AI tools interpret your site—without guaranteeing placement in ChatGPT or Google AI Overviews.",
    href: "/blog/aeo-vs-geo-vs-seo",
    cta: "AEO vs GEO vs SEO",
    extra: {
      label: "AI Search Readiness Guide",
      href: "/blog/how-to-get-your-brand-mentioned-in-ai-search-results",
    },
  },
];

const EDITORIAL_CONTROLS = [
  {
    code: "GATE 01",
    title: "Factual Accuracy Verification",
    desc: "Every service specification, claim, and cited example is verified against real company facts—eliminating AI hallucinations before publication.",
  },
  {
    code: "GATE 02",
    title: "Human Voice & American Nuance",
    desc: "Experienced editors rewrite repetitive AI phrasing into concise, credible American English matched to how your buyers speak.",
  },
  {
    code: "GATE 03",
    title: "Honest Positioning Boundaries",
    desc: "We never claim black-box proprietary AI engines or promise guaranteed appearances inside third-party AI answers or search widgets.",
  },
  {
    code: "GATE 04",
    title: "Zero Autonomous Publishing",
    desc: "AI never pushes content live unattended. Strategists approve every page structure, meta description, schema tag, and internal link.",
  },
];

const PRACTICAL_USE_CASES = [
  {
    tag: "B2B SaaS",
    title: "Comparison & Integration Page Scaling",
    desc: "Accelerate competitive feature matrix research and build structured comparison hubs under product-team sign-off.",
  },
  {
    tag: "E-Commerce",
    title: "Catalog Description & Category Refreshes",
    desc: "Spot missing buyer specs across large product catalogs and refresh category guides for search clarity without generic fluff.",
  },
  {
    tag: "Multi-Service Firms",
    title: "Underperforming Service Page Audits",
    desc: "Cross-check Search Console query impressions against current copy to uncover intent gaps holding back existing URLs.",
  },
  {
    tag: "Lean Teams",
    title: "Plain-English Analytics Digests",
    desc: "Condense monthly performance exports into prioritized action briefs so US stakeholders act faster on real data.",
  },
];

const US_AI_PROCESS = [
  {
    step: "01",
    title: "Goals & Editorial Boundaries",
    desc: "Establish brand voice rules, factual constraints, and priority US audience segments first.",
  },
  {
    step: "02",
    title: "Verified Data Grounding",
    desc: "Pull real Search Console queries, GA4 behavior data, and verified product/service facts.",
  },
  {
    step: "03",
    title: "AI-Assisted Research & Clustering",
    desc: "Accelerate query grouping, competitor structure audits, and content brief outlining.",
  },
  {
    step: "04",
    title: "Human Strategy & Copy Drafting",
    desc: "Strategists choose angles and craft differentiated messaging tailored to US buyers.",
  },
  {
    step: "05",
    title: "Fact-Checking & Technical QA",
    desc: "Verify accuracy, tone, schema, accessibility, and internal links prior to publishing.",
  },
  {
    step: "06",
    title: "Measurement & Iteration",
    desc: "Monitor organic visibility and lead conversion trends to guide focused next refinements.",
  },
];

const US_ENGLISH_AI_FAQS = [
  {
    q: "What does human-led AI marketing mean for US businesses?",
    a: "It means applying proven AI tools to speed up search-intent research, competitive mapping, content outlining, and analytics summarization while experienced human strategists control brand positioning, factual accuracy, and quality.",
  },
  {
    q: "Do you use proprietary AI software or guarantee AI search visibility?",
    a: "No. We use transparent, proven AI workflows rather than claiming proprietary black-box software—and no agency can guarantee citations or visibility inside ChatGPT, Google AI Overviews, or third-party platforms.",
  },
  {
    q: "Does AI replace experienced marketers on our account?",
    a: "No. AI supports repetitive synthesis and initial structuring, while senior strategists and editors own messaging, commercial decisions, and final quality approval.",
  },
  {
    q: "How is AI-assisted content reviewed before going live?",
    a: "Every draft passes four human checks: factual verification, natural American English tone editing, audience usefulness review, and technical SEO/schema validation before publishing.",
  },
  {
    q: "Can AI SEO improve search performance without risking thin spam penalties?",
    a: "Yes—when used for research depth, intent alignment, and content quality improvements rather than publishing mass unreviewed AI articles.",
  },
  {
    q: "What marketing automation and personalization are realistically supported?",
    a: "We focus on practical workflows we directly support: structured brief pipelines, editorial scheduling, automated data-summary digests, segment-aligned landing copy, and clean CRM/lead routing.",
  },
  {
    q: "Can AI marketing integrate alongside our existing SEO and content plans?",
    a: "Yes. We identify high-leverage research, optimization, and reporting steps where AI saves time without disrupting working campaigns.",
  },
  {
    q: "How long does it take to roll out an AI-assisted marketing workflow?",
    a: "After initial discovery and baseline data grounding, research outputs and content refreshes ship rapidly on an agreed sprint cadence.",
  },
  {
    q: "Can lean US teams benefit without hiring a large content department?",
    a: "Yes. Structured research and editing workflows help smaller teams keep core service pages, guides, and insights consistent at higher quality.",
  },
  {
    q: "Do you guarantee rankings, traffic gains, or lead counts?",
    a: "No ethical agency guarantees outcomes. We deliver transparent workflows, verified human oversight, and accountable measurement against your starting baseline.",
  },
];

export function UsaAiMarketingRedesign({
  page,
}: {
  page: CommercialLocationPage;
}) {
  const [activeTrackId, setActiveTrackId] = useState<TrackId>("research");
  const activeTrack =
    AI_SYSTEM_TRACKS.find((t) => t.id === activeTrackId) ?? AI_SYSTEM_TRACKS[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. HERO WITH DATA-TO-DECISION AI TOPOLOGY VISUAL */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UsaBreadcrumb current="AI Marketing USA" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United States · Human-Led AI Systems
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[2.95rem] lg:text-[3.25rem]">
                  Practical AI-Assisted Marketing{" "}
                  <span className="text-[#0f6dff]">
                    Guided by Human Strategy
                  </span>
                </h1>

                <p className="mt-5 text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Competing in US categories requires faster research and
                  sharper execution—without drowning buyers in generic AI copy.
                  Webamazee pairs practical AI research workflows with human
                  strategy, fact-checking, and editorial QA.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Explore Human-Led AI Strategy
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#human-qa" className={SECONDARY_BTN}>
                    See Editorial Safeguards
                  </Link>
                </div>
              </div>

              {/* Right: Interactive US AI System Topology */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0b1528] text-white">
                        <Cpu aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-[#0b1528]">
                          Human-AI Collaboration Topology
                        </p>
                        <p className="text-[11.5px] text-slate-500">
                          Select a workflow track to see inputs, editorial
                          review &amp; real outputs
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Track Selection Tabs */}
                  <div
                    role="tablist"
                    aria-label="AI marketing workflow tracks"
                    className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    {AI_SYSTEM_TRACKS.map((track) => {
                      const active = track.id === activeTrack.id;
                      return (
                        <button
                          key={track.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveTrackId(track.id)}
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
                            TRACK {track.code}
                          </span>
                          <span className="mt-1 block text-[12px] font-bold leading-snug text-[#0b1528]">
                            {track.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Three-Column Data-to-Decision Flow */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-[#f8fbff] p-4">
                      <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                        <Database aria-hidden="true" className="h-3.5 w-3.5" />
                        1. AI Signal Input
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                        {activeTrack.inputs}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#0f6dff]/30 bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#0b1528]">
                        <UserCheck aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                        2. Human Gate
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-[#0b1528]">
                        {activeTrack.humanGate}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#0b1528] p-4 text-white">
                      <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#7bb2ff]">
                        <FileCheck2 aria-hidden="true" className="h-3.5 w-3.5" />
                        3. Verified Output
                      </div>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-slate-200">
                        {activeTrack.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. AI-ASSISTED RESEARCH & STRATEGY POSITIONING */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>What AI Marketing Means</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Faster research and content velocity—without surrendering
                  editorial control
                </h2>
              </div>
              <div className="space-y-4 text-[15.5px] leading-[1.7] text-slate-600 lg:col-span-7">
                {page.whatItMeans.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE AI CAPABILITIES (SEO, CONTENT, COMPETITORS, WORKFLOWS, INSIGHTS, AI READINESS) */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Supported AI Marketing Systems</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Where practical AI adds measurable leverage across US campaigns
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {SUPPORTED_AI_CAPS.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={cap.title}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7"
                  >
                    <div>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                        {cap.tag}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold text-[#0b1528]">
                        {cap.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-[1.7] text-slate-600">
                        {cap.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <Link
                        href={cap.href}
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                      >
                        {cap.cta}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                      {cap.extra && (
                        <Link
                          href={cap.extra.href}
                          className="text-[12.5px] font-medium text-slate-500 hover:text-[#0b1528]"
                        >
                          {cap.extra.label}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. HUMAN REVIEW, FACT-CHECKING & QUALITY CONTROL */}
        <section
          id="human-qa"
          className="scroll-mt-24 bg-[#0b1528] py-16 text-white sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                Human Review, Fact-Checking &amp; Quality Control
              </p>
              <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                Every asset clears strict human verification before your US
                buyers ever read it
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {EDITORIAL_CONTROLS.map((gate) => (
                <div
                  key={gate.code}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <span className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#7bb2ff]">
                    {gate.code}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white">
                    {gate.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                    {gate.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. PRACTICAL US USE CASES */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Practical Use Cases</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                How American teams apply human-led AI every week
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PRACTICAL_USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                >
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff] ring-1 ring-slate-200">
                    {uc.tag}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-[#0b1528]">
                    {uc.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {uc.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. INDUSTRIES SERVED */}
        <UsaIndustriesBand
          title="Human-led AI workflows tailored to US industry nuances"
          variant="mist"
        />

        {/* 7. 6-STAGE PROCESS */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Implementation Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Six structured steps from brand grounding to human approval
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {US_AI_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                >
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                    {item.step}
                  </span>
                  <h3 className="mt-2.5 font-display text-lg font-bold text-[#0b1528]">
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

        {/* 8. FAQS */}
        <UsaFaqBand
          faqs={US_ENGLISH_AI_FAQS}
          title="Questions US marketing teams ask about AI workflows & QA"
          subtitle="Clear answers on human review gates, automation scope, search compliance, and realistic outcomes."
          idPrefix="usa-ai-faq"
          variant="slate"
        />

        {/* SIBLING USA LINKS */}
        <UsaSiblingServicesBand
          currentSlug="ai-marketing-company-usa"
          globalServices={[
            { label: "AI SEO", href: "/services/ai-seo" },
            { label: "AI Content Optimization", href: "/services/ai-content-optimization" },
            { label: "Competitor Analysis", href: "/services/competitor-analysis" },
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Google Ranking Growth", href: "/services/google-ranking-growth" },
          ]}
        />

        {/* 9. CONSULTATION CTA */}
        <UsaConsultationBanner
          eyebrow="Explore Human-Led AI Workflows"
          title="Scale Search Research & Content Output Without Compromising Brand Trust"
          subtitle="Schedule a consultation to inspect where AI-assisted research and editing workflows fit cleanly into your US marketing roadmap."
          primaryLabel="Schedule an AI Strategy Call"
          secondaryLabel="Send Project Brief"
          bullets={[
            "Review search-intent & content workflow bottlenecks",
            "Strict factual QA & American English editing gates",
            "Transparent workflows with zero black-box AI hype",
          ]}
        />
      </div>
    </div>
  );
}
