"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  EyeOff,
  FileSearch,
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
import { SeoAuditProgress } from "@/components/seo-audit/seo-audit-progress";
import { SeoAuditResults } from "@/components/seo-audit/seo-audit-results";
import { useSeoAuditRun } from "@/components/seo-audit/use-seo-audit-run";
import { validateUrl } from "@/lib/seo-audit/validators";
import { site } from "@/lib/site";

export type AuditFaqItem = { q: string; a: string };

const CONTAINER = "mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8";
const EYEBROW =
  "text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]";

const HOW_IT_WORKS_THREE_STEPS = [
  {
    step: "01",
    label: "URL submission",
    title: "Enter your URL",
    desc: "Use example.com or a full https:// address. We normalise missing HTTPS.",
    meta: "Free · No credit card required",
  },
  {
    step: "02",
    label: "Live website analysis",
    title: "We fetch the homepage & calculate scores",
    desc: "The audit requests the live page, robots.txt and sitemap — with SSRF protections. Each category is scored from checks we could actually run. Nothing is randomised.",
    meta: "Real-time HTTP & signal inspection",
  },
  {
    step: "03",
    label: "Audit findings",
    title: "Inspect findings & request the full report",
    desc: "Review prioritised Critical, High priority and Opportunities alongside live technical details. If you want a deeper review, share your details after the overview.",
    meta: "Session-only · Never indexed",
  },
];

const CATEGORY_WEIGHTS = [
  {
    category: "Technical SEO",
    weight: "25%",
    scope: "HTTP status, HTTPS, canonical, robots.txt, sitemap, indexability",
  },
  {
    category: "On-Page SEO",
    weight: "20%",
    scope: "Title, meta description, H1/H2 structure, alt text, links",
  },
  {
    category: "Performance",
    weight: "20%",
    scope: "PageSpeed LCP, CLS, INP, FCP & TTFB when available",
  },
  {
    category: "Mobile",
    weight: "10%",
    scope: "Viewport, device-width & mobile readiness signals",
  },
  {
    category: "Security",
    weight: "10%",
    scope: "HTTPS, TLS validity, mixed content & transport headers",
  },
  {
    category: "Structured Data",
    weight: "5%",
    scope: "JSON-LD and Schema.org types detected on the page",
  },
  {
    category: "AI Search Readiness",
    weight: "10%",
    scope: "Entity, about/contact, crawlability & content-structure signals",
  },
];

const RESULT_READING_POINTS = [
  "Findings are grouped into Critical, High priority and Opportunities.",
  "Each issue explains why it matters and how to fix it, without ranking promises.",
  "We also list what is already working, so a healthy site is not forced into a problem list.",
  "AI Search Readiness is a signal score, not a claim that the site will appear in ChatGPT.",
];

const DELIVERABLES = [
  {
    num: "01",
    title: "Website Health Score & Category Breakdown",
    desc: "Overall score (/100) plus 7 category cards — showing Not enough data when a metric such as PageSpeed is unavailable.",
  },
  {
    num: "02",
    title: "Prioritised Findings (Critical, High Priority, Opportunities)",
    desc: "Only issues actually detected on the live homepage, paired with plain-English Why it matters and How to fix it guidance.",
  },
  {
    num: "03",
    title: "What's Already Working",
    desc: "Verified positive signals (such as HTTPS, HTTP 200 status, canonical, sitemap or viewport) so healthy foundations are recognised.",
  },
  {
    num: "04",
    title: "Expandable Technical Details & Optional Full Report",
    desc: "Inspect exact live fields (URL analyzed, HTTP status, canonical, robots.txt, sitemap, title, meta description, H1, word count, links, images, schema) and optionally request a deeper review.",
  },
];

const TRUST_PILLARS = [
  {
    icon: FileSearch,
    title: "Checks that ran — never invented numbers",
    desc: "Findings are generated solely from detectable signals on your live homepage. If an external metric cannot be measured, we show Not enough data rather than filling in a number.",
  },
  {
    icon: EyeOff,
    title: "Session-only privacy with SSRF protections",
    desc: "Individual audit results stay inside your current browser session, are never published as indexable URLs, and validate target hosts against private or local network access.",
  },
  {
    icon: ShieldCheck,
    title: "Actionable guidance without ranking promises",
    desc: "Every finding explains why it matters and how to fix it clearly — with no credit card required, no inflated problems and no claims about guaranteed rankings.",
  },
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
  const heroInputRef = useRef<HTMLInputElement>(null);
  const [bottomUrl, setBottomUrl] = useState("");
  const [bottomError, setBottomError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  async function submitFromHero(e: React.FormEvent) {
    e.preventDefault();
    setBottomError(null);
    const normalized = validateUrl(run.url);
    if (!normalized) {
      await run.analyze(run.url);
      return;
    }
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await run.analyze(run.url);
  }

  async function submitFromBottom(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = bottomUrl.trim();
    const normalized = validateUrl(trimmed);
    if (!normalized) {
      setBottomError("Please enter a valid website URL.");
      return;
    }
    setBottomError(null);
    run.setUrl(trimmed);
    workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await run.analyze(trimmed);
  }

  function resetToHero() {
    run.reset();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => heroInputRef.current?.focus(), 250);
  }

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. CENTERED EDITORIAL HERO + PROMINENT AUDIT URL BAR */}
        <section className="border-b border-slate-200 bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
              <ol className="flex flex-wrap items-center justify-center gap-2 text-[12px] font-medium text-slate-500">
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

            <div className="mx-auto max-w-[740px] text-center">
              <p className={EYEBROW}>Free Website Audit</p>

              <h1 className="mt-4 font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.035em] text-[#0b1528] sm:text-[3.25rem] lg:text-[3.7rem]">
                How healthy is{" "}
                <span className="whitespace-nowrap text-[#0f6dff]">your website?</span>
              </h1>

              <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-[1.6] text-slate-600 sm:text-[17.5px]">
                Get a free website and SEO audit to uncover technical issues, SEO opportunities, performance problems, and areas that may be limiting your growth.
              </p>

              {/* Prominent Single-Row Command Bar */}
              <form
                onSubmit={submitFromHero}
                className="mx-auto mt-8 max-w-[660px]"
              >
                <div className="rounded-xl border border-slate-300 bg-white p-1.5 shadow-[0_1px_2px_rgba(11,21,40,0.05),0_10px_28px_-14px_rgba(11,21,40,0.14)] transition-colors focus-within:border-[#0f6dff] focus-within:ring-4 focus-within:ring-[#0f6dff]/10">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <label htmlFor="audit-url" className="sr-only">
                      Website URL
                    </label>
                    <div className="relative flex-1">
                      <Globe2
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="audit-url"
                        ref={heroInputRef}
                        value={run.url}
                        onChange={(e) => run.setUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        inputMode="url"
                        autoComplete="url"
                        className="h-12 w-full rounded-lg bg-transparent pl-10 pr-3 text-[15px] text-[#0b1528] outline-none placeholder:text-slate-400 sm:text-[15.5px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={run.step === "progress"}
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>
                        {run.step === "progress"
                          ? "Analyzing..."
                          : "Get My Free SEO Audit"}
                      </span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </button>
                  </div>
                </div>

                <p
                  role={run.urlError ? "alert" : undefined}
                  className={
                    "mt-3 text-[12.5px] font-medium " +
                    (run.urlError ? "text-rose-600" : "text-slate-500")
                  }
                >
                  {run.urlError || "Free • No credit card required"}
                </p>

                {run.apiError && (
                  <p
                    role="alert"
                    className="mx-auto mt-3 max-w-lg rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-[13.5px] font-medium text-rose-700"
                  >
                    {run.apiError}
                  </p>
                )}
              </form>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-slate-500">
                <span>Live homepage fetch</span>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
                  ·
                </span>
                <span>Seven weighted categories</span>
                <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
                  ·
                </span>
                <span>Session-only, never indexed</span>
              </div>
            </div>
          </div>
        </section>

        {/* LIVE AUDIT PROGRESS & RESULTS WORKSPACE */}
        <section
          id="audit-workspace"
          ref={workspaceRef}
          aria-live="polite"
          className={
            run.step === "form"
              ? "sr-only"
              : "scroll-mt-24 border-b border-slate-200 bg-white py-10 sm:py-14"
          }
        >
          {run.step !== "form" && (
            <div className={CONTAINER}>
              {run.step === "progress" && (
                <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white shadow-sm">
                  <SeoAuditProgress url={run.url} activeIndex={run.progressStep} />
                </div>
              )}

              {run.step === "result" && run.result && (
                <div className="mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
                  <SeoAuditResults result={run.result} />
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <button
                      type="button"
                      onClick={resetToHero}
                      className="text-sm font-bold text-[#0f6dff] hover:underline"
                    >
                      Analyze another website
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 2. UNIFIED HAIRLINE BENTO DIAGNOSTIC GRID (WHAT WE CHECK) */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
              <div>
                <p className={EYEBROW}>Diagnostic scope</p>
                <h2 className={`${HEADING} mt-2`}>What we check</h2>
              </div>
              <p className="max-w-md text-[15px] text-slate-600 md:text-right">
                Seven categories. If a metric cannot be measured, we say so.
              </p>
            </div>

            {/* Unified Hairline Bento Matrix: 4+2, 2+2+2, 6 */}
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-6">
              {/* Cell 1 (4 cols): Technical SEO */}
              <article className="flex flex-col justify-between bg-[#f8fbff] p-7 transition-colors hover:bg-white md:col-span-4 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-[#0f6dff]">
                      <Workflow aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
                        Primary foundation
                      </span>
                    </div>
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-500">
                      25% weight
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[1.45rem] font-bold tracking-[-0.02em] text-[#0b1528]">
                    Technical SEO
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
                    HTTP status, HTTPS, redirects, canonicals, robots.txt, sitemaps and indexability signals.
                  </p>
                </div>

                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-5 text-[12.5px] sm:grid-cols-4">
                  <div>
                    <dt className="font-semibold text-[#0b1528]">Response</dt>
                    <dd className="mt-0.5 text-slate-500">Status &amp; redirects</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0b1528]">Transport</dt>
                    <dd className="mt-0.5 text-slate-500">HTTPS &amp; canonical</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0b1528]">Crawl files</dt>
                    <dd className="mt-0.5 text-slate-500">robots.txt &amp; sitemap</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#0b1528]">Directives</dt>
                    <dd className="mt-0.5 text-slate-500">Noindex &amp; lang tag</dd>
                  </div>
                </dl>
              </article>

              {/* Cell 2 (2 cols): On-page SEO */}
              <article className="flex flex-col justify-between bg-white p-7 transition-colors hover:bg-slate-50/60 md:col-span-2 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <SearchCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-500">
                      20% weight
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#0b1528]">
                    On-page SEO
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    Title, meta description, headings, content length, images, alt text and internal links.
                  </p>
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] text-slate-500">
                  Evaluates H1/H2 hierarchy &amp; Open Graph tags
                </p>
              </article>

              {/* Cell 3 (2 cols): Performance */}
              <article className="flex flex-col justify-between bg-white p-7 transition-colors hover:bg-slate-50/60 md:col-span-2 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <Gauge aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-500">
                      20% weight
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#0b1528]">
                    Performance
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    PageSpeed metrics where available — LCP, CLS, INP, FCP and TTFB. Otherwise we say so.
                  </p>
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] text-slate-500">
                  Mobile PageSpeed Insights when configured
                </p>
              </article>

              {/* Cell 4 (2 cols): Mobile & security */}
              <article className="flex flex-col justify-between bg-white p-7 transition-colors hover:bg-slate-50/60 md:col-span-2 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <Smartphone aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-500">
                      10% + 10% weight
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#0b1528]">
                    Mobile &amp; security
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    Viewport and responsive signals, HTTPS, mixed content and basic transport security headers.
                  </p>
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] text-slate-500">
                  Mobile (10%) &amp; Security (10%) categories
                </p>
              </article>

              {/* Cell 5 (2 cols): Structured data */}
              <article className="flex flex-col justify-between bg-white p-7 transition-colors hover:bg-slate-50/60 md:col-span-2 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-500">
                      5% weight
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.25rem] font-bold tracking-[-0.015em] text-[#0b1528]">
                    Structured data
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    JSON-LD and Schema.org types such as Organization, LocalBusiness, Product, Article, FAQ and breadcrumbs.
                  </p>
                </div>
                <p className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] text-slate-500">
                  Detects declared Schema.org entity types
                </p>
              </article>

              {/* Cell 6 (6 cols): AI Search Readiness Anchor Row */}
              <article className="grid items-center gap-6 bg-[#0b1528] p-7 text-white md:col-span-6 lg:grid-cols-[1.15fr_0.85fr] sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4 sm:justify-start">
                    <div className="flex items-center gap-2 text-[#8ec5ff]">
                      <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
                        Modern search signals
                      </span>
                    </div>
                    <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-400">
                      10% weight
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-white">
                    AI Search Readiness
                  </h3>
                  <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-slate-300">
                    Entity, about/contact, crawlability and content-structure signals that can support modern search experiences.
                  </p>
                </div>

                <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-white/15 pt-5 text-[13px] text-slate-200 sm:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  {[
                    "Organization & LocalBusiness schema",
                    "Visible About & Contact signals",
                    "H1/H2 hierarchy & FAQ presence",
                    "Indexable crawlability signals",
                  ].map((signal) => (
                    <li key={signal} className="flex items-start gap-2">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8ec5ff]"
                      />
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (CLEAN 3-STEP HORIZONTAL PROCESS) */}
        <section className="border-y border-slate-200 bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-xl">
              <p className={EYEBROW}>Workflow</p>
              <h2 className={`${HEADING} mt-2`}>How the audit works</h2>
              <p className="mt-2.5 text-[15.5px] text-slate-600">
                A live fetch of your homepage — not a placeholder score.
              </p>
            </div>

            <ol className="mt-10 grid divide-y divide-slate-200 border-y border-slate-200 bg-white lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {HOW_IT_WORKS_THREE_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="flex flex-col justify-between p-7 sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <span className="font-mono text-[13px] font-bold text-[#0f6dff]">
                        {item.step}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.2rem] font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>

                  <p className="mt-6 text-[12.5px] font-medium text-slate-500">
                    {item.meta}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. WHAT YOU GET & WEIGHTED SCORING LEDGER */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className={EYEBROW}>What you get</p>
                <h2 className={`${HEADING} mt-2`}>How to read the result</h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  The overall score is a weighted blend of Technical SEO (25%), On-Page SEO (20%), Performance (20%), Mobile (10%), Security (10%), Structured Data (5%) and AI Search Readiness (10%). Categories we cannot measure — such as Core Web Vitals when PageSpeed data is unavailable — are shown as Not enough data and excluded from the overall score. The overall score is generated from the audit data rather than hard-coded.
                </p>

                <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                  {DELIVERABLES.map((item) => (
                    <div
                      key={item.num}
                      className="grid grid-cols-[32px_1fr] gap-4 py-5"
                    >
                      <span className="font-mono text-[12.5px] font-bold text-[#0f6dff]">
                        {item.num}
                      </span>
                      <div>
                        <h3 className="font-display text-[16px] font-bold text-[#0b1528]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[14px] leading-relaxed text-slate-600">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Scoring Model Ledger */}
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 bg-[#f8fafc] px-6 py-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b1528]">
                    Scoring model weights
                  </span>
                  <span className="font-mono text-[11.5px] font-semibold text-[#0f6dff]">
                    100% total
                  </span>
                </div>

                <dl className="divide-y divide-slate-100 px-6">
                  {CATEGORY_WEIGHTS.map((row) => (
                    <div
                      key={row.category}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <div>
                        <dt className="font-display text-[14px] font-bold text-[#0b1528]">
                          {row.category}
                        </dt>
                        <dd className="mt-0.5 text-[12.5px] text-slate-500">
                          {row.scope}
                        </dd>
                      </div>
                      <span className="shrink-0 font-mono text-[13.5px] font-bold tabular-nums text-[#0b1528]">
                        {row.weight}
                      </span>
                    </div>
                  ))}
                </dl>

                <div className="border-t border-slate-200 bg-[#f8fafc] px-6 py-5">
                  <ul className="space-y-2.5">
                    {RESULT_READING_POINTS.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600"
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
              </div>
            </div>
          </div>
        </section>

        {/* 5. TRUST SECTION (GROUNDED RULED COLUMNS + DIRECT CONTACT) */}
        <section className="border-y border-slate-200 bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className={EYEBROW}>Methodology &amp; trust</p>
                <h2 className={`${HEADING} mt-2`}>
                  Built on detectable signals, never guesswork
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] text-slate-600 md:text-right">
                No fabricated SEO scores, no invented problems to force a sales pitch and no ranking guarantees.
              </p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {TRUST_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="border-t border-slate-300 pt-5"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#0f6dff]"
                      />
                      <h3 className="font-display text-[16.5px] font-bold text-[#0b1528]">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quiet Utility Bar for Direct Contact & Related Links */}
            <div className="mt-10 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-[13.5px] lg:flex-row lg:items-center">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-slate-500">Prefer to talk it through?</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-bold text-[#0f6dff] hover:underline"
                >
                  Talk to Webamazee
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 font-medium text-[#0b1528] hover:text-[#0f6dff]"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-1.5 font-medium text-[#0b1528] hover:text-[#0f6dff]"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
                  {site.phone}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {HELPFUL_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="inline-flex items-center gap-1 font-medium text-slate-600 transition-colors hover:text-[#0f6dff]"
                  >
                    {l.label}
                    <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQs (CLEAN EDITORIAL ACCORDION) */}
        <section className="bg-white py-16 sm:py-20">
          <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16`}>
            <div>
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`${HEADING} mt-2`}>Questions</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Clear answers about what the live homepage check inspects, how scores are calculated and how session privacy works.
              </p>
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
                        className={`h-4 w-4 shrink-0 text-[#0f6dff] transition-transform duration-200 ${
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

        {/* 7. FINAL CTA: PROMINENT WEBSITE URL SUBMISSION SECTION */}
        <section className="border-t border-slate-200 bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ec5ff]">
                Free 30 minute Strategy Call
              </p>
              <h2 className="mt-3 font-display text-[1.95rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.5rem]">
                Want a deeper SEO growth plan?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-300">
                The free audit is an overview of one page. If you want a full technical, content and visibility review, we will map the next steps with you.
              </p>

              {/* Prominent Bottom URL Submission Form */}
              <form onSubmit={submitFromBottom} className="mt-8">
                <div className="rounded-xl border border-white/15 bg-white p-1.5">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
                    <label htmlFor="audit-url-bottom" className="sr-only">
                      Website URL
                    </label>
                    <div className="relative flex-1">
                      <Globe2
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        id="audit-url-bottom"
                        value={bottomUrl}
                        onChange={(e) => {
                          setBottomUrl(e.target.value);
                          if (bottomError) setBottomError(null);
                        }}
                        placeholder="https://yourwebsite.com"
                        inputMode="url"
                        autoComplete="url"
                        className="h-12 w-full rounded-lg bg-transparent pl-10 pr-3 text-[15px] text-[#0b1528] outline-none placeholder:text-slate-400 sm:text-[15.5px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={run.step === "progress"}
                      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span>Get My Free SEO Audit</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                    </button>
                  </div>
                </div>

                {bottomError && (
                  <p
                    role="alert"
                    className="mt-3 text-[13px] font-semibold text-rose-300"
                  >
                    {bottomError}
                  </p>
                )}

                <p className="mt-3 text-[12.5px] text-slate-400">
                  Free · No credit card required
                </p>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[13px]">
                {STRATEGY_CALL_HIGHLIGHTS.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-[#8ec5ff]"
                    />
                    {item}
                  </span>
                ))}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-bold text-[#8ec5ff] hover:text-white hover:underline"
                >
                  Talk to Webamazee
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
