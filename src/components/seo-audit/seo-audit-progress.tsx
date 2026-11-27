"use client";

import { CheckCircle2, Loader2 } from "lucide-react";

export const AUDIT_PROGRESS_STEPS = [
  "Checking accessibility",
  "Checking technical SEO",
  "Checking page structure",
  "Checking metadata",
  "Checking headings",
  "Checking links",
  "Checking performance",
  "Checking mobile readiness",
  "Checking structured data",
  "Checking AI search readiness",
] as const;

export function SeoAuditProgress({
  url,
  activeIndex,
}: {
  url: string;
  activeIndex: number;
}) {
  const finished = AUDIT_PROGRESS_STEPS.filter((_, i) => i < activeIndex).length;
  const pct = Math.round((finished / AUDIT_PROGRESS_STEPS.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-10 sm:px-8 sm:py-14">
      <div className="relative grid h-16 w-16 place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand-100/60 blur-xl" />
      </div>
      <h3 className="mt-5 text-center font-display text-[1.4rem] font-bold tracking-[-0.02em] text-ink sm:text-2xl">
        Analyzing your website
      </h3>
      <p className="mt-2 max-w-md break-all text-center text-[13.5px] text-slate-500">
        Reading live signals from{" "}
        <span className="font-semibold text-brand-700">{url}</span>
      </p>

      {/* A single progress line so the step list reads as one instrument
          rather than ten unrelated rows. */}
      <div className="mt-6 w-full max-w-sm">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#0f6dff] transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
        <p className="mt-2 text-[11.5px] font-semibold tabular-nums text-slate-400">
          {finished} of {AUDIT_PROGRESS_STEPS.length} checks complete
        </p>
      </div>

      <ol className="mt-5 w-full max-w-sm space-y-1">
        {AUDIT_PROGRESS_STEPS.map((step, i) => {
          const done = i < activeIndex;
          const current = i === activeIndex;
          return (
            <li
              key={step}
              className={
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] transition-colors " +
                (done
                  ? "text-slate-500"
                  : current
                    ? "bg-brand-50/70 font-semibold text-brand-700"
                    : "text-slate-400")
              }
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" aria-hidden />
              ) : current ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              ) : (
                <span
                  aria-hidden
                  className="h-4 w-4 shrink-0 rounded-full border border-slate-300"
                />
              )}
              {step}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
