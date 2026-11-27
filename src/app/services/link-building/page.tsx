import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import {
  LinkMethodRows,
  LinkQualityTiers,
  LinkStandardsPanel,
} from "@/components/services/seo/link-building-visuals";
import type { LinkItem } from "@/components/services/seo/seo-types";

const SLUG = "link-building";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localSeoLinks: LinkItem[] = [
  {
    label: "Authority Building for Zirakpur SEO",
    href: "/seo-services-zirakpur",
    description: "Relevance-led links, mentions and citations for businesses serving Zirakpur.",
  },
  {
    label: "Digital Marketing in Zirakpur",
    href: "/digital-marketing-company-zirakpur",
    description: "The wider digital marketing context for the Zirakpur market.",
  },
];

const variants: SeoPageVariants = {
  heroImage: "/images/custom/hero-growth-studio.webp",
  heroImageAlt: "Authority building and link prospecting workspace illustration for Webamazee link building",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free SEO audit",
  headings: {
    problems: {
      eyebrow: "Why link building stalls",
      intro:
        "Most link problems are not about effort. They are about which links are worth pursuing and what happens after they are won.",
    },
    overview: {
      eyebrow: "Service overview",
    },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our process",
      intro:
        "Prospecting, outreach and placement, with monitoring built in so gains are not quietly lost later.",
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
      intro: "Link acquisition depends on your sector and who publishes in it.",
    },
    tools: {
      eyebrow: "Technology & tools",
      intro: "Prospecting, outreach and monitoring platforms, used alongside human judgement.",
    },
    measurement: {
      eyebrow: "Measurement & reporting",
      intro:
        "We report link quality and relevance against your baseline. We do not report projected traffic or guaranteed ranking movement.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <LinkQualityTiers
      note="A high-authority domain is not automatically a good link, and a smaller site is not automatically a poor one. We assess each opportunity on the criteria above rather than on a single score, and we tell you when an opportunity is weak."
      tiers={[
        {
          label: "Relevance",
          title: "Does the link make sense in context?",
          text: "The referring page should be about something genuinely related to yours.",
          points: [
            "Topical fit with the linked page",
            "Sensible placement within the content",
            "Audience overlap with your buyers",
          ],
        },
        {
          label: "Quality",
          title: "Is the site a real publication?",
          text: "Sites built only to host links are the pattern search engines penalise.",
          points: [
            "Genuine editorial standards",
            "Consistent, real readership",
            "No history of link-selling",
          ],
        },
        {
          label: "Safety",
          title: "Would you be comfortable being linked to it?",
          text: "Association matters. A link places your brand next to whatever else is on that page.",
          points: [
            "No paid-link marketplaces",
            "No private blog networks",
            "No automated mass placement",
          ],
        },
      ]}
    />
  ),
  afterOverview: (
    <LinkStandardsPanel
      avoid={[
        "Buy links from marketplaces or link farms",
        "Use private blog networks or automated placement tools",
        "Trade links at scale or use reciprocal schemes",
        "Publish thin guest posts written only to carry a link",
        "Place exact-match anchors unnaturally across many sites",
      ]}
      instead={[
        "Earn coverage through work a publisher would want to reference",
        "Target sites whose audience overlaps your customers",
        "Write guest content with genuine substance for that publication",
        "Find broken references where your resource is the correct replacement",
        "Vary anchors and link naturally within real editorial context",
      ]}
    />
  ),
  afterProcess: (
    <LinkMethodRows
      methods={[
        {
          title: "Digital PR",
          text: "Creating something worth covering, then working with journalists and publishers who cover that subject.",
          depends: "A genuine story, data or resource - not a press release about your own website.",
        },
        {
          title: "Guest posting and content partnerships",
          text: "Writing substantive pieces for publications that serve your audience, with an editorial fit.",
          depends: "Editorial standards on their side, and something specific to say on yours.",
        },
        {
          title: "Broken link building",
          text: "Finding pages that reference content which no longer exists, where your page is a suitable replacement.",
          depends: "A resource good enough that the publisher would link to it on merit.",
        },
        {
          title: "Competitor backlink analysis",
          text: "Reviewing where competitors are linked from, to identify publications that already cover your subject.",
          depends: "Relevance of those sources to your business - not simply that a competitor is listed.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Documented baseline", text: "Your existing profile is recorded before outreach starts." },
      { title: "No link guarantees", text: "No agency controls what a publisher chooses to publish." },
      { title: "Quality over volume", text: "We report relevance and placement, not a link count." },
      { title: "Monitoring included", text: "Links are checked after placement so losses are visible." },
    ],
  },
  localSeoLinks,
  faqLabel: "Questions about Link Building",
  closing: {
    label: "Link Building",
    title: "Ready to grow with Link Building?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
