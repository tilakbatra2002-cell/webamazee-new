import type { Metadata } from "next";
import { NzWebDesign } from "@/components/nz-preview/nz-web-design";
import { nzPreviewMetadata } from "@/components/nz-preview/nz-shared";

export const metadata: Metadata = nzPreviewMetadata(
  "Website Design & Development in New Zealand | Webamazee",
  "Plan a responsive business website, e-commerce build, custom development or careful redesign for your New Zealand customers with Webamazee.",
  "/web-designing-company-new-zealand",
  ["website design New Zealand", "web development New Zealand", "e-commerce development New Zealand", "website redesign New Zealand"],
);

export default function NewZealandWebDesignPage() {
  return <NzWebDesign />;
}
