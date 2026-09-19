import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { staticMetadata } from "@/lib/static-pages";
import { products } from "@/lib/products";
import { breadcrumbSchema } from "@/lib/schema";
import { ProductCard } from "@/components/product/product-card";

export const metadata: Metadata = staticMetadata("products");

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ label: "Products" }])} />

      <PageHero
        eyebrow="Our Products"
        title="Business Software Built"
        highlight="Around Your Workflow"
        subtitle="Industry-focused CRM platforms designed to help businesses manage their operations, teams and customers from one place."
        crumbs={[{ label: "Products" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Looking for a marketing partner instead?"
        subtitle="Webamazee also offers full digital marketing and web development services."
      />
    </>
  );
}
