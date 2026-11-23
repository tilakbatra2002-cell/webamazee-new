import type { Metadata } from "next";
import { PanchkulaSeo } from "@/components/panchkula-preview/panchkula-seo";
import { panchkulaPreviewMetadata } from "@/components/panchkula-preview/panchkula-shared";

export const metadata: Metadata = panchkulaPreviewMetadata(
  "SEO Services for Panchkula Businesses | Webamazee",
  "Technical, on-page and local SEO, content optimisation and ethical link strategy for Panchkula businesses—with clear priorities and no ranking guarantees.",
  "/seo-services-panchkula",
  ["SEO services Panchkula", "local SEO Panchkula", "technical SEO Panchkula", "e-commerce SEO Panchkula", "Tricity SEO"],
);

export default function NewPanchkulaSeoPage() {
  return <PanchkulaSeo />;
}
