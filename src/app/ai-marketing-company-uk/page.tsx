import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntlCommercialLocationPage } from "@/lib/locations-commercial-intl";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { AiMarketingPageView } from "@/components/locations/ai-marketing-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntlCommercialLocationPage("ai-marketing-company-uk");
  return page ? commercialLocationMetadata(page) : {};
}

export default function AiMarketingCompanyRoute() {
  const page = getIntlCommercialLocationPage("ai-marketing-company-uk");
  if (!page) notFound();
  return <AiMarketingPageView page={page} />;
}
