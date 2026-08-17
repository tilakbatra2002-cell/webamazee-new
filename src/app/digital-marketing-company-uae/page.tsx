import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntlCommercialLocationPage } from "@/lib/locations-commercial-intl";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { DigitalMarketingPageView } from "@/components/locations/digital-marketing-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getIntlCommercialLocationPage("digital-marketing-company-uae");
  return page ? commercialLocationMetadata(page) : {};
}

export default function DigitalMarketingCompanyRoute() {
  const page = getIntlCommercialLocationPage("digital-marketing-company-uae");
  if (!page) notFound();
  return <DigitalMarketingPageView page={page} />;
}
