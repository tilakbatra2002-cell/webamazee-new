"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight, Layers, Repeat } from "lucide-react";
import { MarketSelector } from "@/components/pricing/market-selector";
import { formatInr, formatUsd, type Market } from "@/lib/pricing-market";
import {
  MONTHLY_RETAINER_CATEGORIES,
  ONE_TIME_WEBSITE_PACKAGES,
  type ApprovedPackage,
} from "./newhome-data";

function PricingPackageCard({
  pkg,
  market,
}: {
  pkg: ApprovedPackage;
  market: Market;
}) {
  const displayPrice =
    market === "india" ? formatInr(pkg.inr) : formatUsd(pkg.usd);

  return (
    <div
      className={`relative flex h-full flex-col justify-between rounded-2xl p-6 transition-all duration-200 ${
        pkg.highlighted
          ? "border-2 border-[#0f6dff] bg-white shadow-[0_18px_40px_-18px_rgba(15,109,255,0.28)]"
          : "border border-slate-200/90 bg-white shadow-[0_6px_22px_-16px_rgba(11,21,40,0.1)] hover:border-slate-300"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-slate-500">
            {pkg.name}
          </h4>
          {pkg.highlighted && pkg.badgeLabel && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0f6dff] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white">
              {pkg.badgeLabel}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-bold tracking-tight text-[#0b1528]">
            {displayPrice}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {pkg.recurring ? "/ month" : "one-time"}
          </span>
        </div>

        {/* Explicit billing distinction */}
        <p
          className={`mt-2 inline-block rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
            pkg.recurring
              ? "bg-[#eef5ff] text-[#0f6dff]"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {pkg.recurring
            ? "Monthly Marketing Retainer"
            : "One-Time Project Price"}
        </p>

        {pkg.subtitle && (
          <p className="mt-2.5 text-[13.5px] text-slate-500">{pkg.subtitle}</p>
        )}

        <div className="my-5 h-px bg-slate-200/80" />

        <ul className="space-y-2.5">
          {pkg.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-700"
            >
              <span
                className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  pkg.highlighted
                    ? "bg-[#0f6dff] text-white"
                    : "bg-[#eef5ff] text-[#0f6dff]"
                }`}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-2">
        <Link
          href="/contact"
          className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-[13.5px] font-semibold transition-all duration-200 ${
            pkg.highlighted
              ? "bg-[#0f6dff] text-white shadow-[0_8px_20px_-6px_rgba(15,109,255,0.45)] hover:bg-[#0b57d0]"
              : "border border-slate-200 bg-[#f8fafc] text-[#0b1528] hover:border-[#0f6dff] hover:bg-white hover:text-[#0f6dff]"
          }`}
        >
          {pkg.cta}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function NewHomePricing() {
  const [market, setMarket] = useState<Market>("india");
  const [retainerTab, setRetainerTab] = useState<string>(
    MONTHLY_RETAINER_CATEGORIES[0].id
  );

  const activeRetainerCategory =
    MONTHLY_RETAINER_CATEGORIES.find((cat) => cat.id === retainerTab) ??
    MONTHLY_RETAINER_CATEGORIES[0];

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-t border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header + Preserved Existing MarketSelector */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Transparent Pricing
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Clear packages for one-time website builds &amp; monthly growth.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
              Switch between India (INR) and International (USD) rate cards.
              Website builds are billed once per project; SEO and marketing
              plans run as transparent monthly retainers.
            </p>
          </div>

          <div className="self-start lg:self-end">
            <MarketSelector market={market} onChange={setMarket} />
          </div>
        </div>

        {/* PART 1: ONE-TIME WEBSITE DEVELOPMENT PRICES */}
        <div className="mt-14 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3.5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Layers className="h-5 w-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-[#0b1528] sm:text-2xl">
                    Website &amp; E-Commerce Development
                  </h3>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    One-Time Project Prices
                  </span>
                </div>
                <p className="mt-1 text-[14.5px] text-slate-600">
                  Fast, conversion-focused websites and online stores, built to
                  perform. Paid once per project — never bundled into mandatory
                  monthly lock-ins.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ONE_TIME_WEBSITE_PACKAGES.map((pkg) => (
              <PricingPackageCard key={pkg.name} pkg={pkg} market={market} />
            ))}
          </div>
        </div>

        {/* PART 2: MONTHLY MARKETING & SEO RETAINERS */}
        <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-5 border-b border-slate-200/80 pb-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-3.5">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#0f6dff]">
                <Repeat className="h-5 w-5" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-[#0b1528] sm:text-2xl">
                    Ongoing Marketing &amp; Search Retainers
                  </h3>
                  <span className="rounded-full border border-[#0f6dff]/25 bg-[#eef5ff] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0f6dff]">
                    Monthly Retainers
                  </span>
                </div>
                <p className="mt-1 max-w-xl text-[14.5px] text-slate-600">
                  {activeRetainerCategory.description}
                </p>
              </div>
            </div>

            {/* Category switcher across approved monthly retainers */}
            <div
              role="tablist"
              aria-label="Monthly marketing retainer categories"
              className="grid w-full grid-cols-2 gap-1.5 rounded-xl border border-slate-200 bg-[#f8fafc] p-1.5 sm:inline-flex sm:w-auto lg:shrink-0"
            >
              {MONTHLY_RETAINER_CATEGORIES.map((category) => {
                const isSelected = category.id === activeRetainerCategory.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setRetainerTab(category.id)}
                    className={`rounded-lg px-3 py-2 text-center text-[12.5px] font-semibold transition-all duration-200 sm:whitespace-nowrap sm:px-3.5 sm:text-[13px] ${
                      isSelected
                        ? "bg-[#0f6dff] text-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-[#0b1528]"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {activeRetainerCategory.packages.map((pkg) => (
              <PricingPackageCard
                key={`${activeRetainerCategory.id}-${pkg.name}`}
                pkg={pkg}
                market={market}
              />
            ))}
          </div>
        </div>

        {/* Custom scope & full pricing catalog link */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-6 py-5 sm:flex-row">
          <p className="text-[14.5px] text-slate-600">
            <strong className="font-semibold text-[#0b1528]">
              Need a custom scope or combined website + SEO launch plan?
            </strong>{" "}
            Compare every package side by side or speak directly with our team.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
            >
              Full Pricing Page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#0b1528] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0f6dff]"
            >
              Request Custom Proposal
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
