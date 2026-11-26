import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry } from "@/lib/industries";
import { industryMetadata, industrySchema } from "@/lib/industry-seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ProfessionalServicesSeoRedesign } from "@/components/industries/professional-services-seo-redesign";

export async function generateMetadata(): Promise<Metadata> {
  const industry = getIndustry("seo-for-professional-services");
  return industry ? industryMetadata(industry) : {};
}

export default function IndustryRoute() {
  const industry = getIndustry("seo-for-professional-services");
  if (!industry) notFound();
  return (
    <>
      <JsonLd data={industrySchema(industry)} />
      <ProfessionalServicesSeoRedesign industry={industry} />
    </>
  );
}
