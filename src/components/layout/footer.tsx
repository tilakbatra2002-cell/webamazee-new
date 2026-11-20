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

const quickLinks = [
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

const headingClass =
  "font-display text-[12px] font-bold uppercase tracking-[0.15em] text-[#0b1528]";
const linkBaseClass =
  "relative inline-flex w-fit max-w-full items-center text-slate-600 transition-colors duration-200 hover:text-[#0f6dff] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#0f6dff] after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:after:transition-none";
const mainLinkClass = `${linkBaseClass} text-[14px] leading-relaxed`;
const compactLinkClass = `${linkBaseClass} text-[13px] leading-relaxed`;

export function Footer() {
  function scrollToTop() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#dce8f5] bg-gradient-to-br from-[#f8fbff] via-white to-[#f1f7ff] text-[#0b1528]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0f6dff]/55 to-transparent" />
      <svg
        aria-hidden="true"
        viewBox="0 0 760 250"
        className="pointer-events-none absolute -right-24 -top-16 hidden h-[250px] w-[760px] sm:block"
      >
        <defs>
          <linearGradient id="footer-blue-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0f6dff" stopOpacity="0.01" />
            <stop offset="1" stopColor="#0f6dff" stopOpacity="0.075" />
          </linearGradient>
        </defs>
        <path d="M760 0H300c82 42 106 88 196 96 87 8 158-31 264-86Z" fill="url(#footer-blue-accent)" />
        <path d="M215 0c70 54 125 103 226 110 111 8 196-35 319-99" fill="none" stroke="#0f6dff" strokeOpacity="0.13" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M330 0c73 48 130 78 206 81 76 3 141-22 224-65" fill="none" stroke="#0f6dff" strokeOpacity="0.08" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      <div className="relative mx-auto max-w-[1320px] px-4 pb-6 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-[72px]">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-12">
          <section className="sm:col-span-2 lg:col-span-3" aria-labelledby="footer-brand-heading">
            <h2 id="footer-brand-heading" className="sr-only">About Webamazee</h2>
            <Link href="/" aria-label="Webamazee home" className="inline-flex rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff]">
              <Logo size="large" />
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.75] text-slate-600">
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
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-[#0f6dff] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/40 hover:bg-[#eef5ff] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6dff] motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <FooterIcon name={social.icon} className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
                </a>
              ))}
            </nav>
          </section>

          <nav className="lg:col-span-2" aria-label="Quick links">
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={mainLinkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Our services">
            <h2 className={headingClass}>Our Services</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className={compactLinkClass}>{service.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label="Our products">
            <h2 className={headingClass}>Our Products</h2>
            <ul className="mt-4 space-y-2.5">
              {activeProducts.map((product) => (
                <li key={product.href}>
                  <Link href={product.href} className={mainLinkClass}>{product.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/products" className={mainLinkClass}>All Products</Link>
              </li>
            </ul>
          </nav>

          <section className="lg:col-span-2" aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className={headingClass}>Contact</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`mailto:${VERIFIED_CONTACT.email}`} className="group flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 transition-colors hover:text-[#0f6dff] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff]">
                  <FooterIcon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                  <span className="break-all">{VERIFIED_CONTACT.email}</span>
                </a>
              </li>
              <li>
                <Link href="/" className="group flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 transition-colors hover:text-[#0f6dff] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff]">
                  <FooterIcon name="globe" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                  <span>www.webamazee.com</span>
                </Link>
              </li>
              <li>
                <a href={VERIFIED_CONTACT.phoneHref} className="group flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600 transition-colors hover:text-[#0f6dff] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0f6dff]">
                  <FooterIcon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                  <span>{VERIFIED_CONTACT.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-600">
                <FooterIcon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]" />
                <span>{VERIFIED_CONTACT.locationShort}</span>
              </li>
            </ul>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#0f6dff]/20 bg-[#eef5ff] px-3.5 text-[13px] font-bold text-[#0b57d0] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/45 hover:bg-white hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6dff] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <FooterIcon name="calendar" className="h-4 w-4 text-[#0f6dff]" />
              Book a consultation
              <FooterIcon name="arrow-right" className="h-3.5 w-3.5 text-[#0f6dff]" />
            </a>
          </section>
        </div>

        <div className="mt-12 grid gap-8 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <nav className="lg:col-span-3" aria-label="More Webamazee links">
            <h2 className={headingClass}>More from Webamazee</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={compactLinkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="lg:col-span-4" aria-label="Industries we serve">
            <h2 className={headingClass}>Industries</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2.5">
              {industryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={compactLinkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="lg:col-span-5" aria-label="Service locations">
            <h2 className={headingClass}>Locations</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2.5">
              {locationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={compactLinkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-slate-500">
            © {new Date().getFullYear()} Webamazee. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <nav aria-label="Legal information">
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                <li><Link href="/privacy-policy" className={compactLinkClass}>Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className={compactLinkClass}>Terms &amp; Conditions</Link></li>
                <li><Link href="/sitemap" className={compactLinkClass}>Sitemap</Link></li>
              </ul>
            </nav>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0f6dff]/20 bg-white text-[#0f6dff] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff]/50 hover:bg-[#eef5ff] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#0f6dff] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <FooterIcon name="arrow-up" className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
