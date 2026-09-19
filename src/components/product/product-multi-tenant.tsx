"use client";

import { motion } from "framer-motion";
import { Building2, Lock, Layers } from "lucide-react";
import type { Product } from "@/lib/products";

const points = [
  { icon: Building2, title: "Dedicated workspace", desc: "Every company gets its own isolated workspace inside the platform." },
  { icon: Lock, title: "Private data", desc: "One company's data is never visible to another." },
  { icon: Layers, title: "Consistent experience", desc: "Every workspace runs on the same reliable, up-to-date platform." },
];

export function ProductMultiTenant({ product }: { product: Product }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              Multi-Tenant SaaS
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl text-balance">
              Built for Multiple Companies —{" "}
              <span className="text-gradient">Securely Separated</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              {product.name} is built as a multi-tenant platform. Each business that signs up gets its own
              dedicated workspace and data, kept completely separate from every other company using the platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-4"
          >
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-4 rounded-3xl border border-line bg-surface/50 p-5 shadow-soft">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
