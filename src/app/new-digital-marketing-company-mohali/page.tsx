import type { Metadata } from "next";
import { MohaliDigital } from "@/components/mohali-preview/mohali-digital";
import { mohaliPreviewMetadata } from "@/components/mohali-preview/mohali-shared";

export const metadata: Metadata = mohaliPreviewMetadata(
  "Digital Marketing for Mohali Businesses | Webamazee",
  "A focused digital marketing mix for Mohali IT, startup and professional services businesses: search, paid media, content, conversion and clear measurement.",
  "/new-digital-marketing-company-mohali",
  [
    "digital marketing company Mohali",
    "digital marketing agency SAS Nagar",
    "B2B digital marketing Mohali",
    "paid media Mohali",
    "conversion optimisation Mohali",
  ],
);

export default function NewMohaliDigitalPage() {
  return <MohaliDigital />;
}
