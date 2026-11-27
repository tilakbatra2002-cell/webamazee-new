"use client";

/**
 * Shared shell for the two legal pages (privacy policy, terms & conditions).
 *
 * Both pages used to be a centred hero followed by a single narrow column of
 * numbered headings — accurate, but read as an afterthought next to the rest of
 * the site. This rebuild keeps every word of the legal copy and changes only
 * the presentation:
 *
 *   - a navy opening panel that matches the case-study heroes (tag, title,
 *     "last updated", and a count of the sections inside),
 *   - a sticky, numbered table of contents on the left that follows the
 *     reader down the document and marks the section currently in view,
 *   - the document itself as numbered rule-separated sections on the right,
 *     so long legal paragraphs stay scannable,
 *   - a closing contact panel so the page ends on an action rather than a
 *     full stop.
 *
 * The contents list is generated from the same `sections` array the body
 * renders, so it can never drift out of sync with the document.
 */
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, FileText, Mail, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "./breadcrumb";
import { Reveal } from "../ui/reveal";

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LegalLayout({
  eyebrow,
  title,
  highlight,
  updated,
  sections,
  contactEmail = "info@webamazee.com",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
  contactEmail?: string;
}) {
  const ids = useMemo(
    () => sections.map((s, i) => `${slugify(s.heading)}-${i + 1}`),
    [sections]
  );

  /** Index of the section currently crossing the reading line. */
  const [active, setActive] = useState(0);
  const headings = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    // Treat the row of the viewport just under the fixed header as "here".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        });
      },
      { rootMargin: "-120px 0px -62% 0px", threshold: 0 }
    );

    headings.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Opening panel — same navy shell the case studies open with.       */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white pb-10 pt-28 sm:pt-32">
        <div className={container}>
          <Breadcrumb align="start" crumbs={[{ label: eyebrow }]} />

          <div className="mt-7 rounded-3xl bg-[#0b1528] px-5 py-8 sm:px-9 sm:py-10">
            <div className="grid items-start gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-300">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  {eyebrow}
                </p>
                <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.038em] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
                  {title}
                  {highlight ? (
                    <>
                      {" "}
                      <span className="text-brand-300">{highlight}</span>
                    </>
                  ) : null}
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  This page explains, in plain language, what the policy covers
                  and what it means for you. It applies to this website and the
                  services Webamazee provides.
                </p>
                <div className="mt-6 border-y border-white/12 py-5">
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                    <div className="min-w-0">
                      <dt className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-300">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Last updated
                      </dt>
                      <dd className="mt-1 text-[13px] font-semibold leading-snug text-white">
                        {updated}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-300">
                        Sections
                      </dt>
                      <dd className="mt-1 text-[13px] font-semibold leading-snug text-white">
                        {sections.length} in total
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-[10.5px] font-bold uppercase tracking-[0.13em] text-brand-300">
                        Questions
                      </dt>
                      <dd className="mt-1 truncate text-[13px] font-semibold leading-snug text-white">
                        {contactEmail}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                  <a
                    href={`mailto:${contactEmail}`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#0b57d0]"
                  >
                    Ask a question <Mail className="h-4 w-4" aria-hidden />
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Contact us <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>

              {/* Contents card — the document at a glance. */}
              <div className="min-w-0 rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-300">
                  What this page covers
                </p>
                <ol className="mt-4 space-y-2.5">
                  {sections.map((s, i) => (
                    <li key={s.heading} className="flex items-start gap-2.5">
                      <span className="mt-px font-display text-[11px] font-bold tabular-nums text-brand-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] leading-snug text-slate-300">
                        {s.heading}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The document: sticky contents rail + numbered sections.           */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white pb-10 pt-10">
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-[0.3fr_0.7fr] lg:gap-14">
            {/* Sticky rail */}
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-28">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  On this page
                </p>
                <nav className="mt-4 border-l border-line">
                  {sections.map((s, i) => {
                    const isActive = active === i;
                    return (
                      <a
                        key={ids[i]}
                        href={`#${ids[i]}`}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "-ml-px flex items-start gap-2.5 border-l-2 py-2 pl-4 text-[13px] leading-snug transition-colors",
                          isActive
                            ? "border-brand-600 font-semibold text-brand-700"
                            : "border-transparent text-slate-500 hover:border-slate-300 hover:text-ink",
                        ].join(" ")}
                      >
                        <span className="font-display text-[11px] font-bold tabular-nums text-slate-400">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">{s.heading}</span>
                      </a>
                    );
                  })}
                </nav>
                <div className="mt-6 rounded-xl border border-line bg-surface/60 p-4">
                  <p className="text-[12.5px] font-semibold leading-snug text-ink">
                    Need this clarified?
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">
                    Write to us and we will explain any clause in plain terms.
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-3 inline-flex items-center gap-1.5 border-b border-brand-600/35 pb-0.5 text-[12.5px] font-semibold text-brand-700 transition-colors hover:border-brand-700"
                  >
                    {contactEmail} <ArrowUpRight className="h-3 w-3" aria-hidden />
                  </a>
                </div>
              </div>
            </aside>

            {/* Document body */}
            <div className="min-w-0">
              <div className="space-y-0">
                {sections.map((s, i) => (
                  <Reveal key={s.heading} delay={0.02 * Math.min(i, 4)}>
                    <section
                      id={ids[i]}
                      data-index={i}
                      ref={(el) => {
                        headings.current[i] = el;
                      }}
                      className="scroll-mt-28 border-t border-line py-8 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-[12px] font-bold tabular-nums text-brand-600/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="font-display text-[1.35rem] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                          {s.heading}
                        </h2>
                      </div>
                      <div className="mt-3 space-y-3 pl-0 sm:pl-9">
                        {s.body.map((p, j) => (
                          <p
                            key={j}
                            className="max-w-[62ch] text-[14.5px] leading-relaxed text-slate-600"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  </Reveal>
                ))}
              </div>

              {/* Closing note */}
              <div className="mt-4 rounded-2xl border border-line bg-surface/60 p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Check className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-[15.5px] font-bold text-ink">
                      Questions about this page
                    </h2>
                    <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-slate-600">
                      If anything here is unclear, or you would like a copy of the
                      information held about you, email{" "}
                      <a
                        href={`mailto:${contactEmail}`}
                        className="font-semibold text-brand-700 underline decoration-brand-600/30 underline-offset-2 hover:decoration-brand-700"
                      >
                        {contactEmail}
                      </a>{" "}
                      and we will respond directly.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-[13.5px] font-semibold text-ink shadow-soft transition-colors hover:border-brand-600/40 hover:text-brand-700"
                    >
                      Go to contact page <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
