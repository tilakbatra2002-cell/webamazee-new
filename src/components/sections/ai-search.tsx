"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Brain,
  Compass,
  FileText,
  Layers,
  MessageSquare,
  Network,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { Button, Section, SectionHeading } from "@/components/ui";
import { Eyebrow } from "../ui/eyebrow";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { SpotlightCard } from "../ui/spotlight-card";

const capabilities = [
  {
    icon: Search,
    title: "Google Search",
    desc: "Build stronger organic visibility through technical SEO, search intent, content optimisation and authority building.",
  },
  {
    icon: Sparkles,
    title: "AI Overviews",
    desc: "Create clear, authoritative and structured content that makes your business information easier for modern search systems to understand.",
  },
  {
    icon: Brain,
    title: "AI Search",
    desc: "Strengthen your website's entity, topical and informational signals for emerging AI-powered discovery experiences.",
  },
  {
    icon: MessageSquare,
    title: "Generative Search",
    desc: "Prepare your digital presence for a search landscape where users increasingly expect direct, conversational answers.",
  },
];

const pipeline = [
  "Traditional Search",
  "SEO",
  "Content + Authority",
  "Structured Information",
  "AI Search Readiness",
  "Modern Discovery",
];

const framework = [
  {
    step: "01",
    icon: Settings2,
    title: "Technical Foundation",
    desc: "Make your website accessible, crawlable and technically sound.",
  },
  {
    step: "02",
    icon: FileText,
    title: "Search Intent & Content",
    desc: "Create useful content aligned with what customers are actually looking for.",
  },
  {
    step: "03",
    icon: Network,
    title: "Entity & Topic Authority",
    desc: "Strengthen the connections between your brand, expertise, services and topics.",
  },
  {
    step: "04",
    icon: Layers,
    title: "Structured Information",
    desc: "Use clear page structures and relevant structured data where appropriate.",
  },
  {
    step: "05",
    icon: Compass,
    title: "AI Search Readiness",
    desc: "Prepare your website for evolving search and AI-powered discovery experiences.",
  },
];

export function AISearch() {
  return (
    <Section id="ai-search" className="overflow-hidden bg-surface py-16 sm:py-20">
      <SectionHeading
        eyebrow={
          <Eyebrow>
            <Sparkles className="h-3.5 w-3.5" /> AI Search
          </Eyebrow>
        }
        title="Be visible wherever"
        highlight="your customers search"
        subtitle="Search is changing. Your SEO strategy should too."
      />

      <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-slate-500 sm:text-lg">
        People are no longer discovering businesses only through traditional search results.
        AI-powered search experiences are changing how users find, evaluate and compare
        information. Webamazee helps businesses build the content, structure, authority and
        technical foundation needed for modern search.
      </p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid gap-5 sm:grid-cols-2"
      >
        {capabilities.map((card) => (
          <motion.div key={card.title} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/25" />
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <card.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-bold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{card.desc}</p>
              </article>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.ol
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 sm:gap-y-3"
        aria-label="How search visibility is built"
      >
        {pipeline.map((label, i) => (
          <li key={label} className="flex flex-col items-center sm:flex-row sm:items-center">
            <span className="rounded-full border border-brand-600/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-soft sm:text-sm">
              {label}
            </span>
            {i < pipeline.length - 1 && (
              <span className="my-1 text-brand-400 sm:mx-1.5 sm:my-0" aria-hidden>
                <ArrowDown className="h-4 w-4 sm:hidden" />
                <ArrowRight className="hidden h-4 w-4 sm:block" />
              </span>
            )}
          </li>
        ))}
      </motion.ol>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 overflow-hidden rounded-[2rem] bg-brand-gradient p-8 text-center shadow-glow-lg sm:p-10"
      >
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand-300/30 blur-3xl" />
        <h3 className="relative font-display text-2xl font-bold leading-tight text-white sm:text-3xl text-balance">
          SEO is no longer just about ranking a blue link.
        </h3>
        <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          We optimise your digital presence so your business can be better understood, discovered
          and evaluated across modern search experiences.
        </p>
      </motion.div>

      <div className="mt-20">
        <h3 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
          Our AI Search Framework
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-500 sm:text-base">
          A practical sequence for adapting SEO to evolving search — without claiming control over
          any third-party AI system.
        </p>

        <div className="relative mt-12">
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {framework.map((item) => (
              <motion.li key={item.step} variants={staggerItem} className="relative">
                <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-600/15 bg-brand-50 text-brand-700">
                    <item.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <p className="mt-4 font-display text-xs font-bold tracking-[0.22em] text-brand-600">
                    {item.step}
                  </p>
                  <h4 className="mt-2 font-display text-base font-bold text-ink">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Ready for the next generation of search?
        </h3>
        <p className="mt-3 text-slate-500">Find out how prepared your website is.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/free-seo-audit" withArrow>
            Get My Free SEO Audit
          </Button>
          <Button href="/services/ai-seo" variant="secondary">
            Explore AI SEO
          </Button>
        </div>
      </div>
    </Section>
  );
}
