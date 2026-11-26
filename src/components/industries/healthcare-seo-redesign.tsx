"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Plus, ShieldCheck } from "lucide-react";
import type { Industry } from "@/lib/industries";

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const EYEBROW =
  "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.35rem]";
const PRIMARY_BTN =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const SECONDARY_BTN =
  "inline-flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

const PATIENT_SEARCH_JOURNEY = [
  {
    num: "01",
    label: "Service & treatment searches",
    detail: "Patients look up specific treatments, clinics and healthcare services",
  },
  {
    num: "02",
    label: "Local clinic discovery",
    detail: "Location pages and local SEO signals surface nearby providers",
  },
  {
    num: "03",
    label: "Accuracy & trust check",
    detail: "Clear, responsible website content reassures patients before contact",
  },
  {
    num: "04",
    label: "Accessible clinic enquiry",
    detail: "Fast, easy-to-navigate pages guide visitors to clear contact paths",
  },
];

const HEALTHCARE_PAGE_ARCHITECTURE = [
  {
    num: "01",
    stage: "Service Pages",
    title: "Dedicated treatment & care pages",
    focus: "Structured around the specific services patients actively search for",
  },
  {
    num: "02",
    stage: "Location Pages",
    title: "Clear coverage for every clinic",
    focus: "Dedicated location pages paired with local provider search visibility",
  },
  {
    num: "03",
    stage: "Content Trust",
    title: "Accurate, clear patient answers",
    focus: "Responsible handling, reviewed by qualified professionals where needed",
  },
  {
    num: "04",
    stage: "Technical & Schema",
    title: "Fast, accessible structured pages",
    focus: "Speed, mobile usability, crawl health and appropriate schema markup",
  },
];

const WHY_MATTERS_PILLARS = [
  {
    title: "Search visibility",
    note: "Appear clearly when patients search for specific treatments and nearby clinics.",
  },
  {
    title: "Qualified traffic",
    note: "Reach people actively seeking trustworthy information and relevant care services.",
  },
  {
    title: "Conversion focus",
    note: "Pair clear, reassuring pages with accessible navigation and contact paths.",
  },
  {
    title: "Sustainable growth",
    note: "Strengthen service, local and technical foundations for lasting organic reach.",
  },
];

const CONTEXTUAL_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const STRATEGY_CALL_HIGHLIGHTS = [
  "Free personalised roadmap",
  "Personal follow-up from our team",
  "No lock in",
];

export function HealthcareSeoRedesign({ industry }: { industry: Industry }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const discoveryContentServices = industry.coreServices.filter((s) =>
    ["seo-services", "local-seo", "ai-content-optimization"].includes(s.slug)
  );
  const usabilityGrowthServices = industry.coreServices.filter((s) =>
    ["technical-seo", "google-ranking-growth", "website-development"].includes(
      s.slug
    )
  );

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. HERO */}
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
                  {industry.name}
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
              <div>
                <p className={EYEBROW}>{industry.eyebrow}</p>

                <h1 className="mt-4 max-w-3xl font-display text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.4rem]">
                  {industry.h1Title}{" "}
                  <span className="text-[#0f6dff]">{industry.h1Highlight}</span>
                </h1>

                <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
                  {industry.heroSubtitle}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    {industry.heroCtaPrimary}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                  </Link>
                  <Link href="/contact" className={SECONDARY_BTN}>
                    {industry.heroCtaSecondary}
                  </Link>
                </div>

                <p className="mt-6 flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                  />
                  <span>
                    SEO and digital visibility services only — Webamazee never provides medical advice or makes claims about patient outcomes.
                  </span>
                </p>
              </div>

              <aside className="rounded-2xl border border-[#dce6f4] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(11,21,40,0.16)] sm:p-7">
                <p className={EYEBROW}>Patient search journey</p>
                <h2 className="mt-2.5 max-w-md font-display text-[1.45rem] font-bold leading-snug tracking-[-0.02em] text-[#0b1528]">
                  Help patients find reliable clinic and service pages online.
                </h2>

                <ol className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                  {PATIENT_SEARCH_JOURNEY.map((item) => (
                    <li
                      key={item.num}
                      className="grid grid-cols-[28px_1fr] gap-3 py-3.5"
                    >
                      <span className="font-display text-[11px] font-bold text-[#0f6dff]">
                        {item.num}
                      </span>
                      <div>
                        <p className="text-[14px] font-bold text-[#0b1528]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[13px] leading-snug text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>

        {/* 2. HEALTHCARE SEO INTRODUCTION */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div>
                <p className={EYEBROW}>Trustworthy clinic presence</p>
                <h2 className={`${HEADING} mt-2`}>
                  Reassuring search visibility built on clarity and accuracy.
                </h2>

                <div className="mt-6 rounded-2xl border border-[#dce6f4] bg-[#f7faff] p-5">
                  <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                    <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0" />
                    Responsible scope
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                    Webamazee focuses strictly on search visibility, website usability and clear page structure. We never provide medical advice or make claims about outcomes.
                  </p>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  {industry.intro.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="max-w-2xl text-[16px] leading-[1.72] text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Service clarity
                    </p>
                    <p className="mt-1 font-display text-[15px] font-bold text-[#0b1528]">
                      Treatment &amp; care pages
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                      Pages aligned to specific services patients search for.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Local reach
                    </p>
                    <p className="mt-1 font-display text-[15px] font-bold text-[#0b1528]">
                      Clinic location pages
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                      Help nearby patients find each practice location easily.
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Content trust
                    </p>
                    <p className="mt-1 font-display text-[15px] font-bold text-[#0b1528]">
                      Accurate information
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                      Well structured content handled with care and clarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. COMMON HEALTHCARE SEO CHALLENGES */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Who it helps</p>
                <h2 className={`${HEADING} mt-2`}>
                  Common {industry.name.toLowerCase()} SEO{" "}
                  <span className="text-[#0f6dff]">challenges</span>
                </h2>
              </div>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Clinics and healthcare providers face heightened expectations around accuracy, sensitive subjects, local clinic findability and calm website usability.
              </p>
            </div>

            <ol className="mt-9 grid gap-x-9 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {industry.challenges.map((item, idx) => (
                <li
                  key={item.title}
                  className="border-t border-slate-300/80 py-5"
                >
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2.5 font-display text-[17px] font-bold text-[#0b1528]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. WHY SEO MATTERS FOR HEALTHCARE */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
              <div>
                <p className={EYEBROW}>Why it matters</p>
                <h2 className={`${HEADING} mt-2`}>
                  {industry.whyMatters.heading}
                </h2>

                <div className="mt-6 space-y-4">
                  {industry.whyMatters.body.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="max-w-2xl text-[16px] leading-[1.72] text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <aside className="rounded-2xl bg-[#0b1528] p-7 text-white sm:p-8">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                  Content quality &amp; trust framework
                </p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white">
                  What responsible healthcare search visibility prioritises
                </h3>

                <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
                  {WHY_MATTERS_PILLARS.map((item, idx) => (
                    <li
                      key={item.title}
                      className="grid grid-cols-[28px_1fr] gap-3 py-4"
                    >
                      <span className="font-display text-[11.5px] font-bold text-[#8ec5ff]">
                        0{idx + 1}
                      </span>
                      <div>
                        <p className="font-display text-[15px] font-bold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-slate-300">
                          {item.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. HEALTHCARE SEO STRATEGY */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Strategies</p>
                <h2 className={`${HEADING} mt-2`}>
                  Our {industry.name.toLowerCase()} SEO strategy
                </h2>
              </div>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Organising service pages, clinic location pages, local SEO signals, responsible content and fast technical structure for healthcare providers.
              </p>
            </div>

            {/* Clinic service & location architecture strip */}
            <div className="mt-9 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="grid divide-y divide-slate-200 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                {HEALTHCARE_PAGE_ARCHITECTURE.map((pillar, idx) => (
                  <div
                    key={pillar.num}
                    className={`p-5 sm:p-6 ${
                      idx === HEALTHCARE_PAGE_ARCHITECTURE.length - 1
                        ? "bg-[#0b1528] text-white"
                        : "bg-white"
                    }`}
                  >
                    <p
                      className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
                        idx === HEALTHCARE_PAGE_ARCHITECTURE.length - 1
                          ? "text-[#8ec5ff]"
                          : "text-[#0f6dff]"
                      }`}
                    >
                      {pillar.num} · {pillar.stage}
                    </p>
                    <p
                      className={`mt-2 font-display text-[15.5px] font-bold leading-snug ${
                        idx === HEALTHCARE_PAGE_ARCHITECTURE.length - 1
                          ? "text-white"
                          : "text-[#0b1528]"
                      }`}
                    >
                      {pillar.title}
                    </p>
                    <p
                      className={`mt-1.5 text-[13px] leading-relaxed ${
                        idx === HEALTHCARE_PAGE_ARCHITECTURE.length - 1
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      {pillar.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ol className="mt-10 grid gap-x-9 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {industry.strategy.map((item, idx) => (
                <li
                  key={item.title}
                  className="flex flex-col border-t-2 border-[#0f6dff] py-5"
                >
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2.5 font-display text-[17px] font-bold text-[#0b1528]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                    {item.body}
                  </p>
                  {item.link && (
                    <Link
                      href={item.link.href}
                      className="mt-4 inline-flex items-center gap-1 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
                    >
                      {item.link.label}
                      <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. SIX INCLUDED MARKETING SERVICES */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Services included</p>
              <h2 className={`${HEADING} mt-2`}>
                A complete range of{" "}
                <span className="text-[#0f6dff]">marketing services</span>
              </h2>
            </div>

            <div className="mt-10 space-y-12">
              {/* Group 01 */}
              <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                    01 · Visibility &amp; Patient Trust
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Organic Search, Local Clinics &amp; Trustworthy Content
                  </h3>
                  <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate-600">
                    Help patients discover relevant services and nearby clinic locations supported by clear, responsible website content.
                  </p>
                </div>

                <ol className="divide-y divide-slate-200 border-y border-slate-200">
                  {discoveryContentServices.map((s, idx) => (
                    <li
                      key={s.slug}
                      className="grid gap-3 py-5 sm:grid-cols-[36px_1fr_auto] sm:items-start sm:gap-5"
                    >
                      <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="font-display text-[16.5px] font-bold text-[#0b1528]">
                            {s.name}
                          </h4>
                          <span className="text-[12px] font-semibold text-[#0f6dff]">
                            {s.benefit}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                          {s.desc}
                        </p>
                      </div>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex items-center gap-1 whitespace-nowrap pt-0.5 text-[13px] font-bold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                      >
                        Learn more
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-[#0f6dff]"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Group 02 */}
              <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                    02 · Usability &amp; Search Performance
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Technical Foundations &amp; Reassuring Web Experience
                  </h3>
                  <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed text-slate-600">
                    Support anxious visitors with fast page speed, accessible site structure, clear navigation and measured search ranking growth.
                  </p>
                </div>

                <ol className="divide-y divide-slate-200 border-y border-slate-200">
                  {usabilityGrowthServices.map((s, idx) => (
                    <li
                      key={s.slug}
                      className="grid gap-3 py-5 sm:grid-cols-[36px_1fr_auto] sm:items-start sm:gap-5"
                    >
                      <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                        0{idx + 4}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <h4 className="font-display text-[16.5px] font-bold text-[#0b1528]">
                            {s.name}
                          </h4>
                          <span className="text-[12px] font-semibold text-[#0f6dff]">
                            {s.benefit}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                          {s.desc}
                        </p>
                      </div>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex items-center gap-1 whitespace-nowrap pt-0.5 text-[13px] font-bold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                      >
                        Learn more
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-[#0f6dff]"
                        />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 7. HEALTHCARE SEO GROWTH OPPORTUNITIES */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
              <div>
                <p className={EYEBROW}>Growth opportunities</p>
                <h2 className={`${HEADING} mt-2`}>
                  {industry.name} SEO growth{" "}
                  <span className="text-[#0f6dff]">opportunities</span>
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600">
                  Build stronger visibility across treatments, local clinics and accessible patient journeys without relying on exaggerated claims.
                </p>

                <dl className="mt-7 divide-y divide-slate-200 border-y border-slate-200 text-[13.5px]">
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="font-semibold text-[#0b1528]">Service reach</dt>
                    <dd className="text-right text-slate-600">Treatment &amp; care pages</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="font-semibold text-[#0b1528]">Local presence</dt>
                    <dd className="text-right text-slate-600">Dedicated clinic location pages</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <dt className="font-semibold text-[#0b1528]">Content standard</dt>
                    <dd className="text-right text-slate-600">Accurate, clear &amp; responsible</dd>
                  </div>
                </dl>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <ul className="grid sm:grid-cols-2">
                  {industry.growth.map((item, idx) => (
                    <li
                      key={item.title}
                      className={`p-6 ${
                        idx < industry.growth.length - 1
                          ? "border-b border-slate-200"
                          : ""
                      } ${
                        idx >= industry.growth.length - 2 ? "sm:border-b-0" : ""
                      } ${idx % 2 === 0 ? "sm:border-r sm:border-slate-200" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]"
                        />
                        <div>
                          <h3 className="font-display text-[16px] font-bold text-[#0b1528]">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FIVE-STEP PROCESS */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Our process</p>
                <h2 className={`${HEADING} mt-2`}>
                  A proven, transparent{" "}
                  <span className="text-[#0f6dff]">process</span>
                </h2>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                A transparent, repeatable process so you always know what is happening and why.
              </p>
            </div>

            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {industry.process.map((step) => (
                <li
                  key={step.step}
                  className="relative border-l-2 border-[#0f6dff] pl-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-bold text-[#0f6dff]">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-bold text-[#0b1528]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 9. WHY WEBAMAZEE */}
        <section className="border-y border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
              <div>
                <p className={EYEBROW}>Why Webamazee</p>
                <h2 className={`${HEADING} mt-2`}>
                  A global SEO partner{" "}
                  <span className="text-[#0f6dff]">for your business</span>
                </h2>
              </div>
              <p className="max-w-lg text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Webamazee is a global digital marketing and SEO company. We work with businesses worldwide to build sustainable organic growth.
              </p>
            </div>

            <div className="mt-9 grid gap-x-9 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {industry.whyChoose.map((item, idx) => (
                <div
                  key={item.title}
                  className="border-t border-slate-300/80 py-5"
                >
                  <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2.5 font-display text-[17px] font-bold text-[#0b1528]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. RELATED SERVICES & INDUSTRY CROSS-LINKS */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div>
              <p className={EYEBROW}>Connected capabilities</p>
              <h2 className={`${HEADING} mt-2`}>
                Explore related{" "}
                <span className="text-[#0f6dff]">services</span>
              </h2>
            </div>

            <ul className="mt-8 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {industry.relatedServices.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="group flex items-center justify-between gap-3 border-t border-slate-200 py-4 transition-colors hover:border-[#0f6dff]"
                  >
                    <span className="font-display text-[15.5px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                      {rel.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-[#0f6dff]"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-6 border-t border-slate-200 pt-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                  Explore SEO for related industries
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {industry.crossLinks.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#f7f9fc] px-3.5 py-2 text-[13.5px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:bg-white hover:text-[#0f6dff]"
                    >
                      {c.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#0f6dff]"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="lg:border-l lg:border-slate-200 lg:pl-8">
                <p className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Explore Webamazee
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {CONTEXTUAL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[13.5px] font-medium text-slate-600 transition-colors hover:text-[#0f6dff]"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
                  >
                    Talk to Us
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. ACCESSIBLE FAQ ACCORDION (ALL 10 FAQs) */}
        <section className="border-t border-slate-200/80 bg-[#f7f9fc] py-12 sm:py-16">
          <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
            <div>
              <p className={EYEBROW}>FAQ</p>
              <h2 className={`${HEADING} mt-2`}>
                Questions about {industry.name.toLowerCase()} SEO
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
                Clear answers on local clinic discovery, trustworthy website content, service and location pages, and the limits of SEO scope.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline"
              >
                {industry.heroCtaSecondary}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {industry.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const panelId = `healthcare-faq-panel-${idx}`;
                const buttonId = `healthcare-faq-trigger-${idx}`;

                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 py-4.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] sm:py-5"
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

        {/* 12. FINAL CONVERSION BAND */}
        <section className="bg-white py-12 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-8 rounded-2xl bg-[#0b1528] p-7 text-white sm:p-11 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8ec5ff]">
                  Free 30 minute Strategy Call
                </p>
                <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">
                  {industry.ctaTitle}
                </h2>
                <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-slate-300">
                  {industry.ctaSubtitle}
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

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className={PRIMARY_BTN}>
                  {industry.ctaLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
