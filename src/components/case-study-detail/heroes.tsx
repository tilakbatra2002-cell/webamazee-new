"use client";

/**
 * Case study heroes.
 *
 * All four share the site's typography, palette, button language and
 * breadcrumb, but each takes its own composition so the pages do not read
 * as one template: Kabir leads with a two-column store shot, Wellington with
 * a centred editorial masthead, AMLAOBA with an institutional navy panel, and
 * Shine Gold with a dark transformation split.
 */
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CalendarDays, Globe, Layers, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { cn } from "@/lib/utils";

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

type Meta = {
  projectType: string;
  industry: string;
  country: string;
  completion: string;
};

function MetaRow({ meta, tone = "light" }: { meta: Meta; tone?: "light" | "dark" }) {
  const rows = [
    { icon: Layers, label: "Project", value: meta.projectType },
    { icon: MapPin, label: "Industry", value: meta.industry },
    { icon: Globe, label: "Country", value: meta.country },
    { icon: CalendarDays, label: "Completed", value: meta.completion },
  ];
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4",
        tone === "dark" ? "text-slate-300" : "text-slate-600"
      )}
    >
      {rows.map((r) => (
        <div key={r.label} className="min-w-0">
          <dt
            className={cn(
              "flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.13em]",
              tone === "dark" ? "text-brand-300" : "text-brand-700"
            )}
          >
            <r.icon className="h-3.5 w-3.5" aria-hidden /> {r.label}
          </dt>
          <dd className={cn("mt-1 text-[13px] font-semibold leading-snug", tone === "dark" ? "text-white" : "text-ink")}>
            {r.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function CtaPair({
  liveUrl,
  liveLabel = "Visit Live Website",
  primaryLabel = "Start Your Project",
  tone = "light",
}: {
  liveUrl?: string;
  liveLabel?: string;
  primaryLabel?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[14px] font-semibold transition-colors",
            tone === "dark"
              ? "bg-[#0f6dff] text-white hover:bg-[#0b57d0]"
              : "bg-brand-gradient text-white shadow-glow hover:opacity-95"
          )}
        >
          {liveLabel} <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      )}
      <Link
        href="/contact"
        className={cn(
          "inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-[14px] font-semibold transition-colors",
          tone === "dark"
            ? "border-white/25 text-white hover:bg-white/10"
            : "border-line bg-white text-ink shadow-soft hover:border-brand-600/40 hover:text-brand-700"
        )}
      >
        {primaryLabel} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

/**
 * Kabir Oil Mill — commerce.
 *
 * Shares the navy-panel opening used across the case studies so the four pages
 * read as one family: the argument and the project facts on the left, the live
 * capture framed on the right. The capture is 1440x900, so the frame is 16:10
 * and nothing is trimmed.
 */
export function CommerceHero({
  name,
  headline,
  intro,
  meta,
  liveUrl,
  image,
  imageAlt,
  tag,
}: {
  name: string;
  headline: string;
  intro: string;
  meta: Meta;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  tag: string;
}) {
  return (
    <section className="bg-white pb-10 pt-28 sm:pt-32">
      <div className={container}>
        <Breadcrumb crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: name }]} />

        <div className="mt-7 rounded-3xl bg-[#0b1528] px-5 py-8 sm:px-9 sm:py-10">
          <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-11">
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-300">{tag}</p>
              <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.038em] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
                {headline}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{intro}</p>
              <div className="mt-6 border-y border-white/12 py-5">
                <MetaRow meta={meta} tone="dark" />
              </div>
              <div className="mt-6">
                <CtaPair liveUrl={liveUrl} tone="dark" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-white shadow-lift-lg">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-2.5 text-[12px] text-slate-400">
                Live storefront captured at desktop width.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Wellington Tours — travel.
 *
 * Uses the same navy-panel opening as the other three case studies. An earlier
 * version centred everything and stacked the capture underneath, which pushed
 * the project facts below the fold; the facts now sit beside the work, inside
 * the panel. The capture is 1440x900, so the frame is 16:10 with no cropping.
 */
export function EditorialHero({
  name,
  headline,
  intro,
  meta,
  liveUrl,
  image,
  imageAlt,
  tag,
}: {
  name: string;
  headline: string;
  intro: string;
  meta: Meta;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  tag: string;
}) {
  return (
    <section className="bg-white pb-10 pt-28 sm:pt-32">
      <div className={container}>
        <Breadcrumb crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: name }]} />

        <div className="mt-7 rounded-3xl bg-[#0b1528] px-5 py-8 sm:px-9 sm:py-10">
          <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-11">
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-300">{tag}</p>
              <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.038em] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
                {headline}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{intro}</p>
              <div className="mt-6 border-y border-white/12 py-5">
                <MetaRow meta={meta} tone="dark" />
              </div>
              <div className="mt-6">
                <CtaPair liveUrl={liveUrl} tone="dark" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-white shadow-lift-lg">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-2.5 text-[12px] text-slate-400">
                Live travel site captured at desktop width.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** AMLAOBA — institutional: a navy panel on a light page. */
export function AssociationHero({
  name,
  headline,
  intro,
  meta,
  liveUrl,
  image,
  imageAlt,
  tag,
}: {
  name: string;
  headline: string;
  intro: string;
  meta: Meta;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  tag: string;
}) {
  return (
    <section className="bg-white pb-10 pt-28 sm:pt-32">
      <div className={container}>
        <Breadcrumb crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: name }]} />
        {/* The global header is transparent until scroll, so the page starts
            light and the navy is a panel rather than the page background. */}
        <div className="mt-7 rounded-3xl bg-[#0b1528] px-5 py-8 sm:px-9 sm:py-9">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-11">
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-300">{tag}</p>
              <h1 className="mt-3 font-display text-[2.05rem] font-bold leading-[1.06] tracking-[-0.035em] text-white sm:text-[2.5rem] lg:text-[2.9rem]">
                {headline}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{intro}</p>
              <div className="mt-6 border-y border-white/12 py-5">
                <MetaRow meta={meta} tone="dark" />
              </div>
              <div className="mt-6">
                <CtaPair liveUrl={liveUrl} tone="dark" />
              </div>
            </div>
            <div className="min-w-0">
              {/* The capture is 1600x1000, so the frame is 16:10 to show the
                  whole page instead of cropping its header and sides. */}
              <div className="relative aspect-[16/10] w-full max-w-[600px] overflow-hidden rounded-xl border border-white/15 bg-white shadow-lift-lg">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-2.5 text-[12px] text-slate-400">
                Live homepage captured at desktop width.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Shine Gold — transformation.
 *
 * The previous version let the capture spill out of the navy panel and below
 * the fold, which pushed the project facts off-screen entirely. This keeps
 * the "redesign" framing through the navy panel but puts the work and the
 * facts side by side, inside the panel.
 */
export function RedesignHero({
  name,
  headline,
  intro,
  meta,
  liveUrl,
  image,
  imageAlt,
  tag,
}: {
  name: string;
  headline: string;
  intro: string;
  meta: Meta;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  tag: string;
}) {
  return (
    <section className="bg-white pb-10 pt-28 sm:pt-32">
      <div className={container}>
        <Breadcrumb crumbs={[{ label: "Case Studies", href: "/case-studies" }, { label: name }]} />

        <div className="mt-7 rounded-3xl bg-[#0b1528] px-5 py-8 sm:px-9 sm:py-10">
          <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-11">
            <div className="min-w-0">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.17em] text-brand-300">{tag}</p>
              <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.038em] text-white sm:text-[2.5rem] lg:text-[2.85rem]">
                {headline}
              </h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-300">{intro}</p>
              <div className="mt-6 border-y border-white/12 py-5">
                <MetaRow meta={meta} tone="dark" />
              </div>
              <div className="mt-6">
                <CtaPair liveUrl={liveUrl} tone="dark" />
              </div>
            </div>

            <div className="min-w-0">
              {/* The capture is 1440x900, so the frame is 16:10 and the whole
                  page — navigation, headline and the tour cards below — stays
                  intact instead of being cropped at the sides. */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/15 bg-white shadow-lift-lg">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-2.5 text-[12px] text-slate-400">
                The redesigned site, captured at desktop width.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
