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
    metaTitle: "About Us | AI-Powered Digital Marketing Company",
    metaDescription:
      "Webamazee is a premium AI-powered digital marketing company helping business owners, startups and SMEs around the world grow online.",
    canonical: "/about",
    path: "/about",
    keywords: ["digital marketing company", "AI marketing company", "web development agency", "SEO company", "digital marketing services"],
    schemaType: "website",
    breadcrumb: [{ label: "About" }],
  },
  services: {
    title: "Our Services",
    metaTitle: "Digital Marketing & Web Development Services",
    metaDescription:
      "Explore Webamazee's full range of digital marketing services — website development, SEO, AI SEO, e-commerce, landing pages and more.",
    canonical: "/services",
    path: "/services",
    keywords: ["digital marketing services", "web development services", "SEO services", "AI SEO services", "eCommerce website development", "landing page development", "social media marketing services"],
    schemaType: "website",
    breadcrumb: [{ label: "Services" }],
  },
  products: {
    title: "Our Products",
    metaTitle: "Digital Marketing Software for Agencies",
    metaDescription:
      "Explore Webamazee's products, software built for modern digital marketing agencies, including our lead management system.",
    canonical: "/products",
    path: "/products",
    keywords: ["lead management system", "agency CRM", "marketing software for agencies", "lead management software", "Webamazee products"],
    schemaType: "website",
    breadcrumb: [{ label: "Products" }],
  },
  portfolio: {
    title: "Portfolio",
    // Root layout applies the brand template, so keep this route title unbranded.
    metaTitle: "Web Design & Development Portfolio",
    metaDescription:
      "Explore a selection of premium websites, landing pages and e-commerce stores built by Webamazee for clients worldwide.",
    canonical: "/portfolio",
    path: "/portfolio",
    keywords: ["web design portfolio", "website development examples", "eCommerce website examples", "landing page examples", "web development portfolio"],
    schemaType: "website",
    breadcrumb: [{ label: "Portfolio" }],
  },
  caseStudies: {
    title: "Case Studies",
    metaTitle: "Web Development & SEO Case Studies",
    metaDescription:
      "Explore real Webamazee case studies for Kabir Oil Mill, Wellington Tours and Shine Gold Tours India across e-commerce, travel website development and redesign.",
    canonical: "/case-studies",
    path: "/case-studies",
    keywords: ["web development case studies", "SEO case studies", "eCommerce website case study", "website redesign case study", "Webamazee case studies"],
    schemaType: "website",
    breadcrumb: [{ label: "Case Studies" }],
  },
  blog: {
    title: "Blog & Insights",
    metaTitle: "Digital Marketing, SEO & Web Development Blog",
    metaDescription:
      "Practical guides on SEO, AI marketing, website development, local search and measuring ROI - insights to help your business grow online.",
    canonical: "/blog",
    path: "/blog",
    keywords: ["SEO blog", "digital marketing blog", "AI SEO guide", "website development guides", "local SEO checklist"],
    schemaType: "website",
    breadcrumb: [{ label: "Blog" }],
  },
  testimonials: {
    title: "Testimonials",
    metaTitle: "Client Testimonials & Reviews",
    metaDescription:
      "Hear from business owners around the world about their experience working with Webamazee.",
    canonical: "/testimonials",
    path: "/testimonials",
    keywords: ["digital marketing reviews", "client testimonials", "Webamazee reviews", "agency client feedback"],
    schemaType: "website",
    breadcrumb: [{ label: "Testimonials" }],
  },
  faq: {
    title: "FAQ",
    metaTitle: "Frequently Asked Questions",
    metaDescription:
      "Answers to common questions about Webamazee's services, pricing, timelines and processes.",
    canonical: "/faq",
    path: "/faq",
    keywords: ["digital marketing FAQ", "SEO questions", "web development FAQ", "marketing agency pricing"],
    schemaType: "faq",
    breadcrumb: [{ label: "FAQ" }],
  },
  contact: {
    title: "Contact Us",
    metaTitle: "Contact Us | Free Strategy Call",
    metaDescription:
      "Get a free strategy call with Webamazee. Tell us about your business and we'll reply with a personalised growth roadmap within 24 hours.",
    canonical: "/contact",
    path: "/contact",
    keywords: ["contact Webamazee", "free strategy call", "digital marketing consultation", "website development quote"],
    schemaType: "website",
    breadcrumb: [{ label: "Contact" }],
  },
  freeSeoAudit: {
    title: "Free Website SEO Audit",
    metaTitle: "Free Website SEO Audit",
    metaDescription:
      "Run a free website SEO audit with Webamazee. Check technical SEO, on-page SEO, performance, mobile readiness, structured data and AI search readiness.",
    canonical: "/free-seo-audit",
    path: "/free-seo-audit",
    keywords: [
      "free SEO audit",
      "website audit",
      "technical SEO check",
      "AI search readiness",
      "free website SEO audit",
    ],
    schemaType: "website",
    breadcrumb: [{ label: "Free SEO Audit" }],
  },
  sitemap: {
    title: "Sitemap",
    metaTitle: "Sitemap",
    metaDescription:
      "Browse every page on Webamazee — services, SEO, work, blog, products, industries and locations — in one clear, organised sitemap.",
    canonical: "/sitemap",
    path: "/sitemap",
    keywords: ["sitemap", "Webamazee sitemap", "website directory"],
    schemaType: "website",
    breadcrumb: [{ label: "Sitemap" }],
  },
  pricing: {
    title: "Pricing",
    // Root layout applies the "| Webamazee" template, so keep this unbranded.
    metaTitle: "Web Development & Digital Marketing Pricing",
    metaDescription:
      "Transparent Webamazee pricing for website development, SEO, AI SEO and social media marketing — flexible monthly and one-time packages for businesses worldwide.",
    canonical: "/pricing",
    path: "/pricing",
    keywords: [
      "web design pricing",
      "SEO packages",
      "digital marketing pricing",
      "AI SEO pricing",
      "social media marketing packages",
    ],
    schemaType: "website",
    breadcrumb: [{ label: "Pricing" }],
  },
  privacy: {
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
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
    metaTitle: "Terms & Conditions",
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
