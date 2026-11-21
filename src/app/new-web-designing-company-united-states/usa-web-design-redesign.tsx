"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Code2,
  Gauge,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import type { LocationPage } from "@/lib/locations";
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

type ArchetypeKey = "b2b" | "ecommerce" | "landing";

const ARCHETYPES: {
  id: ArchetypeKey;
  label: string;
  domain: string;
  headline: string;
  subcopy: string;
  leftCardTitle: string;
  leftCardItems: string[];
  rightCardLabel: string;
  rightCardTitle: string;
  rightCardMetric: string;
  badge: string;
}[] = [
  {
    id: "b2b",
    label: "B2B & SaaS",
    domain: "us-b2b-platform.preview",
    headline: "Category Positioning & Proof-Led Demos",
    subcopy:
      "Clear buyer segmentation, transparent capabilities, and friction-free demo requests built for fast-moving US decision makers.",
    leftCardTitle: "Buyer Confidence Blocks",
    leftCardItems: [
      "Clear use-case & industry routing",
      "Side-by-side plan or scope clarity",
      "Direct calendar & short form capture",
    ],
    rightCardLabel: "PRIMARY ACTION",
    rightCardTitle: "Book a 30-Min Scope Review",
    rightCardMetric: "Zero multi-page form fatigue",
    badge: "Semantic HTML5 · Fast First Paint",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    domain: "us-storefront-ux.preview",
    headline: "Structured Catalog Discovery & Clean Checkout",
    subcopy:
      "Category filters, informative product pages, and responsive cart transitions designed to convert mobile shoppers cleanly.",
    leftCardTitle: "Merchandising Architecture",
    leftCardItems: [
      "Filterable collections & schema markup",
      "Fast product image optimization",
      "Transparent shipping & policy clarity",
    ],
    rightCardLabel: "CHECKOUT PATH",
    rightCardTitle: "Frictionless Cart-to-Order Flow",
    rightCardMetric: "Clean mobile tap targets",
    badge: "WooCommerce · Shopify · Custom",
  },
  {
    id: "landing",
    label: "Landing Pages",
    domain: "us-campaign-offer.preview",
    headline: "Single-Goal Campaign Conversion Pages",
    subcopy:
      "Distraction-free landing pages aligned 1:1 with search or social campaign messaging so ad spend never lands on generic pages.",
    leftCardTitle: "Message-Match Structure",
    leftCardItems: [
      "Zero competing navigation leaks",
      "Focused objection-handling FAQs",
      "Clean event & form conversion tracking",
    ],
    rightCardLabel: "CONVERSION RAIL",
    rightCardTitle: "2-Step Quote & Audit Capture",
    rightCardMetric: "GA4 & Search Console attributed",
    badge: "High-Intent Paid & Organic Ready",
  },
];

const CUSTOM_BUILD_STACKS = [
  {
    name: "Next.js & React",
    role: "Custom web applications & high-speed marketing sites",
    desc: "Tailored interfaces where visual precision, interactive tools, and sub-second page transitions matter.",
  },
  {
    name: "WordPress & Custom Themes",
    role: "Manageable editorial & multi-service business sites",
    desc: "Clean, modular CMS setups without bloated page-builder overhead so US marketing teams can publish easily.",
  },
  {
    name: "Shopify & WooCommerce",
    role: "Scalable US online retail & D2C storefronts",
    desc: "Reliable catalog management, payment gateway integrations, and technical product SEO out of the box.",
  },
  {
    name: "Landing Systems & CRM Hooks",
    role: "Campaign-ready forms & analytics integration",
    desc: "Structured inquiry forms, Calendly scheduling embeds, and clean CRM/GA4 conversion tracking.",
  },
];

const MIGRATION_SAFEGUARDS = [
  {
    code: "01",
    title: "Pre-Build URL & Link Inventory",
    desc: "Export all indexed URLs, top-performing organic pages, and external backlinks before wireframing begins.",
  },
  {
    code: "02",
    title: "1:1 301 Redirect Mapping",
    desc: "Map every legacy path directly to its new equivalent so users and Google crawlers never hit dead 404s.",
  },
  {
    code: "03",
    title: "Metadata & Schema Preservation",
    desc: "Carry over proven page titles, semantic H1 hierarchies, canonical tags, and structured data cleanly.",
  },
  {
    code: "04",
    title: "Post-Launch Index Monitoring",
    desc: "Validate XML sitemaps, crawl errors, and status codes in Search Console immediately after cutover.",
  },
];

const FOUNDATIONS_GRID = [
  {
    title: "Responsive Mobile UX",
    icon: Smartphone,
    points: [
      "Thumb-friendly tap targets & navigation",
      "Zero horizontal overflow across viewports",
      "Readable body hierarchy on small screens",
    ],
  },
  {
    title: "Accessibility Hygiene",
    icon: Accessibility,
    points: [
      "WCAG AA color contrast compliance",
      "Keyboard-focusable menus & interactive controls",
      "Semantic landmarks & descriptive alt text",
    ],
  },
  {
    title: "Speed & Core Web Vitals",
    icon: Gauge,
    points: [
      "Lean CSS/JS bundles & minimal script drag",
      "WebP/AVIF image sizing & layout stability",
      "Fast server response for coast-to-coast US load",
    ],
  },
  {
    title: "Technical SEO Architecture",
    icon: Code2,
    points: [
      "Clean canonicals & XML sitemap indexing",
      "Intent-mapped internal linking hubs",
      "Organization, Service & FAQ JSON-LD schema",
    ],
  },
];

const US_DEV_PROCESS = [
  {
    step: "01",
    title: "Offer & Competitor Audit",
    desc: "Clarify your US audience, positioning differentiators, existing URLs, and conversion goals.",
  },
  {
    step: "02",
    title: "Information Architecture & Wireframes",
    desc: "Design page flows, service hierarchies, and conversion hooks in Figma before writing code.",
  },
  {
    step: "03",
    title: "Front-End & CMS Engineering",
    desc: "Build clean, responsive templates, CMS blocks, or e-commerce flows with performance baked in.",
  },
  {
    step: "04",
    title: "Accessibility, Speed & Migration QA",
    desc: "Test forms, responsive breakpoints, Core Web Vitals, redirect rules, and schema markup on staging.",
  },
  {
    step: "05",
    title: "Launch & Team Handover",
    desc: "Deploy smoothly, verify Search Console indexing, and train your team on ongoing content updates.",
  },
];

const US_ENGLISH_WEB_FAQS = [
  {
    q: "How much does a custom website cost for a US business?",
    a: "Pricing depends on page count, custom UI design requirements, integrations, and e-commerce catalog scope. We provide a clear, itemized proposal after an initial discovery call.",
  },
  {
    q: "How long does website design and development take?",
    a: "Timeline depends on project complexity, copy readiness, and feedback cycles. We share realistic milestone dates before kickoff and keep delivery moving with weekly staging reviews.",
  },
  {
    q: "Can Webamazee redesign an existing US website without losing Google rankings?",
    a: "Yes. We inventory valuable existing URLs, preserve strong content and metadata, and build a verified 301 redirect map before launching the new site.",
  },
  {
    q: "Do you build dedicated campaign landing pages?",
    a: "Yes. We design fast, focused landing pages aligned around one conversion goal for search campaigns, paid social ads, or specific B2B product launches.",
  },
  {
    q: "Can you build a scalable e-commerce storefront for US customers?",
    a: "Yes. Our e-commerce development covers structured category navigation, product detail UX, shipping clarity, checkout optimization, and store management.",
  },
  {
    q: "Do your websites follow speed, accessibility, and technical SEO best practices?",
    a: "Yes. Semantic HTML, responsive layouts, accessible keyboard/contrast standards, fast Core Web Vitals, and clean technical markup are built into every project.",
  },
  {
    q: "Will our team be able to update copy and pages after launch?",
    a: "Yes. We build clean editorial interfaces and provide documented handover training so internal teams can update copy, blogs, and landing content independently.",
  },
  {
    q: "How does Webamazee collaborate remotely with US teams?",
    a: "We work with US companies across EST, CST, MST, and PST using scheduled overlap calls, async staging walkthroughs, and transparent written milestones—without claiming a US physical office.",
  },
  {
    q: "Is ongoing website support available after launch?",
    a: "Yes. Post-launch maintenance, feature additions, SEO optimization, and landing-page expansion can be scoped around your ongoing roadmap.",
  },
  {
    q: "What should our team prepare before starting a website project?",
    a: "Having clarity on your core services, target US audience, desired customer conversion action, and any existing analytics or brand guidelines gives the project a fast start.",
  },
];

export function UsaWebDesignRedesign({ page }: { page: LocationPage }) {
  const [archetype, setArchetype] = useState<ArchetypeKey>("b2b");
  const activeView =
    ARCHETYPES.find((a) => a.id === archetype) ?? ARCHETYPES[0];

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. DESIGN-LED HERO WITH INTERACTIVE US WEBSITE ARCHETYPE SHOWCASE */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-white to-white py-12 sm:py-16 lg:py-20">
          <div className={CONTAINER}>
            <UsaBreadcrumb current="Web Design & Development" />

            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px]">
                    United States · Custom Web Engineering
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.2rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[2.95rem] lg:text-[3.25rem]">
                  Web Design &amp; Development Built to Win{" "}
                  <span className="text-[#0f6dff]">US Buyer Trust</span>
                </h1>

                <p className="mt-5 text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  In crowded American categories, visitors compare options in
                  seconds. Webamazee builds fast, focused websites, e-commerce
                  storefronts, and landing pages engineered for clarity,
                  accessibility, and measurable conversion.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Plan Your US Website
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#us-capabilities" className={SECONDARY_BTN}>
                    Explore Capabilities
                  </Link>
                </div>

                <p className="mt-6 text-[13px] leading-relaxed text-slate-500">
                  Remote international design &amp; engineering partner serving US
                  businesses across all time zones.
                </p>
              </div>

              {/* Right: Multi-Archetype US Website Showcase */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_26px_65px_-28px_rgba(11,21,40,0.22)] sm:p-6">
                  {/* Browser Bar + Archetype Selector */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0f6dff]" />
                      <span className="ml-2 rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-600">
                        {activeView.domain}
                      </span>
                    </div>

                    <div
                      role="tablist"
                      aria-label="US website archetypes"
                      className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1"
                    >
                      {ARCHETYPES.map((item) => {
                        const selected = item.id === activeView.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setArchetype(item.id)}
                            className={`rounded-lg px-3 py-1.5 text-[11.5px] font-semibold transition-all ${
                              selected
                                ? "bg-white text-[#0f6dff] shadow-sm"
                                : "text-slate-600 hover:text-[#0b1528]"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Viewport Frame */}
                  <div className="mt-4 rounded-xl border border-slate-200 bg-[#f8fbff] p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <span className="font-display text-xs font-bold text-[#0b1528]">
                        {activeView.headline}
                      </span>
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[10.5px] font-semibold text-[#0f6dff] ring-1 ring-[#0f6dff]/20">
                        {activeView.badge}
                      </span>
                    </div>

                    <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
                      {activeView.subcopy}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-12">
                      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-7">
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                          {activeView.leftCardTitle}
                        </p>
                        <ul className="mt-3 space-y-2 text-[12.5px] text-[#0b1528]">
                          {activeView.leftCardItems.map((pt) => (
                            <li key={pt} className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col justify-between rounded-xl bg-[#0b1528] p-4 text-white sm:col-span-5">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7bb2ff]">
                            {activeView.rightCardLabel}
                          </p>
                          <p className="mt-2 font-display text-sm font-bold leading-snug text-white">
                            {activeView.rightCardTitle}
                          </p>
                          <p className="mt-2 text-[11.5px] text-slate-300">
                            {activeView.rightCardMetric}
                          </p>
                        </div>
                        <span className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#0f6dff] py-2 text-[11px] font-semibold text-white">
                          Interactive Prototype Preview
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. US COMPETITIVE POSITIONING */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>US Digital Strategy</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Competing on specificity in crowded American categories
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
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. CUSTOM WEBSITE DEVELOPMENT & 4. BUSINESS WEBSITE DESIGN */}
        <section
          id="us-capabilities"
          className="scroll-mt-24 bg-[#f4f8ff] py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className={EYEBROW}>Custom Development &amp; Business UX</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Engineered for performance, scalability, and everyday business
                  control
                </h2>
                <p className="mt-4 text-[15.5px] leading-[1.7] text-slate-600">
                  Whether your team needs custom Next.js/React interfaces or a
                  clean WordPress CMS marketing site, every build prioritizes
                  conversion clarity, mobile responsiveness, and maintainable
                  code.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/services/website-development"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Website Development
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/blog/web-developer-cost-guide-2026"
                    className="text-[14px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Read Cost &amp; Scope Guide
                  </Link>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
                {CUSTOM_BUILD_STACKS.map((stack) => (
                  <div
                    key={stack.name}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                      {stack.role}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-[#0b1528]">
                      {stack.name}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                      {stack.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. E-COMMERCE DEVELOPMENT + 6. DEDICATED LANDING PAGES */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-8 lg:grid-cols-12">
              {/* E-commerce showcase */}
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#f8fafc] p-7 sm:p-9 lg:col-span-7">
                <div className="grid items-center gap-6 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                      <ShoppingBag aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <p className={`${EYEBROW} mt-4`}>E-Commerce Development</p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                      Fast online stores designed for product discovery &amp;
                      checkout confidence
                    </h2>
                    <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                      We structure category taxonomies, fast product imagery,
                      transparent shipping details, and seamless checkout paths so
                      US shoppers complete orders smoothly on mobile and desktop.
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <Link
                      href="/work/kabir-oil-mill"
                      className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                      <Image
                        src="/images/portfolio/kabir-oil-mill-live-homepage.webp"
                        alt="Kabir Oil Mill live e-commerce storefront screenshot"
                        fill
                        sizes="(max-width: 768px) 100vw, 240px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </Link>
                    <p className="mt-2 text-[11.5px] text-slate-500">
                      International storefront build: Kabir Oil Mill (India)
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-5 border-t border-slate-200/80 pt-5">
                  <Link
                    href="/services/ecommerce-development"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore E-Commerce Development
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/blog/ecommerce-seo-strategy"
                    className="text-[13.5px] font-medium text-slate-600 hover:text-[#0b1528]"
                  >
                    Read E-Commerce SEO Guide
                  </Link>
                </div>
              </div>

              {/* Dedicated Landing Pages */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#0f6dff]/25 bg-[#f4f8ff] p-7 sm:p-9 lg:col-span-5">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-[#0f6dff]/20">
                    <MousePointerClick aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className={`${EYEBROW} mt-4`}>Landing Page Design</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#0b1528]">
                    Focused landing pages built for campaigns &amp; offers
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-slate-600">
                    Sending paid or organic campaign traffic to a crowded
                    homepage lowers conversion rates. We design dedicated landing
                    pages with strict message match, visible social/process
                    proof, and clean conversion tracking.
                  </p>
                </div>
                <div className="mt-6 border-t border-[#0f6dff]/15 pt-5">
                  <Link
                    href="/services/landing-page-development"
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:underline"
                  >
                    Explore Landing Page Development
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. WEBSITE REDESIGN & SEO-SAFE MIGRATION */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
                  Website Redesign &amp; Migration
                </div>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.13] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Modernize an outdated US site without throwing away organic
                  rankings
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-300">
                  Visual refreshes should grow qualified leads—never trigger a
                  post-launch traffic collapse. We safeguard valuable pages,
                  backlinks, and metadata across every migration step.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link
                    href="/services/website-redesign"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#7bb2ff] hover:text-white"
                  >
                    Website Redesign Service
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/blog/redesign-before-after-seo"
                    className="text-[14px] font-medium text-slate-300 hover:text-white"
                  >
                    Redesign SEO Checklist
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {MIGRATION_SAFEGUARDS.map((item) => (
                  <div
                    key={item.code}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                  >
                    <span className="font-display text-xs font-bold tracking-[0.14em] text-[#60a5fa]">
                      {item.code}
                    </span>
                    <h3 className="mt-2.5 font-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. RESPONSIVE UX, ACCESSIBILITY, SPEED & SEO FOUNDATIONS */}
        <section className="border-b border-slate-200/80 bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Engineering Standards</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Responsive UX, accessibility, speed, and technical SEO baked in
                </h2>
              </div>
              <Link
                href="/blog/core-web-vitals-guide"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] hover:underline"
              >
                Core Web Vitals Guide
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FOUNDATIONS_GRID.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#0b1528]">
                      {card.title}
                    </h3>
                    <ul className="mt-3 space-y-2 text-[13.5px] text-slate-600">
                      {card.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <ShieldCheck
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. INDUSTRIES SERVED */}
        <UsaIndustriesBand
          title="Websites structured for how US sector buyers evaluate options"
          variant="mist"
        />

        {/* 10. EXISTING VERIFIED CASE STUDIES */}
        <UsaCaseStudiesBand variant="white" />

        {/* 11. DEVELOPMENT PROCESS */}
        <section className="border-t border-slate-200/80 bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Development Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                Five disciplined phases from discovery to clean handover
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
              {US_DEV_PROCESS.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
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

        {/* 12. RELEVANT FAQS */}
        <UsaFaqBand
          faqs={US_ENGLISH_WEB_FAQS}
          title="Questions US teams ask before starting a build"
          subtitle="Clear answers on scope, timing, e-commerce, SEO-safe redesigns, accessibility, and remote collaboration."
          idPrefix="usa-web-faq"
          variant="white"
        />

        {/* SIBLING USA LINKS */}
        <UsaSiblingServicesBand
          currentSlug="web-designing-company-united-states"
          globalServices={[
            { label: "Website Development", href: "/services/website-development" },
            { label: "E-Commerce Development", href: "/services/ecommerce-development" },
            { label: "Landing Page Development", href: "/services/landing-page-development" },
            { label: "Website Redesign", href: "/services/website-redesign" },
            { label: "Technical SEO", href: "/services/technical-seo" },
          ]}
        />

        {/* PROJECT CONSULTATION CTA */}
        <UsaConsultationBanner
          eyebrow="Start Your US Website Project"
          title="Build a Faster, Clearer Website Engineered for US Conversion"
          subtitle="Book a consultation or share your existing site URL to review UX gaps, migration risks, and practical build milestones."
          primaryLabel="Schedule a Consultation"
          secondaryLabel="Discuss Your Website"
          bullets={[
            "Review offer clarity, UX speed & migration needs",
            "Clear scope & fixed written proposal after discovery",
            "EST–PST meeting overlap with documented staging QA",
          ]}
        />
      </div>
    </div>
  );
}
