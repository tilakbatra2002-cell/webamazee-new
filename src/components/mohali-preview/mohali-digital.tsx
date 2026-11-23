import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  ChartNoAxesCombined,
  Megaphone,
  MousePointerClick,
  Search,
  Target,
} from "lucide-react";
import {
  MO_CONTAINER,
  MO_EYEBROW,
  MO_H2,
  MO_PRIMARY,
  MohaliBreadcrumb,
  MohaliCta,
  MohaliFaq,
  MohaliPreviewNotice,
  MohaliSiblings,
} from "./mohali-shared";
import { Reveal } from "./reveal";

/** The four channel blocks of the strategy map. */
const channels = [
  {
    icon: Search,
    title: "Search",
    copy: "Technical SEO, commercial landing pages and content built for the searches your buyers actually run.",
    href: "/services/seo-services",
    span: "lg:col-span-2",
    tone: "light" as const,
  },
  {
    icon: Megaphone,
    title: "Paid media",
    copy: "Campaign structure, creative and landing pages that match the promise in the ad.",
    href: "/services/social-media-advertising",
    span: "lg:col-span-1",
    tone: "dark" as const,
  },
  {
    icon: Blocks,
    title: "Content",
    copy: "Explanatory pages that earn trust before someone is ready to talk to sales.",
    href: "/services/ai-content-optimization",
    span: "lg:col-span-1",
    tone: "light" as const,
  },
  {
    icon: MousePointerClick,
    title: "Conversion",
    copy: "Forms, enquiry flows and page hierarchy reviewed against what real visitors do.",
    href: "/services/landing-page-development",
    span: "lg:col-span-1",
    tone: "light" as const,
  },
  {
    icon: ChartNoAxesCombined,
    title: "Measurement",
    copy: "One agreed set of numbers, tied to enquiries rather than impressions.",
    href: "/contact",
    span: "lg:col-span-1",
    tone: "accent" as const,
  },
];

const stages = [
  { n: "01", t: "Diagnose", d: "Where enquiries come from today, what is being spent and what is actually working." },
  { n: "02", t: "Focus", d: "Two or three channels where you can realistically win, rather than six where you cannot." },
  { n: "03", t: "Build", d: "Pages, campaigns and tracking put in place in a sequence that lets each step be judged." },
  { n: "04", t: "Measure", d: "Review against the agreed numbers, then cut what fails and scale what does not." },
];

const questions = [
  {
    q: "What does a digital marketing programme include for a Mohali business?",
    a: "It depends on where enquiries currently come from. Usually a mix of search visibility, a site that converts, content that answers pre-purchase questions and paid media where there is a clear payback. We start by identifying which of those is actually the bottleneck.",
  },
  {
    q: "Do we have to take every channel at once?",
    a: "No, and we generally advise against it. Running four channels at once with an unproven offer usually produces four mediocre results. A focused start on one or two channels is easier to measure and cheaper to correct.",
  },
  {
    q: "How do you measure whether it is working?",
    a: "Agreed measures set at the start — qualified enquiries, cost per enquiry, conversion rate on key pages — rather than a headline traffic figure. If a channel is not contributing, that is the honest finding and it gets reported.",
  },
  {
    q: "We are a B2B company with a long sales cycle. Does this still apply?",
    a: "Yes, with a different sequence. Long cycles depend more on the pages a prospect returns to — capability, comparison, proof — than on the first click, so the content layer matters more than the campaign layer.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "Often. We can own a channel, handle the technical work while your team writes, or support planned campaigns. Responsibilities are written down so nothing falls between two teams.",
  },
];

function ChannelCard({
  icon: Icon,
  title,
  copy,
  href,
  tone,
}: {
  icon: typeof Search;
  title: string;
  copy: string;
  href: string;
  tone: "light" | "dark" | "accent";
}) {
  const styles =
    tone === "dark"
      ? "border-[#1e3a63] bg-[#0b1528] text-white hover:border-[#0f6dff]"
      : tone === "accent"
        ? "border-[#0f6dff]/25 bg-[#eef5ff] hover:border-[#0f6dff]"
        : "border-slate-200 bg-white hover:border-[#0f6dff]/45";

  const muted = tone === "dark" ? "text-slate-300" : "text-slate-600";
  const iconColor = tone === "dark" ? "text-[#8bb9ff]" : "text-[#0f6dff]";

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col justify-between rounded-xl border p-5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] ${styles}`}
    >
      <div>
        <Icon aria-hidden="true" className={`h-5 w-5 ${iconColor}`} />
        <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
        <p className={`mt-2 text-[13.5px] leading-6 ${muted}`}>{copy}</p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#0f6dff]">
        Explore
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}

export function MohaliDigital() {
  return (
    <main className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <MohaliPreviewNotice />

      {/* Hero: centred statement over a signal grid, no image */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f3f7fb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[.5] [background-image:linear-gradient(#dbe6f3_1px,transparent_1px),linear-gradient(90deg,#dbe6f3_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"
        />
        <div className={`${MO_CONTAINER} relative pb-14 pt-9 sm:pb-16 sm:pt-11`}>
          <MohaliBreadcrumb current="Digital marketing" />
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className={MO_EYEBROW}>Digital marketing · Mohali</p>
              <h1 className="mt-4 font-display text-[2.45rem] font-bold leading-[1.05] tracking-[-.04em] sm:text-[3.1rem] lg:text-[3.6rem]">
                Fewer channels, chosen properly.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[17px]">
                Mohali&apos;s IT, startup and professional services market is
                crowded and well-informed. The advantage rarely comes from
                doing more marketing — it comes from doing two things
                exceptionally well and knowing exactly which numbers improved.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className={MO_PRIMARY}>
                  Plan a marketing mix
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/free-seo-audit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"
                >
                  Start with an audit
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <dl className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
              {[
                ["Stage one", "Diagnose what already produces enquiries"],
                ["Stage two", "Choose two channels and commit"],
                ["Stage three", "Measure against agreed numbers"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white px-5 py-4 text-left">
                  <dt className="text-[10.5px] font-bold uppercase tracking-[.14em] text-[#0f6dff]">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[13.5px] leading-6 text-slate-600">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Bento strategy map */}
      <section className="py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className={MO_EYEBROW}>The mix</p>
                <h2 className={`${MO_H2} mt-3`}>
                  Five moving parts, one sequence
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                Each block below is a decision, not a service to buy in
                isolation. The order matters more than the list.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {channels.map((channel, i) => (
              <Reveal
                key={channel.title}
                delay={i * 60}
                className={channel.span}
              >
                <ChannelCard {...channel} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal stage rail */}
      <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="max-w-2xl">
              <p className={MO_EYEBROW}>How the programme is sequenced</p>
              <h2 className={`${MO_H2} mt-3`}>
                We would rather prove one channel than launch five
              </h2>
            </div>
          </Reveal>

          <ol className="mt-9 grid gap-0 border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, i) => (
              <Reveal key={stage.n} delay={i * 70}>
                <li className="relative border-b border-slate-200 py-6 lg:border-b-0 lg:border-r lg:pr-6 lg:last:border-r-0">
                  <span
                    aria-hidden="true"
                    className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-[#0f6dff]"
                  />
                  <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                    {stage.n}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold">
                    {stage.t}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {stage.d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Positioning panel — the honest counter-argument */}
      <section className="py-14 sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center`}>
          <Reveal from="left">
            <div className="rounded-2xl border border-slate-200 bg-[#f7fafd] p-7 sm:p-9">
              <Target aria-hidden="true" className="h-5 w-5 text-[#0f6dff]" />
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
                What we will not do
              </h2>
              <ul className="mt-5 space-y-3">
                {[
                  "Promise a number of leads before seeing your current funnel.",
                  "Run paid campaigns with no measurement plan in place.",
                  "Report impressions as if they were enquiries.",
                  "Recommend a channel simply because we sell it.",
                  "Keep a retainer alive when the work has stopped being useful.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div>
              <p className={MO_EYEBROW}>A useful starting point</p>
              <h2 className={`${MO_H2} mt-3`}>
                One free audit tells you more than three sales calls
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                We will look at how the site currently performs, which pages
                carry enquiries and where the obvious gaps are. If the honest
                answer is that you do not need an agency yet, you will hear
                that too.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/free-seo-audit" className={MO_PRIMARY}>
                  Free SEO audit
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MohaliFaq
        items={questions}
        title="Planning questions"
        intro="The questions worth answering before a marketing budget is committed."
      />
      <MohaliCta
        title="Work out which channel deserves the budget"
        body="Tell us where enquiries come from now and what you have already tried. We will suggest the shortest honest route to a measurable result."
        label="Plan a marketing mix"
      />
      <MohaliSiblings current="digital" />
    </main>
  );
}
