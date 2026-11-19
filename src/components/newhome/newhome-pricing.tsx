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
  const hasInr = isIndia && service.inr !== null;

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
        {hasInr ? (
          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-[32px] font-bold leading-none tracking-tight text-[#0b1528]">
              {formatInrNumber(service.inr as number)}
            </span>
            <span className="text-[13px] font-semibold text-slate-500">
              {service.billingLabel}
            </span>
          </p>
        ) : isIndia ? (
          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
            <span className="font-display text-[22px] font-bold leading-tight tracking-tight text-[#0b1528]">
              INR on request
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
        {isIndia && !hasInr && (
          <p className="mt-2 text-[12px] leading-snug text-slate-500">
            INR price pending approval — contact us for an exact INR quote.
          </p>
        )}
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

export function NewHomePricing() {
  const [market, setMarket] = useState<Market>("india");

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

        {/* A. Monthly Digital Marketing Services */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-bold text-[#0b1528] sm:text-2xl">
              Monthly Digital Marketing Services
            </h3>
            <span className="rounded-full border border-[#0f6dff]/25 bg-[#eef5ff] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#0f6dff]">
              Monthly
            </span>
          </div>
          <p className="mt-1.5 max-w-2xl text-[14.5px] text-slate-600">
            Ongoing monthly services to grow your visibility, traffic and
            enquiries — billed monthly, starting at the prices below.
          </p>

          <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {MONTHLY_MARKETING_RATE_CARD.map((service) => (
              <RateCard key={service.name} service={service} market={market} />
            ))}
          </div>
        </div>

        {/* B. Individual Creative & Development Services */}
        <div className="mt-14">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-bold text-[#0b1528] sm:text-2xl">
              Individual Creative &amp; Development Services
            </h3>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              One-off &amp; Hourly
            </span>
          </div>
          <p className="mt-1.5 max-w-2xl text-[14.5px] text-slate-600">
            Standalone design, development and content services — pay only for
            what you need, at the starting prices below.
          </p>

          <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {CREATIVE_DEV_RATE_CARD.map((service) => (
              <RateCard key={service.name} service={service} market={market} />
            ))}
          </div>

          {market === "india" && (
            <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-800">
              INR prices for the five creative and development services above
              are being finalised and will be published here once approved.
              Until then, we share an exact INR quote on request — no
              automatic USD-to-INR conversion is applied.
            </p>
          )}
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
