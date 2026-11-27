"use client";

/**
 * Shared narrative sections for the detailed case studies.
 *
 * These carry the layout only — every string is passed in from the project
 * record or from a page's own copy, so no two projects inherit the same
 * paragraph. Section rhythm varies per project because the pages compose
 * these in different orders and with different emphasis.
 */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

/** Section heading block. `align` lets projects vary their rhythm. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
}) {
  return (
    <div className={cn(id && "scroll-mt-28", align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl")}>
      <p
        className={cn(
          "text-[11.5px] font-bold uppercase tracking-[0.17em]",
          tone === "dark" ? "text-brand-300" : "text-brand-700"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-0.025em] sm:text-[2.15rem] lg:text-[2.5rem]",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed",
            tone === "dark" ? "text-slate-300" : "text-slate-600"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * Project facts: timeline and team as recorded, plus the industry SEO
 * cross-reference that the previous template carried on every case study.
 */
export function ProjectFacts({
  timeline,
  team,
  industryHref,
  industryLabel,
}: {
  timeline: string;
  team: string;
  industryHref?: string;
  industryLabel?: string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-700">Timeline</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{timeline}</p>
      </div>
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-700">Team</p>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{team}</p>
      </div>
      {industryHref && (
        <div className="min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-700">
            Sector guidance
          </p>
          <Link
            href={industryHref}
            className="mt-1.5 inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[13.5px] font-semibold text-brand-700 hover:border-brand-700"
          >
            {industryLabel} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * The three-part project account — challenge, solution, outcome — that the
 * previous template carried. Kept because it is the clearest short statement
 * of what the engagement actually was.
 */
export function ProjectAccount({
  exec,
  tone = "light",
}: {
  exec: { challenge: string; solution: string; outcome: string };
  tone?: "light" | "dark";
}) {
  const parts = [
    { label: "The challenge", body: exec.challenge },
    { label: "The solution", body: exec.solution },
    { label: "The outcome", body: exec.outcome },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {parts.map((p, i) => (
        <div
          key={p.label}
          className={cn(
            "min-w-0 rounded-2xl border p-5",
            tone === "dark" ? "border-white/12 bg-white/[0.04]" : "border-line bg-white"
          )}
        >
          <p
            className={cn(
              "font-display text-[11px] font-bold tabular-nums tracking-[0.1em]",
              tone === "dark" ? "text-brand-300" : "text-brand-600"
            )}
          >
            {String(i + 1).padStart(2, "0")} · {p.label}
          </p>
          <p
            className={cn(
              "mt-2 text-[13.5px] leading-relaxed",
              tone === "dark" ? "text-slate-300" : "text-slate-600"
            )}
          >
            {p.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Numbered editorial list — used for objectives and requirements. */
export function NumberedList({
  items,
  tone = "light",
}: {
  items: string[];
  tone?: "light" | "dark";
}) {
  return (
    <ol className="divide-y divide-line/80">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-4 py-3.5">
          <span
            className={cn(
              "mt-0.5 shrink-0 font-display text-[12px] font-bold tabular-nums",
              tone === "dark" ? "text-brand-300" : "text-brand-600/70"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "text-[14.5px] leading-relaxed",
              tone === "dark" ? "text-slate-200" : "text-slate-700"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Two-up problem cards — used for challenge sets. */
export function ChallengeGrid({
  items,
  tone = "light",
}: {
  items: { title: string; desc: string }[];
  tone?: "light" | "dark";
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            "rounded-2xl border p-5",
            tone === "dark"
              ? "border-white/12 bg-white/[0.04]"
              : "border-line bg-surface/60"
          )}
        >
          <span
            className={cn(
              "font-display text-[11px] font-bold tabular-nums tracking-[0.1em]",
              tone === "dark" ? "text-brand-300" : "text-brand-600"
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3
            className={cn(
              "mt-2 font-display text-[15px] font-bold leading-snug",
              tone === "dark" ? "text-white" : "text-ink"
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 text-[13.5px] leading-relaxed",
              tone === "dark" ? "text-slate-300" : "text-slate-600"
            )}
          >
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Vertical step rail — discovery, design or delivery sequences. */
export function StepRail({
  steps,
  label,
}: {
  steps: { title: string; desc: string }[];
  label?: string;
}) {
  return (
    <div className="relative">
      {label && (
        <p className="mb-4 text-[11.5px] font-bold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      )}
      <ol className="space-y-0">
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
            <div className="flex flex-col items-center">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand-600/25 bg-brand-50 font-display text-[11.5px] font-bold text-brand-700 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden className="mt-1 w-px flex-1 bg-line" />
              )}
            </div>
            <div className="min-w-0 pt-1">
              <h3 className="font-display text-[14.5px] font-bold leading-snug text-ink">{s.title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Deliverable checklist, two columns, kept deliberately plain. */
export function DeliverableList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
          <span className="text-[14px] leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Technology chips, matching the existing stack presentation. */
export function StackChips({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((t) => (
        <li
          key={t}
          className="rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Contextual service links — inline prose plus a compact chip row. */
export function ServiceRefs({
  services,
  intro,
}: {
  services: { slug: string; name: string }[];
  intro?: string;
}) {
  return (
    <div>
      {intro && <p className="max-w-3xl text-[14.5px] leading-relaxed text-slate-600">{intro}</p>}
      <ul className="mt-5 flex flex-wrap gap-2.5">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-brand-700 shadow-soft transition-colors hover:border-brand-600/40 hover:bg-brand-50"
            >
              {s.name}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Frequently asked questions, from the project's own record. */
export function FaqBlock({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <Accordion items={faqs} />;
}

/**
 * Related case studies. Kept to a quiet two-up so it does not read as
 * another card grid competing with the project work above it.
 */
export function RelatedStudies({
  studies,
}: {
  studies: { slug: string; name: string; summary: string; image: string; service: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {studies.map((s) => (
        <Link
          key={s.slug}
          href={`/case-studies/${s.slug}`}
          className="group flex min-w-0 flex-col rounded-2xl border border-line bg-white p-2.5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:shadow-glow"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface">
            <Image
              src={s.image}
              alt={`${s.name} project`}
              fill
              sizes="(max-width: 640px) 92vw, 420px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </div>
          <div className="flex flex-1 flex-col px-2 pb-1.5 pt-3.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">{s.service}</span>
            <h3 className="mt-1.5 font-display text-[16px] font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
              {s.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{s.summary}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-700">
              Read the case study <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Closing call to action, in the site's existing dark-navy pattern. */
export function CaseStudyCta({
  title,
  body,
  primary = { label: "Start Your Project", href: "/contact" },
  secondary,
}: {
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-[#0b1528] py-16 sm:py-20">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[1.8rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.3rem]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{body}</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="inline-flex h-[3.1rem] items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-7 text-[14.5px] font-semibold text-white shadow-glow transition-colors hover:bg-[#0b57d0]"
            >
              {primary.label} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex h-[3.1rem] items-center justify-center rounded-full border border-white/25 px-7 text-[14.5px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Factual "at a glance" panel for the record's own one-line description of
 * the business. Deliberately not a blockquote and carries no quote marks, so
 * it can never be mistaken for a client testimonial — none exist for these
 * projects, and one must not be implied.
 */
export function GlancePanel({ text, label }: { text: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-surface/70 p-5 sm:p-6">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-700">{label}</p>
      <p className="mt-2 text-[14.5px] leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}
