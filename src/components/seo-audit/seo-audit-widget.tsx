"use client";

import { useRef } from "react";
import { SeoAuditForm } from "./seo-audit-form";
import { SeoAuditProgress } from "./seo-audit-progress";
import { SeoAuditResults } from "./seo-audit-results";
import { useSeoAuditRun } from "./use-seo-audit-run";

export function SeoAuditWidget() {
  const run = useSeoAuditRun();
  const panelRef = useRef<HTMLDivElement>(null);

  async function handleSubmit() {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await run.analyze();
  }

  return (
    <div ref={panelRef} className="mx-auto w-full max-w-4xl">
      {run.step === "form" && (
        <div className="rounded-[1.75rem] border border-line bg-white p-6 shadow-lift sm:p-8">
          <SeoAuditForm
            url={run.url}
            onUrlChange={run.setUrl}
            onSubmit={handleSubmit}
            urlError={run.urlError}
            apiError={run.apiError}
          />
        </div>
      )}
      {run.step === "progress" && (
        <div className="rounded-[1.75rem] border border-line bg-white shadow-lift">
          <SeoAuditProgress url={run.url} activeIndex={run.progressStep} />
        </div>
      )}
      {run.step === "result" && run.result && (
        <div className="rounded-[1.75rem] border border-line bg-white p-5 shadow-lift sm:p-8">
          <SeoAuditResults result={run.result} />
          <button
            type="button"
            onClick={() => run.reset()}
            className="mt-6 text-sm font-semibold text-brand-700 hover:underline"
          >
            Analyze another website
          </button>
        </div>
      )}
    </div>
  );
}
