import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
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

const SLUG = "kabiroilmill";

export function generateMetadata(): Metadata {
  const cs = findCaseStudy(SLUG);
  if (!cs) return {};
  return previewMeta(cs, [
    "Kabir Oil Mill",
    "e-commerce website development",
    "e-commerce case study",
    "online storefront",
    "WooCommerce development",
  ]);
}

/* Site palette — matched to tailwind.config.ts brand scale. */
const BLUE = "#0F6DFF";
const BLUE_MID = "#1E88FF";
const INK_DEEP = "#0B1528";
const BAND = "#F5F8FD";
const HERO_BAND = "#F3F7FB";

const COMMERCE_PATH = [
  { step: "01", title: "Browse", body: "Catalogue and category pages organise the range before a visitor chooses anything." },
  { step: "02", title: "Product detail", body: "Each product carries its own imagery, price and purchase action, with the range still visible." },
  { step: "03", title: "Cart", body: "Selections collect in a cart that keeps the order visible at all times." },
  { step: "04", title: "Checkout", body: "A short, continuous checkout closes the loop from browsing to a placed order." },
];

/** The sticky rail's targets — real anchors, so the page can be navigated. */
const RAIL = [
  { id: "starting-point", label: "Where it started" },
  { id: "purchase-path", label: "The purchase path" },
  { id: "how-it-ran", label: "How the work ran" },
  { id: "what-shipped", label: "What shipped" },
  { id: "search-foundations", label: "Search foundations" },
  { id: "questions", label: "Questions" },
];

export default function KabirOilMillPreview() {
  const cs = findCaseStudy(SLUG);
  if (!cs) notFound();

  return (
    <>
      <PreviewBanner />

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="relative overflow-hidden border-b border-slate-200 py-10"
        style={{ backgroundColor: HERO_BAND }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.6]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 8%, rgba(15,109,255,.10), transparent 44%), radial-gradient(circle at 88% 82%, rgba(30,136,255,.08), transparent 46%)",
          }}
        />
        <Wrap className="relative">
          <Crumbs name={cs.name} />

          <div className="mt-8 grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:gap-12">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.2em]" style={{ color: BLUE }}>
                {cs.tag} &middot; Case study
              </p>
              <h1 className="mt-3.5 font-display text-[2rem] font-bold leading-[1.08] tracking-[-.03em] text-[#111827] sm:text-[2.5rem] lg:text-[2.85rem]">
                How Webamazee Built a Digital E-commerce Store for Kabir Oil Mill
              </h1>
              <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-slate-600">
                {cs.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(15,109,255,.55)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6DFF] motion-reduce:hover:translate-y-0"
                  style={{ backgroundColor: BLUE }}
                >
                  Discuss an e-commerce build
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {cs.liveUrl && (
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#111827] transition hover:border-[#0F6DFF]/50 hover:text-[#0F6DFF]"
                  >
                    Visit the live store
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <Reveal from="right">
              <figure className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(15,109,255,.20), transparent 70%)" }}
                />
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_24px_54px_-26px_rgba(11,21,40,.30)]">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 bg-[#F8FAFC] px-3 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="ml-2 flex-1 truncate rounded bg-white px-2.5 py-1 text-[10px] text-slate-500 ring-1 ring-slate-200">
                      kabiroilmill.com
                    </span>
                  </div>
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={cs.image}
                      alt="Kabir Oil Mill live e-commerce storefront"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* Facts — one quiet line, not a second card block */}
          <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-slate-200 pt-5">
            {[
              ["Project", cs.projectType],
              ["Industry", cs.industry],
              ["Market", cs.country],
              ["Completed", cs.completion],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-2">
                <dt className="text-[10.5px] font-semibold uppercase tracking-[.16em] text-slate-400">
                  {label}
                </dt>
                <dd className="text-[13px] font-semibold text-[#111827]">{value}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Body — sticky rail on the left, one continuous column on the right */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            {/* Sticky rail */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[10.5px] font-bold uppercase tracking-[.18em] text-slate-400">
                  On this page
                </p>
                <nav className="mt-3 border-l border-slate-200">
                  {RAIL.map((r) => (
                    <a
                      key={r.id}
                      href={`#${r.id}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13px] leading-snug text-slate-500 transition hover:border-[#0F6DFF] hover:text-[#0F6DFF]"
                    >
                      {r.label}
                    </a>
                  ))}
                </nav>

                <div className="mt-7 rounded-lg p-4" style={{ backgroundColor: BAND }}>
                  <p className="text-[10.5px] font-bold uppercase tracking-[.15em] text-slate-400">
                    Built with
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">
                    {cs.techStack.join(" · ")}
                  </p>
                </div>
              </div>
            </aside>

            {/* Continuous content column */}
            <div className="min-w-0 space-y-14">
              {/* --- Where it started --- */}
              <div id="starting-point" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                  Where it started
                </p>
                <h2 className="mt-2.5 max-w-[30ch] font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827] sm:text-[2rem]">
                  A quality product range with nowhere to buy it online
                </h2>

                <div className="mt-5 space-y-3.5">
                  <p className="text-[14.5px] leading-[1.75] text-slate-600">
                    {cs.overviewBusiness}
                  </p>
                  {cs.before.map((para, i) => (
                    <p key={i} className="text-[14.5px] leading-[1.75] text-slate-600">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Challenges as an inline definition list — no cards */}
                <dl className="mt-7 divide-y divide-slate-200 border-t border-slate-200">
                  {cs.challenges.map((c) => (
                    <div key={c.title} className="grid gap-1 py-3 sm:grid-cols-[minmax(0,.36fr)_minmax(0,1fr)] sm:gap-6">
                      <dt className="text-[13px] font-semibold text-[#111827]">{c.title}</dt>
                      <dd className="text-[13px] leading-[1.65] text-slate-600">{c.desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* --- Purchase path --- */}
              <div id="purchase-path" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                  The build, in one line
                </p>
                <h2 className="mt-2.5 max-w-[30ch] font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827] sm:text-[2rem]">
                  Four steps, designed as one continuous purchase
                </h2>
                <p className="mt-4 max-w-[62ch] text-[14.5px] leading-[1.75] text-slate-600">
                  The store was not built page by page. It was built around a
                  single path a customer walks once, and every screen was designed
                  to make the next step obvious.
                </p>

                <ol className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                  {COMMERCE_PATH.map((s, i) => (
                    <li key={s.step}>
                      <Reveal delay={i * 60}>
                        <div className="border-t-2 pt-3" style={{ borderColor: BLUE }}>
                          <span className="text-[11px] font-bold tabular-nums" style={{ color: BLUE }}>
                            {s.step}
                          </span>
                          <h3 className="mt-0.5 font-display text-[15px] font-bold text-[#111827]">
                            {s.title}
                          </h3>
                          <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-600">{s.body}</p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ol>
              </div>

              {/* --- How the work ran --- */}
              <div id="how-it-ran" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                  The working record
                </p>
                <h2 className="mt-2.5 max-w-[26ch] font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827] sm:text-[2rem]">
                  How the work actually ran
                </h2>

                <div className="mt-6 space-y-7">
                  {[
                    { label: "Discovery", items: cs.discovery },
                    { label: "Design", items: cs.design },
                    { label: "Development", items: cs.development },
                  ].map((group, gi) => (
                    <Reveal key={group.label} delay={gi * 60}>
                      <div className="grid gap-2 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6">
                        <h3 className="font-display text-[12px] font-bold uppercase tracking-[.14em] text-slate-400 sm:pt-0.5">
                          {group.label}
                        </h3>
                        <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                          {group.items.map((it) => (
                            <li key={it.title} className="flex gap-2">
                              <Check
                                className="mt-[3px] h-3.5 w-3.5 shrink-0"
                                style={{ color: BLUE }}
                                aria-hidden
                              />
                              <span className="text-[13px] leading-[1.6] text-slate-600">
                                <strong className="font-semibold text-[#111827]">{it.title}.</strong>{" "}
                                {it.desc}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              {/* --- What shipped --- */}
              <div id="what-shipped" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                  What shipped
                </p>
                <h2 className="mt-2.5 max-w-[26ch] font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827] sm:text-[2rem]">
                  Eight things the storefront had to do
                </h2>
                <p className="mt-4 max-w-[62ch] text-[14px] leading-[1.7] text-slate-600">
                  {cs.scope}
                </p>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {cs.features.map((f) => (
                    <li key={f.title} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: BLUE }}
                      />
                      <span className="text-[13px] leading-[1.6] text-slate-600">
                        <strong className="font-semibold text-[#111827]">{f.title}.</strong> {f.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* --- Search foundations --- */}
              <div id="search-foundations" className="scroll-mt-28">
                <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                  Search foundations
                </p>
                <h2 className="mt-2.5 max-w-[28ch] font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827] sm:text-[2rem]">
                  Built to be found, not just browsed
                </h2>

                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {cs.seo.map((s) => (
                    <li key={s.title} className="flex gap-2.5">
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                        style={{ backgroundColor: BLUE }}
                      />
                      <span className="text-[13px] leading-[1.6] text-slate-600">
                        <strong className="font-semibold text-[#111827]">{s.title}.</strong> {s.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Outcomes as a quiet numbered strip — no card stack */}
                <div className="mt-8 rounded-lg border border-slate-200 px-5 py-4">
                  <p className="text-[10.5px] font-bold uppercase tracking-[.15em] text-slate-400">
                    What changed
                  </p>
                  <ol className="mt-2.5 space-y-1.5">
                    {cs.outcomes.map((o, i) => (
                      <li key={o} className="flex gap-3">
                        <span className="text-[11px] font-bold tabular-nums leading-[1.7]" style={{ color: BLUE }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] leading-[1.65] text-slate-600">{o}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Full-bleed screenshot band                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: INK_DEEP }}>
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[30ch] font-display text-[1.6rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[1.95rem]">
              The store as customers see it
            </h2>
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white/60 transition hover:text-white"
            >
              kabiroilmill.com
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <Reveal>
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10 shadow-[0_36px_72px_-38px_rgba(0,0,0,.8)]">
              <div className="relative aspect-[16/9] bg-white">
                <Image
                  src={cs.image}
                  alt="Kabir Oil Mill product catalogue and best sellers on the live storefront"
                  fill
                  sizes="(max-width: 1024px) 100vw, 1120px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
          <p className="mt-3 text-[11.5px] text-white/40">
            Real screenshot of the live store. Products, categories and pricing are
            the client&rsquo;s own.
          </p>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ + related                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="questions" className="scroll-mt-28 border-t border-slate-200 py-10">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="font-display text-[1.5rem] font-bold leading-[1.15] tracking-[-.03em] text-[#111827]">
                Questions about this build
              </h2>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                The same answers we give on the live case study page.
              </p>
              <Link
                href="/case-studies/kabiroilmill"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold underline underline-offset-4 transition hover:opacity-70"
                style={{ color: BLUE }}
              >
                Read the live case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Two columns of FAQs halves the page length */}
            <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              <FaqList
                items={cs.faqs.slice(0, Math.ceil(cs.faqs.length / 2))}
                accentClass="text-[#0F6DFF]"
                borderClass="border-slate-200"
                textClass="text-[#111827]"
                bodyClass="text-slate-600"
              />
              <FaqList
                items={cs.faqs.slice(Math.ceil(cs.faqs.length / 2))}
                accentClass="text-[#0F6DFF]"
                borderClass="border-slate-200"
                textClass="text-[#111827]"
                bodyClass="text-slate-600"
              />
            </div>
          </div>

          <div className="mt-10 grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <div>
              <h2 className="font-display text-[1.15rem] font-bold text-[#111827]">
                Other case studies
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3.5 py-1.5 text-[12px] font-semibold text-[#0F6DFF] transition hover:border-[#0F6DFF]/50"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
            <RelatedCaseStudies slugs={cs.related} theme="light" />
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Close                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-10" style={{ backgroundColor: INK_DEEP }}>
        <Wrap>
          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-[28ch] font-display text-[1.6rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[1.9rem]">
                Selling a physical product online? Start with the purchase path.
              </h2>
              <p className="mt-2.5 max-w-[52ch] text-[13.5px] leading-[1.7] text-white/60">
                Tell us what you sell and how orders currently arrive, and we will
                map the store around it — the same way this one was scoped.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0B57D0] motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: BLUE_MID }}
            >
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 border-t border-white/10 pt-7">
            <CaseNav slugs={cs.related} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
