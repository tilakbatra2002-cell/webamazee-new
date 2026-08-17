"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import {
  Search, Code2, Brain, ShoppingCart, MapPin, RefreshCw, TrendingUp,
  FilePen, MousePointerClick, CheckCircle2, Link2,
} from "lucide-react";

const services = [
  { icon: Search, label: "SEO Leads" },
  { icon: Code2, label: "Website Development Leads" },
  { icon: Brain, label: "AI SEO Leads" },
  { icon: ShoppingCart, label: "E-Commerce Leads" },
  { icon: MapPin, label: "Local SEO Leads" },
  { icon: RefreshCw, label: "Website Redesign Leads" },
  { icon: TrendingUp, label: "Google Ranking Growth Leads" },
  { icon: FilePen, label: "AI Content Optimization Leads" },
  { icon: MousePointerClick, label: "Landing Page Leads" },
  { icon: Link2, label: "Link Building Leads" },
];

const qualifiers = [
  "Website",
  "Current traffic",
  "Current rankings",
  "Monthly marketing budget",
  "Target market",
  "Required services",
  "Estimated deal value",
  "Lead quality",
];

export function ProductAgencyFeatures() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Built for Agencies"
          title="Agency-Specific"
          highlight="Workflows"
          subtitle="Organize every lead by the exact service your agency delivers — and qualify them with the fields that matter."
        />

        {/* service-based lead types */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {services.map((s) => (
            <motion.div key={s.label} variants={staggerItem}>
              <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
                <s.icon className="h-5 w-5 text-brand-700" />
                <span className="text-sm font-medium text-slate-600">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* qualification fields */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-4xl rounded-3xl border border-brand-600/20 bg-gradient-to-br from-brand-50 to-white p-7 shadow-soft"
        >
          <h3 className="text-center font-display text-xl font-bold text-ink">
            Lead Qualification Fields
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {qualifiers.map((q) => (
              <div key={q} className="flex items-center gap-2 rounded-xl border border-line bg-white/70 px-3 py-2.5 text-sm text-slate-600 shadow-soft">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" />
                {q}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
