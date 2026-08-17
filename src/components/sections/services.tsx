"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2, RefreshCw, MousePointerClick, ShoppingCart, Search, Brain,
  Settings2, MapPin, FilePen, TrendingUp, Target, Link2, ArrowUpRight, Check,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const services = [
  { slug: "website-development", icon: Code2, title: "Website Development", desc: "Conversion-focused, lightning-fast websites engineered to perform.", points: ["Next.js builds", "Pixel-perfect UI", "90+ Lighthouse"] },
  { slug: "website-redesign", icon: RefreshCw, title: "Website Redesign", desc: "Transform outdated sites into modern experiences that convert.", points: ["UX audit", "Modern rebuild", "Zero downtime"] },
  { slug: "landing-page-development", icon: MousePointerClick, title: "Landing Pages", desc: "High-converting landing pages built around your ad campaigns.", points: ["A/B ready", "Fast load", "Lead capture"] },
  { slug: "ecommerce-development", icon: ShoppingCart, title: "E-Commerce Development", desc: "Stores that sell — checkout-optimised and SEO-ready.", points: ["Headless shops", "Checkout UX", "Payment ready"] },
  { slug: "seo-services", icon: Search, title: "SEO", desc: "Organic growth with technical, on-page and authority strategies.", points: ["Keyword mapping", "Technical fixes", "Rank tracking"] },
  { slug: "ai-seo", icon: Brain, title: "AI SEO", desc: "Future-proof rankings using AI-driven content and intent signals.", points: ["AI content", "Entity SEO", "Zero-click wins"] },
  { slug: "technical-seo", icon: Settings2, title: "Technical SEO", desc: "Crawlability, Core Web Vitals and site architecture, perfected.", points: ["Crawl audit", "Schema markup", "Core Web Vitals"] },
  { slug: "local-seo", icon: MapPin, title: "Local SEO", desc: "Dominate local search and Google Maps for your service areas.", points: ["Google Business", "Local citations", "Review growth"] },
  { slug: "ai-content-optimization", icon: FilePen, title: "AI Content Optimisation", desc: "Search-optimised content scaled with AI, refined by experts.", points: ["E-E-A-T", "Briefs", "Publishing ops"] },
  { slug: "google-ranking-growth", icon: TrendingUp, title: "Google Ranking Growth", desc: "A data-led path to page-one rankings across your keywords.", points: ["Position tracking", "Strategy pivots", "Reporting"] },
  { slug: "competitor-analysis", icon: Target, title: "Competitor Analysis", desc: "Reverse-engineer what works and outmanoeuvre your rivals.", points: ["Gap analysis", "Backlink intel", "Position audits"] },
  { slug: "link-building", icon: Link2, title: "Link Building", desc: "Authoritative, white-hat backlinks that compound your rankings.", points: ["Digital PR", "Guest posts", "Outreach"] },
];

export function Services() {
  return (
    <Section id="services" className="bg-white">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          align="left"
          eyebrow={
            <Eyebrow>
              <Code2 className="h-3.5 w-3.5" /> Our Services
            </Eyebrow>
          }
          title="Everything you need to"
          highlight="win online"
          subtitle="A full-stack digital marketing & web partner — strategy, build, optimisation and growth under one roof."
        />
        <Link
          href="/services"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
        >
          View all services
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={staggerItem} className="h-full">
            <ServiceCard {...s} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

function ServiceCard({
  slug, icon: Icon, title, desc, points,
}: (typeof services)[number]) {
  return (
    <SpotlightCard className="h-full rounded-3xl">
      <Link
        href={`/services/${slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-glow-lg"
      >
        {/* top gradient line */}
        <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100" />
        {/* corner glow */}
        <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/25" />

        <div className="relative mb-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-brand-600/15 bg-brand-50 text-brand-700 transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:bg-brand-gradient group-hover:text-white group-hover:shadow-glow">
            <Icon className="h-6 w-6" />
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {points.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-slate-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-700"
            >
              <Check className="h-3 w-3 text-brand-600" /> {p}
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-700 opacity-0 transition-all duration-300 group-hover:opacity-100">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </SpotlightCard>
  );
}
