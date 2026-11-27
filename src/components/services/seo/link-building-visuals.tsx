"use client";

/**
 * Link Building — service-specific presentation.
 *
 * Deliberately contains no backlink counts, domain-authority figures or
 * traffic projections. Everything here describes how links are evaluated and
 * earned, not what has supposedly been achieved.
 */
import { Check, Link2, ShieldCheck, Sparkles, X } from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

/**
 * Link quality tiers: the criteria used to judge whether a link is worth
 * pursuing. This is a framework for evaluation, not a report of results.
 */
export function LinkQualityTiers({
  tiers,
  note,
}: {
  tiers: { label: string; title: string; text: string; points: string[] }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Link quality and safety standards</p>
            <h2 className={`${heading} mt-2`}>How we decide a link is worth having</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            A link is only useful if a real reader could plausibly follow it and find something
            relevant. Volume is not the measure we work to, and it is not the measure we report.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <article key={t.title} className={`${card} flex h-full flex-col p-6`}>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#eef4ff] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
                  {t.label}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 font-display text-[15.5px] font-bold">{t.title}</h3>
              <p className={`${body} mt-1.5`}>{t.text}</p>
              <ul className="mt-4 space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-slate-600">
                    <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
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
 * What we refuse to do, set against what we do instead. Stating the boundary
 * plainly is more useful than another benefits grid, and it keeps the page
 * honest about what "white-hat" means in practice.
 */
export function LinkStandardsPanel({
  avoid,
  instead,
}: {
  avoid: string[];
  instead: string[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Ethical authority building</p>
          <h2 className={`${heading} mt-2`}>What we will not do to win links</h2>
          <p className={`${lead} mt-3`}>
            Link schemes work until they are found. A short-term gain that risks a manual action
            is a bad trade for a business that intends to keep trading.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-2">
          <div className={`${card} bg-white p-6`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-500">
                <X aria-hidden="true" className="h-4 w-4" />
              </span>
              <h3 className="font-display text-[15px] font-bold">We do not</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {avoid.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <X aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#0b1528] p-6 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#87b4ff]">
                <Sparkles aria-hidden="true" className="h-4 w-4" />
              </span>
              <h3 className="font-display text-[15px] font-bold">We focus on</h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {instead.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-300">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#87b4ff]" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The ways links are actually earned. Each row is a method with what it
 * involves and what it depends on — no promises attached.
 */
export function LinkMethodRows({
  methods,
}: {
  methods: { title: string; text: string; depends: string }[];
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Ways links are earned</p>
            <h2 className={`${heading} mt-2`}>Methods, and what each one needs</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Not every method suits every business. Which ones we use depends on your sector, the
            content you already have and what a publisher would reasonably link to.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="divide-y divide-slate-200">
            {methods.map((m, i) => (
              <div
                key={m.title}
                className="grid gap-2 p-5 sm:grid-cols-[auto_1fr_1.2fr] sm:items-start sm:gap-6 sm:px-7"
              >
                <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
                    <Link2 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{m.text}</p>
                </div>
                <p className="text-[12.5px] leading-relaxed text-slate-500 sm:border-l sm:border-slate-200 sm:pl-6">
                  <span className="font-bold uppercase tracking-[0.08em] text-slate-400">
                    Depends on
                  </span>
                  <br />
                  {m.depends}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
