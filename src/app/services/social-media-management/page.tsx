import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import { SeoServiceShell, type SeoPageVariants } from "@/components/services/seo/seo-service-shell";
import { ContentCalendarMock, ManagementVsCampaign } from "@/components/services/seo/social-visuals-a";
import { SocialClusterBlock } from "@/components/services/seo/social-cluster";

const SLUG = "social-media-management";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const variants: SeoPageVariants = {
  heroImage: "/images/custom/service-landing-pages.webp",
  heroImageAlt: "Social media content planning and scheduling workspace",
  secondaryHref: "/free-seo-audit",
  secondaryLabel: "Get a free audit",
  headings: {
    problems: {
      eyebrow: "Why social accounts go quiet",
      intro:
        "Almost every stalled social account fails for the same reason: nobody owns it consistently.",
    },
    overview: { eyebrow: "Service overview" },
    whyMatters: { eyebrow: "Why it matters" },
    process: {
      eyebrow: "How a month runs",
      intro:
        "Planning, production, publishing and engagement follow a monthly rhythm so nothing depends on finding spare time.",
    },
    included: {
      eyebrow: "What's included",
      intro: "Clear deliverables and responsibilities - so you know what we handle and what we need from you.",
    },
    whyChoose: {
      eyebrow: "Why Webamazee",
      intro: "Here is what makes working with us different.",
    },
    industries: {
      eyebrow: "Industries",
      intro: "The right platforms differ by sector and by where your customers actually spend time.",
    },
    tools: {
      eyebrow: "Platforms & tools",
      intro: "Scheduling and design tools, used to keep publishing reliable.",
    },
    measurement: {
      eyebrow: "Reporting",
      intro:
        "We report what was published, what audience responded and what referred traffic arrived. We do not report growth figures that cannot be traced to a source.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      intro: "Real reviews from our Google Business Profile.",
    },
    faqEyebrow: "FAQ",
  },
  afterHero: (
    <ContentCalendarMock
      title="How a managed month is planned"
      note="A representative planning month, not a client result."
      weeks={[
        { label: "Week 1", cells: ["Profile audit", "Content theme", "Publish", "Community"] },
        { label: "Week 2", cells: ["Shoot / design", "Publish", "Publish", "Community"] },
        { label: "Week 3", cells: ["Publish", "Publish", "Engage", "Monthly review"] },
        { label: "Week 4", cells: ["Report", "Plan next month", "Approve", "Publish"] },
      ]}
      legend={[
        { label: "Planning", tone: "slate" },
        { label: "Publishing", tone: "blue" },
        { label: "Review", tone: "ink" },
      ]}
    />
  ),
  afterOverview: (
    <ManagementVsCampaign
      note="Both are useful, but they answer different questions and are priced differently. If you are comparing proposals, check which one you have actually been quoted for."
      managed={[
        "An ongoing monthly retainer covering planning, publishing and response",
        "Consistency across the platforms you already use",
        "Community management and reply handling on a defined schedule",
        "Monthly reporting on publishing, engagement and referrals",
        "Brand consistency across every profile you operate",
      ]}
      campaign={[
        "A defined objective with a start and an end date",
        "Audience research and a specific message to a specific group",
        "Creative built to move people towards a named action",
        "Performance testing between creative variants",
        "Reported against the campaign objective, not posting volume",
      ]}
    />
  ),
  afterProcess: (
    <ContentCalendarMock
      title="Who does what, month to month"
      note="Deliverables and responsibilities are fixed before the first month starts."
      weeks={[
        { label: "We handle", cells: ["Strategy", "Calendar", "Design & copy", "Publishing"] },
        { label: "We handle", cells: ["Scheduling", "Replies", "Monitoring", "Reporting"] },
        { label: "You provide", cells: ["Brand assets", "Product access", "Updates", "Approvals"] },
        { label: "You receive", cells: ["Monthly plan", "Content preview", "Performance report", "Next-month brief"] },
      ]}
      legend={[
        { label: "Ours", tone: "blue" },
        { label: "Yours", tone: "slate" },
        { label: "Shared", tone: "ink" },
      ]}
    />
  ),
  commitmentNote: {
    label: "How we work",
    title: "What every engagement includes",
    items: [
      { title: "Defined platforms", text: "We agree which accounts we manage and which we do not." },
      { title: "Approval step", text: "You see the month ahead before it publishes, unless you prefer otherwise." },
      { title: "Named contact", text: "A consistent person owns your account, not a rotating queue." },
      { title: "Honest reporting", text: "We show what changed and what stayed flat." },
    ],
  },
  cluster: <SocialClusterBlock currentSlug={SLUG} />,
  faqLabel: "Questions about Social Media Management",
  closing: {
    label: "Social Media Management",
    title: "Ready to grow with Social Media Management?",
    subtitle: "Get a free audit and a personalised strategy - no obligation.",
  },
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <SeoServiceShell service={service} variants={variants} />;
}
