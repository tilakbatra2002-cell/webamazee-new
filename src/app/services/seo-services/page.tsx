import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { SeoPillars, SeoServiceMap } from "@/components/services/seo/seo-service-map";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "seo-services";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "SEO Company in Zirakpur",
    href: "/seo-services-zirakpur",
    description: "How Webamazee plans local and technical SEO for businesses targeting Zirakpur and the Tricity.",
  },
  {
    label: "SEO Services in Chandigarh",
    href: "/seo-services-chandigarh",
    description: "Search strategy for businesses competing in Chandigarh and the wider Tricity.",
  },
  {
    label: "SEO Services in Mohali",
    href: "/seo-services-mohali",
    description: "Organic search support for Mohali technology, B2B and service businesses.",
  },
];

const serviceMap = [
  {
    slug: "technical-seo",
    name: "Technical SEO",
    icon: "Settings2",
    focus: ["Crawl", "Index", "Core Web Vitals"],
    summary: "Make the site accessible and fast enough for search engines to read it properly.",
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    icon: "Brain",
    focus: ["Entities", "Topical coverage", "AI answers"],
    summary: "Structure content around search intent, entities and topical authority.",
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    icon: "MapPin",
    focus: ["Profile", "Citations", "Location pages"],
    summary: "Help nearby customers find the right business information with confidence.",
  },
  {
    slug: "google-ranking-growth",
    name: "Google Ranking Growth",
    icon: "TrendingUp",
    focus: ["Opportunities", "On-page", "Tracking"],
    summary: "Prioritise the terms worth competing for, then improve and track them.",
  },
  {
    slug: "link-building",
    name: "Link Building",
    icon: "Link2",
    focus: ["Relevance", "Mentions", "Authority"],
    summary: "Build authority through relevant links and mentions rather than volume.",
  },
];

const pillars = [
  {
    number: "01",
    title: "Technical foundations",
    intro: "The groundwork that lets everything else work: how the site is crawled, understood and served.",
    points: ["Crawlability", "Indexation", "Core Web Vitals", "Structured data", "Site architecture"],
  },
  {
    number: "02",
    title: "Keyword and content strategy",
    intro: "Deciding which searches are worth serving, and planning pages that genuinely answer them.",
    points: ["Keyword research", "Search intent mapping", "Content planning", "On-page optimisation", "Internal linking"],
  },
  {
    number: "03",
    title: "Authority building",
    intro: "Earning relevance from other sites and sources, rather than accumulating links for their own sake.",
    points: ["Relevance-led outreach", "Mentions and citations", "Digital PR", "Competitor link gaps", "Anchor quality"],
  },
  {
    number: "04",
    title: "Auditing and reporting",
    intro: "Measuring against your own baseline, in plain language, so the next decision is informed.",
    points: ["Technical audits", "Rank tracking", "Search Console review", "Monthly reporting", "Quarterly reviews"],
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-seo.webp",
  heroImageAlt: "Search visibility planning illustration for Webamazee SEO services",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free SEO audit",
  headings: {
    problems: { eyebrow: "Sound familiar?", intro: "If any of these ring true, your search programme is probably working against you rather than for you." },
    overview: { eyebrow: "Service overview", intro: undefined },
    whyMatters: { eyebrow: "Why it matters" },
    process: { eyebrow: "Our process", intro: undefined },
    included: { eyebrow: "What's included", intro: undefined },
    whyChoose: { eyebrow: "Why Webamazee", intro: undefined },
    industries: { eyebrow: "Industries", intro: undefined },
    tools: { eyebrow: "Technology & tools", intro: undefined },
    measurement: { eyebrow: "Measurement & reporting", intro: undefined },
    testimonials: { eyebrow: "Testimonials", intro: undefined },
    faqEyebrow: "FAQ",
  },
  afterHero: <SeoServiceMap items={serviceMap} />,
  afterOverview: <SeoPillars pillars={pillars} />,
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "A recorded baseline", text: "Your starting position is documented before work begins." },
      { title: "Agreed priorities", text: "Scope and sequence are confirmed in writing." },
      { title: "Plain-language reporting", text: "What changed, what did not, and what happens next." },
      { title: "No ranking guarantees", text: "Positions are influenced by factors outside any agency's control." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about SEO",
  closing: {
    label: "SEO Services",
    title: "Ready to grow with SEO Services?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
