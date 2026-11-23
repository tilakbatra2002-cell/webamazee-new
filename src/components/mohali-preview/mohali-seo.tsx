import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  FileText,
  Link2,
  Search,
  Wrench,
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

const pillars = [
  {
    icon: Wrench,
    n: "01",
    title: "Technical foundations",
    copy: "Crawlability, indexation, speed and site structure. If these are broken, nothing written on top of them performs the way it should.",
    detail: ["Crawl and index audit", "Core Web Vitals review", "Internal link structure"],
  },
  {
    icon: FileText,
    n: "02",
    title: "Pages that answer the search",
    copy: "One page per real intent. Commercial pages for buyers, explanatory pages for researchers, and no page written twice under two keywords.",
    detail: ["Intent mapping", "On-page structure", "Content refresh plan"],
  },
  {
    icon: Link2,
    n: "03",
    title: "Earned authority",
    copy: "Relevant links and mentions from places that make sense for a Mohali business. No bulk packages, no link networks, no shortcuts that need hiding.",
    detail: ["Digital PR and outreach", "Directory consistency", "Competitor gap review"],
  },
];

const problems = [
  {
    t: "You rank for the business name and little else",
    d: "Usually an authority or intent problem, not a technical one. The next step is deciding which commercial searches are winnable and building the pages that answer them properly.",
  },
  {
    t: "Traffic arrives, enquiries do not",
    d: "Often the page ranks for an informational query and has no commercial path. Fixing it means separating research pages from buyer pages instead of pushing every visitor to a contact form.",
  },
  {
    t: "Rankings dropped after a redesign",
    d: "Common causes are changed URLs without redirects, lost internal links and thin replacement content. Recovering it starts with an inventory of what used to exist.",
  },
  {
    t: "A competitor outranks you on every service page",
    d: "Compare the pages side by side: depth, structure, proof and internal links. The gap is usually describable, and once it is described it can be closed.",
  },
];

const process = [
  { w: "Week 1–2", t: "Audit and baseline", d: "Technical crawl, index review, current rankings and which pages already earn enquiries. No recommendations before this exists." },
  { w: "Week 2–3", t: "Priority plan", d: "A short list ordered by expected impact against effort, agreed with you before any writing starts." },
  { w: "Week 3–8", t: "Implement", d: "Technical fixes first, then page work and internal linking. Each change is tracked against the baseline." },
  { w: "Ongoing", t: "Review and extend", d: "Monthly reporting against agreed measures. New targets are chosen from evidence, not from a template." },
];

const questions = [
  {
    q: "How long does SEO take to show results in Mohali?",
    a: "It depends on your starting point, the competition for your terms and how quickly changes ship. Technical fixes can move quickly; content and authority build over months. We agree a baseline first so progress is measured against something real rather than a promised deadline.",
  },
  {
    q: "Do you guarantee rankings or traffic numbers?",
    a: "No. Nobody controls Google's algorithm, and any agency promising a fixed position is guessing or using methods you would not want attached to your domain. What we commit to is a transparent process, documented work and reporting you can check.",
  },
  {
    q: "Is local SEO relevant for a Mohali technology company?",
    a: "Sometimes. A SaaS product selling nationally does not need a map pack presence; a clinic, institute or service business serving the Tricity usually does. We only recommend local work where location genuinely affects how your customers search.",
  },
  {
    q: "Can you work on an existing website, or does it need rebuilding first?",
    a: "We work with what exists wherever that is sensible. A rebuild is only recommended when the platform actively blocks progress — for example, something that cannot render content server-side or cannot support the page structure you need.",
  },
  {
    q: "What do we get each month?",
    a: "A report against the agreed baseline covering what changed, what it affected and what is next. We would rather show fewer, real numbers than a dashboard full of activity that does not connect to enquiries.",
  },
];

export function MohaliSeo() {
  return (
    <main className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <MohaliPreviewNotice />

      {/* Editorial hero: headline column + a diagnostics rail on the right */}
      <section className="border-b border-slate-200 bg-white">
        <div className={`${MO_CONTAINER} py-9 sm:py-12`}>
          <MohaliBreadcrumb current="SEO services" />
          <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-14">
            <Reveal>
              <div>
                <p className={MO_EYEBROW}>SEO services · Mohali</p>
                <h1 className="mt-4 max-w-2xl font-display text-[2.45rem] font-bold leading-[1.04] tracking-[-.04em] sm:text-[3.05rem] lg:text-[3.4rem]">
                  The work that moves rankings is usually the work nobody
                  photographs.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-[17px]">
                  Mohali has no shortage of businesses competing for the same
                  searches. Technical foundations, pages built around real
                  intent and genuinely earned authority are what separate the
                  ones that get found from the ones that pay for every click.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className={MO_PRIMARY}>
                    Request an SEO review
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/free-seo-audit"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff]"
                  >
                    Free SEO audit
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 rounded-lg border border-[#0f6dff]/20 bg-[#f2f7ff] p-4">
                  <p className="text-[13px] leading-6 text-slate-700">
                    <strong className="font-semibold text-[#0b1528]">
                      Honest expectation setting:
                    </strong>{" "}
                    we do not promise rankings, fixed timelines or traffic
                    figures. We promise a documented process, white-hat work and
                    reporting you can verify.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={120}>
              <aside className="rounded-xl border border-slate-200 bg-[#f7fafd] p-5 lg:sticky lg:top-24">
                <div className="flex items-center gap-2">
                  <BarChart3
                    aria-hidden="true"
                    className="h-4 w-4 text-[#0f6dff]"
                  />
                  <h2 className="font-display text-sm font-bold">
                    What we check first
                  </h2>
                </div>
                <ul className="mt-4 space-y-3">
                  {[
                    "Can Google crawl and index the pages that matter?",
                    "Does each commercial page answer one clear search intent?",
                    "Are the internal links pushing authority to the right pages?",
                    "How fast do the pages that carry enquiries actually load?",
                    "What is already ranking, and what keeps it there?",
                    "Where does a competitor's page go deeper than yours?",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                      />
                      <span className="text-[13px] leading-6 text-slate-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-slate-200 pt-3 text-[11.5px] leading-5 text-slate-500">
                  This is the fixed opening sequence of every SEO engagement.
                  Nothing is recommended before it is done.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Three pillars as a numbered editorial list */}
      <section className="py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="max-w-2xl">
              <p className={MO_EYEBROW}>The three things that actually move</p>
              <h2 className={`${MO_H2} mt-3`}>
                Everything else is a detail underneath these
              </h2>
            </div>
          </Reveal>

          <div className="mt-9 divide-y divide-slate-200 border-y border-slate-200">
            {pillars.map(({ icon: Icon, n, title, copy, detail }, i) => (
              <Reveal key={n} delay={i * 80}>
                <article className="grid gap-4 py-7 md:grid-cols-[auto_1fr_1fr] md:gap-8">
                  <div className="flex items-center gap-3 md:block">
                    <span className="font-mono text-xs font-bold text-[#0f6dff]">
                      {n}
                    </span>
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-[#0f6dff] md:mt-3"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {copy}
                    </p>
                  </div>
                  <ul className="space-y-1.5 self-center">
                    {detail.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2 text-[13px] text-slate-500"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-[#0f6dff]"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problems — a two-column grid of situations */}
      <section className="border-y border-slate-200 bg-[#f7fafd] py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-xl">
                <p className={MO_EYEBROW}>Where most audits start</p>
                <h2 className={`${MO_H2} mt-3`}>
                  Four situations we see again and again
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-600">
                None of these need a new website. They need a correct diagnosis
                and an ordered list.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {problems.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6">
                  <Search
                    aria-hidden="true"
                    className="h-4 w-4 text-[#0f6dff]"
                  />
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{p.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline table — different structure from the other pages */}
      <section className="py-14 sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-10 lg:grid-cols-[.6fr_1.4fr]`}>
          <Reveal>
            <div>
              <p className={MO_EYEBROW}>How an engagement runs</p>
              <h2 className={`${MO_H2} mt-3`}>Ordered, not concurrent</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Work is sequenced so that each phase can rely on the one before
                it. Weeks are indicative and agreed per project.
              </p>
            </div>
          </Reveal>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            {process.map((row, i) => (
              <Reveal key={row.t} delay={i * 60}>
                <div
                  className={`grid gap-1 p-5 sm:grid-cols-[100px_1fr] sm:gap-5 ${
                    i > 0 ? "border-t border-slate-200" : ""
                  }`}
                >
                  <span className="font-mono text-[11px] font-bold text-[#0f6dff]">
                    {row.w}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold">
                      {row.t}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {row.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links, presented as a resource strip */}
      <section className="border-t border-slate-200 bg-[#0b1528] py-12 text-white">
        <div className={`${MO_CONTAINER} grid gap-8 lg:grid-cols-[1fr_1fr]`}>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
              Related work
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold">
              Where SEO connects to the rest of the build
            </h2>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              ["Technical SEO", "/services/technical-seo"],
              ["Local SEO", "/services/local-seo"],
              ["SEO services overview", "/services/seo-services"],
              ["Website development", "/services/website-development"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center justify-between gap-2 rounded-lg border border-white/12 px-4 py-3 text-sm font-semibold transition hover:border-white/35 hover:bg-white/[.05]"
                >
                  {label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-[#8bb9ff] transition group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MohaliFaq
        items={questions}
        title="SEO questions, answered without the sales pitch"
        intro="If an answer here sounds less confident than an agency's homepage, that is deliberate."
      />
      <MohaliCta
        title="Find out what is actually holding the rankings back"
        body="Start with the audit. You will get a written picture of the current state and an ordered list of what to fix first — whether or not you work with us."
        label="Request an SEO review"
        secondaryLabel="See the Mohali overview"
      />
      <MohaliSiblings current="seo" />
    </main>
  );
}
