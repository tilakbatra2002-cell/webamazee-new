"use client";

/**
 * Local SEO — location-focused presentation.
 *
 * Deliberately contains no map imagery, pin drops, "position #1" badges or
 * business-location mockups: those would imply real geographic rankings we
 * have not measured. The visual language is structural (profile fields,
 * consistency, location-page planning) instead.
 */
import Link from "next/link";
import { ArrowUpRight, Building2, Check, MapPin, Star } from "lucide-react";
import { body, card, container, eyebrow, heading, lead } from "./seo-theme";

export function LocalProfileBlock({
  fields,
  note,
}: {
  fields: { label: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Google Business Profile</p>
            <h2 className={`${heading} mt-2`}>The information customers check first</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            For a local business, the profile is often the first thing someone sees. Complete,
            consistent information is the foundation everything else builds on.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
              <p className="flex items-center gap-2 font-display text-[13px] font-bold">
                <Building2 aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                Profile fields that matter
              </p>
              <span className="rounded-full bg-[#eef4ff] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#0f6dff]">
                Structure
              </span>
            </div>
            <ul className="divide-y divide-slate-200">
              {fields.map((f) => (
                <li key={f.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[0.8fr_1.2fr] sm:px-6">
                  <p className="text-[12.5px] font-bold text-[#0b1528]">{f.label}</p>
                  <p className="text-[12.5px] leading-relaxed text-slate-600">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-[#0b1528] p-6 text-white">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">
                <Star aria-hidden="true" className="h-3.5 w-3.5" /> Reviews
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-300">
                Reviews are earned, not manufactured. Our work is to make leaving a review easy
                and to respond to feedback properly — never to write, buy or fabricate reviews.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-6">
              <p className="flex items-center gap-2 font-display text-[13.5px] font-bold">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" /> {note}
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-slate-600">
                Local visibility depends on the market, competition and how consistently your
                business is represented. No specific position is promised.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LocalConsistencyBlock({
  items,
}: {
  items: { title: string; text: string }[];
}) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-14">
          <div>
            <p className={eyebrow}>Consistency across the web</p>
            <h2 className={`${heading} mt-2`}>One business, one set of facts</h2>
          </div>
          <p className={`${lead} max-w-2xl lg:justify-self-end`}>
            When your name, address, phone number and hours differ between your website, your
            profile and directories, it becomes harder for customers and search engines to
            confirm which details are correct.
          </p>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li key={it.title} className={`${card} bg-white p-5`}>
              <p className="flex items-start gap-2 font-display text-[14px] font-bold">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                {it.title}
              </p>
              <p className={`${body} mt-1.5`}>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function LocalLocationPages({
  model,
  note,
}: {
  model: { label: string; title: string; text: string }[];
  note: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <p className={eyebrow}>Location landing pages</p>
            <h2 className={`${heading} mt-2`}>Pages that answer a specific local need</h2>
            <p className={`${lead} mt-4`}>
              A location page should be worth reading on its own. Copying one page and swapping
              the city name does not create local relevance, and it creates duplicate content.
            </p>
            <p className="mt-4 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 text-[12.5px] leading-relaxed text-slate-600">
              {note}
            </p>
            <Link
              href="/web-designing-company-zirakpur"
              className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-[#0f6dff] hover:underline"
            >
              See a live local page example <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {model.map((m) => (
              <li key={m.label} className="border-t-2 border-[#0f6dff] pt-4">
                <span className="font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                  {m.label}
                </span>
                <h3 className="mt-2 font-display text-[15px] font-bold">{m.title}</h3>
                <p className={`${body} mt-1.5`}>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
