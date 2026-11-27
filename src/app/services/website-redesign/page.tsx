import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import {
  MergedServicePage,
  projectFromCaseStudy,
  type LinkItem,
  type MergedServiceExtras,
} from "@/components/services/merged-service-page";

const SLUG = "website-redesign";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localWebsiteLinks: LinkItem[] = [
  {
    label: "Website Redesign for Zirakpur Businesses",
    href: "/web-designing-company-zirakpur",
    description:
      "A focused page covering redesign, mobile experience, trust signals and enquiry paths for Zirakpur.",
  },
  {
    label: "Web Design in Panchkula",
    href: "/web-designing-company-panchkula",
    description: "A nearby Tricity page for businesses where Panchkula intent is more relevant.",
  },
];

const extras: MergedServiceExtras = {
  heroProject: projectFromCaseStudy("americanlaobusinessassociation"),
  problemCards: [
    { title: "Outdated design", text: "Your website no longer reflects your brand." },
    { title: "Poor mobile experience", text: "Visitors struggle to browse on mobile devices." },
    { title: "Confusing navigation", text: "Important information and services are difficult to find." },
    { title: "Slow performance", text: "Website speed and usability need improvement." },
    { title: "Weak enquiry journey", text: "Visitors struggle to find or take the next step." },
    { title: "Hard-to-update content", text: "Simple content changes take more effort than they should." },
  ],
  projects: [
    projectFromCaseStudy("americanlaobusinessassociation"),
    projectFromCaseStudy("shinegoldtours"),
    projectFromCaseStudy("wellingtontours"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p)),
  projectsTitle: "Redesign projects we have delivered",
  projectsNote:
    "Genuine redesign and website projects. Presented without traffic, revenue or conversion claims.",
  localWebsiteLinks,
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <MergedServicePage service={service} extras={extras} />;
}
