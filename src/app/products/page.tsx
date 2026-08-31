import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTABanner } from "@/components/layout/cta-banner";
import { Reveal } from "@/components/ui/reveal";
import { staticMetadata } from "@/lib/static-pages";
import { products } from "@/lib/products";

export const metadata: Metadata = staticMetadata("products");

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Tools built for"
        highlight="modern agencies"
        subtitle="Premium software products from Webamazee, designed to help digital marketing agencies work smarter."
        crumbs={[{ label: "Products" }]}
      />

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                <Link
                  href={p.path}
                  className="group flex flex-col rounded-3xl border border-line bg-white p-8 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                      <Layers className="h-7 w-7" />
                    </span>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {p.status}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink transition-colors group-hover:text-brand-700">
                    {p.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {p.tagline}. {p.supportingCopy}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                    Explore product
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
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
