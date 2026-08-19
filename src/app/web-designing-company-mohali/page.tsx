import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationPage } from "@/lib/locations";
import { locationMetadata } from "@/lib/location-seo";
import { LocationPageView } from "@/components/locations/location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getLocationPage("web-designing-company-mohali");
  return page ? locationMetadata(page) : {};
}

export default function LocationPageRoute() {
  const page = getLocationPage("web-designing-company-mohali");
  if (!page) notFound();
  return <LocationPageView page={page} />;
}
