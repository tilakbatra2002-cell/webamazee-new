import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationHubPage } from "@/components/locations/location-hub-page";
import { getLocationHub, locationHubMetadata } from "@/lib/location-hubs";

const slug = "services-in-chandigarh";

export function generateMetadata(): Metadata {
  const hub = getLocationHub(slug);
  return hub ? locationHubMetadata(hub) : {};
}

export default function Page() {
  const hub = getLocationHub(slug);
  if (!hub) notFound();
  return <LocationHubPage hub={hub} />;
}
