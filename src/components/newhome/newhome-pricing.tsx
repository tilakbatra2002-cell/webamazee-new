"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatUsd, type Market } from "@/lib/pricing-market";
import {
  CREATIVE_DEV_RATE_CARD,
  MONTHLY_MARKETING_RATE_CARD,
  type RateCardService,
} from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

const CURRENCY_OPTIONS: { id: Market; label: string }[] = [
  { id: "india", label: "India (INR ₹)" },
  { id: "international", label: "International (USD $)" },
];

function formatInrNumber(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function RateCard({
  service,
  market,
}: {
  service: RateCardService;
  market: Market;
}) {
  const isIndia = market === "india";

  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-200 ${
        service.highlighted
          ? "border-[#0f6dff]/50 shadow-[0_16px_36px_-16px_rgba(15,109,255,0.3)]"
          : "border-slate-200/90 shadow-[0_6px_22px_-16px_rgba(11,21,40,0.1)] hover:border-slate-300 hover:shadow-[0_10px_28px_-16px_rgba(11,21,40,0.16)]"
      }`}
    >
      {service.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#0f6dff] px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-sm">
          Popular
        </span>
      )}

      <h3 className="font-display text-[17px] font-bold tracking-tight text-[#0b1528]">
        {service.name}
      </h3>

      <div className="mt-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
          Starting at
        </p>
        {isIndia ? (
          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-[32px] font-bold leading-none tracking-tight text-[#0b1528]">
              {formatInrNumber(service.inr)}
            </span>
            <span className="text-[13px] font-semibold text-slate-500">
              {service.billingLabel}
            </span>
          </p>
        ) : (
          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-[32px] font-bold leading-none tracking-tight text-[#0b1528]">
              {formatUsd(service.usd)}
            </span>
            <span className="text-[13px] font-semibold text-slate-500">
              {service.billingLabel}
            </span>
          </p>
        )}
        <p className="mt-2 inline-block rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0f6dff]">
          {service.billingNote}
        </p>
      </div>

      <div className="my-5 h-px bg-slate-200/80" />

      <div className="mt-auto space-y-3">
        <button
          type="button"
          onClick={() => triggerConsultationForm(service.name)}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[13.5px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(15,109,255,0.45)] transition-colors hover:bg-[#0b57d0]"
        >
          Contact Us
        </button>
        <Link
          href={service.href}
          className="inline-flex w-full items-center justify-center gap-1.5 text-[13px] font-bold text-[#0f6dff] hover:underline"
        >
          {service.linkLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

type PricingTab = "marketing" | "design";

const PRICING_TABS: { id: PricingTab; label: string; description: string }[] = [
  {
    id: "marketing",
    label: "Digital Marketing",
    description:
      "Ongoing monthly services to grow your visibility, traffic and enquiries — billed monthly.",
  },
  {
    id: "design",
    label: "Designing & Development",
    description:
      "Standalone design, development and content services — pay only for what you need.",
  },
];

export function NewHomePricing() {
  const [market, setMarket] = useState<Market>("india");
  const [activeTab, setActiveTab] = useState<PricingTab>("marketing");

  const activeCards =
    activeTab === "marketing"
      ? MONTHLY_MARKETING_RATE_CARD
      : CREATIVE_DEV_RATE_CARD;
  const activeTabInfo =
    PRICING_TABS.find((tab) => tab.id === activeTab) ?? PRICING_TABS[0];

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-t border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header + currency selector */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Transparent Pricing
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              Affordable starting prices, with no surprises.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
              Simple monthly marketing plans and one-off creative and
              development services. Switch between India (INR) and
              International (USD) to see the rate card for your market.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Pricing currency"
            className="inline-flex shrink-0 gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
          >
            {CURRENCY_OPTIONS.map((option) => {
              const isSelected = option.id === market;
              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setMarket(option.id)}
                  className={`rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-all duration-200 sm:px-4 ${
                    isSelected
                      ? "bg-[#0f6dff] text-white shadow-sm"
                      : "text-slate-600 hover:bg-[#f1f5f9] hover:text-[#0b1528]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category toggle: Digital Marketing / Designing & Development */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Pricing category"
            className="inline-flex w-full max-w-lg rounded-full border border-slate-200 bg-white p-1.5 shadow-sm sm:w-auto"
          >
            {PRICING_TABS.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 sm:flex-none sm:px-6 sm:text-[14px] ${
                    isSelected
                      ? "bg-[#0f6dff] text-white shadow-[0_6px_16px_-6px_rgba(15,109,255,0.5)]"
                      : "text-slate-600 hover:text-[#0b1528]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-xl text-center text-[14.5px] text-slate-600">
          {activeTabInfo.description}
        </p>

        {/* Single pricing grid — shows the active category's 5 cards */}
        <div
          key={activeTab}
          className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        >
          {activeCards.map((service) => (
            <RateCard key={service.name} service={service} market={market} />
          ))}
        </div>

        {/* Custom scope strip */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-6 py-5 sm:flex-row">
          <p className="text-[14.5px] text-slate-600">
            <strong className="font-semibold text-[#0b1528]">
              Need a custom scope or a combined website + marketing plan?
            </strong>{" "}
            Tell us about your project and we will share a tailored proposal.
          </p>
          <button
            type="button"
            onClick={() => triggerConsultationForm()}
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[#0b1528] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0f6dff]"
          >
            Request Custom Proposal
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
