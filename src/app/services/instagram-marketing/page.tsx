import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { InstagramFormats, InstagramPlanningFlow } from "@/components/services/seo/social-visuals-a";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "instagram-marketing";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-ecommerce.webp",
  heroImageAlt: "Visual content production for Instagram, shot and prepared across devices",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why Instagram plateaus",
      intro:
        "Accounts stall when content is posted without a plan, or when the plan never changes despite the results.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our process",
      intro:
        "Profile, content, publishing and engagement, reviewed monthly rather than left on a schedule.",
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
      intro: "Instagram suits visual categories best, though the content angle changes by sector.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Capture, editing and scheduling tools used across the content cycle.",
    },
    measurement: {
      eyebrow: "Insights & reporting",
      intro:
        "We report profile actions, content engagement and enquiry activity against your baseline. We do not promise reach, follower counts or viral outcomes.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <InstagramFormats
      title="Feed, Reels and Stories do different work"
      note="Follower counts are a weak measure of Instagram performance. A smaller, relevant audience that saves, shares and enquires is worth more than a large passive one, so that is what we report against."
      formats={[
        {
          name: "Reels",
          job: "Discovery",
          text: "Reaching people who do not follow you yet. The main route to new audience on the platform.",
        },
        {
          name: "Feed posts",
          job: "Credibility",
          text: "What someone sees when they check whether your account is worth following.",
        },
        {
          name: "Stories",
          job: "Relationship",
          text: "Staying present with people who already follow you, through polls, replies and daily updates.",
        },
        {
          name: "Profile & highlights",
          job: "Conversion",
          text: "Turning a curious visitor into a follower, a message or an enquiry.",
        },
      ]}
    />
  ),
  afterOverview: (
    <InstagramPlanningFlow
      steps={[
        { title: "Theme & angles", text: "A monthly theme, broken into content angles that differ from last month." },
        { title: "Capture", text: "Footage and photography gathered in batches rather than on the day of posting." },
        { title: "Edit", text: "Cuts, captions and cover frames prepared consistently for the grid and for Reels." },
        { title: "Schedule", text: "Published to a plan, with room for reactive content when something is worth posting." },
        { title: "Review", text: "Saves, shares and replies show which angles earned attention, feeding next month." },
      ]}
    />
  ),
  afterProcess: (
    <InstagramFormats
      title="What each part of the profile is for"
      note="Content is planned against what the platform rewards, not against what is quickest to produce. If a format is not working for your audience, we say so and change it rather than repeating it."
      formats={[
        {
          name: "Reels strategy",
          job: "Reach",
          text: "Hooks, pacing and first frames, tested across several angles before repeating a format.",
        },
        {
          name: "Feed & grid",
          job: "Presentation",
          text: "A coherent visual identity so the profile reads as one brand, not a collection of posts.",
        },
        {
          name: "Captions",
          job: "Context",
          text: "Written for the people reading, with calls to action that suit the format rather than repeating one line.",
        },
        {
          name: "Hashtags",
          job: "Discovery",
          text: "Relevant tags researched per post. Volume is not treated as a substitute for relevance.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "No growth promises", text: "No account can guarantee reach, followers or virality." },
      { title: "Content calendar", text: "You can see what is planned before it publishes." },
      { title: "Batched production", text: "Content is captured ahead of time so posting does not slip." },
      { title: "Honest insight", text: "If a format underperforms, the report says so and the plan changes." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about Instagram Marketing",
  closing: {
    label: "Instagram Marketing",
    title: "Ready to grow with Instagram Marketing?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
