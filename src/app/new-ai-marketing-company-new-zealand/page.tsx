import type { Metadata } from "next";
import { NzAiMarketing } from "@/components/nz-preview/nz-ai-marketing";
import { nzPreviewMetadata } from "@/components/nz-preview/nz-shared";

export const metadata: Metadata = nzPreviewMetadata(
  "Human-Led AI Marketing for New Zealand Businesses | Webamazee",
  "Use human-led, AI-assisted research and content optimisation to support SEO and marketing workflows for your New Zealand business.",
  "/ai-marketing-company-new-zealand",
  ["AI marketing New Zealand", "AI SEO New Zealand", "AI content optimisation", "human-led AI marketing"],
);

export default function NewZealandAiMarketingPage() {
  return <NzAiMarketing />;
}
