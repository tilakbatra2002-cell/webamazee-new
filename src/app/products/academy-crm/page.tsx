import type { Metadata } from "next";
import { productEntry } from "@/data";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getProduct } from "@/lib/products";
import { productSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { AcademyRedesign } from "@/components/product/academy-redesign";

const product = getProduct("academy-crm")!;

export async function generateMetadata(): Promise<Metadata> {
  const entry = productEntry("academy-crm");
  return entry ? buildMetadata(entry) : {};
}

export default function AcademyCrmPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            slug: "academy-crm",
            category: product.industry,
            features: product.capabilities.map((c) => c.title),
          }),
          breadcrumbSchema(
            [{ label: "Products", href: "/products" }, { label: product.shortName }],
            "/products/academy-crm"
          ),
        ]}
      />
      <AcademyRedesign product={product} />
    </>
  );
}
