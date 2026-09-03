import type { Metadata } from "next";
import { staticMetadata } from "@/lib/static-pages";
import { PageHero } from "@/components/layout/page-hero";
import { PricingCatalog } from "@/components/pricing/pricing-catalog";

export const metadata: Metadata = staticMetadata("pricing");

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Flexible Digital Solutions"
        highlight="for Every Stage of Your Business"
        subtitle="Choose the service and package that fits your goals. From websites and SEO to AI-powered search optimization and social media marketing, Webamazee provides solutions built around your business."
        crumbs={[{ label: "Pricing" }]}
      />
      <PricingCatalog />
    </>
  );
}
