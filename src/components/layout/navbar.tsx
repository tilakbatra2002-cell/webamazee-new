"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  Menu, X, Sparkles, ChevronDown, ArrowRight, ChevronRight, Phone, Mail,
  Linkedin, Instagram, Facebook, CalendarDays, Layers,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Magnetic } from "../ui/magnetic";
import { mainNav, serviceLinks, productLinks } from "@/lib/nav";
import { services } from "@/lib/services";
import { ServiceIcon } from "../services/service-icon";
import { ServicesMegaMenu } from "./services-mega-menu";
import { useSeoAudit } from "../seo-audit/seo-audit-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const { openAudit } = useSeoAudit();
  const servicesTriggerRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile menu: Escape to close, click-outside to close, focus trap
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menu) return;
      // Focus trap: keep Tab/Shift+Tab within the menu
      const focusables = menu.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || active === document.body)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      // Close when clicking outside the overlay content (i.e. the backdrop)
      if (menu && e.target instanceof Node && !menu.contains(e.target)) {
        setOpen(false);
      }
    };

    const onScroll = () => {
      if (window.scrollY > 0) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Focus first focusable when the menu opens
    const timer = setTimeout(() => {
      const focusables = menu?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      focusables?.[0]?.focus?.();
    }, 120);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2.5" : "py-5"
        )}
      >
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-5",
              scrolled
                ? "glass h-14 border border-white/60 shadow-soft"
                : "h-16 border border-transparent"
            )}
            onMouseLeave={() => {
              setServicesOpen(false);
              setProductsOpen(false);
            }}
          >
            <Link href="/" aria-label="Webamazee home">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {/* Services mega menu */}
              <div
                ref={servicesTriggerRef}
                onMouseEnter={() => setServicesOpen(true)}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={cn(
                    "group flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive("/services")
                      ? "text-brand-700"
                      : "text-slate-600 hover:text-brand-700"
                  )}
                >
                  Services
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Products dropdown */}
              <div
                ref={productsTriggerRef}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
              >
                <button
                  aria-haspopup="menu"
                  aria-expanded={productsOpen}
                  onClick={() => setProductsOpen((v) => !v)}
                  className={cn(
                    "group flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive("/products")
                      ? "text-brand-700"
                      : "text-slate-600 hover:text-brand-700"
                  )}
                >
                  Products
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      productsOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full z-50 mt-3 w-72"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/95 p-2 shadow-lift-lg backdrop-blur-xl">
                        <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Our Products
                        </p>
                        {productLinks.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            onClick={() => setProductsOpen(false)}
                            className="group flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-brand-50"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                                <Layers className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-700">
                                {p.short}
                              </span>
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-brand-600" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainNav
                .filter((l) => l.label !== "Services" && l.label !== "Products")
                .map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive(l.href)
                        ? "text-brand-700"
                        : "text-slate-600 hover:text-brand-700"
                    )}
                  >
                    {l.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 bottom-0.5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300",
                        isActive(l.href)
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                ))}
            </nav>

            <div className="hidden items-center gap-5 lg:flex">
              {/* Premium contact card — single icon + stacked text */}
              <div className="group flex items-center gap-3 cursor-pointer transition-all duration-300 hover:-translate-y-0.5">
                {/* A Div — icon circle */}
                <a
                  href="tel:+918360532487"
                  aria-label="Call Webamazee at +91 83605 32487"
                  className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 shadow-soft ring-1 ring-brand-100 backdrop-blur-sm transition-all duration-300 group-hover:from-brand-100 group-hover:to-brand-200 group-hover:text-brand-800"
                >
                  <Phone className="h-[18px] w-[18px]" />
                </a>
                {/* B Div — stacked text */}
                <span className="flex flex-col justify-center leading-none">
                  <a
                    href="tel:+918360532487"
                    className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-700"
                  >
                    +91 83605 32487
                  </a>
                  <a
                    href="mailto:info@webamazee.com"
                    className="mt-1 whitespace-nowrap text-[13px] font-medium text-slate-500 transition-colors duration-300 group-hover:text-brand-600"
                  >
                    info@webamazee.com
                  </a>
                </span>
              </div>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => openAudit()}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-gradient px-6 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:shadow-glow-lg"
                >
                  <Sparkles className="h-4 w-4" />
                  Free Website Audit
                </button>
              </Magnetic>
            </div>

            <button
              ref={hamburgerRef}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors hover:text-brand-700 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mega menu — positioned relative to the nav bar container */}
            <ServicesMegaMenu
              open={servicesOpen}
              close={() => setServicesOpen(false)}
              triggerRef={servicesTriggerRef}
            />
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            id="mobile-menu"
          >
            <motion.nav
              ref={menuRef}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="h-full overflow-y-auto px-8 py-24"
            >
              {mainNav.map((l, i) =>
                l.label === "Services" ? (
                  <div key={l.href} className="mb-1">
                    <button
                      onClick={() => setMobileServices((v) => !v)}
                      className="flex w-full items-center justify-between py-2"
                    >
                      <span className="font-display text-3xl font-bold text-ink">
                        Services
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-brand-600 transition-transform",
                          mobileServices && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServices && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4">
                            {serviceLinks.map((s) => {
                              const svc = services.find((x) => x.slug === s.href.replace("/services/", ""));
                              return (
                                <Link
                                  key={s.href}
                                  href={s.href}
                                  onClick={() => setOpen(false)}
                                  className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-brand-50"
                                >
                                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-gradient group-hover:text-white">
                                    <ServiceIcon name={svc?.icon ?? "Sparkles"} className="h-4 w-4" />
                                  </span>
                                  <span className="text-base font-semibold text-slate-700 group-hover:text-brand-700">
                                    {s.short}
                                  </span>
                                  <ChevronRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-brand-600" />
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : l.label === "Products" ? (
                  <div key={l.href} className="mb-1">
                    <button
                      onClick={() => setMobileProducts((v) => !v)}
                      className="flex w-full items-center justify-between py-2"
                    >
                      <span className="font-display text-3xl font-bold text-ink">
                        Products
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-brand-600 transition-transform",
                          mobileProducts && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProducts && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-4">
                            {productLinks.map((p) => (
                              <Link
                                key={p.href}
                                href={p.href}
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-brand-50"
                              >
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-gradient group-hover:text-white">
                                  <Layers className="h-4 w-4" />
                                </span>
                                <span className="text-base font-semibold text-slate-700 group-hover:text-brand-700">
                                  {p.short}
                                </span>
                                <ChevronRight className="ml-auto h-4 w-4 text-slate-300 group-hover:text-brand-600" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05 }}
                    className="mb-1"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl font-bold text-ink transition-colors hover:text-brand-700"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                )
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    openAudit();
                  }}
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-brand-gradient px-8 text-base font-semibold text-white shadow-glow"
                >
                  <Sparkles className="h-4 w-4" /> Free Website Audit
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-6 flex flex-col gap-3 border-t border-line pt-6"
              >
                <a
                  href="tel:+918360532487"
                  className="flex items-center gap-3 text-sm font-semibold text-slate-600"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Phone className="h-4 w-4" />
                  </span>
                  +91 83605 32487
                </a>
                <a
                  href="mailto:info@webamazee.com"
                  className="flex items-center gap-3 text-sm font-semibold text-slate-600"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-700">
                    <Mail className="h-4 w-4" />
                  </span>
                  info@webamazee.com
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center gap-3"
              >
                {[
                  { icon: Linkedin, label: "LinkedIn", ariaLabel: "Webamazee on LinkedIn", href: "https://www.linkedin.com/in/webamazee-tech-15113a3bb/" },
                  { icon: Instagram, label: "Instagram", ariaLabel: "Webamazee on Instagram", href: "https://www.instagram.com/webamazee/" },
                  { icon: Facebook, label: "Facebook", ariaLabel: "Webamazee on Facebook", href: "https://www.facebook.com/people/Webamazee/61589420618603/" },
                  { icon: CalendarDays, label: "Calendly", ariaLabel: "Book a meeting on Calendly", href: "https://calendly.com/webamazee0411/30min" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    aria-label={s.ariaLabel}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-slate-500 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/30 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
        </AnimatePresence>
    </>
  );
}
