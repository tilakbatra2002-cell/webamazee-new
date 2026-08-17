import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry } from "@/lib/industries";
import { industryMetadata } from "@/lib/industry-seo";
import { IndustryPage } from "@/components/industries/industry-page";

export async function generateMetadata(): Promise<Metadata> {
  const industry = getIndustry("seo-for-professional-services");
  return industry ? industryMetadata(industry) : {};
}

export default function IndustryRoute() {
  const industry = getIndustry("seo-for-professional-services");
  if (!industry) notFound();
  return <IndustryPage industry={industry} />;
}
