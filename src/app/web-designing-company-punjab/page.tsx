import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationPage } from "@/lib/locations";
import { locationMetadata } from "@/lib/location-seo";
import { PromotedLocationPage } from "@/components/locations/promoted-location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getLocationPage("web-designing-company-punjab");
  return page ? locationMetadata(page) : {};
}

export default function LocationPageRoute() {
  const page = getLocationPage("web-designing-company-punjab");
  if (!page) notFound();
  return <PromotedLocationPage page={page} />;
}
