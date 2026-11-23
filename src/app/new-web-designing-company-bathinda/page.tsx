import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocationPreview,
  fromLocationPage,
  metadataFromPage,
  getLocationPage,
} from "@/components/location-preview/location-preview";

const SOURCE_SLUG = "web-designing-company-bathinda";

export function generateMetadata(): Metadata {
  const source = getLocationPage(SOURCE_SLUG);
  return source ? metadataFromPage(source) : {};
}

export default function Page() {
  const source = getLocationPage(SOURCE_SLUG);
  if (!source) notFound();
  return <LocationPreview content={fromLocationPage(source)} />;
}
