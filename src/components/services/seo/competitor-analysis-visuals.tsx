"use client";

/**
 * Competitor Analysis — service-specific presentation.
 *
 * Everything here describes the dimensions we examine and how findings are
 * turned into decisions. There are no fabricated competitor metrics, keyword
 * gaps, market shares or benchmark scores anywhere on this page.
 */
import { BarChart3, FileSearch, Layers, Lightbulb, Link2, Target } from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

/**
 * The analysis grid: what we look at, and the question each dimension
 * answers. A framework, not a results table.
 */
export function AnalysisDimensionsGrid({
  dimensions,
}: {
  dimensions: { icon: string; title: string; question: string; text: string }[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>What we analyse</p>
            <h2 className={`${heading} mt-2`}>Six dimensions, each answering a question</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Competitor research is only useful if it changes a decision. Each dimension below
            exists to answer a specific question about where your effort should go next.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {dimensions.map((d, i) => (
            <article key={d.title} className={`${card} flex h-full flex-col p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <FileSearch aria-hidden="true" className="h-4 w-4" />
                  ) : i === 1 ? (
                    <Target aria-hidden="true" className="h-4 w-4" />
                  ) : i === 2 ? (
                    <Link2 aria-hidden="true" className="h-4 w-4" />
                  ) : i === 3 ? (
                    <Layers aria-hidden="true" className="h-4 w-4" />
                  ) : i === 4 ? (
                    <BarChart3 aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Lightbulb aria-hidden="true" className="h-4 w-4" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3.5 font-display text-[15px] font-bold">{d.title}</h3>
              <p className="mt-1.5 text-[12.5px] font-semibold italic leading-relaxed text-[#0f6dff]">
                {d.question}
              </p>
              <p className={`${body} mt-2`}>{d.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Gap analysis explainer: how a keyword gap is identified in principle.
 * Shows the mechanism (who ranks / who does not / why) rather than invented
 * volumes or difficulty scores.
 */
export function GapAnalysisExplainer({
  stages,
  note,
}: {
  stages: { label: string; title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Keyword and content gaps</p>
            <h2 className={`${heading} mt-2`}>Finding the searches you are absent from</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            A gap is not simply a keyword a competitor ranks for. It is a search where their page
            answers the intent and yours either does not exist, or does not answer it as well.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className={`${card} bg-white p-5`}>
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                {s.label}
              </span>
              <h3 className="mt-2 font-display text-[15px] font-bold">{s.title}</h3>
              <p className={`${body} mt-1.5`}>{s.text}</p>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="mt-3 block h-px w-8 bg-[#0f6dff]/30" />
              )}
            </li>
          ))}
        </ol>

        <p className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-[12.5px] leading-relaxed text-slate-600">
          {note}
        </p>
      </div>
    </section>
  );
}

/**
 * Benchmark table explaining what "visibility" is compared against, using
 * labels and definitions only — no numbers attributed to real businesses.
 */
export function BenchmarkTable({
  rows,
  note,
}: {
  rows: { dimension: string; yours: string; theirs: string; decision: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Competitor benchmarking</p>
            <h2 className={`${heading} mt-2`}>Comparing like with like</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Benchmarking only means something when the comparison is fair. We compare against
            businesses competing for the same searches, not against the largest site in the
            sector.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0b1528] text-white">
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">
                    Dimension
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">
                    What we assess on your site
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">
                    What we assess on theirs
                  </th>
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">
                    The decision it informs
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.map((r) => (
                  <tr key={r.dimension} className="align-top">
                    <th scope="row" className="px-5 py-4 text-[13px] font-bold text-[#0b1528]">
                      {r.dimension}
                    </th>
                    <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.yours}</td>
                    <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.theirs}</td>
                    <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-slate-200 bg-[#f7f9fc] px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">
            {note}
          </p>
        </div>
      </div>
    </section>
  );
}
