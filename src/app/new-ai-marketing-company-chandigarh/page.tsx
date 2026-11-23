import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  LocationPreview,
  fromCommercialPage,
  metadataFromCommercial,
  getCommercialLocationPage,
} from "@/components/location-preview/location-preview";

const SOURCE_SLUG = "ai-marketing-company-chandigarh";

export function generateMetadata(): Metadata {
  const source = getCommercialLocationPage(SOURCE_SLUG);
  return source ? metadataFromCommercial(source) : {};
}

export default function Page() {
  const source = getCommercialLocationPage(SOURCE_SLUG);
  if (!source) notFound();
  return <LocationPreview content={fromCommercialPage(source)} />;
}
