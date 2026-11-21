import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { generateMetadata } from "@/lib/metadata";

export const NZ_CONTAINER = "mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-10";
export const NZ_EYEBROW = "text-[11px] font-bold uppercase tracking-[.18em] text-[#0f6dff]";
export const NZ_H2 = "font-display text-[2rem] font-bold leading-[1.08] tracking-[-.035em] text-[#0b1528] sm:text-[2.6rem] lg:text-[3rem]";
export const NZ_PRIMARY = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_-14px_rgba(15,109,255,.65)] transition hover:-translate-y-0.5 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6dff]";
export const NZ_SECONDARY = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6dff]";

export const NZ_PREVIEW_ROUTES = [
  { key: "hub", label: "New Zealand services", preview: "/new-services-in-new-zealand", live: "/services-in-new-zealand" },
  { key: "web", label: "Website design & development", preview: "/new-web-designing-company-new-zealand", live: "/web-designing-company-new-zealand" },
  { key: "seo", label: "SEO services", preview: "/new-seo-services-new-zealand", live: "/seo-services-new-zealand" },
  { key: "digital", label: "Digital marketing", preview: "/new-digital-marketing-company-new-zealand", live: "/digital-marketing-company-new-zealand" },
  { key: "ai", label: "AI marketing", preview: "/new-ai-marketing-company-new-zealand", live: "/ai-marketing-company-new-zealand" },
] as const;

export function nzPreviewMetadata(title: string, description: string, canonicalPath: string, keywords: string[]): Metadata {
  return generateMetadata({
    title,
    metaTitle: title,
    metaDescription: description,
    canonical: canonicalPath,
    path: canonicalPath,
    keywords,
    schemaType: "website",
    category: "New Zealand Services Preview",
    absoluteTitle: true,
    noindex: true,
    nofollow: true,
  });
}

export function NzBreadcrumb({ current }: { current: string }) {
  return <nav aria-label="Breadcrumb" className="mb-7"><ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500"><li><Link href="/" className="rounded-sm hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/services" className="rounded-sm hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]">Services</Link></li><li aria-hidden="true">/</li><li><Link href="/new-services-in-new-zealand" className="rounded-sm hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]">New Zealand</Link></li><li aria-hidden="true">/</li><li aria-current="page" className="font-semibold text-[#0b1528]">{current}</li></ol></nav>;
}

export function NzSiblings({ current }: { current: (typeof NZ_PREVIEW_ROUTES)[number]["key"] }) {
  return <nav aria-label="Related New Zealand services" className="border-y border-slate-200 bg-white py-8"><div className={NZ_CONTAINER}><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className={NZ_EYEBROW}>Explore related New Zealand services</p><Link href="/new-services-in-new-zealand" className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f6dff] hover:text-[#0b57d0]">Services overview <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5"/></Link></div><ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{NZ_PREVIEW_ROUTES.filter((route) => route.key !== current && route.key !== "hub").map((route)=><li key={route.key}><Link href={route.preview} className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/40 hover:bg-[#f6f9ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]"><span>{route.label}</span><ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"/></Link></li>)}</ul></div></nav>;
}

export function NzCtaBand({ eyebrow = "A practical next step", title, body, link = "/contact", label = "Discuss your project", secondaryHref = "/new-services-in-new-zealand", secondaryLabel = "Explore New Zealand services" }: { eyebrow?: string; title: string; body: string; link?: string; label?: string; secondaryHref?: string; secondaryLabel?: string }) {
  return <section className="relative overflow-hidden border-y border-[#1e3a63] bg-[#0b1528] py-16 text-white sm:py-20"><div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/[.08]"/><div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-16 h-64 w-64 rounded-full bg-[#0f6dff]/20 blur-3xl"/><div className={`${NZ_CONTAINER} relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end`}><div className="max-w-3xl"><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-[-.03em] sm:text-4xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{body}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><Link href={link} className={NZ_PRIMARY}>{label}<ArrowRight aria-hidden="true" className="h-4 w-4"/></Link><Link href={secondaryHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">{secondaryLabel}</Link></div></div></section>;
}

export function NzFaq({ items, title = "Questions, answered" }: { items: { q: string; a: string }[]; title?: string }) {
  return <section className="bg-[#f5f8fd] py-16 sm:py-20"><div className={`${NZ_CONTAINER} grid gap-10 lg:grid-cols-[.7fr_1.3fr]`}><div><p className={NZ_EYEBROW}>Frequently asked questions</p><h2 className={`${NZ_H2} mt-3`}>{title}</h2><p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">Useful context for planning your next digital project.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]">Ask us a question <ArrowRight aria-hidden="true" className="h-4 w-4"/></Link></div><div className="divide-y divide-slate-200 border-y border-slate-200">{items.map((item)=><details key={item.q} className="group py-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-display text-base font-bold text-[#0b1528] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff] sm:text-lg"><span>{item.q}</span><span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 text-[#0f6dff] transition group-open:rotate-45 group-open:border-[#0f6dff]"><span className="text-xl font-normal leading-none">+</span></span></summary><p className="max-w-3xl pt-3 pr-10 text-sm leading-7 text-slate-600">{item.a}</p></details>)}</div></div></section>;
}

export function NzCurrentPageLink({ current }: { current: (typeof NZ_PREVIEW_ROUTES)[number]["key"] }) {
  const route = NZ_PREVIEW_ROUTES.find((item) => item.key === current)!;
  return <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500"><span>New Zealand service preview</span><Link href={route.live} className="underline decoration-slate-300 underline-offset-4 hover:text-[#0f6dff]">View current live page</Link><Link href="/contact" className="underline decoration-slate-300 underline-offset-4 hover:text-[#0f6dff]">Contact Webamazee</Link></div>;
}
