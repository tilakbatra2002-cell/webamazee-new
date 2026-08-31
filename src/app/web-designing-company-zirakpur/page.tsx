import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationPage } from "@/lib/locations";
import { locationMetadata } from "@/lib/location-seo";
import { LocationPageView } from "@/components/locations/location-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = getLocationPage("web-designing-company-zirakpur");
  if (!page) return {};
  const meta = locationMetadata(page);
  // This page's title already ends with the brand ("… – Webamazee"), so use an
  // absolute title to avoid the root template appending a second "| Webamazee".
  return { ...meta, title: { absolute: page.metaTitle } };
}

export default function LocationPageRoute() {
  const page = getLocationPage("web-designing-company-zirakpur");
  if (!page) notFound();
  return <LocationPageView page={page} />;
}
