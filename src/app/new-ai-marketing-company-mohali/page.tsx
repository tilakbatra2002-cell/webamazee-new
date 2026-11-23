import type { Metadata } from "next";
import { MohaliAi } from "@/components/mohali-preview/mohali-ai";
import { mohaliPreviewMetadata } from "@/components/mohali-preview/mohali-shared";

export const metadata: Metadata = mohaliPreviewMetadata(
  "Human-Led AI Marketing for Mohali Businesses | Webamazee",
  "AI-assisted research, drafting and analysis with human strategy, factual checks and final approval. A clearly documented division of labour for Mohali businesses.",
  "/new-ai-marketing-company-mohali",
  [
    "AI marketing company Mohali",
    "AI SEO Mohali",
    "AI content optimisation",
    "human-led AI marketing",
    "AI marketing workflow",
  ],
);

export default function NewMohaliAiPage() {
  return <MohaliAi />;
}
