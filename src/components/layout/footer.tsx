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
  ArrowUp,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { Logo } from "./logo";
import { serviceLinks, productLinks } from "@/lib/nav";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const webSlugs = new Set([
  "/services/website-development",
  "/services/website-redesign",
  "/services/landing-page-development",
  "/services/ecommerce-development",
]);

const socialSlugs = new Set([
  "/services/social-media-management",
  "/services/social-media-marketing",
  "/services/instagram-marketing",
  "/services/facebook-marketing",
  "/services/linkedin-marketing",
  "/services/social-media-advertising",
]);

const webServices = serviceLinks.filter((s) => webSlugs.has(s.href));
const socialServices = serviceLinks.filter((s) => socialSlugs.has(s.href));
const searchServices = serviceLinks.filter(
  (s) => !webSlugs.has(s.href) && !socialSlugs.has(s.href)
);

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
  { label: "All products", href: "/products" },
  ...productLinks.map((p) => ({ label: p.short, href: p.href })),
];

const industries = [
  { label: "All industries", href: "/industries" },
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

/**
 * Footer headings: no letter-spacing anywhere (overrides the global
 * `h1..h6 { letter-spacing: -0.02em }` base rule).
 */
const headingClass =
  "font-display text-[13px] font-bold leading-none text-[#0b1528] [letter-spacing:normal]";

const groupLabelClass =
  "font-display text-[11.5px] font-semibold leading-none text-slate-500 [letter-spacing:normal]";

const linkClass =
  "inline-block rounded-sm text-[13px] leading-[1.4] text-slate-600 transition-colors duration-150 hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]";

const listClass = "mt-2.5 space-y-1";

function LinkList({
  items,
  className = listClass,
}: {
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={`${item.href}-${item.label}`}>
          <Link href={item.href} className={linkClass}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubscribeError("");
    setSubscribed(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitWebsiteForm(
        "Footer Newsletter Subscription",
        { email: String(data.get("email") ?? "") },
        String(data.get("websiteConfirm") ?? "")
      );
      setSubscribed(true);
      form.reset();
    } catch (error) {
      setSubscribeError(
        error instanceof Error
          ? error.message
          : "We could not subscribe you. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="border-t-2 border-[#0f6dff] bg-[#f5f9ff] text-[#0b1528]">
      <div className="mx-auto w-full max-w-[1320px] px-4 pb-6 pt-8 sm:px-6 sm:pt-9 lg:px-8">
        {/* Main columns: brand · services · quick links · contact */}
        <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-10">
          {/* Tablet column A — dissolves into the 12-col grid on desktop */}
          <div className="space-y-8 lg:contents lg:space-y-0">
          {/* Company info */}
          <div className="lg:col-span-3 lg:col-start-1">
            <Link
              href="/"
              aria-label="Webamazee home"
              className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]"
            >
              <Logo className="[&_img]:h-8 sm:[&_img]:h-9" />
            </Link>

            <p className="mt-3 max-w-[280px] text-[13px] leading-[1.6] text-slate-600">
              AI-assisted digital marketing, web development and SEO for
              businesses in India and worldwide.
            </p>

            <ul className="mt-4 flex flex-wrap items-center gap-1.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.ariaLabel}
                    title={s.label}
                    className="grid h-8 w-8 place-items-center rounded-md border border-[#dbe6f4] bg-white text-slate-500 transition-colors duration-150 hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]"
                  >
                    <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4 lg:col-start-4">
            <div className="flex items-baseline gap-2.5">
              <h3 className={headingClass}>Services</h3>
              <Link
                href="/services"
                className="text-[11.5px] font-medium text-[#0f6dff] transition-colors hover:text-[#0b57d0]"
              >
                View all
              </Link>
            </div>

            <div className="mt-2.5 grid grid-cols-2 gap-x-4">
              <div>
                <p className={groupLabelClass}>Web &amp; stores</p>
                <LinkList
                  items={webServices.map((s) => ({ label: s.short, href: s.href }))}
                />
                <p className={`${groupLabelClass} mt-3`}>Social</p>
                <LinkList
                  items={socialServices.map((s) => ({ label: s.short, href: s.href }))}
                />
              </div>
              <div>
                <p className={groupLabelClass}>SEO &amp; AI growth</p>
                <LinkList
                  items={searchServices.map((s) => ({ label: s.short, href: s.href }))}
                />
              </div>
            </div>
          </div>

          </div>

          {/* Tablet column B — dissolves into the 12-col grid on desktop */}
          <div className="space-y-8 lg:contents lg:space-y-0">
          {/* Quick links */}
          <div className="lg:col-span-2 lg:col-start-8">
            <h3 className={headingClass}>Quick links</h3>
            <LinkList
              items={company}
              className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-1"
            />

            <h3 className={`${headingClass} mt-4`}>Products</h3>
            <LinkList items={products} />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className={headingClass}>Get in touch</h3>

            <p className="mt-3 text-[13px] leading-[1.6] text-slate-600">
              Tell us what you want to grow and we will map the shortest
              practical route. Usually replies the same working day.
            </p>

            <ul className="mt-3 space-y-1">
              <li>
                <a href="tel:+918360532487" className={linkClass}>
                  <span className="inline-flex items-center gap-2 text-slate-700">
                    <Phone
                      className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                      aria-hidden="true"
                    />
                    +91 83605 32487
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:info@webamazee.com" className={linkClass}>
                  <span className="inline-flex items-center gap-2 text-slate-700">
                    <Mail
                      className="h-3.5 w-3.5 shrink-0 text-[#0f6dff]"
                      aria-hidden="true"
                    />
                    info@webamazee.com
                  </span>
                </a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-[#0f6dff] px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors duration-150 hover:bg-[#0b57d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]"
            >
              Start a conversation
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>

            <form onSubmit={onSubscribe} className="mt-4 max-w-[280px]">
              <label
                htmlFor="footer-newsletter-email"
                className={`${groupLabelClass} block`}
              >
                Monthly insights
              </label>
              <input
                name="websiteConfirm"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />
              <div className="mt-2 flex items-center gap-1.5">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  onChange={() => {
                    if (subscribed) setSubscribed(false);
                    if (subscribeError) setSubscribeError("");
                  }}
                  className="h-8 w-full min-w-0 rounded-md border border-[#dbe6f4] bg-white px-2.5 text-[12.5px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Subscribe to Webamazee insights"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-[#dbe6f4] bg-white text-[#0f6dff] transition-colors duration-150 hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : subscribed ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <p
                role={subscribeError ? "alert" : undefined}
                className={`mt-1.5 text-[11px] leading-snug ${
                  subscribeError ? "text-rose-600" : "text-slate-500"
                }`}
              >
                {subscribeError ||
                  (subscribed ? "Subscribed. Thank you." : "No spam, unsubscribe anytime.")}
              </p>
            </form>
          </div>
          </div>
        </div>

        {/* Industries + service locations */}
        <div className="mt-7 space-y-2.5 border-t border-[#e2eaf5] pt-5">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className={`${headingClass} w-[88px] shrink-0`}>Industries</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {industries.map((industry) => (
                <li key={industry.href}>
                  <Link href={industry.href} className={linkClass}>
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className={`${headingClass} w-[88px] shrink-0`}>Locations</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link href={location.href} className={linkClass}>
                    {location.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col gap-2.5 border-t border-[#e2eaf5] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-slate-500">
            © {new Date().getFullYear()} Webamazee. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            {legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm text-[12.5px] text-slate-600 transition-colors hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border border-[#dbe6f4] bg-white px-1.5 text-[11.5px] font-semibold text-slate-600 transition-colors duration-150 hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f6dff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f9ff]"
            >
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
