"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import type { Product } from "@/lib/products";

export function ProductTeam({ product }: { product: Product }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Team Management"
          title="Role-Based Access for"
          highlight="Every Team Member"
          subtitle="Different users get different permissions, so each person sees exactly what they need."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {product.teamRoles.map((r) => (
            <motion.div key={r.role} variants={staggerItem} className="h-full">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{r.role}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
