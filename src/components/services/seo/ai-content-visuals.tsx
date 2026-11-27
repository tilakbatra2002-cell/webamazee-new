"use client";

/**
 * AI Content Optimisation — editorial pipeline presentation.
 *
 * The page's job is to separate what AI does from what editors do, so the
 * pipeline shows both tracks side by side rather than presenting "AI" as a
 * single black box. No output, traffic or ranking figures anywhere.
 */
import { Bot, Check, FileText, PenLine, ShieldCheck, UserCheck } from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

/**
 * Two-track production pipeline. Each stage states what the model does and
 * what a human does, which is the core promise of the service.
 */
export function EditorialPipeline({
  stages,
  note,
}: {
  stages: { stage: string; ai: string; human: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Human and machine, in sequence</p>
            <h2 className={`${heading} mt-2`}>Where AI helps, and where it stops</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            AI is used for the work it is genuinely good at: gathering, structuring and drafting
            at speed. Judgement, accuracy and brand voice stay with an editor.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="hidden grid-cols-[0.6fr_1fr_1fr] gap-6 border-b border-slate-200 bg-[#f7f9fc] px-6 py-3 sm:grid">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Stage
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
              <Bot aria-hidden="true" className="h-3.5 w-3.5" />
              AI-assisted
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              <UserCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Human-reviewed
            </span>
          </div>
          <div className="divide-y divide-slate-200">
            {stages.map((s, i) => (
              <div
                key={s.stage}
                className="grid gap-2 px-6 py-4 sm:grid-cols-[0.6fr_1fr_1fr] sm:items-start sm:gap-6"
              >
                <div className="flex items-center gap-2">
                  <span className="font-display text-[11px] font-bold text-slate-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-display text-[13.5px] font-bold">{s.stage}</p>
                </div>
                <p className="text-[12.5px] leading-relaxed text-slate-600">{s.ai}</p>
                <p className="text-[12.5px] leading-relaxed text-slate-600 sm:border-l sm:border-slate-200 sm:pl-6">
                  {s.human}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 text-[12.5px] leading-relaxed text-slate-600">
          <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
          <span>{note}</span>
        </p>
      </div>
    </section>
  );
}

/**
 * What "quality" means here, expressed as editorial checks rather than a
 * score. Deliberately no /100 figure anywhere.
 */
export function EditorialStandards({ checks }: { checks: { title: string; text: string }[] }) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Editorial standards</p>
            <h2 className={`${heading} mt-2`}>What every draft has to pass</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            These are the checks applied before anything is published. A draft that fails them
            goes back for another pass, or is discarded.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {checks.map((c) => (
            <article key={c.title} className={`${card} flex h-full flex-col p-5`}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="mt-3.5 font-display text-[14.5px] font-bold">{c.title}</p>
              <p className={`${body} mt-1.5`}>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The content lifecycle: create, measure, refresh. Explains that publishing
 * is the middle of the process, not the end.
 */
export function ContentLifecycle({ phases }: { phases: { title: string; text: string }[] }) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Content refreshes</p>
            <h2 className={`${heading} mt-2`}>Publishing is the middle, not the end</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Search intent shifts and competitors publish. A page that was accurate and complete
            can quietly stop being either, so existing content is reviewed on a cycle.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <li key={p.title} className={`${card} p-5`}>
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <PenLine aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 font-display text-[14.5px] font-bold">{p.title}</p>
              <p className={`${body} mt-1.5`}>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
