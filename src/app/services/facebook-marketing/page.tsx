import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { AudienceSegmentation, LeadJourney } from "@/components/services/seo/social-visuals-b";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "facebook-marketing";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/product-lead-workspace.webp",
  heroImageAlt: "Lead pipeline workspace showing enquiries moving from first contact to closed",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why Facebook underdelivers",
      intro:
        "Facebook campaigns usually fail for one of two reasons: the wrong audience, or no plan for what happens after the click.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our process",
      intro:
        "Audience definition, presence, targeting and capture - with the follow-up path agreed before launch.",
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
      intro: "Facebook performs best where a local audience and a clear enquiry path exist.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Campaign, capture and measurement tools used across the lead path.",
    },
    measurement: {
      eyebrow: "Performance reporting",
      intro:
        "We report audience relevance, captured enquiries and where they came from. We do not promise a fixed cost per lead or a set number of enquiries.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <LeadJourney
      title="The path from audience to lead"
      note="A campaign that generates clicks but no replies has failed regardless of what the platform reports. We check the follow-up path — who responds, how quickly, and what they say — before scaling spend."
      steps={[
        {
          step: "Target",
          title: "Define the audience",
          text: "Location, interest and behaviour layers chosen for relevance to what you sell.",
        },
        {
          step: "Reach",
          title: "Put it in front of them",
          text: "Creative built for the placement it appears in, not reused across every format.",
        },
        {
          step: "Click",
          title: "Give a reason to act",
          text: "A specific offer or message that makes the next step obvious.",
        },
        {
          step: "Capture",
          title: "Make contact easy",
          text: "A form or message path short enough that people actually complete it.",
        },
        {
          step: "Follow up",
          title: "Respond properly",
          text: "A named person replies within an agreed time, with a process for what happens next.",
        },
      ]}
    />
  ),
  afterOverview: (
    <AudienceSegmentation
      note="Audience size is not the same as audience quality. A smaller, well-defined group that converts is usually worth more than a broad one that does not, which is why we test layers rather than defaulting to the widest reach."
      segments={[
        {
          title: "Location",
          text: "Radius or named areas, matched to where you can actually serve customers.",
          example: "e.g. a defined radius around a service area",
        },
        {
          title: "Interests & behaviour",
          text: "Signals that suggest someone has the problem you solve, not just a demographic match.",
          example: "e.g. pages followed, purchase behaviour",
        },
        {
          title: "Custom audiences",
          text: "Built from your own customer list or site visitors, where consent and data allow.",
          example: "e.g. existing enquiries, site visitors",
        },
        {
          title: "Retargeting",
          text: "Reaching people who already interacted but did not convert the first time.",
          example: "e.g. page engagers, form starters",
        },
      ]}
    />
  ),
  afterProcess: (
    <LeadJourney
      title="From page presence to qualified enquiry"
      note="Lead quality is reviewed alongside lead volume. If enquiries arrive but do not match what you can serve, that is treated as a targeting problem and corrected — not reported as a success."
      steps={[
        {
          step: "Page",
          title: "Establish the presence",
          text: "A page that looks credible enough for someone to message or enquire.",
        },
        {
          step: "Campaign",
          title: "Build by objective",
          text: "Structure chosen for awareness or enquiries, with the objective driving the setup.",
        },
        {
          step: "Creative",
          title: "Content that fits",
          text: "Copy and visuals written for the specific audience being targeted.",
        },
        {
          step: "Local",
          title: "Reach the right area",
          text: "Location settings matched to where you operate and can deliver.",
        },
        {
          step: "Report",
          title: "Close the loop",
          text: "Enquiries reported back against what actually became a conversation.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "No reach promises", text: "Organic reach and ad delivery are decided by the platform." },
      { title: "Defined service area", text: "Targeting matches where you can actually deliver." },
      { title: "Agreed response path", text: "Someone owns follow-up, and the timing is agreed up front." },
      { title: "Quality over volume", text: "We would rather report fewer, relevant enquiries." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about Facebook Marketing",
  closing: {
    label: "Facebook Marketing",
    title: "Ready to grow with Facebook Marketing?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
