"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  Phone,
} from "lucide-react";
import {
  PRICING_MARKETS,
  formatInr,
  formatUsd,
  type Market,
} from "@/lib/pricing-market";
import { site } from "@/lib/site";

type PackageItem = {
  name: string;
  usd: number;
  inr: string;
  recurring: boolean;
  features: string[];
  cta: string;
  recommended?: boolean;
};

type CategoryItem = {
  id: string;
  number: string;
  title: string;
  billingTag: string;
  description: string;
  packages: PackageItem[];
};

const CATEGORIES: CategoryItem[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    billingTag: "One-time project",
    description:
      "Fast, conversion-focused websites and online stores, built to perform. These are one-time projects.",
    packages: [
      {
        name: "Starter Website",
        usd: 749,
        inr: "24,999",
        recurring: false,
        features: [
          "Up to 5 Pages",
          "Responsive Design",
          "Contact Form",
          "Basic SEO Setup",
          "WhatsApp Integration",
        ],
        cta: "Get Started",
      },
      {
        name: "Business Website",
        usd: 1299,
        inr: "39,999",
        recurring: false,
        features: [
          "Up to 10 Pages",
          "Custom UI/UX Design",
          "On-Page SEO",
          "Contact & Lead Forms",
          "Analytics Integration",
        ],
        cta: "Choose Plan",
      },
      {
        name: "Professional Website",
        usd: 1999,
        inr: "64,999",
        recurring: false,
        features: [
          "Up to 15 Pages",
          "Premium UI/UX Design",
          "Advanced SEO Setup",
          "Lead Generation Features",
          "Conversion Optimization",
        ],
        cta: "Choose Plan",
      },
      {
        name: "E-Commerce Website",
        usd: 2499,
        inr: "79,999",
        recurring: false,
        features: [
          "Online Store Development",
          "Product & Category Setup",
          "Payment Gateway Integration",
          "Mobile Responsive Design",
          "Basic SEO & Analytics",
        ],
        cta: "Build My Store",
      },
    ],
  },
  {
    id: "seo",
    number: "02",
    title: "SEO",
    billingTag: "Monthly retainer",
    description:
      "Month-to-month search engine optimization to grow organic traffic, rankings and qualified leads.",
    packages: [
      {
        name: "SEO Starter",
        usd: 449,
        inr: "12,999",
        recurring: true,
        features: [
          "Keyword Research",
          "On-Page SEO",
          "Technical SEO Basics",
          "Google Search Console",
          "Monthly SEO Report",
        ],
        cta: "Start SEO",
      },
      {
        name: "Local SEO",
        usd: 649,
        inr: "19,999",
        recurring: true,
        features: [
          "Local Keyword Research",
          "Google Business Profile Optimization",
          "Local On-Page SEO",
          "Citation & Directory Optimization",
          "Monthly SEO Report",
        ],
        cta: "Grow Locally",
      },
      {
        name: "SEO Growth",
        usd: 999,
        inr: "32,999",
        recurring: true,
        features: [
          "Advanced Keyword Research",
          "Technical & On-Page SEO",
          "Content Optimization",
          "Competitor Analysis",
          "Monthly Growth Report",
        ],
        cta: "Grow My Rankings",
      },
      {
        name: "SEO Professional",
        usd: 1499,
        inr: "49,999",
        recurring: true,
        features: [
          "Advanced Technical SEO",
          "National & Global SEO",
          "Content Strategy",
          "Competitor & SERP Analysis",
          "Advanced Performance Reporting",
        ],
        cta: "Go Professional",
      },
    ],
  },
  {
    id: "ai-seo",
    number: "03",
    title: "AI SEO",
    billingTag: "Monthly retainer",
    description:
      "AI-powered search optimization designed for the next generation of search. Monthly plans.",
    packages: [
      {
        name: "AI SEO Starter",
        usd: 549,
        inr: "16,999",
        recurring: true,
        features: [
          "AI Search Visibility Audit",
          "AI Keyword Research",
          "Content Optimization",
          "Search Console Integration",
          "Monthly AI SEO Report",
        ],
        cta: "Start AI SEO",
      },
      {
        name: "AI SEO Growth",
        usd: 899,
        inr: "28,999",
        recurring: true,
        features: [
          "AI Search Optimization",
          "AI Keyword & Topic Research",
          "Content Strategy",
          "Entity & Semantic Optimization",
          "Monthly Performance Report",
        ],
        cta: "Grow With AI",
      },
      {
        name: "AI SEO Pro",
        usd: 1299,
        inr: "39,999",
        recurring: true,
        recommended: true,
        features: [
          "Advanced AI SEO Strategy",
          "AI Content Optimization",
          "Entity & Topic Authority",
          "Competitor AI Search Analysis",
          "Advanced Reporting",
        ],
        cta: "Choose AI SEO Pro",
      },
      {
        name: "AI SEO Domination",
        usd: 1799,
        inr: "54,999",
        recurring: true,
        features: [
          "Complete AI SEO Strategy",
          "AI Search Visibility Optimization",
          "Advanced Content Strategy",
          "Competitor & SERP Intelligence",
          "Monthly Growth Strategy",
        ],
        cta: "Dominate Search",
      },
    ],
  },
  {
    id: "social-media-marketing",
    number: "04",
    title: "Social Media Marketing",
    billingTag: "Monthly retainer",
    description:
      "Strategic social media services designed to build brand presence, increase engagement, reach the right audience and generate business growth across major social platforms.",
    packages: [
      {
        name: "Social Starter",
        usd: 499,
        inr: "16,999",
        recurring: true,
        features: [
          "Social Media Management",
          "Up to 2 Social Platforms",
          "Social Media Content",
          "8 Social Media Posts",
          "Basic Community Management",
          "Monthly Performance Report",
        ],
        cta: "Get Started",
      },
      {
        name: "Social Growth",
        usd: 849,
        inr: "29,999",
        recurring: true,
        recommended: true,
        features: [
          "Social Media Management",
          "Up to 3 Social Platforms",
          "12 Social Media Posts",
          "Instagram & Facebook Marketing",
          "Community Engagement",
          "Content Strategy",
          "Monthly Performance Report",
        ],
        cta: "Grow My Social Media",
      },
      {
        name: "Social Professional",
        usd: 1299,
        inr: "44,999",
        recurring: true,
        features: [
          "Social Media Management",
          "Up to 4 Social Platforms",
          "16 Social Media Posts",
          "Instagram, Facebook & LinkedIn Marketing",
          "Social Media Strategy",
          "Audience & Competitor Research",
          "Community Management",
          "Social Media Advertising Management",
          "Monthly Performance Report",
        ],
        cta: "Build My Presence",
      },
      {
        name: "Social Enterprise",
        usd: 1899,
        inr: "64,999",
        recurring: true,
        features: [
          "Complete Social Media Management",
          "Up to 6 Social Platforms",
          "20 Social Media Posts",
          "Instagram Marketing",
          "Facebook Marketing",
          "LinkedIn Marketing",
          "Social Media Advertising",
          "Advanced Content Strategy",
          "Audience & Competitor Research",
          "Community Management",
          "Detailed Monthly Analytics & Reporting",
        ],
        cta: "Scale My Social Media",
      },
    ],
  },
];

const CONTAINER = "mx-auto max-w-[1260px] px-4 sm:px-6 lg:px-8";

function MarketToggle({
  market,
  onChange,
  compact = false,
}: {
  market: Market;
  onChange: (next: Market) => void;
  compact?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Select pricing market"
      className={
        compact
          ? "inline-flex items-center rounded-lg border border-slate-200 bg-[#f8fafc] p-1"
          : "inline-flex items-center rounded-xl border border-slate-300/90 bg-white p-1 shadow-[0_1px_2px_rgba(11,21,40,0.04)]"
      }
    >
      {PRICING_MARKETS.map((item) => {
        const isSelected = item.id === market;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onChange(item.id)}
            className={
              compact
                ? `inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
                    isSelected
                      ? "bg-[#0b1528] text-white"
                      : "text-slate-600 hover:text-[#0b1528]"
                  }`
                : `inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors sm:px-4 ${
                    isSelected
                      ? "bg-[#0f6dff] text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0b1528]"
                  }`
            }
          >
            <span className="font-mono text-[12px] font-bold">{item.symbol}</span>
            <span>{item.label}</span>
            <span
              className={
                isSelected
                  ? "text-white/80"
                  : "text-slate-400"
              }
            >
              {item.currency}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({
  pkg,
  market,
}: {
  pkg: PackageItem;
  market: Market;
}) {
  const inrLabel = formatInr(pkg.inr);
  const usdLabel = formatUsd(pkg.usd);
  const primaryPrice = market === "india" ? inrLabel : usdLabel;
  const secondaryLabel =
    market === "india" ? `International: ${usdLabel}` : `India: ${inrLabel}`;
  const billingTerm = pkg.recurring
    ? "Per month · billed monthly"
    : "One-time project price";

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 ${
        pkg.recommended
          ? "border-[#0f6dff] bg-[#f8fbff] shadow-[0_14px_34px_-18px_rgba(15,109,255,0.28)]"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_10px_28px_-18px_rgba(11,21,40,0.16)]"
      }`}
    >
      {pkg.recommended && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-[#0f6dff]"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.09em] text-[#0b1528]">
          {pkg.name}
        </h3>
        {pkg.recommended && (
          <span className="shrink-0 rounded bg-[#0f6dff] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
            Recommended
          </span>
        )}
      </div>

      {/* Price & Billing Block */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em] tabular-nums text-[#0b1528]">
            {primaryPrice}
          </span>
          {pkg.recurring && (
            <span className="text-[13px] font-medium text-slate-500">/mo</span>
          )}
        </div>

        <p className="mt-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0f6dff]">
          {billingTerm}
        </p>
        <p className="mt-1 font-mono text-[12px] font-medium tabular-nums text-slate-500">
          {secondaryLabel}
        </p>
      </div>

      <div className="my-5 h-px bg-slate-200/80" />

      {/* Features */}
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
        Included scope
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-slate-700"
          >
            <Check
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
              strokeWidth={2.4}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Pinned CTA */}
      <div className="mt-auto pt-6">
        <Link
          href="/contact"
          className={`group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-[13.5px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${
            pkg.recommended
              ? "bg-[#0f6dff] text-white hover:bg-[#0b57d0]"
              : "border border-slate-300 bg-white text-[#0b1528] hover:border-[#0b1528] hover:bg-[#0b1528] hover:text-white"
          }`}
        >
          <span>{pkg.cta}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

export function PricingRedesign() {
  const [market, setMarket] = useState<Market>("india");
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: 0 }
    );

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function jumpToCategory(id: string) {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div id="main-content" className="bg-white text-[#0b1528]">
      {/* 1. CENTERED HERO */}
      <section className="border-b border-slate-200 bg-[#f8fafc] pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className={CONTAINER}>
          {/* Clean breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex justify-center">
            <ol className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-[#0f6dff]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-[#0b1528]">
                Pricing
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-[780px] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0f6dff]">
              Pricing
            </p>

            <h1 className="mt-4 font-display text-[2.2rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3.1rem] lg:text-[3.45rem]">
              Flexible Digital Solutions{" "}
              <span className="text-[#0f6dff]">
                for Every Stage of Your Business
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-[1.65] text-slate-600 sm:text-[17px]">
              Choose the service and package that fits your goals. From websites and SEO to AI-powered search optimization and social media marketing, Webamazee provides solutions built around your business.
            </p>

            {/* Primary Currency / Market Toggle */}
            <div className="mt-8 flex flex-col items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Show prices in
              </span>
              <MarketToggle market={market} onChange={setMarket} />
            </div>
          </div>

          {/* 4-Category Quick Index Strip */}
          <div className="mx-auto mt-10 grid max-w-[1040px] grid-cols-1 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  jumpToCategory(category.id);
                }}
                className="group flex items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-[#f8fbff]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                      {category.number}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">
                      {category.billingTag}
                    </span>
                  </div>
                  <p className="mt-1 truncate font-display text-[15px] font-bold text-[#0b1528] group-hover:text-[#0f6dff]">
                    {category.title}
                  </p>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. STICKY CATEGORY NAVIGATION + MARKET TOGGLE */}
      <div className="sticky top-[74px] z-30 border-b border-slate-200 bg-white shadow-[0_2px_10px_-6px_rgba(11,21,40,0.08)] sm:top-[76px]">
        <div className={CONTAINER}>
          <div className="flex items-center justify-between gap-2 py-2.5">
            <nav
              aria-label="Pricing categories"
              className="-mx-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 py-0.5"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeId === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      jumpToCategory(category.id);
                    }}
                    className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors sm:text-[13.5px] ${
                      isActive
                        ? "bg-[#0f6dff] text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0b1528]"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        isActive ? "text-white/80" : "text-slate-400"
                      }`}
                    >
                      {category.number}
                    </span>
                    <span>{category.title}</span>
                  </a>
                );
              })}
            </nav>

            {/* Mobile compact INR / USD pill */}
            <div
              role="group"
              aria-label="Switch currency"
              className="flex shrink-0 items-center rounded-lg border border-slate-200 bg-[#f8fafc] p-0.5 lg:hidden"
            >
              {PRICING_MARKETS.map((item) => {
                const isSelected = item.id === market;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${item.label} ${item.currency}`}
                    onClick={() => setMarket(item.id)}
                    className={`rounded-md px-2 py-1.5 font-mono text-[11.5px] font-bold transition-colors ${
                      isSelected
                        ? "bg-[#0b1528] text-white"
                        : "text-slate-600 hover:text-[#0b1528]"
                    }`}
                  >
                    {item.symbol}
                  </button>
                );
              })}
            </div>

            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Currency
              </span>
              <MarketToggle market={market} onChange={setMarket} compact />
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOUR CATEGORY PRICING SECTIONS */}
      <div>
        {CATEGORIES.map((category, index) => {
          const isAltBg = index % 2 === 1;
          return (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-heading`}
              className={`scroll-mt-[132px] border-b border-slate-200 py-14 sm:py-16 lg:scroll-mt-[134px] lg:py-20 ${
                isAltBg ? "bg-[#f8fafc]" : "bg-white"
              }`}
            >
              <div className={CONTAINER}>
                {/* Category Header */}
                <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-7 items-center rounded-md border border-[#0f6dff]/25 bg-[#eff6ff] px-2.5 font-mono text-[12px] font-bold text-[#0f6dff]">
                        {category.number}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                        {category.billingTag}
                      </span>
                    </div>
                    <h2
                      id={`${category.id}-heading`}
                      className="mt-3 font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.15rem]"
                    >
                      {category.title}
                    </h2>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-slate-600">
                      {category.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-4 text-[12.5px] text-slate-500">
                    <span className="font-mono font-semibold text-[#0b1528]">
                      {category.packages.length} packages
                    </span>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <span>
                      Showing{" "}
                      <strong className="font-semibold text-[#0b1528]">
                        {market === "india" ? "INR (₹)" : "USD ($)"}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* 4-Column Package Grid */}
                <div className="mt-8 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {category.packages.map((pkg) => (
                    <PricingCard key={pkg.name} pkg={pkg} market={market} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. CUSTOM SOLUTION CLOSING SECTION */}
      <section
        id="custom-solution"
        className="scroll-mt-[132px] bg-[#0b1528] py-16 text-white sm:py-20"
      >
        <div className={CONTAINER}>
          <div className="grid gap-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ec5ff]">
                Custom Packages
              </p>
              <h2 className="mt-3 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-white sm:text-[2.35rem]">
                Need a Custom Solution?
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate-300">
                Don&apos;t see the right package for your business? Let&apos;s create a solution around your exact requirements.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-[13.5px] text-slate-300">
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

            <div className="rounded-xl border border-white/10 bg-[#08101f] p-6 sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Available across all disciplines
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 text-[13.5px] text-slate-200 sm:grid-cols-2">
                {CATEGORIES.map((category) => (
                  <li key={category.id} className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#8ec5ff]"
                    />
                    <span>{category.title}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Talk to an Expert</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
