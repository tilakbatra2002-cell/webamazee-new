import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommercialLocationPage } from "@/lib/locations-commercial";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { DigitalMarketingPageView } from "@/components/locations/digital-marketing-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getCommercialLocationPage("digital-marketing-company-bathinda");
  return page ? commercialLocationMetadata(page) : {};
}

export default function DigitalMarketingCompanyRoute() {
  const page = getCommercialLocationPage("digital-marketing-company-bathinda");
  if (!page) notFound();
  return <DigitalMarketingPageView page={page} />;
}
