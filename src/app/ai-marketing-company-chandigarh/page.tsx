import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommercialLocationPage } from "@/lib/locations-commercial";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { AiMarketingPageView } from "@/components/locations/ai-marketing-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getCommercialLocationPage("ai-marketing-company-chandigarh");
  return page ? commercialLocationMetadata(page) : {};
}

export default function AiMarketingCompanyRoute() {
  const page = getCommercialLocationPage("ai-marketing-company-chandigarh");
  if (!page) notFound();
  return <AiMarketingPageView page={page} />;
}
