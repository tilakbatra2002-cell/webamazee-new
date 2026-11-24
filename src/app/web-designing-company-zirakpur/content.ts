/**
 * VERBATIM CONTENT — DO NOT EDIT.
 *
 * Every string below is copied unchanged from the original
 * src/app/web-designing-company-zirakpur/page.tsx (pre-redesign, commit 645e2ed).
 * The visual redesign imports these arrays; it does not modify them.
 * Any change here is a content change and is out of scope for this task.
 */
import {
  ClipboardCheck, Code2, Gauge, Layers, MonitorSmartphone, Palette,
  Rocket, ShoppingCart, TestTube2, Wrench,
} from "lucide-react";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import { getProject } from "@/lib/portfolio";
import type { Metadata } from "next";

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

export const selectedProjectSlugs = ["kabir-oil-mill", "shine-gold-tours-india", "wellington-tours"];
export const selectedProjects = selectedProjectSlugs
  .map((slug) => getProject(slug))
  .filter((project): project is NonNullable<ReturnType<typeof getProject>> => Boolean(project));


export {
  pagePath,
  pageTitle,
  pageDescription,
  pageUrl,
  breadcrumbs,
  websiteServices,
  localRequirements,
  whyChoose,
  process,
  industries,
  pricingFactors,
  faqs,
  relatedServices,
  nearbyLinks,
};
