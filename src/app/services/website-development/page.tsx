import type { Metadata } from "next";
import { getService } from "@/lib/services";
import { getServiceSeo } from "@/lib/content-seo";
import {
  MergedServicePage,
  projectFromCaseStudy,
  type LinkItem,
  type MergedServiceExtras,
} from "@/components/services/merged-service-page";

const SLUG = "website-development";

export async function generateMetadata(): Promise<Metadata> {
  return getServiceSeo(SLUG)?.metadata ?? {};
}

const localWebsiteLinks: LinkItem[] = [
  {
    label: "Web Designing Company in Zirakpur",
    href: "/web-designing-company-zirakpur",
    description:
      "A dedicated page for Zirakpur businesses planning a new website, WordPress build, store or redesign.",
  },
  {
    label: "Website Design in Chandigarh",
    href: "/web-designing-company-chandigarh",
    description: "Website planning for businesses competing in Chandigarh and the wider Tricity.",
  },
  {
    label: "Website Development in Mohali",
    href: "/web-designing-company-mohali",
    description: "Web design and development support for Mohali technology, B2B and service businesses.",
  },
];

const extras: MergedServiceExtras = {
  heroProject: projectFromCaseStudy("wellingtontours"),
  qualityPoints: [
    { title: "Responsive design", text: "Layouts designed and reviewed for common screen sizes." },
    { title: "Clear navigation & UX", text: "An organised structure that helps visitors find what they need." },
    { title: "Performance-conscious development", text: "Page speed and Core Web Vitals considered during the build." },
    { title: "SEO-friendly structure", text: "Thoughtful page hierarchy and search foundations built into the project." },
    { title: "Conversion-focused layouts", text: "Clear content and next steps aligned with your business goals." },
    { title: "Room to evolve", text: "A considered architecture that can support your website as needs change." },
  ],
  projects: [
    projectFromCaseStudy("wellingtontours"),
    projectFromCaseStudy("americanlaobusinessassociation"),
    projectFromCaseStudy("shinegoldtours"),
  ].filter((p): p is NonNullable<typeof p> => Boolean(p)),
  projectsTitle: "Websites we have helped bring to life",
  projectsNote:
    "Three delivered projects, shown as real examples of the kind of websites we build. No traffic, revenue or ranking claims are attached to them.",
  localWebsiteLinks,
};

export default function Page() {
  const service = getService(SLUG);
  if (!service) return null;
  return <MergedServicePage service={service} extras={extras} />;
}
