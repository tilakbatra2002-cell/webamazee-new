"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ServiceIcon } from "@/components/services/service-icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Product } from "@/lib/products";
import { LogisticsPreview, AcademyPreview } from "./product-previews";

function ProductPreview({ slug }: { slug: string }) {
  if (slug === "logistics-crm") return <LogisticsPreview compact />;
  if (slug === "academy-crm") return <AcademyPreview compact />;
  return null;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <SpotlightCard className="h-full rounded-3xl">
      <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
        {/* UI preview */}
        <div className="border-b border-line bg-surface/60 p-4 sm:p-5">
          <ProductPreview slug={product.slug} />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <ServiceIcon name={product.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{product.name}</h3>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{product.industry}</p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> {product.badge}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-500">{product.positioning}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{product.description}</p>

          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.cardFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
            <Link
              href={product.path}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
            >
              Explore {product.shortName}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href={product.path}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-soft transition-all hover:border-brand-600/40 hover:text-brand-700"
            >
              {product.primaryCta}
            </Link>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
