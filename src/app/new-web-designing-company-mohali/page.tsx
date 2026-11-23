import type { Metadata } from "next";
import { MohaliWeb } from "@/components/mohali-preview/mohali-web";
import { mohaliPreviewMetadata } from "@/components/mohali-preview/mohali-shared";

export const metadata: Metadata = mohaliPreviewMetadata(
  "Website Design & Development for Mohali Businesses | Webamazee",
  "Responsive website design, custom development, e-commerce builds and careful redesigns for Mohali technology, B2B and service businesses.",
  "/new-web-designing-company-mohali",
  [
    "web designing company Mohali",
    "website design Mohali",
    "website development Mohali",
    "e-commerce website Mohali",
    "website redesign Mohali",
  ],
);

export default function NewMohaliWebPage() {
  return <MohaliWeb />;
}
