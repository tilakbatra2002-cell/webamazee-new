"use client";

/**
 * Social Media Management, Social Media Marketing and Instagram Marketing
 * presentation blocks.
 *
 * Each block is explanatory: it shows how the work is organised, never how
 * well it performed. There are no follower counts, engagement rates, reach
 * figures or campaign results anywhere in this file.
 */
import {
  CalendarDays,
  Check,
  Clock,
  Grid3x3,
  Megaphone,
  MessageCircle,
  Repeat,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

/* ------------------------------------------------------------------ */
/* Social Media Management                                             */
/* ------------------------------------------------------------------ */

/**
 * A representative month, rendered as a labelled grid rather than a fake
 * screenshot. The cells describe the *type* of work, not invented results.
 */
export function ContentCalendarMock({
  title,

  weeks,
  legend,
  note,
}: {
  title: string;
  weeks: { label: string; cells: string[] }[];
  legend: { label: string; tone: "blue" | "slate" | "ink" }[];
  note: string;
}) {
  const tone: Record<string, string> = {
    blue: "bg-[#eef4ff] text-[#0b57d0] border-[#cfe0ff]",
    slate: "bg-[#f7f9fc] text-slate-600 border-slate-200",
    ink: "bg-[#0b1528] text-white border-[#0b1528]",
  };
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>A month of content</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Every month starts as a plan you can see and amend. Content is prepared ahead of
            publication so nothing goes out unreviewed or unplanned.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {weeks.map((w) => (
            <div key={w.label} className={`${card} p-4`}>
              <div className="flex items-center gap-1.5">
                <CalendarDays aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-slate-500">
                  {w.label}
                </p>
              </div>
              <ul className="mt-3 space-y-1.5">
                {w.cells.map((c, i) => {
                  const t = legend[i % legend.length]?.tone ?? "slate";
                  return (
                    <li
                      key={`${c}-${i}`}
                      className={`rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold leading-snug ${tone[t]}`}
                    >
                      {c}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 py-3">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${l.tone === "blue" ? "bg-[#0f6dff]" : l.tone === "ink" ? "bg-[#0b1528]" : "bg-slate-300"}`} />
              {l.label}
            </span>
          ))}
          <span className="text-[12px] text-slate-500">{note}</span>
        </div>
      </div>
    </section>
  );
}

/**
 * Management vs campaign: the brief asks explicitly for this distinction to
 * be unambiguous, so it gets a dedicated two-column comparison.
 */
export function ManagementVsCampaign({
  managed,
  campaign,
  note,
}: {
  managed: string[];
  campaign: string[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Two different jobs</p>
          <h2 className={`${heading} mt-2`}>Ongoing management is not a campaign</h2>
          <p className={`${lead} mt-3`}>{note}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 lg:grid-cols-2">
          <div className={`${card} bg-white p-6`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                <Repeat aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="font-display text-[15px] font-bold">This service: management</p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {managed.map((m) => (
                <li key={m} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#0b1528] p-6 text-white">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#87b4ff]">
                <Megaphone aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="font-display text-[15px] font-bold">Social Media Marketing</p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {campaign.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-300">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#87b4ff]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social Media Marketing                                              */
/* ------------------------------------------------------------------ */

/**
 * Campaign funnel: the chain from audience to enquiry. Each link is a
 * decision, not a projected number.
 */
export function CampaignFunnel({
  title,

  links,
  note,
}: {
  title: string;
  links: { step: string; title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>From attention to enquiry</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Reach on its own is not a business result. Each stage below exists to move someone
            closer to a conversation, and each is measured separately.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {links.map((l, i) => (
            <li key={l.title} className={`${card} relative p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                  {i < 2 ? (
                    <Users aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i < 4 ? (
                    <Target aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
                {l.step}
              </p>
              <p className="mt-1 font-display text-[14px] font-bold">{l.title}</p>
              <p className={`${body} mt-1.5`}>{l.text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 text-[12.5px] leading-relaxed text-slate-600">
          {note}
        </p>
      </div>
    </section>
  );
}

/**
 * Where this sits between management and paid advertising, so the three
 * adjacent services are not confused for one another.
 */
export function ServicePositioning({
  rows,
}: {
  rows: { service: string; focus: string; suited: string }[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Choosing the right service</p>
            <h2 className={`${heading} mt-2`}>Three social services, three jobs</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Organic campaigns sit between steady account management and paid media. If you are
            unsure which you need, the differences are usually obvious from your objective.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="bg-[#0b1528] text-white">
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">Service</th>
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">Focus</th>
                  <th scope="col" className="px-5 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.1em]">Best suited to</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {rows.map((r) => (
                  <tr key={r.service} className="align-top">
                    <th scope="row" className="px-5 py-4 text-[13px] font-bold text-[#0b1528]">{r.service}</th>
                    <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.focus}</td>
                    <td className="px-5 py-4 text-[12.5px] leading-relaxed text-slate-600">{r.suited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram Marketing                                                 */
/* ------------------------------------------------------------------ */

/**
 * Content-format grid. Instagram's formats carry different jobs, so the
 * page explains which does what rather than showing a mocked-up profile
 * with invented follower counts.
 */
export function InstagramFormats({
  title,

  formats,
  note,
}: {
  title: string;
  formats: { name: string; job: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Formats and their jobs</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Treating every format the same is the most common Instagram mistake. Each one sits at
            a different point in how people discover and follow a brand.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((f) => (
            <article key={f.name} className={`${card} flex h-full flex-col p-5`}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                {f.name.toLowerCase().includes("reel") ? (
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                ) : f.name.toLowerCase().includes("stor") ? (
                  <Clock aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Grid3x3 aria-hidden="true" className="h-4 w-4" />
                )}
              </span>
              <p className="mt-3.5 font-display text-[14.5px] font-bold">{f.name}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.09em] text-[#0f6dff]">
                {f.job}
              </p>
              <p className={`${body} mt-2`}>{f.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 text-[12.5px] leading-relaxed text-slate-600">
          {note}
        </p>
      </div>
    </section>
  );
}

/**
 * A content-planning week: the creative pipeline from idea to publish.
 */
export function InstagramPlanningFlow({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Content planning</p>
            <h2 className={`${heading} mt-2`}>How a month of Instagram is built</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Ideas are briefed, shot and edited ahead of time so the account keeps posting when
            the team is busy — which is usually when consistency breaks down.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className={`${card} bg-white p-5`}>
              <span className="font-display text-[11px] font-bold text-slate-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-1.5 font-display text-[14px] font-bold">{s.title}</p>
              <p className={`${body} mt-1.5`}>{s.text}</p>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="mt-3 block h-px w-8 bg-[#0f6dff]/30" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
