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
  Lock,
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

const CONTAINER = "mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8";
const EYEBROW =
  "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#0b1528] sm:text-[2.4rem]";

const HOW_IT_WORKS_THREE_STEPS = [
  {
    step: "01",
    label: "URL Submission",
    title: "Enter your URL",
    desc: "Use example.com or a full https:// address. We normalise missing HTTPS.",
    note: "Free • No credit card required",
  },
  {
    step: "02",
    label: "Live Website Analysis",
    title: "We fetch the homepage & calculate scores",
    desc: "The audit requests the live page, robots.txt and sitemap — with SSRF protections. Each category is scored from checks we could actually run. Nothing is randomised.",
    note: "Real-time HTTP, metadata & signal checks",
  },
  {
    step: "03",
    label: "Receive Findings",
    title: "Inspect findings & request the full report",
    desc: "Review prioritised Critical, High priority and Opportunities alongside live technical details. If you want a deeper review, share your details after the overview.",
    note: "Session-only — never indexed",
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
    title: "Website Health Score & 7 Category Cards",
    desc: "See an overall weighted score (/100) alongside individual category scores — or Not enough data when a metric like PageSpeed is unavailable.",
  },
  {
    num: "02",
    title: "Prioritised Findings (Why It Matters & How to Fix)",
    desc: "Actionable findings grouped strictly from detected issues into Critical, High priority and Opportunities, without inflated problems.",
  },
  {
    num: "03",
    title: "What's Already Working",
    desc: "Positive checks detected on your page (such as HTTPS, HTTP 200 status, canonical, sitemap or viewport) so healthy signals are recognised.",
  },
  {
    num: "04",
    title: "Expandable Technical Details & Optional Full Report",
    desc: "Inspect raw live measurements (URL analyzed, HTTP status, canonical, robots.txt, sitemap, title, meta description, H1, word count, links, images, schema) and optionally request a deeper review.",
  },
];

const TRUST_PILLARS = [
  {
    icon: FileSearch,
    title: "Checks that ran — never invented numbers",
    desc: "Findings are generated solely from detectable signals on your live homepage. When an external metric cannot be measured, we display Not enough data rather than guessing.",
  },
  {
    icon: EyeOff,
    title: "Session-only privacy with SSRF protections",
    desc: "Individual audit results live only in your current browser session, are never published as indexable URLs, and validate target hosts against private or local network access.",
  },
  {
    icon: ShieldCheck,
    title: "Clear findings without ranking guarantees",
    desc: "Every issue explains why it matters and how to address it in plain language — with no credit card required, no sales-pitch inflation and no promises of Google rankings.",
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
        {/* 1. CENTERED HERO WITH PROMINENT URL INPUT ABOVE THE FOLD */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f2f7ff] via-[#f7faff] to-white py-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[#0f6dff]/[0.07] blur-3xl"
          />

          <div className={`${CONTAINER} relative`}>
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

            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dce6f4] bg-white px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#0f6dff] shadow-[0_2px_10px_-4px_rgba(15,109,255,0.16)]">
                Free Website Audit
              </span>

              <h1 className="mt-5 font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#0b1528] sm:text-[3.35rem] lg:text-[3.85rem]">
                How healthy is{" "}
                <span className="text-[#0f6dff]">your website?</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-[1.65] text-slate-600 sm:text-[18px]">
                Get a free website and SEO audit to uncover technical issues, SEO opportunities, performance problems, and areas that may be limiting your growth.
              </p>

              {/* Main Focal Point: Centered Prominent URL Command Bar */}
              <form
                onSubmit={submitFromHero}
                className="mx-auto mt-8 max-w-2xl"
              >
                <div className="rounded-2xl border border-[#cfdcf0] bg-white p-2 shadow-[0_20px_50px_-24px_rgba(11,21,40,0.22)] transition-shadow focus-within:border-[#0f6dff] focus-within:ring-4 focus-within:ring-[#0f6dff]/10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
                        className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 text-[15px] text-[#0b1528] outline-none placeholder:text-slate-400 sm:text-[16px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={run.step === "progress"}
                      className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <SearchCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
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
                  role="alert"
                  className={
                    "mt-3 text-[13px] font-medium " +
                    (run.urlError ? "text-rose-600" : "text-slate-500")
                  }
                >
                  {run.urlError || "Free • No credit card required"}
                </p>

                {run.apiError && (
                  <p
                    role="alert"
                    className="mx-auto mt-3 max-w-xl rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-[13.5px] font-medium text-rose-700"
                  >
                    {run.apiError}
                  </p>
                )}
              </form>

              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[13px] font-semibold text-[#0b1528]">
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  Live homepage fetch
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  Seven weighted categories
                </li>
                <li className="flex items-center gap-2">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  Results never indexed
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* LIVE AUDIT PROGRESS & RESULTS WORKSPACE (EXPANDS WHEN AUDIT RUNS) */}
        <section
          id="audit-workspace"
          ref={workspaceRef}
          aria-live="polite"
          className={
            run.step === "form"
              ? "sr-only"
              : "scroll-mt-24 border-b border-slate-200 bg-[#f7f9fc] py-10 sm:py-14"
          }
        >
          {run.step !== "form" && (
            <div className={CONTAINER}>
              {run.step === "progress" && (
                <div className="mx-auto max-w-4xl rounded-3xl border border-[#dce6f4] bg-white shadow-[0_18px_44px_-28px_rgba(11,21,40,0.16)]">
                  <SeoAuditProgress url={run.url} activeIndex={run.progressStep} />
                </div>
              )}

              {run.step === "result" && run.result && (
                <div className="mx-auto max-w-5xl rounded-3xl border border-[#dce6f4] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(11,21,40,0.16)] sm:p-10">
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

        {/* 2. BENTO DIAGNOSTIC GRID (WHAT WE CHECK) */}
        <section className="bg-white py-14 sm:py-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Diagnostic scope</p>
              <h2 className={`${HEADING} mt-2`}>What we check</h2>
              <p className="mt-3 text-[16px] text-slate-600">
                Seven categories. If a metric cannot be measured, we say so.
              </p>
            </div>

            {/* Asymmetric 6-column Bento Grid: 4+2, 2+2+2, 6 */}
            <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-6">
              {/* Featured Wide Card 1: Technical SEO (4 cols) */}
              <article className="flex flex-col justify-between rounded-3xl border border-[#d6e4fa] bg-gradient-to-br from-[#f4f8ff] to-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 md:col-span-4">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0f6dff] text-white">
                      <Workflow aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-[#dce6f4] bg-white px-3 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                      25% weight
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.45rem] font-bold text-[#0b1528]">
                    Technical SEO
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate-600">
                    HTTP status, HTTPS, redirects, canonicals, robots.txt, sitemaps and indexability signals.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5">
                  {[
                    "HTTP status & redirects",
                    "HTTPS & canonical tag",
                    "robots.txt & XML sitemap",
                    "Noindex & lang attribute",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[12px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              {/* Card 2: On-page SEO (2 cols) */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 md:col-span-2">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef4ff] text-[#0f6dff]">
                      <SearchCheck aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                      20% weight
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.3rem] font-bold text-[#0b1528]">
                    On-page SEO
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    Title, meta description, headings, content length, images, alt text and internal links.
                  </p>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-3.5 text-[12.5px] font-medium text-slate-500">
                  Checks H1/H2 outline, image alt coverage &amp; Open Graph
                </p>
              </article>

              {/* Card 3: Performance (2 cols) */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 md:col-span-2">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef4ff] text-[#0f6dff]">
                      <Gauge aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                      20% weight
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.3rem] font-bold text-[#0b1528]">
                    Performance
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    PageSpeed metrics where available — LCP, CLS, INP, FCP and TTFB. Otherwise we say so.
                  </p>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-3.5 text-[12.5px] font-medium text-slate-500">
                  Uses PageSpeed Insights when configured
                </p>
              </article>

              {/* Card 4: Mobile & security (2 cols) */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 md:col-span-2">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef4ff] text-[#0f6dff]">
                      <Smartphone aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                      10% + 10%
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.3rem] font-bold text-[#0b1528]">
                    Mobile &amp; security
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    Viewport and responsive signals, HTTPS, mixed content and basic transport security headers.
                  </p>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-3.5 text-[12.5px] font-medium text-slate-500">
                  Covers Mobile (10%) &amp; Security (10%) categories
                </p>
              </article>

              {/* Card 5: Structured data (2 cols) */}
              <article className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0f6dff]/35 md:col-span-2">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef4ff] text-[#0f6dff]">
                      <ShieldCheck aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-[#f4f8ff] px-3 py-1 text-[11.5px] font-bold text-[#0f6dff]">
                      5% weight
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.3rem] font-bold text-[#0b1528]">
                    Structured data
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    JSON-LD and Schema.org types such as Organization, LocalBusiness, Product, Article, FAQ and breadcrumbs.
                  </p>
                </div>
                <p className="mt-5 border-t border-slate-100 pt-3.5 text-[12.5px] font-medium text-slate-500">
                  Lists detected Schema.org types directly
                </p>
              </article>

              {/* Wide Anchor Card 6: AI Search Readiness (6 cols) */}
              <article className="grid items-center gap-6 rounded-3xl bg-[#0b1528] p-7 text-white shadow-[0_20px_50px_-28px_rgba(11,21,40,0.45)] sm:p-8 md:col-span-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#0f6dff] text-white">
                      <Sparkles aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-bold text-[#8ec5ff]">
                      10% weight
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-[1.45rem] font-bold text-white">
                    AI Search Readiness
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-300">
                    Entity, about/contact, crawlability and content-structure signals that can support modern search experiences.
                  </p>
                </div>

                <div className="grid gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2">
                  {[
                    "Organization & LocalBusiness schema",
                    "Visible About & Contact signals",
                    "H1/H2 hierarchy & FAQ presence",
                    "Indexable crawlability signals",
                  ].map((signal) => (
                    <div
                      key={signal}
                      className="flex items-start gap-2 text-[13px] text-slate-200"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#8ec5ff]"
                      />
                      <span>{signal}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (CLEAN 3-STEP VISUAL PROCESS) */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Simple workflow</p>
              <h2 className={`${HEADING} mt-2`}>How the audit works</h2>
              <p className="mt-3 text-[16px] text-slate-600">
                A live fetch of your homepage — not a placeholder score.
              </p>
            </div>

            <ol className="relative mt-12 grid gap-6 lg:grid-cols-3">
              {HOW_IT_WORKS_THREE_STEPS.map((item) => (
                <li
                  key={item.step}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.16)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] font-display text-sm font-bold text-[#0f6dff]">
                        {item.step}
                      </span>
                      <span className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.25rem] font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>

                  <p className="mt-6 border-t border-slate-100 pt-4 text-[12.5px] font-semibold text-[#0f6dff]">
                    {item.note}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. WHAT YOU GET (DELIVERABLES & HOW TO READ THE RESULT) */}
        <section className="bg-white py-14 sm:py-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-3xl text-center">
              <p className={EYEBROW}>What you get</p>
              <h2 className={`${HEADING} mt-2`}>How to read the result</h2>
              <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-600">
                The overall score is a weighted blend of Technical SEO (25%), On-Page SEO (20%), Performance (20%), Mobile (10%), Security (10%), Structured Data (5%) and AI Search Readiness (10%). Categories we cannot measure — such as Core Web Vitals when PageSpeed data is unavailable — are shown as Not enough data and excluded from the overall score. The overall score is generated from the audit data rather than hard-coded.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
              {/* Left: Editorial Deliverables */}
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {DELIVERABLES.map((item) => (
                  <div
                    key={item.num}
                    className="grid grid-cols-[36px_1fr] gap-4 py-6"
                  >
                    <span className="font-display text-sm font-bold text-[#0f6dff]">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-display text-[17.5px] font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Category Weight Breakdown + Exact Guidance */}
              <div className="rounded-3xl border border-slate-200/90 bg-[#f7f9fc] p-6 sm:p-8">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
                  Weighted scoring breakdown
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-[#0b1528]">
                  Seven categories summed dynamically
                </h3>

                <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200 bg-white px-4 rounded-2xl">
                  {CATEGORY_WEIGHTS.map((row) => (
                    <div
                      key={row.category}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <div>
                        <dt className="font-display text-[14px] font-bold text-[#0b1528]">
                          {row.category}
                        </dt>
                        <dd className="text-[12px] text-slate-500">
                          {row.scope}
                        </dd>
                      </div>
                      <span className="shrink-0 font-display text-[13.5px] font-bold text-[#0f6dff]">
                        {row.weight}
                      </span>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 space-y-3">
                  {RESULT_READING_POINTS.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-600"
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
        </section>

        {/* 5. TRUST SECTION (GROUNDED VALUE WITHOUT INVENTED CLAIMS) */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-20">
          <div className={CONTAINER}>
            <div className="mx-auto max-w-2xl text-center">
              <p className={EYEBROW}>Built on transparency</p>
              <h2 className={`${HEADING} mt-2`}>
                An honest website check you can verify yourself
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
                No fabricated SEO scores, no invented problems to force a sales pitch and no ranking guarantees.
              </p>
            </div>

            <div className="mt-11 grid gap-6 md:grid-cols-3">
              {TRUST_PILLARS.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-[0_10px_30px_-24px_rgba(11,21,40,0.14)]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#eef4ff] text-[#0f6dff]">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.15rem] font-bold text-[#0b1528]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Grounded Contact & Related Services Bar */}
            <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
                <span className="font-semibold text-slate-500">
                  Prefer to talk it through?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 font-bold text-[#0f6dff] hover:underline"
                >
                  Talk to Webamazee
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0b1528] hover:text-[#0f6dff]"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#0b1528] hover:text-[#0f6dff]"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                  {site.phone}
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
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
        </section>

        {/* 6. FAQs (CLEAN CENTERED ACCORDION) */}
        <section className="bg-white py-14 sm:py-20">
          <div className={`${CONTAINER} max-w-3xl`}>
            <div className="text-center">
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`${HEADING} mt-2`}>Questions</h2>
              <p className="mt-3 text-[15px] text-slate-600">
                Everything you need to know about what the free SEO audit inspects and how scores work.
              </p>
            </div>

            <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
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
                      <p className="pb-5 text-[14.5px] leading-[1.7] text-slate-600">
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
        <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-20">
          <div className={CONTAINER}>
            <div className="rounded-[2rem] bg-[#0b1528] p-7 text-center text-white shadow-[0_24px_60px_-28px_rgba(11,21,40,0.45)] sm:p-12 lg:p-14">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                Free 30 minute Strategy Call
              </p>
              <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">
                Want a deeper SEO growth plan?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-slate-300">
                The free audit is an overview of one page. If you want a full technical, content and visibility review, we will map the next steps with you.
              </p>

              {/* Prominent Bottom URL Submission Form */}
              <form
                onSubmit={submitFromBottom}
                className="mx-auto mt-8 max-w-2xl"
              >
                <div className="rounded-2xl border border-white/15 bg-white p-2 shadow-lg">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
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
                        className="h-12 w-full rounded-xl bg-transparent pl-10 pr-3 text-[15px] text-[#0b1528] outline-none placeholder:text-slate-400 sm:text-[16px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={run.step === "progress"}
                      className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <SearchCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
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

                <p className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] text-slate-300">
                  <Lock aria-hidden="true" className="h-3.5 w-3.5 text-[#8ec5ff]" />
                  Free · No credit card required
                </p>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-white/10 pt-7">
                {STRATEGY_CALL_HIGHLIGHTS.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[13.5px] font-medium text-slate-200"
                  >
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#8ec5ff]"
                    />
                    {item}
                  </span>
                ))}

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#8ec5ff] hover:text-white hover:underline"
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
