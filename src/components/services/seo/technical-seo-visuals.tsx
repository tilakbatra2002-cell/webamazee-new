"use client";

/**
 * Technical SEO — conceptual diagrams.
 *
 * These illustrate real technical relationships (crawl → render → index →
 * rank, and a page's internal-link position). They deliberately show no
 * scores, grades or percentages, because inventing those would imply measured
 * results. Labels are the actual concepts being explained.
 */
import { Link2, Network, Server, ShieldAlert, Waypoints } from "lucide-react";
import { card, container, eyebrow, heading, lead } from "./seo-theme";

export function CrawlPathDiagram({
  stages,
}: {
  stages: { step: string; title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>How a page reaches search</p>
            <h2 className={`${heading} mt-2`}>Crawl, render, index, then rank</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            A technical issue at any one of these stages limits everything after it. That is why
            technical work is sequenced rather than treated as a checklist of unrelated fixes.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className="relative">
              <div className={`${card} h-full p-5`}>
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                    {i === 0 ? (
                      <Server aria-hidden="true" className="h-4 w-4" />
                    ) : i === 1 ? (
                      <Waypoints aria-hidden="true" className="h-4 w-4" />
                    ) : i === 2 ? (
                      <Network aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Link2 aria-hidden="true" className="h-4 w-4" />
                    )}
                  </span>
                  <span className="font-display text-[11px] font-bold text-slate-300">{s.step}</span>
                </div>
                <h3 className="mt-3.5 font-display text-[15px] font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ArchitectureDiagram({
  root,
  layers,
}: {
  root: string;
  layers: { label: string; items: string[] }[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Site architecture and internal linking</p>
            <h2 className={`${heading} mt-2`}>How pages are reached from the top</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Internal links decide how quickly and how clearly a page is understood. Orphaned
            pages, deep hierarchies and inconsistent navigation are structural problems, not
            content problems.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-[#0b1528] px-6 py-4 text-white sm:px-8">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">
              <Network aria-hidden="true" className="h-3.5 w-3.5" /> Structure, not hierarchy of
              importance
            </p>
            <p className="mt-1.5 font-display text-base font-bold">{root}</p>
          </div>
          <div className="divide-y divide-slate-200">
            {layers.map((layer) => (
              <div key={layer.label} className="grid gap-3 p-5 sm:grid-cols-[0.45fr_1.55fr] sm:px-8">
                <p className="font-display text-[13px] font-bold text-[#0b1528]">{layer.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {layer.items.map((it) => (
                    <li
                      key={it}
                      className="rounded-lg border border-slate-200 bg-[#f7f9fc] px-2.5 py-1.5 text-[12px] font-semibold text-slate-600"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="border-t border-slate-200 bg-[#f7f9fc] px-6 py-4 text-[12.5px] leading-relaxed text-slate-600 sm:px-8">
            This is an illustrative structure, not a template applied to every site. The right
            architecture follows your actual service and content model.
          </p>
        </div>
      </div>
    </section>
  );
}

export function TechnicalRiskList({
  risks,
}: {
  risks: { title: string; text: string }[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Things we check first</p>
          <h2 className={`${heading} mt-2`}>Common sources of technical loss</h2>
          <p className={`${lead} mt-3`}>
            These are the recurring causes we look for in a technical audit. Whether each one
            affects your site is determined by the audit, not assumed in advance.
          </p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-5xl gap-x-8 sm:grid-cols-2">
          {risks.map((r) => (
            <li key={r.title} className="flex items-start gap-3 border-t border-slate-200 py-4">
              <ShieldAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
              <div>
                <h3 className="font-display text-[14.5px] font-bold">{r.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
