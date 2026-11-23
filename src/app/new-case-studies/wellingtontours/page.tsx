import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
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

const SLUG = "wellingtontours";

export function generateMetadata(): Metadata {
  const cs = findCaseStudy(SLUG);
  if (!cs) return {};
  return previewMeta(cs, [
    "Wellington Tours",
    "travel website development",
    "tourism website case study",
    "New Zealand travel website",
    "tour operator website",
  ]);
}

/* Warm palette lifted from the operator's own brand. */
const OCHRE = "#c9721c";
const INK = "#1a2b34";
const SAND = "#fbf6ee";

/** The visitor journey the site was reorganised around. */
const ITINERARY = [
  {
    n: "01",
    title: "Arrive at a service they recognise",
    body: "City tours, intercity tours and airport transfers each get their own route in, instead of being mixed into one long page.",
  },
  {
    n: "02",
    title: "See what the experience includes",
    body: "Practical detail — what the tour covers, how long it takes, who it suits — sits on the page before a visitor has to ask.",
  },
  {
    n: "03",
    title: "Decide with confidence",
    body: "Consistent presentation and visible trust signals answer the questions travellers raise before committing to a booking.",
  },
  {
    n: "04",
    title: "Enquire without friction",
    body: "A direct enquiry and booking action is available from every relevant service page, with the phone number never more than a tap away.",
  },
];

export default function WellingtonToursPreview() {
  const cs = findCaseStudy(SLUG);
  if (!cs) notFound();

  return (
    <>
      <PreviewBanner />

      {/* ---------------------------------------------------------------- */}
      {/* Full-bleed hero — real homepage screenshot as the backdrop        */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-[#0e1e26] py-10">
        <div className="absolute inset-0 -z-10">
          <Image
            src={cs.image}
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-[50%_30%] opacity-40 blur-[3px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a21] via-[#0b1a21]/90 to-[#0b1a21]/55" />
          <div className="absolute inset-0 bg-[#0b1a21]/25" />
        </div>

        <Wrap className="relative">
          <Crumbs name={cs.name} light />

          <div className="mt-10 max-w-[62ch]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className="rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.16em] text-white"
                style={{ backgroundColor: OCHRE }}
              >
                {cs.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[.14em] text-white/70">
                <MapPin className="h-3 w-3" aria-hidden />
                {cs.country}
              </span>
            </div>

            <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-.035em] text-white sm:text-[2.8rem] lg:text-[3.2rem]">
              How Webamazee Built a Travel Website for Wellington Tours
            </h1>
            <p className="mt-5 max-w-[54ch] text-[15.5px] leading-[1.75] text-white/75">
              {cs.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                style={{ backgroundColor: OCHRE }}
              >
                Plan a travel website
                <ArrowRight className="h-4 w-4" />
              </Link>
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  Visit the live site
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Brief — magazine style: opening paragraph + pull facts            */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: SAND }}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: OCHRE }}>
                The brief
              </p>
              <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#1a2b34] sm:text-[2.3rem]">
                An operator with a strong offer and a weak front door
              </h2>
              <div className="mt-6 space-y-4">
                {cs.overviewClient.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-[15.5px] leading-[1.8] text-[#33474f]"
                        : "text-[14.5px] leading-[1.8] text-[#4d5f66]"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p className="mt-6 border-l-2 pl-5 text-[14px] italic leading-[1.8] text-[#4d5f66]" style={{ borderColor: OCHRE }}>
                {cs.exec.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border bg-white p-6" style={{ borderColor: "#eadfcc" }}>
                <p className="text-[10.5px] font-bold uppercase tracking-[.16em] text-[#9aa6ab]">
                  Project facts
                </p>
                <dl className="mt-4 space-y-3.5">
                  {[
                    ["Scope", cs.projectType],
                    ["Industry", cs.industry],
                    ["Market", cs.country],
                    ["Completed", cs.completion],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-b border-dashed pb-3 last:border-0 last:pb-0" style={{ borderColor: "#eee5d6" }}>
                      <dt className="text-[12px] font-semibold uppercase tracking-[.1em] text-[#9aa6ab]">{k}</dt>
                      <dd className="text-right text-[13px] font-semibold text-[#1a2b34]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-2xl border p-6" style={{ borderColor: "#eadfcc", backgroundColor: "#fffdf9" }}>
                <p className="text-[10.5px] font-bold uppercase tracking-[.16em] text-[#9aa6ab]">
                  Objectives
                </p>
                <ul className="mt-3 space-y-2">
                  {cs.objectives.map((o) => (
                    <li key={o} className="flex gap-2.5 text-[13px] leading-snug text-[#33474f]">
                      <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: OCHRE }} />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Itinerary — signature block                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y py-10" style={{ borderColor: "#efe6d7", backgroundColor: "#fffdf9" }}>
        <Wrap>
          <div className="max-w-[56ch]">
            <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: OCHRE }}>
              Rebuilt around the traveller
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#1a2b34] sm:text-[2.35rem]">
              The four stops that decide whether someone books
            </h2>
          </div>

          {/* Vertical itinerary rail */}
          <div className="relative mt-12">
            <div
              aria-hidden
              className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px sm:block"
              style={{ backgroundColor: "#eadfcc" }}
            />
            <ol className="space-y-8 sm:space-y-10">
              {ITINERARY.map((stop, i) => (
                <li key={stop.n}>
                  <Reveal delay={i * 80} from="right">
                    <div className="flex gap-6">
                      <div className="hidden sm:block">
                        <span
                          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white font-display text-[12px] font-bold"
                          style={{ borderColor: OCHRE, color: OCHRE }}
                        >
                          {stop.n}
                        </span>
                      </div>
                      <div className="flex-1 rounded-xl border bg-white px-5 py-4" style={{ borderColor: "#efe6d7" }}>
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-[16px] font-bold text-[#1a2b34]">{stop.title}</h3>
                          <span className="shrink-0 text-[11px] font-semibold text-[#b6c0c4]">Step {i + 1} of 4</span>
                        </div>
                        <p className="mt-1.5 text-[13.5px] leading-[1.7] text-[#4d5f66]">{stop.body}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it was built — three columns, different rhythm                */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: INK }}>
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: "#e9a24a" }}>
                Process
              </p>
              <h2 className="mt-3 max-w-[26ch] font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-white sm:text-[2.3rem]">
                Discovery to launch, in the order it happened
              </h2>
            </div>
            <p className="max-w-[30ch] text-[13px] leading-relaxed text-white/45">
              {cs.team}
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {[
              { label: "Discovery & structure", items: cs.discovery },
              { label: "Design decisions", items: cs.design },
              { label: "Development & launch", items: cs.development },
            ].map((group, gi) => (
              <Reveal key={group.label} delay={gi * 60}>
                <div className="grid gap-5 border-t border-white/10 pt-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
                  <h3 className="font-display text-[15px] font-bold uppercase tracking-[.1em] text-[#e9a24a]">
                    {group.label}
                  </h3>
                  <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                    {group.items.map((it) => (
                      <div key={it.title}>
                        <p className="text-[14px] font-semibold text-white">{it.title}</p>
                        <p className="mt-1 text-[13px] leading-[1.7] text-white/55">{it.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* What the site does — feature grid with icons                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: SAND }}>
        <Wrap>
          <h2 className="max-w-[24ch] font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#1a2b34] sm:text-[2.3rem]">
            What the finished site does
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {cs.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 45}>
                <div className="border-t-2 pt-4" style={{ borderColor: i % 2 === 0 ? OCHRE : "#dfe4e6" }}>
                  <p className="font-display text-[19px] font-bold text-[#c3cccf]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-[14px] font-semibold leading-snug text-[#1a2b34]">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.65] text-[#4d5f66]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Screenshot band                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y py-10" style={{ borderColor: "#efe6d7", backgroundColor: "#fff" }}>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: OCHRE }}>
                In the wild
              </p>
              <h2 className="mt-3 font-display text-[1.8rem] font-bold leading-[1.1] tracking-[-.03em] text-[#1a2b34] sm:text-[2.15rem]">
                The live site, unchanged
              </h2>
              <p className="mt-4 text-[14px] leading-[1.75] text-[#4d5f66]">
                This is the real homepage at{" "}
                <span className="font-semibold text-[#1a2b34]">wellingtontour.co.nz</span>.
                Every screenshot in this case study is taken from the shipped site,
                not a design mockup.
              </p>
              <div className="mt-7 space-y-2.5">
                {cs.gallery.map((g) => (
                  <div key={g.label} className="flex items-center justify-between gap-4 border-b py-1.5 text-[12.5px]" style={{ borderColor: "#f2ece0" }}>
                    <span className="font-medium text-[#33474f]">{g.label}</span>
                    <span className="uppercase tracking-[.12em] text-[#b6c0c4]">{g.device}</span>
                  </div>
                ))}
              </div>
            </div>

            <Reveal from="right">
              <div className="overflow-hidden rounded-2xl border shadow-[0_30px_60px_-35px_rgba(26,43,52,.45)]" style={{ borderColor: "#efe6d7" }}>
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cs.image}
                    alt="Wellington Tours live homepage on desktop"
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Search + outcomes                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: "#fffdf9" }}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#1a2b34]">
                Search visibility for travel services
              </h2>
              <div className="mt-6 space-y-3">
                {cs.seo.map((s) => (
                  <div key={s.title} className="rounded-lg px-4 py-3" style={{ backgroundColor: SAND }}>
                    <p className="text-[13.5px] font-semibold text-[#1a2b34]">{s.title}</p>
                    <p className="mt-0.5 text-[13px] leading-[1.65] text-[#4d5f66]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#1a2b34]">
                What the project delivered
              </h2>
              <ul className="mt-6 space-y-4">
                {cs.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: OCHRE }} />
                    <span className="text-[14px] leading-[1.7] text-[#33474f]">{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-lg border px-4 py-3" style={{ borderColor: "#efe6d7" }}>
                <p className="text-[10.5px] font-bold uppercase tracking-[.15em] text-[#9aa6ab]">Built with</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#4d5f66]">{cs.techStack.join(" · ")}</p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t py-10" style={{ borderColor: "#efe6d7", backgroundColor: SAND }}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.58fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#1a2b34]">
                Common questions
              </h2>
              <Link
                href="/case-studies/wellingtontours"
                className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold underline underline-offset-4 transition hover:opacity-70"
                style={{ color: OCHRE }}
              >
                Read the live case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <FaqList
              items={cs.faqs}
              accentClass="text-[#c9721c]"
              borderClass="border-[#eadfcc]"
              textClass="text-[#1a2b34]"
              bodyClass="text-[#4d5f66]"
            />
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "#eadfcc" }}>
            <h2 className="font-display text-[1.35rem] font-bold text-[#1a2b34]">Other case studies</h2>
            <div className="mt-5">
              <RelatedCaseStudies slugs={cs.related} theme="light" />
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {cs.services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white px-4 py-1.5 text-[12.5px] font-semibold transition hover:opacity-70"
                  style={{ borderColor: "#eadfcc", color: INK }}
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
      <section className="py-10" style={{ backgroundColor: INK }}>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-[28ch] font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[2.1rem]">
                Tours that deserve a better website than a listing page
              </h2>
              <p className="mt-3 max-w-[50ch] text-[14px] leading-[1.75] text-white/60">
                If your experiences are good but your site does not show it, that
                is the problem we solve first.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: OCHRE }}
            >
              Talk about your site
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
