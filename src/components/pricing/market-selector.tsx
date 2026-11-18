"use client";

import { PRICING_MARKETS, type Market } from "@/lib/pricing-market";
import { cn } from "@/lib/utils";

export function MarketSelector({
  market,
  onChange,
}: {
  market: Market;
  onChange: (next: Market) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
        Show prices in
      </span>
      <div
        role="group"
        aria-label="Select pricing market"
        className="flex items-center gap-1 rounded-full border border-white/60 bg-white/80 p-1.5 shadow-soft backdrop-blur-xl"
      >
        {PRICING_MARKETS.map((m) => {
          const active = m.id === market;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(m.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 sm:text-sm",
                active
                  ? "bg-brand-gradient text-white shadow-glow"
                  : "text-slate-600 hover:bg-brand-50/70 hover:text-brand-700"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors duration-300",
                  active ? "bg-white/25 text-white" : "bg-brand-50 text-brand-700"
                )}
              >
                {m.symbol}
              </span>
              <span className="whitespace-nowrap">{m.label}</span>
              <span
                className={cn(
                  "whitespace-nowrap text-xs font-medium transition-colors duration-300",
                  active ? "text-white/80" : "text-slate-400"
                )}
              >
                {m.symbol} {m.currency}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
