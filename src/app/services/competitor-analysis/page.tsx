import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  AnalysisDimensionsGrid,
  BenchmarkTable,
  GapAnalysisExplainer,
} from "@/components/services/seo/competitor-analysis-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "competitor-analysis";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Competitor Analysis for Zirakpur Markets",
    href: "/seo-services-zirakpur",
    description: "How competitor gaps are identified for businesses competing across the Tricity.",
  },
  {
    label: "SEO Services in Chandigarh",
    href: "/seo-services-chandigarh",
    description: "Competitive search research for the Chandigarh market.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/product-analytics-studio.webp",
  heroImageAlt: "Competitive research and search benchmarking workspace illustration for Webamazee",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free SEO audit",
  headings: {
    problems: {
      eyebrow: "Why competitor research stalls",
      intro:
        "Most competitive research fails for the same reason: it produces description rather than a decision.",
    },
    overview: {
      eyebrow: "Service overview",
    },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our analysis process",
      intro:
        "From identifying the right rivals through to a prioritised plan you can act on, with the reasoning shown.",
    },
    included: {
      eyebrow: "Deliverables",
      intro: "Every finding is tied to a decision, and every recommendation states what it depends on.",
    },
    whyChoose: {
      eyebrow: "Why Webamazee",
      intro: "Here is what makes working with us different.",
    },
    industries: {
      eyebrow: "Industries",
      intro: "The competitive set differs by market, so the research is scoped to yours.",
    },
    tools: {
      eyebrow: "Research platforms",
      intro: "Third-party data is a starting point. Findings are checked before they become recommendations.",
    },
    measurement: {
      eyebrow: "Reporting & review",
      intro:
        "Competitor positions move for reasons outside anyone's control. We report what we observed and when, not forecasts.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <AnalysisDimensionsGrid
      dimensions={[
        {
          icon: "search",
          title: "Search visibility",
          question: "Where are you actually appearing?",
          text: "Which queries your site and theirs appear for, in organic results and in the pages above them.",
        },
        {
          icon: "target",
          title: "Keyword gaps",
          question: "Which searches are you absent from?",
          text: "Queries where their pages answer the intent and yours either do not exist or do not compete.",
        },
        {
          icon: "link",
          title: "Backlink intelligence",
          question: "Where do they earn links you could too?",
          text: "Referring domains and publications that cover your subject, assessed for relevance to you.",
        },
        {
          icon: "layers",
          title: "Content coverage",
          question: "What do they cover that you do not?",
          text: "Topics and question types they answer, and where your own coverage is thin or missing.",
        },
        {
          icon: "chart",
          title: "Page experience",
          question: "Is their site easier to use than yours?",
          text: "Structure, navigation, mobile behaviour and clarity, compared on equivalent page types.",
        },
        {
          icon: "lightbulb",
          title: "Market opportunity",
          question: "Where is the realistic gap?",
          text: "The overlap between what matters to your business and what you can plausibly win.",
        },
      ]}
    />
  ),
  afterOverview: (
    <GapAnalysisExplainer
      note="A keyword list exported from a tool is not a gap analysis. Two filters are applied before anything is recommended: does the search match what you sell, and can your site plausibly compete for it from where it is today?"
      stages={[
        {
          label: "01 Compare",
          title: "Who ranks for what",
          text: "Overlay your query set against theirs to see where the two profiles diverge.",
        },
        {
          label: "02 Filter",
          title: "Remove the noise",
          text: "Discard terms that do not match your services, locations or buying stage.",
        },
        {
          label: "03 Diagnose",
          title: "Why the gap exists",
          text: "Missing page, wrong intent match, thin content, or simply weaker authority.",
        },
        {
          label: "04 Prioritise",
          title: "What is worth closing",
          text: "Rank by business relevance and realistic effort, not by search volume alone.",
        },
      ]}
    />
  ),
  afterProcess: (
    <BenchmarkTable
      note="This table describes the comparison method, not results for any real business. Actual findings depend entirely on your market and are produced during the engagement."
      rows={[
        {
          dimension: "Search visibility",
          yours: "Queries you appear for and the pages holding those positions",
          theirs: "The same, for businesses competing for your target searches",
          decision: "Which query sets are worth defending and which are open",
        },
        {
          dimension: "Content depth",
          yours: "Topics covered and how thoroughly each is answered",
          theirs: "Where their coverage extends beyond your own",
          decision: "Which pages to create, expand or consolidate",
        },
        {
          dimension: "Referring domains",
          yours: "Who links to you and how relevant those sources are",
          theirs: "Publications linking to them that also cover your subject",
          decision: "Realistic outreach targets for link building",
        },
        {
          dimension: "Page experience",
          yours: "Speed, structure and mobile behaviour on key templates",
          theirs: "The same templates, compared fairly",
          decision: "Whether technical work precedes content work",
        },
        {
          dimension: "Search intent fit",
          yours: "Whether your pages answer the query they rank for",
          theirs: "The page type currently satisfying that query",
          decision: "Whether to build a new page or revise an existing one",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Defined competitor set", text: "Agreed with you up front, not assumed from a tool." },
      { title: "Checked findings", text: "Third-party data is verified before it becomes a recommendation." },
      { title: "No invented metrics", text: "We report observed positions and dates, not fabricated scores." },
      { title: "A prioritised plan", text: "Every finding mapped to an action and an owner." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about Competitor Intel",
  closing: {
    label: "Competitor Analysis",
    title: "Ready to grow with Competitor Analysis?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
