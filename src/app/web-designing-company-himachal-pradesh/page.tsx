import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationPage } from "@/lib/locations";
import { locationMetadata } from "@/lib/location-seo";
import { LocationPageView } from "@/components/locations/location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getLocationPage("web-designing-company-himachal-pradesh");
  return page ? locationMetadata(page) : {};
}

export default function LocationPageRoute() {
  const page = getLocationPage("web-designing-company-himachal-pradesh");
  if (!page) notFound();
  return <LocationPageView page={page} />;
}
