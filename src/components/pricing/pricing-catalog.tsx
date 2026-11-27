"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { Section } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { MarketSelector } from "@/components/pricing/market-selector";
import { formatUsd, formatInr, type Market } from "@/lib/pricing-market";

import { pricingCategories, type PricingCategory, type PricingPackage } from "./pricing-data";

export type { PricingCategory, PricingPackage };
export { pricingCategories };

function PackageCard({ pkg, market }: { pkg: PricingPackage; market: Market }) {
  const price = market === "india" ? formatInr(pkg.inr) : formatUsd(pkg.usd);
  const billing = pkg.recurring ? "Per month · billed monthly" : "One-time project price";

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-all duration-500 sm:p-7",
        pkg.recommended
          ? "z-10 border-2 border-brand-500/50 bg-white shadow-glow-lg lg:-translate-y-2"
          : "border border-line bg-white shadow-soft hover:-translate-y-1.5 hover:border-brand-600/25 hover:shadow-glow"
      )}
    >
      {pkg.recommended && (
        <>
          <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-brand-gradient" />
          <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-brand-400/15 blur-2xl" />
          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow">
            <Sparkles className="h-3 w-3" />
            Recommended
          </span>
        </>
      )}

      <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-slate-500">
        {pkg.name}
      </h3>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold leading-none tracking-tight text-ink">
            {price}
          </span>
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-brand-700">
          {billing}
        </p>
      </div>

      <div className="my-5 h-px bg-line" />

      <ul className="flex flex-col gap-3">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-600"
          >
            <span
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                pkg.recommended ? "bg-brand-gradient text-white" : "bg-brand-50 text-brand-700"
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {pkg.recommended ? (
          <Link
            href="/contact"
            className="group relative inline-flex h-[3.2rem] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 text-sm font-semibold tracking-tight text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(340%)]"
            />
            <span className="relative inline-flex items-center gap-2">
              {pkg.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ) : (
          <Link
            href="/contact"
            className="group inline-flex h-[3.2rem] w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-semibold tracking-tight text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/40 hover:text-brand-700 hover:shadow-glow"
          >
            {pkg.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export function PricingCatalog() {
  const [active, setActive] = useState(pricingCategories[0].id);
  const [market, setMarket] = useState<Market>("india");

  // Lightweight scroll-spy so the active tab reflects the section in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    pricingCategories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky category navigation + market selector */}
      <div className="sticky top-20 z-30 py-3 sm:top-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-2.5">
          <MarketSelector market={market} onChange={setMarket} />

          <div className="w-full rounded-full border border-white/60 bg-white/80 px-2 py-2 shadow-soft backdrop-blur-xl">
            <nav aria-label="Pricing categories" className="flex items-center justify-between gap-1 overflow-x-auto">
              {pricingCategories.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className={cn(
                    "flex-1 whitespace-nowrap rounded-full px-3 py-2 text-center text-[13px] font-semibold transition-colors duration-300 sm:text-sm",
                    active === c.id
                      ? "bg-brand-gradient text-white shadow-glow"
                      : "text-slate-600 hover:text-brand-700"
                  )}
                >
                  {c.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Section id="pricing-catalog" className="pt-8" >
        <div className="space-y-20 sm:space-y-24">
          {pricingCategories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              aria-labelledby={`${category.id}-title`}
              className="scroll-mt-56"
            >
              {/* Category header */}
              <div className="flex items-start gap-4 sm:items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 font-display text-lg font-bold text-brand-700">
                  {category.number}
                </span>
                <div>
                  <h2
                    id={`${category.id}-title`}
                    className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Packages */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="mt-9 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
              >
                {category.packages.map((pkg) => (
                  <motion.div key={pkg.name} variants={staggerItem} className="h-full">
                    <PackageCard pkg={pkg} market={market} />
                  </motion.div>
                ))}
              </motion.div>
            </section>
          ))}
        </div>

        {/* Custom solution CTA */}
        <div className="mt-20 text-center sm:mt-24">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500">
            Don&apos;t see the right package for your business? Let&apos;s create a solution around
            your exact requirements.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/contact" size="lg" withArrow>
              Talk to an Expert
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
