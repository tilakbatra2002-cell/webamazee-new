import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";

export const MO_CONTAINER = "mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10";

export const MO_EYEBROW =
  "text-[11px] font-bold uppercase tracking-[.18em] text-[#0f6dff]";

export const MO_H2 =
  "font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#0b1528] sm:text-[2.35rem] lg:text-[2.7rem]";

export const MO_PRIMARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0f6dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(15,109,255,.55)] transition hover:-translate-y-0.5 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export const MO_SECONDARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

/** The five preview routes, kept together so cross-links stay honest. */
export const MOHALI_PREVIEWS = [
  {
    key: "hub",
    label: "All Mohali services",
    path: "/new-services-in-mohali",
    original: "/services-in-mohali",
  },
  {
    key: "web",
    label: "Website design & development",
    path: "/new-web-designing-company-mohali",
    original: "/web-designing-company-mohali",
  },
  {
    key: "seo",
    label: "SEO services",
    path: "/new-seo-services-mohali",
    original: "/seo-services-mohali",
  },
  {
    key: "digital",
    label: "Digital marketing",
    path: "/new-digital-marketing-company-mohali",
    original: "/digital-marketing-company-mohali",
  },
  {
    key: "ai",
    label: "AI marketing",
    path: "/new-ai-marketing-company-mohali",
    original: "/ai-marketing-company-mohali",
  },
] as const;

/**
 * Preview metadata: always noindex + nofollow.
 *
 * The canonical points at the temporary preview URL, never at the live Mohali
 * page — the live page keeps its own canonical untouched.
 */
export function mohaliPreviewMetadata(
  title: string,
  description: string,
  canonicalPath: string,
  keywords: string[]
): Metadata {
  return generateMetadata({
    title,
    metaTitle: title,
    metaDescription: description,
    canonical: canonicalPath,
    path: canonicalPath,
    keywords,
    schemaType: "website",
    category: "Mohali Services Preview",
    absoluteTitle: true,
    noindex: true,
    nofollow: true,
  });
}

export function MohaliBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <li>
          <Link
            href="/"
            className="rounded-sm hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]"
          >
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/new-services-in-mohali"
            className="rounded-sm hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]"
          >
            Mohali
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-[#0b1528]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

export function MohaliSiblings({
  current,
}: {
  current: (typeof MOHALI_PREVIEWS)[number]["key"];
}) {
  const others = MOHALI_PREVIEWS.filter((r) => r.key !== current);
  return (
    <nav
      aria-label="Related Mohali previews"
      className="border-t border-slate-200 bg-white py-10"
    >
      <div className={MO_CONTAINER}>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <p className={MO_EYEBROW}>Related Mohali previews</p>
          <Link
            href="/new-services-in-mohali"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
          >
            Mohali overview
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((route) => (
            <li key={route.key}>
              <Link
                href={route.path}
                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/40 hover:bg-[#f6f9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]"
              >
                <span>{route.label}</span>
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function MohaliCta({
  eyebrow = "A useful next step",
  title,
  body,
  href = "/contact",
  label = "Discuss your project",
  secondaryHref = "/new-services-in-mohali",
  secondaryLabel = "Explore Mohali services",
}: {
  eyebrow?: string;
  title: string;
  body: string;
  href?: string;
  label?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="border-y border-[#1e3a63] bg-[#0b1528] py-14 text-white sm:py-16">
      <div
        className={`${MO_CONTAINER} grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end`}
      >
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[1.7rem] font-bold leading-tight tracking-[-.025em] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            {body}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link href={href} className={MO_PRIMARY}>
            {label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function MohaliFaq({
  items,
  title = "Questions, answered",
  intro = "Practical answers for planning your next digital move.",
}: {
  items: { q: string; a: string }[];
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-[#f5f8fd] py-14 sm:py-16">
      <div className={`${MO_CONTAINER} grid gap-9 lg:grid-cols-[.72fr_1.28fr]`}>
        <div>
          <p className={MO_EYEBROW}>Frequently asked questions</p>
          <h2 className={`${MO_H2} mt-3`}>{title}</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            {intro}
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
          >
            Ask about your project
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-display text-base font-bold text-[#0b1528] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff] sm:text-lg">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 text-[#0f6dff] transition group-open:rotate-45 group-open:border-[#0f6dff]"
                >
                  <span className="text-xl font-normal leading-none">+</span>
                </span>
              </summary>
              <p className="max-w-3xl pr-10 pt-3 text-sm leading-7 text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MohaliPreviewNotice() {
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className={`${MO_CONTAINER} flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-[11.5px] leading-5 text-amber-900`}>
        <span className="rounded bg-amber-200/70 px-1.5 py-0.5 font-bold uppercase tracking-[.1em] text-amber-900">
          Preview
        </span>
        <span>
          Redesign preview for review. The live page at the original URL is
          unchanged and this page is not indexed.
        </span>
      </div>
    </div>
  );
}
