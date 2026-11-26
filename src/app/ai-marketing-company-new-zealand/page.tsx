import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntlCommercialLocationPage } from "@/lib/locations-commercial-intl";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { PromotedLocationPage } from "@/components/locations/promoted-location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntlCommercialLocationPage("ai-marketing-company-new-zealand");
  return page ? commercialLocationMetadata(page) : {};
}

export default function AiMarketingCompanyRoute() {
  const page = getIntlCommercialLocationPage("ai-marketing-company-new-zealand");
  if (!page) notFound();
  return <PromotedLocationPage page={page} />;
}
