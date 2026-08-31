import type { Metadata } from "next";
import { generateMetadata } from "./metadata";
import type { SeoEntry } from "./seo";

/**
 * Centralized metadata definitions for static (non-dynamic) pages.
 * One entry per page; add new static pages here.
 */
export const staticEntries: Record<string, SeoEntry> = {
  home: {
    title: "Webamazee — AI-Powered Digital Marketing Company",
    metaTitle: "Webamazee — AI-Powered Digital Marketing Company",
    metaDescription:
      "Webamazee is a premium AI-powered digital marketing agency. Website development, SEO, AI SEO, e-commerce and Google ranking growth for businesses around the world.",
    canonical: "/",
    path: "/",
    keywords: ["AI digital marketing", "SEO agency", "website development", "AI SEO", "digital marketing company"],
    schemaType: "website",
    breadcrumb: [],
  },
  about: {
    title: "About Webamazee",
    metaTitle: "About Webamazee | AI-Powered Digital Marketing Company",
    metaDescription:
      "Webamazee is a premium AI-powered digital marketing company helping business owners, startups and SMEs around the world grow online.",
    canonical: "/about",
    path: "/about",
    keywords: ["about Webamazee", "digital marketing agency", "AI marketing company"],
    schemaType: "website",
    breadcrumb: [{ label: "About" }],
  },
  services: {
    title: "Our Services",
    metaTitle: "Our Services | Webamazee",
    metaDescription:
      "Explore Webamazee's full range of digital marketing services — website development, SEO, AI SEO, e-commerce, landing pages and more.",
    canonical: "/services",
    path: "/services",
    keywords: ["digital marketing services", "SEO services", "web development", "AI SEO"],
    schemaType: "website",
    breadcrumb: [{ label: "Services" }],
  },
  products: {
    title: "Our Products",
    metaTitle: "Products | Webamazee",
    metaDescription:
      "Explore Webamazee's products, software built for modern digital marketing agencies, including our lead management system.",
    canonical: "/products",
    path: "/products",
    keywords: ["Webamazee products", "lead management system", "agency CRM", "marketing software"],
    schemaType: "website",
    breadcrumb: [{ label: "Products" }],
  },
  portfolio: {
    title: "Portfolio",
    // Root layout applies the brand template, so keep this route title unbranded.
    metaTitle: "Portfolio",
    metaDescription:
      "Explore a selection of premium websites, landing pages and e-commerce stores built by Webamazee for clients worldwide.",
    canonical: "/portfolio",
    path: "/portfolio",
    keywords: ["Webamazee portfolio", "web design portfolio", "website development work"],
    schemaType: "website",
    breadcrumb: [{ label: "Portfolio" }],
  },
  caseStudies: {
    title: "Case Studies",
    metaTitle: "Case Studies | Webamazee",
    metaDescription:
      "Explore real Webamazee case studies for Kabir Oil Mill, Wellington Tours and Shine Gold Tours India across e-commerce, travel website development and redesign.",
    canonical: "/case-studies",
    path: "/case-studies",
    keywords: ["marketing case studies", "SEO case studies", "web design case studies"],
    schemaType: "website",
    breadcrumb: [{ label: "Case Studies" }],
  },
  blog: {
    title: "Blog & Insights",
    metaTitle: "Blog & Insights | Webamazee",
    metaDescription:
      "Actionable marketing, SEO and AI strategies from Webamazee. Insights to help your business grow online.",
    canonical: "/blog",
    path: "/blog",
    keywords: ["SEO blog", "digital marketing insights", "AI SEO guide"],
    schemaType: "website",
    breadcrumb: [{ label: "Blog" }],
  },
  testimonials: {
    title: "Testimonials",
    metaTitle: "Testimonials | Webamazee",
    metaDescription:
      "Hear from business owners around the world about their experience working with Webamazee.",
    canonical: "/testimonials",
    path: "/testimonials",
    keywords: ["client testimonials", "digital marketing reviews"],
    schemaType: "website",
    breadcrumb: [{ label: "Testimonials" }],
  },
  faq: {
    title: "FAQ",
    metaTitle: "FAQ | Webamazee",
    metaDescription:
      "Answers to common questions about Webamazee's services, pricing, timelines and processes.",
    canonical: "/faq",
    path: "/faq",
    keywords: ["digital marketing FAQ", "SEO questions", "Webamazee FAQ"],
    schemaType: "faq",
    breadcrumb: [{ label: "FAQ" }],
  },
  contact: {
    title: "Contact Us",
    metaTitle: "Contact Us | Webamazee",
    metaDescription:
      "Get a free strategy call with Webamazee. Tell us about your business and we'll reply with a personalised growth roadmap within 24 hours.",
    canonical: "/contact",
    path: "/contact",
    keywords: ["contact Webamazee", "digital marketing consultation", "free website audit"],
    schemaType: "website",
    breadcrumb: [{ label: "Contact" }],
  },
  sitemap: {
    title: "Sitemap",
    metaTitle: "Sitemap | Webamazee",
    metaDescription:
      "Browse every page on Webamazee — services, SEO, work, blog, products, industries and locations — in one clear, organised sitemap.",
    canonical: "/sitemap",
    path: "/sitemap",
    keywords: ["sitemap", "Webamazee sitemap", "website directory", "browse pages"],
    schemaType: "website",
    breadcrumb: [{ label: "Sitemap" }],
  },
  pricing: {
    title: "Pricing",
    // Root layout applies the "| Webamazee" template, so keep this unbranded.
    metaTitle: "Pricing",
    metaDescription:
      "Transparent Webamazee pricing for website development, SEO, AI SEO and design and branding — flexible monthly and one-time packages for businesses worldwide.",
    canonical: "/pricing",
    path: "/pricing",
    keywords: [
      "web design pricing",
      "SEO packages",
      "AI SEO pricing",
      "branding packages",
      "digital marketing pricing",
    ],
    schemaType: "website",
    breadcrumb: [{ label: "Pricing" }],
  },
  privacy: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Webamazee",
    metaDescription:
      "How Webamazee collects, uses and protects your personal information.",
    canonical: "/privacy-policy",
    path: "/privacy-policy",
    schemaType: "website",
    noindex: false,
    breadcrumb: [{ label: "Privacy Policy" }],
  },
  terms: {
    title: "Terms & Conditions",
    metaTitle: "Terms & Conditions | Webamazee",
    metaDescription:
      "The terms and conditions governing the use of Webamazee's website and services.",
    canonical: "/terms-and-conditions",
    path: "/terms-and-conditions",
    schemaType: "website",
    noindex: false,
    breadcrumb: [{ label: "Terms & Conditions" }],
  },
};

/** Build Next.js Metadata for a static page by key. */
export function staticMetadata(key: keyof typeof staticEntries): Metadata {
  return generateMetadata(staticEntries[key]);
}
