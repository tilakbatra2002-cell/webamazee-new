"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Gauge,
  Globe2,
  Mail,
  Phone,
  Plus,
  SearchCheck,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { SeoAuditForm } from "@/components/seo-audit/seo-audit-form";
import { SeoAuditProgress } from "@/components/seo-audit/seo-audit-progress";
import { SeoAuditResults } from "@/components/seo-audit/seo-audit-results";
import { useSeoAuditRun } from "@/components/seo-audit/use-seo-audit-run";
import { site } from "@/lib/site";

export type AuditFaqItem = { q: string; a: string };

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const EYEBROW =
  "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.35rem]";
const PRIMARY_BTN =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 py-3 text-center text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const SECONDARY_BTN =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

const AUDIT_CHECKS = [
  {
    title: "Technical SEO",
    desc: "HTTP status, HTTPS, redirects, canonicals, robots.txt, sitemaps and indexability signals.",
    icon: Workflow,
  },
  {
    title: "On-page SEO",
    desc: "Title, meta description, headings, content length, images, alt text and internal links.",
    icon: SearchCheck,
  },
  {
    title: "Performance",
    desc: "PageSpeed metrics where available — LCP, CLS, INP, FCP and TTFB. Otherwise we say so.",
    icon: Gauge,
  },
  {
    title: "Mobile & security",
    desc: "Viewport and responsive signals, HTTPS, mixed content and basic transport security headers.",
    icon: Smartphone,
  },
  {
    title: "Structured data",
    desc: "JSON-LD and Schema.org types such as Organization, LocalBusiness, Product, Article, FAQ and breadcrumbs.",
    icon: ShieldCheck,
  },
  {
    title: "AI Search Readiness",
    desc: "Entity, about/contact, crawlability and content-structure signals that can support modern search experiences.",
    icon: Sparkles,
  },
];

const AUDIT_STEPS = [
  {
    n: "01",
    title: "Enter your URL",
    desc: "Use example.com or a full https:// address. We normalise missing HTTPS.",
  },
  {
    n: "02",
    title: "We fetch the homepage",
    desc: "The audit requests the live page, robots.txt and sitemap — with SSRF protections.",
  },
  {
    n: "03",
    title: "Scores are calculated",
    desc: "Each category is scored from checks we could actually run. Nothing is randomised.",
  },
  {
    n: "04",
    title: "Request the full report",
    desc: "If you want a deeper review, share your details after the overview.",
  },
];

const CATEGORY_WEIGHTS = [
  { category: "Technical SEO", weight: "25%", scope: "Status, HTTPS, canonical, robots.txt, sitemap, indexability" },
  { category: "On-Page SEO", weight: "20%", scope: "Title, meta description, H1/H2 structure, alt text, links" },
  { category: "Performance", weight: "20%", scope: "PageSpeed LCP, CLS, INP, FCP & TTFB when available" },
  { category: "Mobile", weight: "10%", scope: "Viewport, device-width & mobile readiness signals" },
  { category: "Security", weight: "10%", scope: "HTTPS, TLS validity, mixed content & HSTS header" },
  { category: "Structured Data", weight: "5%", scope: "Detected JSON-LD and Schema.org entity types" },
  { category: "AI Search Readiness", weight: "10%", scope: "Entity, contact, about, crawlability & FAQ signals" },
];

const RESULT_READING_POINTS = [
  "Findings are grouped into Critical, High priority and Opportunities.",
  "Each issue explains why it matters and how to fix it, without ranking promises.",
  "We also list what is already working, so a healthy site is not forced into a problem list.",
  "AI Search Readiness is a signal score, not a claim that the site will appear in ChatGPT.",
];

const REPORT_OUTPUT_BLOCKS = [
  {
    num: "01",
    label: "Health & category scores",
    detail: "Weighted overall score (/100) plus 7 category cards — showing Not enough data if a check cannot run.",
  },
  {
    num: "02",
    label: "Prioritised findings",
    detail: "Critical, High priority and Opportunities with Why it matters and How to fix it guidance.",
  },
  {
    num: "03",
    label: "Positives & technical details",
    detail: "What's already working plus live URL analyzed, HTTP status, canonical, robots.txt, sitemap, headings and schema.",
  },
  {
    num: "04",
    label: "Optional full report request",
    detail: "Submit Name, Work email and Company / Website after the overview if you want a deeper review.",
  },
];

const TECHNICAL_DETAIL_FIELDS = [
  "URL analyzed",
  "HTTP status",
  "Canonical",
  "robots.txt",
  "Sitemap",
  "Title & meta description",
  "H1 & word count",
  "Internal & external links",
  "Images & missing alt",
  "Schema detected",
  "Mobile PSI performance",
];

const HELPFUL_LINKS = [
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "Technical SEO", href: "/services/technical-seo" },
  { label: "AI SEO", href: "/services/ai-seo" },
  { label: "Contact", href: "/contact" },
];

const STRATEGY_CALL_HIGHLIGHTS = [
  "Free personalised roadmap",
  "Personal follow-up from our team",
  "No lock in",
];

export function FreeSeoAuditRedesign({ faqs }: { faqs: AuditFaqItem[] }) {
  const run = useSeoAuditRun();
  const workspaceRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  async function handleAuditSubmit() {
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await run.analyze();
  }

  function focusAuditForm() {
    if (run.step !== "form") {
      run.reset();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => inputRef.current?.focus(), 250);
  }

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. HERO + PROMINENT LIVE AUDIT URL SUBMISSION */}
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-12 sm:py-16">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  Free SEO Audit
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
              <div>
                <p className={EYEBROW}>Free Website Audit</p>

                <h1 className="mt-4 max-w-2xl font-display text-[2.3rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3.1rem] lg:text-[3.5rem]">
                  How healthy is{" "}
                  <span className="text-[#0f6dff]">your website?</span>
                </h1>

                <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  Get a free website and SEO audit to uncover technical issues, SEO opportunities, performance problems, and areas that may be limiting your growth.
                </p>

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-y border-slate-200/90 py-3.5 text-[13.5px] font-semibold text-[#0b1528]">
                  <span className="flex items-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    Live homepage fetch
                  </span>
                  <span className="flex items-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    Seven diagnostic categories
                  </span>
                  <span className="flex items-center gap-2">
                    <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    No credit card required
                  </span>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={focusAuditForm}
                    className={PRIMARY_BTN}
                  >
                    Analyze My Website
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </button>
                  <Link href="/contact" className={SECONDARY_BTN}>
                    Talk to Webamazee
                  </Link>
                </div>
              </div>

              {/* Elevated Live URL Submission Console */}
              <div className="overflow-hidden rounded-2xl border border-[#dce6f4] bg-white shadow-[0_18px_44px_-28px_rgba(11,21,40,0.18)]">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-[#0b1528] px-6 py-4 text-white sm:px-7">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                      Live homepage SEO audit
                    </p>
                    <p className="mt-0.5 font-display text-[1rem] font-bold text-white">
                      Inspect live signals on your submitted URL
                    </p>
                  </div>
                  <Globe2
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-[#8ec5ff]"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  {run.step === "form" && (
                    <>
                      <SeoAuditForm
                        compact
                        inputRef={inputRef}
                        url={run.url}
                        onUrlChange={run.setUrl}
                        onSubmit={handleAuditSubmit}
                        urlError={run.urlError}
                        apiError={run.apiError}
                      />

                      <div className="mt-6 border-t border-slate-200 pt-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          Included in the free session overview
                        </p>
                        <ul className="mt-2.5 grid gap-2 text-[12.5px] text-slate-600 sm:grid-cols-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                            Live URL, robots.txt &amp; sitemap check
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                            Critical, high &amp; opportunity findings
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                            Detected Schema.org &amp; meta tags
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                            Session-only (never indexed)
                          </li>
                        </ul>
                      </div>
                    </>
                  )}

                  {run.step === "progress" && (
                    <div className="space-y-4">
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        Audit in progress
                      </p>
                      <p className="font-display text-lg font-bold text-[#0b1528]">
                        Fetching live signals for{" "}
                        <span className="break-all text-[#0f6dff]">{run.url}</span>
                      </p>
                      <p className="text-[14px] leading-relaxed text-slate-600">
                        Live checks are running below in the diagnostic workspace.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          workspaceRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        }
                        className={SECONDARY_BTN}
                      >
                        View Live Progress
                      </button>
                    </div>
                  )}

                  {run.step === "result" && run.result && (
                    <div className="space-y-4">
                      <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        Session overview ready
                      </p>
                      <p className="font-display text-xl font-bold text-[#0b1528]">
                        {run.result.domain}
                      </p>
                      <p className="text-[14px] text-slate-600">
                        Overall website health score:{" "}
                        <strong className="text-[#0b1528]">
                          {run.result.seoScore.overall === null
                            ? "Not enough data"
                            : `${run.result.seoScore.overall} / 100`}
                        </strong>
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() =>
                            workspaceRef.current?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            })
                          }
                          className={PRIMARY_BTN}
                        >
                          View Full Results
                        </button>
                        <button
                          type="button"
                          onClick={focusAuditForm}
                          className={SECONDARY_BTN}
                        >
                          Analyze Another Website
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DYNAMIC AUDIT WORKSPACE / HONEST REPORT STRUCTURE PREVIEW */}
        <section
          id="audit-workspace"
          ref={workspaceRef}
          className="scroll-mt-24 bg-white py-12 sm:py-16"
        >
          <div className={CONTAINER}>
            {run.step === "progress" && (
              <div className="mx-auto max-w-4xl rounded-2xl border border-[#dce6f4] bg-white shadow-[0_18px_44px_-28px_rgba(11,21,40,0.16)]">
                <SeoAuditProgress url={run.url} activeIndex={run.progressStep} />
              </div>
            )}

            {run.step === "result" && run.result && (
              <div className="mx-auto max-w-5xl rounded-2xl border border-[#dce6f4] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(11,21,40,0.16)] sm:p-9">
                <SeoAuditResults result={run.result} />
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <button
                    type="button"
                    onClick={focusAuditForm}
                    className="text-sm font-bold text-[#0f6dff] hover:underline"
                  >
                    Analyze another website
                  </button>
                </div>
              </div>
            )}

            {run.step === "form" && (
              <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
                <div>
                  <p className={EYEBROW}>What you receive</p>
                  <h2 className={`${HEADING} mt-2`}>
                    A real session report populated strictly from live checks
                  </h2>
                  <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-600">
                    Nothing is fabricated or pre-filled. When you submit your URL above, every score, category status, finding and technical detail is computed from the actual live response — or marked <strong className="font-semibold text-[#0b1528]">Not enough data</strong> if unavailable.
                  </p>

                  <ol className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
                    {REPORT_OUTPUT_BLOCKS.map((block) => (
                      <li
                        key={block.num}
                        className="grid grid-cols-[28px_1fr] gap-3 py-4"
                      >
                        <span className="font-display text-[11.5px] font-bold text-[#0f6dff]">
                          {block.num}
                        </span>
                        <div>
                          <p className="font-display text-[15px] font-bold text-[#0b1528]">
                            {block.label}
                          </p>
                          <p className="mt-0.5 text-[13.5px] leading-relaxed text-slate-600">
                            {block.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Honest Report Structure Blueprint */}
                <aside
                  aria-label="SEO audit report output fields"
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f7f9fc]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        Session report blueprint
                      </p>
                      <p className="font-display text-[15px] font-bold text-[#0b1528]">
                        Real output structure generated on submit
                      </p>
                    </div>
                    <span className="rounded-lg border border-slate-200 bg-[#f7f9fc] px-2.5 py-1 text-[11.5px] font-semibold text-slate-600">
                      Not indexed
                    </span>
                  </div>

                  <div className="space-y-5 p-6">
                    {/* Score + Categories preview */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <span className="font-display text-[14px] font-bold text-[#0b1528]">
                          Your Website Score
                        </span>
                        <span className="text-[12px] font-semibold text-[#0f6dff]">
                          Calculated live (/ 100)
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {CATEGORY_WEIGHTS.map((item) => (
                          <div
                            key={item.category}
                            className="flex items-center justify-between gap-2 rounded-lg border border-slate-200/80 bg-[#f7f9fc] px-3 py-2 text-[12.5px]"
                          >
                            <span className="font-semibold text-[#0b1528]">
                              {item.category}
                            </span>
                            <span className="text-[11.5px] font-medium text-slate-500">
                              {item.weight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Findings & Technical Details preview */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          What needs attention?
                        </p>
                        <ul className="mt-2.5 space-y-2 text-[12.5px] text-slate-600">
                          <li className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="font-semibold text-[#0b1528]">Critical</span>
                            <span>Blocking or missing signals</span>
                          </li>
                          <li className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                            <span className="font-semibold text-[#0b1528]">High priority</span>
                            <span>Title, meta, H1, mobile gaps</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="font-semibold text-[#0b1528]">Opportunities</span>
                            <span>Schema, structure &amp; clarity</span>
                          </li>
                        </ul>
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                          Technical details drawer
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {TECHNICAL_DETAIL_FIELDS.map((field) => (
                            <span
                              key={field}
                              className="rounded-md border border-slate-200 bg-[#f7f9fc] px-2 py-0.5 text-[11.5px] font-medium text-slate-600"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#0b1528] px-5 py-4 text-white">
                      <p className="text-[13px] text-slate-200">
                        Enter your website above to generate your live session overview.
                      </p>
                      <button
                        type="button"
                        onClick={focusAuditForm}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#8ec5ff] hover:text-white"
                      >
                        Enter URL
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>

        {/* 3. HOW THE AUDIT WORKS (4 STEPS) */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Submission journey</p>
                <h2 className={`${HEADING} mt-2`}>How the audit works</h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                A live fetch of your homepage — not a placeholder score.
              </p>
            </div>

            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {AUDIT_STEPS.map((step) => (
                <li
                  key={step.n}
                  className="border-l-2 border-[#0f6dff] pl-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#0f6dff]">
                      {step.n}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Step {step.n}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-bold text-[#0b1528]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. WHAT WE CHECK (6 INSPECTION AREAS COVERING 7 CATEGORIES) */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Diagnostic scope</p>
                <h2 className={`${HEADING} mt-2`}>What we check</h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Seven categories. If a metric cannot be measured, we say so.
              </p>
            </div>

            <div className="mt-10 grid gap-x-9 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {AUDIT_CHECKS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border-t border-slate-300/80 py-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <h3 className="font-display text-[17.5px] font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. HOW TO READ THE RESULT & EXACT CATEGORY WEIGHTS */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className={EYEBROW}>Transparent scoring</p>
                <h2 className={`${HEADING} mt-2`}>How to read the result</h2>
                <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.72] text-slate-600">
                  The overall score is a weighted blend of Technical SEO (25%), On-Page SEO (20%), Performance (20%), Mobile (10%), Security (10%), Structured Data (5%) and AI Search Readiness (10%). Categories we cannot measure — such as Core Web Vitals when PageSpeed data is unavailable — are shown as Not enough data and excluded from the overall score. The overall score is generated from the audit data rather than hard-coded.
                </p>

                <ul className="mt-7 space-y-3 border-t border-slate-200 pt-6">
                  {RESULT_READING_POINTS.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[14.5px] leading-relaxed text-slate-600"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="rounded-2xl bg-[#0b1528] p-7 text-white sm:p-8">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                  Exact category weights
                </p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white">
                  Seven weighted audit categories
                </h3>

                <dl className="mt-5 divide-y divide-white/10 border-y border-white/10">
                  {CATEGORY_WEIGHTS.map((row) => (
                    <div
                      key={row.category}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <div>
                        <dt className="font-display text-[14.5px] font-bold text-white">
                          {row.category}
                        </dt>
                        <dd className="mt-0.5 text-[12.5px] text-slate-300">
                          {row.scope}
                        </dd>
                      </div>
                      <span className="shrink-0 font-display text-[14px] font-bold text-[#8ec5ff]">
                        {row.weight}
                      </span>
                    </div>
                  ))}
                </dl>

                <p className="mt-4 text-[12.5px] leading-relaxed text-slate-300">
                  Unavailable metrics are excluded from the weighted average instead of filled in with estimated numbers.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* 6. FAQs & CONTACT DETAILS */}
        <section className="bg-white py-12 sm:py-16">
          <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16`}>
            <div>
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`${HEADING} mt-2`}>Questions</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Prefer to talk it through?{" "}
                <Link
                  href="/contact"
                  className="font-bold text-[#0f6dff] hover:underline"
                >
                  Talk to Webamazee{" "}
                  <ArrowRight aria-hidden="true" className="inline h-4 w-4" />
                </Link>
              </p>

              <div className="mt-7 space-y-2.5 border-t border-slate-200 pt-6 text-[13.5px]">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Direct contact
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                >
                  <Mail aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="flex items-center gap-2 font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  {site.phone}
                </a>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Explore SEO services
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {HELPFUL_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-[#f7f9fc] px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-[#0f6dff]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const panelId = `free-audit-faq-panel-${idx}`;
                const buttonId = `free-audit-faq-trigger-${idx}`;

                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] sm:py-5"
                    >
                      <span className="font-display text-[16px] font-bold leading-snug text-[#0b1528]">
                        {faq.q}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-[#0f6dff] transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className={isOpen ? "block" : "hidden"}
                    >
                      <p className="max-w-2xl pb-5 text-[14.5px] leading-[1.7] text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. FINAL CONVERSION BAND */}
        <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-8 rounded-2xl bg-[#0b1528] p-7 text-white sm:p-11 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                  Free 30 minute Strategy Call
                </p>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">
                  Want a deeper SEO growth plan?
                </h2>
                <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-slate-300">
                  The free audit is an overview of one page. If you want a full technical, content and visibility review, we will map the next steps with you.
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {STRATEGY_CALL_HIGHLIGHTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[13.5px] font-medium text-slate-200"
                    >
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#8ec5ff]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className={PRIMARY_BTN}>
                  Talk to Webamazee
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
                <button
                  type="button"
                  onClick={focusAuditForm}
                  className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-center text-[14px] font-bold text-white transition-colors hover:bg-white/20"
                >
                  Run Free Audit
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
