"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";

export function ProductSuitableFor({ items }: { items: string[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Suitable For"
          title="Built for a Wide Range of"
          highlight="Education Businesses"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2"
        >
          {items.map((item) => (
            <motion.div
              key={item}
              variants={staggerItem}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
              <span className="font-medium text-ink">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
