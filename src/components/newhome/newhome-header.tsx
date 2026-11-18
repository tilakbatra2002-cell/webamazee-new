"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  Calendar,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { CALENDLY_URL, VERIFIED_CONTACT } from "./newhome-data";
import { triggerConsultationForm } from "./enquiry-event";

const NAV_ITEMS = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Why Webamazee", href: "#why-webamazee" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function NewHomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Executive agency top utility strip (desktop) */}
      <div className="hidden border-b border-white/10 bg-[#0b1528] text-xs text-slate-300 lg:block">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 font-medium text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-[#4da3ff]" />
            <span>
              Serving Chandigarh Tricity (Mohali · Chandigarh · Zirakpur ·
              Panchkula) &amp; Worldwide
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/free-seo-audit"
              className="inline-flex items-center gap-1 font-medium text-slate-300 transition-colors hover:text-white"
            >
              Free SEO Audit
              <ArrowUpRight className="h-3 w-3 text-[#4da3ff]" />
            </Link>
            <span className="h-3 w-px bg-white/15" aria-hidden />
            <a
              href={`mailto:${VERIFIED_CONTACT.email}`}
              className="inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#4da3ff]" />
              {VERIFIED_CONTACT.email}
            </a>
            <a
              href={VERIFIED_CONTACT.phoneHref}
              className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-[#7abaff]"
            >
              <Phone className="h-3.5 w-3.5 text-[#4da3ff]" />
              {VERIFIED_CONTACT.phone}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#7abaff] transition-colors hover:text-white"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book 30-Min Call
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation bar */}
      <div
        className={`w-full border-b transition-all duration-200 ${
          scrolled
            ? "border-slate-200/90 bg-white/95 shadow-[0_6px_24px_-12px_rgba(11,21,40,0.12)] backdrop-blur-md"
            : "border-slate-200/75 bg-white"
        }`}
      >
        <div className="mx-auto flex h-[74px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/newhome"
            aria-label="Webamazee — Digital Marketing & Web Development Agency"
            className="inline-flex shrink-0 items-center"
          >
            <Image
              src="/images/logo-header.webp"
              alt="Webamazee — Digital Marketing Company"
              width={1339}
              height={336}
              priority
              className="h-[38px] w-auto sm:h-[42px] lg:h-[44px]"
              style={{ objectFit: "contain" }}
            />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            {NAV_ITEMS.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-[#1e293b] transition-colors hover:bg-[#f1f6ff] hover:text-[#0f6dff] xl:px-3.5 xl:text-[14px]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13.5px] font-semibold text-[#1e293b] transition-colors hover:bg-[#f1f6ff] hover:text-[#0f6dff] xl:px-3.5 xl:text-[14px]"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => triggerConsultationForm()}
              className="inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl bg-[#0f6dff] px-5 text-[14px] font-semibold text-white shadow-[0_6px_18px_-4px_rgba(15,109,255,0.42)] transition-all duration-200 hover:bg-[#0b57d0] hover:shadow-[0_10px_24px_-4px_rgba(15,109,255,0.5)]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="newhome-mobile-nav"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div
          id="newhome-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 bottom-0 top-[74px] z-50 overflow-y-auto border-t border-slate-200 bg-white px-5 pb-10 pt-5 lg:hidden"
        >
          <nav className="flex flex-col divide-y divide-slate-100">
            {NAV_ITEMS.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 font-display text-lg font-bold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 font-display text-lg font-bold text-[#0b1528] transition-colors hover:text-[#0f6dff]"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-slate-400" />
                </Link>
              )
            )}
            <Link
              href="/free-seo-audit"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-3.5 font-display text-lg font-bold text-[#0f6dff]"
            >
              Free SEO Audit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                window.setTimeout(() => triggerConsultationForm(), 80);
              }}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[15px] font-semibold text-white shadow-[0_8px_20px_-4px_rgba(15,109,255,0.45)]"
            >
              Get a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 text-[14px] font-semibold text-[#0b1528]"
            >
              <Calendar className="h-4 w-4 text-[#0f6dff]" />
              Schedule on Calendly
            </a>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 text-sm text-slate-600">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Direct Contact
            </p>
            <a
              href={VERIFIED_CONTACT.phoneHref}
              className="mt-2.5 flex items-center gap-2.5 font-semibold text-[#0b1528]"
            >
              <Phone className="h-4 w-4 text-[#0f6dff]" />
              {VERIFIED_CONTACT.phone}
            </a>
            <a
              href={`mailto:${VERIFIED_CONTACT.email}`}
              className="mt-2 flex items-center gap-2.5 font-medium text-slate-600"
            >
              <Mail className="h-4 w-4 text-[#0f6dff]" />
              {VERIFIED_CONTACT.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
