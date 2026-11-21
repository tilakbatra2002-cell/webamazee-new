import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { getLocationHub, locationHubSchema } from "@/lib/location-hubs";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { UkServicesRedesign } from "./uk-services-redesign";

const hub = getLocationHub("services-in-uk");

export const metadata: Metadata = hub
  ? buildMetadata({
      title: hub.title,
      metaTitle: hub.title,
      metaDescription: hub.metaDescription,
      canonical: "/services-in-uk",
      path: "/services-in-uk",
      keywords: [
        "services in UK",
        "web development UK",
        "SEO services UK",
        "digital marketing UK",
        "web design UK",
        "AI marketing UK",
      ],
      schemaType: "website",
      category: "Location Services",
      noindex: true,
      nofollow: true,
    })
  : {
      robots: { index: false, follow: false },
    };

export default function NewServicesInUkPage() {
  if (!hub) notFound();

  return (
    <>
      <JsonLd data={locationHubSchema(hub)} />
      <UkServicesRedesign hub={hub} />
    </>
  );
}
