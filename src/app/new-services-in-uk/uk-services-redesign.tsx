"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  ChevronDown,
  Compass,
  Globe,
  Layers,
  LayoutGrid,
  LineChart,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import type { LocationHub } from "@/lib/location-hubs";
import { site } from "@/lib/site";

const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const EYEBROW =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const SECTION_H2 =
  "font-display text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#0b1528] sm:text-[2.375rem] lg:text-[2.625rem]";
const PRIMARY_BTN =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(15,109,255,0.6)] transition-all duration-200 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
const SECONDARY_BTN =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-[14px] font-semibold text-[#0b1528] transition-all duration-200 hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

type BlueprintLayer = {
  id: string;
  step: string;
  label: string;
  focus: string;
  summary: string;
  outcomes: string[];
  href: string;
  cta: string;
};

const HERO_BLUEPRINT_LAYERS: BlueprintLayer[] = [
  {
    id: "web",
    step: "01",
    label: "Web Architecture",
    focus: "Conversion-Ready Foundations",
    summary:
      "Fast, structured pages that clarify regional or UK-wide service scope and guide buyers toward enquiry.",
    outcomes: [
      "Clear service positioning",
      "Responsive mobile journeys",
      "Clean URL & redirect care",
    ],
    href: "/web-designing-company-united-kingdom",
    cta: "UK Web Design",
  },
  {
    id: "seo",
    step: "02",
    label: "Technical & Organic SEO",
    focus: "Search Visibility & Intent",
    summary:
      "Semantic hierarchy, technical site health, and commercial keyword structure aligned to UK search demand.",
    outcomes: [
      "Technical crawl & speed audit",
      "Local vs nationwide hierarchy",
      "Established URL preservation",
    ],
    href: "/seo-services-united-kingdom",
    cta: "UK SEO Services",
  },
  {
    id: "digital",
    step: "03",
    label: "Digital Marketing",
    focus: "Connected Demand & Landing Flows",
    summary:
      "Campaign landing pages, content journeys, and analytics measurement tied directly to qualified enquiries.",
    outcomes: [
      "Dedicated campaign pages",
      "Search & funnel alignment",
      "Consistent conversion tracking",
    ],
    href: "/digital-marketing-company-uk",
    cta: "UK Digital Marketing",
  },
  {
    id: "ai",
    step: "04",
    label: "AI-Assisted Strategy",
    focus: "Human-Led Speed & Editorial Control",
    summary:
      "AI-accelerated market, competitor, and topic research paired with human strategy, brand accuracy, and QA.",
    outcomes: [
      "Structured research workflows",
      "Human-edited brand voice",
      "AI search readiness checks",
    ],
    href: "/ai-marketing-company-uk",
    cta: "UK AI Marketing",
  },
];

const TRUST_PRINCIPLES = [
  {
    code: "01",
    title: "Clear Project Scope",
    desc: "Deliverables, page requirements, and priorities are documented upfront so UK stakeholders know exactly what is included.",
  },
  {
    code: "02",
    title: "Strategic Planning",
    desc: "Information architecture, buyer intent, and conversion paths are mapped before design or development begins.",
  },
  {
    code: "03",
    title: "Conversion-Focused Development",
    desc: "Service pages, pricing context, and enquiry forms are engineered to remove friction on desktop and mobile.",
  },
  {
    code: "04",
    title: "Search-Friendly Architecture",
    desc: "Clean semantic markup, logical internal linking, and URL redirect planning protect and build search visibility.",
  },
  {
    code: "05",
    title: "Transparent Communication",
    desc: "Written progress notes, structured review milestones, and clear sign-offs keep decisions moving without guesswork.",
  },
  {
    code: "06",
    title: "Remote Collaboration",
    desc: "Planned UK time-zone overlap for live calls paired with responsive asynchronous reviews across your team.",
  },
];

const CORE_SERVICES = [
  {
    num: "01",
    title: "Website Design & Development",
    tag: "Design · Engineering · Redesign",
    description:
      "Plan and build a fast, credible website tailored to how UK customers evaluate expertise, compare offers, and initiate enquiries.",
    benefits: [
      "Clear service positioning for local or UK-wide audiences",
      "Mobile-first UI/UX with direct enquiry and booking paths",
      "URL migration and redirect planning during redesigns",
    ],
    href: "/web-designing-company-united-kingdom",
    previewHref: "/new-web-designing-company-united-kingdom",
    cta: "Explore UK Web Design",
    icon: LayoutGrid,
  },
  {
    num: "02",
    title: "SEO Services",
    tag: "Technical · On-Page · Local & National",
    description:
      "Strengthen technical health, site structure, and search relevance so qualified UK buyers discover your business organically.",
    benefits: [
      "Technical audits covering speed, indexing, and core signals",
      "Structured page hierarchy for regional or nationwide search",
      "White-hat content and competitor gap analysis",
    ],
    href: "/seo-services-united-kingdom",
    previewHref: "/new-seo-services-united-kingdom",
    cta: "Explore UK SEO Services",
    icon: Search,
  },
  {
    num: "03",
    title: "Digital Marketing",
    tag: "Campaigns · Landing Pages · Analytics",
    description:
      "Connect your website, organic search, campaign landing pages, and measurement under one cohesive acquisition strategy.",
    benefits: [
      "Focused landing pages built around commercial intent",
      "Consistent messaging from search click to enquiry",
      "Clean tracking so marketing decisions stay grounded",
    ],
    href: "/digital-marketing-company-uk",
    previewHref: "/new-digital-marketing-company-uk",
    cta: "Explore UK Digital Marketing",
    icon: LineChart,
  },
  {
    num: "04",
    title: "AI Marketing",
    tag: "Research · AI Search · Human QA",
    description:
      "Accelerate competitive research, content structuring, and AI search readiness with human strategy and editorial oversight.",
    benefits: [
      "Faster research without sacrificing UK brand accuracy",
      "Content built for both traditional search and AI discovery",
      "Strict human review for claims, tone, and clarity",
    ],
    href: "/ai-marketing-company-uk",
    previewHref: "/new-ai-marketing-company-uk",
    cta: "Explore UK AI Marketing",
    icon: Sparkles,
  },
];

const WHY_WEBAMAZEE_POINTS = [
  {
    num: "01",
    title: "Development and marketing under one team",
    desc: "Instead of splitting website engineering, SEO, and landing page execution across separate suppliers, structure and demand generation are planned together from day one.",
  },
  {
    num: "02",
    title: "SEO-conscious website architecture",
    desc: "Headings, internal links, page performance, and URL migration paths are treated as foundational engineering requirements—not late-stage retrofits.",
  },
  {
    num: "03",
    title: "AI-assisted research with human strategy and quality control",
    desc: "We use AI tooling to speed up market analysis and structural research while experienced strategists and editors own positioning, copy accuracy, and quality assurance.",
  },
  {
    num: "04",
    title: "Focus on business goals and measurable outcomes",
    desc: "Work is organised around commercial clarity, qualified enquiries, and user trust rather than inflated vanity metrics or rigid templates.",
  },
  {
    num: "05",
    title: "Support for local, regional and wider markets",
    desc: "Whether you operate in a single UK city, serve regional counties, or compete nationwide, page hierarchy and targeting match your actual service footprint.",
  },
];

const INDUSTRY_DIRECTORY = [
  {
    name: "Professional Services",
    href: "/seo-for-professional-services",
    label: "Consultancies · Legal · Advisory",
    desc: "Authority-driven websites and search architecture that communicate expertise clearly and convert high-consideration B2B enquiries.",
    pillars: [
      "Service & sector authority hubs",
      "Partner & team credibility paths",
      "High-intent consultation journeys",
    ],
    featured: true,
  },
  {
    name: "SaaS",
    href: "/seo-for-saas",
    label: "Software · Cloud · B2B Tech",
    desc: "Product, integration, and comparison journeys engineered for multi-stakeholder research cycles and qualified demo requests.",
    pillars: [
      "Feature & use-case taxonomy",
      "Comparison & alternative pages",
      "Technical SEO for scalable sites",
    ],
    featured: true,
  },
  {
    name: "E-commerce",
    href: "/seo-for-ecommerce",
    label: "Retail · Direct-to-Consumer",
    desc: "Product-led discovery, clean category taxonomy, and streamlined checkout UX aligned with commercial search intent.",
  },
  {
    name: "Healthcare",
    href: "/seo-for-healthcare",
    label: "Clinics · Practices · Providers",
    desc: "Accessible, patient-centred information architecture that makes treatments, practitioners, and booking routes unmistakable.",
  },
  {
    name: "Travel & Tourism",
    href: "/seo-for-tourism",
    label: "Tours · Hospitality · Operators",
    desc: "Destination discovery and itinerary structure designed to move travellers smoothly from browsing to direct enquiry.",
  },
  {
    name: "Local Businesses",
    href: "/seo-for-local-business",
    label: "Regional · Multi-Location Services",
    desc: "Search-ready service pages structured around genuine service areas, local buyer expectations, and mobile contact speed.",
  },
];

type SelectedWorkMeta = {
  slug: string;
  workHref: string;
  caseStudyHref: string;
  country: string;
  category: string;
  year: string;
  image: string;
  imageAlt: string;
  highlights: string[];
};

const WORK_ENRICHMENT: Record<string, SelectedWorkMeta> = {
  "kabir-oil-mill": {
    slug: "kabir-oil-mill",
    workHref: "/work/kabir-oil-mill",
    caseStudyHref: "/case-studies/kabiroilmill",
    country: "India",
    category: "E-Commerce Development",
    year: "2025",
    image: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
    imageAlt: "Kabir Oil Mill live e-commerce website homepage",
    highlights: ["Product catalogue & detail UX", "Connected cart & checkout flow"],
  },
  "wellington-tours": {
    slug: "wellington-tours",
    workHref: "/work/wellington-tours",
    caseStudyHref: "/case-studies/wellingtontours",
    country: "New Zealand",
    category: "Website Development",
    year: "2025",
    image: "/images/portfolio/wellington-tours-live-homepage.webp",
    imageAlt: "Wellington Tours live New Zealand travel website homepage",
    highlights: ["Tour package comparison structure", "Direct enquiry prompts"],
  },
  "shine-gold-tours-india": {
    slug: "shine-gold-tours-india",
    workHref: "/work/shine-gold-tours-india",
    caseStudyHref: "/case-studies/shinegoldtours",
    country: "India",
    category: "Website Redesign",
    year: "2025",
    image: "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
    imageAlt: "Shine Gold Tours India redesigned website homepage",
    highlights: ["Modern UI & content hierarchy", "Responsive lead pathways"],
  },
};

const WORKING_PROCESS = [
  {
    step: "01",
    title: "Discover",
    icon: Compass,
    desc: "Review business priorities, UK target audience, existing site health, competitive context, and current conversion bottlenecks.",
    deliverable: "Discovery brief & scope alignment",
  },
  {
    step: "02",
    title: "Strategise",
    icon: Target,
    desc: "Define page hierarchy, search intent mapping, URL preservation plans, content requirements, and campaign structure.",
    deliverable: "Architecture & roadmap plan",
  },
  {
    step: "03",
    title: "Build",
    icon: Wrench,
    desc: "Design, engineer, and QA-test responsive pages, technical SEO foundations, enquiry forms, and analytics measurement.",
    deliverable: "Staging reviews & launch QA",
  },
  {
    step: "04",
    title: "Improve",
    icon: Layers,
    desc: "Monitor search visibility, page engagement, and enquiry flow post-launch to prioritise practical ongoing refinements.",
    deliverable: "Measured iteration & reporting",
  },
];

export function UkServicesRedesign({ hub }: { hub: LocationHub }) {
  const [activeLayerId, setActiveLayerId] = useState<string>("web");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeLayer =
    HERO_BLUEPRINT_LAYERS.find((layer) => layer.id === activeLayerId) ??
    HERO_BLUEPRINT_LAYERS[0];

  const featuredIndustries = INDUSTRY_DIRECTORY.filter((i) => i.featured);
  const compactIndustries = INDUSTRY_DIRECTORY.filter((i) => !i.featured);

  return (
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div className="overflow-x-clip">
        {/* 1. HERO SECTION */}
        <section className="relative border-b border-slate-200/80 bg-gradient-to-b from-[#f4f8ff] via-[#f8fbff] to-white py-12 sm:py-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[440px] opacity-[0.42]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(15,109,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,109,255,0.06) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
            }}
          />

          <div className={`relative ${CONTAINER}`}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-[#0f6dff]"
                  >
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
                <li
                  aria-current="page"
                  className="font-semibold text-[#0b1528]"
                >
                  United Kingdom
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
              {/* Left Column — Editorial Pitch & CTAs */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-white px-3.5 py-1.5 shadow-[0_2px_10px_rgba(15,109,255,0.06)]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#0f6dff]" />
                  <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.13em] text-[#0b1528] sm:text-[11.5px] sm:tracking-[0.14em]">
                    United Kingdom · Digital Growth Hub
                  </span>
                </div>

                <h1 className="mt-6 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.35rem]">
                  Digital Experiences Built for{" "}
                  <span className="text-[#0f6dff]">
                    Ambitious UK Businesses
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-[16.5px] leading-[1.7] text-slate-600 sm:text-[17.5px]">
                  Webamazee brings website design and development, technical and
                  organic SEO, digital marketing, and human-led AI marketing
                  into one clear engagement—helping UK organisations clarify
                  their service scope, strengthen search visibility, and turn
                  visits into enquiries.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link href="/contact" className={PRIMARY_BTN}>
                    Discuss Your Project
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="#uk-services" className={SECONDARY_BTN}>
                    Explore Our Services
                  </Link>
                </div>

                <div className="mt-9 grid max-w-xl grid-cols-1 gap-4 border-t border-slate-200/90 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Integrated Team
                    </p>
                    <p className="mt-1 text-[13.5px] font-medium leading-snug text-slate-600">
                      Web, SEO, and growth planned under one roof
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      UK Market Scope
                    </p>
                    <p className="mt-1 text-[13.5px] font-medium leading-snug text-slate-600">
                      Built for local, regional, or nationwide reach
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                      Remote Delivery
                    </p>
                    <p className="mt-1 text-[13.5px] font-medium leading-snug text-slate-600">
                      Planned UK time-zone overlap &amp; clear milestones
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column — Bespoke Architectural Growth System Visual */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="relative rounded-2xl border border-slate-200/90 bg-white p-4 shadow-[0_24px_60px_-24px_rgba(11,21,40,0.16)] sm:p-6">
                  {/* Window Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0f6dff]/50" />
                      <span className="ml-2 text-[12px] font-semibold tracking-tight text-slate-500">
                        UK Digital Architecture · Connected Layers
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f8ff] px-2.5 py-1 text-[11px] font-semibold text-[#0f6dff]">
                      <Globe aria-hidden="true" className="h-3 w-3" />
                      Local to UK-Wide
                    </span>
                  </div>

                  {/* Interactive Layer Selector Tabs */}
                  <div
                    role="tablist"
                    aria-label="Connected digital capability layers"
                    className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
                  >
                    {HERO_BLUEPRINT_LAYERS.map((layer) => {
                      const active = layer.id === activeLayer.id;
                      return (
                        <button
                          key={layer.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveLayerId(layer.id)}
                          className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${
                            active
                              ? "border-[#0f6dff] bg-[#f4f8ff] text-[#0b1528]"
                              : "border-slate-200/80 bg-white text-slate-600 hover:border-slate-300 hover:text-[#0b1528]"
                          }`}
                        >
                          <span
                            className={`block font-display text-[11px] font-bold ${
                              active ? "text-[#0f6dff]" : "text-slate-400"
                            }`}
                          >
                            {layer.step}
                          </span>
                          <span className="mt-0.5 block text-[12px] font-semibold leading-tight">
                            {layer.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Architectural Panel */}
                  <div className="mt-4 rounded-xl border border-slate-200/80 bg-[#f8fbff] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                          Layer {activeLayer.step} · {activeLayer.focus}
                        </p>
                        <h2 className="mt-1 font-display text-lg font-bold text-[#0b1528]">
                          {activeLayer.label}
                        </h2>
                      </div>
                      <Link
                        href={activeLayer.href}
                        className="inline-flex items-center gap-1 rounded-full border border-[#0f6dff]/25 bg-white px-3 py-1 text-[12px] font-semibold text-[#0f6dff] transition-colors hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white"
                      >
                        {activeLayer.cta}
                        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                      {activeLayer.summary}
                    </p>

                    <div className="mt-4 grid gap-2 border-t border-slate-200/80 pt-3.5 sm:grid-cols-3">
                      {activeLayer.outcomes.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 rounded-lg bg-white px-3 py-2 text-[12px] font-medium text-[#0b1528] ring-1 ring-slate-200/70"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grounded Dark-Navy Bottom Rail */}
                  <div className="mt-4 flex flex-col justify-between gap-3 rounded-xl bg-[#0b1528] px-4 py-3.5 text-white sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0f6dff]/20 text-[#60a5fa]">
                        <Building2 aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-semibold text-white">
                          Remote Partner · Planned UK Time-Zone Overlap
                        </p>
                        <p className="text-[11.5px] text-slate-300">
                          Documented milestones, URL migration care &amp; honest scoping
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-[#7bb2ff] transition-colors hover:text-white"
                    >
                      Request Scope Review
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST & POSITIONING STRIP */}
        <section className="border-b border-slate-200/80 bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className={EYEBROW}>How We Work With UK Teams</p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-[#0b1528] sm:text-[1.875rem]">
                  Practical structure built around how UK buyers evaluate
                  trust.
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
                  UK buyers expect clear service boundaries, transparent proof,
                  and direct next steps. From our Mohali headquarters, Webamazee
                  collaborates remotely with UK organisations through planned
                  UK time-zone overlap, written decision trails, and structured
                  review stages.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
                  {TRUST_PRINCIPLES.map((item) => (
                    <div key={item.code} className="bg-white p-5 sm:p-6">
                      <span className="font-display text-[11px] font-bold tracking-[0.14em] text-[#0f6dff]">
                        {item.code}
                      </span>
                      <h3 className="mt-2 font-display text-[15.5px] font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CORE SERVICES */}
        <section
          id="uk-services"
          className="scroll-mt-24 bg-[#f4f8ff] py-16 sm:py-20"
        >
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 border-b border-slate-200/90 pb-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Core UK Services</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Four connected disciplines tailored to UK growth goals
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] leading-relaxed text-slate-600">
                Start with the priority your business needs most today, or align
                design, search, and marketing under one coordinated roadmap.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {CORE_SERVICES.map((service, idx) => {
                const Icon = service.icon;
                const isHighlight = idx === 0;
                return (
                  <article
                    key={service.href}
                    className={`group flex flex-col justify-between rounded-2xl border p-7 transition-all duration-200 sm:p-8 ${
                      isHighlight
                        ? "border-[#0f6dff]/30 bg-white shadow-[0_18px_42px_-24px_rgba(15,109,255,0.28)]"
                        : "border-slate-200/90 bg-white hover:border-[#0f6dff]/40 hover:shadow-[0_14px_34px_-22px_rgba(11,21,40,0.16)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f8ff] text-[#0f6dff] ring-1 ring-[#0f6dff]/15">
                            <Icon aria-hidden="true" className="h-5 w-5" />
                          </span>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                              {service.num} · {service.tag}
                            </span>
                            <h3 className="mt-0.5 font-display text-xl font-bold text-[#0b1528]">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-[15px] leading-[1.7] text-slate-600">
                        {service.description}
                      </p>

                      <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-[#0b1528]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0f6dff] transition-colors group-hover:text-[#0b57d0]"
                      >
                        {service.cta}
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </Link>
                      <Link
                        href={service.previewHref}
                        className="inline-flex items-center gap-1 rounded-full border border-[#0f6dff]/25 bg-[#f4f8ff] px-3 py-1 text-[12px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                      >
                        Preview redesign
                        <ArrowRight aria-hidden="true" className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. WHY WEBAMAZEE */}
        <section className="bg-[#0b1528] py-16 text-white sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                  Why Webamazee
                </p>
                <h2 className="mt-3 font-display text-[1.875rem] font-bold leading-[1.14] tracking-[-0.025em] text-white sm:text-[2.375rem]">
                  Engineering and growth strategy aligned from the start
                </h2>
                <p className="mt-5 text-[15.5px] leading-[1.72] text-slate-300">
                  Websites frequently underperform when design, technical SEO,
                  and marketing campaigns are built in silos. Our model keeps
                  structure, search visibility, and enquiry UX connected under
                  one accountable team.
                </p>
                <div className="mt-8 border-l-2 border-[#0f6dff] pl-5">
                  <p className="text-[14px] leading-relaxed text-slate-200">
                    No inflated guarantees or lock-in contracts—just clear
                    scoping, honest technical recommendations, and disciplined
                    delivery.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {WHY_WEBAMAZEE_POINTS.map((point) => (
                    <div
                      key={point.num}
                      className="grid gap-3 py-6 sm:grid-cols-[56px_1fr] sm:gap-4"
                    >
                      <span className="font-display text-sm font-bold tracking-[0.12em] text-[#60a5fa]">
                        {point.num}
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-[14.5px] leading-[1.68] text-slate-300">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. INDUSTRIES WE SUPPORT (Asymmetric Differentiated Layout) */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>Industries We Support</p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Sector-specific search and website strategies
                </h2>
              </div>
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
              >
                Explore all industries
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            {/* Tier 1: Two Featured Wide Sector Panels */}
            <div className="mt-10 grid gap-6 lg:grid-cols-12">
              {featuredIndustries.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex flex-col justify-between rounded-2xl border p-7 transition-all duration-200 sm:p-8 ${
                    idx === 0
                      ? "border-[#0f6dff]/25 bg-[#f4f8ff] hover:border-[#0f6dff] lg:col-span-7"
                      : "border-slate-200 bg-white hover:border-[#0f6dff] lg:col-span-5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"
                      />
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                      {item.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-[1.68] text-slate-600">
                      {item.desc}
                    </p>
                  </div>

                  {"pillars" in item && item.pillars ? (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200/80 pt-5">
                      {item.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[#0b1528] ring-1 ring-slate-200/90"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>

            {/* Tier 2: Compact Architectural Directory Rows */}
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-2">
              {compactIndustries.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start justify-between gap-5 bg-white p-6 transition-colors hover:bg-[#f8fbff] sm:p-7"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      {item.label}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
                      {item.name}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                  <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all group-hover:border-[#0f6dff] group-hover:bg-[#0f6dff] group-hover:text-white">
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 6. OUR WORK — SELECTED CASE STUDIES (Honest International Framing) */}
        <section className="border-y border-slate-200/80 bg-[#f8fafc] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className={EYEBROW}>
                  Selected Work · Wider International Experience
                </p>
                <h2 className={`${SECTION_H2} mt-2.5`}>
                  Verified projects demonstrating how we design and build
                </h2>
                <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                  These published case studies come from our engagements in
                  India and New Zealand. While not UK-based clients, they
                  demonstrate our practical execution across e-commerce flows,
                  travel discovery, and enquiry-led UX redesigns.
                </p>
              </div>
              <Link
                href="/case-studies"
                className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
              >
                View all case studies
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-7 lg:grid-cols-3">
              {hub.projects.map((project) => {
                const slug = project.href.replace(/^\/work\//, "");
                const meta = WORK_ENRICHMENT[slug];
                if (!meta) return null;

                return (
                  <article
                    key={project.href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-[#0f6dff]/40 hover:shadow-[0_18px_40px_-24px_rgba(11,21,40,0.2)]"
                  >
                    <Link
                      href={project.href}
                      className="relative block aspect-[16/10] w-full overflow-hidden border-b border-slate-200/80 bg-slate-100"
                    >
                      <Image
                        src={meta.image}
                        alt={meta.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-semibold">
                          <span className="rounded-full bg-[#f4f8ff] px-2.5 py-1 text-[#0f6dff]">
                            {meta.country} · {meta.year}
                          </span>
                          <span className="text-slate-500">{meta.category}</span>
                        </div>

                        <h3 className="mt-4 font-display text-xl font-bold text-[#0b1528]">
                          <Link
                            href={project.href}
                            className="transition-colors hover:text-[#0f6dff]"
                          >
                            {project.name}
                          </Link>
                        </h3>

                        <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-600">
                          {project.summary}
                        </p>

                        <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5">
                          {meta.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#0f6dff]" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                        <Link
                          href={project.href}
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                        >
                          Explore Project
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={meta.caseStudyHref}
                          className="text-[12.5px] font-medium text-slate-500 transition-colors hover:text-[#0b1528]"
                        >
                          Full case study
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. WORKING PROCESS */}
        <section className="bg-[#f4f8ff] py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <p className={EYEBROW}>Working Process</p>
              <h2 className={`${SECTION_H2} mt-2.5`}>
                A straightforward four-stage workflow from discovery to growth
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
                Each stage has a defined purpose and clear review gates so UK
                teams retain full visibility across timing, architecture, and
                launch checks.
              </p>
            </div>

            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-8 right-8 top-9 hidden h-px bg-[#0f6dff]/20 lg:block"
              />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {WORKING_PROCESS.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div
                      key={stage.step}
                      className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_24px_-18px_rgba(11,21,40,0.18)]"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1528] text-white">
                            <Icon aria-hidden="true" className="h-5 w-5" />
                          </span>
                          <span className="font-display text-sm font-bold tracking-[0.14em] text-[#0f6dff]">
                            {stage.step}
                          </span>
                        </div>

                        <h3 className="mt-5 font-display text-xl font-bold text-[#0b1528]">
                          {stage.title}
                        </h3>
                        <p className="mt-2.5 text-[14px] leading-[1.68] text-slate-600">
                          {stage.desc}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-slate-100 pt-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Output
                        </p>
                        <p className="mt-0.5 text-[12.5px] font-semibold text-[#0b1528]">
                          {stage.deliverable}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION */}
        <section className="bg-white py-16 sm:py-20">
          <div className={CONTAINER}>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className={EYEBROW}>Frequently Asked Questions</p>
                <h2 className="mt-2.5 font-display text-[1.875rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
                  Practical answers for UK decision-makers
                </h2>
                <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
                  Clear information on scope, timelines, UK time-zone
                  collaboration, and how website builds connect with SEO and
                  ongoing marketing.
                </p>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-[13.5px] font-semibold text-[#0b1528]">
                    Have a specific brief or website URL to review?
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                    Share your goals directly and we will respond with practical
                    next steps.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
                  >
                    Start a project conversation
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {hub.faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    const buttonId = `uk-faq-btn-${index}`;
                    const panelId = `uk-faq-panel-${index}`;
                    return (
                      <div key={faq.q}>
                        <h3>
                          <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() =>
                              setOpenFaq((prev) =>
                                prev === index ? null : index
                              )
                            }
                            className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff]"
                          >
                            <span className="font-display text-[16px] font-bold leading-snug text-[#0b1528] sm:text-[17px]">
                              {faq.q}
                            </span>
                            <ChevronDown
                              aria-hidden="true"
                              className={`h-5 w-5 shrink-0 text-[#0f6dff] transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </h3>
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          hidden={!isOpen}
                          className="pb-5 pr-6"
                        >
                          <p className="text-[14.5px] leading-[1.72] text-slate-600">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FINAL CONVERSION CTA */}
        <section className="bg-white pb-20 pt-4 sm:pb-24">
          <div className={CONTAINER}>
            <div className="relative overflow-hidden rounded-3xl bg-[#0b1528] px-6 py-12 text-white shadow-[0_30px_70px_-30px_rgba(11,21,40,0.65)] sm:px-12 sm:py-16 lg:px-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(96,165,250,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.16) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <div className="relative grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                    Start Your UK Engagement
                  </p>
                  <h2 className="mt-3 max-w-2xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
                    Let&apos;s Build Your Next Digital Growth Opportunity
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.7] text-slate-300">
                    Book a focused 30-minute consultation to review your current
                    website, search priorities, and commercial goals—with honest
                    advice and written scoping rather than a generic sales pitch.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#0f6dff] px-7 py-3 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(15,109,255,0.75)] transition-all duration-200 hover:bg-[#1f7bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <CalendarDays aria-hidden="true" className="h-4 w-4" />
                      Book a Free Consultation
                    </a>
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-[14.5px] font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <MessageSquare aria-hidden="true" className="h-4 w-4" />
                      Send Project Details
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7bb2ff]">
                      What To Expect
                    </p>
                    <ul className="mt-4 space-y-3 text-[13.5px] text-slate-200">
                      <li className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                        <span>Direct review of your site or scope brief</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                        <span>Practical priorities across web, SEO &amp; growth</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                        <span>Written proposal with clear deliverables</span>
                      </li>
                    </ul>
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <a
                        href={`mailto:${site.email}`}
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
                      >
                        <Mail aria-hidden="true" className="h-3.5 w-3.5 text-[#60a5fa]" />
                        {site.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
