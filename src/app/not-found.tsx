import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Compass, Home, Layers, LayoutGrid, FileText,
  MessageCircleQuestion, Mail, Sparkles,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CTABanner } from "@/components/layout/cta-banner";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description:
    "The page you're looking for doesn't exist, has been moved, or is temporarily unavailable. Explore Webamazee's services instead.",
  robots: { index: false, follow: false },
};

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Layers },
  { label: "Portfolio", href: "/portfolio", icon: LayoutGrid },
  { label: "About", href: "/about", icon: Compass },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "Contact", href: "/contact", icon: MessageCircleQuestion },
];

export default function NotFound() {
  return (
    <>
      {/* Hero / Main 404 */}
      <Section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(55%_60%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[42rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full bg-brand-600/8 blur-3xl animate-aurora" style={{ animationDelay: "2s" }} />

        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" /> Error 404
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-[5.5rem] font-bold leading-none tracking-tight text-ink sm:text-[9rem] text-balance">
              404
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Page <span className="text-gradient">Not Found</span>
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-500 text-pretty">
              The page you're looking for doesn't exist, has been moved, or is
              temporarily unavailable.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" href="/" withArrow>
                Back to Home
              </Button>
              <Button size="lg" variant="secondary" href="/services">
                Explore Services
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Helpful navigation */}
      <Section className="bg-surface">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Explore <span className="text-gradient">Webamazee</span>
            </h2>
            <p className="mt-3 text-slate-500">
              Take a look at some of our most popular pages.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navLinks.map((l, i) => (
              <Reveal key={l.href} delay={i * 0.06}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                    <l.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                    {l.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Conversion CTA */}
      <Section className="bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand-600/20 bg-gradient-to-br from-brand-50 to-white p-8 shadow-soft">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-200/25 blur-3xl" />
              <Eyebrow>
                <MessageCircleQuestion className="h-3.5 w-3.5" /> Need a hand?
              </Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                Looking for something specific?
              </h2>
              <p className="mt-3 text-slate-500">
                Let Webamazee help you find the right digital solution.
              </p>
              <div className="mt-6">
                <Button href="/contact">
                  <Mail className="h-4 w-4" /> Talk to Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABanner />
    </>
  );
}
