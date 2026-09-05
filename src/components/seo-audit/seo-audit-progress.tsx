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
  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <div className="relative grid h-20 w-20 place-items-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
        <span className="absolute inset-0 -z-10 rounded-full bg-brand-100/60 blur-xl" />
      </div>
      <h3 className="mt-6 text-center font-display text-2xl font-bold text-ink">
        Analyzing your website...
      </h3>
      <p className="mt-2 max-w-md text-center text-sm text-slate-500">
        Fetching live signals for{" "}
        <span className="break-all font-semibold text-brand-700">{url}</span>
      </p>
      <div className="mt-6 w-full max-w-sm space-y-1.5">
        {AUDIT_PROGRESS_STEPS.map((step, i) => {
          const done = i < activeIndex;
          const current = i === activeIndex;
          return (
            <div
              key={step}
              className={
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors " +
                (done ? "text-success" : current ? "font-medium text-brand-700" : "text-slate-400")
              }
            >
              {done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              ) : current ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <span className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
              )}
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
