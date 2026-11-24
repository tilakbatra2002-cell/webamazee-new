import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Globe2,
  MapPin,
  MessageCircle,
  Phone,
  SearchCheck,
  Star,
  WalletCards,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CTABanner } from "@/components/layout/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqPanel } from "@/components/zirakpur-redesign/faq-panel";
import { Button } from "@/components/ui/button";
import { GsapReveal } from "@/components/zirakpur-redesign/gsap-reveal";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/lib/testimonials";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
import {
  breadcrumbs,
  faqs,
  industries,
  localRequirements,
  nearbyLinks,
  pageDescription,
  pagePath,
  pageTitle,
  pageUrl,
  pricingFactors,
  process,
  relatedServices,
  selectedProjects,
  websiteServices,
  whyChoose,
} from "./content";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "web designing company in Zirakpur",
    "web design company in Zirakpur",
    "website designing company in Zirakpur",
    "website design in Zirakpur",
    "web development company in Zirakpur",
    "website development company in Zirakpur",
    "WordPress development in Zirakpur",
    "ecommerce website development in Zirakpur",
  ],
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  category: "Web Design",
  openGraph: {
    title: `${pageTitle} | Webamazee`,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    siteName: site.name,
    images: [{ url: absoluteUrl(site.ogImage), width: 1200, height: 630, alt: `${pageTitle} | Webamazee` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | Webamazee`,
    description: pageDescription,
    images: [absoluteUrl(site.ogImage)],
  },
};

function schema() {
  return [
    breadcrumbSchema(breadcrumbs, pagePath),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#web-design-service`,
      name: pageTitle,
      serviceType: "Website design and development",
      description: pageDescription,
      url: pageUrl,
      provider: { "@id": `${site.url}/#organization` },
      areaServed: [
        { "@type": "Place", name: "Zirakpur" },
        { "@type": "Place", name: "Chandigarh" },
        { "@type": "Place", name: "Mohali" },
        { "@type": "Place", name: "Panchkula" },
      ],
      keywords: metadata.keywords?.toString(),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Website design and development services for Zirakpur businesses",
        itemListElement: websiteServices.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.desc,
            url: absoluteUrl(service.href),
          },
        })),
      },
    },
    faqSchema(faqs),
  ];
}

/* ------------------------------------------------------------------ system */

const SHELL = "mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-10";
const EYEBROW = "text-[11px] font-bold uppercase tracking-[.2em] text-brand-700";
const H2 = "font-display text-[1.75rem] font-bold leading-[1.12] tracking-[-.03em] text-ink sm:text-[2.1rem] lg:text-[2.35rem]";
const LEDE = "text-[14.5px] leading-[1.7] text-slate-600 sm:text-[15px]";

/**
 * Centered section header used by every band on the page.
 * Eyebrow sits above the title as a small pill, so headings share one axis
 * down the middle of the page instead of a left rail.
 */
function Head({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-[62rem] text-center" : "max-w-[62rem]"}>
      <span
        className={`inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500 ${
          centered ? "mx-auto" : ""
        }`}
      >
        {eyebrow}
      </span>
      <h2 className={`mt-4 ${H2} ${centered ? "mx-auto max-w-[24ch]" : "max-w-[24ch]"}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-4 ${LEDE} ${centered ? "mx-auto max-w-[62ch]" : "max-w-[62ch]"}`}>{subtitle}</p>
      )}
    </div>
  );
}

/** Real project cards, used in the hero and the work band. */
function ProjectCard({
  project,
  compact = false,
}: {
  project: (typeof selectedProjects)[number];
  compact?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-gsap-item
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-[0_22px_46px_-26px_rgba(15,109,255,.34)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={`${project.title} website project by Webamazee`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-brand-700 shadow-sm backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <span className="block text-[11px] font-medium text-slate-400">{project.country}</span>
        <h3
          className={`mt-1 font-display font-bold leading-snug text-ink transition group-hover:text-brand-700 ${
            compact ? "text-[15px]" : "text-[17px]"
          }`}
        >
          {project.title}
        </h3>
        {!compact && (
          <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-slate-500">{project.summary}</p>
        )}
        <p className="mt-3 flex-1 border-l-2 border-brand-600/25 pl-3 text-[12.5px] font-medium leading-[1.6] text-slate-700">
          {project.outcome}
        </p>
        <span className="mt-3.5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
          View project
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export default function ZirakpurWebDesignPage() {
  const why = whyChoose;
  const [heroProject] = selectedProjects;

  return (
    <>
      <JsonLd data={schema()} />

      {/* =========================================================== HERO */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-24 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(70% 60% at 88% 0%, rgba(15,109,255,.09), transparent 62%), radial-gradient(50% 50% at 0% 100%, rgba(30,136,255,.06), transparent 70%)",
          }}
        />
        <div className={`relative ${SHELL} pb-12 sm:pb-14`}>
          <Breadcrumb crumbs={breadcrumbs} />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-12">
            {/* copy */}
            <div>
              <span className={EYEBROW}>Website Design · Zirakpur</span>

              <h1 className="mt-3.5 font-display text-[2.1rem] font-bold leading-[1.05] tracking-[-.035em] text-ink sm:text-[2.75rem] lg:text-[3.1rem]">
                {pageTitle}
              </h1>

              <p className="mt-4 max-w-[52ch] text-[14.5px] leading-[1.72] text-slate-600 sm:text-[15px]">
                Webamazee designs and develops fast, modern and conversion-focused websites for businesses in Zirakpur and the Chandigarh Tricity. Whether you need a business website, WordPress build, e-commerce store or redesign, we plan the structure, mobile experience, content and contact paths around real enquiries — not decorative pages that look good but fail to help customers take action.
              </p>

              <div className="mt-7">
                <Button size="lg" href="/contact" withArrow>
                  Get a Free Website Consultation
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-600" />
                  {site.phone}
                </a>
                <a
                  href="https://wa.me/918360532487?text=Hi%20Webamazee%2C%20I%20want%20to%20discuss%20a%20website%20project%20for%20Zirakpur."
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-[12.5px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-brand-600" />
                  WhatsApp Webamazee
                </a>
              </div>
            </div>

            {/* hero visual: the actual lead project, presented as a browser window */}
            {heroProject && (
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
                  style={{ background: "radial-gradient(circle at 65% 30%, rgba(15,109,255,.20), transparent 70%)" }}
                />
                <figure
                  aria-hidden
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_32px_70px_-34px_rgba(11,21,40,.42)]"
                >
                  <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50/80 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span className="ml-2 h-5 flex-1 rounded bg-white ring-1 ring-slate-200" />
                  </div>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={heroProject.image}
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover object-top"
                    />
                  </div>
                </figure>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===================================================== ACTUAL WORK */}
      <section id="actual-work" className="scroll-mt-24 bg-white py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Actual Webamazee work"
            title="Website projects you can review before you hire"
            subtitle="A focused web design page should show real work, not only promises. These are existing Webamazee projects from the portfolio, linked to their detail pages for more context."
          />

          <GsapReveal className="mt-9 grid gap-5 md:grid-cols-3" stagger={0.08}>
            {selectedProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* ======================================================= SERVICES */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Website services"
            title="Website designing services in Zirakpur"
            subtitle="The primary focus of this page is website design and development. SEO and marketing can support the website later, but the core offer here is building a better digital presence."
          />

          {/* Two-column service grid — each item is a proper block, not a naked row */}
          <GsapReveal className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {websiteServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  data-gsap-item
                  className="group relative flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-600/35 hover:shadow-[0_20px_40px_-24px_rgba(15,109,255,.35)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-3.5 font-display text-[15.5px] font-bold leading-snug text-ink transition group-hover:text-brand-700">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-[1.65] text-slate-500">{service.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </GsapReveal>
        </div>
      </section>

      {/* ================================================== LOCAL / TRICITY */}
      <section className="bg-white py-12 sm:py-14">
        <div className={SHELL}>
          <div className="mx-auto max-w-[58rem] text-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">
                <MapPin className="h-3 w-3" /> Zirakpur &amp; Chandigarh Tricity
              </span>
              <h2 className={`mt-4 ${H2} mx-auto max-w-[26ch]`}>
                Web design for Zirakpur businesses that compete across the Tricity
              </h2>
              <div className="mx-auto mt-5 max-w-[64ch] space-y-3.5 text-[14.5px] leading-[1.78] text-slate-600">
                <p>
                  A business in Zirakpur may serve customers from Zirakpur, Chandigarh, Mohali and Panchkula on the same day. Someone comparing clinics, real estate consultants, showrooms, restaurants, travel services or professional firms will often check the website before calling.
                </p>
                <p>
                  For businesses around VIP Road, Patiala Road, Dhakoli and nearby commercial pockets, the website should make the offer clear quickly, work well on mobile and give people a simple way to call, WhatsApp, enquire or buy.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {nearbyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-[12px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            {/* requirement checklist, now a centered two-column band */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-[#f7f9fc] px-5 py-6 text-left sm:px-7">
              <GsapReveal className="grid gap-x-8 gap-y-0 sm:grid-cols-2" stagger={0.03}>
                {localRequirements.map((item) => (
                  <div key={item} data-gsap-item className="flex items-start gap-3 border-t border-slate-200/80 py-2.5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-600/10">
                      <Check className="h-2.5 w-2.5 text-brand-700" strokeWidth={3} />
                    </span>
                    <p className="text-[13px] leading-[1.6] text-slate-600">{item}</p>
                  </div>
                ))}
              </GsapReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== WHY WEBAMAZEE */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Why Webamazee"
            title="Why choose Webamazee for your Zirakpur website"
            subtitle="The strongest proof is useful planning, careful implementation and real work that can be reviewed. These are the capabilities Webamazee can bring to a Zirakpur website project."
          />

          {/* Numbered editorial grid: 2 columns with a rule per item, reads as a list of commitments */}
          <GsapReveal className="mt-9 grid gap-x-12 gap-y-0 sm:grid-cols-2" stagger={0.045}>
            {why.map((item, i) => (
              <div
                key={item.title}
                data-gsap-item
                className="group flex gap-4 border-t border-slate-200 py-5 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0"
              >
                <span className="font-display text-[13px] font-bold tabular-nums leading-[1.6] text-brand-600/40 transition group-hover:text-brand-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-3.5 w-3.5 text-brand-600" />
                    <h3 className="font-display text-[14.5px] font-bold text-ink">{item.title}</h3>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-[1.68] text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* ========================================================= PROCESS */}
      <section className="bg-white py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Process"
            title="A clear web design process from first call to launch"
            subtitle="A structured process keeps scope, content, reviews and launch checks visible, which is especially useful when collaboration happens remotely."
          />

          {/* Connected timeline: a rail with numbered nodes, not a card grid */}
          <div className="relative mt-10">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-brand-600/30 via-brand-600/15 to-transparent lg:block"
            />
            <GsapReveal className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-5" stagger={0.06}>
              {process.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} data-gsap-item className="relative">
                    <div className="flex items-center gap-3 lg:block">
                      <span className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_4px_14px_-6px_rgba(15,23,42,.18)]">
                        <Icon className="h-[18px] w-[18px] text-brand-600" />
                      </span>
                      <span className="font-display text-[11px] font-bold tabular-nums text-slate-300 lg:mt-2 lg:block">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="mt-2.5 font-display text-[14.5px] font-bold text-ink lg:mt-1">{step.title}</h3>
                    <p className="mt-1.5 max-w-[30ch] text-[12.5px] leading-[1.62] text-slate-500">{step.desc}</p>
                  </div>
                );
              })}
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ====================================================== INDUSTRIES */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Industries"
            title="Website design for different Zirakpur business types"
            subtitle="The same website structure does not fit every business. The content, calls to action and proof should match how your customers decide."
          />

          <GsapReveal className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.04}>
            {industries.map((industry) => (
              <div
                key={industry.name}
                data-gsap-item
                className="group rounded-lg border border-slate-200 bg-white p-4 transition hover:border-brand-600/30 hover:shadow-[0_12px_28px_-20px_rgba(15,109,255,.4)]"
              >
                <Globe2 className="h-4 w-4 text-brand-600/70 transition group-hover:text-brand-600" />
                <h3 className="mt-2 font-display text-[13.5px] font-bold text-ink">{industry.name}</h3>
                <p className="mt-1 text-[12.5px] leading-[1.6] text-slate-500">{industry.desc}</p>
              </div>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* ========================================================= PRICING */}
      <section className="bg-white py-12 sm:py-14">
        <div className={SHELL}>
          <div className="mx-auto max-w-[58rem] text-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">
                <WalletCards className="h-3 w-3" /> Project estimate
              </span>
              <h2 className={`mt-4 ${H2} mx-auto max-w-[24ch]`}>How website pricing is estimated</h2>
              <div className="mx-auto mt-5 max-w-[64ch] space-y-3.5 text-[14.5px] leading-[1.78] text-slate-600">
                <p>
                  Webamazee&apos;s pricing page lists website development starting points, including a Starter Website from ₹24,999 and an E-Commerce Website from ₹79,999. Those are useful references, but a Zirakpur project should still be scoped around the real work required.
                </p>
                <p>
                  Instead of forcing every business into the same package, we confirm the pages, features, content and integrations first, then provide a written estimate.
                </p>
              </div>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href="/contact" withArrow>
                  Request a Website Estimate
                </Button>
                <Button href="/pricing#website-development" variant="secondary">
                  View Pricing Page
                </Button>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-[#f7f9fc] px-5 py-6 text-left sm:px-7">
              <GsapReveal className="grid gap-x-8 gap-y-0 sm:grid-cols-2" stagger={0.03}>
                {pricingFactors.map((factor) => (
                  <div key={factor} data-gsap-item className="flex items-start gap-3 border-t border-slate-200/80 py-2.5 first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
                    <SearchCheck className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand-600" />
                    <p className="text-[13px] leading-[1.6] text-slate-600">{factor}</p>
                  </div>
                ))}
              </GsapReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
          <div className={SHELL}>
            <Head
              eyebrow="Trust"
              title="Client feedback already published by Webamazee"
              subtitle="These quotes come from Webamazee's existing testimonial data, while the portfolio section above provides project proof you can review in more detail."
            />

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {testimonials.slice(0, 3).map((review, i) => (
                <figure
                  key={review.name}
                  className={`flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 ${
                    i === 0 ? "md:-mt-1 md:shadow-[0_18px_40px_-26px_rgba(11,21,40,.3)]" : ""
                  }`}
                >
                  <div className="flex gap-1 text-amber-400" aria-label={`${review.rating} star review`}>
                    {Array.from({ length: review.rating }).map((_, k) => (
                      <Star key={k} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-slate-600">
                    “{review.quote}”
                  </blockquote>
                  <figcaption className="mt-4 border-t border-slate-200 pt-3.5">
                    <p className="font-display text-[13px] font-bold text-ink">{review.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-500">{review.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700 hover:underline"
              >
                View review source <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================= FAQ */}
      <section className="relative overflow-hidden bg-[#f7f9fc] py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(55% 45% at 50% 0%, rgba(15,109,255,.10), transparent 70%)",
          }}
        />
        <div className={`relative ${SHELL}`}>
          <Head
            eyebrow="FAQ"
            title="Questions about website design in Zirakpur"
            subtitle="Practical answers for business owners comparing website design and development companies."
          />

          <div className="mx-auto mt-10 max-w-[52rem]">
            <FaqPanel items={faqs} defaultOpen={0} />
          </div>
        </div>
      </section>

      {/* ============================================ SUPPORTING SERVICES */}
      <section className="border-y border-slate-200 bg-[#f7f9fc] py-12 sm:py-14">
        <div className={SHELL}>
          <Head
            eyebrow="Supporting services"
            title="Related services that can support your website"
            subtitle="These links are here for context. The core intent of this page remains website design and website development for Zirakpur businesses."
          />

          <GsapReveal className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.03}>
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                data-gsap-item
                className="group flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-brand-600/35 hover:shadow-[0_12px_26px_-20px_rgba(15,109,255,.45)]"
              >
                <span className="font-display text-[13px] font-bold text-ink transition group-hover:text-brand-700">
                  {service.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </GsapReveal>
        </div>
      </section>

      <CTABanner
        title="Planning a new website or redesign for your Zirakpur business?"
        subtitle="Share your services, target customers and website goals. Webamazee will recommend a practical structure, scope and next step without promising rankings that depend on external signals."
        cta="Get a Free Website Consultation"
      />
    </>
  );
}
