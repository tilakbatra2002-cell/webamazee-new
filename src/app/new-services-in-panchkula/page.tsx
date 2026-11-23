import type { Metadata } from "next";
import { PanchkulaHub } from "@/components/panchkula-preview/panchkula-hub";
import { panchkulaPreviewMetadata } from "@/components/panchkula-preview/panchkula-shared";

export const metadata: Metadata = panchkulaPreviewMetadata(
  "Digital Solutions for Panchkula Businesses | Webamazee",
  "Explore Webamazee website design, SEO, digital marketing and human-led AI-assisted marketing for Panchkula businesses and genuine Tricity service areas.",
  "/services-in-panchkula",
  ["digital services Panchkula", "web design Panchkula", "SEO services Panchkula", "digital marketing Panchkula", "AI marketing Panchkula"],
);

export default function NewPanchkulaServicesPage() {
  return <PanchkulaHub />;
}
