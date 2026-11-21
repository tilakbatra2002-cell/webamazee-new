import type { Metadata } from "next";
import { UaeServicesHub } from "@/components/uae-preview/uae-services-hub";
import { uaePreviewMetadata } from "@/components/uae-preview/uae-shared";

export const metadata: Metadata = uaePreviewMetadata(
  "Digital Solutions for Ambitious Businesses in the UAE | Webamazee",
  "Explore Webamazee website design, SEO, digital marketing and human-led AI marketing services for businesses serving the UAE.",
  "/services-in-uae",
  ["UAE digital services", "web design UAE", "SEO UAE", "digital marketing UAE", "AI marketing UAE"],
);

export default function NewUaeServicesPage() {
  return <UaeServicesHub />;
}
