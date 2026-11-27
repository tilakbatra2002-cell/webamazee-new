"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

export function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      await submitWebsiteForm(
        "Blog Newsletter Subscription",
        { email: String(data.get("email") ?? "").trim() },
        String(data.get("websiteConfirm") ?? "")
      );
      form.reset();
      setMessage("Thank you — your request has been sent.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-3 sm:flex-row">
        <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <label htmlFor="blog-newsletter-email" className="sr-only">Email address</label>
        <input
          id="blog-newsletter-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@company.com"
          className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-[#f8fafc] px-4 text-[14px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:ring-4 focus:ring-[#0f6dff]/10"
        />
        <button type="submit" disabled={submitting} className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#0b57d0] disabled:cursor-not-allowed disabled:opacity-70">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Request Updates <ArrowUpRight className="h-4 w-4" /></>}
        </button>
      </form>
      {message && <p role="status" className="mt-3 text-[13px] font-medium text-emerald-700">{message}</p>}
      {error && <p role="alert" className="mt-3 text-[13px] font-medium text-rose-700">{error}</p>}
    </div>
  );
}
