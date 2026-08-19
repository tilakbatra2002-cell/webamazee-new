"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Phone, Mail, Loader2 } from "lucide-react";
import { AuditDashboard } from "./audit-dashboard";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

function AuditForm({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitWebsiteForm("Website Audit Request", {
        name: String(data.get("name") ?? ""),
        businessName: String(data.get("businessName") ?? ""),
        website: String(data.get("website") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        country: String(data.get("country") ?? ""),
        monthlyBudget: String(data.get("monthlyBudget") ?? ""),
        primaryGoal: String(data.get("primaryGoal") ?? ""),
        message: String(data.get("message") ?? ""),
      }, String(data.get("websiteConfirm") ?? ""));
      setSent(true);
      onDone();
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your audit request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">Request received!</h3>
        <p className="mt-2 max-w-xs text-sm text-slate-500">
          Thank you. Our team will review your website and send your free AI
          audit within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex h-full flex-col">
      <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Full Name</label>
          <input name="name" required placeholder="John Carter" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Business Name</label>
          <input name="businessName" required placeholder="Acme Ltd" className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-600">Website URL</label>
          <input name="website" required type="url" placeholder="https://yourwebsite.com" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Email Address</label>
          <input name="email" required type="email" placeholder="you@company.com" className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Phone Number</label>
          <input name="phone" type="tel" placeholder="+91 ..." className={inputCls} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Country</label>
          <select name="country" className={inputCls} defaultValue="">
            <option value="" disabled>Select country</option>
            <option>India</option>
            <option>New Zealand</option>
            <option>Australia</option>
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">Monthly Marketing Budget</label>
          <select name="monthlyBudget" className={inputCls} defaultValue="">
            <option value="" disabled>Select budget</option>
            <option>Under $1,000</option>
            <option>$1,000 – $5,000</option>
            <option>$5,000 – $10,000</option>
            <option>$10,000+</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-600">Primary Goal</label>
          <select name="primaryGoal" className={inputCls} defaultValue="">
            <option value="" disabled>Select your primary goal</option>
            <option>More organic traffic</option>
            <option>Higher Google rankings</option>
            <option>More leads & sales</option>
            <option>Website redesign / rebuild</option>
            <option>E-commerce growth</option>
            <option>Local SEO</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-semibold text-slate-600">Message</label>
          <textarea name="message" rows={2} placeholder="Tell us a little about your project (optional)" className={inputCls + " resize-none"} />
        </div>
      </div>

      <div className="mt-5">
        {submitError && <p role="alert" className="mb-3 text-sm font-medium text-rose-600">{submitError}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
          <span className="relative flex items-center gap-2">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Get My Free Audit <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>}
          </span>
        </button>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Response within 24 hours</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> No obligation</span>
          <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 100% Free</span>
        </div>
      </div>
    </form>
  );
}

export function AuditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-md sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Free AI website audit"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl"
          >
            {/* close button */}
            <button
              onClick={onClose}
              aria-label="Close audit modal"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-slate-500 shadow-soft backdrop-blur transition-all hover:rotate-90 hover:text-brand-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* LEFT — dashboard */}
              <div className="hidden md:block">
                <AuditDashboard />
              </div>

              {/* RIGHT — form */}
              <div className="flex flex-col p-6 sm:p-8">
                {/* mobile heading */}
                <div className="md:hidden">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    Get Your FREE <span className="text-gradient">AI Website Audit</span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Technical SEO, Core Web Vitals, UX & conversion opportunities.
                  </p>
                </div>

                <div className="md:hidden">
                  <AuditDashboardCompact />
                </div>

                <div className="flex-1">
                  <AuditForm onDone={() => {}} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Compact bullet summary shown on mobile (since dashboard is hidden there). */
function AuditDashboardCompact() {
  const bullets = [
    "Technical SEO Analysis",
    "Core Web Vitals Report",
    "UX Review",
    "Conversion Optimization",
    "AI SEO Opportunities",
  ];
  return (
    <div className="mb-4 rounded-2xl border border-line bg-surface/60 p-4">
      <ul className="grid grid-cols-1 gap-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-3.5 w-3.5 shrink-0 text-brand-600" /> {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
