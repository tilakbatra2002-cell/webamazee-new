import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  LayoutPanelTop,
  MousePointer2,
  RefreshCw,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
import {
  MO_CONTAINER,
  MO_EYEBROW,
  MO_H2,
  MO_PRIMARY,
  MO_SECONDARY,
  MohaliBreadcrumb,
  MohaliCta,
  MohaliFaq,
  MohaliPreviewNotice,
  MohaliSiblings,
} from "./mohali-shared";
import { Reveal } from "./reveal";

const included = [
  {
    icon: LayoutPanelTop,
    title: "Business websites",
    copy: "A clear introduction, a service hierarchy buyers can scan and an enquiry route that does not hide.",
  },
  {
    icon: Code2,
    title: "Custom development",
    copy: "Components and templates built around the requirement, not bent into a theme that nearly fits.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    copy: "Catalogue structure, product detail and checkout journeys planned for real customers on real devices.",
  },
  {
    icon: RefreshCw,
    title: "Redesigns",
    copy: "A more current experience with an inventory of existing URLs and content taken before anything moves.",
  },
];

const process = [
  {
    n: "01",
    t: "Map the decision",
    d: "Who visits, what they need to believe before they contact you, and which pages carry that argument.",
  },
  {
    n: "02",
    t: "Design the path",
    d: "Layouts, hierarchy and mobile behaviour reviewed on the pages that actually decide enquiries.",
  },
  {
    n: "03",
    t: "Build and check",
    d: "Responsive build with performance, headings, metadata and internal links treated as part of the job.",
  },
  {
    n: "04",
    t: "Launch and hand over",
    d: "Agreed checks, a clean publish, and a handover your team can maintain without a retainer.",
  },
];

const questions = [
  {
    q: "What kind of website does a Mohali technology or B2B business need?",
    a: "Usually fewer, better pages rather than a wide shallow site. Buyers comparing providers want capability, process, proof and a clear next step. We plan the page set around those questions so the site reads as evidence rather than a brochure.",
  },
  {
    q: "Can you redesign our existing Mohali website without losing search visibility?",
    a: "A redesign starts with an inventory: which URLs rank, which pages still earn enquiries, and what would break if moved. Redirects and content migration are planned as part of the scope, and existing URLs are only changed where there is a reason.",
  },
  {
    q: "Do you build e-commerce and custom functionality?",
    a: "Yes. Catalogue structure, product detail, checkout and the operational integrations behind them are scoped in discovery. Payment, shipping and account requirements are confirmed before development starts.",
  },
  {
    q: "Will the site be fast and work on mobile?",
    a: "Responsive behaviour and performance are part of the build, not a later phase. We review navigation, content hierarchy, forms and tap targets on mobile, tablet and desktop, and check the pages that carry the most traffic.",
  },
  {
    q: "How long does a website project take?",
    a: "It depends on scope, how much content exists and the pace of review. We agree a schedule once the page set and integrations are clear, rather than quoting a number before the requirements are known.",
  },
];

export function MohaliWeb() {
  return (
    <main className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <MohaliPreviewNotice />

      {/* Hero: split with a browser mockup, not a centred headline */}
      <section className="overflow-hidden border-b border-slate-200 bg-[#f3f7fb]">
        <div className={`${MO_CONTAINER} py-9 sm:py-12 lg:py-14`}>
          <MohaliBreadcrumb current="Website design" />
          <div className="grid items-center gap-10 lg:grid-cols-[.94fr_1.06fr] lg:gap-12">
            <Reveal from="left">
              <p className={MO_EYEBROW}>
                Website design &amp; development · Mohali
              </p>
              <h1 className="mt-4 max-w-xl font-display text-[2.5rem] font-bold leading-[1.03] tracking-[-.04em] sm:text-[3.1rem] lg:text-[3.5rem]">
                A website that survives a technical buyer&apos;s scrutiny.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-[17px] sm:leading-8">
                Mohali&apos;s technology and B2B market compares before it
                contacts. We build sites that explain complex work clearly,
                load quickly and give serious buyers a reason to take the next
                step.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className={MO_PRIMARY}>
                  Discuss your website
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href="/work/kabir-oil-mill" className={MO_SECONDARY}>
                  See a real build
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
              <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                {[
                  "Mobile-first planning",
                  "Performance-aware build",
                  "Enquiry paths, not dead ends",
                ].map((item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[#0f6dff]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal from="right" delay={120}>
              <div className="relative mx-auto w-full max-w-[600px]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#dbe9fd] via-transparent to-[#cfe9e3]/50 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_70px_-40px_rgba(11,21,40,.45)]">
                  <div className="flex h-9 items-center gap-2 border-b border-slate-100 bg-slate-50/60 px-3">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-[#0f6dff]" />
                    <span className="ml-2 font-mono text-[9px] text-slate-400">
                      your-company.example
                    </span>
                  </div>

                  <div className="grid grid-cols-[1.35fr_.65fr] gap-2 p-3">
                    <div className="relative overflow-hidden rounded-xl bg-[#10213a] p-5 text-white">
                      <span
                        aria-hidden="true"
                        className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10"
                      />
                      <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#9ec5ff]">
                        Capability, stated plainly
                      </p>
                      <h2 className="mt-3 font-display text-xl font-bold leading-tight sm:text-2xl">
                        What you build,
                        <br />
                        who it serves.
                      </h2>
                      <div className="mt-4 space-y-1.5">
                        <div className="h-1.5 w-4/5 rounded-full bg-white/25" />
                        <div className="h-1.5 w-full rounded-full bg-white/15" />
                        <div className="h-1.5 w-3/5 rounded-full bg-white/15" />
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#0f6dff] px-3 py-1.5 text-[10px] font-semibold">
                        Request a walkthrough
                        <ArrowRight aria-hidden="true" className="h-3 w-3" />
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex-1 rounded-xl bg-[#e9f2ff] p-3">
                        <LayoutPanelTop
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-[#0f6dff]"
                        />
                        <div className="mt-3 space-y-1.5">
                          <div className="h-1.5 w-full rounded-full bg-[#0b1528]/15" />
                          <div className="h-1.5 w-3/4 rounded-full bg-[#0b1528]/10" />
                        </div>
                      </div>
                      <div className="flex-1 rounded-xl border border-slate-200 p-3">
                        <Smartphone
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-[#0f6dff]"
                        />
                        <div className="mt-3 space-y-1.5">
                          <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
                          <div className="h-1.5 w-full rounded-full bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 px-3 pb-3">
                    {["Proof point", "Process", "Contact"].map((label) => (
                      <div
                        key={label}
                        className="rounded-lg border border-slate-200 px-2.5 py-2 text-[9px] font-semibold text-slate-500"
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-3 py-2.5 text-[10px] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Gauge
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#0f6dff]"
                      />
                      Built to load fast
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MousePointer2
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#0f6dff]"
                      />
                      One obvious next action
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Illustrative layout concept, not a client screenshot.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What the build covers — a flat four-up, no cards */}
      <section className="py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="grid gap-7 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
              <div>
                <p className={MO_EYEBROW}>What a working site needs</p>
                <h2 className={`${MO_H2} mt-3`}>
                  Visual design is the visible part of a much longer checklist
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">
                A site has to work for two audiences at once: the customers
                using it and the team keeping it current. We scope the
                information, interactions and technical setup that make both
                possible.
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
            {included.map(({ icon: Icon, title, copy }, i) => (
              <Reveal key={title} delay={i * 70}>
                <article className="border-t-2 border-[#0f6dff] py-5">
                  <Icon aria-hidden="true" className="h-5 w-5 text-[#0f6dff]" />
                  <h3 className="mt-4 font-display text-lg font-bold">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {copy}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {[
              ["Website development", "/services/website-development"],
              ["E-commerce development", "/services/ecommerce-development"],
              ["Landing pages", "/services/landing-page-development"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                {label}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dark process band — timeline, not cards */}
      <section className="border-y border-slate-200 bg-[#0b1528] py-14 text-white sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-10 lg:grid-cols-[.78fr_1.22fr]`}>
          <Reveal>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
                How the work runs
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-tight tracking-[-.025em] sm:text-4xl">
                From first brief to a launch nobody has to apologise for
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Timelines depend on scope, content, integrations and how quickly
                reviews come back. We agree a schedule once those are clear —
                not before.
              </p>
            </div>
          </Reveal>

          <ol className="relative border-l border-white/15 pl-6">
            {process.map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <li className="relative border-b border-white/10 py-5 first:pt-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full bg-[#0f6dff] ring-4 ring-[#0b1528]"
                  />
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#8bb9ff]">
                    STEP {step.n}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold">
                    {step.t}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">
                    {step.d}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Real project — genuine work only */}
      <section className="py-14 sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center`}>
          <Reveal from="left">
            <div>
              <p className={MO_EYEBROW}>Real project, not a mockup</p>
              <h2 className="mt-2 font-display text-2xl font-bold">
                Kabir Oil Mill
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                A published Webamazee e-commerce build. Product discovery,
                structured catalogue and an ordering journey for a real
                business.
              </p>
              <Link
                href="/work/kabir-oil-mill"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                View the project
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal from="right" delay={100}>
            <Link
              href="/work/kabir-oil-mill"
              className="group relative block overflow-hidden rounded-xl border border-slate-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0f6dff]"
            >
              <div className="relative aspect-[1.75]">
                <Image
                  src="/images/portfolio/kabir-oil-mill-live-homepage.webp"
                  alt="Kabir Oil Mill e-commerce website built by Webamazee"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <span className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#0b1528]">
                Published portfolio project
                <ArrowUpRight
                  aria-hidden="true"
                  className="ml-1 inline h-3 w-3 text-[#0f6dff]"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <MohaliFaq items={questions} title="Website design questions" />
      <MohaliCta
        title="Start with a website your customers can actually use"
        body="Tell us who you serve, what content already exists and what the site has to do. We will come back with a scope you can judge."
        label="Discuss a website project"
      />
      <MohaliSiblings current="web" />
    </main>
  );
}
