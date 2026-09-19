"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/services/service-icon";
import type { Product } from "@/lib/products";

export function ProductProblem({ product }: { product: Product }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Problem"
          title="Real Operational Challenges,"
          highlight="Solved"
          subtitle={`Common pain points ${product.name} is built to remove from day-to-day operations.`}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {product.problems.map((p) => (
            <motion.div key={p.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <ServiceIcon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
