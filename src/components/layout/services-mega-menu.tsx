"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { services } from "@/lib/services";
import { ServiceIcon } from "../services/service-icon";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  label: string;
  icon: string;
  services: string[];
};

const categories: Category[] = [
  {
    id: "web",
    label: "Website Development",
    icon: "Code2",
    services: ["website-development", "website-redesign", "landing-page-development", "ecommerce-development"],
  },
  {
    id: "seo",
    label: "SEO",
    icon: "TrendingUp",
    services: ["seo-services", "local-seo", "technical-seo", "google-ranking-growth", "competitor-analysis"],
  },
  {
    id: "ai-seo",
    label: "AI SEO",
    icon: "Brain",
    services: ["ai-seo", "ai-content-optimization"],
  },
  {
    id: "social",
    label: "Social Media Management",
    icon: "Share2",
    services: [
      "social-media-management",
      "social-media-marketing",
      "instagram-marketing",
      "facebook-marketing",
      "linkedin-marketing",
      "social-media-advertising",
    ],
  },
];

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ServicesMegaMenu({
  open,
  close,
  triggerRef,
}: {
  open: boolean;
  close: () => void;
  triggerRef?: RefObject<HTMLDivElement | null>;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("web");

  // Reset to first category whenever the menu opens
  useEffect(() => {
    if (open) setActive("web");
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef?.current?.querySelector("button")?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, triggerRef]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (triggerRef?.current?.contains(t)) return;
      close();
    };
    const id = window.setTimeout(() => window.addEventListener("pointerdown", onPointer), 50);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close, triggerRef]);

  const activeCat = categories.find((c) => c.id === active) ?? categories[0];

  return (
    // Persistent positioning anchor. When closed it is fully hidden:
    // visibility:hidden + pointer-events:none (no rendering, no clicks,
    // no layout space since it's absolute) and the content itself is
    // unmounted by AnimatePresence after the exit animation.
    <div
      className="absolute inset-x-0 top-full z-50 hidden justify-center pt-2 lg:flex"
      style={{ visibility: open ? "visible" : "hidden", pointerEvents: open ? "auto" : "none" }}
      aria-hidden={!open}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="services-mega-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.28, ease }}
            role="menu"
            aria-label="Services menu"
            className="w-[1180px] max-w-[calc(100vw-2rem)]"
          >
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-lift-lg backdrop-blur-2xl">
            <div className="grid grid-cols-12">
              {/* LEFT — category tabs */}
              <div className="col-span-3 border-r border-line/80 bg-surface/50 p-4">
                <p className="px-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Categories
                </p>
                <div className="mt-3 flex flex-col gap-1.5">
                  {categories.map((c, i) => {
                    const isActive = active === c.id;
                    return (
                      <motion.button
                        key={c.id}
                        onClick={() => setActive(c.id)}
                        role="menuitem"
                        aria-current={isActive ? "true" : undefined}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease }}
                        className={cn(
                          "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition-all duration-300",
                          isActive
                            ? "bg-brand-gradient text-white shadow-glow"
                            : "text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                        )}
                      >
                        {/* left accent border */}
                        {isActive && (
                          <motion.span
                            layoutId="mega-cat-active"
                            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-white/90"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-all duration-300",
                            isActive
                              ? "bg-white/15 text-white"
                              : "bg-brand-50 text-brand-700 group-hover:bg-brand-gradient group-hover:text-white"
                          )}
                        >
                          <ServiceIcon name={c.icon} className="h-4.5 h-4 w-4" />
                        </span>
                        <span className="font-display text-sm font-semibold">{c.label}</span>
                        {isActive && (
                          <motion.span
                            initial={{ scale: 0.7 }}
                            animate={{ scale: 1 }}
                            className="ml-auto grid h-5 w-5 place-items-center rounded-full bg-white/20"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT — dynamic services */}
              <div className="col-span-9 p-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease }}
                  >
                    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                      <ServiceIcon name={activeCat.icon} className="h-3.5 w-3.5" />
                      {activeCat.label}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {activeCat.services.map((slug, i) => {
                        const s = getService(slug);
                        if (!s) return null;
                        return (
                          <motion.div
                            key={slug}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04, duration: 0.3, ease }}
                          >
                            <Link
                              href={`/services/${slug}`}
                              onClick={close}
                              className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-600/25 hover:shadow-glow"
                            >
                              <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-400/0 blur-2xl transition-all duration-300 group-hover:bg-brand-400/25" />
                              <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-brand-gradient group-hover:text-white">
                                <ServiceIcon name={s.icon} className="h-5 w-5" />
                              </span>
                              <span className="relative min-w-0 flex-1">
                                <span className="block font-display text-sm font-bold text-ink transition-colors group-hover:text-brand-700">
                                  {s.shortName}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-slate-500">
                                  {s.shortDesc}
                                </span>
                              </span>
                              <ArrowRight className="relative mt-1 h-4 w-4 shrink-0 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Compact Free SEO Audit CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35, ease }}
                  className="mt-4"
                >
                  <Link
                    href="/contact"
                    onClick={close}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-brand-gradient p-4 shadow-glow transition-all duration-300 hover:shadow-glow-lg"
                  >
                    <span className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 text-white">
                      <Sparkles className="h-4 w-4" />
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-display text-sm font-bold text-white">
                        Free SEO Audit
                      </span>
                      <span className="block text-xs text-white/80">
                        Get a personalised growth strategy, free.
                      </span>
                    </span>
                    <ArrowRight className="relative h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM trust footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/80 bg-surface/40 px-5 py-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {[
                  "100% Custom Solutions",
                  "SEO Optimized",
                  "Fast Performance",
                  "Mobile Responsive",
                  "AI-Powered Strategy",
                ].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Check className="h-3.5 w-3.5 text-brand-600" /> {t}
                  </span>
                ))}
              </div>
              <Link
                href="/services"
                onClick={close}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
              >
                View All Services
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
