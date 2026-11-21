"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  Code2,
  Compass,
  Cpu,
  Globe2,
  HeartPulse,
  LineChart,
  Mail,
  MapPin,
  Phone,
  Plus,
  SearchCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
} from "lucide-react";
import { site } from "@/lib/site";

export type IndustriesFaqItem = { q: string; a: string };

type FeaturedIndustry = {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  href: string;
  ctaLabel: string;
  secondaryLink: { label: string; href: string };
  image: string;
  imageAlt: string;
  summary: string;
  challenges: string[];
  focus: string[];
  scopeNote?: string;
  iconName: "ecommerce" | "saas" | "local" | "tourism" | "healthcare" | "professional";
};

const FEATURED_INDUSTRIES: FeaturedIndustry[] = [
  {
    id: "ecommerce",
    number: "01",
    shortLabel: "E-Commerce",
    title: "E-Commerce",
    href: "/seo-for-ecommerce",
    ctaLabel: "Explore E-Commerce SEO",
    secondaryLink: { label: "E-Commerce Development", href: "/services/ecommerce-development" },
    image: "/images/industries/ecommerce.jpg",
    imageAlt: "Minimalist ceramic online store displayed on a laptop and smartphone next to packaged retail orders in natural daylight",
    summary:
      "Online retail growth depends on capturing shoppers who already have commercial intent while making product discovery and checkout frictionless.",
    challenges: [
      "Large product catalogs creating crawl waste and indexation gaps",
      "Thin manufacturer product copy that fails to differentiate or convert",
      "High competition across broad commercial category keywords",
    ],
    focus: [
      "Online store development",
      "Product and category page optimisation",
      "E-commerce SEO",
      "Product discovery and organic traffic",
      "Conversion-focused digital experiences",
    ],
    iconName: "ecommerce",
  },
  {
    id: "saas",
    number: "02",
    shortLabel: "SaaS & Tech",
    title: "SaaS & Technology",
    href: "/seo-for-saas",
    ctaLabel: "Explore SaaS SEO",
    secondaryLink: { label: "AI SEO Services", href: "/services/ai-seo" },
    image: "/images/industries/saas.jpg",
    imageAlt: "Modern software workspace featuring a studio monitor displaying an analytics dashboard on an oak desk",
    summary:
      "Software buyers compare features, alternatives and use cases long before booking a demo. Your site needs clear positioning and search-led authority.",
    challenges: [
      "Longer B2B evaluation cycles with multiple technical stakeholders",
      "Low conversion rates from generic blog traffic without product context",
      "Need for high-intent comparison, integration and solution pages",
    ],
    focus: [
      "SaaS website development",
      "Feature and solution landing pages",
      "Commercial-intent SEO",
      "Comparison and alternative pages",
      "Content authority and organic acquisition",
    ],
    iconName: "saas",
  },
  {
    id: "local-business",
    number: "03",
    shortLabel: "Local Business",
    title: "Local Businesses",
    href: "/seo-for-local-business",
    ctaLabel: "Explore Local Business SEO",
    secondaryLink: { label: "Local SEO Services", href: "/services/local-seo" },
    image: "/images/industries/local-business.jpg",
    imageAlt: "Architectural glass storefront of a modern local neighborhood business framed in warm timber and greenery",
    summary:
      "Local service providers and brick-and-mortar businesses rely on visibility at the exact moment nearby customers search by city, suburb or service need.",
    challenges: [
      "Inconsistent map visibility across service areas and city suburbs",
      "Outdated websites that make calling or booking difficult on mobile",
      "Weak service-location alignment and incomplete business citations",
    ],
    focus: [
      "Local SEO",
      "Google Business Profile optimisation",
      "Location-based landing pages",
      "Local search visibility",
      "Enquiry generation",
    ],
    iconName: "local",
  },
  {
    id: "tourism",
    number: "04",
    shortLabel: "Travel & Tourism",
    title: "Travel & Tourism",
    href: "/seo-for-tourism",
    ctaLabel: "Explore Tourism SEO",
    secondaryLink: { label: "Website Development", href: "/services/website-development" },
    image: "/images/industries/tourism.jpg",
    imageAlt: "Coastal mountain travel destination overlooking calm blue water with a route planning tablet on a terrace table",
    summary:
      "Tour operators and travel brands often lose direct margin to aggregators. Structured destination pages and clear enquiry paths help win direct bookings.",
    challenges: [
      "Heavy competition against large OTA marketplaces and directories",
      "Seasonal demand shifts requiring early organic visibility",
      "Slow or cluttered itinerary pages losing mobile travellers before enquiry",
    ],
    focus: [
      "Tour operator websites",
      "Destination and activity landing pages",
      "Direct booking enquiry journeys",
      "Seasonal SEO",
      "Destination search visibility",
    ],
    iconName: "tourism",
  },
  {
    id: "healthcare",
    number: "05",
    shortLabel: "Healthcare",
    title: "Healthcare",
    href: "/seo-for-healthcare",
    ctaLabel: "Explore Healthcare SEO",
    secondaryLink: { label: "Technical SEO", href: "/services/technical-seo" },
    image: "/images/industries/healthcare.jpg",
    imageAlt: "Calm modern private healthcare clinic reception and lounge with natural oak surfaces and diffused daylight",
    summary:
      "Patients searching for clinics and care options look for clarity, accessibility and trustworthy local information before picking up the phone or booking.",
    challenges: [
      "Patients struggling to locate clear treatment details and clinic hours",
      "Fragmented local discovery across practitioners and clinic locations",
      "Need for clear, accurate website structure without confusing medical jargon",
    ],
    focus: [
      "Healthcare website experiences",
      "Clinic and healthcare service pages",
      "Local provider discovery",
      "Trustworthy healthcare content",
      "Healthcare search visibility",
    ],
    scopeNote:
      "Webamazee provides website development, digital marketing and search visibility services for healthcare organisations. We do not provide medical advice or clinical care.",
    iconName: "healthcare",
  },
  {
    id: "professional-services",
    number: "06",
    shortLabel: "Professional Services",
    title: "Professional Services",
    href: "/seo-for-professional-services",
    ctaLabel: "Explore Professional Services SEO",
    secondaryLink: { label: "SEO Services", href: "/services/seo-services" },
    image: "/images/industries/professional-services.jpg",
    imageAlt: "Two advisory consultants collaborating around a laptop in a bright glass boardroom overlooking a city skyline",
    summary:
      "Consultancies, accounting firms and specialist advisors win clients on credibility. Your website and organic footprint should reflect that expertise.",
    challenges: [
      "Generic brochure websites that fail to communicate specialist depth",
      "Over-reliance on referrals instead of steady commercial search enquiries",
      "Service pages lacking clear scope explanations and consultation prompts",
    ],
    focus: [
      "Professional firm websites",
      "Expertise and authority positioning",
      "Service-specific SEO",
      "Commercial search intent",
      "Consultation and lead generation journeys",
    ],
    iconName: "professional",
  },
];

const STRATEGY_AXES = [
  {
    label: "01 · Customer Journeys",
    title: "Different evaluation cycles",
    desc: "An online retail buyer can convert in minutes, while a SaaS team or advisory client may review multiple solution pages before making contact.",
  },
  {
    label: "02 · Search Intent",
    title: "Distinct query patterns",
    desc: "Product SKU searches, software comparison terms, clinic service queries and local map searches each demand a tailored content structure.",
  },
  {
    label: "03 · Competition",
    title: "Varying SERP landscapes",
    desc: "Competing against marketplaces, national directories or specialist incumbents shapes how technical SEO, architecture and content are prioritised.",
  },
  {
    label: "04 · Conversion Goals",
    title: "Sector-specific enquiries",
    desc: "Checkout completion, demo requests, appointment bookings, tour itineraries and partner consultations require distinct UX paths.",
  },
];

const ADDITIONAL_INDUSTRIES = [
  {
    name: "B2B Services",
    desc: "Clear service architecture, capability pages and commercial search visibility for specialist B2B providers.",
  },
  {
    name: "Real Estate",
    desc: "Fast property and area landing pages supported by local search visibility and structured lead capture.",
  },
  {
    name: "Education",
    desc: "Course and programme discovery pages built for prospective student research and enquiry clarity.",
  },
  {
    name: "Finance & Legal",
    desc: "Credibility-first firm websites, structured practice pages and transparent, compliant service communication.",
  },
  {
    name: "Home Services",
    desc: "Local service-area pages, Google Business Profile clarity and mobile-ready call or quote flows.",
  },
  {
    name: "Fitness & Wellness",
    desc: "Studio and membership websites paired with local discovery and class or trial booking journeys.",
  },
  {
    name: "Restaurants & Hospitality",
    desc: "Menu, venue and private event visibility across local search with straightforward reservation links.",
  },
  {
    name: "Technology",
    desc: "Technical product positioning, solution architecture and organic search programmes for modern tech firms.",
  },
];

const DELIVERABLES = [
  {
    number: "01",
    title: "Website Development",
    desc: "Modern, responsive and conversion-focused digital experiences.",
    href: "/services/website-development",
    linkLabel: "Website Development",
    icon: Code2,
  },
  {
    number: "02",
    title: "Search Engine Optimisation",
    desc: "Technical, on-page and strategic SEO to improve organic visibility.",
    href: "/services/seo-services",
    linkLabel: "SEO Services",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "AI SEO",
    desc: "AI-assisted search optimisation and content strategy with human review.",
    href: "/services/ai-seo",
    linkLabel: "AI SEO",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Local SEO",
    desc: "Improve visibility for location-based searches and local discovery.",
    href: "/services/local-seo",
    linkLabel: "Local SEO",
    icon: MapPin,
  },
  {
    number: "05",
    title: "Content Strategy",
    desc: "Relevant, useful content aligned with customer search intent.",
    href: "/services/ai-content-optimization",
    linkLabel: "AI Content Optimisation",
    icon: LineChart,
  },
  {
    number: "06",
    title: "Conversion Optimisation",
    desc: "Improve website journeys and make it easier for visitors to enquire.",
    href: "/services/landing-page-development",
    linkLabel: "Landing Page Development",
    icon: Target,
  },
];

const APPROACH_STEPS = [
  {
    step: "01",
    title: "Understand Your Industry",
    desc: "Understand the business model, audience, competition and customer journey.",
  },
  {
    step: "02",
    title: "Identify Opportunities",
    desc: "Research search intent, market opportunities and potential growth areas.",
  },
  {
    step: "03",
    title: "Build the Right Strategy",
    desc: "Develop the appropriate website, SEO and digital marketing approach.",
  },
  {
    step: "04",
    title: "Optimise and Improve",
    desc: "Review performance and refine the strategy based on available evidence.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "AI-assisted strategies with human oversight",
    desc: "We use AI tools to accelerate research and clustering while experienced strategists verify accuracy, tone and commercial fit.",
  },
  {
    title: "Website development and SEO under one team",
    desc: "Design, technical architecture, page speed and search structure are aligned together instead of handed between disconnected vendors.",
  },
  {
    title: "Industry-aware digital planning",
    desc: "Recommendations account for your sector's customer decision cycle, terminology and real competitive landscape.",
  },
  {
    title: "White-hat SEO practices",
    desc: "Clean technical foundations, accurate structured data and genuine content quality designed for sustainable long-term visibility.",
  },
  {
    title: "Transparent communication",
    desc: "Clear deliverables, plain-English explanations and straightforward next steps without inflated claims or confusing jargon.",
  },
  {
    title: "Support for international businesses",
    desc: "Flexible collaboration with startups, SMEs and established companies serving India, the US, UK, UAE, Australia and New Zealand.",
  },
];

const CONTAINER = "mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8";

function IndustryIcon({
  name,
  className = "h-4 w-4",
}: {
  name: FeaturedIndustry["iconName"];
  className?: string;
}) {
  switch (name) {
    case "ecommerce":
      return <ShoppingBag aria-hidden="true" className={className} />;
    case "saas":
      return <Cpu aria-hidden="true" className={className} />;
    case "local":
      return <Store aria-hidden="true" className={className} />;
    case "tourism":
      return <Compass aria-hidden="true" className={className} />;
    case "healthcare":
      return <HeartPulse aria-hidden="true" className={className} />;
    case "professional":
      return <Briefcase aria-hidden="true" className={className} />;
  }
}

export function IndustriesPageClient({ faqs }: { faqs: IndustriesFaqItem[] }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const activeHeroIndustry = FEATURED_INDUSTRIES[heroIndex];

  return (
    <div id="main-content" className="bg-white text-[#0b1528]">
      {/* SECTION 1: HERO */}
      <section className="border-b border-slate-200 bg-[#f8fafc] pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20">
        <div className={CONTAINER}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-[#0b1528]">
                Industries
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            {/* Hero Left Copy */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                Industries We Serve
              </p>

              <h1 className="mt-4 font-display text-[2.25rem] font-bold leading-[1.07] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.35rem]">
                Digital Growth Solutions Built Around{" "}
                <span className="text-[#0f6dff]">Your Industry</span>
              </h1>

              <p className="mt-5 max-w-[590px] text-[16px] leading-[1.65] text-slate-600 sm:text-[17px]">
                Every industry has different customers, challenges and opportunities. Webamazee combines website development, SEO and AI-powered digital strategies to help businesses build stronger online visibility and generate meaningful growth.
              </p>

              {/* Hero CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#featured-industries"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                >
                  <span>Explore Industries</span>
                  <ArrowDown aria-hidden="true" className="h-4 w-4 shrink-0" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0b1528] hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              </div>

              {/* Sector Quick Links (desktop/large layout; mobile jumps straight to interactive selector below) */}
              <div className="mt-8 hidden border-t border-slate-200 pt-5 lg:block">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  Six core sectors + eight expanding categories
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {FEATURED_INDUSTRIES.map((ind) => (
                    <Link
                      key={ind.id}
                      href={ind.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
                    >
                      <IndustryIcon name={ind.iconName} className="h-3.5 w-3.5 text-[#0f6dff]" />
                      <span>{ind.shortLabel}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Right Interactive Industry Explorer */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_46px_-26px_rgba(11,21,40,0.18)] sm:p-5">
              {/* Interactive Selector Bar */}
              <div
                role="tablist"
                aria-label="Preview featured industries"
                className="grid grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-[#f8fafc] p-1.5 sm:grid-cols-3"
              >
                {FEATURED_INDUSTRIES.map((ind, idx) => {
                  const selected = idx === heroIndex;
                  return (
                    <button
                      key={ind.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setHeroIndex(idx)}
                      className={`flex items-center justify-start gap-2 rounded-lg px-2.5 py-2 text-left text-[12px] font-semibold leading-tight transition-colors ${
                        selected
                          ? "bg-[#0f6dff] text-white"
                          : "text-slate-700 hover:bg-white hover:text-[#0b1528]"
                      }`}
                    >
                      <IndustryIcon
                        name={ind.iconName}
                        className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-white" : "text-[#0f6dff]"}`}
                      />
                      <span>{ind.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Industry Frame */}
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={activeHeroIndustry.image}
                    alt={activeHeroIndustry.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-end">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                      {activeHeroIndustry.number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      Featured Sector
                    </span>
                  </div>
                  <h2 className="mt-1 font-display text-[1.25rem] font-bold text-[#0b1528]">
                    {activeHeroIndustry.title}
                  </h2>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600">
                    {activeHeroIndustry.summary}
                  </p>
                </div>

                <Link
                  href={activeHeroIndustry.href}
                  className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#0b1528] px-4 text-[12.5px] font-bold text-white transition-colors hover:bg-[#0f6dff]"
                >
                  <span>Explore</span>
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INDUSTRY INTRODUCTION */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                Why Context Matters
              </p>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
                Why different industries require different digital strategies
              </h2>
              <p className="mt-4 text-[16px] leading-[1.68] text-slate-600">
                A website structure or SEO campaign built without industry context rarely performs well. How customers search, compare options, evaluate trust and take action depends entirely on what you sell and who is buying.
              </p>
              <p className="mt-3 text-[15.5px] leading-[1.68] text-slate-600">
                Before choosing page templates, keywords or content formats, we look at the commercial reality of your market — aligning website UX, technical architecture and search strategy around how your customers actually decide.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {STRATEGY_AXES.map((axis) => (
                <div key={axis.label} className="bg-white p-6 sm:p-7">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                    {axis.label}
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.1rem] font-bold text-[#0b1528]">
                    {axis.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                    {axis.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED INDUSTRIES (6 DISTINCT EDITORIAL SPOTLIGHTS) */}
      <section
        id="featured-industries"
        className="scroll-mt-[84px] border-b border-slate-200 bg-[#f8fafc] py-14 sm:py-16 lg:py-20"
      >
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                Featured Industries
              </p>
              <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.3rem]">
                Dedicated digital growth strategies across six core industries
              </h2>
            </div>
            <p className="max-w-md text-[15px] text-slate-600 lg:text-right">
              Explore sector-specific challenges, focus areas and dedicated SEO guides for each industry.
            </p>
          </div>

          {/* Anchor navigation bar inside Featured Industries */}
          <nav
            aria-label="Jump to industry"
            className="mt-6 flex items-center gap-2 overflow-x-auto pb-1"
          >
            {FEATURED_INDUSTRIES.map((industry) => (
              <a
                key={industry.id}
                href={`#industry-${industry.id}`}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
              >
                <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                  {industry.number}
                </span>
                <span>{industry.title}</span>
              </a>
            ))}
          </nav>

          {/* 6 Alternating Editorial Spotlights */}
          <div className="mt-8 space-y-8">
            {FEATURED_INDUSTRIES.map((industry, index) => {
              const imageRight = index % 2 === 1;
              return (
                <article
                  key={industry.id}
                  id={`industry-${industry.id}`}
                  className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-[0_18px_40px_-28px_rgba(11,21,40,0.22)]"
                >
                  <div className="grid items-stretch lg:grid-cols-12">
                    {/* Media Column */}
                    <div
                      className={`relative border-slate-200 bg-slate-100 lg:col-span-5 ${
                        imageRight
                          ? "border-b lg:order-2 lg:border-b-0 lg:border-l"
                          : "border-b lg:border-b-0 lg:border-r"
                      }`}
                    >
                      <div className="relative aspect-[16/10] h-full min-h-[240px] w-full lg:aspect-auto lg:min-h-[380px]">
                        <Image
                          src={industry.image}
                          alt={industry.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 520px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10 ${
                        imageRight ? "lg:order-1" : ""
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#0f6dff]/25 bg-[#eff6ff] px-2.5 font-mono text-[12px] font-bold text-[#0f6dff]">
                              <IndustryIcon name={industry.iconName} className="h-3.5 w-3.5" />
                              <span>{industry.number}</span>
                            </span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                              Industry Focus
                            </span>
                          </div>
                          <Link
                            href={industry.secondaryLink.href}
                            className="text-[12.5px] font-semibold text-slate-500 transition-colors hover:text-[#0f6dff]"
                          >
                            {industry.secondaryLink.label} &rarr;
                          </Link>
                        </div>

                        <h3 className="mt-4 font-display text-[1.65rem] font-bold tracking-[-0.02em] text-[#0b1528] sm:text-[1.9rem]">
                          {industry.title}
                        </h3>
                        <p className="mt-2.5 text-[15.5px] leading-relaxed text-slate-600">
                          {industry.summary}
                        </p>

                        {/* Challenges & Solutions Two-Column Split */}
                        <div className="mt-6 grid gap-6 border-t border-slate-200/80 pt-6 sm:grid-cols-2">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                              Key business challenges
                            </p>
                            <ul className="mt-3 space-y-2">
                              {industry.challenges.map((challenge) => (
                                <li
                                  key={challenge}
                                  className="flex items-start gap-2 text-[13.5px] leading-snug text-slate-600"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                                  />
                                  <span>{challenge}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                              How Webamazee helps
                            </p>
                            <ul className="mt-3 space-y-2">
                              {industry.focus.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-start gap-2 text-[13.5px] font-medium leading-snug text-[#0b1528]"
                                >
                                  <Check
                                    aria-hidden="true"
                                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                                    strokeWidth={2.4}
                                  />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {industry.scopeNote && (
                          <p className="mt-5 rounded-lg border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-slate-600">
                            {industry.scopeNote}
                          </p>
                        )}
                      </div>

                      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
                        <Link
                          href={industry.href}
                          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]"
                        >
                          <span>{industry.ctaLabel}</span>
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-700 transition-colors hover:text-[#0f6dff]"
                        >
                          <span>Request a tailored plan</span>
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: ADDITIONAL INDUSTRIES ("MORE INDUSTRIES WE CAN HELP") */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                Broader Sector Support
              </p>
              <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.2rem]">
                More Industries We Can Help
              </h2>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-slate-600">
                Beyond the six featured sectors above, Webamazee supports growth-focused organisations across additional industries through our core website development, SEO, AI SEO and local search services.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
            >
              <span>Browse core services</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {ADDITIONAL_INDUSTRIES.map((sector) => (
              <div
                key={sector.name}
                className="flex flex-col justify-between bg-white p-6 transition-colors hover:bg-[#f8fbff]"
              >
                <div>
                  <div className="flex items-center gap-2 text-[#0f6dff]">
                    <Building2 aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <h3 className="font-display text-[1.05rem] font-bold text-[#0b1528]">
                      {sector.name}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-600">
                    {sector.desc}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#0f6dff] hover:underline"
                >
                  <span>Discuss your goals</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT WE DELIVER */}
      <section className="bg-[#0b1528] py-16 text-white sm:py-20">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ec5ff]">
                What We Deliver
              </p>
              <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[2.25rem]">
                Capabilities built to turn search intent into qualified enquiries
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-semibold text-[#8ec5ff] hover:text-white"
            >
              <span>View all Webamazee services</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col justify-between bg-[#0b1528] p-7 transition-colors hover:bg-[#101e38]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Icon aria-hidden="true" className="h-5 w-5 text-[#8ec5ff]" />
                      <span className="font-mono text-[12px] font-semibold text-slate-400">
                        {item.number}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.2rem] font-bold text-white group-hover:text-[#8ec5ff]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#8ec5ff]">
                    <span>{item.linkLabel}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: INDUSTRY-FOCUSED APPROACH (4-STEP HORIZONTAL DESKTOP / VERTICAL MOBILE) */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
              Our Approach
            </p>
            <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
              An industry-focused process from discovery to ongoing optimisation
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-0">
            {APPROACH_STEPS.map((step, index) => (
              <div
                key={step.step}
                className={`relative border-l-2 border-slate-200 pl-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pr-8 lg:pt-6 ${
                  index === 0 ? "border-[#0f6dff] lg:border-[#0f6dff]" : ""
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#eff6ff] font-mono text-[12px] font-bold text-[#0f6dff]">
                  {step.step}
                </span>
                <h3 className="mt-4 font-display text-[1.15rem] font-bold text-[#0b1528]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE WEBAMAZEE */}
      <section className="border-b border-slate-200 bg-[#f8fafc] py-14 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.25fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                Why Webamazee
              </p>
              <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
                Practical digital execution without inflated promises
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-slate-600">
                Businesses choose Webamazee when they want website craftsmanship, technical SEO rigour and modern AI-assisted workflows working together transparently.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/free-seo-audit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0b1528] px-5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#0f6dff]"
                >
                  <span>Run Free SEO Audit</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
                >
                  <span>About Webamazee</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.title} className="border-t border-slate-300 pt-4">
                  <div className="flex items-start gap-2.5">
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-[#0f6dff]"
                      strokeWidth={2.5}
                    />
                    <div>
                      <h3 className="font-display text-[1.05rem] font-bold text-[#0b1528]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FREQUENTLY ASKED QUESTIONS */}
      <section className="border-b border-slate-200 bg-white py-14 sm:py-16 lg:py-20">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.35fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
                FAQ
              </p>
              <h2 className="mt-2.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                Practical answers about how Webamazee adapts website development, SEO and AI search strategy for different industries.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
              >
                <span>Ask about your industry</span>
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      id={`industries-faq-trigger-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`industries-faq-panel-${idx}`}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] sm:py-5"
                    >
                      <span className="font-display text-[15.5px] font-bold text-[#0b1528] sm:text-[16.5px]">
                        {item.q}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-45 text-[#0f6dff]" : "text-slate-400"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div
                        id={`industries-faq-panel-${idx}`}
                        role="region"
                        aria-labelledby={`industries-faq-trigger-${idx}`}
                        className="pb-5 pr-8 text-[14.5px] leading-relaxed text-slate-600"
                      >
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="bg-[#0b1528] py-16 text-white sm:py-20">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ec5ff]">
              <Globe2 aria-hidden="true" className="h-3.5 w-3.5" />
              <span>International Digital Growth Partner</span>
            </p>

            <h2 className="mt-3 font-display text-[2rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.65rem]">
              Let&apos;s Build a Stronger Digital Presence for Your Industry.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-300">
              Tell us about your business, your audience and your goals. We&apos;ll help you explore the right website, SEO and digital growth approach.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-7 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/[0.04] px-7 text-[14px] font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>Explore Our Services</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6 text-[13.5px] text-slate-300">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 text-[#8ec5ff]" />
                <span>{site.email}</span>
              </a>
              <a
                href={`tel:${site.phoneIntl.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 text-[#8ec5ff]" />
                <span>{site.phoneIntl}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
