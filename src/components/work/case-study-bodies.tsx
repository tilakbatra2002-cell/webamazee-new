"use client";

/**
 * Per-project case study bodies.
 *
 * Each page gets its own section order and rhythm, drawn from a shared set of
 * primitives so the three still read as one site. No invented outcomes,
 * metrics or testimonials appear anywhere in this file.
 */
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  CreditCard,
  Gauge,
  LayoutGrid,
  Layers,
  MapPin,
  MousePointerClick,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { ProjectGallery, RequirementList, ShowcaseFrame, SplitShowcase, WideShowcase } from "./case-study-showcase";

const container = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const eyebrowCls = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const headingCls =
  "font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em] text-[#0b1528] sm:text-[2rem]";
const leadCls = "text-[14.5px] leading-relaxed text-slate-600 sm:text-[15px]";

export type CaseProject = {
  title: string;
  slug: string;
  url: string;
  image: string;
  summary: string;
  overview: string[];
  goals: string[];
  requirements: string[];
  challenges: { title: string; desc: string }[];
  solution: string[];
  solutionAreas: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  seo: { title: string; desc: string }[];
  gallery: { label: string; device: "desktop" | "tablet" | "mobile"; alt: string; src?: string }[];
  faqs: { q: string; a: string }[];
  services: { slug: string; name: string }[];
  marketLink?: { label: string; href: string };
  industry: string;
};

function Head({
  eyebrow, title, intro, center = false,
}: {
  eyebrow: string; title: string; intro?: string; center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={eyebrowCls}>{eyebrow}</p>
      <h2 className={`${headingCls} mt-2`}>{title}</h2>
      {intro && <p className={`${leadCls} mt-2.5`}>{intro}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Faqs({ faqs }: { faqs: { q: string; a: string }[] }) {
  if (!faqs.length) return null;
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <Head eyebrow="Questions" title="About this project" center />
        <div className="mx-auto mt-7 max-w-3xl divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {faqs.map((f) => (
            <details key={f.q} className="group px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[13.5px] font-semibold text-[#0b1528] marker:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#f7f9fc] text-slate-400 transition-colors group-open:bg-[#eef4ff] group-open:text-[#0f6dff]"
                >
                  <span className="text-[15px] leading-none group-open:hidden">+</span>
                  <span className="hidden text-[15px] leading-none group-open:inline">−</span>
                </span>
              </summary>
              <p className="pb-4 pr-8 text-[13px] leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechRow({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-slate-700"
        >
          <Layers aria-hidden="true" className="h-3 w-3 text-[#0f6dff]" />
          {t}
        </span>
      ))}
    </div>
  );
}

function ProcessRail({ process }: { process: { step: string; title: string; desc: string }[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {process.map((p) => (
        <li key={p.step} className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="font-display text-[11px] font-bold text-[#0f6dff]">{p.step}</span>
          <h3 className="mt-1 font-display text-[14px] font-bold text-[#0b1528]">{p.title}</h3>
          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{p.desc}</p>
        </li>
      ))}
    </ol>
  );
}

function SeoGrid({
  seo,
  intro,
}: {
  seo: { title: string; desc: string }[];
  intro?: string;
}) {
  return (
    <div>
      {intro && (
        <p className="mb-5 max-w-3xl text-[13px] leading-relaxed text-slate-600">{intro}</p>
      )}
      <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {seo.map((s) => (
        <div key={s.title} className="flex items-start gap-2.5">
          <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
          <div>
            <h3 className="font-display text-[13.5px] font-bold text-[#0b1528]">{s.title}</h3>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{s.desc}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

function ServiceLinks({ project }: { project: CaseProject }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[12.5px] text-slate-500">Delivered with</span>
      {project.services.map((s) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
        >
          {s.name}
          <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
        </Link>
      ))}
      {project.marketLink && (
        <Link
          href={project.marketLink.href}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
        >
          {project.marketLink.label}
          <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
        </Link>
      )}
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
      >
        All work
        <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
      </Link>
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff]/40 hover:text-[#0b57d0]"
      >
        Case studies
        <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
      </Link>
    </div>
  );
}

/* ================================================================== */
/* A. KABIR OIL MILL — commerce-led                                    */
/* ================================================================== */

const commerceStages = [
  { icon: Boxes, title: "Store architecture", text: "Categories and product groups organised so shoppers can reach a product in a few clicks." },
  { icon: LayoutGrid, title: "Product discovery", text: "A catalogue and homepage arrangement that puts the product range in front of the visitor early." },
  { icon: MousePointerClick, title: "Product detail", text: "Individual product pages that explain the product, its variants and how to buy it." },
  { icon: CreditCard, title: "Cart and checkout", text: "A working cart and checkout journey built for completion rather than decoration." },
  { icon: Smartphone, title: "Responsive shopping", text: "The same store experience on phone, tablet and desktop, since most browsing happens on a phone." },
  { icon: ShieldCheck, title: "Store management", text: "A content-managed store the client can update without a developer for every change." },
];

export function KabirBody({ project }: { project: CaseProject }) {
  const showcase = project.gallery.find((g) => g.label === "Device showcase");
  const fullPage = project.gallery.find((g) => g.device === "mobile");

  return (
    <>
      {/* Overview + requirements */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div>
              <Head eyebrow="Project overview" title="An oil mill moving its product range online" />
              <div className="mt-4 space-y-3">
                {project.overview.map((p) => (
                  <p key={p} className={leadCls}>{p}</p>
                ))}
              </div>
              <div className="mt-5">
                <ServiceLinks project={project} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Requirements
              </h3>
              <div className="mt-2.5">
                <RequirementList items={project.requirements} />
              </div>
              <h3 className="mt-6 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Business goals
              </h3>
              <ul className="mt-2.5 space-y-2">
                {project.goals.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                    <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Commerce challenges */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="E-commerce challenges"
            title="What selling online actually required"
            intro="Four problems had to be solved before the store could do its job."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.challenges.map((c, i) => (
              <article key={c.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-[14px] font-bold text-[#0b1528]">{c.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The shopping journey — six stages */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="Store architecture and product discovery"
            title="How the shopping journey was built"
            intro="Each stage of the purchase path was designed as part of one sequence, not as a separate page."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commerceStages.map((s) => (
              <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  <s.icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-display text-[14px] font-bold text-[#0b1528]">{s.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase: desktop + full page */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="The store, as built"
            title="Desktop and full-page capture"
            intro="Both views are captures of the live store, not mockups."
          />
          <div className="mt-7">
            <SplitShowcase
              wide={{ src: project.image, url: project.url }}
              tall={{ src: fullPage?.src ?? project.image }}
              wideAlt={`${project.title} store homepage on desktop`}
              tallAlt={fullPage?.alt ?? `${project.title} store page`}
              wideCaption="Live homepage"
              tallCaption={fullPage ? "Store page, full length" : undefined}
            />
          </div>
          {showcase?.src && (
            <div className="mt-6">
              <WideShowcase
                src={showcase.src}
                alt={showcase.alt}
                caption="Store shown on laptop and phone, with the product range and shopping features"
              />
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="What was included" title="Features delivered" />
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                <div>
                  <h3 className="font-display text-[13.5px] font-bold text-[#0b1528]">{f.title}</h3>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="Screenshot gallery" title="The project gallery" center />
          <div className="mt-7">
            <ProjectGallery items={project.gallery} fallback={project.image} />
          </div>
        </div>
      </section>

      {/* Stack + process */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div>
              <Head eyebrow="Technology" title="Built with a modern stack" />
              <div className="mt-4">
                <TechRow stack={project.techStack} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Development process
              </h3>
              <div className="mt-3">
                <ProcessRail process={project.process} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="Search foundations"
            title="Performance and SEO groundwork"
            intro="Foundations built into the site from the start rather than added later."
          />
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <SeoGrid seo={project.seo} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/services/seo-services" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              SEO services <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
            <Link href="/seo-for-ecommerce" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              SEO for e-commerce <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      <Faqs faqs={project.faqs} />
    </>
  );
}

/* ================================================================== */
/* B. WELLINGTON TOURS — destination-editorial                         */
/* ================================================================== */

const travelStages = [
  { icon: MapPin, title: "Destination structure", text: "The site is organised around places and experiences, which is how travellers actually search." },
  { icon: LayoutGrid, title: "Package presentation", text: "Tour packages presented with what is included, so a visitor can compare without asking." },
  { icon: Search, title: "Discovery over browsing", text: "Clear entry points for the main transfers and city tours rather than one long list of options." },
  { icon: MousePointerClick, title: "Enquiry journey", text: "A short path from interest to an enquiry, with the action visible on every package view." },
  { icon: Smartphone, title: "Planning on mobile", text: "Travel research happens on phones, so the package and enquiry flow holds up on small screens." },
  { icon: ShieldCheck, title: "Trust content", text: "Practical detail about the service that answers questions before a first enquiry." },
];

export function WellingtonBody({ project }: { project: CaseProject }) {
  return (
    <>
      {/* Overview */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
            <div>
              <Head
                eyebrow="Project overview"
                title="A New Zealand travel site built around packages"
                intro={project.summary}
              />
              <div className="mt-4 space-y-3">
                {project.overview.map((p) => (
                  <p key={p} className={leadCls}>{p}</p>
                ))}
              </div>
              <div className="mt-5">
                <ServiceLinks project={project} />
              </div>
            </div>
            <WideShowcase
              src={project.image}
              alt={`${project.title} live homepage`}
              caption="Live homepage"
            />
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="Business goals" title="What the site had to achieve" />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.goals.map((g, i) => (
              <div key={g} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="font-display text-[11px] font-bold text-[#0f6dff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[13px] leading-relaxed text-slate-600">{g}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discovery challenge */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="Tour package discovery"
            title="Helping travellers find the right trip"
            intro="With several transfer types and city tours on offer, the challenge was making the choices legible."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.challenges.map((c, i) => (
              <article key={c.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <span className="font-display text-[11px] font-bold text-slate-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-[14px] font-bold text-[#0b1528]">{c.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Structure */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="Destination-led website structure"
            title="How the site is organised"
            intro="Six parts of the visitor experience, each solving a different part of the planning problem."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {travelStages.map((s) => (
              <article key={s.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#eef4ff] text-[#0f6dff]">
                  <s.icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-display text-[14px] font-bold text-[#0b1528]">{s.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Wide showcase + gallery */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="The website, as built" title="Project gallery" center />
          <div className="mt-7">
            <ProjectGallery items={project.gallery} fallback={project.image} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="What was included" title="Features delivered" />
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                <div>
                  <h3 className="font-display text-[13.5px] font-bold text-[#0b1528]">{f.title}</h3>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + process */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div>
              <Head eyebrow="Technology" title="Built with a modern stack" />
              <div className="mt-4">
                <TechRow stack={project.techStack} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Development process
              </h3>
              <div className="mt-3">
                <ProcessRail process={project.process} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="Search foundations" title="Performance and SEO groundwork" />
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <SeoGrid seo={project.seo} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/services/seo-services" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              SEO services <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
            <Link href="/seo-for-tourism" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              SEO for travel and tourism <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      <Faqs faqs={project.faqs} />
    </>
  );
}

/* ================================================================== */
/* C. SHINE GOLD TOURS — redesign                                      */
/* ================================================================== */

const redesignStages = [
  { icon: LayoutGrid, title: "Visual hierarchy", text: "A clear order of importance on every page, so a visitor knows where to look first." },
  { icon: MapPin, title: "Destination discovery", text: "Destinations grouped by theme, making a large tour catalogue browsable." },
  { icon: MousePointerClick, title: "Enquiry paths", text: "The next step is visible and consistent, rather than buried at the foot of a page." },
  { icon: Smartphone, title: "Responsive redesign", text: "The refreshed design works across phone, tablet and desktop." },
  { icon: Search, title: "Search-friendly content", text: "Headings, page structure and metadata carried over into the redesign." },
  { icon: Gauge, title: "Speed and loading", text: "The redesign was built with delivery and performance in mind." },
];

export function ShineGoldBody({ project }: { project: CaseProject }) {
  return (
    <>
      {/* Context + objectives */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <Head
                eyebrow="Project context"
                title="Reworking an existing travel website"
                intro="This was not a new build. The business already had a travel website; the work was improving how it looked, read and converted."
              />
              <div className="mt-4 space-y-3">
                {project.overview.map((p) => (
                  <p key={p} className={leadCls}>{p}</p>
                ))}
              </div>
              <div className="mt-5">
                <ServiceLinks project={project} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Redesign objectives
              </h3>
              <div className="mt-2.5">
                <RequirementList items={project.goals} />
              </div>
              <h3 className="mt-6 font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Scope
              </h3>
              <ul className="mt-2.5 space-y-2">
                {project.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[13px] leading-relaxed text-slate-600">
                    <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* UX challenges */}
      <section className="bg-[#0b1528] py-12 text-white sm:py-14">
        <div className={container}>
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
              Visual hierarchy and UX
            </p>
            <h2 className="mt-2 font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[2rem]">
              What the redesign had to fix
            </h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {project.challenges.map((c, i) => (
              <article key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="font-display text-[11px] font-bold text-slate-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display text-[14px] font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-slate-300">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* New UI direction */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head
            eyebrow="New UI direction"
            title="The redesign, as delivered"
            intro="The current live site is the redesigned version — the screenshots below show it as it looks now."
          />
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <ShowcaseFrame
              src={project.image}
              alt={`${project.title} redesigned homepage`}
              url={project.url}
              caption="Redesigned homepage, live"
            />
            <div className="grid gap-3">
              {redesignStages.map((s) => (
                <article key={s.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eef4ff] text-[#0f6dff]">
                    <s.icon aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[13.5px] font-bold text-[#0b1528]">{s.title}</h3>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="Screenshot gallery" title="The redesigned website" center />
          <div className="mt-7">
            <ProjectGallery items={project.gallery} fallback={project.image} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="What was included" title="Features delivered" />
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f) => (
              <div key={f.title} className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                <div>
                  <h3 className="font-display text-[13.5px] font-bold text-[#0b1528]">{f.title}</h3>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech + process */}
      <section className="bg-[#f7f9fc] py-12 sm:py-14">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div>
              <Head eyebrow="Technology" title="Built with a modern stack" />
              <div className="mt-4">
                <TechRow stack={project.techStack} />
              </div>
            </div>
            <div>
              <h3 className="font-display text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Redesign process
              </h3>
              <div className="mt-3">
                <ProcessRail process={project.process} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white py-12 sm:py-14">
        <div className={container}>
          <Head eyebrow="Search foundations" title="Performance and SEO groundwork" />
          <div className="mt-7 rounded-2xl border border-slate-200 bg-[#f7f9fc] p-5 sm:p-6">
            <SeoGrid
              seo={project.seo}
              intro="This project was built with performance and search in mind. Rather than reporting figures we can't verify, here is the optimisation work we performed."
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/services/website-redesign" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              Website redesign <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
            <Link href="/seo-for-tourism" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#0b1528] hover:border-[#0f6dff]/40 hover:text-[#0b57d0]">
              SEO for travel and tourism <ArrowUpRight aria-hidden="true" className="h-3 w-3 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      <Faqs faqs={project.faqs} />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function CaseStudyCta({ title }: { title: string }) {
  return (
    <section className="bg-[#f7f9fc] py-12 sm:py-14">
      <div className={container}>
        <div className="rounded-2xl bg-[#0b1528] px-6 py-9 text-center sm:px-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
            Start here
          </p>
          <h2 className="mx-auto mt-2 max-w-2xl font-display text-[1.6rem] font-bold leading-[1.15] text-white sm:text-[1.95rem]">
            Have a project like {title}?
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-[14px] leading-relaxed text-slate-300">
            Tell us what you are building and we will come back with a tailored plan — no
            obligation.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0]"
            >
              Start a project
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/free-seo-audit"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/25 px-6 text-[14px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Get a free audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
