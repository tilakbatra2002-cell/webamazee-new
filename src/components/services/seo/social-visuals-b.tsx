"use client";

/**
 * Facebook Marketing, LinkedIn Marketing and Social Media Advertising
 * presentation blocks.
 *
 * Lead journeys, professional positioning and paid campaign lifecycles are
 * described as processes. No result figures, cost-per-lead values, ROAS
 * claims or fabricated analytics screenshots appear in this file.
 */
import {
  BadgeCheck,
  Check,
  CircleDollarSign,
  Crosshair,
  FileText,
  Gauge,
  MapPin,
  MessageSquare,
  Repeat2,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

/* ------------------------------------------------------------------ */
/* Facebook Marketing                                                  */
/* ------------------------------------------------------------------ */

/**
 * Audience to enquiry. The brief asks for the follow-up path to be
 * prominent, so capture and response get equal weight to targeting.
 */
export function LeadJourney({
  title,

  steps,
  note,
}: {
  title: string;
  steps: { step: string; title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Targeting to enquiry</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Most Facebook lead campaigns fail at the end, not the start. What happens after
            someone clicks matters as much as who saw the ad.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <Crosshair aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i === 1 || i === 2 ? (
                    <Users aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i === 3 ? (
                    <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
                {s.step}
              </p>
              <p className="mt-1 font-display text-[14px] font-bold">{s.title}</p>
              <p className={`${body} mt-1.5`}>{s.text}</p>
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
 * How location and interest targeting are combined. Describes the inputs a
 * campaign is built from — no claimed audience sizes.
 */
export function AudienceSegmentation({
  segments,
  note,
}: {
  segments: { title: string; text: string; example: string }[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Audience segmentation</p>
            <h2 className={`${heading} mt-2`}>Who a campaign is actually built from</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Facebook targeting is layered. Each layer narrows the audience, so the layers that
            matter most depend on whether you need reach or enquiries.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <article key={s.title} className={`${card} flex h-full flex-col bg-white p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                  ) : i === 1 ? (
                    <Users aria-hidden="true" className="h-4 w-4" />
                  ) : i === 2 ? (
                    <Target aria-hidden="true" className="h-4 w-4" />
                  ) : (
                    <Repeat2 aria-hidden="true" className="h-4 w-4" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3.5 font-display text-[14.5px] font-bold">{s.title}</p>
              <p className={`${body} mt-1.5`}>{s.text}</p>
              <p className="mt-3 rounded-lg bg-[#f7f9fc] px-2.5 py-2 text-[11.5px] leading-snug text-slate-500">
                {s.example}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-[12.5px] leading-relaxed text-slate-600">
          {note}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* LinkedIn Marketing                                                  */
/* ------------------------------------------------------------------ */

/**
 * The B2B path: authority precedes conversation. Presented as a sequence
 * because that is the actual argument for LinkedIn over other channels.
 */
export function B2BJourney({
  title,

  stages,
  note,
}: {
  title: string;
  stages: { title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>The B2B journey</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Decision-makers rarely reply to a first message from an unfamiliar company. LinkedIn
            works when visibility is built before outreach begins.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <li key={s.title} className={`${card} p-5`}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                  {i === 0 ? (
                    <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i === 1 ? (
                    <FileText aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i === 2 ? (
                    <UserCheck aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <MessageSquare aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 font-display text-[14px] font-bold">{s.title}</p>
              <p className={`${body} mt-1.5`}>{s.text}</p>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="mt-3 block h-px w-8 bg-[#0f6dff]/30" />
              )}
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
 * Company page and personal profile carry different credibility, so the
 * page explains the division of labour instead of treating "LinkedIn" as
 * one channel.
 */
export function ProfileSplit({
  company,
  personal,
  note,
}: {
  company: string[];
  personal: string[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Company page and personal profile</p>
          <h2 className={`${heading} mt-2`}>Two profiles, two jobs</h2>
          <p className={`${lead} mt-3`}>{note}</p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 lg:grid-cols-2">
          <div className={`${card} bg-white p-6`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                <BadgeCheck aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="font-display text-[15px] font-bold">Company page</p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${card} bg-white p-6`}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                <UserCheck aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="font-display text-[15px] font-bold">Personal profile</p>
            </div>
            <ul className="mt-4 space-y-2.5">
              {personal.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                  <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                  {p}
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
/* Social Media Advertising                                            */
/* ------------------------------------------------------------------ */

/**
 * Campaign lifecycle. Shows where money is spent and where it is checked,
 * which is the whole argument for active management.
 */
export function CampaignLifecycle({
  title,

  phases,
  note,
}: {
  title: string;
  phases: { title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Campaign lifecycle</p>
            <h2 className={`${heading} mt-2`}>{title}</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Launching is the easy part. The work that decides whether spend is effective happens
            in the weeks after, once real delivery data exists.
          </p>
        </div>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {phases.map((p, i) => (
            <li key={p.title} className={`${card} p-5`}>
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                  {i < 2 ? (
                    <Target aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : i < 4 ? (
                    <Gauge aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <Repeat2 aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 font-display text-[14.5px] font-bold">{p.title}</p>
              <p className={`${body} mt-1.5`}>{p.text}</p>
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
 * The tracking chain. If any link is missing, reported conversions are not
 * trustworthy — worth stating plainly on a page selling accountable spend.
 */
export function TrackingChain({
  steps,
  note,
}: {
  steps: { title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Conversion tracking</p>
            <h2 className={`${heading} mt-2`}>If tracking is wrong, the reporting is wrong</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            Every campaign is built on a measurement chain. We check each link before launch,
            because decisions made on broken data are worse than no decisions.
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

        <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-white p-4 text-[12.5px] leading-relaxed text-slate-600">
          <CircleDollarSign aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
          <span>{note}</span>
        </p>
      </div>
    </section>
  );
}
