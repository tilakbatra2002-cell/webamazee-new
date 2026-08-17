"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Linkedin, Instagram, Facebook, CalendarDays, Mail, Phone, Clock,
  ArrowUpRight, ArrowUp, Check, Sparkles, Globe2, MessageSquareHeart, Loader2,
} from "lucide-react";
import { Logo } from "./logo";
import { serviceLinks } from "@/lib/nav";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const company = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const industries = [
  { label: "Ecommerce", href: "/seo-for-ecommerce" },
  { label: "SaaS", href: "/seo-for-saas" },
  { label: "Local Business", href: "/seo-for-local-business" },
  { label: "Tourism", href: "/seo-for-tourism" },
  { label: "Healthcare", href: "/seo-for-healthcare" },
  { label: "Professional Services", href: "/seo-for-professional-services" },
];

const locations = [
  { label: "Zirakpur", href: "/services-in-zirakpur" },
  { label: "Chandigarh", href: "/services-in-chandigarh" },
  { label: "Mohali", href: "/services-in-mohali" },
  { label: "Panchkula", href: "/services-in-panchkula" },
  { label: "New Zealand", href: "/services-in-new-zealand" },
  { label: "UAE", href: "/services-in-uae" },
  { label: "USA", href: "/services-in-usa" },
  { label: "UK", href: "/services-in-uk" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", ariaLabel: "Webamazee on LinkedIn", href: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/" },
  { icon: Instagram, label: "Instagram", ariaLabel: "Webamazee on Instagram", href: "https://www.instagram.com/webamazee/" },
  { icon: Facebook, label: "Facebook", ariaLabel: "Webamazee on Facebook", href: "https://www.facebook.com/people/Webamazee/61589420618603/" },
  { icon: CalendarDays, label: "Calendly", ariaLabel: "Book a meeting on Calendly", href: "https://calendly.com/webamazee0411/30min" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");
  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubscribeError("");
    const data = new FormData(e.currentTarget);
    try {
      await submitWebsiteForm(
        "Footer Newsletter Subscription",
        { email: String(data.get("email") ?? "") },
        String(data.get("websiteConfirm") ?? "")
      );
      setSubscribed(true);
      e.currentTarget.reset();
    } catch (error) {
      setSubscribeError(error instanceof Error ? error.message : "We could not subscribe you. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="relative overflow-hidden bg-[#070d24] text-white">
      {/* top glow + gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/70 to-transparent" />
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-8rem] top-24 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-[-6rem] h-72 w-72 rounded-full bg-brand-400/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1350px] px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* Newsletter strip */}
        <div className="mb-14 flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-6 shadow-soft backdrop-blur-xl sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-brand-400" /> Growth insights, monthly
            </p>
            <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
              Stay ahead of the curve
            </h3>
            <p className="mt-1 text-sm text-white/60">
              AI-driven SEO &amp; marketing tactics, straight to your inbox.
            </p>
          </div>
          <div className="w-full max-w-md">
          <form onSubmit={onSubscribe} className="relative flex w-full gap-2">
            <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
            <input
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              aria-label="Email for newsletter"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none backdrop-blur transition-all placeholder:text-white/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30"
            />
            <button
              type="submit"
              disabled={submitting}
              className="group relative inline-flex h-12 shrink-0 items-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
              {submitting ? <Loader2 className="relative h-4 w-4 animate-spin" /> : subscribed ? <Check className="relative h-4 w-4" /> : <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
              <span className="relative">{submitting ? "Sending…" : subscribed ? "Subscribed" : "Subscribe"}</span>
            </button>
          </form>
          {subscribeError && <p role="alert" className="mt-2 text-sm font-medium text-rose-300">{subscribeError}</p>}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Webamazee home" className="inline-block">
              <Logo dark size="large" />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
              A premium AI-powered digital marketing company helping businesses
              around the world build, optimise and rank.
            </p>

            {/* premium contact card */}
            <div className="relative mt-6 max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-soft backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-500/20 blur-2xl" />
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-300">
                <Globe2 className="h-4 w-4" /> Available Worldwide
              </div>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                <Clock className="h-4 w-4 text-brand-400" /> Usually replies within 24 hours
              </p>
              <div className="mt-4 space-y-2.5">
                <a href="tel:+918360532487" className="group flex items-center gap-3 text-[15px] font-medium text-white/80 transition-colors hover:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-brand-400 transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 83605 32487
                </a>
                <a href="mailto:info@webamazee.com" className="group flex items-center gap-3 text-[15px] font-medium text-white/80 transition-colors hover:text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-brand-400 transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                    <Mail className="h-4 w-4" />
                  </span>
                  info@webamazee.com
                </a>
              </div>
            </div>

            {/* socials */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.ariaLabel}
                  className="group relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:text-white focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  <span aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand-gradient opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
                  <s.icon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* services */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
              Services
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-brand-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-brand-500/60 transition-all duration-300 group-hover:w-3 group-hover:bg-brand-400" />
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* industries */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
              Industries
            </h4>
            <ul className="mt-5 space-y-3">
              {industries.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-white/55 transition-colors hover:text-brand-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* company */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
              Company
            </h4>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-white/55 transition-colors hover:text-brand-300"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">
              Let's grow together
            </h4>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-white/60">
              <MessageSquareHeart className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              Get a personalised growth plan tailored to your business.
            </p>
            <Link
              href="/contact"
              className="group relative mt-5 inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
              <Sparkles className="relative h-4 w-4" />
              <span className="relative">Get Your Free Website Audit</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="mt-3 text-xs text-white/40">
              No obligation · Response within 24 hours
            </p>
          </div>
        </div>

        <nav aria-label="Webamazee service locations" className="mt-12 border-t border-white/10 pt-8">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">Locations</h4>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {locations.map((location) => (
              <li key={location.href}>
                <Link
                  href={location.href}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-sm font-medium text-white/65 transition-all hover:-translate-y-0.5 hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-brand-200 focus-visible:ring-2 focus-visible:ring-brand-400"
                >
                  {location.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Webamazee. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/50">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-gradient hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
