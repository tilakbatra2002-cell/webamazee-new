import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  ContentLifecycle,
  EditorialPipeline,
  EditorialStandards,
} from "@/components/services/seo/ai-content-visuals";
import { SeoClusterBlock } from "@/components/services/seo/seo-cluster";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "ai-content-optimization";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Content Optimisation for Zirakpur SEO",
    href: "/seo-services-zirakpur",
    description: "Question-led content planning for local search intent in Zirakpur.",
  },
  {
    label: "SEO Services in Mohali",
    href: "/seo-services-mohali",
    description: "Content and search intent work for Mohali B2B and technology businesses.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-ai-seo.webp",
  heroImageAlt: "Editorial content production workspace with AI-assisted drafting and human review",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free SEO audit",
  headings: {
    problems: {
      eyebrow: "Why content underperforms",
      intro:
        "Most content problems are not writing problems. They are strategy, intent and review problems.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our process",
      intro:
        "Research and briefs come before drafting, and every draft passes an editor before it is published.",
    },
    included: {
      eyebrow: "What's included",
      intro: "Clear deliverables, tools and reporting - so you always know what you are getting.",
    },
    whyChoose: {
      eyebrow: "Why Webamazee",
      intro: "Here is what makes working with us different.",
    },
    industries: {
      eyebrow: "Industries",
      intro: "Content strategy differs by sector, because search intent does.",
    },
    tools: {
      eyebrow: "Technology & tools",
      intro: "AI tools assist research and drafting. They do not replace editorial judgement.",
    },
    measurement: {
      eyebrow: "Measurement & reporting",
      intro:
        "We report how content performs against your own baseline. We do not claim that AI-assisted content ranks or produces traffic automatically.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <EditorialPipeline
      note="AI can produce fluent text quickly. It cannot verify a fact, judge whether an argument is honest, or know how your customers speak. Those remain editorial responsibilities, which is why every page passes a named reviewer before publication."
      stages={[
        {
          stage: "Research",
          ai: "Clustering related queries and surfacing what competing pages already cover.",
          human: "Deciding which topics matter commercially, and which are worth ignoring.",
        },
        {
          stage: "Brief",
          ai: "Assembling structure, headings and the questions a page should answer.",
          human: "Setting the argument, the angle and what the reader should do next.",
        },
        {
          stage: "Draft",
          ai: "Producing a first draft consistent with the brief and house style.",
          human: "Rewriting for voice, cutting filler and adding first-hand detail.",
        },
        {
          stage: "Review",
          ai: "Flagging unsupported claims, thin sections and unresolved questions.",
          human: "Fact-checking, verifying sources and approving or rejecting the draft.",
        },
        {
          stage: "Publish",
          ai: "Checking on-page elements: titles, headings, internal links and alt text.",
          human: "Final sign-off, publishing decision and internal-link placement.",
        },
      ]}
    />
  ),
  afterProcess: (
    <EditorialStandards
      checks={[
        {
          title: "Every claim is sourced",
          text: "Statistics and factual statements carry a verifiable source, or they are removed before publication.",
        },
        {
          title: "Search intent is answered",
          text: "The page addresses the question the searcher actually asked, not a related one that was easier to write.",
        },
        {
          title: "First-hand experience is present",
          text: "Where a topic calls for experience, the page says what we have actually seen, not what sounds plausible.",
        },
        {
          title: "The brand voice holds",
          text: "Drafts are edited to read like your business, so published pages do not sound machine-written.",
        },
        {
          title: "Nothing is padded",
          text: "Sections exist because they carry information. Word count is not a target we work towards.",
        },
        {
          title: "Structure earns its place",
          text: "Headings, lists and tables are used where they aid comprehension, not to break up text decoratively.",
        },
      ]}
    />
  ),
  afterIncluded: (
    <ContentLifecycle
      phases={[
        {
          title: "Publish",
          text: "New pages go live with correct structure, internal links and tracking in place.",
        },
        {
          title: "Observe",
          text: "Impressions, positions and query data show what the page is actually being found for.",
        },
        {
          title: "Refresh",
          text: "Sections that are out of date, thin or misaligned with intent get rewritten.",
        },
        {
          title: "Consolidate",
          text: "Overlapping pages that compete with each other are merged, redirected or retired.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Named editor", text: "Every draft is reviewed by a person, not only a model." },
      { title: "Documented brief", text: "You can see the intended audience and intent before drafting starts." },
      { title: "No ranking promises", text: "Content quality helps; it does not guarantee a position." },
      { title: "Sources retained", text: "You keep the underlying research for every published claim." },
    ],
  },
  // This page's related-services rail already lists these services, so the
  // cluster cards render as labels to avoid duplicate H3s.
  cluster: <SeoClusterBlock currentSlug={SLUG} asHeadings={false} />,
  localSeoLinks,
  faqLabel: "Questions about AI Content",
  closing: {
    label: "AI Content Optimisation",
    title: "Ready to grow with AI Content Optimisation?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
