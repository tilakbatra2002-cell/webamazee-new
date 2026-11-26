import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry } from "@/lib/industries";
import { industryMetadata, industrySchema } from "@/lib/industry-seo";
import { JsonLd } from "@/components/seo/json-ld";
import { HealthcareSeoRedesign } from "@/components/industries/healthcare-seo-redesign";

export async function generateMetadata(): Promise<Metadata> {
  const industry = getIndustry("seo-for-healthcare");
  return industry ? industryMetadata(industry) : {};
}

export default function IndustryRoute() {
  const industry = getIndustry("seo-for-healthcare");
  if (!industry) notFound();
  return (
    <>
      <JsonLd data={industrySchema(industry)} />
      <HealthcareSeoRedesign industry={industry} />
    </>
  );
}
