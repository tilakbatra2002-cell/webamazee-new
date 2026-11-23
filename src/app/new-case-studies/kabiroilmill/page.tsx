import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, CircleDot } from "lucide-react";
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
const BLUE = "#0F6DFF"; // brand-700
const BLUE_MID = "#1E88FF"; // brand-600
const INK_DEEP = "#0B1528"; // dark band used across previews
const BAND = "#F5F8FD"; // light band
const HERO_BAND = "#F3F7FB"; // hero band

/** The purchase path this project was built around, in order. */
const COMMERCE_PATH = [
  {
    step: "01",
    title: "Browse",
    body: "Category and catalogue pages organise the oil range so a visitor can see the full offer before choosing anything.",
  },
  {
    step: "02",
    title: "Product detail",
    body: "Each product page carries its own imagery, name, price and purchase action, with the range still visible around it.",
  },
  {
    step: "03",
    title: "Cart",
    body: "Selections collect in a cart that keeps the order visible, so the customer always knows what is being bought.",
  },
  {
    step: "04",
    title: "Checkout",
    body: "A short, continuous checkout closes the loop from browsing to a placed online order.",
  },
];

export default function KabirOilMillPreview() {
  const cs = findCaseStudy(SLUG);
  if (!cs) notFound();

  const facts = [
    { label: "Project", value: cs.projectType },
    { label: "Industry", value: cs.industry },
    { label: "Market", value: cs.country },
    { label: "Completed", value: cs.completion },
  ];

  return (
    <>
      <PreviewBanner />

      {/* ---------------------------------------------------------------- */}
      {/* Hero — light band, split, screenshot framed as a storefront       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-slate-200" style={{ backgroundColor: HERO_BAND }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.6]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 8%, rgba(15,109,255,.10), transparent 44%), radial-gradient(circle at 88% 82%, rgba(30,136,255,.08), transparent 46%)",
          }}
        />
        <Wrap className="relative py-12 sm:py-16 lg:py-20">
          <Crumbs name={cs.name} />

          <div className="mt-9 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,.92fr)] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.2em]" style={{ color: BLUE }}>
                {cs.tag} &middot; Case study
              </p>
              <h1 className="mt-4 font-display text-[2.1rem] font-bold leading-[1.06] tracking-[-.03em] text-[#111827] sm:text-[2.7rem] lg:text-[3.05rem]">
                How Webamazee Built a Digital E-commerce Store for Kabir Oil Mill
              </h1>
              <p className="mt-5 max-w-[46ch] text-[15.5px] leading-[1.7] text-slate-600">
                {cs.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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
                  className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] opacity-60 blur-2xl"
                  style={{ background: "radial-gradient(circle, rgba(15,109,255,.22), transparent 70%)" }}
                />
                {/* Browser chrome around the real screenshot */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_28px_60px_-28px_rgba(11,21,40,.35)]">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 bg-[#F8FAFC] px-3 py-2">
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
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-[12px] text-slate-500">
                  The live storefront at kabiroilmill.com — real screenshot, no mockup.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Fact strip — all four values come straight from the project record */}
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="bg-white px-5 py-4">
                <dt className="text-[10.5px] font-semibold uppercase tracking-[.16em] text-slate-400">
                  {f.label}
                </dt>
                <dd className="mt-1 text-[14px] font-semibold leading-snug text-[#111827]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The starting point                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                Where it started
              </p>
              <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#111827] sm:text-[2.35rem]">
                A quality product range with nowhere to buy it online
              </h2>
              <p className="mt-5 text-[14.5px] leading-[1.75] text-slate-600">{cs.overviewBusiness}</p>
            </div>

            <div className="space-y-6">
              {cs.before.map((para, i) => (
                <div key={i} className="border-l-2 border-slate-200 pl-5">
                  <p className="text-[14.5px] leading-[1.8] text-slate-600">{para}</p>
                </div>
              ))}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "#DCE7F5", backgroundColor: HERO_BAND }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[.16em]" style={{ color: BLUE }}>
                  What that meant in practice
                </p>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {cs.challenges.map((c) => (
                    <li key={c.title} className="flex gap-2.5">
                      <CircleDot className="mt-[3px] h-3.5 w-3.5 shrink-0" style={{ color: BLUE }} aria-hidden />
                      <span className="text-[13.5px] leading-snug text-slate-600">
                        <strong className="font-semibold text-[#111827]">{c.title}.</strong>{" "}
                        {c.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Signature block — the commerce path                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-slate-200 py-16 sm:py-20" style={{ backgroundColor: BAND }}>
        <Wrap>
          <div className="max-w-[58ch]">
            <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
              The build, in one line
            </p>
            <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#111827] sm:text-[2.35rem]">
              Four steps, designed as one continuous purchase
            </h2>
            <p className="mt-4 text-[14.5px] leading-[1.75] text-slate-600">
              The store was not built page by page. It was built around a single
              path a customer walks once, and every screen was designed to make
              the next step obvious.
            </p>
          </div>

          <ol className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COMMERCE_PATH.map((s, i) => (
              <li key={s.step} className="relative">
                <Reveal delay={i * 70}>
                  <div className="h-full rounded-xl border border-slate-200 bg-white p-5">
                    <span
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[12px] font-bold text-white"
                      style={{ backgroundColor: BLUE }}
                    >
                      {s.step}
                    </span>
                    <h3 className="mt-3.5 font-display text-[16px] font-bold text-[#111827]">{s.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-[1.65] text-slate-600">{s.body}</p>
                  </div>
                  {i < COMMERCE_PATH.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute -right-2.5 top-9 hidden h-px w-5 lg:block"
                      style={{ backgroundColor: "#CDDDF0" }}
                    />
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Plan → design → build, told as a three-part working record        */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <h2 className="max-w-[22ch] font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#111827] sm:text-[2.35rem]">
            How the work actually ran
          </h2>

          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {[
              { label: "Discovery", items: cs.discovery },
              { label: "Design", items: cs.design },
              { label: "Development", items: cs.development },
            ].map((group, gi) => (
              <Reveal key={group.label} delay={gi * 90}>
                <div>
                  <div className="flex items-baseline gap-3 border-b border-slate-200 pb-3">
                    <span className="font-display text-[13px] font-bold uppercase tracking-[.14em]" style={{ color: BLUE }}>
                      {group.label}
                    </span>
                    <span className="text-[11px] text-slate-400">{group.items.length} stages</span>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {group.items.map((it) => (
                      <li key={it.title} className="flex gap-3">
                        <Check className="mt-[2px] h-4 w-4 shrink-0" style={{ color: BLUE }} aria-hidden />
                        <div>
                          <p className="text-[13.5px] font-semibold leading-snug text-[#111827]">{it.title}</p>
                          <p className="mt-1 text-[13px] leading-[1.65] text-slate-600">{it.desc}</p>
                        </div>
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
      {/* Feature set                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-slate-200 py-16 sm:py-20" style={{ backgroundColor: BAND }}>
        <Wrap>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-14">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                What shipped
              </p>
              <h2 className="mt-3 font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-.03em] text-[#111827] sm:text-[2.2rem]">
                Eight things the storefront had to do
              </h2>
              <p className="mt-4 text-[14px] leading-[1.75] text-slate-600">{cs.scope}</p>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {cs.features.map((f) => (
                <div key={f.title} className="border-t border-slate-200 pt-4">
                  <p className="text-[14px] font-semibold text-[#111827]">{f.title}</p>
                  <p className="mt-1 text-[13px] leading-[1.65] text-slate-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Full-width screenshot band                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: INK_DEEP }}>
        <Wrap>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-[30ch] font-display text-[1.8rem] font-bold leading-[1.1] tracking-[-.03em] text-white sm:text-[2.2rem]">
              The store as customers see it
            </h2>
            <p className="max-w-[34ch] text-[13px] leading-relaxed text-white/50">
              Screenshot of the live site. Products, categories and pricing are
              the client&rsquo;s own.
            </p>
          </div>

          <Reveal>
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,.8)]">
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

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cs.gallery.map((g) => (
              <div key={g.label} className="rounded-lg border border-white/10 px-4 py-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-[.15em] text-white/40">
                  {g.device}
                </p>
                <p className="mt-1 text-[13px] font-medium text-white/80">{g.label}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Search foundations + outcomes                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-white py-16 sm:py-20">
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                Search foundations
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827]">
                Built to be found, not just browsed
              </h2>
              <ul className="mt-6 space-y-3.5">
                {cs.seo.map((s) => (
                  <li key={s.title} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0" style={{ color: BLUE }} aria-hidden />
                    <span className="text-[13.5px] leading-[1.7] text-slate-600">
                      <strong className="font-semibold text-[#111827]">{s.title}.</strong> {s.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em]" style={{ color: BLUE }}>
                What changed
              </p>
              <h2 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827]">
                Outcomes, stated plainly
              </h2>
              <ol className="mt-6 space-y-3">
                {cs.outcomes.map((o, i) => (
                  <li
                    key={o}
                    className="flex gap-4 rounded-lg border px-4 py-3"
                    style={{ borderColor: "#DCE7F5", backgroundColor: HERO_BAND }}
                  >
                    <span className="font-display text-[13px] font-bold" style={{ color: BLUE }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13.5px] leading-[1.65] text-slate-600">{o}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-lg border border-slate-200 px-4 py-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-[.15em] text-slate-400">
                  Built with
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  {cs.techStack.join(" · ")}
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ + related                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-t border-slate-200 py-16 sm:py-20" style={{ backgroundColor: BAND }}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,.62fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <h2 className="font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-[#111827]">
                Questions about this build
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                The same answers we give on the live case study page.
              </p>
              <div className="mt-7">
                <Link
                  href="/case-studies/kabiroilmill"
                  className="inline-flex items-center gap-2 text-[13px] font-semibold underline underline-offset-4 transition hover:opacity-70"
                  style={{ color: BLUE }}
                >
                  Read the live case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <FaqList
              items={cs.faqs}
              accentClass="text-[#0F6DFF]"
              borderClass="border-slate-200"
              textClass="text-[#111827]"
              bodyClass="text-slate-600"
            />
          </div>

          <div className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="font-display text-[1.35rem] font-bold text-[#111827]">Other case studies</h2>
            <div className="mt-5">
              <RelatedCaseStudies slugs={cs.related} theme="light" />
            </div>
            {cs.services.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2.5">
                {cs.services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-[12.5px] font-semibold text-[#0F6DFF] transition hover:border-[#0F6DFF]/50"
                  >
                    {s.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Wrap>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Close                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: INK_DEEP }}>
        <Wrap>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <h2 className="max-w-[26ch] font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-white sm:text-[2.1rem]">
                Selling a physical product online? Start with the purchase path.
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-[1.75] text-white/60">
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
          <div className="mt-10 border-t border-white/10 pt-8">
            <CaseNav slugs={cs.related} />
          </div>
        </Wrap>
      </section>
    </>
  );
}
