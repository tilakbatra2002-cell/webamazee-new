"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Words } from "@/components/ui/text-reveal";
import { ProductCtaButtons } from "./product-cta-buttons";
import { LogisticsPreview, AcademyPreview } from "./product-previews";
import type { Product } from "@/lib/products";

export function ProductDetailHero({ product }: { product: Product }) {
  const Preview = product.slug === "academy-crm" ? AcademyPreview : LogisticsPreview;

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />

      <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5" /> {product.eyebrow}
            </motion.span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.2rem] text-balance">
              <Words text={product.heading} as="span" stagger={0.03} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500 text-pretty"
            >
              {product.supportingCopy}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-9"
            >
              <ProductCtaButtons productName={product.name} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-200/20 blur-3xl" />
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-brand-400/60 via-brand-100/40 to-brand-300/50 p-px shadow-lift-lg">
              <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-white/90 p-5 backdrop-blur-xl sm:p-6">
                <Preview />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
