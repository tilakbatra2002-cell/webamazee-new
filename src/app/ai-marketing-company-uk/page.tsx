import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntlCommercialLocationPage } from "@/lib/locations-commercial-intl";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { PromotedLocationPage } from "@/components/locations/promoted-location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntlCommercialLocationPage("ai-marketing-company-uk");
  return page ? commercialLocationMetadata(page) : {};
}

export default function AiMarketingCompanyRoute() {
  const page = getIntlCommercialLocationPage("ai-marketing-company-uk");
  if (!page) notFound();
  return <PromotedLocationPage page={page} />;
}
