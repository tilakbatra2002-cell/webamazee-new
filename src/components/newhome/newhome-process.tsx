"use client";

import { ArrowRight } from "lucide-react";
import { WORKING_PROCESS_STEPS } from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

export function NewHomeProcess() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-y border-slate-200/80 bg-[#f7f9fc] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Our Working Process
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              A structured five-step path from first brief to ongoing growth.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-slate-600">
            Every engagement follows a clear, predictable sequence — so you know
            what happens at each stage and what we deliver next.
          </p>
        </div>

        {/* 5-Step Connected Timeline */}
        <div className="relative mt-14">
          {/* Desktop horizontal connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-10 right-10 top-[26px] hidden h-[2px] bg-gradient-to-r from-[#0f6dff]/25 via-[#0f6dff]/55 to-[#0f6dff]/25 lg:block"
          />

          <ol className="grid gap-5 lg:grid-cols-5">
            {WORKING_PROCESS_STEPS.map((item, idx) => (
              <li key={item.step} className="relative flex flex-col">
                {/* Step Node Row */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative z-10 inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border-2 border-[#0f6dff] bg-white font-display text-base font-bold text-[#0f6dff] shadow-[0_6px_16px_-4px_rgba(15,109,255,0.25)]">
                    {item.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 lg:hidden">
                    Step {idx + 1} of 5
                  </span>
                </div>

                {/* Step Card */}
                <div className="flex flex-1 flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(11,21,40,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/40">
                  <div>
                    <p className="hidden text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 lg:block">
                      Step {idx + 1}
                    </p>
                    <h3 className="font-display text-[1.15rem] font-bold leading-snug text-[#0b1528] lg:mt-1.5">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3.5">
                    <span className="inline-block rounded-md bg-[#eef5ff] px-2.5 py-1 text-[11.5px] font-semibold text-[#0f6dff]">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Process action bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-base font-bold text-[#0b1528]">
              Ready for Step 01?
            </p>
            <p className="text-[14px] text-slate-600">
              Share your website or business goals and we&apos;ll outline a
              clear, practical starting plan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => triggerConsultationForm()}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0f6dff] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
          >
            Start Your Project Brief
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
