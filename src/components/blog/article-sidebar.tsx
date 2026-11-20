"use client";

import { useState, type FormEvent } from "react";
import {
  Send,
  Check,
  ArrowRight,
  Loader2,
  ListOrdered,
  ChevronDown,
  SearchCheck,
} from "lucide-react";
import { submitWebsiteForm } from "@/lib/forms/submit-form";
import { useSeoAudit } from "@/components/seo-audit/seo-audit-provider";
import { cn } from "@/lib/utils";

export type TocItem = {
  text: string;
  id: string;
  level?: 2 | 3;
};

const darkInputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.08] px-3 py-2 text-[13.5px] text-white outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:bg-white/[0.12]";

function TableOfContentsCard({ items }: { items: TocItem[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[#f7f9fc] p-4 sm:p-5">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2.5">
        <ListOrdered className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
        <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-[#0b1528]">
          In This Article
        </h2>
      </div>
      <nav aria-label="Table of contents" className="mt-2.5 max-h-[215px] space-y-0.5 overflow-y-auto pr-1">
        {items.map((t, idx) => (
          <a
            key={`${t.id}-${idx}`}
            href={`#${t.id}`}
            className={cn(
              "flex items-start gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-white hover:text-[#0f6dff]",
              t.level === 3
                ? "pl-5 text-[12px] text-slate-500"
                : "text-[13px] font-semibold text-slate-700"
            )}
          >
            <span
              className={cn(
                "mt-[0.5em] shrink-0 rounded-full",
                t.level === 3 ? "h-1 w-1 bg-slate-400" : "h-1.5 w-1.5 bg-[#0f6dff]"
              )}
            />
            <span className="line-clamp-2 leading-snug">{t.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export function ArticleMobileToc({ items }: { items: TocItem[] }) {
  return (
    <details className="mb-7 rounded-xl border border-slate-200 bg-[#f7f9fc] lg:hidden group">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-left font-display text-[14px] font-bold text-[#0b1528] [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-[#0f6dff]" aria-hidden="true" />
          Table of Contents
          <span className="text-[12px] font-medium text-slate-500">({items.length})</span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <nav aria-label="Table of contents" className="border-t border-slate-200 px-4 py-3">
        <ol className="space-y-1.5">
          {items.map((t, idx) => (
            <li key={`${t.id}-${idx}`} className={t.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${t.id}`}
                className="flex items-start gap-2 py-1 text-[13.5px] font-medium text-slate-700 hover:text-[#0f6dff]"
              >
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f6dff]" />
                <span className="leading-snug">{t.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

function ArticleLeadGenCard() {
  const { openAudit } = useSeoAudit();
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
      await submitWebsiteForm(
        "Blog Growth Audit",
        {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          website: String(data.get("website") ?? ""),
          businessType: String(data.get("businessType") ?? ""),
          primaryGoal: String(data.get("primaryGoal") ?? ""),
        },
        String(data.get("websiteConfirm") ?? "")
      );
      setSent(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "We could not send your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl bg-[#0b1528] p-5 text-white">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
        Free Strategy Audit
      </p>
      <h2 className="mt-1.5 font-display text-[19px] font-bold leading-snug text-white">
        Let&apos;s Grow Your Business
      </h2>
      <p className="mt-1 text-[13px] leading-relaxed text-slate-300">
        Get a FREE SEO Audit &amp; Custom Growth Strategy.
      </p>

      <form onSubmit={onSubmit} className="relative mt-4 space-y-2.5">
        <input
          name="websiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <input name="name" required placeholder="Full name" className={darkInputCls} />
        <input name="email" required type="email" placeholder="Business email" className={darkInputCls} />
        <input name="website" required placeholder="Website URL" className={darkInputCls} />
        <select
          name="businessType"
          className={darkInputCls + " [&>option]:text-slate-800"}
          defaultValue=""
        >
          <option value="" disabled>
            Business type
          </option>
          <option>E-commerce</option>
          <option>Local business</option>
          <option>B2B / SaaS</option>
          <option>Startup</option>
          <option>Other</option>
        </select>
        <select
          name="primaryGoal"
          className={darkInputCls + " [&>option]:text-slate-800"}
          defaultValue=""
        >
          <option value="" disabled>
            Primary goal
          </option>
          <option>More organic traffic</option>
          <option>Higher rankings</option>
          <option>More leads / sales</option>
          <option>Website rebuild</option>
        </select>

        {submitError && (
          <p role="alert" className="text-xs font-medium text-rose-300">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl bg-[#0f6dff] py-2 text-[13.5px] font-bold text-white transition-colors hover:bg-[#0b57d0] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : sent ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" /> Request received!
            </>
          ) : (
            <>
              Get My Free Audit
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-0.5 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-[#87b4ff]" aria-hidden="true" /> No spam
          </span>
          <span className="inline-flex items-center gap-1">
            <Check className="h-3 w-3 text-[#87b4ff]" aria-hidden="true" /> Personal follow-up
          </span>
        </div>
      </form>

      <div className="mt-3.5 border-t border-white/10 pt-3 text-center">
        <button
          type="button"
          onClick={() => openAudit()}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#87b4ff] transition-colors hover:text-white"
        >
          <SearchCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Run instant Free SEO Audit
        </button>
      </div>
    </div>
  );
}

function ArticleNewsletterCard() {
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState("");

  async function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubscribeError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitWebsiteForm(
        "Blog Newsletter Subscription",
        { email: String(data.get("email") ?? "") },
        String(data.get("websiteConfirm") ?? "")
      );
      setSubscribed(true);
      form.reset();
    } catch (error) {
      setSubscribeError(
        error instanceof Error ? error.message : "We could not subscribe you. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="font-display text-[15px] font-bold text-[#0b1528]">Stay Updated</h2>
      <p className="mt-1 text-[12.5px] text-slate-600">
        Get marketing insights in your inbox. No spam.
      </p>
      <form onSubmit={onSubscribe} className="relative mt-3 flex gap-2">
        <input
          name="websiteConfirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px opacity-0"
        />
        <input
          name="email"
          type="email"
          required
          aria-label="Email address"
          placeholder="you@company.com"
          className="w-full rounded-xl border border-slate-200 bg-[#f7f9fc] px-3 py-2 text-[13.5px] text-[#0b1528] outline-none transition-colors placeholder:text-slate-400 focus:border-[#0f6dff] focus:bg-white"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={submitting}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0f6dff] text-white transition-colors hover:bg-[#0b57d0] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : subscribed ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </form>
      <p
        className={cn("mt-1.5 text-[11.5px]", subscribeError ? "text-rose-600" : "text-slate-500")}
        role={subscribeError ? "alert" : undefined}
      >
        {subscribeError || (subscribed ? "Thanks! You're subscribed." : "Unsubscribe anytime.")}
      </p>
    </div>
  );
}

export function ArticleSidebar({
  tocItems,
  showToc,
}: {
  tocItems: TocItem[];
  showToc: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      {showToc && tocItems.length > 0 && (
        <div className="hidden lg:block">
          <TableOfContentsCard items={tocItems} />
        </div>
      )}
      <ArticleLeadGenCard />
      <ArticleNewsletterCard />
    </div>
  );
}
