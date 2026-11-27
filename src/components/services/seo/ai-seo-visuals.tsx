"use client";

/**
 * AI SEO — service-specific presentation.
 *
 * Two distinctive blocks:
 *  1. A semantic-search diagram (topic → entities → related questions) that
 *     explains how topical coverage is structured. Diagram only, no scores.
 *  2. An explicit human-review panel, so the page is honest about what is
 *     assisted and what is checked by people.
 */
import { Check, Eye, Layers, Search, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { card, container, eyebrow, heading, lead } from "./seo-theme";

export function AiSemanticDiagram({
  topic,
  entities,
  questions,
}: {
  topic: string;
  entities: string[];
  questions: string[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>How topical coverage is structured</p>
            <h2 className={`${heading} mt-2`}>From one topic to a connected set of pages</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Search engines and AI answer systems both work from relationships between things,
            not just single keywords. This is the structure we plan: a core topic, the entities
            that belong to it, and the questions people actually ask around it.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Core topic */}
            <div className="border-b border-slate-200 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0f6dff]">
                Core topic
              </p>
              <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#0b1528] p-5 text-white">
                <Layers aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#87b4ff]" />
                <div>
                  <p className="font-display text-lg font-bold leading-snug">{topic}</p>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-300">
                    The subject your pages should be the most useful answer to.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Entities to cover
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {entities.map((e) => (
                  <li
                    key={e}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-3 py-2 text-[12.5px] font-semibold text-slate-700"
                  >
                    <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#0f6dff]" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions */}
            <div className="p-6 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#0f6dff]">
                Questions the pages should answer
              </p>
              <ul className="mt-4 space-y-3">
                {questions.map((q) => (
                  <li key={q} className="flex items-start gap-3">
                    <Search aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                    <span className="text-[13.5px] leading-relaxed text-slate-600">{q}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-slate-200 bg-[#f7f9fc] p-3.5 text-[12.5px] leading-relaxed text-slate-600">
                Coverage is built around genuine usefulness. Answering a question with a thin
                page purely to match a query does not create topical authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AiHumanReviewPanel({
  assisted,
  human,
}: {
  assisted: string[];
  human: string[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Human review and quality control</p>
          <h2 className={`${heading} mt-2`}>AI assists. People decide.</h2>
          <p className={`${lead} mt-3`}>
            AI makes research, drafting and structured-data work faster. It does not publish
            anything on its own, and it does not replace review by someone who knows your
            business.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-2">
          <div className={`${card} p-6`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                <Sparkles aria-hidden="true" className="h-4 w-4" />
              </span>
              <h3 className="font-display text-[15px] font-bold">Where AI is used</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {assisted.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#0f6dff]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#0b1528] p-6 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#87b4ff]">
                <UserCheck aria-hidden="true" className="h-4 w-4" />
              </span>
              <h3 className="font-display text-[15px] font-bold">What stays human</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {human.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-300">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#87b4ff]" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-6 flex max-w-3xl items-start gap-2.5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 text-[12.5px] leading-relaxed text-slate-600">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
          <span>
            We make no guarantee of inclusion or position in AI-generated answers. How often a
            business appears in those results is controlled by the platforms, not by us. Our work
            is to make the underlying pages clear, well structured and genuinely useful.
          </span>
        </p>
      </div>
    </section>
  );
}

/**
 * Small legend used beside the AI page's measurement block so the page states
 * plainly which signals are structural and which are platform-controlled.
 */
export function AiSignalLegend({
  structural,
  assessed,
}: {
  structural: { label: string; text: string }[];
  assessed: string[];
}) {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        {structural.map((s) => (
          <div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="flex items-center gap-2 font-display text-[13.5px] font-bold">
              <Eye aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
              {s.label}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5">
        <p className="font-display text-[13.5px] font-bold">Reviewed by people, against your goals</p>
        <ul className="mt-3 space-y-2">
          {assessed.map((a) => (
            <li key={a} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-600">
              <span aria-hidden="true" className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#0f6dff]" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
