import type { Metadata } from "next";
import { productEntry } from "@/data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { ProductHero } from "@/components/product/lead-management-system/product-hero";
import { ProductProblem } from "@/components/product/lead-management-system/product-problem";
import { ProductSolution } from "@/components/product/lead-management-system/product-solution";
import { ProductFeatures } from "@/components/product/lead-management-system/product-features";
import { ProductAgencyFeatures } from "@/components/product/lead-management-system/product-agency-features";
import { ProductPipeline } from "@/components/product/lead-management-system/product-pipeline";
import { ProductLeadIntelligence } from "@/components/product/lead-management-system/product-lead-intelligence";
import { ProductAnalytics } from "@/components/product/lead-management-system/product-analytics";
import { ProductWorkflow } from "@/components/product/lead-management-system/product-workflow";
import { ProductAudience } from "@/components/product/lead-management-system/product-audience";
import { ProductCTA } from "@/components/product/lead-management-system/product-cta";

export async function generateMetadata(): Promise<Metadata> {
  const entry = productEntry("lead-management-system");
  return entry ? buildMetadata(entry) : {};
}

export default function LeadManagementSystemPage() {
  return (
    <>
      <ProductHero />
      <ProductProblem />
      <ProductSolution />
      <ProductFeatures />
      <ProductAgencyFeatures />
      <ProductPipeline />
      <ProductLeadIntelligence />
      <ProductAnalytics />
      <ProductWorkflow />
      <ProductAudience />
      <ProductCTA />
    </>
  );
}
