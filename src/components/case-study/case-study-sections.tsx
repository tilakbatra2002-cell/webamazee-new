"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2, Target, Layers, AlertCircle, Search, Palette, Wrench,
  Sparkles, Globe, ArrowRight, ArrowUpRight, X, Gauge,
  FolderOpen, Lightbulb, PenTool, Eye,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "../ui/spotlight-card";
import { Accordion } from "../ui/accordion";
import { staggerContainer, staggerItem } from "../ui/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function Shell({
  id, eyebrow, title, highlight, subtitle, children, bg = "bg-white", icon: Icon,
}: {
  id: string; eyebrow?: string; title: string; highlight?: string; subtitle?: string; children: React.ReactNode; bg?: string; icon?: LucideIcon;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${bg} py-16 sm:py-20`}>
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              {Icon && <Icon className="h-3.5 w-3.5" />} {eyebrow}
            </span>
          )}
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
            {title}
            {highlight && (
              <>
                {" "}<span className="text-gradient">{highlight}</span>
              </>
            )}
          </h2>
          {subtitle && <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">{subtitle}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function OverviewSection({ cs }: { cs: CaseStudy }) {
  const blocks: { icon: LucideIcon; title: string; body: React.ReactNode }[] = [
    { icon: Target, title: "Objectives", body: (
      <ul className="space-y-2.5">{cs.objectives.map((o) => (
        <li key={o} className="flex items-start gap-2.5 text-[15px] text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{o}</li>
      ))}</ul>
    )},
    { icon: Layers, title: "Project Scope", body: <p className="text-[15px] leading-relaxed text-slate-600">{cs.scope}</p> },
    { icon: Search, title: "Timeline", body: <p className="text-[15px] leading-relaxed text-slate-600">{cs.timeline}</p> },
    { icon: Wrench, title: "Team", body: <p className="text-[15px] leading-relaxed text-slate-600">{cs.team}</p> },
  ];
  return (
    <Shell id="overview" eyebrow="Project Overview" title="The client and" highlight="the brief" bg="bg-white" icon={FolderOpen}>
      <div className="mx-auto max-w-4xl space-y-5">
        {cs.overviewClient.map((p, i) => (
          <motion.p key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="text-[16px] leading-relaxed text-slate-600">
            {p}
          </motion.p>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-brand-600/20 bg-brand-gradient-soft p-6 shadow-soft">
        <p className="text-sm font-semibold text-slate-400">Business at a glance</p>
        <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{cs.overviewBusiness}</p>
      </div>
      <div className="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((b, i) => (
          <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease }} className="rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
            <b.icon className="h-5 w-5 text-brand-600" />
            <h3 className="mt-3 font-display text-base font-bold text-ink">{b.title}</h3>
            <div className="mt-2">{b.body}</div>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

export function ExecutiveSummary({ cs }: { cs: CaseStudy }) {
  const items = [
    { label: "The challenge", text: cs.exec.challenge, accent: false },
    { label: "The solution", text: cs.exec.solution, accent: true },
    { label: "The outcome", text: cs.exec.outcome, accent: false },
  ];
  return (
    <Shell id="summary" eyebrow="Executive Summary" title="The story in" highlight="three parts" bg="bg-surface" icon={Sparkles}>
      <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div key={it.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.1, ease }}>
            <SpotlightCard className="h-full rounded-3xl">
              <div className={cn("group relative h-full overflow-hidden rounded-3xl border p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5", it.accent ? "border-brand-600/25 bg-brand-gradient-soft hover:shadow-glow" : "border-line bg-white hover:shadow-glow-lg")}>
                <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", it.accent ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-700")}>
                  {String(i + 1).padStart(2, "0")} · {it.label}
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{it.text}</p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

export function BeforeWebamazeeSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="before-webamazee" eyebrow="Before Webamazee" title="What was happening" highlight="before the project" bg="bg-white" icon={AlertCircle}>
      <div className="mx-auto max-w-4xl space-y-5">
        {cs.before.map((paragraph, index) => (
          <motion.p key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }} className="text-[16px] leading-relaxed text-slate-600">
            {paragraph}
          </motion.p>
        ))}
      </div>
    </Shell>
  );
}

export function ChallengeSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="challenges" eyebrow="Client Challenges" title="Problems we set out" highlight="to solve" bg="bg-white" icon={AlertCircle}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cs.challenges.map((c, i) => (
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

function StepsGrid({ id, eyebrow, title, highlight, bg, items, icon }: { id: string; eyebrow: string; title: string; highlight: string; bg: string; items: { title: string; desc: string }[]; icon: LucideIcon }) {
  return (
    <Shell id={id} eyebrow={eyebrow} title={title} highlight={highlight} bg={bg} icon={icon}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div key={i} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 font-display text-xs font-bold text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{it.desc}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </Shell>
  );
}

export function DiscoverySection({ cs }: { cs: CaseStudy }) {
  return <StepsGrid id="discovery" eyebrow="Discovery & Strategy" title="How we" highlight="researched and planned" bg="bg-white" items={cs.discovery} icon={Eye} />;
}

export function DesignSection({ cs }: { cs: CaseStudy }) {
  return <StepsGrid id="design" eyebrow="Design Process" title="Shaping the" highlight="experience" bg="bg-surface" items={cs.design} icon={Palette} />;
}

export function DevelopmentSection({ cs }: { cs: CaseStudy }) {
  return <StepsGrid id="development" eyebrow="Development Process" title="From build to" highlight="launch" bg="bg-white" items={cs.development} icon={Wrench} />;
}

export function FeatureShowcase({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="features" eyebrow="Feature Showcase" title="What was" highlight="delivered" bg="bg-surface" icon={Sparkles}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cs.features.map((f, i) => (
          <motion.div key={i} variants={staggerItem} className="h-full">
            <SpotlightCard className="h-full rounded-3xl">
              <div className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                  <CheckCircle2 className="h-5 w-5" />
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

export function GallerySection({ cs }: { cs: CaseStudy }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <Shell id="gallery" eyebrow="Visual Gallery" title="Design" highlight="showcase" bg="bg-white" icon={PenTool}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cs.gallery.map((g, i) => (
          <motion.button key={i} variants={staggerItem} onClick={() => setLightbox(i)} className="group relative overflow-hidden rounded-3xl border border-line bg-white p-2 text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow" aria-label={`Open ${g.label} image`}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-white" style={{ height: g.device === "desktop" ? 150 : g.device === "tablet" ? 190 : 220 }}>
              <Image
                src={cs.image}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-white p-6 shadow-lift-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold text-ink">{cs.gallery[lightbox].label}</p>
                <p className="text-sm text-slate-500">{cs.gallery[lightbox].alt}</p>
              </div>
              <button onClick={() => setLightbox(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-surface text-slate-500 transition-colors hover:bg-brand-50 hover:text-brand-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-white shadow-soft">
              <Image
                src={cs.image}
                alt={cs.gallery[lightbox].alt}
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

export function SeoSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="performance" eyebrow="Performance & SEO" title="Optimisation work" highlight="performed" bg="bg-surface" icon={Gauge}>
      <p className="mx-auto -mt-6 max-w-2xl text-center text-sm text-slate-500">
        Where exact scores aren't verified, we describe the optimisation work itself rather than reporting unverified figures.
      </p>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cs.seo.map((s, i) => (
          <motion.div key={i} variants={staggerItem} className="flex items-start gap-4 rounded-3xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">{i % 2 === 0 ? <Search className="h-4 w-4" /> : <Gauge className="h-4 w-4" />}</span>
            <div><h3 className="font-display text-sm font-bold text-ink">{s.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-500">{s.desc}</p></div>
          </motion.div>
        ))}
      </motion.div>
    </Shell>
  );
}

export function OutcomesSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="outcomes" eyebrow="Business Outcomes" title="What the work" highlight="achieved" bg="bg-white" icon={Target}>
      <p className="mx-auto -mt-6 max-w-2xl text-center text-sm text-slate-500">
        Outcomes are presented qualitatively, focused on the observable improvements the work delivered.
      </p>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
        {cs.outcomes.map((o, i) => (
          <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 rounded-3xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
            <p className="text-[15px] leading-relaxed text-slate-700">{o}</p>
          </motion.div>
        ))}
      </motion.div>
    </Shell>
  );
}

export function TechStackSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="technology" eyebrow="Technology Stack" title="Built with the" highlight="right tools" bg="bg-surface" icon={Layers}>
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
        {cs.techStack.map((t, i) => (
          <motion.span key={t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} className="rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:text-brand-700 hover:shadow-glow">
            {t}
          </motion.span>
        ))}
      </div>
    </Shell>
  );
}

export function RelatedServicesSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="services" eyebrow="Related Services" title="Services behind" highlight="this project" bg="bg-white" icon={Layers}>
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
        {cs.services.map((s, i) => (
          <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease }}>
            <Link href={`/services/${s.slug}`} className="group flex items-center justify-between rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white"><Layers className="h-6 w-6" /></span>
                <div><h3 className="font-display font-bold text-ink">{s.name}</h3><span className="text-sm text-slate-400">Learn more</span></div>
              </div>
              <ArrowRight className="h-5 w-5 text-brand-700 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

export function RelatedCaseStudiesSection({ related }: { related: { slug: string; title: string; service: string; industry: string; image: string }[] }) {
  return (
    <Shell id="related" eyebrow="Related Case Studies" title="More projects" highlight="to explore" bg="bg-white" icon={FolderOpen}>
      <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
        {related.map((r, i) => (
          <motion.div key={r.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08, ease }}>
            <Link href={`/case-studies/${r.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow">
              <div className="relative h-32 overflow-hidden">
                <Image src={r.image} alt={`${r.title} case study`} fill sizes="400px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-medium text-brand-600">{r.service}</span>
                <h3 className="mt-1.5 flex-1 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">{r.title}</h3>
                <span className="mt-3 text-xs text-slate-400">{r.industry}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Read case study <ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Shell>
  );
}

export function FaqSection({ cs }: { cs: CaseStudy }) {
  return (
    <Shell id="faq" eyebrow="FAQ" title="About this" highlight="project" bg="bg-surface" icon={Lightbulb}>
      <div className="mx-auto mt-2 max-w-3xl"><Accordion items={cs.faqs} /></div>
    </Shell>
  );
}

// ---------- Sticky sidebar ----------

const toc = [
  { id: "overview", label: "Project Overview" },
  { id: "summary", label: "Executive Summary" },
  { id: "before-webamazee", label: "Before Webamazee" },
  { id: "challenges", label: "Client Challenges" },
  { id: "discovery", label: "Discovery & Strategy" },
  { id: "design", label: "Design Process" },
  { id: "development", label: "Development" },
  { id: "features", label: "Feature Showcase" },
  { id: "before-after", label: "Before & After" },
  { id: "gallery", label: "Visual Gallery" },
  { id: "performance", label: "Performance & SEO" },
  { id: "outcomes", label: "Business Outcomes" },
  { id: "technology", label: "Technology Stack" },
  { id: "faq", label: "FAQ" },
];

export function CaseStudySidebar({ cs }: { cs: CaseStudy }) {
  return (
    <aside className="flex flex-col gap-5">
      {/* Project info */}
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h3 className="font-display text-base font-bold text-ink">Project Information</h3>
        <dl className="mt-4 space-y-3 text-sm">
          {[
            ["Industry", cs.industry],
            ["Country", cs.country],
            ["Type", cs.projectType],
            ["Completion", cs.completion],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-slate-400">{k}</dt>
              <dd className="text-right font-medium text-slate-700">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Tech stack */}
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h3 className="font-display text-base font-bold text-ink">Technology Stack</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.techStack.slice(0, 8).map((t) => (
            <span key={t} className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-slate-500">{t}</span>
          ))}
        </div>
      </div>

      {/* Quick navigation */}
      <div className="rounded-3xl border border-line bg-white p-5 shadow-soft">
        <h3 className="font-display text-base font-bold text-ink">Quick Navigation</h3>
        <nav className="mt-3 flex flex-col gap-1">
          {toc.map((t) => (
            <a key={t.id} href={`#${t.id}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700">
              <span className="h-1 w-1 rounded-full bg-brand-500" /> {t.label}
            </a>
          ))}
        </nav>
      </div>

      {/* CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-6 shadow-glow-lg">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <Globe className="h-6 w-6 text-white/80" />
          <h3 className="mt-3 font-display text-lg font-bold text-white">Like this project?</h3>
          <p className="mt-1 text-sm text-white/80">Let's build something together for your business.</p>
          <Link href="/contact" className="group mt-4 flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-brand-700 shadow-lift transition-all hover:shadow-lift-lg">
            Start Your Project <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
