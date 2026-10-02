"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import Image from "next/image";

const cases = [
  {
    tag: "E-commerce",
    title: "Kabir Oil Mill · Traditional oils, modern e-commerce",
    image: "/images/case-studies/webamazee-kabir-oil-mills-case-study.png",
    highlights: [
      { title: "Online storefront", detail: "Product discovery and digital ordering" },
      { title: "Responsive experience", detail: "A clear path from browsing to purchase" },
    ],
    color: "from-brand-600 to-brand-800",
  },
  {
    tag: "Travel & Tourism",
    title: "Wellington Tours · A clearer travel experience",
    image: "/images/case-studies/webamazee-wellington-tours-case-study.png",
    highlights: [
      { title: "Travel website", detail: "Services presented for easy exploration" },
      { title: "Enquiry journeys", detail: "Direct ways for travellers to get in touch" },
    ],
    color: "from-brand-400 to-brand-700",
  },
  {
    tag: "Travel & Tourism",
    title: "Shine Gold Tours India · A richer digital experience",
    image: "/images/case-studies/webamazee-shine-gold-tours-india-case-study.png",
    highlights: [
      { title: "Website redesign", detail: "A refreshed interface for travellers" },
      { title: "Destination discovery", detail: "Clearer content and enquiry paths" },
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
          title="Selected projects"
          highlight="built around real needs"
          subtitle="Website and digital experiences built for businesses in India and New Zealand."
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
                    {c.highlights.map((highlight) => (
                      <div key={highlight.title} className="rounded-xl bg-surface p-3 transition-colors group-hover:bg-brand-50/60">
                        <p className="text-sm font-bold text-brand-700">{highlight.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{highlight.detail}</p>
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
