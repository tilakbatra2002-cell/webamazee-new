import type { Metadata } from "next";
import { UaeAiMarketing } from "@/components/uae-preview/uae-ai-marketing";
import { uaePreviewMetadata } from "@/components/uae-preview/uae-shared";

export const metadata: Metadata = uaePreviewMetadata(
  "Human-Led AI Marketing for UAE Businesses | Webamazee",
  "Use human-led, AI-assisted research and content optimization to support SEO and marketing workflows for your UAE business.",
  "/ai-marketing-company-uae",
  ["AI marketing UAE", "AI SEO UAE", "AI content optimization", "human-led AI marketing"],
);

export default function NewUaeAiMarketingPage() {
  return <UaeAiMarketing />;
}
