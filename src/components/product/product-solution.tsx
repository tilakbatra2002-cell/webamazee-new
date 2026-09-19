"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductSolution({ product }: { product: Product }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft">
            <CheckCircle2 className="h-3.5 w-3.5" /> The Solution
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
            One Platform.{" "}
            <span className="text-gradient">Every Step of the Workflow.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
            {product.name} connects every stage of your operations into one clear, structured workflow.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-3"
        >
          {product.workflow.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="rounded-2xl border border-brand-600/15 bg-white px-4 py-3 text-center shadow-soft">
                <p className="font-display text-sm font-bold text-ink sm:text-base">{step}</p>
              </div>
              {i < product.workflow.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
