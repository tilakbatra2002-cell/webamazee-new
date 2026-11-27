import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  AiHumanReviewPanel,
  AiSemanticDiagram,
  AiSignalLegend,
} from "@/components/services/seo/ai-seo-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "ai-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "AI SEO for Zirakpur Businesses",
    href: "/seo-services-zirakpur",
    description: "How AI-assisted research and AI search optimisation are applied to a local SEO plan.",
  },
  {
    label: "AI Marketing in Zirakpur",
    href: "/ai-marketing-company-zirakpur",
    description: "Human-led AI marketing for businesses serving Zirakpur and the Tricity.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-ai-seo.webp",
  heroImageAlt: "AI-assisted search optimisation illustration for Webamazee AI SEO services",
  secondaryHref: "/services/ai-content-optimization",
  secondaryLabel: "See AI content optimisation",
  headings: {
    problems: { eyebrow: "Where AI-era search gets hard", intro: "Publishing more pages is not the same as being understood. These are the patterns we see most often." },
    overview: { eyebrow: "What AI SEO covers", intro: undefined },
    whyMatters: { eyebrow: "Why it matters" },
    process: { eyebrow: "How we run AI SEO", intro: undefined },
    included: { eyebrow: "Deliverables", intro: undefined },
    whyChoose: { eyebrow: "Why Webamazee", intro: undefined },
    industries: { eyebrow: "Who this suits", intro: undefined },
    tools: { eyebrow: "Platforms & data", intro: undefined },
    measurement: { eyebrow: "Measurement", intro: undefined },
    testimonials: { eyebrow: "Testimonials", intro: undefined },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <AiSemanticDiagram
      topic="Your core service and the searches it should answer"
      entities={[
        "Service categories",
        "Locations served",
        "Industry terms",
        "Comparable options",
        "Common objections",
        "Related questions",
      ]}
      questions={[
        "What exactly does this service include, and what does it exclude?",
        "How is it priced, and what changes the price?",
        "How does it compare with the alternatives a buyer is weighing?",
        "Who is it right for, and who is it not right for?",
        "What evidence shows the provider can actually deliver it?",
      ]}
    />
  ),
  afterOverview: (
    <AiHumanReviewPanel
      assisted={[
        "Clustering large keyword sets by intent and topic",
        "Drafting outlines and first-pass copy for human editing",
        "Auditing existing pages for coverage gaps and duplication",
        "Generating and validating structured-data markup",
        "Summarising Search Console and analytics data",
      ]}
      human={[
        "Deciding what is genuinely true about your business",
        "Editing every page for accuracy and tone before publication",
        "Approving claims, figures and comparisons",
        "Reviewing structured data against the visible page content",
        "Signing off what is published and what is held back",
      ]}
    />
  ),
  afterMeasurement: (
    <AiSignalLegend
      structural={[
        {
          label: "Structured data validity",
          text: "Markup can be tested directly against your pages, so this is verifiable.",
        },
        {
          label: "Topical coverage",
          text: "Whether your pages answer the questions in a topic can be reviewed page by page.",
        },
        {
          label: "Content quality",
          text: "Assessed against usefulness and accuracy, not a single automated score.",
        },
        {
          label: "Internal linking",
          text: "Which pages link to which is fully inspectable on your own site.",
        },
      ]}
      assessed={[
        "How your pages perform in classic organic results",
        "Whether structured data matches visible content",
        "Which topics are thin, duplicated or missing",
        "Where AI-assisted drafting needs editorial correction",
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Human sign-off", text: "No page is published without review by a person." },
      { title: "Source-checked claims", text: "Figures and comparisons are verified before use." },
      { title: "Honest reporting", text: "Platform-controlled visibility is never presented as guaranteed." },
      { title: "No inflated promises", text: "We do not claim influence over AI answer inclusion." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about AI SEO",
  closing: {
    label: "AI SEO",
    title: "Ready to grow with AI SEO?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
