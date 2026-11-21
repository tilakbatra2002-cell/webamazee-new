"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Globe,
  Megaphone,
  MousePointerClick,
  Network,
  Search,
  Share2,
  Target,
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

type FlowNodeId = "organic" | "landing" | "social" | "analytics";

const FLOW_NODES: {
  id: FlowNodeId;
  num: string;
  label: string;
  role: string;
  summary: string;
  connects: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "organic",
    num: "01",
    label: "Search & Content Discovery",
    role: "Captures active UK demand",
    summary:
      "Technical SEO, service-intent pages, and helpful guides attract prospects already researching your capabilities.",
    connects: "Routes high-intent visitors straight to conversion-ready service pages.",
    href: "/new-seo-services-united-kingdom",
    cta: "UK SEO Services",
  },
  {
    id: "landing",
    num: "02",
    label: "Website & Landing Experience",
    role: "Clarifies value & scope",
    summary:
      "Focused layouts remove doubt around UK service coverage, pricing context, and deliverables before asking for an enquiry.",
    connects: "Turns both search clicks and paid traffic into qualified enquiries.",
    href: "/new-web-designing-company-united-kingdom",
    cta: "UK Web Design",
  },
  {
    id: "social",
    num: "03",
    label: "Social & Paid Amplification",
    role: "Builds authority & targeted reach",
    summary:
      "Consistent LinkedIn, Instagram, Facebook, and paid social campaigns reinforce brand credibility across decision touchpoints.",
    connects: "Feeds qualified audiences directly to dedicated campaign landing pages.",
    href: "/services/social-media-advertising",
    cta: "Social Advertising",
  },
  {
    id: "analytics",
    num: "04",
    label: "Conversion & Attribution",
    role: "Measures real commercial signals",
    summary:
      "Form tracking, Search Console trends, and channel attribution show which activities actually generate enquiries.",
    connects: "Guides ongoing budget and content refinement each cycle.",
    href: "/blog/measuring-marketing-roi",
    cta: "Measurement Guide",
  },
];

const DM_CHALLENGES = [
  {
    code: "01",
    title: "Disconnected Suppliers",
    desc: "When one vendor handles social posts and another handles your website, campaign promises and landing-page journeys quickly fall out of sync.",
  },
  {
    code: "02",
    title: "Social Reach Without Conversion Paths",
    desc: "Posting updates or boosting ads without tailored landing pages and clear scope fails to convert discerning UK buyers.",
  },
  {
    code: "03",
    title: "Over-Reliance on Paid Spend",
    desc: "Without compounding SEO and authoritative site content, enquiries stall immediately whenever campaign budgets pause.",
  },
  {
    code: "04",
    title: "Vanity Reporting Over Lead Quality",
    desc: "Impressions and likes obscure commercial performance when conversion tracking and enquiry attribution are never configured.",
  },
];

const SOCIAL_CHANNELS = [
  {
    name: "Social Media Management",
    desc: "Consistent calendars, on-brand design, and community engagement across active business profiles.",
    href: "/services/social-media-management",
  },
  {
    name: "Social Media Marketing",
    desc: "Goal-driven social campaigns engineered to connect audience attention to site traffic and enquiries.",
    href: "/services/social-media-marketing",
  },
  {
    name: "LinkedIn Marketing",
    desc: "B2B positioning, executive thought leadership, and relationship-led visibility with UK decision-makers.",
    href: "/services/linkedin-marketing",
  },
  {
    name: "Instagram & Facebook Marketing",
    desc: "Visual storytelling, Reels, and location-aware consumer engagement tailored to retail and local brands.",
    href: "/services/instagram-marketing",
  },
];

const CONVERSION_PILLARS = [
  {
    title: "Message Match From Click to Page",
    desc: "Campaign headlines, search snippets, and landing-page value statements mirror the buyer's exact query.",
  },
  {
    title: "Proportionate Enquiry Forms",
    desc: "Short, mobile-friendly forms request only what is needed for a practical response—paired with direct Calendly booking.",
  },
  {
    title: "Contextual Proof Placement",
    desc: "Process clarity, relevant portfolio examples, and direct FAQs sit beside enquiry prompts rather than hidden away.",
  },
];

const INTEGRATED_MATRIX = [
  {
    stage: "Awareness & Discovery",
    channels: "SEO Foundations · Educational Blog Content · LinkedIn & Instagram",
    goal: "Reach UK prospects actively researching challenges or comparing market options.",
  },
  {
    stage: "Evaluation & Consideration",
    channels: "UK Service Pages · Case Studies · Retargeting & Social Proof",
    goal: "Clarify scope, service area, process, and realistic outcomes before contact.",
  },
  {
    stage: "Conversion & Measurement",
    channels: "Landing Pages · Short Enquiry Forms · GA4 & Search Console Tracking",
    goal: "Turn qualified visits into booked consultations and attribute every source cleanly.",
  },
];

const WORKING_PHASES = [
  {
    step: "01",
    title: "Discovery & Market Research",
    desc: "Clarify commercial priorities, UK buyer expectations, current website health, and search demand.",
  },
  {
    step: "02",
    title: "Competitor & Funnel Audit",
    desc: "Identify positioning gaps, channel weaknesses, and friction across existing landing journeys.",
  },
  {
    step: "03",
    title: "Integrated Channel Strategy",
    desc: "Define how SEO, website UX, content, social channels, and paid campaigns work together under one plan.",
  },
  {
    step: "04",
    title: "Website & Campaign Execution",
    desc: "Ship landing pages, technical SEO updates, editorial assets, and tracking events cleanly.",
  },
  {
    step: "05",
    title: "Measurement & Iteration",
    desc: "Review conversion quality, attribution data, and search visibility to refine priorities each cycle.",
  },
];

export function UkDigitalMarketingRedesign({
  page,
}: {
  page: CommercialLocationPage;
}) {
  const [activeNodeId, setActiveNodeId] = useState<FlowNodeId>("organic");
  const activeNode =
    FLOW_NODES.find((node) => node.id === activeNodeId) ?? FLOW_NODES[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. DISTINCTIVE DIGITAL GROWTH HERO */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UkBreadcrumb current="Digital Marketing UK" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United Kingdom · Connected Growth
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.3rem]">
                  Connected Digital Marketing Built for{" "}
                  <span className="text-[#0f6dff]">UK Commercial Growth</span>
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  More than social posting alone—Webamazee connects search
                  visibility, conversion-focused website UX, authoritative
                  content, social amplification, and accountable measurement
                  into one unified UK acquisition strategy.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Get a Free Marketing Audit
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#dm-challenges" className={SECONDARY_BTN}>
                    Explore Growth Framework
                  </Link>
                </div>
              </div>

              {/* Right: Interactive Connected Acquisition System Diagram */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_60px_-26px_rgba(11,21,40,0.18)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#0f6dff] text-white">
                        <Network aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-bold text-[#0b1528]">
                          Connected UK Acquisition Loop
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Click any stage to inspect channel coordination
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Nodes Selector */}
                  <div
                    role="tablist"
                    aria-label="Digital marketing acquisition loop"
                    className="mt-4 grid grid-cols-2 gap-2.5"
                  >
                    {FLOW_NODES.map((node) => {
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
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-display text-[11px] font-bold ${
                                active ? "text-[#0f6dff]" : "text-slate-400"
                              }`}
                            >
                              {node.num}
                            </span>
                            {active && (
                              <span className="h-2 w-2 rounded-full bg-[#0f6dff]" />
                            )}
                          </div>
                          <p className="mt-1 font-display text-[13px] font-bold leading-snug text-[#0b1528]">
                            {node.label}
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            {node.role}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Node Details */}
                  <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#0b1528] p-5 text-white">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#60a5fa]">
                          Stage {activeNode.num} · {activeNode.role}
                        </p>
                        <h2 className="mt-1 font-display text-lg font-bold text-white">
                          {activeNode.label}
                        </h2>
                      </div>
                      <Link
                        href={activeNode.href}
                        className="rounded-full bg-[#0f6dff] px-3.5 py-1 text-[11.5px] font-semibold text-white transition-colors hover:bg-[#1f7bff]"
                      >
                        {activeNode.cta} -&gt;
                      </Link>
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-300">
                      {activeNode.summary}
                    </p>
                    <div className="mt-4 border-t border-white/15 pt-3 text-[12px] text-[#7bb2ff]">
                      <strong>Integration: </strong>
                      {activeNode.connects}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DIGITAL MARKETING CHALLENGES */}
        <section
          id="dm-challenges"
          className="scroll-mt-24 border-b border-slate-200/80 bg-white py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Digital Marketing Challenges</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Why isolated channels stall in competitive UK markets
                </h2>
                <div className="mt-5 space-y-4 text-[15.5px] leading-[1.7] text-slate-600">
                  {page.intro.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
                  {DM_CHALLENGES.map((c) => (
                    <div key={c.code} className="bg-white p-6 sm:p-7">
                      <span className="font-display text-[11px] font-bold tracking-[0.14em] text-[#0f6dff]">
                        {c.code}
                      </span>
                      <h3 className="mt-2 font-display text-lg font-bold text-[#0b1528]">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SEO & ORGANIC ACQUISITION + 4. WEBSITE & LANDING-PAGE OPTIMISATION */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-2">
              {/* SEO & Organic Acquisition */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                    <Search aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className={`${EYEBROW} mt-5`}>SEO &amp; Organic Acquisition</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Build compounding search demand across UK commercial queries
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                    Organic search puts your offer in front of UK prospects who
                    are already actively evaluating providers. By pairing
                    technical site health with commercial keyword architecture,
                    search becomes a durable foundation rather than rented
                    attention.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5">
                  <Link
                    href="/new-seo-services-united-kingdom"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore UK SEO Strategy
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/services/seo-services"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Core SEO Services
                  </Link>
                </div>
              </div>

              {/* Website & Landing Page Optimisation */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#0f6dff]/25 bg-white p-7 sm:p-9">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff]">
                    <MousePointerClick aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className={`${EYEBROW} mt-5`}>
                    Website &amp; Landing-Page Optimisation
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Convert search and campaign visits without friction
                  </h2>
                  <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                    Marketing only scales as reliably as the page visitors land
                    on. We build dedicated campaign landing pages and execute
                    search-safe website redesigns so messaging, mobile speed,
                    and enquiry paths hold together seamlessly.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-4 border-t border-slate-100 pt-5">
                  <Link
                    href="/new-web-designing-company-united-kingdom"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    UK Web Design Studio
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/services/landing-page-development"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Landing Page Builds
                  </Link>
                  <Link
                    href="/services/website-redesign"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Website Redesign
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTENT MARKETING */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className={EYEBROW}>Content Marketing</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Credible content that answers UK buyer questions before sales
                  conversations start
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-600">
                  UK B2B and consumer buyers research thoroughly prior to making
                  contact. Useful guides, cost breakdowns, comparison hubs, and
                  clear service copy build confidence and feed both SEO and
                  social channels simultaneously.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/services/ai-content-optimization"
                    className={PRIMARY_BTN}
                  >
                    Content Optimisation Service
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="/blog" className={SECONDARY_BTN}>
                    Read Our Guides
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {[
                  {
                    icon: FileText,
                    title: "Decision-Stage Service Guides",
                    desc: "Detailed breakdowns explaining scope, delivery steps, and buyer expectations.",
                  },
                  {
                    icon: Globe,
                    title: "Topical SEO Hubs",
                    desc: "Interconnected guides linking informational readers toward commercial solutions.",
                  },
                  {
                    icon: Target,
                    title: "Campaign Asset Alignment",
                    desc: "Practical educational resources used across LinkedIn and email follow-ups.",
                  },
                  {
                    icon: BarChart3,
                    title: "Editorial Refresh Cycles",
                    desc: "Keeping key service pages accurate, current, and aligned with search intent.",
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 text-[#0f6dff]"
                      />
                      <h3 className="mt-3 font-display text-base font-bold text-[#0b1528]">
                        {c.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                        {c.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. SOCIAL MEDIA MARKETING & 7. PAID ADVERTISING */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              {/* Social Media Marketing */}
              <div className="lg:col-span-7">
                <p className={EYEBROW}>Social Media Marketing</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Platform presence matched to B2B &amp; consumer buyers
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-slate-600">
                  Social channels reinforce visibility and authority when
                  content reflects your real expertise and connects clearly back
                  to website journeys.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {SOCIAL_CHANNELS.map((ch) => (
                    <Link
                      key={ch.href}
                      href={ch.href}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 transition-all hover:border-[#0f6dff]/40 hover:bg-white"
                    >
                      <div>
                        <Share2
                          aria-hidden="true"
                          className="h-4 w-4 text-[#0f6dff]"
                        />
                        <h3 className="mt-3 font-display text-base font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                          {ch.name}
                        </h3>
                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                          {ch.desc}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#0f6dff]">
                        Explore service
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Paid Advertising (supported services) */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#0f6dff]/25 bg-[#f4f8ff] p-7 sm:p-8">
                  <div>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-[#0f6dff]/15">
                      <Megaphone aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <p className={`${EYEBROW} mt-5`}>
                      Paid Social &amp; Campaign Pages
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                      Accountable paid reach backed by conversion tracking
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                      Where paid promotion fits your commercial offer, we manage
                      targeted social advertising across Meta and LinkedIn
                      paired with dedicated landing pages and event tracking so
                      spend stays measurable.
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-slate-200/80 pt-5 text-[13.5px] font-medium text-[#0b1528]">
                      <li>• Conversion tracking configured before launch</li>
                      <li>• Audience segmentation, retargeting &amp; ad creative testing</li>
                      <li>• Dedicated landing pages aligned to each ad set</li>
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      href="/services/social-media-advertising"
                      className={PRIMARY_BTN}
                    >
                      Paid Social Service
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/services/facebook-marketing"
                      className="inline-flex items-center px-2 py-2 text-[13px] font-semibold text-[#0b1528] hover:text-[#0f6dff]"
                    >
                      Facebook Campaigns -&gt;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CONVERSION OPTIMISATION */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Conversion Optimisation
                </p>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Turn existing traffic into higher-quality enquiries
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.72] text-slate-300">
                  Acquiring visitors costs more when landing pages leave buyers
                  unsure about fit, scope, or next steps. Conversion work
                  tightens UX clarity so traffic across all channels works
                  harder.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:col-span-7">
                {CONVERSION_PILLARS.map((cp, idx) => (
                  <div
                    key={cp.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#60a5fa]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 font-display text-base font-bold text-white">
                      {cp.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                      {cp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 9. ANALYTICS & PERFORMANCE MEASUREMENT */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <p className={EYEBROW}>Analytics &amp; Measurement</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Reporting anchored to enquiries and conversion quality
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  Every marketing programme requires clean measurement before
                  scaling. We configure GA4 events, Search Console reporting,
                  and campaign attribution so decisions stay grounded in real
                  buyer actions rather than raw click counts.
                </p>
                <div className="mt-6">
                  <Link
                    href="/blog/measuring-marketing-roi"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Read our guide on measuring marketing ROI
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
                {[
                  { label: "Enquiry & Booking Events", detail: "Track completed contact forms and Calendly bookings cleanly." },
                  { label: "Organic Query Trends", detail: "Search Console impression, click, and landing-page monitoring." },
                  { label: "Channel Attribution", detail: "Compare qualified enquiries by organic, social, and campaign landing pages." },
                  { label: "Lead Quality Review", detail: "Separate relevant UK commercial opportunities from casual noise." },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"
                  >
                    <p className="font-display text-base font-bold text-[#0b1528]">
                      {m.label}
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. INTEGRATED MARKETING STRATEGY */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Integrated Strategy Matrix</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                How every channel reinforces one coherent UK funnel
              </h2>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="divide-y divide-slate-200">
                {INTEGRATED_MATRIX.map((row, idx) => (
                  <div
                    key={row.stage}
                    className="grid gap-4 p-6 lg:grid-cols-12 lg:items-center"
                  >
                    <div className="flex items-center gap-3 lg:col-span-3">
                      <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                        0{idx + 1}
                      </span>
                      <h3 className="font-display text-lg font-bold text-[#0b1528]">
                        {row.stage}
                      </h3>
                    </div>
                    <div className="text-[14px] font-semibold text-[#0b1528] lg:col-span-4">
                      {row.channels}
                    </div>
                    <div className="text-[14px] leading-relaxed text-slate-600 lg:col-span-5">
                      {row.goal}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. INDUSTRIES SERVED */}
        <UkIndustriesBand
          title="Growth frameworks built around UK sector expectations"
          variant="white"
        />

        {/* 12. WORKING PROCESS */}
        <section className="border-y border-slate-200/80 bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Working Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Transparent progression from audit to ongoing optimisation
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-5">
              {WORKING_PHASES.map((phase) => (
                <div
                  key={phase.step}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <span className="font-display text-xs font-bold tracking-[0.14em] text-[#0f6dff]">
                    {phase.step}
                  </span>
                  <h3 className="mt-2.5 font-display text-base font-bold text-[#0b1528]">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. RELEVANT FAQS */}
        <UkFaqBand
          faqs={page.faqs}
          title="Questions about digital marketing in the UK"
          subtitle="Clear answers on channel scope, reporting, collaboration with internal UK teams, and realistic measurement."
          idPrefix="uk-dm-faq"
          variant="white"
        />

        {/* SIBLING UK LINKS */}
        <UkSiblingServicesBand
          currentSlug="digital-marketing-company-uk"
          globalServices={[
            { label: "SEO Services", href: "/services/seo-services" },
            { label: "Social Media Management", href: "/services/social-media-management" },
            { label: "Social Media Advertising", href: "/services/social-media-advertising" },
            { label: "LinkedIn Marketing", href: "/services/linkedin-marketing" },
            { label: "Landing Page Development", href: "/services/landing-page-development" },
          ]}
        />

        {/* 14. CONSULTATION CTA */}
        <UkConsultationBanner
          eyebrow="Align Your UK Growth Channels"
          title="Build a Connected Digital Marketing System That Earns Enquiries"
          subtitle="Schedule a consultation to review your website, search presence, and channel gaps—with clear recommendations before committing budget."
          primaryLabel="Book a Free Consultation"
          secondaryLabel="Get a Free Proposal"
          bullets={[
            "Review search, site conversion & social alignment",
            "Identify wasted spend or disconnected journeys",
            "Receive a clear, written action roadmap",
          ]}
        />
      </div>
    </div>
  );
}
