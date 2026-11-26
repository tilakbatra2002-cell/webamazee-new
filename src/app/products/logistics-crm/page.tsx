import type { Metadata } from "next";
import { productEntry } from "@/data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getProduct } from "@/lib/products";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LogisticsRedesign } from "@/components/product/logistics-redesign";

const product = getProduct("logistics-crm")!;

export async function generateMetadata(): Promise<Metadata> {
  const entry = productEntry("logistics-crm");
  return entry ? buildMetadata(entry) : {};
}

export default function LogisticsCrmPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            slug: "logistics-crm",
            category: product.industry,
            features: product.capabilities.map((c) => c.title),
          }),
          breadcrumbSchema(
            [{ label: "Products", href: "/products" }, { label: product.shortName }],
            "/products/logistics-crm"
          ),
        ]}
      />
      <LogisticsRedesign product={product} />
    </>
  );
}
