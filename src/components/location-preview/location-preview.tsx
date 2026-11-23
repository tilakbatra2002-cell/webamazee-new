import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import { generateMetadata } from "@/lib/metadata";
import {
  locationHubs,
  type LocationHub,
} from "@/lib/location-hubs";
import {
  getLocationPage,
  type LocationPage,
} from "@/lib/locations";
import {
  getCommercialLocationPage,
  type CommercialLocationPage,
} from "@/lib/locations-commercial";
import { Reveal } from "@/components/mohali-preview/reveal";

// ---------------------------------------------------------------------------
// Shared layout tokens
// ---------------------------------------------------------------------------

const CONTAINER = "mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10";
const EYEBROW = "text-[11px] font-bold uppercase tracking-[.18em] text-[#0f6dff]";
const H2 =
  "font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-.03em] text-[#0b1528] sm:text-[2.3rem] lg:text-[2.6rem]";
const PRIMARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0f6dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_-12px_rgba(15,109,255,.55)] transition hover:-translate-y-0.5 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff] motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const SECONDARY =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

/**
 * Three fixed layout variants. Assigned deterministically from the slug so a
 * location always renders the same way, while neighbouring locations differ.
 */
type Variant = 1 | 2 | 3;

export function variantFor(slug: string): Variant {
  let sum = 0;
  for (const ch of slug) sum = (sum + ch.charCodeAt(0)) % 997;
  return ((sum % 3) + 1) as Variant;
}

// ---------------------------------------------------------------------------
// Normalised shape every source type collapses into
// ---------------------------------------------------------------------------

type Faq = { q: string; a: string };
type Item = { title: string; desc: string };
type Link_ = { label: string; href: string };

export type PreviewContent = {
  slug: string;
  location: string;
  country: string;
  serviceLabel: string;
  h1: string;
  heroText: string;
  intro: string[];
  needs: Item[];
  /** Explainers — "what this service means here" style blocks. */
  explainers: { heading: string; body: string[] }[];
  steps: { step: string; title: string; desc: string }[];
  industries: { name: string; desc: string; href?: string }[];
  faqs: Faq[];
  /** Only genuine portfolio projects ever land here. */
  projects: { name: string; href: string; image: string; summary: string }[];
  relatedServices: Link_[];
  localLinks: Link_[];
  /** Rendered as the in-page nav rail on variant 2 & 3. */
  highlights: string[];
};

const PROJECT_IMAGES: Record<string, string> = {
  "kabir-oil-mill": "/images/portfolio/kabir-oil-mill-live-homepage.webp",
  "wellington-tours": "/images/portfolio/wellington-tours-live-homepage.webp",
  "shine-gold-tours-india":
    "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
};

const PROJECT_SUMMARY: Record<string, string> = {
  "kabir-oil-mill":
    "A complete e-commerce build around product discovery and online ordering.",
  "wellington-tours":
    "A New Zealand travel site structured around tour packages and enquiries.",
  "shine-gold-tours-india":
    "A travel website redesign focused on clearer information and lead generation.",
};

function projectCard(href: string, name?: string) {
  const slug = href.split("/").pop() ?? "";
  if (!PROJECT_IMAGES[slug]) return null;
  return {
    name: name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    href,
    image: PROJECT_IMAGES[slug],
    summary: PROJECT_SUMMARY[slug] ?? "",
  };
}

/** Collapse a hub record into the shared preview shape. */
export function fromHub(hub: LocationHub, routes: Record<string, string>) {
  const preview: PreviewContent = {
    slug: `new-${hub.slug}`,
    location: hub.location,
    country: hub.country,
    serviceLabel: "Digital services",
    h1: hub.h1,
    heroText: hub.heroText,
    intro: hub.intro,
    needs: hub.needs,
    explainers: [
      { heading: "Search focus", body: [hub.seoFocus] },
      { heading: "E-commerce", body: [hub.ecommerceFocus] },
    ],
    steps: [],
    industries: hub.industries,
    faqs: hub.faqs,
    projects: hub.projects
      .map((p) => projectCard(p.href, p.name))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    relatedServices: [
      { label: "Website design", href: routes.web },
      { label: "SEO services", href: routes.seo },
      { label: "Digital marketing", href: routes.digital },
      { label: "AI marketing", href: routes.ai },
    ],
    localLinks: [],
    highlights: hub.needs.slice(0, 4).map((n) => n.title),
  };
  return preview;
}

/** Collapse a location service page into the shared preview shape. */
export function fromLocationPage(page: LocationPage): PreviewContent {
  const explainers: { heading: string; body: string[] }[] = [];
  if (page.intent?.length) {
    explainers.push({
      heading: "What this means for the search",
      body: page.intent.map((i) => `${i.heading}: ${i.body}`),
    });
  }
  if (page.coreService?.length) {
    explainers.push({ heading: "What the work involves", body: page.coreService });
  }

  const projects = (page.portfolioLinks ?? [])
    .map((p) => projectCard(p.href, p.label))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return {
    slug: `new-${page.slug}`,
    location: page.location,
    country: page.country,
    serviceLabel:
      page.service === "web-design"
        ? "Website design"
        : page.service === "seo"
          ? "SEO services"
          : page.service === "ai-marketing"
            ? "AI marketing"
            : "Digital marketing",
    h1: page.h1,
    heroText: page.heroText,
    intro: page.intro,
    needs: page.whyNeeds,
    explainers,
    steps: page.process ?? [],
    industries: page.industries ?? [],
    faqs: page.faqs ?? [],
    projects,
    relatedServices: (page.relevantServices ?? []).map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
    localLinks: (page.clusterLinks ?? []).slice(0, 6),
    highlights: (page.outcomes ?? page.whyNeeds.map((w) => w.title)).slice(0, 4),
  };
}

/** Collapse a commercial (digital / AI) location page. */
export function fromCommercialPage(page: CommercialLocationPage): PreviewContent {
  const explainers = [
    { heading: page.whatItMeans.heading, body: page.whatItMeans.body },
  ];
  if (page.aiApproach) {
    explainers.push({ heading: page.aiApproach.heading, body: page.aiApproach.body });
  }
  if (page.aiSearch) {
    explainers.push({ heading: page.aiSearch.heading, body: page.aiSearch.body });
  }

  const projects = (page.portfolioLinks ?? [])
    .map((p) => projectCard(p.href, p.label))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return {
    slug: `new-${page.slug}`,
    location: page.location,
    country: page.country,
    serviceLabel:
      page.commercialType === "ai-marketing" ? "AI marketing" : "Digital marketing",
    h1: page.h1,
    heroText: page.heroSubtitle ?? page.heroText,
    intro: page.intro,
    needs: page.whyNeeds,
    explainers,
    steps: page.process ?? [],
    industries: page.industries ?? [],
    faqs: page.faqs ?? [],
    projects,
    relatedServices: (page.commercialServices ?? [])
      .slice(0, 6)
      .map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
    localLinks: (page.locationCluster ?? []).slice(0, 6),
    highlights: [
      ...(page.strategies ?? []).slice(0, 3).map((s) => s.title),
      ...(page.whyNeeds ?? []).slice(0, 1).map((w) => w.title),
    ].slice(0, 4),
  };
}

// ---------------------------------------------------------------------------
// Metadata — always noindex, self-canonical, never the live URL
// ---------------------------------------------------------------------------

export function previewMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[]
): Metadata {
  return generateMetadata({
    title,
    metaTitle: title,
    metaDescription: description,
    canonical: path,
    path,
    keywords,
    schemaType: "website",
    category: "Location Services Preview",
    absoluteTitle: true,
    noindex: true,
    nofollow: true,
  });
}

/** Metadata pulled straight from the source record, kept honest. */
export function metadataFromHub(hub: LocationHub): Metadata {
  return previewMetadata(
    `${hub.title} | Webamazee`,
    hub.metaDescription,
    `/new-${hub.slug}`,
    [`${hub.location} digital services`, `web design ${hub.location}`, `SEO ${hub.location}`]
  );
}

export function metadataFromPage(page: LocationPage): Metadata {
  return previewMetadata(
    page.metaTitle,
    page.metaDescription,
    `/new-${page.slug}`,
    [page.primaryKeyword, `${page.service} ${page.location}`]
  );
}

export function metadataFromCommercial(page: CommercialLocationPage): Metadata {
  return previewMetadata(
    `${page.primaryKeyword.replace(/^./, (c) => c.toUpperCase())} | Webamazee`,
    page.metaDescription,
    `/new-${page.slug}`,
    [page.primaryKeyword, `${page.location} marketing`]
  );
}

// ---------------------------------------------------------------------------
// Shared pieces
// ---------------------------------------------------------------------------

function PreviewNotice() {
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div
        className={`${CONTAINER} flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-[11.5px] leading-5 text-amber-900`}
      >
        <span className="rounded bg-amber-200/70 px-1.5 py-0.5 font-bold uppercase tracking-[.1em]">
          Preview
        </span>
        <span>
          Redesign preview for review. The live page at the original URL is
          unchanged and this page is not indexed.
        </span>
      </div>
    </div>
  );
}

function Breadcrumb({ c, label }: { c: PreviewContent; label: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
        <li>
          <Link href="/" className="rounded-sm hover:text-[#0f6dff]">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href={c.localLinks[0]?.href ?? "/services"} className="rounded-sm hover:text-[#0f6dff]">
            {c.location}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-[#0b1528]">
          {label}
        </li>
      </ol>
    </nav>
  );
}

function CtaBand({ c }: { c: PreviewContent }) {
  return (
    <section className="border-y border-[#1e3a63] bg-[#0b1528] py-14 text-white sm:py-16">
      <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end`}>
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
            A useful next step
          </p>
          <h2 className="mt-3 font-display text-[1.7rem] font-bold leading-tight tracking-[-.025em] sm:text-4xl">
            Tell us what you are trying to grow in {c.location}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            A short description of what is not working is enough to start. We
            will say plainly whether we are the right fit.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link href="/contact" className={PRIMARY}>
            Start a conversation
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <a
            href="tel:+918360532487"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
          >
            <Phone aria-hidden="true" className="h-4 w-4" />
            +91 83605 32487
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqBlock({ items }: { items: Faq[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-[#f5f8fd] py-14 sm:py-16">
      <div className={`${CONTAINER} grid gap-9 lg:grid-cols-[.72fr_1.28fr]`}>
        <div>
          <p className={EYEBROW}>Frequently asked questions</p>
          <h2 className={`${H2} mt-3`}>Questions, answered plainly</h2>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
          >
            Ask about your project
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-display text-base font-bold text-[#0b1528] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff] sm:text-lg">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-300 text-[#0f6dff] transition group-open:rotate-45 group-open:border-[#0f6dff]"
                >
                  <span className="text-xl font-normal leading-none">+</span>
                </span>
              </summary>
              <p className="max-w-3xl pr-10 pt-3 text-sm leading-7 text-slate-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectStrip({ projects }: { projects: PreviewContent["projects"] }) {
  if (!projects.length) return null;
  return (
    <section className="py-14 sm:py-16">
      <div className={CONTAINER}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className={EYEBROW}>Published work</p>
              <h2 className={`${H2} mt-3`}>
                Real projects, not illustrative results
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
            >
              All work
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <Reveal key={project.href} delay={i * 70}>
              <Link
                href={project.href}
                className="group block overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-[#0f6dff]/40"
              >
                <div className="relative aspect-[1.6]">
                  <Image
                    src={project.image}
                    alt={`${project.name} website built by Webamazee`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                </div>
                <div className="p-4">
                  <p className="font-display text-base font-bold">{project.name}</p>
                  <p className="mt-1 text-[13px] leading-6 text-slate-600">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedRail({ c }: { c: PreviewContent }) {
  const links = [...c.relatedServices, ...c.localLinks].slice(0, 8);
  if (!links.length) return null;
  return (
    <nav aria-label="Related pages" className="border-t border-slate-200 bg-white py-10">
      <div className={CONTAINER}>
        <p className={`${EYEBROW} mb-4`}>Related pages</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex h-full items-center justify-between gap-2 rounded-lg border border-slate-200 px-4 py-3 text-[13px] font-semibold text-[#0b1528] transition hover:border-[#0f6dff]/40 hover:bg-[#f6f9ff]"
              >
                {link.label}
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
  );
}

function NeedsGrid({ needs }: { needs: Item[] }) {
  if (!needs.length) return null;
  return (
    <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
      {needs.map((need, i) => (
        <Reveal key={need.title} delay={i * 60}>
          <article className="border-t-2 border-[#0f6dff] py-5">
            <h3 className="font-display text-lg font-bold">{need.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{need.desc}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function IndustryGrid({ industries }: { industries: PreviewContent["industries"] }) {
  if (!industries.length) return null;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {industries.slice(0, 6).map((industry, i) => {
        const inner = (
          <>
            <h3 className="font-display text-base font-bold">{industry.name}</h3>
            <p className="mt-1.5 text-[13px] leading-6 text-slate-600">
              {industry.desc}
            </p>
          </>
        );
        return (
          <Reveal key={industry.name} delay={i * 50}>
            {industry.href ? (
              <Link
                href={industry.href}
                className="group block h-full rounded-xl border border-slate-200 p-5 transition hover:border-[#0f6dff]/45 hover:bg-[#f7faff]"
              >
                {inner}
              </Link>
            ) : (
              <div className="h-full rounded-xl border border-slate-200 p-5">
                {inner}
              </div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

function ExplainerBlocks({ explainers }: { explainers: PreviewContent["explainers"] }) {
  if (!explainers.length) return null;
  return (
    <div className="space-y-8">
      {explainers.map((block) => (
        <Reveal key={block.heading}>
          <div className="border-l-2 border-[#0f6dff] pl-5">
            <h3 className="font-display text-xl font-bold">{block.heading}</h3>
            <div className="mt-2 space-y-2.5">
              {block.body.map((para, i) => (
                <p key={i} className="text-sm leading-7 text-slate-600">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant 1 — split hero, needs strip, explainers, FAQ
// ---------------------------------------------------------------------------

function VariantOne({ c }: { c: PreviewContent }) {
  return (
    <>
      <section className="overflow-hidden border-b border-slate-200 bg-[#f3f7fb]">
        <div className={`${CONTAINER} py-9 sm:py-12`}>
          <Breadcrumb c={c} label={c.serviceLabel} />
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
            <Reveal from="left">
              <div>
                <p className={EYEBROW}>
                  {c.serviceLabel} · {c.location}
                </p>
                <h1 className="mt-4 max-w-xl font-display text-[2.35rem] font-bold leading-[1.05] tracking-[-.04em] sm:text-[2.9rem] lg:text-[3.2rem]">
                  {c.h1}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-8 text-slate-600">
                  {c.heroText}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className={PRIMARY}>
                    Discuss your project
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link href="/portfolio" className={SECONDARY}>
                    View published work
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal from="right" delay={110}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-[#0f6dff]" />
                  <p className="text-[11px] font-bold uppercase tracking-[.14em] text-slate-500">
                    What shapes this work in {c.location}
                  </p>
                </div>
                <ul className="mt-4 space-y-3">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                      />
                      <span className="text-[13px] leading-6 text-slate-600">{h}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-slate-100 pt-3 text-[11.5px] leading-5 text-slate-500">
                  Webamazee works with businesses remotely through structured
                  collaboration. This is a service overview, not a claim of a
                  local office.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {c.intro.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[.7fr_1.3fr]`}>
            <Reveal>
              <div>
                <p className={EYEBROW}>The context</p>
                <h2 className={`${H2} mt-3`}>
                  What businesses here are actually dealing with
                </h2>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <div className="space-y-4">
                {c.intro.map((para, i) => (
                  <p key={i} className="text-sm leading-8 text-slate-600 sm:text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {c.needs.length > 0 && (
        <section className="border-y border-slate-200 bg-white py-14 sm:py-16">
          <div className={CONTAINER}>
            <Reveal>
              <div className="max-w-2xl">
                <p className={EYEBROW}>What this solves</p>
                <h2 className={`${H2} mt-3`}>Four problems worth naming</h2>
              </div>
            </Reveal>
            <div className="mt-8">
              <NeedsGrid needs={c.needs} />
            </div>
          </div>
        </section>
      )}

      {c.explainers.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className={`${CONTAINER} grid gap-9 lg:grid-cols-[.62fr_1.38fr]`}>
            <Reveal>
              <div>
                <p className={EYEBROW}>How the work is approached</p>
                <h2 className={`${H2} mt-3`}>In more detail</h2>
              </div>
            </Reveal>
            <ExplainerBlocks explainers={c.explainers} />
          </div>
        </section>
      )}

      <ProjectStrip projects={c.projects} />
      <FaqBlock items={c.faqs} />
      <CtaBand c={c} />
      <RelatedRail c={c} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Variant 2 — centred hero over a grid, sticky section rail, step timeline
// ---------------------------------------------------------------------------

function VariantTwo({ c }: { c: PreviewContent }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#f3f7fb]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(#dbe6f3_1px,transparent_1px),linear-gradient(90deg,#dbe6f3_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]"
        />
        <div className={`${CONTAINER} relative pb-14 pt-9 sm:pb-16`}>
          <Breadcrumb c={c} label={c.serviceLabel} />
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className={EYEBROW}>
                {c.serviceLabel} · {c.location}
              </p>
              <h1 className="mt-4 font-display text-[2.35rem] font-bold leading-[1.05] tracking-[-.04em] sm:text-[3rem] lg:text-[3.35rem]">
                {c.h1}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600">
                {c.heroText}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/contact" className={PRIMARY}>
                  Start a conversation
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className={SECONDARY}>
                  See pricing
                </Link>
              </div>
            </div>
          </Reveal>
          {c.highlights.length > 0 && (
            <Reveal delay={140}>
              <dl className="mx-auto mt-11 grid max-w-3xl gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
                {c.highlights.map((h) => (
                  <div key={h} className="bg-white px-4 py-3.5">
                    <dt className="sr-only">{c.location} focus</dt>
                    <dd className="text-[12.5px] font-semibold leading-6 text-[#0b1528]">
                      {h}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[.62fr_1.38fr]`}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div>
                <p className={EYEBROW}>On this page</p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight">
                  {c.serviceLabel} in {c.location}
                </h2>
                <ul className="mt-4 space-y-2 border-l border-slate-200 pl-4">
                  {[
                    c.intro.length ? "The context" : null,
                    c.needs.length ? "What it solves" : null,
                    c.steps.length ? "How it runs" : null,
                    c.industries.length ? "Who it suits" : null,
                    c.faqs.length ? "Questions" : null,
                  ]
                    .filter(Boolean)
                    .map((label) => (
                      <li key={label as string} className="text-[13px] text-slate-500">
                        {label}
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="space-y-12">
            {c.intro.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-2xl font-bold">The context</h2>
                  <div className="mt-3 space-y-3">
                    {c.intro.map((para, i) => (
                      <p key={i} className="text-sm leading-7 text-slate-600">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {c.needs.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-2xl font-bold">What it solves</h2>
                  <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                    {c.needs.map((need) => (
                      <div key={need.title} className="grid gap-1 py-4 sm:grid-cols-[.8fr_1.2fr] sm:gap-6">
                        <h3 className="font-display text-base font-bold">{need.title}</h3>
                        <p className="text-sm leading-6 text-slate-600">{need.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {c.steps.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-2xl font-bold">How it runs</h2>
                  <ol className="mt-4 space-y-4">
                    {c.steps.map((step, i) => (
                      <li key={step.title} className="relative border-l-2 border-[#0f6dff]/25 pl-5">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#0f6dff]"
                        />
                        <span className="font-mono text-[10.5px] font-bold text-[#0f6dff]">
                          {step.step || `STEP ${String(i + 1).padStart(2, "0")}`}
                        </span>
                        <h3 className="mt-1 font-display text-base font-bold">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {step.desc}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            )}

            {c.explainers.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-2xl font-bold">
                    How the work is approached
                  </h2>
                  <div className="mt-4">
                    <ExplainerBlocks explainers={c.explainers} />
                  </div>
                </div>
              </Reveal>
            )}

            {c.industries.length > 0 && (
              <Reveal>
                <div>
                  <h2 className="font-display text-2xl font-bold">Who it suits</h2>
                  <div className="mt-4">
                    <IndustryGrid industries={c.industries} />
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <ProjectStrip projects={c.projects} />
      <FaqBlock items={c.faqs} />
      <CtaBand c={c} />
      <RelatedRail c={c} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Variant 3 — dark editorial hero, numbered pillars, dark mid band
// ---------------------------------------------------------------------------

function VariantThree({ c }: { c: PreviewContent }) {
  return (
    <>
      <section className="border-b border-slate-800 bg-[#0f1320] text-white">
        <div className={`${CONTAINER} py-10 sm:py-12`}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="rounded-sm hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">
                {c.location} · {c.serviceLabel}
              </li>
            </ol>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal from="left">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
                  {c.serviceLabel} · {c.location}
                </p>
                <h1 className="mt-4 max-w-xl font-display text-[2.35rem] font-bold leading-[1.05] tracking-[-.04em] sm:text-[2.95rem] lg:text-[3.3rem]">
                  {c.h1}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                  {c.heroText}
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className={PRIMARY}>
                    Discuss your project
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/free-seo-audit"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
                  >
                    Free SEO audit
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal from="right" delay={110}>
              <div className="rounded-2xl border border-white/12 bg-white/[.04] p-5">
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#8bb9ff]">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  What we focus on
                </p>
                <ol className="mt-4 space-y-3">
                  {c.highlights.map((h, i) => (
                    <li key={h} className="flex items-start gap-3">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border border-white/15 font-mono text-[10px] text-slate-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] leading-6 text-slate-300">{h}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {c.intro.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className={`${CONTAINER} grid gap-9 lg:grid-cols-[.75fr_1.25fr]`}>
            <Reveal>
              <div>
                <p className={EYEBROW}>The situation</p>
                <h2 className={`${H2} mt-3`}>
                  What the market in {c.location} actually rewards
                </h2>
              </div>
            </Reveal>
            <div className="space-y-4">
              {c.intro.map((para, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="text-sm leading-8 text-slate-600 sm:text-[15px]">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.needs.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className={CONTAINER}>
            <Reveal>
              <div className="max-w-2xl">
                <p className={EYEBROW}>The work</p>
                <h2 className={`${H2} mt-3`}>Four things that have to be right</h2>
              </div>
            </Reveal>
            <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
              {c.needs.map((need, i) => (
                <Reveal key={need.title} delay={i * 60}>
                  <article className="grid gap-2 py-6 md:grid-cols-[auto_1fr_1.3fr] md:items-baseline md:gap-8">
                    <span className="font-mono text-xs font-bold text-[#0f6dff]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-bold">{need.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{need.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-slate-200 bg-[#0b1528] py-14 text-white sm:py-16">
        <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[.72fr_1.28fr]`}>
          <Reveal>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#8bb9ff]">
                Approach
              </p>
              <h2 className="mt-3 font-display text-[1.7rem] font-bold leading-tight tracking-[-.025em] sm:text-4xl">
                How the work is approached
              </h2>
            </div>
          </Reveal>
          <div className="space-y-6">
            {c.explainers.map((block, i) => (
              <Reveal key={block.heading} delay={i * 70}>
                <div className="border-l-2 border-[#8bb9ff]/40 pl-5">
                  <h3 className="font-display text-lg font-bold">{block.heading}</h3>
                  <div className="mt-2 space-y-2">
                    {block.body.map((para, j) => (
                      <p key={j} className="text-sm leading-7 text-slate-300">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
            {c.steps.length > 0 && (
              <Reveal>
                <ol className="mt-2 grid gap-3 sm:grid-cols-2">
                  {c.steps.map((step) => (
                    <li key={step.title} className="rounded-lg border border-white/10 bg-white/[.04] p-4">
                      <span className="font-mono text-[10px] font-bold text-[#8bb9ff]">
                        {step.step}
                      </span>
                      <h4 className="mt-1 font-display text-sm font-bold">{step.title}</h4>
                      <p className="mt-1 text-[12.5px] leading-5 text-slate-300">
                        {step.desc}
                      </p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {c.industries.length > 0 && (
        <section className="py-14 sm:py-16">
          <div className={CONTAINER}>
            <Reveal>
              <div className="max-w-2xl">
                <p className={EYEBROW}>Who it suits</p>
                <h2 className={`${H2} mt-3`}>Sectors this applies to</h2>
              </div>
            </Reveal>
            <div className="mt-7">
              <IndustryGrid industries={c.industries} />
            </div>
          </div>
        </section>
      )}

      <ProjectStrip projects={c.projects} />
      <FaqBlock items={c.faqs} />
      <CtaBand c={c} />
      <RelatedRail c={c} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export function LocationPreview({ content }: { content: PreviewContent }) {
  const variant = variantFor(content.slug);
  return (
    <main className="min-h-screen bg-white pt-16 text-[#0b1528] sm:pt-20">
      <PreviewNotice />
      {variant === 1 && <VariantOne c={content} />}
      {variant === 2 && <VariantTwo c={content} />}
      {variant === 3 && <VariantThree c={content} />}
    </main>
  );
}

// Re-export the data getters the generated route files need.
export { locationHubs, getLocationPage, getCommercialLocationPage };
