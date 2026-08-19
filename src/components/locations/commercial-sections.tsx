import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Target,
  MapPin,
  MessageCircleQuestion,
  Newspaper,
  ArrowUpRight,
  Building2,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { Accordion } from "@/components/ui/accordion";

/* Shared reusable section blocks for the commercial location pages so both
 * page types stay visually consistent with the rest of the Webamazee design
 * system while composing their own unique section order and copy. */

type LinkItem = { label: string; href: string };

export function ServicesGrid({
  services,
}: {
  services: { name: string; slug: string; desc: string; benefit: string }[];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Services included"
          title="A complete range of"
          highlight="marketing services"
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
              >
                <span className="flex items-center gap-2 font-display text-sm font-bold text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-600" /> {s.name}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                <p className="mt-2 rounded-lg bg-brand-50/70 px-2.5 py-1.5 text-xs font-medium text-brand-700">
                  {s.benefit}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-700">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline({
  process,
  intro,
}: {
  process: { step: string; title: string; desc: string }[];
  intro?: string;
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Our process" title="A proven, transparent" highlight="process" />
        {intro && (
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
            {intro}
          </p>
        )}
        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative">
            <div className="absolute left-5 top-2 h-[calc(100%-2rem)] w-px bg-line" />
            {process.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.05}>
                <div className="relative mb-6 pl-14 sm:pl-16">
                  <span className="absolute left-5 top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-brand-600/20 bg-white font-display text-sm font-bold text-brand-700 shadow-soft">
                    {s.step}
                  </span>
                  <div className="rounded-3xl border border-line bg-surface/50 p-6 shadow-soft transition-all duration-300 hover:bg-white hover:shadow-glow">
                    <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StrategyCards({
  items,
  title,
  highlight,
}: {
  items: { title: string; body: string; link?: { label: string; href: string } }[];
  title: string;
  highlight: string;
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Strategies" title={title} highlight={highlight} />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((st, i) => (
            <Reveal key={st.title} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Target className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{st.body}</p>
                {st.link && (
                  <Link
                    href={st.link.href}
                    className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-brand-700"
                  >
                    {st.link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseGrid({
  items,
  location,
}: {
  items: { title: string; desc: string }[];
  location: string;
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why Webamazee" title="A global digital growth" highlight="partner" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
                <Globe2 className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 font-display text-base font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl text-sm text-slate-500">
            Webamazee is a global digital growth company. These pages are targeted
            SEO landing pages for businesses in {location} and beyond. We help
            ambitious companies grow online worldwide.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function TextPanel({
  eyebrow,
  heading,
  highlight,
  body,
  badges,
}: {
  eyebrow: string;
  heading: string;
  highlight?: string;
  body: string[];
  badges?: string[];
}) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              <Sparkles className="h-3.5 w-3.5" /> {eyebrow}
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {heading}{highlight && <span className="text-gradient"> {highlight}</span>}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {body.map((p, i) => (
              <Reveal key={i}>
                <p className="text-[16px] leading-relaxed text-slate-600">{p}</p>
              </Reveal>
            ))}
          </div>
          {badges && badges.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft">
                  <BadgeCheck className="h-4 w-4 text-brand-600" /> {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
  title,
  highlight,
  icon = "building",
}: {
  items: { title: string; desc: string }[];
  title: string;
  highlight?: string;
  icon?: "building" | "cpu" | "users";
}) {
  const Icon = icon === "cpu" ? Sparkles : icon === "users" ? Globe2 : Building2;
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Who it helps" title={title} highlight={highlight} />
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-5 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:bg-white hover:shadow-glow">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection({ links }: { links: LinkItem[] }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our work"
          title="See the results we"
          highlight="deliver for clients"
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {links.map((p, i) => (
            <Reveal key={p.href} delay={i * 0.04}>
              <Link
                href={p.href}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-600/25 hover:shadow-glow"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="flex-1 font-display text-sm font-bold text-ink">{p.label}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 text-center">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            View all case studies <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function BlogLinks({ links }: { links: LinkItem[] }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Helpful resources" highlight="from our blog" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {links.map((b, i) => (
            <Reveal key={b.href} delay={i * 0.04}>
              <Link
                href={b.href}
                className="group flex items-center gap-3 rounded-2xl border border-line bg-surface/40 p-4 shadow-soft transition-all duration-300 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Newspaper className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-semibold text-slate-700 group-hover:text-brand-700">{b.label}</span>
                <ArrowUpRight className="h-4 w-4 text-brand-600" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RelevantServices({ links }: { links: LinkItem[] }) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Explore related" highlight="services" />
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.04}>
              <Link
                href={r.href}
                className="group flex items-center justify-between rounded-2xl border border-line bg-surface/50 p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:bg-white hover:shadow-glow"
              >
                <span className="font-display text-sm font-bold text-ink">{r.label}</span>
                <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CrossLinkSection({ links, label }: { links: LinkItem[]; label: string }) {
  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-slate-500">{label}</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {links.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700"
            >
              <MapPin className="h-3.5 w-3.5 text-brand-600" /> {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ faqs, title, highlight }: { faqs: { q: string; a: string }[]; title: string; highlight?: string }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title={title} highlight={highlight} />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={faqs} defaultOpen={null} />
        </div>
      </div>
    </section>
  );
}

export function FooterLinks({ links }: { links: LinkItem[] }) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-soft transition-all hover:border-brand-600/30 hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
          >
            <MessageCircleQuestion className="h-4 w-4" /> Talk to Us
          </Link>
        </div>
      </div>
    </section>
  );
}
