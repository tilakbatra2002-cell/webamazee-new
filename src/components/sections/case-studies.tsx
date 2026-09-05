"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ArrowUpRight, BarChart3 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import Image from "next/image";

const cases = [
  {
  tag: "E Commerce",
  title: "Kabir Oil Mills Traditional oils, modern e commerce",
  image: "/images/case-studies/webamazee-kabir-oil-mills-case-study.png",
  metrics: [
    { k: "6+", l: "Oil products" },
    { k: "100%", l: "Responsive design" },
  ],
  color: "from-brand-600 to-brand-800",
},
{
  tag: "Travel & Tourism",
  title: "Wellington Tours A modern website for seamless travel experiences",
  image: "/images/case-studies/webamazee-wellington-tours-case-study.png",
  metrics: [
    { k: "4+", l: "Core services" },
    { k: "100%", l: "Mobile responsive" },
  ],
  color: "from-brand-400 to-brand-700",
},
{
  tag: "Travel & Tourism",
  title: "Shine Gold Tours India A richer digital experience for travellers",
  image: "/images/case-studies/webamazee-shine-gold-tours-india-case-study.png",
  metrics: [
    { k: "10+", l: "Tour categories" },
    { k: "100%", l: "Responsive design" },
  ],
  color: "from-brand-300 to-brand-600",
},
];

export function CaseStudies() {
  return (
    <Section id="results" className="bg-white py-16 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow={
            <Eyebrow>
              <TrendingUp className="h-3.5 w-3.5" /> Case Studies
            </Eyebrow>
          }
          title="Results that"
          highlight="speak louder"
          subtitle="Real businesses, real rankings, real revenue growth."
        />
        <a
          href="/case-studies"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
        >
          View all case studies <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-6 md:grid-cols-3"
      >
        {cases.map((c) => (
          <motion.div key={c.title} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <Link
                href="/case-studies"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg"
              >
                {/* visual */}
                <div className={`relative h-[17rem] overflow-hidden bg-gradient-to-br ${c.color}`}>
                  <Image
    src={c.image}
    alt={c.title}
    fill
    sizes="(max-width: 768px) 100vw, 33vw"
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
                  <div className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {c.tag}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
                    {c.title}
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {c.metrics.map((m) => (
                      <div key={m.l} className="rounded-xl bg-surface p-3 transition-colors group-hover:bg-brand-50/60">
                        <p className="font-display text-xl font-bold text-brand-700">{m.k}</p>
                        <p className="text-xs text-slate-500">{m.l}</p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700">
                    View case study
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
