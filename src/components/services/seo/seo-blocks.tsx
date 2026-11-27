"use client";

/**
 * Shared presentation blocks for the SEO service pages.
 *
 * Visual language matches the promoted production service pages: 1320px
 * container, #0f6dff accent, #0b1528 ink, rounded-2xl cards, alternating
 * white / #f7f9fc sections. Content is always passed in from the production
 * data layer so no page invents its own copy.
 */
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Plus,
  Quote,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ServiceIcon } from "@/components/services/service-icon";
import {
  body,
  card,
  container,
  eyebrow,
  heading,
  heroBg,
  INDUSTRY_ROUTES,
  lead,
  primary,
  secondary,
} from "./seo-theme";

/* ---------------------------------------------------------------- */

export function SeoHero({
  crumbLabel,
  eyebrowText,
  title,
  highlight,
  subtitle,
  trust,
  image,
  imageAlt,
  aside,
  secondaryHref,
  secondaryLabel,
}: {
  crumbLabel: string;
  eyebrowText: string;
  title: string;
  highlight: string;
  subtitle: string;
  trust: string[];
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className={heroBg}>
      <div className={container}>
        <Breadcrumb
          crumbs={[{ label: "Services", href: "/services" }, { label: crumbLabel }]}
        />
        <div className="mt-8 grid items-center gap-9 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className={eyebrow}>{eyebrowText}</p>
            <h1 className="mt-4 max-w-2xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.4rem]">
              {title} <span className="text-[#0f6dff]">{highlight}</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.65] text-slate-600 sm:text-[18px]">
              {subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={primary}>
                Get a free proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link href={secondaryHref ?? "/free-seo-audit"} className={secondary}>
                {secondaryLabel ?? "Get a free SEO audit"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] font-semibold text-slate-500">
              {trust.map((t, i) => (
                <li key={t} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-slate-300">
                      /
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {image ? (
            <figure className="rounded-2xl border border-[#dce7f6] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.3)] sm:p-4">
              <div className="relative aspect-[16/11] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <Image
                  src={image}
                  alt={imageAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ) : (
            aside
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function SectionHead({
  eyebrowText,
  title,
  intro,
  align = "left",
}: {
  eyebrowText: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={eyebrow}>{eyebrowText}</p>
      <h2 className={`${heading} mt-2`}>{title}</h2>
      {intro && <p className={`${lead} mt-3`}>{intro}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function ProblemsGrid({
  items,
  icon,
}: {
  items: { title: string; desc: string }[];
  icon: string;
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <article key={p.title} className={`${card} p-5`}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
            <ServiceIcon name={icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-display text-[15px] font-bold">{p.title}</h3>
          <p className={`${body} mt-1.5`}>{p.desc}</p>
          <span className="mt-3 inline-block font-display text-[11px] font-bold text-slate-300">
            {String(i + 1).padStart(2, "0")}
          </span>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function OverviewBlock({
  icon,
  name,
  shortDesc,
  paragraphs,
  whoNeeds,
  examples,
}: {
  icon: string;
  name: string;
  shortDesc: string;
  paragraphs: string[];
  whoNeeds: string[];
  examples: string[];
}) {
  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-45px_rgba(11,21,40,0.4)]">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#0f6dff] text-white">
            <ServiceIcon name={icon} className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-[16px] font-bold">{name}</h3>
            <p className="text-[13px] text-slate-600">{shortDesc}</p>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.7] text-slate-600">
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
            <Target aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" /> Who needs this?
          </h3>
          <ul className="mt-3 space-y-2.5">
            {whoNeeds.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-[#0f6dff]/20 bg-[#eef4ff] p-5">
          <h3 className="flex items-center gap-2 font-display text-[15px] font-bold">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" /> Common project scenarios
          </h3>
          <ul className="mt-3 space-y-2.5">
            {examples.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                <ArrowUpRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function ProcessGrid({
  steps,
}: {
  steps: { step: string; title: string; desc: string }[];
}) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s) => (
        <li key={s.step} className={`${card} p-5`}>
          <span className="font-display text-[13px] font-bold text-[#0f6dff]">{s.step}</span>
          <h3 className="mt-2 font-display text-[16px] font-bold">{s.title}</h3>
          <p className={`${body} mt-1.5`}>{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */

export function IncludedGrid({
  items,
}: {
  items: { icon: string; title: string; desc: string }[];
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <article key={f.title} className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#0f6dff] ring-1 ring-slate-200">
            <ServiceIcon name={f.icon} className="h-4 w-4" />
          </span>
          <div>
            <h3 className="font-display text-[15px] font-bold">{f.title}</h3>
            <p className={`${body} mt-1`}>{f.desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function WhyChooseGrid({
  reasons,
  note,
}: {
  reasons: { icon: string; title: string; desc: string }[];
  note?: { label: string; title: string; items: { title: string; text: string }[] };
}) {
  return (
    <div className={`mt-8 grid gap-4 ${note ? "lg:grid-cols-[1.35fr_0.65fr] lg:gap-8" : ""}`}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <article key={r.title} className={`${card} p-5`}>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0f6dff] text-white">
              <ServiceIcon name={r.icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-3.5 font-display text-[15px] font-bold">{r.title}</h3>
            <p className={`${body} mt-1.5`}>{r.desc}</p>
          </article>
        ))}
      </div>
      {note && (
        <div className="rounded-2xl bg-[#0b1528] p-6 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">{note.label}</p>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight">{note.title}</h3>
          <ul className="mt-4 space-y-3">
            {note.items.map((q) => (
              <li key={q.title} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#87b4ff]" />
                <div>
                  <p className="text-[13px] font-bold leading-snug">{q.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-300">{q.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function IndustriesBlock({ industries }: { industries: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2.5">
      {industries.map((ind) =>
        INDUSTRY_ROUTES[ind] ? (
          <Link
            key={ind}
            href={INDUSTRY_ROUTES[ind]}
            aria-label={`Explore SEO for ${ind}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
          >
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
            {ind}
          </Link>
        ) : (
          <span
            key={ind}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#f7f9fc] px-4 py-2.5 text-[13px] font-semibold text-slate-700"
          >
            <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
            {ind}
          </span>
        )
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function TechStackBlock({ tools }: { tools: string[] }) {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {tools.map((t) => (
        <span
          key={t}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function MeasurementBlock({ areas }: { areas: string[] }) {
  return (
    <>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {areas.map((a) => (
          <div key={a} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f7f9fc] px-5 py-4">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-[#0f6dff]" />
            <span className="text-[13.5px] font-semibold">{a}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-slate-500">
        Reporting reflects the data available to your business and the goals agreed for the engagement.
      </p>
    </>
  );
}

/* ---------------------------------------------------------------- */

export function TestimonialsBlock({
  items,
  reviewsUrl,
}: {
  items: { quote: string; name: string; role: string; rating: number; initials: string }[];
  reviewsUrl: string;
}) {
  return (
    <>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <Quote aria-hidden="true" className="h-6 w-6 text-[#cfe0ff]" />
            <div className="mt-3 flex gap-0.5 text-amber-400">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f6dff] text-xs font-bold text-white">
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0b57d0] hover:underline"
        >
          Reviews from Google <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */

export function FaqList({
  faqs,
  title,
  eyebrowText = "FAQ",
}: {
  faqs: { q: string; a: string }[];
  title: string;
  eyebrowText?: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
      <div>
        <p className={eyebrow}>{eyebrowText}</p>
        <h2 className={`${heading} mt-2`}>{title}</h2>
        <p className={`${lead} mt-4`}>Have another question about your project?</p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-[#0f6dff] hover:underline"
        >
          Talk to our team <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-display text-[16px] font-bold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff] [&::-webkit-details-marker]:hidden">
              <span>{faq.q}</span>
              <Plus
                aria-hidden="true"
                className="h-5 w-5 shrink-0 text-[#0f6dff] transition-transform group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <p className="max-w-2xl pb-5 text-[14px] leading-[1.7] text-slate-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function RelatedServicesBlock({
  related,
}: {
  related: { slug: string; name: string; icon: string }[];
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-3">
      {related.map((r) => (
        <Link
          key={r.slug}
          href={`/services/${r.slug}`}
          className={`${card} group flex items-center gap-4 p-5`}
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
            <ServiceIcon name={r.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[15px] font-bold leading-snug">{r.name}</h3>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#0f6dff]">
              Learn more <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function LocalLinksBlock({
  links,
  eyebrowText,
  title,
  intro,
}: {
  links: { label: string; href: string; description: string }[];
  eyebrowText: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="border-t border-slate-200/80 bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>{eyebrowText}</p>
          <h2 className={`${heading} mt-2`}>{title}</h2>
          <p className={`${lead} mt-3`}>{intro}</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 transition-colors hover:border-[#0f6dff]/40 hover:bg-white"
            >
              <span className="font-display text-sm font-bold group-hover:text-[#0b57d0]">{l.label}</span>
              <span className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{l.description}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-[#0f6dff]">
                Open page{" "}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function ClosingCta({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-white py-12 sm:py-14">
      <div className={container}>
        <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">{label}</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">{subtitle}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-300">
              {["Free personalised roadmap", "Personal follow-up from our team", "No lock in"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-[#87b4ff]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className={primary}>
              Get a free proposal <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href="https://calendly.com/webamazee/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-sm font-bold text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a call <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_-20px_rgba(11,21,40,0.5)] backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Ready to grow?</p>
            <p className="truncate text-xs text-slate-500">Free audit &amp; strategy call</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#0f6dff] px-5 text-sm font-semibold text-white"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
