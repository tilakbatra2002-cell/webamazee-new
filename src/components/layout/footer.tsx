"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { footerServiceLinks } from "@/lib/nav";
import { products } from "@/lib/products";
import { CALENDLY_URL, VERIFIED_CONTACT } from "@/components/newhome/newhome-data";

type FooterIconName =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "mail"
  | "phone"
  | "globe"
  | "pin"
  | "calendar"
  | "arrow-up"
  | "arrow-right";

function FooterIcon({
  name,
  className,
}: {
  name: FooterIconName;
  className?: string;
}) {
  const props = {
    viewBox: "0 0 24 24",
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "linkedin":
      return (
        <svg {...props}>
          <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4" />
          <path d="M7.5 10v6.5M7.5 7.5h.01M11 16.5v-3.25a2.75 2.75 0 0 1 5.5 0v3.25M11 10v6.5" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...props}>
          <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...props}>
          <path d="M14.25 8.25h2.5V5.5h-2.5A4.25 4.25 0 0 0 10 9.75v2H7.5v2.75H10V19h3v-4.5h3l.5-2.75H13v-2a1.5 1.5 0 0 1 1.25-1.5Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props}>
          <path d="M7.1 3.5h2.2l1.2 3.3-1.7 1.5a13.7 13.7 0 0 0 6.9 6.9l1.5-1.7 3.3 1.2v2.2c0 1.2-1 2.1-2.2 2.1A16.2 16.2 0 0 1 4.9 5.7c0-1.2.9-2.2 2.2-2.2Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      );
    case "pin":
      return (
        <svg {...props}>
          <path d="M20 10.2c0 4.8-8 10.2-8 10.2s-8-5.4-8-10.2a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M7.5 3.5v3M16.5 3.5v3M3 9.5h18" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...props}>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M4.5 12h15M13 5.5l6.5 6.5-6.5 6.5" />
        </svg>
      );
  }
}

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Work / Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Free SEO Audit", href: "/free-seo-audit" },
];

const industryLinks = [
  { label: "Ecommerce", href: "/seo-for-ecommerce" },
  { label: "SaaS", href: "/seo-for-saas" },
  { label: "Local Business", href: "/seo-for-local-business" },
  { label: "Tourism", href: "/seo-for-tourism" },
  { label: "Healthcare", href: "/seo-for-healthcare" },
  { label: "Professional Services", href: "/seo-for-professional-services" },
];

const locationLinks = [
  { label: "Zirakpur", href: "/services-in-zirakpur" },
  { label: "Chandigarh", href: "/services-in-chandigarh" },
  { label: "Mohali", href: "/services-in-mohali" },
  { label: "Panchkula", href: "/services-in-panchkula" },
  { label: "New Zealand", href: "/services-in-new-zealand" },
  { label: "UAE", href: "/services-in-uae" },
  { label: "USA", href: "/services-in-usa" },
  { label: "UK", href: "/services-in-uk" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: VERIFIED_CONTACT.socials.linkedin,
    icon: "linkedin" as const,
  },
  {
    label: "Instagram",
    href: VERIFIED_CONTACT.socials.instagram,
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: VERIFIED_CONTACT.socials.facebook,
    icon: "facebook" as const,
  },
];

const serviceLinks = [
  { label: "Digital Marketing", href: "/services" },
  ...footerServiceLinks.map((service) => ({
    label: service.label,
    href: service.href,
  })),
];

const activeProducts = products
  .filter((product) => product.status === "LIVE")
  .map((product) => ({ label: product.name, href: product.path }));

const sectionHeading =
  "font-display text-[12px] font-bold uppercase tracking-[0.17em] text-white/85";
const footerLinkBase =
  "relative inline-flex w-fit max-w-full items-center text-white/65 transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ba4ff] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#0f6dff] after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";
const mainLink = `${footerLinkBase} text-[13.5px] leading-relaxed`;
const compactLink = `${footerLinkBase} text-[12.5px] leading-relaxed`;

export function Footer() {
  function scrollToTop() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <div id="site-footer" className="relative isolate overflow-hidden bg-white">
      <section
        aria-labelledby="footer-cta-heading"
        className="relative z-10 mx-auto -mb-14 max-w-[1320px] px-4 sm:px-6 lg:px-8"
      >
        <div className="relative isolate overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-[#103465] via-[#0b1c38] to-[#071020] px-6 py-8 shadow-[0_30px_80px_-34px_rgba(15,109,255,0.55)] sm:px-9 sm:py-10 lg:px-12 lg:py-11">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0f6dff] via-[#55a7ff] to-[#0f6dff]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(77,163,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(77,163,255,0.12) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage:
                "linear-gradient(105deg, rgba(0,0,0,0.72), transparent 75%)",
              WebkitMaskImage:
                "linear-gradient(105deg, rgba(0,0,0,0.72), transparent 75%)",
            }}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 420 260"
            className="pointer-events-none absolute -right-14 -top-16 h-[250px] w-[400px] opacity-70"
          >
            <defs>
              <radialGradient id="footer-cta-glow" cx="75%" cy="22%" r="75%">
                <stop offset="0" stopColor="#0f6dff" stopOpacity="0.26" />
                <stop offset="1" stopColor="#0f6dff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="305" cy="70" r="190" fill="url(#footer-cta-glow)" />
            <path d="M205 0c52 40 82 91 141 103 24 5 48 1 74-12" fill="none" stroke="#70b5ff" strokeOpacity="0.22" strokeWidth="1.4" strokeLinecap="round" />
            <path d="M229 0c45 35 69 70 116 80 24 5 48 1 75-12" fill="none" stroke="#70b5ff" strokeOpacity="0.13" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="relative grid items-center gap-7 md:grid-cols-[1fr_auto] md:gap-10">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8ec5ff]">
                Let&apos;s make the next step count
              </p>
              <h2
                id="footer-cta-heading"
                className="mt-3 font-display text-[1.85rem] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.3rem] lg:text-[2.65rem]"
              >
                Have a project in mind? Let&apos;s build something great.
              </h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]">
                Tell us about your website, SEO or digital marketing goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white shadow-[0_12px_28px_-8px_rgba(15,109,255,0.75)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#257bff] hover:shadow-[0_16px_34px_-8px_rgba(15,109,255,0.72)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
            >
              Start a Project
              <FooterIcon name="arrow-right" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#050b18] via-[#0b1528] to-[#0a1c39] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_5%,rgba(15,109,255,0.18),transparent_38%),radial-gradient(ellipse_at_0%_55%,rgba(30,136,255,0.11),transparent_32%)]" />
        <svg
          aria-hidden="true"
          viewBox="0 0 900 340"
          className="pointer-events-none absolute right-0 top-0 hidden h-[340px] w-[900px] opacity-45 lg:block"
        >
          <defs>
            <linearGradient id="footer-arc-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0f6dff" stopOpacity="0" />
              <stop offset="0.58" stopColor="#0f6dff" stopOpacity="0.25" />
              <stop offset="1" stopColor="#6eb7ff" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path d="M360 -30c118 94 194 154 297 148 74-4 131-45 268-130" fill="none" stroke="url(#footer-arc-line)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M388 -24c106 80 176 126 270 122 71-3 132-42 260-112" fill="none" stroke="url(#footer-arc-line)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M430 -20c88 62 151 98 229 94 68-4 122-34 222-87" fill="none" stroke="url(#footer-arc-line)" strokeWidth="1" strokeLinecap="round" />
        </svg>

        <div className="relative mx-auto max-w-[1320px] px-4 pb-6 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-7">
            <section className="sm:col-span-2 lg:col-span-3" aria-labelledby="footer-brand-heading">
              <h2 id="footer-brand-heading" className="sr-only">Webamazee</h2>
              <Link
                href="/"
                aria-label="Webamazee home"
                className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6eb7ff]"
              >
                <Logo dark size="large" />
              </Link>
              <p className="mt-4 max-w-sm text-[13.5px] leading-[1.75] text-slate-300/75">
                We help businesses grow through strategic web development, SEO and digital marketing.
              </p>
              <nav aria-label="Webamazee social media" className="mt-6 flex items-center gap-2.5">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Webamazee on ${social.label}`}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] text-[#7dbbff] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/70 hover:bg-[#0f6dff]/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6eb7ff] motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    <FooterIcon name={social.icon} className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
                  </a>
                ))}
              </nav>
            </section>

            <nav className="lg:col-span-2" aria-label="Company">
              <h2 className={sectionHeading}>Company</h2>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={mainLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="lg:col-span-3" aria-label="Services">
              <h2 className={sectionHeading}>Services</h2>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {serviceLinks.map((service) => (
                  <li key={service.href}>
                    <Link href={service.href} className={compactLink}>{service.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="lg:col-span-2" aria-label="Products">
              <h2 className={sectionHeading}>Products</h2>
              <ul className="mt-4 space-y-2.5">
                {activeProducts.map((product) => (
                  <li key={product.href}>
                    <Link href={product.href} className={mainLink}>{product.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/products" className={mainLink}>All Products</Link>
                </li>
              </ul>
            </nav>

            <section className="lg:col-span-2" aria-labelledby="footer-contact-heading">
              <h2 id="footer-contact-heading" className={sectionHeading}>Get in Touch</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${VERIFIED_CONTACT.email}`}
                    className="group flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-300/75 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6eb7ff]"
                  >
                    <FooterIcon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-[#5ba4ff]" />
                    <span className="break-all">{VERIFIED_CONTACT.email}</span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/"
                    className="group flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-300/75 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6eb7ff]"
                  >
                    <FooterIcon name="globe" className="mt-0.5 h-4 w-4 shrink-0 text-[#5ba4ff]" />
                    <span>www.webamazee.com</span>
                  </Link>
                </li>
                <li>
                  <a
                    href={VERIFIED_CONTACT.phoneHref}
                    className="group flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-300/75 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6eb7ff]"
                  >
                    <FooterIcon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-[#5ba4ff]" />
                    <span>{VERIFIED_CONTACT.phone}</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-slate-300/75">
                  <FooterIcon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#5ba4ff]" />
                  <span>{VERIFIED_CONTACT.locationShort}</span>
                </li>
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-[12.5px] font-semibold text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/50 hover:bg-[#0f6dff]/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6eb7ff] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <FooterIcon name="calendar" className="h-4 w-4 text-[#5ba4ff]" />
                Book a consultation
                <FooterIcon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
              </a>
            </section>
          </div>

          <div className="mt-11 grid gap-7 border-t border-white/10 pt-7 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <nav className="lg:col-span-3" aria-label="More company links">
              <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                More from Webamazee
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={compactLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="lg:col-span-4" aria-label="Industries served">
              <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                Industries
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {industryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={compactLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="lg:col-span-5" aria-label="Service locations">
              <h2 className="font-display text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                Locations
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {locationLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={compactLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] leading-relaxed text-slate-400">
              © {new Date().getFullYear()} Webamazee. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <nav aria-label="Legal information">
                <ul className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                  <li><Link href="/privacy-policy" className={compactLink}>Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className={compactLink}>Terms &amp; Conditions</Link></li>
                  <li><Link href="/sitemap" className={compactLink}>Sitemap</Link></li>
                </ul>
              </nav>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[#80bdff] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/70 hover:bg-[#0f6dff]/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6eb7ff] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <FooterIcon name="arrow-up" className="h-[18px] w-[18px]" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
