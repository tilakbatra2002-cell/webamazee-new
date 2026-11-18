import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Instagram,
  Facebook,
  Calendar,
} from "lucide-react";
import { CALENDLY_URL, VERIFIED_CONTACT } from "./newhome-data";

const FOOTER_SERVICES = [
  { label: "Website Development", href: "/services/website-development" },
  { label: "Website Redesign", href: "/services/website-redesign" },
  { label: "E-Commerce Development", href: "/services/ecommerce-development" },
  {
    label: "Landing Page Development",
    href: "/services/landing-page-development",
  },
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "AI SEO", href: "/services/ai-seo" },
  { label: "Technical SEO", href: "/services/technical-seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  {
    label: "Content Strategy & AI Content",
    href: "/services/ai-content-optimization",
  },
];

const FOOTER_COMPANY_LINKS = [
  { label: "About Webamazee", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "Products (CRM)", href: "/products" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Free SEO Audit", href: "/free-seo-audit" },
  { label: "Blog & Insights", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const FOOTER_REGIONS = [
  { label: "Chandigarh", href: "/services-in-chandigarh" },
  { label: "Mohali", href: "/services-in-mohali" },
  { label: "Zirakpur", href: "/services-in-zirakpur" },
  { label: "Panchkula", href: "/services-in-panchkula" },
  { label: "New Zealand", href: "/services-in-new-zealand" },
  { label: "USA", href: "/services-in-usa" },
  { label: "UK", href: "/services-in-uk" },
  { label: "UAE", href: "/services-in-uae" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: VERIFIED_CONTACT.socials.linkedin,
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: VERIFIED_CONTACT.socials.instagram,
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: VERIFIED_CONTACT.socials.facebook,
    icon: Facebook,
  },
  {
    label: "Book on Calendly",
    href: CALENDLY_URL,
    icon: Calendar,
  },
];

export function NewHomeFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[#071020] text-slate-300">
      <div className="mx-auto max-w-[1320px] px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & Verified Contact Column */}
          <div className="lg:col-span-4">
            <Link href="/newhome" aria-label="Webamazee">
              <Image
                src="/images/logo-footer.webp"
                alt="Webamazee — Digital Marketing Company"
                width={532}
                height={137}
                className="h-[50px] w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-slate-400">
              Websites, e-commerce development, SEO, AI SEO, and digital
              marketing built to help businesses strengthen their online
              presence and generate enquiries.
            </p>

            {/* Verified contact details */}
            <ul className="mt-6 space-y-3 text-[14px]">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4da3ff]" />
                <span>
                  Mohali, Punjab (Chandigarh Tricity), India — Serving
                  businesses worldwide
                </span>
              </li>
              <li>
                <a
                  href={VERIFIED_CONTACT.phoneHref}
                  className="inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-[#7abaff]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#4da3ff]" />
                  {VERIFIED_CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${VERIFIED_CONTACT.email}`}
                  className="inline-flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#4da3ff]" />
                  {VERIFIED_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Clock className="h-4 w-4 shrink-0 text-[#4da3ff]" />
                <span>{VERIFIED_CONTACT.hours}</span>
              </li>
            </ul>

            {/* Social media links */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Webamazee on ${item.label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0f6dff] hover:bg-[#0f6dff] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">
              Services
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
              {FOOTER_SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-[14px] text-slate-400 transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Website Links Column */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">
              Important Links
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Markets We Serve
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {FOOTER_REGIONS.map((region) => (
                  <Link
                    key={region.href}
                    href={region.href}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[12px] text-slate-300 transition-colors hover:border-[#0f6dff] hover:text-white"
                  >
                    {region.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-[13px] text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Webamazee. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/sitemap"
              className="transition-colors hover:text-white"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
