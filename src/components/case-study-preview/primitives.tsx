import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { Reveal } from "@/components/mohali-preview/reveal";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

/**
 * Preview metadata for a case-study redesign.
 *
 * Deliberately noindex + nofollow and self-canonical: the live case study at
 * /case-studies/<slug> remains the indexed original, unchanged.
 */
export function previewMeta(cs: CaseStudy, keywords: string[]): Metadata {
  return generateMetadata({
    title: `${cs.name} Case Study — Redesign Preview | Webamazee`,
    metaTitle: `${cs.name} Case Study — Redesign Preview | Webamazee`,
    metaDescription: cs.metaDescription,
    canonical: `/new-case-studies/${cs.slug}`,
    path: `/new-case-studies/${cs.slug}`,
    keywords,
    schemaType: "article",
    category: "Case Study Preview",
    absoluteTitle: true,
    noindex: true,
    nofollow: true,
  });
}

export function findCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

// ---------------------------------------------------------------------------
// Shared pieces — layout is supplied by each page, not here
// ---------------------------------------------------------------------------

/** Standing notice: live page is untouched, this one is a review build. */
export function PreviewBanner() {
  return (
    <div className="bg-white pt-16 sm:pt-20">
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2.5 sm:px-7 lg:px-10">
          <span className="rounded bg-amber-200/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[.14em] text-amber-900">
            Preview
          </span>
          <p className="text-[12.5px] leading-snug text-amber-900">
            Redesign preview for review. The live case study at the original URL is
            unchanged and this page is not indexed.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Home / Case Studies / Project — the last crumb is never a link. */
export function Crumbs({
  name,
  light = false,
}: {
  name: string;
  light?: boolean;
}) {
  const base = light ? "text-white/55" : "text-slate-400";
  const hover = light ? "hover:text-white" : "hover:text-slate-700";
  const here = light ? "text-white/85" : "text-slate-600";
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1.5 text-[12.5px] ${base}`}>
      <Link href="/" className={`transition ${hover}`}>
        Home
      </Link>
      <ChevronRight className="h-3 w-3" aria-hidden />
      <Link href="/case-studies" className={`transition ${hover}`}>
        Case Studies
      </Link>
      <ChevronRight className="h-3 w-3" aria-hidden />
      <span className={`font-medium ${here}`} aria-current="page">
        {name}
      </span>
    </nav>
  );
}

/** Native <details> FAQ — no client JS needed for this one. */
export function FaqList({
  items,
  accentClass,
  borderClass = "border-slate-200",
  textClass = "text-slate-900",
  bodyClass = "text-slate-600",
}: {
  items: { q: string; a: string }[];
  accentClass: string;
  borderClass?: string;
  textClass?: string;
  bodyClass?: string;
}) {
  return (
    <div className={`divide-y ${borderClass} border-t`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4">
            <span className={`text-[15px] font-semibold leading-snug ${textClass}`}>{f.q}</span>
            <span
              aria-hidden
              className={`mt-0.5 shrink-0 text-lg leading-none transition-transform duration-300 group-open:rotate-45 ${accentClass}`}
            >
              +
            </span>
          </summary>
          <p className={`pb-5 pr-8 text-[14px] leading-relaxed ${bodyClass}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** The two other case studies, as links to their real live pages. */
export function RelatedCaseStudies({
  slugs,
  theme,
}: {
  slugs: string[];
  theme: "light" | "dark";
}) {
  const items = slugs
    .map((s) => findCaseStudy(s))
    .filter((x): x is CaseStudy => Boolean(x));

  if (!items.length) return null;
  const dark = theme === "dark";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((c) => (
        <Link
          key={c.slug}
          href={`/case-studies/${c.slug}`}
          className={[
            "group overflow-hidden rounded-2xl border transition duration-300",
            dark
              ? "border-white/12 bg-white/[.04] hover:border-white/25 hover:bg-white/[.07]"
              : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,.3)]",
          ].join(" ")}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={c.image}
              alt={`${c.name} — Webamazee case study`}
              fill
              sizes="(max-width: 640px) 100vw, 420px"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[.14em] ${dark ? "text-white/45" : "text-slate-400"}`}>
                {c.industry}
              </p>
              <p className={`mt-0.5 text-[15px] font-bold ${dark ? "text-white" : "text-slate-900"}`}>
                {c.name}
              </p>
            </div>
            <ArrowUpRight
              className={`h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                dark ? "text-white/40" : "text-slate-400"
              }`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Small "next / previous case study" strip. */
export function CaseNav({ slugs }: { slugs: string[] }) {
  const items = slugs
    .map((s) => findCaseStudy(s))
    .filter((x): x is CaseStudy => Boolean(x));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
      >
        All case studies
      </Link>
      {items.map((c) => (
        <Link
          key={c.slug}
          href={`/case-studies/${c.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
        >
          {c.name}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      ))}
    </div>
  );
}

/** Wrapper that keeps every block on the same grid. */
export function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}

export { Reveal };
