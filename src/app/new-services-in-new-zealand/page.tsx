import type { Metadata } from "next";
import { NzServicesHub } from "@/components/nz-preview/nz-services-hub";
import { nzPreviewMetadata } from "@/components/nz-preview/nz-shared";

export const metadata: Metadata = nzPreviewMetadata(
  "Digital Solutions for Growing Businesses Across New Zealand | Webamazee",
  "Explore Webamazee website design, SEO, digital marketing and human-led AI-assisted marketing for businesses serving New Zealand.",
  "/services-in-new-zealand",
  ["digital services New Zealand", "web design New Zealand", "SEO New Zealand", "digital marketing New Zealand", "AI marketing New Zealand"],
);

export default function NewZealandServicesPage() {
  return <NzServicesHub />;
}
