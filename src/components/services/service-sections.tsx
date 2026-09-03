"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, BadgeCheck, ArrowRight, ArrowUpRight, Star, Quote, Sparkles, Target, BarChart3 } from "lucide-react";
import { GOOGLE_REVIEWS_URL } from "@/lib/testimonials";
import { SpotlightCard } from "../ui/spotlight-card";
import { SectionHeader } from "../ui/sections-blocks";
import { Accordion } from "../ui/accordion";
import { staggerContainer, staggerItem } from "../ui/reveal";
import { ServiceIcon } from "./service-icon";

const ease = [0.22, 1, 0.36, 1] as const;

const exactIndustryRoutes: Record<string, string> = {
  "E-Commerce": "/seo-for-ecommerce",
  SaaS: "/seo-for-saas",
  Healthcare: "/seo-for-healthcare",
  Travel: "/seo-for-tourism",
  "Professional Services": "/seo-for-professional-services",
  "Local Business": "/seo-for-local-business",
};

export function PainPoints({ pains, icon }: { pains: { title: string; desc: string }[]; icon: string }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Sound familiar?"
          title="Common problems we"
          highlight="solve every day"
          subtitle="If any of these ring true, you're losing traffic, leads and revenue - and you're not alone."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pains.map((p, i) => (
            <motion.div key={i} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface/60 p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:bg-white hover:shadow-glow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-700 shadow-soft ring-1 ring-line transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <ServiceIcon name={icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function OverviewSection({
  icon, title, shortDesc, paragraphs, whoNeeds, examples,
}: {
  icon: string;
  title: string;
  shortDesc: string;
  paragraphs: string[];
  whoNeeds: string[];
  examples: string[];
}) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Service Overview" title="What this service" highlight="covers" />
        <div className="mx-auto mt-12 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="flex items-center gap-3 rounded-3xl border border-line bg-surface/60 p-6 shadow-soft">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <ServiceIcon name={icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
                <p className="text-sm text-slate-500">{shortDesc}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="text-[16px] leading-relaxed text-slate-600"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease }}
              className="rounded-3xl border border-line bg-surface/50 p-7 shadow-soft"
            >
              <h4 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Target className="h-5 w-5 text-brand-600" /> Who needs this?
              </h4>
              <ul className="mt-4 space-y-3">
                {whoNeeds.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-[15px] text-slate-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="rounded-3xl border border-brand-600/20 bg-brand-gradient-soft p-7 shadow-soft"
            >
              <h4 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <Sparkles className="h-5 w-5 text-brand-600" /> Real-world examples
              </h4>
              <ul className="mt-4 space-y-3">
                {examples.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-[15px] text-slate-600">
                    <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    {e}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyMatters({ title, paragraphs, stats }: { title: string; paragraphs: string[]; stats: { value: string; label: string }[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why it matters" title={title} highlight="for your business" />
        <div className="mx-auto mt-12 grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="space-y-5"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-slate-600">{p}</p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
                <p className="text-gradient font-display text-4xl font-bold">{s.value}</p>
                <p className="mt-2 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline({ steps }: { steps: { step: string; title: string; desc: string }[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Our Process" title="A proven six-step" highlight="process" subtitle="Transparent, repeatable and built around measurable outcomes." />
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative">
            <div className="absolute left-5 top-2 h-[calc(100%-2rem)] w-px bg-line" />
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="relative mb-6 pl-14 sm:pl-16"
              >
                <span className="absolute left-5 top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-brand-600/20 bg-white font-display text-sm font-bold text-brand-700 shadow-soft">
                  {s.step}
                </span>
                <div className="group rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                  <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatIncluded({ included }: { included: { icon: string; title: string; desc: string }[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="What's included" title="Everything in your" highlight="engagement" subtitle="Clear deliverables, tools and reporting - so you always know what you're getting." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {included.map((f, i) => (
            <motion.div key={i} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <ServiceIcon name={f.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
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

export function WhyChooseWebamazee({ reasons }: { reasons: { icon: string; title: string; desc: string }[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why Webamazee" title="A partner built for" highlight="your success" subtitle="Here's what makes working with us different." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reasons.map((r, i) => (
            <motion.div key={i} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-400/0 blur-2xl transition-all duration-500 group-hover:bg-brand-400/25" />
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <ServiceIcon name={r.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-bold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{r.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function IndustriesServed({ industries }: { industries: string[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Industries" title="We serve businesses" highlight="in every niche" subtitle="Our strategies adapt to your market, audience and goals." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {industries.map((ind, i) => (
            <motion.div key={ind} variants={staggerItem}>
              <SpotlightCard className="rounded-2xl">
                {exactIndustryRoutes[ind] ? (
                  <Link
                    href={exactIndustryRoutes[ind]}
                    className="group flex items-center gap-2.5 rounded-2xl border border-line bg-white px-5 py-3 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow"
                    aria-label={`Explore SEO for ${ind}`}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-brand-700">{ind}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-5 py-3 shadow-soft">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-600">{ind}</span>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ServiceTechStack({ tools }: { tools: string[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Technology & Tools" title="Backed by the" highlight="best tools" subtitle="We use the same platforms top-performing businesses rely on." />
        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {tools.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="rounded-2xl border border-line bg-surface/50 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-white hover:text-brand-700 hover:shadow-soft"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResultsSection({ title, rows, story }: { title: string; rows: { label: string; before: string; after: string }[]; story: string[] }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Results & case studies" title="The results we" highlight="actually deliver" subtitle="Real before-and-after outcomes from businesses like yours." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-line bg-white shadow-soft"
        >
          <div className="grid grid-cols-[1fr_auto_auto] gap-0 border-b border-line bg-surface px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
            <span>Metric</span>
            <span className="px-6">Before</span>
            <span className="px-6">After</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-0 border-b border-line px-6 py-4 last:border-0 transition-colors hover:bg-brand-50/40">
              <span className="text-sm font-semibold text-ink">{r.label}</span>
              <span className="px-6 text-sm text-slate-400">{r.before}</span>
              <span className="px-6 text-sm font-bold text-success">{r.after}</span>
            </div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {story.map((p, i) => (
            <motion.p key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="text-[16px] leading-relaxed text-slate-600">
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceTestimonials({ items }: { items: { quote: string; name: string; role: string; rating: number; initials: string }[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Testimonials" title="What our clients" highlight="say" subtitle="Real reviews from our Google Business Profile." />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((t, i) => (
            <motion.figure key={i} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <Quote className="absolute right-5 top-5 h-7 w-7 text-brand-100" />
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-600">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </figcaption>
                </div>
              </SpotlightCard>
            </motion.figure>
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand-700 hover:underline"
          >
            Reviews from Google <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ faqs, shortName }: { faqs: { q: string; a: string }[]; shortName: string }) {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Questions about" highlight={shortName} />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Still have a question?{" "}
          <Link href="/contact" className="font-semibold text-brand-700 hover:underline">
            Talk to our team
          </Link>
        </p>
      </div>
    </section>
  );
}

export function RelatedServices({ related }: { related: { slug: string; name: string; icon: string }[] }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Explore related" highlight="services" subtitle="Combine these for a complete growth strategy." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
          {related.map((r, i) => (
            <motion.div
              key={r.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <Link href={`/services/${r.slug}`} className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <ServiceIcon name={r.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display font-bold text-ink">{r.name}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-brand-700">
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="glass-strong border-t border-white/60 px-4 py-3 shadow-lift-lg">
        <div className="mx-auto flex max-w-[1350px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">Ready to grow?</p>
            <p className="truncate text-xs text-slate-500">Free audit &amp; strategy call</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link href="/contact" className="inline-flex h-11 items-center gap-1.5 rounded-full bg-brand-gradient px-5 text-sm font-semibold text-white shadow-glow">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
