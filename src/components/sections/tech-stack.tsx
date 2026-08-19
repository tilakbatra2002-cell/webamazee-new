"use client";

import { motion } from "framer-motion";
import { Cpu, Search, Layers, Megaphone, ChartNoAxesCombined } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const groups = [
{
  icon: Cpu,
  title: "WordPress Development",
  tools: [
    "WordPress",
    "Elementor",
    "WooCommerce",
    "HTML",
    "CSS",
    "JavaScript",
  ],
},
  {
    icon: Search,
    title: "SEO & Analytics",
    tools: ["Google Analytics", "Search Console", "Ahrefs", "SEMrush", "Screaming Frog"],
  },
  {
    icon: Layers,
    title: "AI & Content",
    tools: ["OpenAI", "Claude", "GPT", "Surfer SEO", "Clearscope"],
  },
  {
    icon: Megaphone,
    title: "Growth & Ads",
    tools: ["Google Ads", "Meta Ads", "HubSpot", "Mailchimp", "Klaviyo"],
  },
];

export function TechStack() {
  return (
    <Section id="stack" className="bg-white">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <ChartNoAxesCombined className="h-3.5 w-3.5" /> Technology Stack
          </Eyebrow>
        }
        title="Powered by the"
        highlight="latest tech"
        subtitle="We work with the tools top-performing brands use — and our AI layer on top."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {groups.map((g) => (
          <motion.div key={g.title} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group h-full rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow-soft ring-1 ring-line transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <g.icon className="h-5 w-5" />
                </span>
                <h3 className="font-display font-bold text-ink">{g.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {g.tools.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="h-1 w-1 rounded-full bg-brand-500 transition-colors group-hover:bg-brand-600" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
