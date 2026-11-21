"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Globe,
  Mail,
  MessageSquare,
} from "lucide-react";
import { site } from "@/lib/site";

export const CALENDLY_URL = "https://calendly.com/webamazee0411/30min";
export const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
export const EYEBROW =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
export const SECTION_H2 =
  "font-display text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#0b1528] sm:text-[2.375rem] lg:text-[2.625rem]";
export const PRIMARY_BTN =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0f6dff] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_10px_28px_-10px_rgba(15,109,255,0.6)] transition-all duration-200 hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
export const SECONDARY_BTN =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-[14px] font-semibold text-[#0b1528] transition-all duration-200 hover:border-[#0f6dff]/50 hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

export type UsaServiceSlug =
  | "services-in-usa"
  | "web-designing-company-united-states"
  | "seo-services-united-states"
  | "digital-marketing-company-usa"
  | "ai-marketing-company-usa";

export const USA_PREVIEW_NAV = {
  hub: {
    slug: "services-in-usa" as UsaServiceSlug,
    label: "USA Services Hub",
    previewHref: "/new-services-in-usa",
    liveHref: "/services-in-usa",
    summary:
      "Compare web design, SEO, digital marketing, and AI marketing options for US teams.",
  },
  web: {
    slug: "web-designing-company-united-states" as UsaServiceSlug,
    label: "Web Design & Development",
    shortLabel: "Web Design",
    previewHref: "/new-web-designing-company-united-states",
    liveHref: "/web-designing-company-united-states",
    summary:
      "Fast business websites, landing pages, e-commerce stores, and SEO-safe redesigns.",
  },
  seo: {
    slug: "seo-services-united-states" as UsaServiceSlug,
    label: "SEO Services",
    shortLabel: "SEO Services",
    previewHref: "/new-seo-services-united-states",
    liveHref: "/seo-services-united-states",
    summary:
      "White-hat technical SEO, on-page structure, local relevance, and search authority.",
  },
  digital: {
    slug: "digital-marketing-company-usa" as UsaServiceSlug,
    label: "Digital Marketing",
    shortLabel: "Digital Marketing",
    previewHref: "/new-digital-marketing-company-usa",
    liveHref: "/digital-marketing-company-usa",
    summary:
      "Connected SEO, landing-page UX, content, social channels, and measurable analytics.",
  },
  ai: {
    slug: "ai-marketing-company-usa" as UsaServiceSlug,
    label: "AI Marketing",
    shortLabel: "AI Marketing",
    previewHref: "/new-ai-marketing-company-usa",
    liveHref: "/ai-marketing-company-usa",
    summary:
      "Human-led AI research, search intent optimization, and editorial QA workflows.",
  },
};

export const USA_INDUSTRIES = [
  {
    name: "SaaS & Technology",
    tag: "Software · Cloud · B2B Platforms",
    desc: "Product, feature, and comparison journeys designed for multi-stakeholder US software buyers.",
    href: "/seo-for-saas",
  },
  {
    name: "E-Commerce",
    tag: "Direct-to-Consumer · Online Retail",
    desc: "Scalable category discovery, fast product pages, and clean checkout paths built for US shoppers.",
    href: "/seo-for-ecommerce",
  },
  {
    name: "Professional Services",
    tag: "Consulting · Legal · Advisory",
    desc: "Authority-driven websites and organic visibility tailored to specialized B2B and advisory firms.",
    href: "/seo-for-professional-services",
  },
  {
    name: "Healthcare",
    tag: "Clinics · Practices · Providers",
    desc: "Accessible, clear service architecture that helps patients verify care options and book appointments.",
    href: "/seo-for-healthcare",
  },
  {
    name: "Travel & Tourism",
    tag: "Operators · Hospitality · Destinations",
    desc: "Destination discovery and package pages structured to convert travel research into inquiries.",
    href: "/seo-for-tourism",
  },
  {
    name: "Local Businesses",
    tag: "Regional & Single-State Operations",
    desc: "Service-area architecture reflecting genuine US locations without repetitive doorway pages.",
    href: "/seo-for-local-business",
  },
];

export const USA_CASE_STUDIES = [
  {
    name: "Wellington Tours",
    country: "New Zealand",
    year: "2025",
    category: "Website Development",
    workHref: "/work/wellington-tours",
    caseStudyHref: "/case-studies/wellingtontours",
    image: "/images/portfolio/wellington-tours-live-homepage.webp",
    imageAlt: "Wellington Tours live New Zealand website homepage",
    summary:
      "A New Zealand travel platform organized around side-by-side package comparisons and direct booking inquiries.",
    points: ["Clear package hierarchy", "Conversion-ready inquiry flow"],
  },
  {
    name: "Kabir Oil Mill",
    country: "India",
    year: "2025",
    category: "E-Commerce Development",
    workHref: "/work/kabir-oil-mill",
    caseStudyHref: "/case-studies/kabiroilmill",
    image: "/images/portfolio/kabir-oil-mill-live-homepage.webp",
    imageAlt: "Kabir Oil Mill live e-commerce website homepage",
    summary:
      "A full online storefront connecting structured product catalogs, detail pages, cart flows, and checkout.",
    points: ["Structured product catalog", "Streamlined cart & checkout UX"],
  },
  {
    name: "Shine Gold Tours India",
    country: "India",
    year: "2025",
    category: "Website Redesign",
    workHref: "/work/shine-gold-tours-india",
    caseStudyHref: "/case-studies/shinegoldtours",
    image: "/images/portfolio/shine-gold-tours-india-live-homepage.webp",
    imageAlt: "Shine Gold Tours India redesigned website homepage",
    summary:
      "A full UI and UX modernization focused on cleaner destination discovery, visual hierarchy, and mobile leads.",
    points: ["Modernized page layout", "Mobile-friendly lead paths"],
  },
];

export function UsaBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
        <li>
          <Link href="/" className="transition-colors hover:text-[#0f6dff]">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/services" className="transition-colors hover:text-[#0f6dff]">
            Services
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link
            href="/new-services-in-usa"
            className="transition-colors hover:text-[#0f6dff]"
          >
            USA Hub
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-semibold text-[#0b1528]">
          {current}
        </li>
      </ol>
    </nav>
  );
}

export function UsaIndustriesBand({
  eyebrow = "Industries We Serve",
  title = "Tailored digital architecture for how US buyers evaluate options",
  subtitle = "From competitive B2B SaaS and professional firms to online retail, each US industry demands a distinct conversion flow and search taxonomy.",
  variant = "white",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  variant?: "white" | "mist";
}) {
  return (
    <section
      className={
        variant === "mist"
          ? "border-y border-slate-200/80 bg-[#f4f8ff] py-16 sm:py-20"
          : "bg-white py-16 sm:py-20"
      }
    >
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className={EYEBROW}>{eyebrow}</p>
            <h2 className={`${SECTION_H2} mt-2.5`}>{title}</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
              {subtitle}
            </p>
          </div>
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
          >
            Explore all industries
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USA_INDUSTRIES.map((ind) => (
            <Link
              key={ind.href}
              href={ind.href}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-[#0f6dff]/40 hover:shadow-[0_14px_34px_-22px_rgba(11,21,40,0.22)] sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#0f6dff]">
                    {ind.tag}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0f6dff]"
                  />
                </div>
                <h3 className="mt-2.5 font-display text-lg font-bold text-[#0b1528] transition-colors group-hover:text-[#0f6dff]">
                  {ind.name}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-slate-600">
                  {ind.desc}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f6dff]">
                View sector strategy
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UsaCaseStudiesBand({
  eyebrow = "Selected Work · International Portfolio",
  title = "Verified projects showing our engineering, UX, and conversion standards",
  intro = "These published projects come from Webamazee client engagements in New Zealand and India. We present them transparently as international portfolio proof rather than US client claims.",
  variant = "slate",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  variant?: "white" | "slate";
}) {
  return (
    <section
      className={
        variant === "slate"
          ? "border-y border-slate-200/80 bg-[#f8fafc] py-16 sm:py-20"
          : "bg-white py-16 sm:py-20"
      }
    >
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className={EYEBROW}>{eyebrow}</p>
            <h2 className={`${SECTION_H2} mt-2.5`}>{title}</h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-slate-600">
              {intro}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/portfolio"
              className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
            >
              View portfolio
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
            >
              All case studies
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {USA_CASE_STUDIES.map((project) => (
            <article
              key={project.workHref}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-200 hover:border-[#0f6dff]/40 hover:shadow-[0_18px_40px_-24px_rgba(11,21,40,0.2)]"
            >
              <Link
                href={project.workHref}
                className="relative block aspect-[16/10] w-full overflow-hidden border-b border-slate-200/80 bg-slate-100"
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-semibold">
                    <span className="rounded-full bg-[#f4f8ff] px-2.5 py-1 text-[#0f6dff]">
                      {project.country} · {project.year}
                    </span>
                    <span className="text-slate-500">{project.category}</span>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-[#0b1528]">
                    <Link
                      href={project.workHref}
                      className="transition-colors hover:text-[#0f6dff]"
                    >
                      {project.name}
                    </Link>
                  </h3>

                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate-600">
                    {project.summary}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5">
                    {project.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 text-[12.5px] font-medium text-slate-600"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0f6dff]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <Link
                    href={project.workHref}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
                  >
                    Explore Project
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href={project.caseStudyHref}
                    className="text-[12.5px] font-medium text-slate-500 transition-colors hover:text-[#0b1528]"
                  >
                    Full case study
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UsaFaqBand({
  faqs,
  title,
  subtitle,
  idPrefix,
  variant = "white",
}: {
  faqs: { q: string; a: string }[];
  title: string;
  subtitle: string;
  idPrefix: string;
  variant?: "white" | "slate";
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      className={
        variant === "slate" ? "bg-[#f8fafc] py-16 sm:py-20" : "bg-white py-16 sm:py-20"
      }
    >
      <div className={CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className={EYEBROW}>Frequently Asked Questions</p>
            <h2 className="mt-2.5 font-display text-[1.875rem] font-bold leading-[1.15] tracking-[-0.025em] text-[#0b1528] sm:text-[2.25rem]">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-slate-600">
              {subtitle}
            </p>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[13.5px] font-semibold text-[#0b1528]">
                Have a specific US scope or URL to review?
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                Share your goals and current site for direct, realistic feedback.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
              >
                Start a conversation
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                const buttonId = `${idPrefix}-btn-${index}`;
                const panelId = `${idPrefix}-panel-${index}`;
                return (
                  <div key={faq.q}>
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() =>
                          setOpenFaq((prev) => (prev === index ? null : index))
                        }
                        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0f6dff]"
                      >
                        <span className="font-display text-[16px] font-bold leading-snug text-[#0b1528] sm:text-[17px]">
                          {faq.q}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-5 w-5 shrink-0 text-[#0f6dff] transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      hidden={!isOpen}
                      className="pb-5 pr-6"
                    >
                      <p className="text-[14.5px] leading-[1.72] text-slate-600">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UsaSiblingServicesBand({
  currentSlug,
  globalServices,
}: {
  currentSlug: UsaServiceSlug;
  globalServices: { label: string; href: string }[];
}) {
  const siblings = [
    USA_PREVIEW_NAV.web,
    USA_PREVIEW_NAV.seo,
    USA_PREVIEW_NAV.digital,
    USA_PREVIEW_NAV.ai,
  ].filter((item) => item.slug !== currentSlug);

  return (
    <section className="border-t border-slate-200/80 bg-[#f8fafc] py-14 sm:py-16">
      <div className={CONTAINER}>
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200/90 pb-6 sm:flex-row sm:items-end">
          <div>
            <p className={EYEBROW}>Connected USA Services</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-[#0b1528]">
              Explore related US capabilities &amp; core global services
            </h2>
          </div>
          <Link
            href="/new-services-in-usa"
            className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#0f6dff] transition-colors hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white"
          >
            <Globe aria-hidden="true" className="h-3.5 w-3.5" />
            All USA Services Hub
          </Link>
        </div>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {siblings.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:border-[#0f6dff]/40 hover:shadow-[0_12px_30px_-20px_rgba(11,21,40,0.2)]"
            >
              <div>
                <h3 className="font-display text-lg font-bold text-[#0b1528]">
                  <Link
                    href={item.previewHref}
                    className="transition-colors hover:text-[#0f6dff]"
                  >
                    {item.label} in the USA
                  </Link>
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">
                  {item.summary}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3.5">
                <Link
                  href={item.previewHref}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f6dff] hover:text-[#0b57d0]"
                >
                  Explore {item.shortLabel}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href={item.liveHref}
                  className="text-[12px] font-medium text-slate-400 transition-colors hover:text-slate-700"
                >
                  Live page
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            Related global services:
          </span>
          {globalServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slate-600 transition-colors hover:border-[#0f6dff]/40 hover:text-[#0f6dff]"
            >
              {service.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function UsaConsultationBanner({
  eyebrow,
  title,
  subtitle,
  primaryLabel = "Book a Free Consultation",
  primaryHref = CALENDLY_URL,
  primaryExternal = true,
  secondaryLabel = "Send Project Brief",
  secondaryHref = "/contact",
  bullets,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryLabel?: string;
  primaryHref?: string;
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
  bullets: string[];
}) {
  return (
    <section className="bg-white pb-20 pt-8 sm:pb-24">
      <div className={CONTAINER}>
        <div className="relative overflow-hidden rounded-3xl bg-[#0b1528] px-6 py-12 text-white shadow-[0_30px_70px_-30px_rgba(11,21,40,0.65)] sm:px-12 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(96,165,250,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.16) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#60a5fa]">
                {eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-[1.9rem] font-bold leading-[1.12] tracking-[-0.025em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
                {title}
              </h2>
              <p className="mt-4 max-w-2xl text-[15.5px] leading-[1.7] text-slate-300">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {primaryExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#0f6dff] px-7 py-3 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(15,109,255,0.75)] transition-all duration-200 hover:bg-[#1f7bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    {primaryLabel}
                  </a>
                ) : (
                  <Link
                    href={primaryHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#0f6dff] px-7 py-3 text-[14.5px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(15,109,255,0.75)] transition-all duration-200 hover:bg-[#1f7bff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {primaryLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
                {secondaryHref.startsWith("http") ? (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-[14.5px] font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <CalendarDays aria-hidden="true" className="h-4 w-4" />
                    {secondaryLabel}
                  </a>
                ) : (
                  <Link
                    href={secondaryHref}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-[14.5px] font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <MessageSquare aria-hidden="true" className="h-4 w-4" />
                    {secondaryLabel}
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7bb2ff]">
                  What To Expect
                </p>
                <ul className="mt-4 space-y-3 text-[13.5px] text-slate-200">
                  {bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-300 transition-colors hover:text-white"
                  >
                    <Mail aria-hidden="true" className="h-3.5 w-3.5 text-[#60a5fa]" />
                    {site.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
