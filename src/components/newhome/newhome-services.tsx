"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { GROWTH_STAGES } from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

export function NewHomeServices() {
  const [activeGoalId, setActiveGoalId] = useState<string>(GROWTH_STAGES[0].id);

  const handleStageJump = (id: string) => {
    setActiveGoalId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="services"
      className="scroll-mt-24 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              Growth-Focused Services
            </p>
            <h2 className="mt-2.5 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Structured around how businesses actually grow online.
            </h2>
          </div>
          <p className="max-w-md text-[15.5px] leading-relaxed text-slate-600">
            Instead of disconnected tactics, our services align around four
            clear commercial stages — from search discovery to conversion and
            long-term retention.
          </p>
        </div>

        {/* 4-Goal Quick Navigator Strip */}
        <div
          aria-label="Business goal stages"
          className="mt-10 grid grid-cols-1 gap-2.5 rounded-2xl border border-slate-200/90 bg-[#f8fafc] p-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {GROWTH_STAGES.map((stage) => {
            const isSelected = activeGoalId === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => handleStageJump(stage.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#0b1528] text-white shadow-sm"
                    : "bg-white text-[#0b1528] hover:border-[#0f6dff]/30 hover:bg-[#f1f6ff]"
                }`}
              >
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold ${
                    isSelected
                      ? "bg-[#0f6dff] text-white"
                      : "bg-[#eef5ff] text-[#0f6dff]"
                  }`}
                >
                  {stage.number}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[13.5px] font-bold leading-snug xl:text-[14px]">
                    {stage.number} – {stage.goalTitle}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11.5px] font-medium leading-snug ${
                      isSelected ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {stage.goalLabel}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 4 Goal Chapters — Asymmetric Architectural Split */}
        <div className="mt-10 space-y-8">
          {GROWTH_STAGES.map((stage) => (
            <div
              key={stage.id}
              id={stage.id}
              onMouseEnter={() => setActiveGoalId(stage.id)}
              className="scroll-mt-32 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_-18px_rgba(11,21,40,0.08)] transition-colors hover:border-slate-300"
            >
              <div className="grid lg:grid-cols-12">
                {/* Left Column — Business Goal Brief */}
                <div className="flex flex-col justify-between border-b border-slate-200/80 bg-[#f8fafc] p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f6dff] font-display text-sm font-bold text-white">
                        {stage.number}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        {stage.goalLabel}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#0b1528] sm:text-[1.65rem]">
                      {stage.number} – {stage.goalTitle}
                    </h3>

                    <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600">
                      {stage.summary}
                    </p>
                  </div>

                  <div className="mt-7 border-t border-slate-200/80 pt-5">
                    <p className="text-xs font-semibold text-slate-500">
                      {stage.outcomeNote}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        triggerConsultationForm(
                          stage.services[0]?.enquiryValue
                        )
                      }
                      className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                    >
                      Discuss {stage.goalTitle.toLowerCase()} goals
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column — 3 Structured Service Rows */}
                <div className="divide-y divide-slate-200/80 lg:col-span-8">
                  {stage.services.map((service) => (
                    <div
                      key={service.title}
                      className="group flex flex-col justify-between gap-5 p-6 transition-colors hover:bg-[#fafcff] sm:p-7 md:flex-row md:items-start"
                    >
                      <div className="max-w-xl">
                        <h4 className="font-display text-[1.18rem] font-bold text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
                          {service.title}
                        </h4>
                        <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                          {service.description}
                        </p>

                        <ul className="mt-3.5 flex flex-wrap gap-2">
                          {service.focusPoints.map((point) => (
                            <li
                              key={point}
                              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200/80 bg-[#f8fafc] px-2.5 py-1 text-[12px] font-medium text-slate-600"
                            >
                              <Check className="h-3 w-3 text-[#0f6dff]" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex shrink-0 flex-row items-center gap-2.5 md:flex-col md:items-end">
                        <Link
                          href={service.href}
                          className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-semibold text-[#0b1528] transition-all hover:border-[#0f6dff] hover:text-[#0f6dff]"
                        >
                          {service.ctaLabel}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            triggerConsultationForm(service.enquiryValue)
                          }
                          className="inline-flex h-9 items-center gap-1 px-2 text-[12.5px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0] hover:underline"
                        >
                          Request consultation
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom hub link */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-[#f8fafc] px-6 py-5 sm:flex-row">
          <p className="text-[14.5px] text-slate-600">
            <strong className="font-semibold text-[#0b1528]">
              Not sure where to begin?
            </strong>{" "}
            We can review your website and search presence first, then recommend
            the highest-impact starting point.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-700 hover:text-[#0f6dff]"
            >
              All Services Directory
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => triggerConsultationForm()}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#0f6dff] px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
            >
              Get Recommendations
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
