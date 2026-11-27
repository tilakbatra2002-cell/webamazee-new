import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  LocalConsistencyBlock,
  LocalLocationPages,
  LocalProfileBlock,
} from "@/components/services/seo/local-seo-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "local-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Local SEO in Zirakpur",
    href: "/seo-services-zirakpur",
    description: "Google Business Profile, service-area relevance and location pages for the Zirakpur market.",
  },
  {
    label: "All Digital Services in Zirakpur",
    href: "/services-in-zirakpur",
    description: "The Zirakpur hub covering website, SEO, digital marketing and AI-assisted work.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/faq-strategy-studio.webp",
  heroImageAlt: "Local search planning illustration for Webamazee local SEO services",
  secondaryHref: "/web-designing-company-zirakpur",
  secondaryLabel: "See a local page example",
  headings: {
    problems: { eyebrow: "Why nearby customers miss you", intro: "Local visibility problems usually start with information that is incomplete, inconsistent or hard to act on." },
    overview: { eyebrow: "Service overview", intro: undefined },
    whyMatters: { eyebrow: "Why it matters" },
    process: { eyebrow: "Our local process", intro: undefined },
    included: { eyebrow: "Deliverables", intro: undefined },
    whyChoose: { eyebrow: "Why Webamazee", intro: undefined },
    industries: { eyebrow: "Local business types", intro: undefined },
    tools: { eyebrow: "Local platforms", intro: undefined },
    measurement: { eyebrow: "Measurement", intro: undefined },
    testimonials: { eyebrow: "Testimonials", intro: undefined },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <LocalProfileBlock
      note="Local visibility is market-by-market"
      fields={[
        { label: "Business name", text: "The exact name used everywhere else, with no added keywords." },
        { label: "Category", text: "The primary category drives which searches you can appear for." },
        { label: "Address & service area", text: "Where you actually operate, stated consistently." },
        { label: "Phone number", text: "A local number where possible, matching your site and citations." },
        { label: "Hours", text: "Regular and special hours, kept current including holidays." },
        { label: "Photos & services", text: "Real images and an accurate list of what you offer." },
        { label: "Website link", text: "Pointing to the most relevant page, not always the homepage." },
      ]}
    />
  ),
  afterOverview: (
    <LocalConsistencyBlock
      items={[
        {
          title: "Name, address, phone",
          text: "Identical formatting across your site, profile and directories.",
        },
        {
          title: "Service categories",
          text: "Matching categorisation so the business is filed consistently.",
        },
        {
          title: "Opening hours",
          text: "The same hours everywhere, including seasonal changes.",
        },
        {
          title: "Website and landing page",
          text: "Linking to the page that best answers the local query.",
        },
        {
          title: "Duplicate listings",
          text: "Old or duplicate profiles identified and resolved where you control them.",
        },
        {
          title: "Local schema",
          text: "Structured data describing the business, not a generic organisation.",
        },
      ]}
    />
  ),
  afterIncluded: (
    <LocalLocationPages
      note="We only build location pages where there is a genuine service area and something specific to say. Publishing near-identical pages for every town is a duplicate-content problem, not a local strategy."
      model={[
        {
          label: "01",
          title: "The location and its context",
          text: "What is actually different about serving this area, not just its name.",
        },
        {
          label: "02",
          title: "Services available locally",
          text: "Which services genuinely apply, and any local constraints.",
        },
        {
          label: "03",
          title: "Local proof",
          text: "Real projects, coverage area and practical details customers need.",
        },
        {
          label: "04",
          title: "A clear next step",
          text: "Contact routes that work for that area, including phone and directions.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every local engagement includes",
    items: [
      { title: "Verified details", text: "Profile information is checked against your own records." },
      { title: "Honest reporting", text: "Map visibility is reported as observed, never guaranteed." },
      { title: "No manufactured reviews", text: "Reviews are earned from real customers only." },
      { title: "Consistency tracked", text: "Citation changes are logged as they are confirmed." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about Local SEO",
  closing: {
    label: "Local SEO",
    title: "Ready to grow with Local SEO?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
