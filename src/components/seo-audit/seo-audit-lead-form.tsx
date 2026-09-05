"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { AuditResponse } from "@/lib/seo-audit/types";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid work email"),
  company: z.string().trim().min(1, "Please enter your company or website").max(200),
});

type FormData = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-600/10";

export function SeoAuditLeadForm({
  result,
  onClose,
}: {
  result: AuditResponse;
  onClose?: () => void;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { company: result.domain || result.url },
  });

  async function onSubmit(data: FormData, event?: React.BaseSyntheticEvent) {
    setSubmitting(true);
    setSubmitError("");
    try {
      const form = event?.currentTarget as HTMLFormElement | undefined;
      const honeypot = form ? String(new window.FormData(form).get("websiteConfirm") ?? "") : "";
      const critical = result.topFindings.filter((f) => f.severity === "critical");
      const high = result.topFindings.filter((f) => f.severity === "high");
      const opportunities = result.topFindings.filter((f) => f.severity === "opportunity");

      const res = await fetch("/api/seo-audit/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          website: result.url,
          seoScore: result.seoScore.overall ?? 0,
          auditSummary: `Audited ${result.url}. Overall score ${result.seoScore.overall ?? "n/a"}/100.`,
          topIssues: [...critical, ...high].map((f) => f.title).join("; "),
          topOpportunities: opportunities.map((f) => f.title).join("; "),
          pageUrl: window.location.href,
          referrer: document.referrer,
          websiteConfirm: honeypot,
        }),
      });
      const responseData = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(responseData.error || "We could not send your request. Please try again.");
      }
      setSent(true);
      trackEvent("audit_lead_submitted", { score: result.seoScore.overall });
      trackEvent("seo_audit_lead_submitted", { score: result.seoScore.overall });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-line bg-white p-6 text-center shadow-soft sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold text-ink">Request received</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Thanks. We have your audit details and will follow up with a fuller review and recommended next steps.
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Back to website
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-600/15 bg-gradient-to-br from-brand-50/70 to-white p-6 shadow-soft sm:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 shadow-soft">
        <Sparkles className="h-3.5 w-3.5" /> Full report
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">
        Want the full SEO growth report?
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Share a few details and we will review the findings with recommended priorities.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="relative mt-5 space-y-4">
        <input
          name="websiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <div>
          <label htmlFor="audit-lead-name" className="mb-1.5 block text-sm font-medium text-slate-600">
            Name
          </label>
          <input id="audit-lead-name" {...register("name")} placeholder="Jane Carter" className={inputCls} />
          {errors.name && <p className="mt-1 text-xs font-medium text-rose-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="audit-lead-email" className="mb-1.5 block text-sm font-medium text-slate-600">
            Work email
          </label>
          <input
            id="audit-lead-email"
            type="email"
            {...register("email")}
            placeholder="you@company.com"
            className={inputCls}
          />
          {errors.email && <p className="mt-1 text-xs font-medium text-rose-500">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="audit-lead-company" className="mb-1.5 block text-sm font-medium text-slate-600">
            Company / Website
          </label>
          <input id="audit-lead-company" {...register("company")} placeholder="Acme or acme.com" className={inputCls} />
          {errors.company && <p className="mt-1 text-xs font-medium text-rose-500">{errors.company.message}</p>}
        </div>

        {submitError && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-600">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          <span>{submitting ? "Sending…" : "Get My Free Full Report"}</span>
          {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
        </button>
        <p className="text-center text-xs text-slate-400">Free · No credit card required</p>
      </form>
    </div>
  );
}
