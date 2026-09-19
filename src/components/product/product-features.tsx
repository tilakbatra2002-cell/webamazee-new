"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/services/service-icon";
import type { Product } from "@/lib/products";

export function ProductFeatures({ product }: { product: Product }) {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Features"
          title="Everything You Need to Run"
          highlight={product.industry}
          subtitle={`A complete set of modules built around how ${product.industry.toLowerCase()} businesses actually operate.`}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {product.capabilities.map((f) => (
            <motion.div key={f.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <ServiceIcon name={f.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
