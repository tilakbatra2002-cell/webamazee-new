"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronRight,
  Copy,
  FileSearch,
  FileWarning,
  FolderTree,
  Globe2,
  Layers,
  Link2,
  MessageCircleQuestion,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Swords,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { Industry } from "@/lib/industries";

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.35rem]";

const challengeIcons = [
  Layers,
  Copy,
  SlidersHorizontal,
  AlertTriangle,
  FileWarning,
  Swords,
];

const strategyIcons = [
  ShoppingBag,
  FolderTree,
  Zap,
  Link2,
  FileSearch,
  Sparkles,
];

const growthIcons = [
  Search,
  Layers,
  FileSearch,
  TrendingUp,
  Copy,
  BarChart3,
];

const whyIcons = [Bot, BarChart3, ShieldCheck, Target, FileSearch, Globe2];

const whyMattersBadges = [
  "Search visibility",
  "Qualified traffic",
  "Conversion focus",
  "Sustainable growth",
];

const contextualLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const strategyCallHighlights = [
  "Free personalised roadmap",
  "Personal follow-up from our team",
  "No lock in",
];

function StorefrontArchitectureDiagram() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white/95 p-5 shadow-[0_24px_60px_-28px_rgba(11,21,40,0.2)] backdrop-blur-sm sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f6dff] via-[#4a93ff] to-[#0f6dff]"
      />

      {/* Top chrome bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#0f6dff]/50" />
          <span className="ml-2 text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-500">
            Ecommerce Search Architecture
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f8ff] px-2.5 py-1 text-[11px] font-semibold text-[#0f6dff]">
          <Search className="h-3 w-3" aria-hidden="true" />
          Organic Intent
        </span>
      </div>

      {/* Connected SVG + Architecture Nodes */}
      <div className="mt-5 space-y-3">
        {/* Node 1: Category Pages */}
        <div className="rounded-2xl border border-[#0f6dff]/20 bg-[#f4f8ff] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#0f6dff] text-white">
                <FolderTree className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[14px] font-bold text-[#0b1528]">
                  Category page optimization
                </p>
                <p className="text-[12px] text-slate-600">
                  Broad commercial terms &amp; buying intent
                </p>
              </div>
            </div>
            <span className="rounded-md bg-white px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#0f6dff] shadow-xs">
              Tier 01
            </span>
          </div>
        </div>

        {/* SVG downward flow connector */}
        <div className="flex justify-center" aria-hidden="true">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none">
            <path
              d="M12 0V18M12 18L7 13M12 18L17 13"
              stroke="#0f6dff"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.55"
            />
          </svg>
        </div>

        {/* Node 2: Product Pages */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#0b1528] text-white">
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-[14px] font-bold text-[#0b1528]">
                  Product page SEO &amp; structured data
                </p>
                <p className="text-[12px] text-slate-600">
                  Titles, unique descriptions, price, availability &amp; reviews
                </p>
              </div>
            </div>
            <span className="rounded-md bg-[#f7f9fc] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-600">
              Tier 02
            </span>
          </div>
        </div>

        {/* SVG split connector */}
        <div className="flex justify-center" aria-hidden="true">
          <svg width="160" height="20" viewBox="0 0 160 20" fill="none">
            <path
              d="M80 0V8M80 8H28V19M80 8H132V19"
              stroke="#94a3b8"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
          </svg>
        </div>

        {/* Bottom foundations row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200/90 bg-[#f7f9fc] p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
              Technical Health
            </p>
            <p className="mt-1 text-[12px] font-medium text-slate-700">
              Clean indexation, speed &amp; internal linking
            </p>
          </div>
          <div className="rounded-xl border border-slate-200/90 bg-[#f7f9fc] p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
              Commercial Content
            </p>
            <p className="mt-1 text-[12px] font-medium text-slate-700">
              Buying guides &amp; product comparisons
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntentAcquisitionVisual() {
  const stages = [
    {
      step: "01",
      title: "Commercial search intent",
      desc: "Shoppers actively searching for products and categories you sell.",
    },
    {
      step: "02",
      title: "Product & category optimization",
      desc: "Structured pages, clean indexation, schema and helpful copy.",
    },
    {
      step: "03",
      title: "Compounding organic revenue",
      desc: "Long term store authority across growing product catalogs.",
    },
  ];

  return (
    <div className="relative rounded-3xl border border-slate-200/90 bg-[#f7f9fc] p-6 sm:p-7">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
          Organic Store Journey
        </p>
        <ShoppingBag className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
      </div>

      <div className="relative mt-6 space-y-4">
        <div
          aria-hidden="true"
          className="absolute bottom-7 left-[19px] top-7 w-[1.5px] bg-gradient-to-b from-[#0f6dff] via-[#0f6dff]/50 to-slate-300"
        />
        {stages.map((stage) => (
          <div
            key={stage.step}
            className="relative flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(11,21,40,0.16)]"
          >
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0b1528] font-display text-xs font-bold text-white">
              {stage.step}
            </span>
            <div>
              <h3 className="font-display text-[14.5px] font-bold text-[#0b1528]">
                {stage.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                {stage.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyMattersVisual() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#1a2c4e] bg-[#0b1528] p-6 text-white shadow-[0_24px_60px_-28px_rgba(11,21,40,0.45)] sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#0f6dff]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0f6dff] to-transparent"
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8ec5ff]">
            Ecommerce Growth Foundations
          </span>
          <Globe2 className="h-4 w-4 text-[#8ec5ff]" aria-hidden="true" />
        </div>

        {/* Central technical health anchor */}
        <div className="mt-5 rounded-2xl border border-[#0f6dff]/40 bg-[#0f6dff]/15 p-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8ec5ff]">
            Core Foundation
          </p>
          <p className="mt-1 font-display text-[16px] font-bold text-white">
            Technical Health &amp; Internal Linking
          </p>
          <p className="mt-1 text-[12.5px] text-slate-300">
            Fast pages, clean indexation &amp; clear catalog structure
          </p>
        </div>

        {/* SVG connector lines */}
        <div className="flex justify-center" aria-hidden="true">
          <svg width="240" height="24" viewBox="0 0 240 24" fill="none">
            <path
              d="M120 0V12M120 12H54V24M120 12H186V24"
              stroke="#8ec5ff"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* 4 outcome pillars */}
        <div className="grid grid-cols-2 gap-3">
          {whyMattersBadges.map((badge, idx) => (
            <div
              key={badge}
              className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5"
            >
              <span className="text-[10.5px] font-bold text-[#8ec5ff]">
                0{idx + 1}
              </span>
              <p className="mt-1 flex items-center gap-1.5 font-display text-[13.5px] font-bold text-white">
                <BadgeCheck
                  className="h-4 w-4 shrink-0 text-[#0f6dff]"
                  aria-hidden="true"
                />
                {badge}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemandSpectrumVisual() {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_12px_34px_-24px_rgba(11,21,40,0.16)] sm:p-6">
      <div className="grid items-center gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
            Demand Coverage Model
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold text-[#0b1528]">
            Capture searches from product discovery to purchase
          </h3>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
            Combine broad category authority, specific long tail product searches and commercial buying guides across seasons.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200/80 bg-[#f7f9fc] p-3.5 sm:p-4">
            <div className="grid items-center gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                  Research stage
                </p>
                <p className="mt-1 font-display text-[13.5px] font-bold leading-snug text-[#0b1528]">
                  Buying intent content
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowRight className="h-4 w-4 rotate-90 text-[#0f6dff] sm:rotate-0" />
              </div>

              <div className="rounded-xl border border-[#0f6dff]/35 bg-white p-3.5 shadow-2xs">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                  Broad terms
                </p>
                <p className="mt-1 font-display text-[13.5px] font-bold leading-snug text-[#0b1528]">
                  Category authority
                </p>
              </div>

              <div className="flex justify-center" aria-hidden="true">
                <ArrowRight className="h-4 w-4 rotate-90 text-[#0f6dff] sm:rotate-0" />
              </div>

              <div className="rounded-xl border border-[#1a2c4e] bg-[#0b1528] p-3.5 text-white shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8ec5ff]">
                  High intent
                </p>
                <p className="mt-1 font-display text-[13.5px] font-bold leading-snug text-white">
                  Long tail product terms
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EcommerceSeoRedesign({ industry }: { industry: Industry }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const storefrontServices = industry.coreServices.filter((s) =>
    ["seo-services", "ai-seo", "ai-content-optimization"].includes(s.slug)
  );
  const technicalServices = industry.coreServices.filter((s) =>
    ["technical-seo", "google-ranking-growth", "competitor-analysis"].includes(
      s.slug
    )
  );

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. HIGH-IMPACT EDITORIAL HERO */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#f4f8ff] py-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,109,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,109,255,0.045)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_75%_85%_at_75%_25%,black,transparent)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#0f6dff]/[0.09] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[#0f6dff]/[0.06] blur-3xl"
          />

          <div className={`relative ${CONTAINER}`}>
            <nav aria-label="Breadcrumb" className="mb-7">
              <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </li>
                <li>
                  <Link
                    href="/services"
                    className="transition-colors hover:text-[#0f6dff]"
                  >
                    Services
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                </li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  {industry.name}
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white/90 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#0f6dff] shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {industry.eyebrow}
                </span>

                <h1 className="mt-5 max-w-3xl font-display text-[2.25rem] font-bold leading-[1.06] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.45rem] text-balance">
                  {industry.h1Title}{" "}
                  <span className="text-[#0f6dff]">{industry.h1Highlight}</span>
                </h1>

                <p className="mt-5 max-w-2xl text-[16.5px] leading-[1.68] text-slate-600 sm:text-[18px]">
                  {industry.heroSubtitle}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14.5px] font-bold text-white shadow-[0_14px_28px_-10px_rgba(15,109,255,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0b57d0]"
                  >
                    {industry.heroCtaPrimary}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14.5px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                  >
                    {industry.heroCtaSecondary}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <StorefrontArchitectureDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* 2. ECOMMERCE SEO INTRODUCTION */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#f4f8ff] px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {industry.eyebrow}
                </span>

                <h2 className={`${HEADING} mt-4`}>{industry.heroSubtitle}</h2>

                <div className="mt-6 space-y-4">
                  {industry.intro.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[16px] leading-[1.72] text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <IntentAcquisitionVisual />
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMMON ECOMMERCE SEO CHALLENGES */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Who it helps</p>
                <h2 className={`${HEADING} mt-2`}>
                  Common {industry.name.toLowerCase()} SEO{" "}
                  <span className="text-[#0f6dff]">challenges</span>
                </h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-slate-600">
                Structural bottlenecks that keep product and category pages from reaching commercial search demand.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industry.challenges.map((item, idx) => {
                const Icon = challengeIcons[idx % challengeIcons.length];
                return (
                  <div
                    key={item.title}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/35 hover:shadow-[0_20px_42px_-24px_rgba(15,109,255,0.2)]"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#0f6dff] via-[#4a93ff] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4f8ff] text-[#0f6dff] transition-colors duration-300 group-hover:bg-[#0f6dff] group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-[12px] font-bold tracking-[0.12em] text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[16.5px] font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. WHY ORGANIC SEARCH MATTERS FOR ECOMMERCE */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className={EYEBROW}>Why it matters</p>
                <h2 className={`${HEADING} mt-2`}>
                  {industry.whyMatters.heading}
                </h2>

                <div className="mt-6 space-y-4">
                  {industry.whyMatters.body.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-[16px] leading-[1.72] text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {whyMattersBadges.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-3.5 py-2 text-[13px] font-semibold text-[#0b1528]"
                    >
                      <BadgeCheck
                        className="h-4 w-4 text-[#0f6dff]"
                        aria-hidden="true"
                      />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <WhyMattersVisual />
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPLETE ECOMMERCE SEO STRATEGY */}
        <section className="border-y border-slate-200/80 bg-[#f4f8ff]/65 py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Strategies</p>
                <h2 className={`${HEADING} mt-2`}>
                  Our {industry.name.toLowerCase()} SEO strategy
                </h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold text-slate-600 sm:inline-flex">
                <Target className="h-3.5 w-3.5 text-[#0f6dff]" aria-hidden="true" />
                Catalog · Technical · Authority &amp; Content
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industry.strategy.map((item, idx) => {
                const Icon = strategyIcons[idx % strategyIcons.length];
                return (
                  <div
                    key={item.title}
                    className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_30px_-24px_rgba(11,21,40,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/35 hover:shadow-[0_20px_42px_-24px_rgba(15,109,255,0.2)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0b1528] text-white transition-colors duration-300 group-hover:bg-[#0f6dff]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-[12px] font-bold tracking-[0.12em] text-[#0f6dff]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[16.5px] font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                      {item.body}
                    </p>

                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-bold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                      >
                        {item.link.label}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. SERVICES INCLUDED (GROUPED LOGICALLY) */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Services included</p>
              <h2 className={`${HEADING} mt-2`}>
                A complete range of{" "}
                <span className="text-[#0f6dff]">marketing services</span>
              </h2>
            </div>

            <div className="mt-10 space-y-8">
              {/* Group 1: Storefront & Content Intent */}
              <div className="rounded-3xl border border-slate-200/90 bg-[#f7f9fc] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                      Group 01
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#0b1528]">
                      Storefront &amp; Search Content Optimization
                    </h3>
                  </div>
                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[12px] font-semibold text-slate-600">
                    Intent &amp; Content
                  </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {storefrontServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/40 hover:shadow-[0_18px_36px_-24px_rgba(15,109,255,0.28)]"
                    >
                      <span className="flex items-center gap-2 font-display text-[15.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#0f6dff]"
                          aria-hidden="true"
                        />
                        {s.name}
                      </span>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                        {s.desc}
                      </p>
                      <p className="mt-4 inline-flex w-fit rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-[12px] font-semibold text-[#0f6dff]">
                        {s.benefit}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                        Learn more
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Group 2: Technical Foundations & Competitive Intelligence */}
              <div className="rounded-3xl border border-slate-200/90 bg-[#f7f9fc] p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                      Group 02
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-[#0b1528]">
                      Technical Foundations &amp; Market Intelligence
                    </h3>
                  </div>
                  <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-[12px] font-semibold text-slate-600">
                    Architecture &amp; Growth
                  </span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {technicalServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/40 hover:shadow-[0_18px_36px_-24px_rgba(15,109,255,0.28)]"
                    >
                      <span className="flex items-center gap-2 font-display text-[15.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#0f6dff]"
                          aria-hidden="true"
                        />
                        {s.name}
                      </span>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                        {s.desc}
                      </p>
                      <p className="mt-4 inline-flex w-fit rounded-lg bg-[#f4f8ff] px-2.5 py-1 text-[12px] font-semibold text-[#0f6dff]">
                        {s.benefit}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                        Learn more
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. ECOMMERCE GROWTH OPPORTUNITIES */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Growth opportunities</p>
              <h2 className={`${HEADING} mt-2`}>
                {industry.name} SEO growth{" "}
                <span className="text-[#0f6dff]">opportunities</span>
              </h2>
            </div>

            <div className="mt-8">
              <DemandSpectrumVisual />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industry.growth.map((item, idx) => {
                const Icon = growthIcons[idx % growthIcons.length];
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_10px_28px_-22px_rgba(11,21,40,0.16)] transition-all duration-300 hover:border-[#0f6dff]/35"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-[15.5px] font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. FIVE-STEP PROCESS VISUALIZATION */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Our process</p>
                <h2 className={`${HEADING} mt-2`}>
                  A proven, transparent{" "}
                  <span className="text-[#0f6dff]">process</span>
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] leading-relaxed text-slate-600">
                A transparent, repeatable process so you always know what is happening and why.
              </p>
            </div>

            {/* Desktop horizontal pipeline + mobile vertical connected stack */}
            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-[2px] bg-gradient-to-r from-[#0f6dff]/20 via-[#0f6dff] to-[#0f6dff]/20 lg:block"
              />

              <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {industry.process.map((step) => (
                  <li
                    key={step.step}
                    className="relative flex h-full flex-col rounded-2xl border border-slate-200/90 bg-[#f7f9fc] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0f6dff]/40 hover:bg-white hover:shadow-[0_18px_38px_-24px_rgba(15,109,255,0.2)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-xl bg-[#0b1528] font-display text-sm font-bold text-white shadow-xs">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                        Step {step.step}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[17px] font-bold text-[#0b1528]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {step.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 9. WHY CHOOSE WEBAMAZEE */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Why Webamazee</p>
                <h2 className={`${HEADING} mt-2`}>
                  A global SEO partner{" "}
                  <span className="text-[#0f6dff]">for your business</span>
                </h2>
              </div>
              <p className="max-w-lg text-[14.5px] leading-relaxed text-slate-600">
                Webamazee is a global digital marketing and SEO company. We work with businesses worldwide to build sustainable organic growth.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industry.whyChoose.map((item, idx) => {
                const Icon = whyIcons[idx % whyIcons.length];
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_30px_-24px_rgba(11,21,40,0.15)] transition-all duration-300 hover:border-[#0f6dff]/35"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-display text-[16.5px] font-bold text-[#0b1528]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. RELATED SERVICES & INDUSTRY LINKS */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Connected Capabilities</p>
                <h2 className={`${HEADING} mt-2`}>
                  Explore related{" "}
                  <span className="text-[#0f6dff]">services</span>
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              {industry.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-[#f7f9fc] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/40 hover:bg-white hover:shadow-[0_14px_28px_-22px_rgba(15,109,255,0.28)]"
                >
                  <span className="font-display text-[14.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                    {rel.name}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-[#0f6dff] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Cross links to related industry pages + contextual quick navigation */}
            <div className="mt-8 grid gap-6 rounded-2xl border border-slate-200/90 bg-[#f7f9fc] p-6 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                  Explore SEO for related industries
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {industry.crossLinks.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13.5px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                    >
                      <Target className="h-3.5 w-3.5 text-[#0f6dff]" aria-hidden="true" />
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-200 lg:pl-6">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Explore Webamazee
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {contextualLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f6dff] px-3.5 py-1.5 text-[13px] font-bold text-white transition-colors hover:bg-[#0b57d0]"
                  >
                    <MessageCircleQuestion className="h-3.5 w-3.5" aria-hidden="true" />
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ ACCORDION */}
        <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className={EYEBROW}>FAQ</p>
                <h2 className={`${HEADING} mt-2`}>
                  Questions about {industry.name.toLowerCase()} SEO
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                  Clear answers on product and category optimization, technical SEO, timelines and working with our team.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline"
                >
                  {industry.heroCtaSecondary}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="space-y-3 lg:col-span-8">
                {industry.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  const panelId = `ecommerce-faq-panel-${idx}`;
                  const buttonId = `ecommerce-faq-trigger-${idx}`;

                  return (
                    <div
                      key={faq.q}
                      className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                        isOpen
                          ? "border-[#0f6dff]/40 shadow-[0_14px_32px_-24px_rgba(15,109,255,0.28)]"
                          : "border-slate-200/90 shadow-xs"
                      }`}
                    >
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] sm:px-6 sm:py-5"
                      >
                        <span className="font-display text-[15.5px] font-bold leading-snug text-[#0b1528] sm:text-[16.5px]">
                          {faq.q}
                        </span>
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-all duration-200 ${
                            isOpen
                              ? "bg-[#0f6dff] text-white"
                              : "bg-[#f4f8ff] text-[#0f6dff]"
                          }`}
                        >
                          <Plus
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </span>
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!isOpen}
                        className={isOpen ? "block" : "hidden"}
                      >
                        <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-[14.5px] leading-[1.7] text-slate-600 sm:px-6">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 12. PREMIUM FINAL CONVERSION SECTION */}
        <section className="bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="relative overflow-hidden rounded-3xl border border-[#1a2c4e] bg-[#0b1528] p-7 text-white shadow-[0_26px_64px_-28px_rgba(11,21,40,0.5)] sm:p-12 lg:p-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0f6dff] to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#0f6dff]/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-[#0f6dff]/15 blur-3xl"
              />

              <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#8ec5ff]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Free 30 minute Strategy Call
                  </span>

                  <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-4xl lg:text-[2.6rem] text-balance">
                    {industry.ctaTitle}
                  </h2>

                  <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-slate-300 sm:text-[16.5px]">
                    {industry.ctaSubtitle}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                    {strategyCallHighlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[14px] font-medium text-slate-200"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#8ec5ff]"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4 lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-7 text-[15px] font-bold text-white shadow-[0_14px_32px_-8px_rgba(15,109,255,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#257bff] sm:w-auto"
                  >
                    {industry.ctaLabel}
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
