import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { B2BJourney, ProfileSplit } from "@/components/services/seo/social-visuals-b";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "linkedin-marketing";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/hero-growth-studio.webp",
  heroImageAlt: "Professional B2B content and profile planning workspace",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why LinkedIn stalls for B2B",
      intro:
        "Most B2B accounts publish occasionally and expect inbound. Authority on LinkedIn is built by showing up with something worth reading.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "Our process",
      intro:
        "Positioning first, then profile, content and engagement - because outreach without visibility is usually ignored.",
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
      intro: "LinkedIn suits considered, higher-value purchases with more than one decision-maker.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Research and publishing tools used across the B2B content cycle.",
    },
    measurement: {
      eyebrow: "Performance reporting",
      intro:
        "We report profile engagement, qualified conversations and referral activity. We do not promise a fixed number of connections, leads or meetings.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <B2BJourney
      title="Authority comes before the conversation"
      note="The sequence matters. Outreach that arrives before any visible expertise reads as a cold pitch, which is why content comes before connection requests rather than after."
      stages={[
        {
          title: "Visibility",
          text: "Your people publish something a decision-maker would find useful without needing to buy anything.",
        },
        {
          title: "Credibility",
          text: "Consistent, specific posts build a case that your team knows the subject in practice.",
        },
        {
          title: "Recognition",
          text: "Repeated exposure means a name and a face are familiar before any direct contact.",
        },
        {
          title: "Conversation",
          text: "Outreach lands warmer, because it references real work rather than arriving unprompted.",
        },
      ]}
    />
  ),
  afterOverview: (
    <ProfileSplit
      note="Both matter, and they carry different weight. The company page holds credibility; individual profiles carry reach, because people follow people far more readily than logos."
      company={[
        "Complete, consistent company information and description",
        "A content cadence that shows the business is active",
        "Product, service and hiring signals where relevant",
        "Consistent branding with the rest of your website",
        "A page that supports outreach rather than undermining it",
      ]}
      personal={[
        "Founder and team profiles written as people, not job titles",
        "Individual posts that carry the expertise of the business",
        "Commenting and engagement in relevant industry conversations",
        "A consistent voice that reflects how you actually speak",
        "A network built around the people who make decisions",
      ]}
    />
  ),
  afterProcess: (
    <B2BJourney
      title="How a B2B conversation actually starts"
      note="Outreach volume is deliberately modest. A small number of well-researched, relevant conversations is worth more than bulk connection requests, and avoids the account restrictions that follow automated outreach."
      stages={[
        {
          title: "Positioning",
          text: "What you are known for, and who specifically should know it.",
        },
        {
          title: "Content",
          text: "A publishing rhythm built around genuine expertise rather than reposted industry news.",
        },
        {
          title: "Engagement",
          text: "Commenting and contributing in the conversations your buyers already read.",
        },
        {
          title: "Conversations",
          text: "Direct, researched outreach to people who have already seen your work.",
        },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "No lead promises", text: "No agency controls how many meetings a buyer agrees to." },
      { title: "No automation", text: "Outreach is researched and written, not bulk-sent." },
      { title: "Human voice", text: "Content is edited to sound like your team, not a content farm." },
      { title: "Named authors", text: "You know whose profile is publishing, and they approve it." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about LinkedIn Marketing",
  closing: {
    label: "LinkedIn Marketing",
    title: "Ready to grow with LinkedIn Marketing?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
