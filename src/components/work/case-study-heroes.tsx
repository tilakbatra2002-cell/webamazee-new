"use client";

/**
 * Case study heroes.
 *
 * Three layouts on one design system:
 *  - CommerceHero  — Kabir: product/store identity, showcase-led, warm neutral
 *  - TravelHero    — Wellington: destination editorial, wide and airy
 *  - RedesignHero  — Shine Gold: transformation framing, before/after messaging
 *
 * Only genuine project screenshots are used. No stock photography and no
 * fabricated before/after imagery appears in any of these.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, Globe, Layers, MapPin } from "lucide-react";

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";

const primaryBtn =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0]";
const secondaryBtn =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff]/50 hover:text-[#0b57d0]";

function Crumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-slate-500">
        <li>
          <Link href="/" className="hover:text-[#0b57d0]">Home</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/portfolio" className="hover:text-[#0b57d0]">Portfolio</Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-semibold text-[#0b1528]" aria-current="page">{title}</li>
      </ol>
    </nav>
  );
}

function MetaRow({
  category, industry, country, year, tone = "light",
}: {
  category: string; industry: string; country: string; year: string; tone?: "light" | "dark";
}) {
  const items = [
    { icon: Layers, label: "Category", value: category },
    { icon: MapPin, label: "Industry", value: industry },
    { icon: Globe, label: "Country", value: country },
    { icon: CalendarDays, label: "Year", value: year },
  ];
  const text = tone === "dark" ? "text-white" : "text-[#0b1528]";
  const sub = tone === "dark" ? "text-slate-400" : "text-slate-400";
  const icon = tone === "dark" ? "text-[#87b4ff]" : "text-[#0f6dff]";
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
      {items.map((m) => (
        <div key={m.label}>
          <dt className={`flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] ${sub}`}>
            <m.icon aria-hidden="true" className={`h-3 w-3 ${icon}`} />
            {m.label}
          </dt>
          <dd className={`mt-0.5 text-[13px] font-semibold ${text}`}>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Ctas({ url, label = "Start a similar project" }: { url: string; label?: string }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <a href={url} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
        Visit live website
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
      </a>
      <Link href="/contact" className={secondaryBtn}>
        {label}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A. Kabir Oil Mill — commerce                                        */
/* ------------------------------------------------------------------ */

export function CommerceHero({
  title, summary, category, industry, country, year, url, image, stack,
}: {
  title: string; summary: string; category: string; industry: string;
  country: string; year: string; url: string; image: string; stack: string[];
}) {
  return (
    <section className="border-b border-slate-200/80 bg-[#f4f8ff] pb-10 pt-28 sm:pb-12 sm:pt-32">
      <div className={container}>
        <Crumbs title={title} />
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
              {category} · Online store
            </p>
            <h1 className="mt-2.5 font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-[#0b1528] sm:text-[2.6rem] lg:text-[3rem]">
              {title}
            </h1>
            <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              {summary}
            </p>
            <div className="mt-5">
              <MetaRow category={category} industry={industry} country={country} year={year} />
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {stack.map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11.5px] font-semibold text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <Ctas url={url} />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] w-full bg-[#f7f9fc]">
              <Image
                src={image}
                alt={`${title} live store homepage`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* B. Wellington Tours — travel editorial                              */
/* ------------------------------------------------------------------ */

export function TravelHero({
  title, summary, category, industry, country, year, url, image,
}: {
  title: string; summary: string; category: string; industry: string;
  country: string; year: string; url: string; image: string;
}) {
  return (
    <section className="border-b border-slate-200/80 bg-[#f4f8ff] pb-10 pt-28 sm:pb-12 sm:pt-32">
      <div className={container}>
        <Crumbs title={title} />
        <div className="mx-auto mt-6 max-w-3xl text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]">
            {country} · {category}
          </p>
          <h1 className="mt-2.5 font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-[#0b1528] sm:text-[2.7rem] lg:text-[3.1rem]">
            {title}
          </h1>
          <p className="mx-auto mt-3.5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            {summary}
          </p>
          <div className="mt-6 flex justify-center">
            <Ctas url={url} />
          </div>
        </div>

        {/* Wide destination-led showcase */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-[#f7f9fc]">
            <Image
              src={image}
              alt={`${title} live travel website homepage`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-slate-200 bg-white px-5 py-4">
          <MetaRow category={category} industry={industry} country={country} year={year} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* C. Shine Gold Tours — redesign                                      */
/* ------------------------------------------------------------------ */

export function RedesignHero({
  title, summary, category, industry, country, year, url, image,
}: {
  title: string; summary: string; category: string; industry: string;
  country: string; year: string; url: string; image: string;
}) {
  return (
    <section className="bg-[#0b1528] pb-10 pt-28 text-white sm:pb-12 sm:pt-32">
      <div className={container}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-slate-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li aria-hidden="true">/</li>
            <li className="font-semibold text-white" aria-current="page">{title}</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#87b4ff]">
              Website redesign
            </p>
            <h1 className="mt-3 font-display text-[2rem] font-bold leading-[1.06] tracking-tight sm:text-[2.6rem] lg:text-[3rem]">
              {title}
            </h1>
            <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-base">
              {summary}
            </p>
            <div className="mt-5">
              <MetaRow
                category={category}
                industry={industry}
                country={country}
                year={year}
                tone="dark"
              />
            </div>
            <div className="mt-6">
              <Ctas url={url} label="Redesign my website" />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-lg">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={image}
                alt={`${title} redesigned homepage`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
