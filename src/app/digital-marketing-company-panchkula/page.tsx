import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommercialLocationPage } from "@/lib/locations-commercial";
import { commercialLocationMetadata } from "@/lib/commercial-location-seo";
import { PromotedLocationPage } from "@/components/locations/promoted-location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getCommercialLocationPage("digital-marketing-company-panchkula");
  return page ? commercialLocationMetadata(page) : {};
}

export default function DigitalMarketingCompanyRoute() {
  const page = getCommercialLocationPage("digital-marketing-company-panchkula");
  if (!page) notFound();
  return <PromotedLocationPage page={page} />;
}
