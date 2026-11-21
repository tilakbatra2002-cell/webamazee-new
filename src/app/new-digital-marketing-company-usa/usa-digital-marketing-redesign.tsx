"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Megaphone,
  MousePointerClick,
  Network,
  Search,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import type { CommercialLocationPage } from "@/lib/locations-commercial";
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

type JourneyStepId = "attract" | "engage" | "amplify" | "measure";

const GROWTH_JOURNEY: {
  id: JourneyStepId;
  num: string;
  stage: string;
  title: string;
  desc: string;
  channels: string[];
  handoff: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "attract",
    num: "01",
    stage: "ATTRACT",
    title: "SEO & Organic Search",
    desc: "Capture high-intent US buyers actively comparing vendors across technical, commercial, and informational search queries.",
    channels: ["Technical SEO", "Service Hubs", "Intent Guides"],
    handoff: "Routes organic clicks straight onto conversion-structured pages.",
    href: "/new-seo-services-united-states",
    cta: "Explore USA SEO",
  },
  {
    id: "engage",
    num: "02",
    stage: "CONVERT",
    title: "Website & Landing Pages",
    desc: "Clarify your US offer, speed up page load times, and match campaign copy 1:1 with dedicated landing pages and clear conversion paths.",
    channels: ["Site Architecture", "Dedicated LPs", "Frictionless Forms"],
    handoff: "Turns paid, social, and organic traffic into qualified pipeline.",
    href: "/new-web-designing-company-united-states",
    cta: "Explore USA Web Design",
  },
  {
    id: "amplify",
    num: "03",
    stage: "AMPLIFY",
    title: "Social & Paid Social",
    desc: "Build buyer trust across LinkedIn, Instagram, and Facebook—and extend reach selectively through paid social campaigns built around clear offers.",
    channels: ["LinkedIn & Meta", "Paid Social Ads", "Retargeting"],
    handoff: "Re-engages researching prospects back toward demo & quote flows.",
    href: "/services/social-media-advertising",
    cta: "Social Advertising",
  },
  {
    id: "measure",
    num: "04",
    stage: "ATTRIBUTE",
    title: "Analytics & CRO",
    desc: "Track GA4 events, Search Console queries, and form attribution so budget and editorial hours expand what actually drives leads.",
    channels: ["GA4 Attribution", "Search Console", "CRO Refinement"],
    handoff: "Feeds real buyer conversion evidence back into every channel.",
    href: "/blog/measuring-marketing-roi",
    cta: "ROI Measurement Guide",
  },
];

const CORE_CHANNELS = [
  {
    icon: Search,
    tag: "Organic Demand",
    title: "SEO & Organic Acquisition",
    desc: "Capture sustainable US demand across high-intent service queries without paying for every click forever.",
    links: [
      { label: "USA SEO Services", href: "/new-seo-services-united-states" },
      { label: "Technical SEO", href: "/services/technical-seo" },
    ],
  },
  {
    icon: MousePointerClick,
    tag: "Page Experience",
    title: "Website & Landing-Page Optimization",
    desc: "Eliminate drop-off by aligning homepage messaging, service details, and focused landing pages around clear US conversion actions.",
    links: [
      { label: "Landing Page Development", href: "/services/landing-page-development" },
      { label: "Website Redesign", href: "/services/website-redesign" },
    ],
  },
  {
    icon: FileText,
    tag: "Buyer Education",
    title: "Content Marketing",
    desc: "Publish comparison guides, category pages, and practical answers edited for clarity and search relevance under human oversight.",
    links: [
      { label: "AI Content Optimization", href: "/services/ai-content-optimization" },
      { label: "AI SEO Research", href: "/services/ai-seo" },
    ],
  },
  {
    icon: Share2,
    tag: "Brand Credibility",
    title: "Social Media Marketing",
    desc: "Maintain credible brand distribution on LinkedIn, Instagram, and Facebook aligned with your core US messaging.",
    links: [
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "LinkedIn Marketing", href: "/services/linkedin-marketing" },
    ],
  },
  {
    icon: Megaphone,
    tag: "Targeted Reach",
    title: "Paid Social Advertising",
    desc: "Run focused social ad campaigns paired with dedicated landing pages and clear conversion tracking where supported by your campaign budget.",
    links: [
      { label: "Social Media Advertising", href: "/services/social-media-advertising" },
      { label: "Instagram Marketing", href: "/services/instagram-marketing" },
    ],
  },
  {
    icon: SlidersHorizontal,
    tag: "Lead Quality",
    title: "Conversion Rate Optimization",
    desc: "Refine value positioning, proof placement, form steps, and call-to-action clarity so existing traffic produces more qualified leads.",
    links: [
      { label: "USA Web Design", href: "/new-web-designing-company-united-states" },
      { label: "Website Development", href: "/services/website-development" },
    ],
  },
];

const INTEGRATED_SYSTEM_LAYERS = [
  {
    phase: "01 · Discovery & Reach",
    mix: "SEO Foundations + Educational Content + Organic & Paid Social",
    goal: "Put clear category explanations in front of US buyers already comparing options.",
  },
  {
    phase: "02 · Evaluation & Proof",
    mix: "Structured US Service Pages + International Case Studies + Retargeting",
    goal: "Answer pricing, scope, and capability questions before asking for a call.",
  },
  {
    phase: "03 · Conversion & Attribution",
    mix: "Dedicated Landing Pages + Short Qualification Forms + GA4 & Search Console",
    goal: "Connect every inquiry directly to the channel and page that earned it.",
  },
];

const US_DM_PROCESS = [
  {
    step: "01",
    title: "Discovery & Channel Baseline",
    desc: "Review your current site, search footprint, social presence, and buyer funnel bottlenecks.",
  },
  {
    step: "02",
    title: "Integrated Strategy & Roadmap",
    desc: "Prioritize the exact mix of SEO, site fixes, landing pages, content, and social channels.",
  },
  {
    step: "03",
    title: "Website & Landing Alignment",
    desc: "Ensure destination pages convert cleanly before amplifying traffic toward them.",
  },
  {
    step: "04",
    title: "Campaign & Content Execution",
    desc: "Ship search-ready content, technical SEO fixes, social calendars, and paid social tests.",
  },
  {
    step: "05",
    title: "Tracking & Conversion Audits",
    desc: "Validate GA4 conversion events, Search Console queries, and inquiry source quality.",
  },
  {
    step: "06",
    title: "Monthly Optimization",
    desc: "Reallocate time and effort toward the channels and offers driving measurable results.",
  },
];

const US_ENGLISH_DM_FAQS = [
  {
    q: "What does a digital marketing company do for US businesses?",
    a: "A digital marketing partner connects organic search, website UX, landing pages, content, social channels, and analytics into one coordinated acquisition system.",
  },
  {
    q: "Which digital marketing services are included?",
    a: "Our scope spans technical and on-page SEO, custom website and landing-page optimization, content marketing, organic social media, paid social advertising, and analytics reporting.",
  },
  {
    q: "Can Webamazee work with our existing website before launching campaigns?",
    a: "Yes. We evaluate whether current service and landing pages convert effectively first, fixing friction or building dedicated landing pages before scaling traffic.",
  },
  {
    q: "Do you offer standalone Google Ads or focus on organic and social channels?",
    a: "Our verified service capabilities center on SEO, high-converting websites, landing pages, content marketing, organic social media (LinkedIn, Instagram, Facebook), and paid social advertising—we never overclaim unsupported services.",
  },
  {
    q: "How long does digital marketing take to produce measurable outcomes?",
    a: "Landing-page updates and paid social campaigns generate feedback quickly, while organic SEO and content compound over longer horizons. We track progress against agreed baseline goals rather than guaranteeing deadlines.",
  },
  {
    q: "How do you measure and report marketing ROI?",
    a: "Reporting covers Search Console query growth, organic/campaign traffic trends, landing-page engagement, and qualified leads or bookings—not vanity click metrics alone.",
  },
  {
    q: "Can Webamazee collaborate alongside an internal US marketing team?",
    a: "Yes. We define clean sprint ownership, shared editorial calendars, and EST–PST review calls so our work extends your internal team rather than duplicating effort.",
  },
  {
    q: "Do you guarantee rankings, lead volume, or revenue targets?",
    a: "No ethical partner can guarantee search positions or market outcomes. We provide transparent execution, accurate tracking, and disciplined ongoing optimization.",
  },
  {
    q: "Can you redesign an outdated website as part of a digital marketing retainer?",
    a: "Yes—and we handle URL mapping and 301 redirects carefully so existing search value stays protected.",
  },
  {
    q: "How is digital marketing scoped and priced for US companies?",
    a: "Pricing depends on your channel mix, competitive landscape, and build requirements. After an initial discovery review, we share a transparent fixed proposal.",
  },
];

export function UsaDigitalMarketingRedesign({
  page,
}: {
  page: CommercialLocationPage;
}) {
  const [activeStepId, setActiveStepId] = useState<JourneyStepId>("attract");
  const activeJourney =
    GROWTH_JOURNEY.find((s) => s.id === activeStepId) ?? GROWTH_JOURNEY[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. HERO WITH MULTI-CHANNEL GROWTH JOURNEY VISUAL */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UsaBreadcrumb current="Digital Marketing USA" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United States · Connected Growth
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[2.95rem] lg:text-[3.25rem]">
                  Connected Digital Marketing Built for{" "}
                  <span className="text-[#0f6dff]">US Market Growth</span>
                </h1>

                <p className="mt-5 text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Disconnected agencies waste budget sending traffic to
                  underperforming websites. Webamazee connects US organic search,
                  high-converting landing pages, content, social channels, and
                  analytics into one accountable growth system.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/free-seo-audit" className={PRIMARY_BTN}>
                    Audit Your Growth Funnel
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#channel-matrix" className={SECONDARY_BTN}>
                    Explore Channel Stack
                  </Link>
                </div>
              </div>

              {/* Right: Horizontal Multi-Channel Growth Journey Simulator */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0f6dff] text-white">
                        <Network aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-[#0b1528]">
                          US Multi-Channel Acquisition Journey
                        </p>
                        <p className="text-[11.5px] text-slate-500">
                          Click any stage to trace how channels hand off leads
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Connected Funnel Rails */}
                  <div
                    role="tablist"
                    aria-label="Digital marketing growth journey stages"
                    className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
                  >
                    {GROWTH_JOURNEY.map((step) => {
                      const active = step.id === activeJourney.id;
                      return (
                        <button
                          key={step.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveStepId(step.id)}
                          className={`rounded-xl border p-3 text-left transition-all ${
                            active
                              ? "border-[#0f6dff] bg-[#f4f8ff]"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-mono text-[10px] font-bold tracking-[0.12em] ${
                                active ? "text-[#0f6dff]" : "text-slate-400"
                              }`}
                            >
                              {step.num} · {step.stage}
                            </span>
                          </div>
                          <span className="mt-1 block text-[12px] font-bold leading-snug text-[#0b1528]">
                            {step.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Stage Handoff Detail */}
                  <div className="mt-4 rounded-2xl bg-[#0b1528] p-5 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-[#7bb2ff]">
                          STAGE {activeJourney.num} · {activeJourney.stage}
                        </p>
                        <h2 className="mt-1 font-display text-lg font-bold text-white">
                          {activeJourney.title}
                        </h2>
                      </div>
                      <Link
                        href={activeJourney.href}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0f6dff] px-3.5 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#1f7bff]"
                      >
                        {activeJourney.cta}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-300">
                      {activeJourney.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeJourney.channels.map((ch) => (
                        <span
                          key={ch}
                          className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11.5px] font-medium text-slate-200"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 border-t border-white/10 pt-3 text-[12.5px] text-slate-300">
                      <span className="font-semibold text-[#7bb2ff]">
                        System handoff:{" "}
                      </span>
                      {activeJourney.handoff}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CONNECTED SYSTEM EXPLANATION */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>US Digital Strategy</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Acquisition works best as one connected pipeline—not isolated
                  tactics
                </h2>
                <div className="mt-4 space-y-4 text-[15px] leading-[1.7] text-slate-600">
                  {page.whatItMeans.body.slice(0, 2).map((p, idx) => (
                    <p key={idx}>{p.replace(/\benquiries\b/gi, "inquiries")}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {page.whyNeeds.map((need, idx) => (
                  <div
                    key={need.title}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-[#0b1528]">
                      {need.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {need.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE CHANNELS: SEO, WEB/LP OPTIMIZATION, CONTENT, SOCIAL, PAID SOCIAL, CRO */}
        <section
          id="channel-matrix"
          className="scroll-mt-24 bg-[#f4f8ff] py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Verified Growth Capabilities</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Six connected levers powering US demand and conversion
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CORE_CHANNELS.map((ch) => {
                const Icon = ch.icon;
                return (
                  <div
                    key={ch.title}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                          <Icon aria-hidden="true" className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-slate-400">
                          {ch.tag}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                        {ch.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-[1.7] text-slate-600">
                        {ch.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                      {ch.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0f6dff] hover:underline"
                        >
                          {l.label}
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. ANALYTICS, MEASUREMENT & INTEGRATED STRATEGY MATRIX */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-start gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  <BarChart3 aria-hidden="true" className="h-4 w-4" />
                  Analytics &amp; Integrated Strategy
                </div>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Every channel aligned to measurable US pipeline outcomes
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-300">
                  Clicks alone do not pay bills. We align GA4 conversion tracking,
                  Search Console demand patterns, and landing-page testing so
                  your team sees which channels contribute real inquiries.
                </p>
                <div className="mt-7">
                  <Link
                    href="/blog/measuring-marketing-roi"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7bb2ff] hover:text-white"
                  >
                    Read Measuring Marketing ROI
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="space-y-4 lg:col-span-7">
                {INTEGRATED_SYSTEM_LAYERS.map((layer) => (
                  <div
                    key={layer.phase}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.13em] text-[#7bb2ff]">
                      {layer.phase}
                    </span>
                    <p className="mt-2 font-display text-base font-bold text-white">
                      {layer.mix}
                    </p>
                    <p className="mt-1.5 text-[13.5px] text-slate-300">
                      {layer.goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. INDUSTRIES SERVED */}
        <UsaIndustriesBand
          title="Multi-channel acquisition tailored to US buying behavior"
          variant="white"
        />

        {/* 6. EXISTING VERIFIED PORTFOLIO PROOF */}
        <UsaCaseStudiesBand variant="slate" />

        {/* 7. 6-STAGE WORKING PROCESS */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Working Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Six clear phases from baseline audit to scalable optimization
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {US_DM_PROCESS.map((item) => (
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
          faqs={US_ENGLISH_DM_FAQS}
          title="Questions US leaders ask about connected digital marketing"
          subtitle="Honest answers on scope, supported channels, ROI attribution, and collaboration across US time zones."
          idPrefix="usa-dm-faq"
          variant="slate"
        />

        {/* SIBLING USA LINKS */}
        <UsaSiblingServicesBand
          currentSlug="digital-marketing-company-usa"
          globalServices={[
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Landing Page Development", href: "/services/landing-page-development" },
            { label: "Social Media Marketing", href: "/services/social-media-marketing" },
            { label: "Social Media Advertising", href: "/services/social-media-advertising" },
            { label: "Social Media Management", href: "/services/social-media-management" },
            { label: "Facebook Marketing", href: "/services/facebook-marketing" },
          ]}
        />

        {/* 9. CONSULTATION CTA */}
        <UsaConsultationBanner
          eyebrow="Connect Your US Marketing Stack"
          title="Build a Cohesive Customer Acquisition System Built Around Measurable Growth"
          subtitle="Book a free strategy review to pinpoint leaks across search, landing pages, social media, and tracking."
          primaryLabel="Book a Strategy Review"
          secondaryLabel="Send Project Brief"
          bullets={[
            "Full review of organic search, landing UX & tracking",
            "Only verified channels matched to commercial goals",
            "Clear pricing proposal without agency lock-in",
          ]}
        />
      </div>
    </div>
  );
}
