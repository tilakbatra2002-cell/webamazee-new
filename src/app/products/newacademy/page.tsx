import type { Metadata } from "next";
import { getProduct } from "@/lib/products";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import { AcademyRedesign } from "./academy-redesign";

const product = getProduct("academy-crm")!;
const pageUrl = `${site.url}/products/newacademy`;

export const metadata: Metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  keywords: product.metaKeywords,
  alternates: { canonical: pageUrl },
  robots: { index: false, follow: false },
  openGraph: {
    title: product.metaTitle,
    description: product.metaDescription,
    url: pageUrl,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: product.metaTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: product.metaTitle,
    description: product.metaDescription,
    images: [site.ogImage],
  },
};

export default function NewAcademyCrmPage() {
  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            slug: "newacademy",
            category: product.industry,
            features: product.capabilities.map((c) => c.title),
          }),
          breadcrumbSchema(
            [{ label: "Products", href: "/products" }, { label: product.shortName }],
            "/products/newacademy"
          ),
        ]}
      />
      <AcademyRedesign product={product} />
    </>
  );
}
