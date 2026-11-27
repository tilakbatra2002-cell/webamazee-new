import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { CampaignLifecycle, TrackingChain } from "@/components/services/seo/social-visuals-b";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "social-media-advertising";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/product-analytics-studio.webp",
  heroImageAlt: "Paid campaign measurement and optimisation workspace across multiple screens",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why ad spend leaks",
      intro:
        "Paid social usually underperforms for mundane reasons: weak tracking, untested creative, or a budget left running unchecked.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Campaign process",
      intro:
        "Setup, launch, test and optimise - with tracking verified before any budget is spent.",
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
      intro: "Paid social works across sectors, provided the tracking and offer are sound.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Ad platforms and tracking tools, configured before launch rather than after.",
    },
    measurement: {
      eyebrow: "Reporting",
      intro:
        "We report spend, delivery, conversions and cost against the account's own baseline. We do not promise a fixed ROAS, cost per lead or number of conversions.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <TrackingChain
      note="Advertising spend is billed directly by the platform and is separate from management fees. Your ad budget does not pass through us, so you can see exactly what was spent and what it returned."
      steps={[
        { title: "Ad platform", text: "The campaign, ad set and creative that delivered the impression." },
        { title: "Landing page", text: "Where the click arrives, with the offer matching what the ad promised." },
        { title: "Tag manager", text: "The layer that records what happened without breaking the page." },
        { title: "Analytics", text: "Where behaviour and conversions are attributed to the right source." },
        { title: "Reporting", text: "The numbers you decide on, reconciled rather than assumed." },
      ]}
    />
  ),
  afterOverview: (
    <CampaignLifecycle
      title="A paid campaign from setup to optimisation"
      note="Budget is not increased because a campaign is spending. It is increased when delivery data shows the additional spend reaches comparable audiences at a similar cost, and that evidence takes time to accumulate."
      phases={[
        {
          title: "Objective & tracking",
          text: "Define the outcome and verify that it can be measured before any spend.",
        },
        {
          title: "Audience strategy",
          text: "Cold, warm and retargeting audiences structured so each can be judged separately.",
        },
        {
          title: "Creative & copy",
          text: "Several variants per audience, so performance reflects the message rather than luck.",
        },
        {
          title: "Launch",
          text: "Controlled budgets, with delivery and tracking checked in the first days.",
        },
        {
          title: "Optimise",
          text: "Bids, budgets and audiences adjusted against data, not assumptions.",
        },
        {
          title: "Report",
          text: "Spend, delivery and outcomes reported together, including what did not work.",
        },
      ]}
    />
  ),
  afterProcess: (
    <CampaignLifecycle
      title="What active management does week to week"
      note="Paid advertising is distinct from organic social. Organic builds audience over time and cannot be accelerated by budget; paid buys reach now and stops when spend stops. Most businesses need a mix, but they are not interchangeable."
      phases={[
        {
          title: "Retargeting",
          text: "Reaching people who visited or engaged but did not convert, with a message that addresses why.",
        },
        {
          title: "Budget control",
          text: "Spend caps and pacing set so a campaign cannot consume more than was approved.",
        },
        {
          title: "Creative testing",
          text: "Rotating variants to find what holds attention rather than assuming one asset is right.",
        },
        {
          title: "Frequency",
          text: "Watching how often the same person sees an ad, and refreshing before it becomes noise.",
        },
        {
          title: "Pausing",
          text: "Stopping underperforming ad sets rather than letting them run out of habit.",
        },
        {
          title: "Reconciling",
          text: "Checking platform numbers against analytics, because they rarely agree exactly.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "No ROAS promises", text: "No agency can guarantee a return on ad spend." },
      { title: "Separate ad budget", text: "Media spend is billed by the platform, apart from our fee." },
      { title: "Tracking verified", text: "Conversions are checked before budget is committed." },
      { title: "Full spend visibility", text: "You can see spend and outcomes at platform level." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about Social Media Advertising",
  closing: {
    label: "Social Media Advertising",
    title: "Ready to grow with Social Media Advertising?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
