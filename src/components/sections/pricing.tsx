"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Sparkles, ArrowUpRight, ArrowRight, MessageSquareHeart } from "lucide-react";
import { Section, SectionHeading, Eyebrow } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";

type Plan = {
  name: string;
  price: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: 149,
    description: "For new businesses and startups.",
    features: [
      "Basic SEO",
      "Google Business Profile",
      "5 Social Media Posts / Month",
      "Basic Graphic Design",
      "Monthly Performance Report",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: 299,
    description: "For businesses ready to grow.",
    popular: true,
    features: [
      "On-Page & Local SEO",
      "Keyword Research",
      "10 Social Media Posts / Month",
      "Social Media Management",
      "Monthly Growth Report",
    ],
    cta: "Grow My Business",
  },
  {
    name: "Professional",
    price: 499,
    description: "For established businesses.",
    features: [
      "Advanced SEO",
      "15 Social Media Posts / Month",
      "Social Media Management",
      "Google & Meta Ads Management",
      "Competitor Analysis",
    ],
    cta: "Go Professional",
  },
  {
    name: "Complete Growth",
    price: 799,
    description: "For businesses wanting complete digital growth.",
    features: [
      "Advanced SEO + AI SEO",
      "20 Social Media Posts / Month",
      "Google & Meta Ads Management",
      "Content & Lead Generation",
      "Conversion Optimization",
    ],
    cta: "Let's Grow",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="bg-surface">
      <SectionHeading
        eyebrow={
          <Eyebrow icon={<Sparkles className="h-3.5 w-3.5" />}>
            Digital Growth Packages
          </Eyebrow>
        }
        title="Digital solutions built to"
        highlight="grow your business"
        subtitle="From websites and SEO to social media, paid advertising, and complete digital marketing, choose a package designed around your business goals."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-14 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {plans.map((plan) => (
          <motion.div key={plan.name} variants={staggerItem} className="h-full">
            <PlanCard plan={plan} />
          </motion.div>
        ))}
      </motion.div>

      {/* Website development note — sold separately, never bundled into monthly plans */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-line bg-white px-6 py-5 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left"
      >
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-display font-bold text-ink">Need a new website?</span>{" "}
          <span className="text-slate-500">
            Website &amp; E-Commerce development packages are available separately.
          </span>
        </p>
        <Link
          href="/services"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
        >
          Explore Website Services
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      {/* Help choosing */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-12 text-center"
      >
        <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
          Not sure which plan is right for you?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-[15px] leading-relaxed text-slate-500">
          Tell us about your business and we&apos;ll recommend the right digital growth solution for you.
        </p>
        <div className="mt-6">
          <Button href="/contact" size="lg" variant="secondary" withArrow>
            <MessageSquareHeart className="h-4 w-4" />
            Talk to an Expert
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const popular = plan.popular;

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 ${
        popular
          ? "z-10 border-2 border-brand-500/50 bg-white shadow-glow-lg lg:-translate-y-3"
          : "border border-line bg-white shadow-soft hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-glow"
      }`}
    >
      {popular && (
        <>
          {/* top gradient line */}
          <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-brand-gradient" />
          <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-400/15 blur-2xl" />
        </>
      )}

      {/* Plan name + badge */}
      <div className="relative flex items-center justify-between gap-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
          {plan.name}
        </h3>
        {popular && (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
            <Sparkles className="h-3 w-3" />
            Most Popular
          </span>
        )}
      </div>

      {/* Price */}
      <div className="relative mt-5 flex items-end gap-1.5">
        <span className="font-display text-5xl font-bold leading-none tracking-tight text-ink">
          ${plan.price}
        </span>
        <span className="mb-1 text-sm font-medium text-slate-500">/ month</span>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
        {plan.description}
      </p>

      <div className="relative my-6 h-px bg-line" />

      {/* Features */}
      <ul className="relative flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-600">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                popular ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-700"
              }`}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative mt-auto pt-7">
        {popular ? (
          <Link
            href="/contact"
            className="group relative inline-flex h-[3.4rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 text-sm font-semibold tracking-tight text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
          >
            <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(340%)]" />
            <span className="relative inline-flex items-center gap-2">
              {plan.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ) : (
          <Link
            href="/contact"
            className="group inline-flex h-[3.2rem] w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold tracking-tight text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/40 hover:text-brand-700 hover:shadow-glow"
          >
            {plan.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
