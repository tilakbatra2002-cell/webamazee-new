import type { Metadata } from "next";
import { MohaliSeo } from "@/components/mohali-preview/mohali-seo";
import { mohaliPreviewMetadata } from "@/components/mohali-preview/mohali-shared";

export const metadata: Metadata = mohaliPreviewMetadata(
  "SEO Services for Mohali Businesses | Webamazee",
  "Technical, on-page and local SEO with content planning and earned authority for Mohali businesses. Documented process, white-hat work, no ranking guarantees.",
  "/new-seo-services-mohali",
  [
    "SEO services Mohali",
    "local SEO Mohali",
    "technical SEO Mohali",
    "SEO company SAS Nagar",
    "Tricity SEO",
  ],
);

export default function NewMohaliSeoPage() {
  return <MohaliSeo />;
}
