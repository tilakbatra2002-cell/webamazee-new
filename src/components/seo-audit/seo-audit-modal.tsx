"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  SearchCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  Send,
  Loader2,
  Globe2,
} from "lucide-react";
import { validateUrl } from "@/lib/seo-audit/validators";
import { trackEvent } from "@/lib/analytics";
import type {
  AuditCategory,
  AuditFinding,
  AuditResponse,
} from "@/lib/seo-audit/types";
import { SeoAuditScore } from "./seo-audit-score";

type Step = "form" | "progress" | "result";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

const SERVICE_OPTIONS = [
  "SEO",
  "Website Development",
  "Website Redesign",
  "AI SEO",
  "Digital Marketing",
  "Ecommerce",
  "Not Sure Yet",
];

function statusMeta(status: string) {
  switch (status) {
    case "good":
      return { Icon: CheckCircle2, label: "Good", cls: "text-success" };
    case "warning":
      return { Icon: AlertTriangle, label: "Needs Attention", cls: "text-amber-500" };
    case "critical":
      return { Icon: XCircle, label: "Critical", cls: "text-rose-500" };
    default:
      return { Icon: Globe2, label: "Unable to verify", cls: "text-slate-400" };
  }
}

function categoryIcon(key: string) {
  switch (key) {
    case "technical": return "Technical SEO";
    case "onpage": return "On Page SEO";
    case "content": return "Content";
    case "performance": return "Performance";
    case "indexability": return "Indexability";
    default: return key;
  }
}

export function SeoAuditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [progressStep, setProgressStep] = useState(0);
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const focusRef = useRef<HTMLDivElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  // Reset state on open.
  useEffect(() => {
    if (open) {
      setStep("form");
      setUrlError(null);
      setApiError(null);
      setResult(null);
      setLeadOpen(false);
      setLeadSent(false);
      setLeadSubmitting(false);
      setProgressStep(0);
      trackEvent("seo_audit_opened");
      // Focus the URL input shortly after mount.
      const t = setTimeout(() => urlRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC to close + body scroll lock + focus trap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const runProgress = useCallback((steps: string[]) => {
    let i = 0;
    setProgressStep(0);
    const interval = setInterval(() => {
      i += 1;
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      setProgressStep(i);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    const normalized = validateUrl(url);
    if (!normalized) {
      setUrlError("Please enter a valid website URL.");
      setStep("form");
      trackEvent("seo_audit_failed", { reason: "invalid-url" });
      return;
    }
    setUrlError(null);
    setApiError(null);
    setStep("progress");
    trackEvent("seo_audit_started", { url: normalized });

    const cleanup = runProgress([
      "Checking technical SEO",
      "Checking on page SEO",
      "Checking content",
      "Checking indexability",
      "Preparing SEO overview",
    ]);

    try {
      const res = await fetch("/api/seo-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      const data = (await res.json()) as AuditResponse & { error?: string };
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to analyze that website.");
      }
      setResult(data);
      setStep("result");
      trackEvent("seo_audit_completed", {
        url: normalized,
        score: data.seoScore.overall,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to analyze that website.";
      setApiError(message);
      setStep("form");
      trackEvent("seo_audit_failed", { reason: "api-error" });
    } finally {
      cleanup();
    }
  }

  function handleLeadOpen() {
    setLeadOpen(true);
    trackEvent("seo_audit_cta_clicked");
    trackEvent("seo_audit_lead_form_opened");
  }

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    setLeadSubmitting(true);
    setApiError(null);
    try {
      const res = await fetch("/api/seo-audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          businessName: data.businessName,
          email: data.email,
          phone: data.phone,
          website: data.website || result?.url,
          serviceInterest: data.serviceInterest,
          seoScore: result?.seoScore.overall ?? 0,
          auditSummary: result
            ? `Audited ${result.url}. SEO Health Score ${result.seoScore.overall}/100. Top findings: ${result.topFindings
                .map((f) => f.title)
                .join(", ")}`
            : "",
          pageUrl: window.location.href,
          referrer: document.referrer,
          websiteConfirm: data.websiteConfirm,
        }),
      });
      const responseData = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(responseData.error || "Submission failed");
      }
      setLeadSent(true);
      trackEvent("seo_audit_lead_submitted", {
        url: result?.url,
        score: result?.seoScore.overall,
      });
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-md sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Free SEO Audit"
        >
          <motion.div
            ref={focusRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl"
          >
            {/* top glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-hero-glow" />

            {/* close */}
            <button
              onClick={onClose}
              aria-label="Close audit"
              className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-slate-500 shadow-soft backdrop-blur transition-all hover:rotate-90 hover:text-brand-700"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex flex-1 flex-col overflow-y-auto">
              {step === "form" && (
                <div className="grid flex-1 md:grid-cols-2">
                  {/* Left panel */}
                  <div className="relative hidden flex-col justify-center overflow-hidden border-r border-line bg-gradient-to-br from-brand-50 to-white p-8 md:flex">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl" />
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-soft">
                      <Sparkles className="h-3.5 w-3.5" /> Free SEO Audit
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-ink">
                      See how your website is performing in search.
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                      Enter your website URL and get a quick overview of your technical
                      SEO, on page SEO, performance and search readiness.
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {[
                        "Technical SEO overview",
                        "On page SEO check",
                        "Content depth",
                        "Performance signals",
                        "Indexability status",
                      ].map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right panel - form */}
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="md:hidden">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                        <Sparkles className="h-3.5 w-3.5" /> Free SEO Audit
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                        See how your website is performing in search.
                      </h3>
                    </div>

                    <form onSubmit={handleAnalyze} className="mt-6">
                      <label
                        htmlFor="audit-url"
                        className="mb-1.5 block text-sm font-medium text-slate-600"
                      >
                        Website URL
                      </label>
                      <div className="relative">
                        <Globe2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          id="audit-url"
                          ref={urlRef}
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://yourwebsite.com"
                          className={inputCls + " pl-10"}
                          inputMode="url"
                          autoComplete="url"
                        />
                      </div>
                      <p
                        role="alert"
                        className={"mt-1.5 text-xs font-medium " + (urlError ? "text-rose-500" : "text-slate-400")}
                      >
                        {urlError || "No credit card required."}
                      </p>

                      {apiError && (
                        <p role="alert" className="mt-2 rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600">
                          {apiError}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
                      >
                        <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
                        <SearchCheck className="relative h-4 w-4" />
                        <span className="relative">Analyze My Website</span>
                      </button>

                      <p className="mt-4 text-center text-xs text-slate-400">
                        We'll show a limited overview and keep the detailed report ready for you.
                      </p>
                    </form>
                  </div>
                </div>
              )}

              {step === "progress" && (
                <div className="flex flex-col items-center justify-center px-6 py-16 sm:py-24">
                  <div className="relative grid h-20 w-20 place-items-center">
                    <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
                    <span className="absolute inset-0 -z-10 rounded-full bg-brand-100/60 blur-xl" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold text-ink">
                    Analyzing your website...
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Fetching live SEO signals for{" "}
                    <span className="font-semibold text-brand-700">{url}</span>
                  </p>
                  <div className="mt-6 w-full max-w-xs space-y-2">
                    {[
                      "Checking technical SEO",
                      "Checking on page SEO",
                      "Checking content",
                      "Checking indexability",
                      "Preparing SEO overview",
                    ].map((s, i) => (
                      <div
                        key={s}
                        className={
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
                          (i < progressStep ? "text-success" : i === progressStep ? "font-medium text-brand-700" : "text-slate-400")
                        }
                      >
                        {i < progressStep ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : i === progressStep ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-slate-300" />
                        )}
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === "result" && result && !leadOpen && (
                <div className="px-6 py-8 sm:px-10">
                  {/* Header */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                      <Sparkles className="h-3.5 w-3.5" /> Webamazee SEO Audit
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
                      Your SEO Overview
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Here's a quick look at your website's current SEO health.
                    </p>
                  </div>

                  {/* Score */}
                  <div className="mt-8 rounded-3xl border border-line bg-gradient-to-br from-brand-50/60 to-white p-8 text-center">
                    <SeoAuditScore score={result.seoScore.overall} />
                    <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {result.seoScore.categories.map((cat) => (
                        <CategoryCard key={cat.key} cat={cat} />
                      ))}
                    </div>
                  </div>

                  {/* Top opportunities */}
                  <div className="mt-8">
                    <h4 className="font-display text-lg font-bold text-ink">Top opportunities</h4>
                    <p className="text-sm text-slate-500">
                      These are based on what we could detect during this overview.
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {result.topFindings.map((f) => (
                        <FindingRow key={f.id} finding={f} />
                      ))}
                    </ul>
                  </div>

                  {/* Locked full report */}
                  <div className="relative mt-8 overflow-hidden rounded-3xl border border-brand-600/20 bg-white p-7 shadow-soft">
                    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-400/10 blur-3xl" />
                    <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                        <Lock className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-bold text-ink">
                          Your complete SEO report is ready
                        </h4>
                        <p className="mt-1 text-sm text-slate-500">
                          We found additional opportunities across your website. Unlock the full
                          report with detailed recommendations.
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-slate-600 sm:grid-cols-3">
                          {[
                            "Technical SEO issues",
                            "On page optimization",
                            "Content recommendations",
                            "Performance opportunities",
                            "Indexability checks",
                            "Priority action plan",
                          ].map((i) => (
                            <span key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" /> {i}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLeadOpen}
                      className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
                    >
                      <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
                      <Sparkles className="relative h-4 w-4" />
                      <span className="relative">Get My Free SEO Audit</span>
                      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="mt-2 text-center text-xs text-slate-400">
                      We'll send you a detailed review with actionable recommendations.
                    </p>
                  </div>
                </div>
              )}

              {step === "result" && leadOpen && !leadSent && (
                <LeadForm onSubmit={handleLeadSubmit} defaultWebsite={result?.url} error={apiError} submitting={leadSubmitting} />
              )}

              {step === "result" && leadSent && (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-ink">
                    Your SEO Audit Request Is In
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                    Thanks. We've received your website audit request. Our team will review
                    the findings and get back to you with the detailed recommendations.
                  </p>
                  <button
                    onClick={onClose}
                    className="group mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
                  >
                    Back to Website
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CategoryCard({ cat }: { cat: AuditCategory }) {
  const { Icon, label, cls } = statusMeta(cat.status);
  return (
    <div className="rounded-2xl border border-line bg-white p-4 text-left shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {categoryIcon(cat.key)}
      </p>
      <div className="mt-1 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-ink">{cat.score}%</span>
        <span className={"inline-flex items-center gap-1 text-xs font-semibold " + cls}>
          <Icon className="h-3.5 w-3.5" /> {label}
        </span>
      </div>
    </div>
  );
}

function FindingRow({ finding }: { finding: AuditFinding }) {
  const { Icon, label, cls } = statusMeta(finding.status);
  return (
    <li className="flex items-start gap-3 rounded-xl border border-line bg-surface/50 p-3.5">
      <span className={"mt-0.5 " + cls}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{finding.title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{finding.detail}</p>
        <span className={"mt-1 inline-block text-xs font-semibold " + cls}>{label}</span>
      </div>
    </li>
  );
}

function LeadForm({
  onSubmit,
  defaultWebsite,
  error,
  submitting,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  defaultWebsite?: string;
  error?: string | null;
  submitting: boolean;
}) {
  return (
    <div className="px-6 py-8 sm:px-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          <Sparkles className="h-3.5 w-3.5" /> Get My Free SEO Audit
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          Where should we send your report?
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          We'll send you a detailed review with actionable recommendations.
        </p>
      </div>

      <form onSubmit={onSubmit} className="relative mx-auto mt-7 max-w-xl space-y-4">
        <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-slate-600">
              Full Name *
            </label>
            <input id="lead-name" name="name" required placeholder="John Carter" className={inputCls} />
          </div>
          <div>
            <label htmlFor="lead-business" className="mb-1.5 block text-sm font-medium text-slate-600">
              Business Name
            </label>
            <input id="lead-business" name="businessName" placeholder="Acme Ltd" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-slate-600">
            Email *
          </label>
          <input id="lead-email" name="email" type="email" required placeholder="you@company.com" className={inputCls} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-medium text-slate-600">
              Phone / WhatsApp
            </label>
            <input id="lead-phone" name="phone" type="tel" placeholder="+91 ..." className={inputCls} />
          </div>
          <div>
            <label htmlFor="lead-website" className="mb-1.5 block text-sm font-medium text-slate-600">
              Website URL *
            </label>
            <input id="lead-website" name="website" defaultValue={defaultWebsite ?? ""} placeholder="https://yourwebsite.com" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="lead-interest" className="mb-1.5 block text-sm font-medium text-slate-600">
            What do you need help with?
          </label>
          <select id="lead-interest" name="serviceInterest" className={inputCls} defaultValue="SEO">
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-white/20 blur-md [transform:translateX(-150%)] transition-transform duration-700 group-hover:[transform:translateX(400%)]" />
          {submitting ? <Loader2 className="relative h-4 w-4 animate-spin" /> : <Send className="relative h-4 w-4" />}
          <span className="relative">{submitting ? "Sending…" : "Get My Free SEO Audit"}</span>
        </button>

        <p className="text-center text-xs text-slate-400">
          No obligation · Response within 24 hours
        </p>
      </form>
    </div>
  );
}
