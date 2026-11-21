import type { Metadata } from "next";
import { UaeDigitalMarketing } from "@/components/uae-preview/uae-digital-marketing";
import { uaePreviewMetadata } from "@/components/uae-preview/uae-shared";

export const metadata: Metadata = uaePreviewMetadata(
  "Digital Marketing for UAE Businesses | Webamazee",
  "Connect SEO, content, social marketing, landing pages and measurement into a clear digital marketing plan for your UAE business.",
  "/digital-marketing-company-uae",
  ["digital marketing UAE", "social media marketing UAE", "content marketing UAE", "conversion optimization UAE"],
);

export default function NewUaeDigitalMarketingPage() {
  return <UaeDigitalMarketing />;
}
