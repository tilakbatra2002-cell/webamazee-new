import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Globe2,
  Handshake,
  Newspaper,
  TrendingUp,
  Users,
} from "lucide-react";
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

const SLUG = "americanlaobusinessassociation";

export function generateMetadata(): Metadata {
  const cs = findCaseStudy(SLUG);
  if (!cs) return {};
  return previewMeta(cs, [
    "American-Lao Business Association",
    "AMLAOBA",
    "association website redesign",
    "international trade website",
    "nonprofit website design",
  ]);
}

/* Deep navy + Lao flag gold, taken from the association's own brand. */
const NAVY = "#0e2244";
const NAVY_DEEP = "#081730";
const GOLD = "#e0b64c";
const PAPER = "#f6f5f1";

/** The four pillars, mapped to the sections they govern on the site. */
const PILLARS = [
  {
    name: "Connect",
    icon: Handshake,
    body: "Bringing together businesses, investors, professionals and organisations across the United States and Laos.",
    surfaces: ["Members", "Sponsors"],
  },
  {
    name: "Promote",
    icon: Globe2,
    body: "Promoting trade, investment, partnerships and sustainable economic growth between both markets.",
    surfaces: ["News & insights", "Events"],
  },
  {
    name: "Support",
    icon: Users,
    body: "Supporting members with resources, advocacy, market insights, networking and business opportunities.",
    surfaces: ["Membership", "Services"],
  },
  {
    name: "Grow",
    icon: TrendingUp,
    body: "Creating stronger partnerships and new opportunities for businesses operating in or entering Laos.",
    surfaces: ["Join", "Subscribe"],
  },
];

export default function AmlaobaPreview() {
  const cs = findCaseStudy(SLUG);
  if (!cs) notFound();

  return (
    <>
      <PreviewBanner />

      {/* ---------------------------------------------------------------- */}
      {/* Hero — institutional, two-column, mission first                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden py-10" style={{ backgroundColor: NAVY_DEEP }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[.13]"
          style={{ background: `radial-gradient(circle at 70% 30%, ${GOLD}, transparent 68%)` }}
        />

        <Wrap className="relative">
          <Crumbs name={cs.name} light />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.16em]"
                  style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
                >
                  {cs.tag}
                </span>
                <span className="rounded border border-white/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-white/65">
                  {cs.country}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[.14em] text-white/40">
                  {cs.completion}
                </span>
              </div>

              <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.07] tracking-[-.03em] text-white sm:text-[2.6rem] lg:text-[2.95rem]">
                How Webamazee Redesigned the American-Lao Business Association Website
              </h1>
              <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.75] text-white/70">
                {cs.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                  style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
                >
                  Discuss an organisational site
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {cs.liveUrl && (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                  >
                    Visit amlaoba.org
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <Reveal from="right">
              <figure>
                <div className="overflow-hidden rounded-lg border border-white/15 shadow-[0_35px_75px_-35px_rgba(0,0,0,.85)]">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={cs.image}
                      alt="American-Lao Business Association redesigned homepage"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-[11.5px] leading-relaxed text-white/45">
                  The redesigned homepage at amlaoba.org — mission statement with
                  the Connect, Promote, Support and Grow pillars beneath it.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Signature block — four pillars                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: PAPER }}>
        <Wrap>
          <div className="max-w-[60ch]">
            <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: "#96762a" }}>
              The organising idea
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#0e2244] sm:text-[2.35rem]">
              Four pillars became the site&rsquo;s information architecture
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-[#4d5566]">
              Connect, Promote, Support and Grow were not decoration. They decided
              where content lives, what the navigation says, and which action a
              visitor is offered on each page.
            </p>
          </div>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.name} delay={i * 65}>
                  <div
                    className="flex h-full flex-col rounded-xl border bg-white p-5"
                    style={{ borderColor: "#e3e1d9" }}
                  >
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(14,34,68,.07)", color: NAVY }}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <h3 className="mt-3.5 font-display text-[16px] font-bold text-[#0e2244]">{p.name}</h3>
                    <p className="mt-1.5 flex-1 text-[12.5px] leading-[1.65] text-[#4d5566]">{p.body}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t pt-3" style={{ borderColor: "#eeece4" }}>
                      {p.surfaces.map((s) => (
                        <span
                          key={s}
                          className="rounded px-2 py-0.5 text-[10.5px] font-semibold"
                          style={{ backgroundColor: PAPER, color: "#6b7280" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The problem — editorial, two columns, no cards                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y py-10" style={{ borderColor: "#e3e1d9", backgroundColor: "#fff" }}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.8rem] font-bold leading-[1.1] tracking-[-.03em] text-[#0e2244] sm:text-[2.2rem]">
                An association whose website had fallen behind its work
              </h2>
              <p className="mt-5 border-l-2 pl-5 text-[13.5px] leading-[1.8] text-[#5a6272]" style={{ borderColor: GOLD }}>
                {cs.exec.challenge}
              </p>
            </div>

            <div className="space-y-5">
              {cs.before.map((p, i) => (
                <p key={i} className="text-[14.5px] leading-[1.8] text-[#3f4654]">
                  {p}
                </p>
              ))}

              <div className="mt-2 grid gap-2.5 sm:grid-cols-2">
                {cs.challenges.map((c) => (
                  <div key={c.title} className="rounded-lg px-3.5 py-3" style={{ backgroundColor: PAPER }}>
                    <p className="text-[12.5px] font-bold text-[#0e2244]">{c.title}</p>
                    <p className="mt-0.5 text-[12px] leading-[1.6] text-[#5a6272]">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Sections the site now carries                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: PAPER }}>
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[26ch] font-display text-[1.8rem] font-bold leading-[1.1] tracking-[-.03em] text-[#0e2244] sm:text-[2.2rem]">
              What the public front door now holds
            </h2>
            <p className="max-w-[28ch] text-[12.5px] leading-relaxed text-[#6b7280]">
              Every section below exists on the live site at amlaoba.org.
            </p>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {cs.features.map((f, i) => {
              const icons = [Globe2, Handshake, CalendarDays, Newspaper, Users, TrendingUp];
              const Icon = icons[i % icons.length];
              return (
                <div key={f.title} className="border-t pt-4" style={{ borderColor: "#dcd9cf" }}>
                  <Icon className="h-4 w-4" style={{ color: GOLD }} aria-hidden />
                  <h3 className="mt-2 text-[14px] font-semibold leading-snug text-[#0e2244]">{f.title}</h3>
                  <p className="mt-1 text-[12.5px] leading-[1.65] text-[#5a6272]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Approach band                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: NAVY }}>
        <Wrap>
          <p className="text-[11px] font-bold uppercase tracking-[.2em]" style={{ color: GOLD }}>
            How it was approached
          </p>
          <h2 className="mt-3 max-w-[30ch] font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-white sm:text-[2.3rem]">
            Review, restructure, then rebuild the presentation
          </h2>

          <div className="mt-11 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {[
              { label: "Content review", items: cs.discovery },
              { label: "Design direction", items: cs.design },
              { label: "Implementation", items: cs.development },
            ].map((g, gi) => (
              <Reveal key={g.label} delay={gi * 80}>
                <div>
                  <h3 className="border-b border-white/15 pb-3 font-display text-[12.5px] font-bold uppercase tracking-[.14em]" style={{ color: GOLD }}>
                    {g.label}
                  </h3>
                  <ul className="mt-4 space-y-3.5">
                    {g.items.map((it) => (
                      <li key={it.title}>
                        <p className="text-[13.5px] font-semibold leading-snug text-white">{it.title}</p>
                        <p className="mt-0.5 text-[12.5px] leading-[1.65] text-white/55">{it.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Outcomes + search                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: "#fff" }}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#0e2244]">
                What the redesign delivered
              </h2>
              <ul className="mt-6 space-y-3.5">
                {cs.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 border-b pb-3.5 last:border-0" style={{ borderColor: "#eeece4" }}>
                    <ArrowRight className="mt-[3px] h-4 w-4 shrink-0" style={{ color: GOLD }} aria-hidden />
                    <span className="text-[14px] leading-[1.7] text-[#3f4654]">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#0e2244]">
                Structure that helps search
              </h2>
              <div className="mt-6 space-y-3">
                {cs.seo.map((s) => (
                  <div key={s.title} className="rounded-lg border px-4 py-3" style={{ borderColor: "#e3e1d9" }}>
                    <p className="text-[13px] font-semibold text-[#0e2244]">{s.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-[1.65] text-[#5a6272]">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[12px] leading-relaxed text-[#8a8f9a]">
                <span className="font-semibold text-[#5a6272]">Built with:</span> {cs.techStack.join(" · ")}
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Screenshot band                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: NAVY_DEEP }}>
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-14">
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-white/12 shadow-[0_40px_80px_-40px_rgba(0,0,0,.9)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={cs.image}
                    alt="AMLAOBA mission statement and the Connect, Promote, Support and Grow pillars"
                    fill
                    sizes="(max-width: 1024px) 100vw, 620px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[2.05rem]">
                The mission, stated before anything else
              </h2>
              <p className="mt-4 text-[13.5px] leading-[1.75] text-white/60">
                A visitor arriving from a referral, an event or a search hits the
                mission and the four pillars before they hit anything else. That
                ordering was the main structural change.
              </p>
              <div className="mt-6 space-y-2">
                {cs.gallery.map((g) => (
                  <div
                    key={g.label}
                    className="flex items-center justify-between gap-4 rounded border border-white/10 px-3.5 py-2 text-[12px]"
                  >
                    <span className="font-medium text-white/80">{g.label}</span>
                    <span className="uppercase tracking-[.12em] text-white/35">{g.device}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t py-10" style={{ borderColor: "#e3e1d9", backgroundColor: PAPER }}>
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.55fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#0e2244]">
                Questions about this project
              </h2>
              <Link
                href="/case-studies/americanlaobusinessassociation"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold underline underline-offset-4 transition hover:opacity-70"
                style={{ color: "#96762a" }}
              >
                Read the live case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <FaqList
              items={cs.faqs}
              accentClass="text-[#b8952f]"
              borderClass="border-[#e3e1d9]"
              textClass="text-[#0e2244]"
              bodyClass="text-[#5a6272]"
            />
          </div>

          <div className="mt-14 border-t pt-10" style={{ borderColor: "#e3e1d9" }}>
            <h2 className="font-display text-[1.35rem] font-bold text-[#0e2244]">Other case studies</h2>
            <div className="mt-5">
              <RelatedCaseStudies slugs={cs.related} theme="light" />
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {cs.services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded border bg-white px-4 py-1.5 text-[12.5px] font-semibold transition hover:opacity-70"
                  style={{ borderColor: "#e3e1d9", color: NAVY }}
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
      <section className="py-10" style={{ backgroundColor: NAVY }}>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-[30ch] font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[2.1rem]">
                Associations live or die by whether the right people find them
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.75] text-white/60">
                If your organisation&rsquo;s work is stronger than its website
                suggests, that gap is worth closing.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded px-7 py-3 text-sm font-semibold transition hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: GOLD, color: NAVY_DEEP }}
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 border-t border-white/12 pt-8">
            <CaseNav slugs={cs.related} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
