import type { Metadata } from "next";
import { NzSeo } from "@/components/nz-preview/nz-seo";
import { nzPreviewMetadata } from "@/components/nz-preview/nz-shared";

export const metadata: Metadata = nzPreviewMetadata(
  "SEO Services for New Zealand Businesses | Webamazee",
  "Technical SEO, on-page improvements, content optimisation and search strategy for New Zealand businesses, with practical priorities and no ranking guarantees.",
  "/seo-services-new-zealand",
  ["SEO services New Zealand", "technical SEO New Zealand", "local SEO New Zealand", "e-commerce SEO New Zealand", "SEO content optimisation"],
);

export default function NewZealandSeoPage() {
  return <NzSeo />;
}
