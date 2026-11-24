import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Globe2,
  HelpCircle,
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
import { Accordion } from "@/components/ui/accordion";
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

/* ---------------------------------------------------------------- tokens */

const SHELL = "mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-10";
const EYEBROW = "text-[11px] font-bold uppercase tracking-[.2em] text-brand-700";
const H2 = "font-display text-[1.85rem] font-bold leading-[1.1] tracking-[-.03em] text-ink sm:text-[2.3rem] lg:text-[2.55rem]";
const LEDE = "text-[15px] leading-[1.7] text-slate-600 sm:text-[16px]";

/** Section label that sits left of the heading — the page's spine. */
function SectionHead({
  eyebrow,
  title,
  subtitle,
  width = "max-w-[62ch]",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  width?: string;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-[132px_minmax(0,1fr)] lg:gap-10">
      <div className="pt-1">
        <span className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">
          {eyebrow}
        </span>
      </div>
      <div className={width}>
        <h2 className={H2}>{title}</h2>
        {subtitle && <p className={`mt-4 ${LEDE}`}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ZirakpurWebDesignPage() {
  return (
    <>
      <JsonLd data={schema()} />

      {/* ============================== HERO ============================== */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-[#f7faff] pt-24 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 84% 6%, rgba(15,109,255,.10), transparent 46%), radial-gradient(circle at 4% 74%, rgba(30,136,255,.07), transparent 44%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,23,42,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,.045) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(60% 55% at 50% 0%, black, transparent)",
            WebkitMaskImage: "radial-gradient(60% 55% at 50% 0%, black, transparent)",
          }}
        />

        <div className={`relative ${SHELL} pb-12 pt-0 sm:pb-16`}>
          <div className="[&_nav]:justify-start [&_ol]:text-[12.5px]">
            <Breadcrumb crumbs={breadcrumbs} />
          </div>

          <div className="mt-9 grid items-start gap-10 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,.94fr)] lg:gap-14">
            <div>
              <span className={`${EYEBROW} inline-block`}>Website Design · Zirakpur</span>

              <h1 className="mt-4 font-display text-[2.15rem] font-bold leading-[1.04] tracking-[-.035em] text-ink sm:text-[2.9rem] lg:text-[3.35rem]">
                {pageTitle}
              </h1>

              <p className="mt-5 max-w-[54ch] text-[15px] leading-[1.75] text-slate-600 sm:text-[15.5px]">
                Webamazee designs and develops fast, modern and conversion-focused websites for businesses in Zirakpur and the Chandigarh Tricity. Whether you need a business website, WordPress build, e-commerce store or redesign, we plan the structure, mobile experience, content and contact paths around real enquiries — not decorative pages that look good but fail to help customers take action.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" href="/contact" withArrow>
                  Get a Free Website Consultation
                </Button>
                <Button size="lg" variant="secondary" href="#actual-work">
                  View Our Work
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${site.phoneIntl}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,.04)] transition hover:border-brand-600/40 hover:text-brand-700"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-600" />
                  {site.phone}
                </a>
                <a
                  href="https://wa.me/918360532487?text=Hi%20Webamazee%2C%20I%20want%20to%20discuss%20a%20website%20project%20for%20Zirakpur."
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,.04)] transition hover:border-brand-600/40 hover:text-brand-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-brand-600" />
                  WhatsApp Webamazee
                </a>
              </div>
            </div>

            {/* Decorative only — carries no text and no imagery, so the
                content surface stays exactly as the original page had it. */}
            <div aria-hidden className="relative hidden lg:block">
              <div className="relative rounded-2xl border border-slate-200/80 bg-white/70 p-3 shadow-[0_24px_60px_-34px_rgba(11,21,40,.28)] backdrop-blur-sm">
                <div className="flex items-center gap-1.5 border-b border-slate-200/80 px-2 pb-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span className="ml-1.5 h-1.5 flex-1 rounded-full bg-slate-200/80" />
                </div>
                <div className="space-y-2.5 p-2 pt-3">
                  <div className="h-20 rounded-lg bg-gradient-to-br from-brand-100 via-brand-50 to-white" />
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="h-14 rounded-lg bg-slate-100" />
                    <div className="h-14 rounded-lg bg-slate-100" />
                    <div className="h-14 rounded-lg bg-slate-100" />
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-2 w-4/5 rounded-full bg-slate-200" />
                    <div className="h-2 w-3/5 rounded-full bg-slate-200/80" />
                    <div className="h-2 w-2/5 rounded-full bg-slate-200/60" />
                  </div>
                  <div className="flex gap-2 pt-1.5">
                    <div className="h-7 w-24 rounded-md bg-brand-600/90" />
                    <div className="h-7 w-20 rounded-md border border-slate-200 bg-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-6 h-24 w-24 rounded-2xl border border-brand-200/60 bg-white/80 shadow-[0_16px_36px_-20px_rgba(15,109,255,.4)] backdrop-blur">
                <div className="grid h-full w-full grid-cols-2 gap-1.5 p-3">
                  <span className="rounded bg-brand-100" />
                  <span className="rounded bg-slate-100" />
                  <span className="rounded bg-slate-100" />
                  <span className="rounded bg-brand-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ ACTUAL WORK ========================= */}
      <section id="actual-work" className="scroll-mt-24 bg-white py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Actual Webamazee work"
            title="Website projects you can review before you hire"
            subtitle="A focused web design page should show real work, not only promises. These are existing Webamazee projects from the portfolio, linked to their detail pages for more context."
          />

          <GsapReveal className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.08}>
            {selectedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-gsap-item
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-600/30 hover:shadow-[0_24px_50px_-28px_rgba(15,109,255,.35)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={`${project.title} website project by Webamazee`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[.1em] text-brand-700 shadow-sm backdrop-blur">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                    <span className="font-medium text-slate-400">{project.country}</span>
                  </div>
                  <h3 className="mt-2 font-display text-[17px] font-bold leading-snug text-ink transition group-hover:text-brand-700">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.65] text-slate-500">{project.summary}</p>
                  <p className="mt-4 border-l-2 border-brand-600/25 pl-3 text-[12.5px] font-medium leading-[1.6] text-slate-700">
                    {project.outcome}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
                    View project
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* =========================== SERVICES ============================ */}
      <section className="border-y border-slate-200/70 bg-[#f8fafc] py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Website services"
            title="Website designing services in Zirakpur"
            subtitle="The primary focus of this page is website design and development. SEO and marketing can support the website later, but the core offer here is building a better digital presence."
          />

          {/* Numbered editorial rows — not a card grid */}
          <GsapReveal className="mt-10 border-t border-slate-200" stagger={0.05}>
            {websiteServices.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.name}
                  href={service.href}
                  data-gsap-item
                  className="group grid items-start gap-3 border-b border-slate-200 py-5 transition-colors hover:bg-white sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:px-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[16.5px] font-bold text-ink transition group-hover:text-brand-700">
                      {service.name}
                    </h3>
                    <p className="mt-1 max-w-[72ch] text-[13.5px] leading-[1.65] text-slate-500">{service.desc}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 sm:justify-self-end">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </GsapReveal>
        </div>
      </section>

      {/* ======================= LOCAL / TRICITY ========================= */}
      <section className="bg-white py-10">
        <div className={SHELL}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-brand-700">
                <MapPin className="h-3.5 w-3.5" /> Zirakpur &amp; Chandigarh Tricity
              </span>
              <h2 className={`mt-5 ${H2}`}>
                Web design for Zirakpur businesses that compete across the Tricity
              </h2>
              <div className="mt-6 space-y-4 border-l-2 border-slate-200 pl-5 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  A business in Zirakpur may serve customers from Zirakpur, Chandigarh, Mohali and Panchkula on the same day. Someone comparing clinics, real estate consultants, showrooms, restaurants, travel services or professional firms will often check the website before calling.
                </p>
                <p>
                  For businesses around VIP Road, Patiala Road, Dhakoli and nearby commercial pockets, the website should make the offer clear quickly, work well on mobile and give people a simple way to call, WhatsApp, enquire or buy.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {nearbyLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[12.5px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>

            <GsapReveal className="divide-y divide-slate-200 border-t border-slate-200" stagger={0.04}>
              {localRequirements.map((item) => (
                <div key={item} data-gsap-item className="flex items-start gap-3 py-3">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand-600" />
                  <p className="text-[13.5px] leading-[1.65] text-slate-600">{item}</p>
                </div>
              ))}
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ========================== WHY WEBAMAZEE ======================== */}
      <section className="border-y border-slate-200/70 bg-[#f8fafc] py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Why Webamazee"
            title="Why choose Webamazee for your Zirakpur website"
            subtitle="The strongest proof is useful planning, careful implementation and real work that can be reviewed. These are the capabilities Webamazee can bring to a Zirakpur website project."
          />

          <GsapReveal className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {whyChoose.map((item) => (
              <div key={item.title} data-gsap-item className="group">
                <BadgeCheck className="h-[18px] w-[18px] text-brand-600" />
                <h3 className="mt-2.5 font-display text-[15px] font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-[1.7] text-slate-500">{item.desc}</p>
              </div>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* ============================= PROCESS =========================== */}
      <section className="bg-white py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Process"
            title="A clear web design process from first call to launch"
            subtitle="A structured process keeps scope, content, reviews and launch checks visible, which is especially useful when collaboration happens remotely."
          />

          {/* Horizontal rail: number on a spine, content beside it */}
          <GsapReveal className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {process.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} data-gsap-item className="group relative border-t-2 border-slate-200 pt-5 transition-colors hover:border-brand-600">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[22px] font-bold leading-none tracking-tight text-slate-300 transition group-hover:text-brand-600">
                      {step.step}
                    </span>
                    <Icon className="h-4 w-4 text-brand-600" />
                  </div>
                  <h3 className="mt-3 font-display text-[16px] font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-[1.7] text-slate-500">{step.desc}</p>
                </div>
              );
            })}
          </GsapReveal>
        </div>
      </section>

      {/* ============================ INDUSTRIES ========================= */}
      <section className="border-y border-slate-200/70 bg-[#f8fafc] py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Industries"
            title="Website design for different Zirakpur business types"
            subtitle="The same website structure does not fit every business. The content, calls to action and proof should match how your customers decide."
          />

          <GsapReveal className="mt-10 grid gap-x-10 sm:grid-cols-2" stagger={0.04}>
            {industries.map((industry) => (
              <div
                key={industry.name}
                data-gsap-item
                className="flex items-start gap-3.5 border-b border-slate-200 py-4"
              >
                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <div>
                  <h3 className="font-display text-[14.5px] font-bold text-ink">{industry.name}</h3>
                  <p className="mt-1 text-[13px] leading-[1.65] text-slate-500">{industry.desc}</p>
                </div>
              </div>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* ============================= PRICING =========================== */}
      <section className="bg-white py-10">
        <div className={SHELL}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.14em] text-brand-700">
                <WalletCards className="h-3.5 w-3.5" /> Project estimate
              </span>
              <h2 className={`mt-5 ${H2}`}>How website pricing is estimated</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-slate-600">
                <p>
                  Webamazee&apos;s pricing page lists website development starting points, including a Starter Website from ₹24,999 and an E-Commerce Website from ₹79,999. Those are useful references, but a Zirakpur project should still be scoped around the real work required.
                </p>
                <p>
                  Instead of forcing every business into the same package, we confirm the pages, features, content and integrations first, then provide a written estimate.
                </p>
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" withArrow>
                  Request a Website Estimate
                </Button>
                <Button href="/pricing#website-development" variant="secondary">
                  View Pricing Page
                </Button>
              </div>
            </div>

            <GsapReveal className="divide-y divide-slate-200 border-t border-slate-200" stagger={0.035}>
              {pricingFactors.map((factor) => (
                <div key={factor} data-gsap-item className="flex items-start gap-3 py-3">
                  <SearchCheck className="mt-[3px] h-4 w-4 shrink-0 text-brand-600" />
                  <p className="text-[13.5px] leading-[1.65] text-slate-600">{factor}</p>
                </div>
              ))}
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ============================ TESTIMONIALS ======================= */}
      {testimonials.length > 0 && (
        <section className="border-y border-slate-200/70 bg-[#f8fafc] py-10">
          <div className={SHELL}>
            <SectionHead
              eyebrow="Trust"
              title="Client feedback already published by Webamazee"
              subtitle="These quotes come from Webamazee's existing testimonial data, while the portfolio section above provides project proof you can review in more detail."
            />

            <GsapReveal className="mt-10 grid gap-6 md:grid-cols-3" stagger={0.07}>
              {testimonials.slice(0, 3).map((review) => (
                <figure
                  key={review.name}
                  data-gsap-item
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex gap-1 text-amber-400" aria-label={`${review.rating} star review`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-[13.5px] leading-[1.7] text-slate-600">“{review.quote}”</blockquote>
                  <figcaption className="mt-4 border-t border-slate-200 pt-3.5">
                    <p className="font-display text-[13px] font-bold text-ink">{review.name}</p>
                    <p className="mt-0.5 text-[11.5px] text-slate-500">{review.role}</p>
                  </figcaption>
                </figure>
              ))}
            </GsapReveal>

            <div className="mt-7">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 hover:underline"
              >
                View review source <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* =============================== FAQ ============================= */}
      <section className="bg-white py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="FAQ"
            title="Questions about website design in Zirakpur"
            subtitle="Practical answers for business owners comparing website design and development companies."
            width="max-w-[70ch]"
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[132px_minmax(0,1fr)] lg:gap-10">
            <div className="max-w-3xl">
              <Accordion items={faqs} defaultOpen={0} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SUPPORTING SERVICES ===================== */}
      <section className="border-y border-slate-200/70 bg-[#f8fafc] py-10">
        <div className={SHELL}>
          <SectionHead
            eyebrow="Supporting services"
            title="Related services that can support your website"
            subtitle="These links are here for context. The core intent of this page remains website design and website development for Zirakpur businesses."
          />

          <GsapReveal className="mt-10 grid gap-x-10 border-t border-slate-200 sm:grid-cols-2" stagger={0.03}>
            {relatedServices.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                data-gsap-item
                className="group flex items-center justify-between gap-4 border-b border-slate-200 py-3.5"
              >
                <span className="font-display text-[14px] font-bold text-ink transition group-hover:text-brand-700">
                  {service.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </GsapReveal>
        </div>
      </section>

      {/* =========================== QUICK CONTACT ======================= */}
      <section className="bg-white py-10">
        <div className={SHELL}>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-slate-200 bg-[#f8fafc] px-6 py-7 text-center md:flex-row md:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[10.5px] font-bold uppercase tracking-[.14em] text-brand-700 ring-1 ring-slate-200">
                <HelpCircle className="h-3.5 w-3.5" /> Prefer a quick discussion?
              </span>
              <h2 className="mt-3 font-display text-[1.35rem] font-bold leading-snug text-ink">
                Tell us what your Zirakpur website needs to achieve.
              </h2>
              <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-slate-500">
                We will help you decide whether a new website, redesign, WordPress build or e-commerce store is the right next step.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phoneIntl}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-[13.5px] font-semibold text-slate-700 transition hover:border-brand-600/40 hover:text-brand-700"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href="https://wa.me/918360532487?text=Hi%20Webamazee%2C%20I%20want%20a%20website%20estimate%20for%20my%20Zirakpur%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-700 px-5 text-[13.5px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(15,109,255,.6)] transition hover:bg-brand-800"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
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
