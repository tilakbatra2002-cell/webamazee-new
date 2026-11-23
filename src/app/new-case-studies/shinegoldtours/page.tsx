import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import {
  findCaseStudy,
  previewMeta,
  PreviewBanner,
  Crumbs,
  FaqList,
  RelatedCaseStudies,
  CaseNav,
  Wrap,
  Reveal,
} from "@/components/case-study-preview/primitives";

const SLUG = "shinegoldtours";

export function generateMetadata(): Metadata {
  const cs = findCaseStudy(SLUG);
  if (!cs) return {};
  return previewMeta(cs, [
    "Shine Gold Tours India",
    "travel website redesign",
    "website redesign case study",
    "travel website UX",
    "performance improvement",
  ]);
}

/* Charcoal + gold, matching the operator's own palette. */
const GOLD = "#c79a3f";
const CHARCOAL = "#15161a";
const CHARCOAL_SOFT = "#1d1f25";
const BONE = "#f7f4ee";

/** Before → after, derived from the record's own challenge/design pairs. */
const SHIFTS = [
  {
    before: "Outdated visual interface",
    after: "Consistent modern visual system",
    detail:
      "Typography, spacing, imagery and interface elements were rebuilt as one system instead of patched screen by screen.",
  },
  {
    before: "Weak content hierarchy",
    after: "Scannable tour and service structure",
    detail:
      "Tours, services and supporting information were reorganised around what a visitor needs to decide.",
  },
  {
    before: "Loading friction",
    after: "Simplified frontend delivery",
    detail:
      "The frontend was simplified and media handling reviewed to reduce unnecessary overhead.",
  },
  {
    before: "Weak conversion journey",
    after: "Contextual enquiry actions",
    detail:
      "Calls to action now sit in context throughout the journey rather than only at the top and bottom.",
  },
];

export default function ShineGoldToursPreview() {
  const cs = findCaseStudy(SLUG);
  if (!cs) notFound();

  return (
    <>
      <PreviewBanner />

      {/* ---------------------------------------------------------------- */}
      {/* Hero — charcoal, centred, gold rule                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-10" style={{ backgroundColor: CHARCOAL }}>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 opacity-[.22] blur-3xl"
          style={{ background: `radial-gradient(ellipse, ${GOLD}, transparent 70%)` }}
        />

        <Wrap className="relative">
          <Crumbs name={cs.name} light />

          <div className="mx-auto mt-10 max-w-[62ch] text-center">
            <p className="text-[11px] font-bold uppercase tracking-[.24em]" style={{ color: GOLD }}>
              {cs.tag} &middot; {cs.completion}
            </p>
            <h1 className="mt-5 font-display text-[2.05rem] font-bold leading-[1.06] tracking-[-.035em] text-white sm:text-[2.75rem] lg:text-[3.1rem]">
              Rebuilding an outdated travel site into one that earns the enquiry
            </h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-[15.5px] leading-[1.75] text-white/65">
              {cs.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-[#15161a] transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                style={{ backgroundColor: GOLD }}
              >
                Request a redesign review
                <ArrowRight className="h-4 w-4" />
              </Link>
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/45 hover:text-white"
                >
                  See the redesigned site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Wide screenshot under the fold of the hero.
              Cropped to the hero band of the live page: the full homepage
              capture carries a legacy "Hello world!" widget in its top strip,
              which would misrepresent the redesign. */}
          <Reveal delay={80}>
            <figure className="mt-14">
              <div className="overflow-hidden rounded-xl border border-white/12 shadow-[0_40px_90px_-40px_rgba(0,0,0,.9)]">
                <div className="relative aspect-[1440/780]">
                  <Image
                    src="/images/portfolio/shine-gold-tours-hero-crop.webp"
                    alt="Shine Gold Tours India redesigned homepage hero section"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1120px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-[11.5px] text-white/40">
                The live homepage at shinegoldtoursindia.com — real screenshot, cropped
                to the hero band.
              </figcaption>
            </figure>
          </Reveal>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Verdict strip — the problem, in the client's own framing           */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-b py-10" style={{ borderColor: "#e6e0d4", backgroundColor: BONE }}>
        <Wrap>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,.55fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: GOLD }}>
                The diagnosis
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-[#15161a]">
                Not a reskin — a rebuild of the experience
              </h2>
            </div>
            <div className="space-y-4">
              {cs.before.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <Minus className="mt-[6px] h-4 w-4 shrink-0" style={{ color: "#b9b2a3" }} aria-hidden />
                  <p className="text-[14.5px] leading-[1.8] text-[#4a4a4a]">{p}</p>
                </div>
              ))}
              <p className="border-l-2 pl-5 text-[14px] italic leading-[1.8] text-[#5a5a5a]" style={{ borderColor: GOLD }}>
                {cs.exec.challenge}
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Signature block — the four shifts, as before/after pairs          */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: "#fff" }}>
        <Wrap>
          <div className="max-w-[54ch]">
            <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: GOLD }}>
              What changed
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#15161a] sm:text-[2.35rem]">
              Four shifts, stated as before and after
            </h2>
          </div>

          <div className="mt-11 space-y-4">
            {SHIFTS.map((s, i) => (
              <Reveal key={s.before} delay={i * 60}>
                <div className="grid items-stretch gap-3 rounded-xl border p-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-0" style={{ borderColor: "#e9e4d8" }}>
                  {/* before */}
                  <div className="rounded-lg px-5 py-4" style={{ backgroundColor: "#f4f2ed" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a8a294]">Before</p>
                    <p className="mt-1.5 text-[14px] font-semibold leading-snug text-[#7a7466] line-through decoration-[#c9c2b2] decoration-1">
                      {s.before}
                    </p>
                  </div>

                  <div className="flex items-center justify-center px-4">
                    <span
                      className="hidden h-8 w-8 items-center justify-center rounded-full sm:flex"
                      style={{ backgroundColor: "#fbf4e3", color: GOLD }}
                    >
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>

                  {/* after */}
                  <div className="rounded-lg border px-5 py-4" style={{ borderColor: "#ece3cd", backgroundColor: "#fffdf7" }}>
                    <p className="text-[10px] font-bold uppercase tracking-[.16em]" style={{ color: GOLD }}>After</p>
                    <p className="mt-1.5 text-[14px] font-semibold leading-snug text-[#15161a]">{s.after}</p>
                    <p className="mt-1.5 text-[12.5px] leading-[1.65] text-[#6b6759]">{s.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Recorded improvement areas from the source data                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y py-10" style={{ borderColor: "#e9e4d8", backgroundColor: BONE }}>
        <Wrap>
          <h2 className="max-w-[26ch] font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-[#15161a] sm:text-[2.15rem]">
            Three areas the redesign worked on
          </h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-3">
            {cs.beforeAfter.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="h-full rounded-xl border bg-white p-5" style={{ borderColor: "#e9e4d8" }}>
                  {b.improvementTag && (
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[.13em]"
                      style={{ backgroundColor: "#fbf4e3", color: "#8a6a22" }}
                    >
                      {b.improvementTag}
                    </span>
                  )}
                  <h3 className="mt-3 font-display text-[16px] font-bold text-[#15161a]">{b.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.7] text-[#5f5c53]">{b.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Process — horizontal numbered rail                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: CHARCOAL_SOFT }}>
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: GOLD }}>
                The engagement
              </p>
              <h2 className="mt-3 max-w-[24ch] font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-white sm:text-[2.3rem]">
                How a redesign was kept honest
              </h2>
            </div>
            <p className="max-w-[32ch] text-[13px] leading-relaxed text-white/45">{cs.scope}</p>
          </div>

          <div className="mt-11 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Audit", items: cs.discovery },
              { label: "Redesign", items: cs.design },
              { label: "Rebuild", items: cs.development },
              { label: "Search", items: cs.seo },
            ].map((col, ci) => (
              <div key={col.label}>
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md text-[11px] font-bold"
                    style={{ backgroundColor: "rgba(199,154,63,.16)", color: GOLD }}
                  >
                    {ci + 1}
                  </span>
                  <h3 className="font-display text-[13px] font-bold uppercase tracking-[.12em] text-white/85">
                    {col.label}
                  </h3>
                </div>
                <ul className="mt-4 space-y-3">
                  {col.items.map((it) => (
                    <li key={it.title}>
                      <p className="text-[13px] font-semibold leading-snug text-white/90">{it.title}</p>
                      <p className="mt-0.5 text-[12.5px] leading-[1.6] text-white/45">{it.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Features + outcomes                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: "#fff" }}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#15161a]">
                What the redesigned site carries
              </h2>
              <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {cs.features.map((f) => (
                  <div key={f.title}>
                    <p className="flex items-start gap-2 text-[13.5px] font-semibold text-[#15161a]">
                      <Plus className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: GOLD }} aria-hidden />
                      {f.title}
                    </p>
                    <p className="mt-1 pl-5 text-[12.5px] leading-[1.65] text-[#66625a]">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#15161a]">
                What the project delivered
              </h2>
              <ul className="mt-6 space-y-3">
                {cs.outcomes.map((o, i) => (
                  <li key={o} className="flex gap-3 rounded-lg border px-4 py-2.5" style={{ borderColor: "#f0ece2" }}>
                    <span className="font-display text-[11px] font-bold leading-[1.6]" style={{ color: GOLD }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] leading-[1.65] text-[#4a4a4a]">{o}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[12px] leading-relaxed text-[#8a867d]">
                <span className="font-semibold text-[#5f5c53]">Built with:</span>{" "}
                {cs.techStack.join(" · ")}
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t py-10" style={{ borderColor: "#e9e4d8", backgroundColor: BONE }}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.55fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#15161a]">
                Redesign questions
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[#5f5c53]">
                Answers from the project record, unedited.
              </p>
              <Link
                href="/case-studies/shinegoldtours"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "#8a6a22" }}
              >
                Read the live case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <FaqList
              items={cs.faqs}
              accentClass="text-[#c79a3f]"
              borderClass="border-[#e9e4d8]"
              textClass="text-[#15161a]"
              bodyClass="text-[#5f5c53]"
            />
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "#e9e4d8" }}>
            <h2 className="font-display text-[1.35rem] font-bold text-[#15161a]">Other case studies</h2>
            <div className="mt-5">
              <RelatedCaseStudies slugs={cs.related} theme="light" />
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {cs.services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-4 py-1.5 text-[12.5px] font-semibold transition hover:opacity-70"
                  style={{ borderColor: "#e9e4d8", color: "#15161a" }}
                >
                  {s.name}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Close                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: CHARCOAL }}>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-[30ch] font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[2.1rem]">
                A slow, dated site is costing you enquiries you never see
              </h2>
              <p className="mt-3 max-w-[50ch] text-[14px] leading-[1.75] text-white/60">
                We start with an honest review of what your current site actually
                does, then fix the parts that lose visitors.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold text-[#15161a] transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: GOLD }}
            >
              Get a redesign review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 border-t border-white/10 pt-8">
            <CaseNav slugs={cs.related} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
