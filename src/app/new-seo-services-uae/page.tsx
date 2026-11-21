import type { Metadata } from "next";
import { UaeSeo } from "@/components/uae-preview/uae-seo";
import { uaePreviewMetadata } from "@/components/uae-preview/uae-shared";

export const metadata: Metadata = uaePreviewMetadata(
  "SEO Services for UAE Businesses | Webamazee",
  "Technical SEO, on-page improvements, content optimization and search strategy for UAE businesses, with clear priorities and no ranking guarantees.",
  "/seo-services-uae",
  ["SEO services UAE", "technical SEO UAE", "local SEO UAE", "ecommerce SEO UAE", "SEO content optimization"],
);

export default function NewUaeSeoPage() {
  return <UaeSeo />;
}
