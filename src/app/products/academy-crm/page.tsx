import type { Metadata } from "next";
import { productEntry } from "@/data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getProduct } from "@/lib/products";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { ProductDetailHero } from "@/components/product/product-detail-hero";
import { ProductProblem } from "@/components/product/product-problem";
import { ProductSolution } from "@/components/product/product-solution";
import { ProductFeatures } from "@/components/product/product-features";
import { ProductSuitableFor } from "@/components/product/product-suitable-for";
import { ProductTeam } from "@/components/product/product-team";
import { ProductMultiTenant } from "@/components/product/product-multi-tenant";
import { ProductFinalCta } from "@/components/product/product-final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const entry = productEntry("academy-crm");
  return entry ? buildMetadata(entry) : {};
}

export default function AcademyCrmPage() {
  const product = getProduct("academy-crm")!;

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            slug: product.slug,
            category: product.industry,
            features: product.capabilities.map((c) => c.title),
          }),
          breadcrumbSchema([{ label: "Products", href: "/products" }, { label: product.shortName }]),
        ]}
      />

      <ProductDetailHero product={product} />
      <ProductProblem product={product} />
      <ProductSolution product={product} />
      <ProductFeatures product={product} />
      {product.suitableFor && <ProductSuitableFor items={product.suitableFor} />}
      <ProductTeam product={product} />
      <ProductMultiTenant product={product} />
      <ProductFinalCta product={product} title="Ready to modernise your academy operations?" />
    </>
  );
}
