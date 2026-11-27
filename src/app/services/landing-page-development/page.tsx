import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import {
  MergedServicePage,
  projectFromCaseStudy,
  type LinkItem,
  type MergedServiceExtras,
} from "@/components/services/merged-service-page";

const SLUG = "landing-page-development";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localWebsiteLinks: LinkItem[] = [
  {
    label: "Website Design in Zirakpur",
    href: "/web-designing-company-zirakpur",
    description: "Website and landing-page planning for Zirakpur businesses that need clearer enquiries.",
  },
  {
    label: "All Digital Services in Zirakpur",
    href: "/services-in-zirakpur",
    description: "The broader Zirakpur service hub for SEO, digital marketing and AI-assisted marketing.",
  },
];

const extras: MergedServiceExtras = {
  heroProject: projectFromCaseStudy("wellingtontours"),
  customQuote: {
    intro:
      "Every campaign has different goals. Get a landing page solution tailored to your business requirements.",
    note:
      "We will discuss your goals and requirements before agreeing the scope and pricing for your landing page. On the contact form, select Landing Page Development as your service.",
    includes: [
      "Campaign-matched design",
      "Responsive development",
      "Clear calls to action",
      "Lead capture and tracking setup",
    ],
  },
  projects: [
    projectFromCaseStudy("wellingtontours"),
    projectFromCaseStudy("kabiroilmill"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p)),
  projectsTitle: "Campaign-ready experiences we have built",
  projectsNote:
    "Website projects featuring clear offers and visitor journeys, shown as relevant examples rather than dedicated landing-page case studies.",
  localWebsiteLinks,
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <MergedServicePage service={service} extras={extras} />;
}
