import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { CampaignFunnel, ServicePositioning } from "@/components/services/seo/social-visuals-a";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "social-media-marketing";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/faq-strategy-studio.webp",
  heroImageAlt: "Campaign planning session mapping audience and messaging on paper",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why social effort stops paying",
      intro:
        "Posting without a campaign objective produces activity you cannot defend when someone asks what it achieved.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Campaign process",
      intro:
        "A campaign starts with a defined objective and audience, and ends with a report against that objective.",
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
      intro: "Campaign structure follows the buying journey in your market.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Research, creative and measurement tools used across a campaign.",
    },
    measurement: {
      eyebrow: "Measurement & reporting",
      intro:
        "Campaigns are reported against the objective set at the start. We do not claim reach or engagement figures translate into revenue without evidence.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <CampaignFunnel
      title="How social activity connects to revenue"
      note="The stages are not equally hard, and they are not equally controllable. Attention is the easiest to buy and the least valuable on its own, which is why we report each stage separately rather than presenting reach as a result."
      links={[
        {
          step: "Awareness",
          title: "Being seen",
          text: "Reach into an audience that has a reason to care about the problem you solve.",
        },
        {
          step: "Interest",
          title: "Earning a follow",
          text: "Content that gives people a reason to keep paying attention after the first impression.",
        },
        {
          step: "Consideration",
          title: "Building intent",
          text: "Answering objections and showing proof to people who are now evaluating options.",
        },
        {
          step: "Action",
          title: "Driving the click",
          text: "A clear, low-friction path to the website, enquiry form or booking page.",
        },
        {
          step: "Enquiry",
          title: "Capturing demand",
          text: "What happens after the click, which is where most social campaigns quietly lose value.",
        },
      ]}
    />
  ),
  afterOverview: (
    <ServicePositioning
      rows={[
        {
          service: "Social Media Management",
          focus: "Consistent publishing, community response and brand presence across your platforms",
          suited: "Businesses whose accounts are inactive or inconsistent",
        },
        {
          service: "Social Media Marketing",
          focus: "Organic and promotional campaigns tied to a specific objective",
          suited: "Businesses with a defined goal and an existing presence to build on",
        },
        {
          service: "Social Media Advertising",
          focus: "Paid campaigns with audience targeting, tracking and budget control",
          suited: "Businesses that need reach faster than organic content allows",
        },
      ]}
    />
  ),
  afterProcess: (
    <CampaignFunnel
      title="Five decisions every campaign makes"
      note="Each campaign stage is reported separately, so it is clear whether a shortfall came from reach, message or the page people landed on."
      links={[
        { step: "Objective", title: "What success means", text: "A named outcome agreed before any creative is produced." },
        { step: "Audience", title: "Who it is for", text: "A defined group with a shared problem, not everyone on the platform." },
        { step: "Message", title: "What it says", text: "One argument, tested against what the audience already believes." },
        { step: "Distribution", title: "Where it runs", text: "Organic, promoted or both, chosen to match the objective." },
        { step: "Measurement", title: "How it is judged", text: "Reported against the objective, including when it underperforms." },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Written objective", text: "Agreed before work begins, and used to judge the outcome." },
      { title: "Audience definition", text: "A specific group with a reason to care, not a broad demographic." },
      { title: "Creative testing", text: "More than one variant, so results are not an accident of one asset." },
      { title: "No vanity reporting", text: "Reach is reported, but never presented as a business result." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about Social Media Marketing",
  closing: {
    label: "Social Media Marketing",
    title: "Ready to grow with Social Media Marketing?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
