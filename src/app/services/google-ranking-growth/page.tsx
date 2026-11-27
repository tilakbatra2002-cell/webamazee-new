import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  CompetitorCompare,
  OpportunityMatrix,
  RankingMethodRail,
} from "@/components/services/seo/ranking-growth-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "google-ranking-growth";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Ranking Growth for Zirakpur Searches",
    href: "/seo-services-zirakpur",
    description: "A data-led route to improving positions for Zirakpur and Tricity search intent.",
  },
  {
    label: "SEO Services in Panchkula",
    href: "/seo-services-panchkula",
    description: "Search growth for businesses serving Panchkula and nearby markets.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/product-analytics-studio.webp",
  heroImageAlt: "Search performance review workspace illustration for Webamazee ranking growth",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free SEO audit",
  headings: {
    problems: { eyebrow: "Why rankings stall", intro: "Ranking stagnation is usually a symptom. These are the underlying causes we look for first." },
    overview: { eyebrow: "Service overview", intro: undefined },
    whyMatters: { eyebrow: "Why sustainable growth matters" },
    process: { eyebrow: "How the programme runs", intro: undefined },
    included: { eyebrow: "Deliverables", intro: undefined },
    whyChoose: { eyebrow: "Why Webamazee", intro: undefined },
    industries: { eyebrow: "Where this fits", intro: undefined },
    tools: { eyebrow: "Tracking & research", intro: undefined },
    measurement: { eyebrow: "Reporting", intro: undefined },
    testimonials: { eyebrow: "Testimonials", intro: undefined },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <RankingMethodRail
      stages={[
        {
          step: "01",
          title: "Record the baseline",
          text: "Current positions, impressions and click data captured before any change.",
        },
        {
          step: "02",
          title: "Change one thing well",
          text: "Targeted on-page and content work on the pages that can realistically move.",
        },
        {
          step: "03",
          title: "Observe and interpret",
          text: "Changes tracked over time, with seasonality and algorithm updates considered.",
        },
        {
          step: "04",
          title: "Decide the next cycle",
          text: "What worked is repeated; what did not is revised or dropped.",
        },
      ]}
    />
  ),
  afterOverview: (
    <OpportunityMatrix
      note="The aim is not to chase the highest-volume term. It is to find the searches where your business can realistically become the best answer, then do that work properly."
      quadrants={[
        {
          label: "High relevance · Realistic",
          title: "Work these first",
          text: "Searches that match what you sell and where your site can plausibly compete.",
        },
        {
          label: "High relevance · Hard",
          title: "Longer-term targets",
          text: "Worth pursuing, but they need content and authority built up first.",
        },
        {
          label: "Low relevance · Easy",
          title: "Usually skip",
          text: "Terms you could rank for that bring visitors who will never enquire.",
        },
        {
          label: "Low relevance · Hard",
          title: "Not worth the effort",
          text: "Neither aligned with the business nor achievable in a reasonable timeframe.",
        },
      ]}
    />
  ),
  afterProcess: (
    <CompetitorCompare
      note="We review competitors as evidence of what currently answers a search, not as a template to copy. Their content may be succeeding for reasons that would not apply to your business."
      dimensions={[
        {
          title: "Pages currently ranking",
          text: "Which URLs hold the positions, and what type of page each one is.",
        },
        {
          title: "Content depth",
          text: "What the top pages cover that yours does not, and what they omit.",
        },
        {
          title: "Search intent fit",
          text: "Whether those pages actually answer the query, or just mention it.",
        },
        {
          title: "Internal support",
          text: "How much internal linking and site authority sits behind each page.",
        },
        {
          title: "Page experience",
          text: "Speed, mobile behaviour and clarity compared with your own pages.",
        },
        {
          title: "Authority signals",
          text: "The referring domains and mentions those pages have earned over time.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every growth engagement includes",
    items: [
      { title: "Documented baseline", text: "Positions recorded before any work starts." },
      { title: "Priority list", text: "Terms ranked by relevance and realistic movement." },
      { title: "Trend reporting", text: "Movement shown over time, not as a single snapshot." },
      { title: "No position promises", text: "We do not guarantee positions or timescales." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about Ranking Growth",
  closing: {
    label: "Google Ranking Growth",
    title: "Ready to grow with Google Ranking Growth?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
