import type { Metadata } from "next";
import { UaeWebDesign } from "@/components/uae-preview/uae-web-design";
import { uaePreviewMetadata } from "@/components/uae-preview/uae-shared";

export const metadata: Metadata = uaePreviewMetadata(
  "Website Design & Development in the UAE | Webamazee",
  "Plan a responsive business website, custom development, e-commerce build or careful redesign for your UAE audience with Webamazee.",
  "/web-designing-company-uae",
  ["website design UAE", "web development UAE", "ecommerce development UAE", "website redesign UAE"],
);

export default function NewUaeWebDesignPage() {
  return <UaeWebDesign />;
}
