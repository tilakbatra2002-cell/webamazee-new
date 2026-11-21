import type { Metadata } from "next";
import { NzDigitalMarketing } from "@/components/nz-preview/nz-digital-marketing";
import { nzPreviewMetadata } from "@/components/nz-preview/nz-shared";

export const metadata: Metadata = nzPreviewMetadata(
  "Digital Marketing for New Zealand Businesses | Webamazee",
  "Connect SEO, content, social media, landing pages and measurement in a practical digital marketing programme for your New Zealand business.",
  "/digital-marketing-company-new-zealand",
  ["digital marketing New Zealand", "social media marketing New Zealand", "content marketing New Zealand", "conversion optimisation New Zealand"],
);

export default function NewZealandDigitalMarketingPage() {
  return <NzDigitalMarketing />;
}
