import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  ChevronRight,
  Code2,
  Compass,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  MO_CONTAINER,
  MO_EYEBROW,
  MO_H2,
  MohaliBreadcrumb,
  MohaliCta,
  MohaliFaq,
  MohaliPreviewNotice,
} from "./mohali-shared";
import { Reveal } from "./reveal";

/**
 * The four service routes this hub introduces. Paths point at the preview
 * versions, never at the live Mohali pages — this is a review surface.
 */
const services = [
  {
    key: "web",
    icon: Code2,
    title: "Website design & development",
    path: "/new-web-designing-company-mohali",
    original: "/web-designing-company-mohali",
    summary:
      "A site that explains complex work clearly, loads fast and gives serious buyers a route to a conversation.",
    signals: ["New builds", "Redesigns", "E-commerce"],
  },
  {
    key: "seo",
    icon: Search,
    title: "SEO services",
    path: "/new-seo-services-mohali",
    original: "/seo-services-mohali",
    summary:
      "Technical foundations, pages built around real search intent and authority earned the slow, defensible way.",
    signals: ["Technical", "On-page", "Local"],
  },
  {
    key: "digital",
    icon: TrendingUp,
    title: "Digital marketing",
    path: "/new-digital-marketing-company-mohali",
    original: "/digital-marketing-company-mohali",
    summary:
      "Two channels chosen properly and measured against enquiries, rather than five running at once with no read-out.",
    signals: ["Search", "Paid", "Conversion"],
  },
  {
    key: "ai",
    icon: Bot,
    title: "AI marketing",
    path: "/new-ai-marketing-company-mohali",
    original: "/ai-marketing-company-mohali",
    summary:
      "Machine-assisted research, drafting and checking with a person owning strategy, claims and approval.",
    signals: ["AI SEO", "Content", "Analysis"],
  },
];

const industries = [
  ["SaaS and technology", "/seo-for-saas"],
  ["Professional services", "/seo-for-professional-services"],
  ["E-commerce", "/seo-for-ecommerce"],
  ["Healthcare", "/seo-for-healthcare"],
  ["Local business", "/seo-for-local-business"],
  ["Education", "/industries"],
];

const questions = [
  {
    q: "Where is Webamazee actually located?",
    a: "Webamazee works with businesses across India and internationally. This page is a service overview for Mohali and the wider Tricity market — it is not a claim of a local office in Mohali, and we would rather say that plainly than imply otherwise.",
  },
  {
    q: "Which service should a Mohali business start with?",
    a: "It depends on the bottleneck. If the site is the problem, start with the website. If the site is fine but nobody finds it, start with SEO. If enquiries arrive but the mix is unclear, start with a marketing diagnosis. The free audit is usually the cheapest way to find out which situation you are in.",
  },
  {
    q: "Can these services be combined?",
    a: "Yes, and they often are — but usually in sequence rather than all at once. A common order is a website foundation, then SEO, then paid media once the landing pages convert, then AI workflows to keep content volume manageable.",
  },
  {
    q: "Do you work with startups as well as established businesses?",
    a: "Both, with different priorities. A startup usually needs a credible site and proof of demand quickly. An established business usually needs to protect existing visibility while improving conversion and content depth.",
  },
  {
    q: "How do we start a conversation?",
    a: "Send a short note about what you do, who you sell to and what is not working. If a call makes sense we will suggest one; if the honest answer is that you do not need us yet, you will hear that instead.",
  },
];

export function MohaliHub() {
  return (
    <main className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <MohaliPreviewNotice />

      {/* Hub hero: stacked headline + four route tiles */}
      <section className="border-b border-slate-200 bg-[#f3f7fb]">
        <div className={`${MO_CONTAINER} py-9 sm:py-11`}>
          <MohaliBreadcrumb current="All services" />

          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <p className={MO_EYEBROW}>Digital services · Mohali</p>
                <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.05] tracking-[-.04em] sm:text-[3rem] lg:text-[3.35rem]">
                  Four starting points for a Mohali business that wants to be
                  found.
                </h1>
              </div>
              <p className="text-sm leading-7 text-slate-600 sm:text-[15px]">
                Mohali and SAS Nagar sit inside a Tricity market where buyers
                compare carefully and expect a professional digital presence.
                These are the four places we usually begin — each a different
                problem, not a different package.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.key} delay={i * 70}>
                  <Link
                    href={service.path}
                    className="group flex h-full flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-[#0f6dff]/45 hover:shadow-[0_18px_40px_-30px_rgba(11,21,40,.35)] sm:p-6"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 text-[#0f6dff]"
                        />
                        <span className="rounded bg-[#eef5ff] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#0f6dff]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-lg font-bold leading-snug">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-[13.5px] leading-6 text-slate-600">
                        {service.summary}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-1.5">
                      {service.signals.map((signal) => (
                        <span
                          key={signal}
                          className="rounded border border-slate-200 px-2 py-0.5 text-[10.5px] font-medium text-slate-500"
                        >
                          {signal}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#0f6dff]">
                        Open
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={150}>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                Serving Mohali, SAS Nagar and the Tricity
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Compass aria-hidden="true" className="h-3.5 w-3.5 text-[#0f6dff]" />
                Working with businesses across India and internationally
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Which problem are you solving — a decision table */}
      <section className="py-14 sm:py-16">
        <div className={MO_CONTAINER}>
          <Reveal>
            <div className="max-w-2xl">
              <p className={MO_EYEBROW}>Choosing a starting point</p>
              <h2 className={`${MO_H2} mt-3`}>
                Start from the symptom, not the service name
              </h2>
            </div>
          </Reveal>

          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
            {[
              {
                symptom: "People find us, but they do not enquire",
                answer: "Website",
                href: "/new-web-designing-company-mohali",
                why: "The offer is not being understood, or the next step is not obvious.",
              },
              {
                symptom: "Our website is fine, but nobody finds it",
                answer: "SEO",
                href: "/new-seo-services-mohali",
                why: "Discovery problem: crawlability, intent coverage or authority.",
              },
              {
                symptom: "Enquiries arrive, but the pipeline is unpredictable",
                answer: "Digital marketing",
                href: "/new-digital-marketing-company-mohali",
                why: "No deliberate mix and no agreed measurement.",
              },
              {
                symptom: "Content volume is the bottleneck, quality is slipping",
                answer: "AI workflows",
                href: "/new-ai-marketing-company-mohali",
                why: "The process needs speed with a person still owning accuracy.",
              },
            ].map((row, i) => (
              <Reveal key={row.symptom} delay={i * 60}>
                <Link
                  href={row.href}
                  className={`group grid gap-2 px-5 py-4 transition hover:bg-[#f7faff] sm:grid-cols-[1.1fr_130px_1fr] sm:items-center sm:gap-5 ${
                    i > 0 ? "border-t border-slate-200" : ""
                  }`}
                >
                  <p className="text-sm font-semibold leading-6 text-[#0b1528]">
                    {row.symptom}
                  </p>
                  <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#eef5ff] px-2.5 py-1 text-[11px] font-bold text-[#0f6dff]">
                    {row.answer}
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3 w-3 transition group-hover:translate-x-0.5"
                    />
                  </span>
                  <p className="text-[13px] leading-6 text-slate-500">
                    {row.why}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Proof + industries, side by side */}
      <section className="border-y border-slate-200 bg-[#f7fafd] py-14 sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12`}>
          <Reveal from="left">
            <div>
              <p className={MO_EYEBROW}>Published work</p>
              <h2 className={`${MO_H2} mt-3`}>
                Real projects, not illustrative results
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
                Three published builds you can open and judge for yourself. No
                invented case studies, no before-and-after numbers that cannot
                be checked.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    name: "Kabir Oil Mill",
                    href: "/work/kabir-oil-mill",
                    image: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
                    tag: "E-commerce",
                  },
                  {
                    name: "Wellington Tours",
                    href: "/work/wellington-tours",
                    image: "/images/portfolio/wellington-tours-live-homepage.webp",
                    tag: "Tourism",
                  },
                  {
                    name: "Shine Gold Tours",
                    href: "/work/shine-gold-tours-india",
                    image:
                      "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
                    tag: "Tourism",
                  },
                ].map((project) => (
                  <Link
                    key={project.href}
                    href={project.href}
                    className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-[#0f6dff]/40"
                  >
                    <div className="relative aspect-[1.5]">
                      <Image
                        src={project.image}
                        alt={`${project.name} website built by Webamazee`}
                        fill
                        sizes="(max-width: 640px) 100vw, 220px"
                        className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
                        {project.tag}
                      </p>
                      <p className="mt-1 text-[13px] font-semibold leading-5">
                        {project.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={100}>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <p className={MO_EYEBROW}>Where this applies</p>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                Sectors we work with
              </h2>
              <ul className="mt-5 divide-y divide-slate-100">
                {industries.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center justify-between gap-3 py-2.5 text-[13.5px] font-medium text-slate-700 transition hover:text-[#0f6dff]"
                    >
                      {label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-[#0f6dff]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Honest positioning block */}
      <section className="py-14 sm:py-16">
        <div className={`${MO_CONTAINER} grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center`}>
          <Reveal>
            <div>
              <p className={MO_EYEBROW}>Before you enquire</p>
              <h2 className={`${MO_H2} mt-3`}>
                What we are, and what we are not
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-5">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                <h3 className="mt-3 font-display text-base font-bold">We are</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                  A digital growth team working with Mohali and Tricity
                  businesses on websites, search, marketing and AI-assisted
                  workflows — remote-first, with clear scopes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#fafcff] p-5">
                <MapPin aria-hidden="true" className="h-4 w-4 text-slate-400" />
                <h3 className="mt-3 font-display text-base font-bold">
                  We are not
                </h3>
                <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
                  A Mohali-based office. If you need a provider you can visit in
                  person every week, we would rather say so now than appear on a
                  call to discuss it.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <MohaliFaq
        items={questions}
        title="Questions about working together"
        intro="Practical answers, including the ones about where we are based."
      />
      <MohaliCta
        title="Tell us which of the four problems sounds like yours"
        body="A short description of what is not working is enough to start. We will reply with a view on whether we are the right fit."
        label="Start a conversation"
        secondaryHref="/new-seo-services-mohali"
        secondaryLabel="Explore SEO services"
      />
      <nav
        aria-label="Mohali preview navigation"
        className="border-t border-slate-200 bg-white py-8"
      >
        <div className={MO_CONTAINER}>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <li key={service.key}>
                <Link
                  href={service.path}
                  className="group flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-4 py-3 text-[13px] font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/40 hover:bg-[#f6f9ff]"
                >
                  {service.title}
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </main>
  );
}
