import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Gauge,
  Globe2,
  HelpCircle,
  Layers,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Phone,
  Rocket,
  SearchCheck,
  ShoppingCart,
  Star,
  TestTube2,
  WalletCards,
  Wrench,
} from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { getProject } from "@/lib/portfolio";
import { GOOGLE_REVIEWS_URL, testimonials } from "@/lib/testimonials";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const pagePath = "/web-designing-company-zirakpur";
const pageTitle = "Web Designing Company in Zirakpur";
const pageDescription =
  "Webamazee designs fast, mobile-friendly websites for Zirakpur and Tricity businesses. View real work and request a free website consultation from Webamazee.";
const pageUrl = absoluteUrl(pagePath);

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

const breadcrumbs = [
  { label: "Services", href: "/services" },
  { label: "Website Development", href: "/services/website-development" },
  { label: pageTitle },
];

const websiteServices = [
  {
    name: "Business Website Design",
    href: "/services/website-development",
    icon: MonitorSmartphone,
    desc: "A clear, responsive website that explains your services, builds credibility and makes enquiries easy.",
  },
  {
    name: "WordPress Development",
    href: "/services/website-development",
    icon: Code2,
    desc: "Manageable WordPress websites for businesses that need practical content updates after launch.",
  },
  {
    name: "E-commerce Website Development",
    href: "/services/ecommerce-development",
    icon: ShoppingCart,
    desc: "Online stores with product structure, mobile shopping, cart, checkout and basic search foundations.",
  },
  {
    name: "Website Redesign",
    href: "/services/website-redesign",
    icon: Wrench,
    desc: "A careful refresh of outdated pages, navigation and conversion paths without casually discarding useful SEO value.",
  },
  {
    name: "Landing Page Development",
    href: "/services/landing-page-development",
    icon: Layers,
    desc: "Focused campaign or service pages with one clear action for calls, WhatsApp, forms or bookings.",
  },
  {
    name: "Responsive Web Design",
    href: "/services/website-development",
    icon: Gauge,
    desc: "Layouts, images and contact actions planned for phones first, then adapted for tablet and desktop users.",
  },
];

const localRequirements = [
  "Mobile-first layouts for customers comparing options on the move",
  "Fast page loading with optimised images and lightweight sections",
  "Clear service pages, prices or estimate guidance where useful",
  "Visible phone, WhatsApp and enquiry actions on key pages",
  "Service-area clarity for Zirakpur, Chandigarh, Mohali and Panchkula",
  "Trust signals such as real work, business details, FAQs and proof",
  "Simple navigation that helps visitors find the right service quickly",
  "Technical foundations that make future SEO work easier",
];

const whyChoose = [
  { title: "Custom website development", desc: "The structure and design are planned around your offer, audience and required customer action." },
  { title: "Mobile responsive delivery", desc: "Pages are designed to stay readable, fast and easy to use on phones, tablets and desktops." },
  { title: "Conversion-focused UX", desc: "Navigation, copy and calls to action are shaped around enquiries, bookings, orders or calls." },
  { title: "SEO-ready foundations", desc: "Clean headings, metadata, crawlable links and logical page structure are considered before launch." },
  { title: "Performance-conscious build", desc: "Images, layouts and page weight are handled carefully so visual design does not slow the site down." },
  { title: "Clear project communication", desc: "Discovery, milestones, content reviews and launch checks keep responsibilities visible from start to finish." },
  { title: "Real portfolio proof", desc: "You can review existing Webamazee website projects instead of relying only on agency claims." },
  { title: "Flexible implementation", desc: "A business website, WordPress build, store or redesign can be scoped around actual requirements." },
];

const process = [
  { step: "01", title: "Discover", icon: ClipboardCheck, desc: "We clarify your services, audience, competitors, content and preferred enquiry path." },
  { step: "02", title: "Plan", icon: Layers, desc: "We map the sitemap, page priorities, conversion actions and technical requirements." },
  { step: "03", title: "Design", icon: Palette, desc: "We create a modern responsive interface that supports your brand and user journey." },
  { step: "04", title: "Develop", icon: Code2, desc: "We build the pages, forms, CMS or store functionality required for the project." },
  { step: "05", title: "Test", icon: TestTube2, desc: "We review mobile behaviour, forms, speed basics, links, metadata and launch readiness." },
  { step: "06", title: "Launch", icon: Rocket, desc: "We publish the website, check key journeys and hand over the next improvement priorities." },
];

const industries = [
  { name: "Local businesses", desc: "Service pages and direct contact paths for businesses serving nearby customers." },
  { name: "Professional services", desc: "Credibility-led websites for consultants, agencies, advisers and specialist practices." },
  { name: "Healthcare", desc: "Clear service information, appointment prompts and reassurance for clinics and providers." },
  { name: "Restaurants and hospitality", desc: "Menus, location details, booking or enquiry actions and mobile-friendly browsing." },
  { name: "Travel", desc: "Package discovery, destination content and enquiry journeys for travel businesses." },
  { name: "E-commerce", desc: "Product catalogues, shopping carts and checkout paths for online selling." },
  { name: "Property and home services", desc: "Service-area clarity and fast contact options for local property-related enquiries." },
  { name: "Startups", desc: "Launch-ready websites that explain the offer and can grow as the business evolves." },
];

const pricingFactors = [
  "Number of pages and content sections",
  "Custom design and branding requirements",
  "WordPress, WooCommerce or custom functionality",
  "E-commerce catalogue, cart, checkout and payment needs",
  "Booking, CRM, WhatsApp or third-party integrations",
  "Content writing, migration and image preparation",
  "Technical SEO, redirects and analytics setup",
  "Ongoing support, maintenance or improvement needs",
];

const faqs = [
  {
    q: "How much does website design cost in Zirakpur?",
    a: "The final cost depends on scope: page count, design complexity, WordPress or e-commerce functionality, integrations, content and launch support. Webamazee's published website packages start from ₹24,999 for a starter website, but a custom estimate is better when the project needs more pages, store features or custom development.",
  },
  {
    q: "How long does it take to build a business website?",
    a: "Project timing depends on scope, content readiness, approvals and integrations. Larger websites, redesigns and e-commerce stores may need additional planning for product structure, testing and migration. We confirm a schedule after reviewing the requirements.",
  },
  {
    q: "Does Webamazee build WordPress websites?",
    a: "Yes. Webamazee builds WordPress websites where a manageable CMS is the right fit, including business websites and WooCommerce stores. The platform choice is discussed during discovery so the build matches your content, editing and growth needs.",
  },
  {
    q: "Can Webamazee redesign my existing website?",
    a: "Yes. For redesign projects, the existing pages, useful content, important URLs, internal links and enquiry paths are reviewed before changes are made. The aim is to improve design and usability without carelessly losing existing search value.",
  },
  {
    q: "Are Webamazee websites SEO-friendly?",
    a: "Websites are built with SEO-ready foundations such as clean page structure, readable headings, crawlable internal links, metadata, responsive layouts and performance-conscious image handling. Ongoing SEO can be planned separately if you want to compete for more search terms after launch.",
  },
  {
    q: "Can Webamazee work remotely with businesses in Zirakpur?",
    a: "Yes. Webamazee serves Zirakpur businesses through calls, shared content reviews, written updates and clear approval stages. The company is based in Mohali, and a structured remote workflow keeps discovery, feedback and launch decisions clear for the area.",
  },
];

const relatedServices = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "E-commerce Development", href: "/services/ecommerce-development" },
  { label: "Website Redesign", href: "/services/website-redesign" },
  { label: "Landing Page Development", href: "/services/landing-page-development" },
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "SEO Company in Zirakpur", href: "/seo-services-zirakpur" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "Digital Marketing", href: "/digital-marketing-company-zirakpur" },
];

const nearbyLinks = [
  { label: "Web design in Chandigarh", href: "/web-designing-company-chandigarh" },
  { label: "Web design in Mohali", href: "/web-designing-company-mohali" },
  { label: "Web design in Panchkula", href: "/web-designing-company-panchkula" },
  { label: "All services in Zirakpur", href: "/services-in-zirakpur" },
];

const selectedProjectSlugs = ["kabir-oil-mill", "shine-gold-tours-india", "wellington-tours"];
const selectedProjects = selectedProjectSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is NonNullable<ReturnType<typeof getProject>> => Boolean(project));

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

export default function ZirakpurWebDesignPage() {
  return (
    <>
      <JsonLd data={schema()} />

      <PageHero
        eyebrow="Website Design · Zirakpur"
        title={pageTitle}
        highlight=""
        subtitle="Webamazee designs and develops fast, modern and conversion-focused websites for businesses in Zirakpur and the Chandigarh Tricity. Whether you need a business website, WordPress build, e-commerce store or redesign, we plan the structure, mobile experience, content and contact paths around real enquiries — not decorative pages that look good but fail to help customers take action."
        crumbs={breadcrumbs}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" href="/contact" withArrow>
            Get a Free Website Consultation
          </Button>
          <Button size="lg" variant="secondary" href="#actual-work">
            View Our Work
          </Button>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
          <a href={`tel:${site.phoneIntl}`} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 font-medium text-slate-600 shadow-soft transition-colors hover:text-brand-700">
            <Phone className="h-3.5 w-3.5 text-brand-600" /> {site.phone}
          </a>
          <a href="https://wa.me/918360532487?text=Hi%20Webamazee%2C%20I%20want%20to%20discuss%20a%20website%20project%20for%20Zirakpur." className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 font-medium text-slate-600 shadow-soft transition-colors hover:text-brand-700" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-3.5 w-3.5 text-brand-600" /> WhatsApp Webamazee
          </a>
        </div>
      </PageHero>

      <section id="actual-work" className="scroll-mt-24 bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Actual Webamazee work"
            title="Website projects you can review before you hire"
            subtitle="A focused web design page should show real work, not only promises. These are existing Webamazee projects from the portfolio, linked to their detail pages for more context."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-3">
            {selectedProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <Link href={`/work/${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/40 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={project.image}
                      alt={`${project.title} website project by Webamazee`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{project.category}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-line">{project.country}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold text-ink group-hover:text-brand-700">{project.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.summary}</p>
                    <p className="mt-4 rounded-2xl bg-white p-3 text-sm font-medium text-slate-700 ring-1 ring-line">
                      {project.outcome}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Website services"
            title="Website designing services in Zirakpur"
            subtitle="The primary focus of this page is website design and development. SEO and marketing can support the website later, but the core offer here is building a better digital presence."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {websiteServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.name} delay={index * 0.04}>
                  <Link href={service.href} className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all group-hover:bg-brand-gradient group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-brand-700">{service.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{service.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  <MapPin className="h-3.5 w-3.5" /> Zirakpur & Chandigarh Tricity
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  Web design for Zirakpur businesses that compete across the Tricity
                </h2>
                <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-slate-600">
                  <p>
                    A business in Zirakpur may serve customers from Zirakpur, Chandigarh, Mohali and Panchkula on the same day. Someone comparing clinics, real estate consultants, showrooms, restaurants, travel services or professional firms will often check the website before calling.
                  </p>
                  <p>
                    For businesses around VIP Road, Patiala Road, Dhakoli and nearby commercial pockets, the website should make the offer clear quickly, work well on mobile and give people a simple way to call, WhatsApp, enquire or buy.
                  </p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {nearbyLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-brand-600/30 hover:text-brand-700">
                      {link.label} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {localRequirements.map((item, index) => (
                <Reveal key={item} delay={index * 0.03}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-surface/60 p-4 shadow-soft">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why Webamazee"
            title="Why choose Webamazee for your Zirakpur website"
            subtitle="The strongest proof is useful planning, careful implementation and real work that can be reviewed. These are the capabilities Webamazee can bring to a Zirakpur website project."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.035}>
                <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                  <BadgeCheck className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Process"
            title="A clear web design process from first call to launch"
            subtitle="A structured process keeps scope, content, reviews and launch checks visible, which is especially useful when collaboration happens remotely."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.step} delay={index * 0.04}>
                  <div className="h-full rounded-3xl border border-line bg-surface/50 p-6 shadow-soft">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-sm font-bold text-brand-700">{step.step}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries"
            title="Website design for different Zirakpur business types"
            subtitle="The same website structure does not fit every business. The content, calls to action and proof should match how your customers decide."
          />
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, index) => (
              <Reveal key={industry.name} delay={index * 0.03}>
                <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-soft">
                  <Globe2 className="h-5 w-5 text-brand-600" />
                  <h3 className="mt-3 font-display text-sm font-bold text-ink">{industry.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{industry.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="rounded-[2rem] border border-line bg-surface/60 p-7 shadow-soft sm:p-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  <WalletCards className="h-3.5 w-3.5" /> Project estimate
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink">
                  How website pricing is estimated
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-slate-600">
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
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {pricingFactors.map((factor, index) => (
                <Reveal key={factor} delay={index * 0.025}>
                  <div className="flex h-full items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft">
                    <SearchCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                    <p className="text-sm leading-relaxed text-slate-600">{factor}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-surface py-16 sm:py-20">
          <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Trust"
              title="Client feedback already published by Webamazee"
              subtitle="These quotes come from Webamazee's existing testimonial data, while the portfolio section above provides project proof you can review in more detail."
            />
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
              {testimonials.slice(0, 3).map((review, index) => (
                <Reveal key={review.name} delay={index * 0.05}>
                  <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft">
                    <div className="flex gap-1 text-amber-400" aria-label={`${review.rating} star review`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">“{review.quote}”</blockquote>
                    <figcaption className="mt-5 border-t border-line pt-4">
                      <p className="font-display text-sm font-bold text-ink">{review.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{review.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-7 text-center">
              <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline">
                View review source <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>
      )}

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions about website design in Zirakpur"
            subtitle="Practical answers for business owners comparing website design and development companies."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion items={faqs} defaultOpen={0} />
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Supporting services"
            title="Related services that can support your website"
            subtitle="These links are here for context. The core intent of this page remains website design and website development for Zirakpur businesses."
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((service, index) => (
              <Reveal key={service.href} delay={index * 0.035}>
                <Link href={service.href} className="group flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
                  <span className="font-display text-sm font-bold text-ink group-hover:text-brand-700">{service.label}</span>
                  <ArrowRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-5 rounded-3xl border border-line bg-surface/70 p-6 text-center shadow-soft md:flex-row md:text-left">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  <HelpCircle className="h-3.5 w-3.5" /> Prefer a quick discussion?
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-ink">Tell us what your Zirakpur website needs to achieve.</h2>
                <p className="mt-1 text-sm text-slate-500">We will help you decide whether a new website, redesign, WordPress build or e-commerce store is the right next step.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a href={`tel:${site.phoneIntl}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-semibold text-slate-700 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700">
                  <Phone className="h-4 w-4" /> Call
                </a>
                <a href="https://wa.me/918360532487?text=Hi%20Webamazee%2C%20I%20want%20a%20website%20estimate%20for%20my%20Zirakpur%20business." target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-gradient px-5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
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
