import type { Metadata } from "next";
import { PanchkulaAi } from "@/components/panchkula-preview/panchkula-ai";
import { panchkulaPreviewMetadata } from "@/components/panchkula-preview/panchkula-shared";

export const metadata: Metadata = panchkulaPreviewMetadata(
  "Human-Led AI Marketing for Panchkula Businesses | Webamazee",
  "Use human-led, AI-assisted research, SEO and content optimisation to support marketing workflows for Panchkula businesses.",
  "/ai-marketing-company-panchkula",
  ["AI marketing Panchkula", "AI SEO Panchkula", "AI content optimisation", "human-led AI marketing"],
);

export default function NewPanchkulaAiMarketingPage() {
  return <PanchkulaAi />;
}
