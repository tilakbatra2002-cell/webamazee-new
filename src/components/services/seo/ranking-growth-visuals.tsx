"use client";

/**
 * Google Ranking Growth — performance-focused presentation.
 *
 * Shows the opportunity-prioritisation method and the reporting cadence. No
 * ranking-position numbers, no projected-traffic charts, no "we reached #1"
 * claims: those cannot be honestly illustrated without real measured data.
 */
import { ArrowRight, Compass, Gauge, LineChart, Target } from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

export function OpportunityMatrix({
  quadrants,
  note,
}: {
  quadrants: { label: string; title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Choosing what to work on</p>
            <h2 className={`${heading} mt-2`}>Not every keyword deserves the same effort</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Ranking work starts with deciding where effort is worth spending. Terms are assessed
            on whether they match your business and on how realistic movement is from your
            current position — not on search volume alone.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid sm:grid-cols-2">
            {quadrants.map((q, i) => (
              <div
                key={q.title}
                className={`p-5 sm:p-6 ${
                  i % 2 === 0 ? "sm:border-r sm:border-slate-200" : ""
                } ${i < 2 ? "border-b border-slate-200" : ""}`}
              >
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                  {q.label}
                </span>
                <h3 className="mt-2 font-display text-[15px] font-bold">{q.title}</h3>
                <p className={`${body} mt-1.5`}>{q.text}</p>
              </div>
            ))}
          </div>
          <p className="border-t border-slate-200 bg-[#f7f9fc] px-5 py-4 text-[12.5px] leading-relaxed text-slate-600 sm:px-6">
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}

export function RankingMethodRail({
  stages,
}: {
  stages: { step: string; title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>How ranking work runs</p>
          <h2 className={`${heading} mt-2`}>Measure, change, review, repeat</h2>
          <p className={`${lead} mt-3`}>
            Ranking movement is a result of other work, not a task in itself. Each cycle starts
            from your recorded baseline so progress is compared against your own position.
          </p>
        </div>
        <ol className="mt-8 grid gap-3 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className={`${card} relative p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <Gauge aria-hidden="true" className="h-4 w-4" />
                  ) : i === 1 ? (
                    <Target aria-hidden="true" className="h-4 w-4" />
                  ) : i === 2 ? (
                    <Compass aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <LineChart aria-hidden="true" className="h-4 w-4" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">{s.step}</span>
              </div>
              <h3 className="mt-3.5 font-display text-[15px] font-bold">{s.title}</h3>
              <p className={`${body} mt-1.5`}>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CompetitorCompare({
  dimensions,
  note,
}: {
  dimensions: { title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className={eyebrow}>Competitor analysis</p>
            <h2 className={`${heading} mt-2`}>Where the gap actually is</h2>
            <p className={`${lead} mt-4`}>
              Competitor analysis is not a hunt for tricks. It identifies which pages are
              currently serving the searches you want, and what they cover that you do not.
            </p>
            <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-[12.5px] leading-relaxed text-slate-600">
              {note}
            </p>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {dimensions.map((d) => (
              <li key={d.title} className="border-t border-slate-300 py-4">
                <h3 className="flex items-start gap-2 font-display text-[14px] font-bold">
                  <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                  {d.title}
                </h3>
                <p className={`${body} mt-1`}>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
