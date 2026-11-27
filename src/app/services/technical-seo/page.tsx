import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  ArchitectureDiagram,
  CrawlPathDiagram,
  TechnicalRiskList,
} from "@/components/services/seo/technical-seo-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "technical-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Technical SEO for Zirakpur Businesses",
    href: "/seo-services-zirakpur",
    description: "Crawlability, indexation, Core Web Vitals and structured data explained for a local market.",
  },
  {
    label: "Technical SEO in Mohali",
    href: "/seo-services-mohali",
    description: "Technical search foundations for Mohali technology and B2B websites.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-website-development.webp",
  heroImageAlt: "Website build and technical review workspace illustration for Webamazee technical SEO",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Run a technical audit",
  headings: {
    problems: { eyebrow: "What breaks first", intro: "Most technical problems are invisible in the browser and only show up in how search engines treat the site." },
    overview: { eyebrow: "Scope", intro: undefined },
    whyMatters: { eyebrow: "Why the foundation comes first" },
    process: { eyebrow: "Audit to implementation", intro: undefined },
    included: { eyebrow: "Deliverables", intro: undefined },
    whyChoose: { eyebrow: "Why Webamazee", intro: undefined },
    industries: { eyebrow: "Where this matters most", intro: undefined },
    tools: { eyebrow: "Audit tooling", intro: undefined },
    measurement: { eyebrow: "Verification", intro: undefined },
    testimonials: { eyebrow: "Testimonials", intro: undefined },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <CrawlPathDiagram
      stages={[
        {
          step: "01",
          title: "Crawl",
          text: "Search engines discover URLs through links, sitemaps and redirects.",
        },
        {
          step: "02",
          title: "Render",
          text: "JavaScript, CSS and blocking resources decide what is actually seen.",
        },
        {
          step: "03",
          title: "Index",
          text: "Canonicals, robots directives and duplication decide what is stored.",
        },
        {
          step: "04",
          title: "Rank",
          text: "Only pages that were crawled, rendered and indexed can compete at all.",
        },
      ]}
    />
  ),
  afterOverview: (
    <ArchitectureDiagram
      root="Reference architecture: how link equity and clarity flow down a site"
      layers={[
        { label: "Entry points", items: ["Homepage", "Primary navigation", "Sitemap", "XML index"] },
        { label: "Hub pages", items: ["Category / service hubs", "Location hubs", "Pillar content"] },
        { label: "Detail pages", items: ["Individual services", "Products", "Articles", "Case studies"] },
        { label: "Utility", items: ["Contact", "Legal", "Account / checkout"] },
      ]}
    />
  ),
  afterProcess: (
    <TechnicalRiskList
      risks={[
        {
          title: "Blocked or orphaned pages",
          text: "Pages hidden from crawlers, or reachable only through a sitemap, are rarely indexed.",
        },
        {
          title: "Duplicate and parameter URLs",
          text: "Multiple addresses for one page split signals and confuse canonical selection.",
        },
        {
          title: "Slow or unstable layouts",
          text: "Poor Core Web Vitals affect both usability and how the page is evaluated.",
        },
        {
          title: "Broken redirect chains",
          text: "Long chains and loops waste crawl budget and lose link equity along the way.",
        },
        {
          title: "Structured data mismatches",
          text: "Markup that describes something different from the visible page is invalid.",
        },
        {
          title: "Mobile usability faults",
          text: "Small tap targets, viewport problems and intrusive interstitials harm real users first.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "Handover",
    title: "What every audit produces",
    items: [
      { title: "Prioritised findings", text: "Ordered by impact and effort, not by severity label." },
      { title: "Developer-ready detail", text: "Enough context for a developer to implement without guessing." },
      { title: "Verification pass", text: "Fixes are re-checked on the live site after release." },
      { title: "No invented scores", text: "We report what the tools and the live site actually show." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about Technical SEO",
  closing: {
    label: "Technical SEO",
    title: "Ready to grow with Technical SEO?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
