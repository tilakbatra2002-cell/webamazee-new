import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocationHub, locationHubSchema } from "@/lib/location-hubs";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { UsaServicesRedesign } from "./usa-services-redesign";

const hub = getLocationHub("services-in-usa");

export const metadata: Metadata = hub
  ? buildMetadata({
      title: hub.title,
      metaTitle: hub.title,
      metaDescription: hub.metaDescription,
      canonical: "/services-in-usa",
      path: "/services-in-usa",
      keywords: [
        "services in USA",
        "web development USA",
        "SEO services USA",
        "digital marketing USA",
        "web design USA",
        "AI marketing USA",
      ],
      schemaType: "website",
      category: "Location Services",
      noindex: true,
      nofollow: true,
    })
  : {
      robots: { index: false, follow: false },
    };

export default function NewServicesInUsaPage() {
  if (!hub) notFound();

  return (
    <>
      <JsonLd data={locationHubSchema(hub)} />
      <UsaServicesRedesign hub={hub} />
    </>
  );
}
