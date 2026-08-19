"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AlertCircle, Layers, Target, ArrowRight, Star, Quote, BadgeCheck,
  Search, Gauge, X, CheckCircle2, Palette, ArrowUpRight,
} from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";
import { SectionHeader } from "../ui/sections-blocks";
import { Accordion } from "../ui/accordion";
import { staggerContainer, staggerItem } from "../ui/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function Shell({
  eyebrow, title, highlight, subtitle, children, bg = "bg-white",
}: {
  eyebrow?: string; title: string; highlight?: string; subtitle?: string; children: React.ReactNode; bg?: string;
}) {
  return (
    <section className={`${bg} py-16 sm:py-20`}>
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        {eyebrow && <SectionHeader eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />}
        {children}
      </div>
    </section>
  );
}

export function OverviewSection({ overview, goals, requirements }: { overview: string[]; goals: string[]; requirements: string[] }) {
  return (
    <Shell eyebrow="Project Overview" title="The client," highlight="the goals" bg="bg-white">
      <div className="mx-auto mt-12 max-w-5xl space-y-5">
        {overview.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="text-[16px] leading-relaxed text-slate-600">
            {p}
          </motion.p>
        ))}
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease }} className="rounded-3xl border border-line bg-surface/50 p-7 shadow-soft">
          <h4 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Target className="h-5 w-5 text-brand-600" /> Project goals</h4>
          <ul className="mt-4 space-y-3">
            {goals.map((g) => (
              <li key={g} className="flex items-start gap-3 text-[15px] text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{g}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease, delay: 0.1 }} className="rounded-3xl border border-brand-600/20 bg-brand-gradient-soft p-7 shadow-soft">
          <h4 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><Layers className="h-5 w-5 text-brand-600" /> Requirements</h4>
          <ul className="mt-4 space-y-3">
            {requirements.map((r) => (
              <li key={r} className="flex items-start gap-3 text-[15px] text-slate-600"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{r}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Shell>
  );
}

export function ChallengeSection({ challenges }: { challenges: { title: string; desc: string }[] }) {
  return (
    <Shell eyebrow="The Challenge" title="What we set out to" highlight="solve" bg="bg-surface">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {challenges.map((c, i) => (
          <motion.div key={i} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <AlertCircle className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{c.desc}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Shell>
  );
}

export function SolutionSection({ solution, solutionAreas }: { solution: string[]; solutionAreas: { title: string; desc: string }[] }) {
  return (
    <Shell eyebrow="Our Solution" title="How we" highlight="solved it" bg="bg-white">
      <div className="mx-auto mt-12 max-w-5xl space-y-5">
        {solution.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="text-[16px] leading-relaxed text-slate-600">
            {p}
          </motion.p>
        ))}
      </div>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutionAreas.map((a, i) => (
          <motion.div key={i} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  <Palette className="h-5 w-5" />
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
    </Shell>
  );
}

export function FeaturesDelivered({ features }: { features: { title: string; desc: string }[] }) {
  return (
    <Shell eyebrow="Features Delivered" title="What was" highlight="included" bg="bg-surface">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div key={i} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Shell>
  );
}

export function TechStackSection({ stack }: { stack: string[] }) {
  return (
    <Shell eyebrow="Technology Stack" title="Built with a" highlight="modern stack" bg="bg-white">
      <div className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
        {stack.map((t, i) => (
          <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} className="rounded-2xl border border-line bg-surface/50 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-white hover:text-brand-700 hover:shadow-soft">
            {t}
          </motion.span>
        ))}
      </div>
    </Shell>
  );
}

export function ProcessSection({ process }: { process: { step: string; title: string; desc: string }[] }) {
  return (
    <Shell eyebrow="Development Process" title="From discovery to" highlight="launch" bg="bg-surface">
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="relative">
          <div className="absolute left-5 top-2 h-[calc(100%-2rem)] w-px bg-line" />
          {process.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.05, ease }} className="relative mb-6 pl-14 sm:pl-16">
              <span className="absolute left-5 top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-brand-600/20 bg-white font-display text-sm font-bold text-brand-700 shadow-soft">
                {s.step}
              </span>
              <div className="group rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function SeoSection({ seo }: { seo: { title: string; desc: string }[] }) {
  return (
    <Shell eyebrow="Performance & SEO" title="Optimised for search" highlight="& performance" bg="bg-white">
      <div className="mx-auto mt-12 max-w-4xl">
        <p className="text-center text-sm text-slate-500">
          This project was built with performance and search in mind. Rather than reporting figures we can't verify, here's the optimisation work we performed.
        </p>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-10 grid gap-4 sm:grid-cols-2">
          {seo.map((s, i) => (
            <motion.div key={i} variants={staggerItem} className="flex items-start gap-4 rounded-3xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                {i % 2 === 0 ? <Search className="h-4 w-4" /> : <Gauge className="h-4 w-4" />}
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Shell>
  );
}

export function GallerySection({ gallery, image }: { gallery: { label: string; device: "desktop" | "tablet" | "mobile"; alt: string }[]; image: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <Shell eyebrow="Image Gallery" title="Design" highlight="showcase" bg="bg-surface">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g, i) => (
          <motion.button
            key={i}
            variants={staggerItem}
            onClick={() => setLightbox(i)}
            className="group relative overflow-hidden rounded-3xl border border-line bg-white p-2 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            aria-label={`Open ${g.label} image`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white" style={{ height: g.device === "desktop" ? 150 : g.device === "tablet" ? 190 : 220 }}>
              <Image
                src={image}
                alt={g.alt}
                fill
                sizes="(max-width: 640px) 90vw, 320px"
                className="object-cover object-top"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 transition-opacity duration-300 group-hover:bg-white/40 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6 text-brand-700" />
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between px-1">
              <span className="text-sm font-semibold text-ink">{g.label}</span>
              <span className="text-xs uppercase tracking-wider text-slate-400">{g.device}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-white p-6 shadow-lift-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold text-ink">{gallery[lightbox].label}</p>
                <p className="text-sm text-slate-500">{gallery[lightbox].alt}</p>
              </div>
              <button onClick={() => setLightbox(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-white shadow-soft">
              <Image
                src={image}
                alt={gallery[lightbox].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </Shell>
  );
}

export function TestimonialSection({ testimonial }: { testimonial?: { quote: string; name: string; role: string; rating: number } }) {
  if (!testimonial) return null;
  return (
    <Shell eyebrow="Client Feedback" title="What the client" highlight="said" bg="bg-white">
      <div className="mx-auto mt-12 max-w-3xl">
        <SpotlightCard className="rounded-3xl">
          <figure className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 text-center shadow-soft transition-all duration-300 hover:shadow-glow-lg">
            <Quote className="mx-auto h-10 w-10 text-brand-200" />
            <div className="mt-4 flex justify-center gap-0.5 text-amber-400">
              {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 text-xl font-medium leading-relaxed text-ink">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-6">
              <p className="font-display font-bold text-ink">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </figcaption>
          </figure>
        </SpotlightCard>
      </div>
    </Shell>
  );
}

export function FaqSection({ faqs, title }: { faqs: { q: string; a: string }[]; title: string }) {
  return (
    <Shell eyebrow="FAQ" title="About this" highlight="project" bg="bg-surface">
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion items={faqs} />
      </div>
    </Shell>
  );
}

export function RelatedProjects({ related }: { related: { slug: string; title: string; category: string; image: string }[] }) {
  return (
    <Shell eyebrow="Related Projects" title="Explore more" highlight="of our work" bg="bg-white">
      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">
        {related.map((r, i) => (
          <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease }}>
            <Link href={`/work/${r.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
              <div className="relative h-32 overflow-hidden">
                <Image src={r.image} alt={`${r.title} project`} fill sizes="400px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-medium text-brand-600">{r.category}</span>
                <h3 className="mt-1.5 flex-1 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-700">{r.title}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-brand-700">
                  View case study <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}
