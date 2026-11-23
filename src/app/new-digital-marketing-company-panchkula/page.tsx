import type { Metadata } from "next";
import { PanchkulaDigital } from "@/components/panchkula-preview/panchkula-digital";
import { panchkulaPreviewMetadata } from "@/components/panchkula-preview/panchkula-shared";

export const metadata: Metadata = panchkulaPreviewMetadata(
  "Digital Marketing for Panchkula Businesses | Webamazee",
  "Connect SEO, content, social media, landing pages and measurement in a practical digital marketing programme for Panchkula businesses.",
  "/digital-marketing-company-panchkula",
  ["digital marketing Panchkula", "social media marketing Panchkula", "content marketing Panchkula", "conversion optimisation Panchkula"],
);

export default function NewPanchkulaDigitalMarketingPage() {
  return <PanchkulaDigital />;
}
