"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ProductCtaButtons } from "./product-cta-buttons";
import type { Product } from "@/lib/products";

export function ProductFinalCta({ product, title }: { product: Product; title: string }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow-xl sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-aurora" />
          <div
            className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-aurora"
            style={{ animationDelay: "2s" }}
          />
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> {product.badge} Product
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl text-balance">
              {title}
            </h2>
            <div className="mt-8">
              <ProductCtaButtons productName={product.name} align="center" variant="dark" />
            </div>
            <p className="mt-6 text-sm text-white/70">Response within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
