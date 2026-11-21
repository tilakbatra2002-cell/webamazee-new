"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Linkedin,
  Instagram,
  Facebook,
  CalendarDays,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  ArrowUp,
  Sparkles,
  Globe2,
  MapPin,
  Info,
} from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { serviceLinks, productLinks } from "@/lib/nav";

const company = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Free SEO Audit", href: "/free-seo-audit" },
  { label: "Contact", href: "/contact" },
];

const products = [
  { label: "All Products", href: "/products" },
  ...productLinks.map((p) => ({ label: p.short, href: p.href })),
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
  { label: "Sitemap", href: "/sitemap" },
];

const socials = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    ariaLabel: "Webamazee on LinkedIn",
    href: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/",
  },
  {
    icon: Instagram,
    label: "Instagram",
    ariaLabel: "Webamazee on Instagram",
    href: "https://www.instagram.com/webamazee/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    ariaLabel: "Webamazee on Facebook",
    href: "https://www.facebook.com/people/Webamazee/61589420618603/",
  },
  {
    icon: CalendarDays,
    label: "Calendly",
    ariaLabel: "Book a meeting on Calendly",
    href: "https://calendly.com/webamazee0411/30min",
  },
];

const footerLinkClass =
  "group inline-flex items-center gap-2 text-[14px] leading-snug text-slate-600 transition-colors duration-200 hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 rounded-sm";

const sectionHeadingClass =
  "font-display text-xs font-bold uppercase tracking-[0.14em] text-[#0b1528]";

export function NewFooterPreview() {
  const [previewNotice, setPreviewNotice] = useState(false);

  function handlePreviewSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPreviewNotice(true);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white pt-20 text-[#0b1528] sm:pt-24">
      {/* Compact light-mode preview context header */}
      <section className="border-b border-slate-200/80 bg-white pb-10 pt-8 sm:pb-12 sm:pt-10">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0f6dff]/20 bg-[#eef5ff] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                Isolated Preview Route · /newfooter
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.025em] text-[#0b1528] sm:text-4xl">
                Light-Theme Global Footer Design
              </h1>
              <p className="mt-3 text-[15.5px] leading-relaxed text-slate-600">
                Previewing the proposed light-theme footer transition against a clean white page
                surface. The active global dark footer remains completely untouched across the live
                website.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#new-light-footer"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0f6dff] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(15,109,255,0.48)] transition-colors hover:bg-[#0b57d0]"
              >
                Inspect Footer Design
              </a>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff]"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proposed Light-Theme Footer */}
      <footer
        id="new-light-footer"
        aria-label="Proposed light-theme Webamazee footer preview"
        className="relative overflow-hidden border-t border-[#dde7f6] bg-[#f6f9ff] text-[#0b1528]"
      >
        {/* Subtle top brand accent hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#0f6dff]/55 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[58rem] -translate-x-1/2 rounded-full bg-[#0f6dff]/[0.045] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-[1350px] px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
          {/* Newsletter Strip — Explicit Non-Submitting Visual Preview */}
          <div className="rounded-3xl border border-[#dce6f4] bg-white p-6 shadow-[0_18px_42px_-28px_rgba(11,21,40,0.14)] sm:p-8 lg:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="max-w-lg">
                <p className="inline-flex items-center gap-2 rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-semibold text-[#0f6dff]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Growth insights, monthly
                </p>
                <h2 className="mt-3 font-display text-xl font-bold tracking-[-0.02em] text-[#0b1528] sm:text-2xl">
                  Stay ahead of the curve
                </h2>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-600">
                  AI-driven SEO &amp; marketing tactics, straight to your inbox.
                </p>
              </div>

              <div className="w-full max-w-lg">
                <form
                  onSubmit={handlePreviewSubscribe}
                  className="flex flex-col gap-2.5 sm:flex-row"
                >
                  <label htmlFor="preview-newsletter-email" className="sr-only">
                    Email address for newsletter preview
                  </label>
                  <input
                    id="preview-newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-xl border border-[#d6e2f2] bg-[#f8fbff] px-4 text-sm text-[#0b1528] outline-none transition-all placeholder:text-slate-400 focus:border-[#0f6dff] focus:bg-white focus:ring-4 focus:ring-[#0f6dff]/10"
                  />
                  <button
                    type="submit"
                    className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(15,109,255,0.45)] transition-all duration-200 hover:bg-[#0b57d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2"
                  >
                    <span>Subscribe</span>
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </form>

                {previewNotice ? (
                  <p
                    role="status"
                    className="mt-2.5 flex items-start gap-2 rounded-lg border border-[#dce6f4] bg-[#f7faff] px-3 py-2 text-xs font-medium text-[#0b1528]"
                  >
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0f6dff]" aria-hidden="true" />
                    <span>
                      Visual preview only — newsletter submission is disabled on{" "}
                      <span className="font-semibold">/newfooter</span> so test entries are not sent
                      to live inboxes.
                    </span>
                  </p>
                ) : (
                  <p className="mt-2.5 text-xs text-slate-500">
                    Visual preview only — live newsletter submissions remain active on the live
                    website footer.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Directory Grid */}
          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8">
            {/* Brand & Verified Contact Column */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                aria-label="Webamazee home"
                className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff]"
              >
                <Logo className="[&_img]:h-[38px] sm:[&_img]:h-[44px]" />
              </Link>

              <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-slate-600">
                A premium AI-powered digital marketing company helping businesses around the world
                build, optimise and rank.
              </p>

              {/* Elevated White Contact Surface */}
              <div className="mt-6 max-w-sm rounded-2xl border border-[#dce6f4] bg-white p-5 shadow-[0_12px_32px_-24px_rgba(11,21,40,0.14)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#0f6dff]">
                    <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Available Worldwide
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-[13.5px] text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-[#0f6dff]" aria-hidden="true" />
                  Usually replies promptly
                </p>

                <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
                  <a
                    href="tel:+918360532487"
                    className="group flex items-center gap-3 rounded-xl px-1 py-0.5 text-[14.5px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#dce6f4] bg-[#f5f9ff] text-[#0f6dff] transition-colors group-hover:border-[#0f6dff] group-hover:bg-[#0f6dff] group-hover:text-white">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>+91 83605 32487</span>
                  </a>

                  <a
                    href="mailto:info@webamazee.com"
                    className="group flex items-center gap-3 rounded-xl px-1 py-0.5 text-[14.5px] font-semibold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#dce6f4] bg-[#f5f9ff] text-[#0f6dff] transition-colors group-hover:border-[#0f6dff] group-hover:bg-[#0f6dff] group-hover:text-white">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>info@webamazee.com</span>
                  </a>
                </div>
              </div>

              {/* Verified Social Profiles */}
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[#dce6f4] bg-white text-slate-600 shadow-[0_4px_14px_-8px_rgba(11,21,40,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff]"
                  >
                    <s.icon className="h-[17px] w-[17px]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2.5">
                <h3 className={sectionHeadingClass}>Services</h3>
                <span className="h-0.5 w-6 rounded-full bg-[#0f6dff]/70" aria-hidden="true" />
              </div>
              <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {serviceLinks.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className={footerLinkClass}>
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]/35 transition-all duration-200 group-hover:scale-125 group-hover:bg-[#0f6dff]"
                      />
                      <span className="underline-offset-4 group-hover:underline">
                        {s.short}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products & Industries Column */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:gap-8">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className={sectionHeadingClass}>Products</h3>
                  <span className="h-0.5 w-6 rounded-full bg-[#0f6dff]/70" aria-hidden="true" />
                </div>
                <ul className="mt-5 space-y-2.5">
                  {products.map((product) => (
                    <li key={product.href}>
                      <Link href={product.href} className={footerLinkClass}>
                        <span className="underline-offset-4 group-hover:underline">
                          {product.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className={sectionHeadingClass}>Industries</h3>
                  <span className="h-0.5 w-6 rounded-full bg-[#0f6dff]/70" aria-hidden="true" />
                </div>
                <ul className="mt-5 space-y-2.5">
                  {industries.map((industry) => (
                    <li key={industry.href}>
                      <Link href={industry.href} className={footerLinkClass}>
                        <span className="underline-offset-4 group-hover:underline">
                          {industry.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5">
                <h3 className={sectionHeadingClass}>Company</h3>
                <span className="h-0.5 w-6 rounded-full bg-[#0f6dff]/70" aria-hidden="true" />
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-1">
                {company.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLinkClass}>
                      <span className="underline-offset-4 group-hover:underline">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Service Locations Bar */}
          <nav
            aria-label="Webamazee service locations (preview)"
            className="mt-12 border-t border-[#dce6f4] pt-8"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
                <h3 className={sectionHeadingClass}>Locations</h3>
              </div>
              <p className="text-xs font-medium text-slate-500">
                Serving businesses locally &amp; globally
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link
                    href={location.href}
                    className="inline-flex items-center rounded-full border border-[#dce6f4] bg-white px-3.5 py-1.5 text-[13.5px] font-medium text-slate-700 shadow-[0_2px_8px_-6px_rgba(11,21,40,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff] hover:bg-[#eef5ff] hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff]"
                  >
                    {location.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Legal & Back-to-Top Bar */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#dce6f4] pt-7 sm:flex-row">
            <p className="text-center text-[13.5px] text-slate-500 sm:text-left">
              © {new Date().getFullYear()} Webamazee. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-slate-600">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline-offset-4 transition-colors hover:text-[#0f6dff] hover:underline"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#dce6f4] bg-white text-[#0b1528] shadow-[0_4px_12px_-6px_rgba(11,21,40,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff]"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Clear visual boundary above the global RouteShell footer */}
      <div className="border-y border-slate-200 bg-slate-100 px-4 py-3 text-center text-xs font-medium text-slate-600">
        End of <span className="font-semibold text-[#0b1528]">/newfooter</span> light-theme
        preview — below is the untouched active dark footer rendered globally by RouteShell.
      </div>
    </div>
  );
}
