"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import {
  Search, Code2, Megaphone, Share2, Building2,
} from "lucide-react";

const audiences = [
  { icon: Search, title: "SEO Agencies", desc: "Organize ranking, traffic, and content leads." },
  { icon: Code2, title: "Web Development Agencies", desc: "Track build and redesign opportunities." },
  { icon: Megaphone, title: "Performance Marketing Agencies", desc: "Align ad-driven leads with clear pipeline stages." },
  { icon: Share2, title: "Social Media Agencies", desc: "Turn social enquiries into managed clients." },
  { icon: Building2, title: "Full-Service Digital Agencies", desc: "Manage every service line from one workspace." },
];

export function ProductAudience() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Who It's For"
          title="Built for Modern"
          highlight="Digital Marketing Agencies"
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {audiences.map((a) => (
            <motion.div key={a.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface/40 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{a.desc}</p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
