import type { Metadata } from "next";
import { MohaliHub } from "@/components/mohali-preview/mohali-hub";
import { mohaliPreviewMetadata } from "@/components/mohali-preview/mohali-shared";

export const metadata: Metadata = mohaliPreviewMetadata(
  "Digital Services for Mohali Businesses | Webamazee",
  "Website design, SEO, digital marketing and human-led AI-assisted marketing for Mohali and SAS Nagar businesses, with a clear starting point for each.",
  "/new-services-in-mohali",
  [
    "digital services Mohali",
    "web design Mohali",
    "SEO services Mohali",
    "digital marketing Mohali",
    "AI marketing Mohali",
  ],
);

export default function NewMohaliServicesPage() {
  return <MohaliHub />;
}
