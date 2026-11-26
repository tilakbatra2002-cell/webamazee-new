import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommercialLocationPage } from "@/lib/locations-commercial";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { PromotedLocationPage } from "@/components/locations/promoted-location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getCommercialLocationPage("ai-marketing-company-mohali");
  return page ? commercialLocationMetadata(page) : {};
}

export default function AiMarketingCompanyRoute() {
  const page = getCommercialLocationPage("ai-marketing-company-mohali");
  if (!page) notFound();
  return <PromotedLocationPage page={page} />;
}
