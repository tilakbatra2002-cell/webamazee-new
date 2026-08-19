"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LayoutGrid, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";
import { projects } from "@/lib/portfolio";

function BrowserPreview({ title, image }: { title: string; image: string }) {
  return (
    <div className="flex h-[17rem] flex-col overflow-hidden rounded-t-2xl border-b border-line bg-white sm:h-[17rem]">
      <div className="flex items-center gap-1.5 border-b border-line bg-surface/70 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-1 text-[10px] text-slate-400 ring-1 ring-line">
          {title.toLowerCase().replace(/\s+/g, "-")}.com
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <Section id="work" className="bg-surface">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          align="left"
          eyebrow={
            <Eyebrow>
              <LayoutGrid className="h-3.5 w-3.5" /> Portfolio
            </Eyebrow>
          }
          title="Selected"
          highlight="work"
          subtitle="A glimpse of the premium digital experiences we ship for clients."
        />
        <a
          href="/portfolio"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
        >
          View full portfolio <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.slice(0, 3).map((p) => (
          <motion.div key={p.slug} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <a
                href={`/work/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg"
              >
                <BrowserPreview title={p.title} image={p.image} />
                <div className="flex flex-1 items-center justify-between p-5">
                  <div>
                    <p className="text-xs font-medium text-brand-600">{p.category}</p>
                    <h3 className="mt-0.5 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">
                      {p.title}
                    </h3>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-400 transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-gradient group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
