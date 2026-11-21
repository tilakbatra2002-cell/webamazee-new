"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  FileCheck2,
  GitBranch,
  Search,
  ShieldAlert,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { CommercialLocationPage } from "@/lib/locations-commercial";
import {
  CONTAINER,
  EYEBROW,
  PRIMARY_BTN,
  SECONDARY_BTN,
  SECTION_H2,
  UkBreadcrumb,
  UkConsultationBanner,
  UkFaqBand,
  UkIndustriesBand,
  UkSiblingServicesBand,
} from "@/components/uk-preview/uk-shared";

type WorkflowStageId = "signals" | "cluster" | "review" | "publish";

const AI_PIPELINE_STAGES: {
  id: WorkflowStageId;
  step: string;
  label: string;
  owner: "AI-Assisted" | "Human-Controlled";
  aiRole: string;
  humanRole: string;
  output: string;
}[] = [
  {
    id: "signals",
    step: "01",
    label: "Search & Data Collection",
    owner: "AI-Assisted",
    aiRole: "Aggregates Search Console queries, page gaps, and competitor topic structures rapidly.",
    humanRole: "Strategist filters noise and selects verified UK commercial priorities.",
    output: "Clean search & competitor dataset",
  },
  {
    id: "cluster",
    step: "02",
    label: "Intent Clustering & Briefs",
    owner: "AI-Assisted",
    aiRole: "Groups buyer questions, semantic entities, and outline structures into structured briefs.",
    humanRole: "Lead strategist validates angle, commercial fit, and internal linking.",
    output: "Approved content & SEO brief",
  },
  {
    id: "review",
    step: "03",
    label: "Editorial Fact-Checking & Tone",
    owner: "Human-Controlled",
    aiRole: "Zero unreviewed output moves forward—drafts stay strictly in staging review.",
    humanRole: "Editors verify claims, enforce UK English nuance, and remove generic phrasing.",
    output: "Human-verified brand copy",
  },
  {
    id: "publish",
    step: "04",
    label: "Release & Performance Tracking",
    owner: "Human-Controlled",
    aiRole: "Summarises Search Console & GA4 trends into plain-English weekly notes.",
    humanRole: "Account owner interprets enquiry quality and adjusts next priorities.",
    output: "Measured editorial iteration",
  },
];

const HUMAN_QA_GATES = [
  {
    code: "01",
    title: "Fact & Claim Verification",
    desc: "Every statistic, service claim, and technical recommendation is cross-checked against verified sources—AI hallucinations never reach live pages.",
  },
  {
    code: "02",
    title: "UK Brand Voice & Nuance",
    desc: "Copy is edited into calm, credible UK English tailored to your positioning rather than generic automated phrasing.",
  },
  {
    code: "03",
    title: "Audience Usefulness Audit",
    desc: "Pages must genuinely answer buyer questions and clarify scope—never published purely to hit word counts.",
  },
  {
    code: "04",
    title: "Zero Auto-Publishing",
    desc: "No content goes live autonomously. Experienced strategists approve every draft, meta tag, and internal link.",
  },
];

const PRACTICAL_USE_CASES = [
  {
    tag: "Content Refresh",
    title: "Existing UK Service-Page Overhauls",
    desc: "Audit outdated service pages against search intent gaps, restructure headings for clarity, and edit copy under strict human sign-off.",
  },
  {
    tag: "Intent Research",
    title: "Faster Keyword & Question Clustering",
    desc: "Organise hundreds of buyer queries into logical commercial hubs and supporting articles without losing strategic selectivity.",
  },
  {
    tag: "Competitor Audits",
    title: "Positioning & Topic Whitespace",
    desc: "Map how competing UK firms structure core service explanations and spot questions they leave unanswered.",
  },
  {
    tag: "Insight Summaries",
    title: "Plain-English Analytics Digests",
    desc: "Convert complex Search Console exports and GA4 trends into clear monthly priorities stakeholders can act on quickly.",
  },
];

const AI_PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "Clarify commercial goals, brand boundaries, and existing assets before introducing any AI tooling.",
  },
  {
    step: "02",
    title: "Data & Search Audit",
    desc: "Collect verified site, Search Console, and competitor baselines across your UK market.",
  },
  {
    step: "03",
    title: "AI-Assisted Analysis",
    desc: "Accelerate query clustering, semantic gap detection, and structural pattern synthesis.",
  },
  {
    step: "04",
    title: "Human Strategy",
    desc: "Experienced strategists turn validated signals into a realistic editorial and technical roadmap.",
  },
  {
    step: "05",
    title: "Edited Execution & QA",
    desc: "Draft, fact-check, refine tone, and verify schema and links prior to publishing.",
  },
  {
    step: "06",
    title: "Measurement & Iteration",
    desc: "Track search visibility and enquiry quality to guide focused follow-on improvements.",
  },
];

export function UkAiMarketingRedesign({
  page,
}: {
  page: CommercialLocationPage;
}) {
  const [activeStageId, setActiveStageId] =
    useState<WorkflowStageId>("signals");
  const activeStage =
    AI_PIPELINE_STAGES.find((s) => s.id === activeStageId) ??
    AI_PIPELINE_STAGES[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. DISTINCTIVE AI MARKETING HERO WITH WORKFLOW VISUAL */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UkBreadcrumb current="AI Marketing UK" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United Kingdom · Human-Led AI
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.3rem]">
                  Human-Led, AI-Assisted Marketing for{" "}
                  <span className="text-[#0f6dff]">Smarter UK Systems</span>
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Webamazee helps UK businesses apply proven AI tools to search
                  research, content structuring, and competitive analysis—while
                  keeping strategy, fact-checking, brand voice, and quality
                  approval firmly in human hands.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Book an AI Strategy Review
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#human-oversight" className={SECONDARY_BTN}>
                    See Human QA Standards
                  </Link>
                </div>
              </div>

              {/* Right: Interactive Human-AI Workflow Studio */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0b1528] text-white">
                        <GitBranch aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-[#0b1528]">
                          Human-AI Collaboration Pipeline
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Clear division between AI acceleration &amp; human
                          control
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pipeline Stage Selector */}
                  <div
                    role="tablist"
                    aria-label="AI marketing workflow stages"
                    className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    {AI_PIPELINE_STAGES.map((stage) => {
                      const active = stage.id === activeStage.id;
                      return (
                        <button
                          key={stage.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveStageId(stage.id)}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            active
                              ? "border-[#0f6dff] bg-[#f4f8ff]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <span
                            className={`block font-display text-[11px] font-bold ${
                              active ? "text-[#0f6dff]" : "text-slate-400"
                            }`}
                          >
                            {stage.step}
                          </span>
                          <span className="mt-0.5 block text-[12px] font-bold leading-tight text-[#0b1528]">
                            {stage.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Two-Track Role Separation Card */}
                  <div className="mt-4 space-y-3 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display text-base font-bold text-[#0b1528]">
                        {activeStage.step} · {activeStage.label}
                      </p>
                      <span
                        className={`rounded-full px-3 py-0.5 text-[10.5px] font-bold ${
                          activeStage.owner === "Human-Controlled"
                            ? "bg-[#0b1528] text-white"
                            : "bg-[#0f6dff]/10 text-[#0f6dff]"
                        }`}
                      >
                        {activeStage.owner}
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.11em] text-[#0f6dff]">
                          <Cpu aria-hidden="true" className="h-3.5 w-3.5" />
                          AI Assistance
                        </div>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                          {activeStage.aiRole}
                        </p>
                      </div>
                      <div className="rounded-xl border border-[#0b1528]/15 bg-white p-3.5">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.11em] text-[#0b1528]">
                          <UserCheck aria-hidden="true" className="h-3.5 w-3.5" />
                          Human Control
                        </div>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                          {activeStage.humanRole}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-[#0b1528] px-3.5 py-2.5 text-[12px] text-slate-200">
                      <span className="font-semibold text-[#7bb2ff]">
                        Stage output:{" "}
                      </span>
                      {activeStage.output}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. WHAT AI-ASSISTED MARKETING MEANS */}
        <section
          id="ai-meaning"
          className="scroll-mt-24 border-b border-slate-200/80 bg-white py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>What AI-Assisted Marketing Means</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Operational speed without surrendering brand judgement
                </h2>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.7] text-slate-600">
                  {page.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-slate-500">
                    <ShieldAlert aria-hidden="true" className="h-4 w-4" />
                    What We Reject
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0b1528]">
                    Automated AI Volume Hype
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[13.5px] text-slate-600">
                    <li>• Unreviewed AI articles pushed straight to live sites</li>
                    <li>• Claims of proprietary black-box AI ranking engines</li>
                    <li>• Guaranteed ChatGPT or Google AI Overview placement</li>
                    <li>• Generic copy detached from UK buyer realities</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-[#0f6dff]/30 bg-[#f4f8ff] p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                    <CheckCircle2 aria-hidden="true" className="h-4 w-4" />
                    How Webamazee Works
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#0b1528]">
                    Human-Led AI Workflows
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-[13.5px] text-[#0b1528]">
                    <li>• AI speeds up query clustering and gap discovery</li>
                    <li>• Strategists select high-intent UK business topics</li>
                    <li>• Editors fact-check and refine tone before approval</li>
                    <li>• Transparent workflows aligned with core SEO health</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AI SEO & SEARCH-INTENT RESEARCH + 4. AI-ASSISTED CONTENT OPTIMISATION */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                    <Search aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className={`${EYEBROW} mt-5`}>
                    AI SEO &amp; Search-Intent Research
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Map commercial buyer language with greater speed and context
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                    AI accelerates how we group search queries, extract
                    long-tail commercial questions, and map buyer intent across
                    industries—while experienced SEOs decide which terms warrant
                    dedicated pages.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5">
                  <Link
                    href="/services/ai-seo"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore AI SEO Service
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/blog/ai-seo-guide-2026"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Read AI SEO Guide
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#0f6dff]/25 bg-white p-7 sm:p-9">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                    <Sparkles aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className={`${EYEBROW} mt-5`}>
                    AI-Assisted Content Optimisation
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Refine existing UK pages for clarity, structure &amp; intent
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                    Instead of churning out shallow new posts, we inspect what
                    your existing pages miss—tightening headings, closing
                    topical gaps, and aligning explanations with real customer
                    decisions.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5">
                  <Link
                    href="/services/ai-content-optimization"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Content Optimisation Service
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/blog/seo-vs-ai-seo"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    SEO vs AI SEO Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPETITOR & MARKET ANALYSIS + 6. AI-POWERED MARKETING WORKFLOWS */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-9">
                <p className={EYEBROW}>Competitor &amp; Market Analysis</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                  Surface competitive gaps across UK sectors faster
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                  We use AI analysis to compare how rival UK providers position
                  their offers, organise service hubs, and cover buyer questions
                  —turning raw SERP patterns into clear competitive priorities.
                </p>
                <div className="mt-6">
                  <Link
                    href="/services/competitor-analysis"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Competitor Analysis
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-9">
                <p className={EYEBROW}>AI-Powered Marketing Workflows</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                  Repeatable research, briefing, and insight pipelines
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                  By automating repetitive synthesis—research collation, schema
                  drafting checks, and analytics reporting summaries—your team
                  and ours spend far more time on strategy and high-impact pages.
                </p>
                <div className="mt-6">
                  <Link
                    href="/services/google-ranking-growth"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Search Growth Workflows
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. HUMAN REVIEW, FACT-CHECKING & QUALITY CONTROL */}
        <section
          id="human-oversight"
          className="scroll-mt-24 bg-[#0b1528] py-16 text-white sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                Editorial Governance &amp; Quality Control
              </p>
              <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                Human review and fact-checking sit between every prompt and live
                publication
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {HUMAN_QA_GATES.map((gate) => (
                <div
                  key={gate.code}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="flex items-center justify-between">
                    <FileCheck2
                      aria-hidden="true"
                      className="h-5 w-5 text-[#60a5fa]"
                    />
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#7bb2ff]">
                      {gate.code}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-white">
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

        {/* 8. TRADITIONAL SEARCH & AI SEARCH READINESS */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className={EYEBROW}>
                  Traditional Search &amp; AI Search Readiness
                </p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Strong technical clarity supports both Google and modern AI
                  discovery
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-600">
                  Sound technical SEO, clear factual explanations, structured
                  schema, and strong internal linking help traditional search
                  engines and AI research tools parse what your business offers.
                  We build clean readiness foundations—without promising
                  guaranteed visibility or citations inside ChatGPT, Google AI
                  Overviews, or third-party AI systems.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/blog/aeo-vs-geo-vs-seo"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    AEO vs GEO vs SEO Guide
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/blog/how-to-get-your-brand-mentioned-in-ai-search-results"
                    className="text-[14px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    AI Search Visibility Guide -&gt;
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-[#f4f8ff] p-7 lg:col-span-6">
                <div className="flex items-center gap-2.5">
                  <Bot aria-hidden="true" className="h-5 w-5 text-[#0f6dff]" />
                  <h3 className="font-display text-lg font-bold text-[#0b1528]">
                    Practical Readiness Signals We Implement
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-[14px] text-[#0b1528]">
                  <li className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200/80">
                    Clean semantic HTML headings and unambiguous service scope
                  </li>
                  <li className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200/80">
                    Consistent Organisation, Service, Breadcrumb, and FAQ schema
                  </li>
                  <li className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200/80">
                    Crawlable architecture with clear topical authority hubs
                  </li>
                  <li className="rounded-xl bg-white p-3.5 ring-1 ring-slate-200/80">
                    Transparent, verifiable copy free of inflated claims
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PRACTICAL USE CASES */}
        <section className="bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Practical Use Cases</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Where UK marketing teams gain measurable leverage today
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PRACTICAL_USE_CASES.map((uc) => (
                <div
                  key={uc.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
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

        {/* 10. INDUSTRIES SERVED */}
        <UkIndustriesBand
          title="Human-led AI workflows adapted to UK industry standards"
          variant="white"
        />

        {/* 11. TRANSPARENT IMPLEMENTATION PROCESS */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Implementation Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Six transparent steps from data grounding to human sign-off
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {AI_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6"
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

        {/* 12. RELEVANT FAQS */}
        <UkFaqBand
          faqs={page.faqs}
          title="Questions about AI marketing for UK businesses"
          subtitle="Honest answers on AI-assisted research, human editorial control, search compliance, and strategy integration."
          idPrefix="uk-ai-faq"
          variant="white"
        />

        {/* SIBLING UK LINKS */}
        <UkSiblingServicesBand
          currentSlug="ai-marketing-company-uk"
          globalServices={[
            { label: "AI SEO", href: "/services/ai-seo" },
            { label: "AI Content Optimization", href: "/services/ai-content-optimization" },
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Competitor Analysis", href: "/services/competitor-analysis" },
            { label: "Google Ranking Growth", href: "/services/google-ranking-growth" },
          ]}
        />

        {/* 13. CONSULTATION CTA */}
        <UkConsultationBanner
          eyebrow="Explore Human-Led AI Workflows"
          title="Build Smarter, Editorial-Grade Marketing Systems for Your UK Team"
          subtitle="Book a consultation to review where AI-assisted research and content workflows can save your team time without compromising accuracy."
          primaryLabel="Book a Free Consultation"
          secondaryLabel="Discuss AI Workflows"
          bullets={[
            "Review search, content & workflow bottlenecks",
            "Clear human QA & editorial governance rules",
            "Realistic scope with zero AI hype or lock-in",
          ]}
        />
      </div>
    </div>
  );
}
