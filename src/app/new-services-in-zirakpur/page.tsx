import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocationPreview,
  fromHub,
  metadataFromHub,
  locationHubs,
} from "@/components/location-preview/location-preview";

const SOURCE_SLUG = "services-in-zirakpur";

function hub() {
  return locationHubs.find((h) => h.slug === SOURCE_SLUG) ?? null;
}

export function generateMetadata(): Metadata {
  const source = hub();
  return source ? metadataFromHub(source) : {};
}

export default function Page() {
  const source = hub();
  if (!source) notFound();
  const routes = {
    web: `/new-web-designing-company-${SOURCE_SLUG.replace("services-in-", "")}`,
    seo: `/new-seo-services-${SOURCE_SLUG.replace("services-in-", "")}`,
    digital: `/new-digital-marketing-company-${SOURCE_SLUG.replace("services-in-", "")}`,
    ai: `/new-ai-marketing-company-${SOURCE_SLUG.replace("services-in-", "")}`,
  };
  return <LocationPreview content={fromHub(source, routes)} />;
}
