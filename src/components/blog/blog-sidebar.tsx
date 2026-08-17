"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Send, Check, ArrowRight, Zap, Gauge, LayoutTemplate, Accessibility, CalendarDays, Loader2,
} from "lucide-react";
import { getAllPosts } from "@/lib/blogs";
import { submitWebsiteForm } from "@/lib/forms/submit-form";

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white outline-none transition-all placeholder:text-white/50 focus:border-brand-300 focus:ring-2 focus:ring-brand-400/30";

function LeadGenCard() {
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
      await submitWebsiteForm("Blog Growth Audit", {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        website: String(data.get("website") ?? ""),
        businessType: String(data.get("businessType") ?? ""),
        primaryGoal: String(data.get("primaryGoal") ?? ""),
      }, String(data.get("websiteConfirm") ?? ""));
      setSent(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-brand-gradient p-6 shadow-glow-lg">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-brand-300/30 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />

      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
          <Zap className="h-3.5 w-3.5" /> Free
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-white">
          Let's Grow Your Business
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/85">
          Get a FREE SEO Audit &amp; Custom Growth Strategy.
        </p>

        <form onSubmit={onSubmit} className="relative mt-5 space-y-3">
          <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
          <input name="name" required placeholder="Full name" className={inputCls} />
          <input name="email" required type="email" placeholder="Business email" className={inputCls} />
          <input name="website" required placeholder="Website URL" className={inputCls} />
          <select name="businessType" className={inputCls + " [&>option]:text-slate-800"} defaultValue="">
            <option value="" disabled>Business type</option>
            <option>E-commerce</option>
            <option>Local business</option>
            <option>B2B / SaaS</option>
            <option>Startup</option>
            <option>Other</option>
          </select>
          <select name="primaryGoal" className={inputCls + " [&>option]:text-slate-800"} defaultValue="">
            <option value="" disabled>Primary goal</option>
            <option>More organic traffic</option>
            <option>Higher rankings</option>
            <option>More leads / sales</option>
            <option>Website rebuild</option>
          </select>
          {submitError && <p role="alert" className="text-sm font-medium text-white">{submitError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-brand-700 shadow-lift transition-all duration-300 hover:shadow-lift-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>
            ) : sent ? (
              <><Check className="h-4 w-4" /> Request received!</>
            ) : (
              <>
                Get My Free Audit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1 text-xs text-white/75">
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3" /> No spam</span>
            <span className="inline-flex items-center gap-1"><Check className="h-3 w-3" /> Response within 24 hours</span>
          </div>
        </form>
      </div>
    </div>
  );
}

function LatestPosts({ currentSlug }: { currentSlug: string }) {
  const posts = getAllPosts().filter((p) => p.slug !== currentSlug).slice(0, 5);
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold text-ink">Latest Posts</h3>
      <div className="mt-4 space-y-2">
        {posts.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link
              href={`/blog/${p.slug}`}
              className="group flex items-start gap-3 rounded-2xl border border-transparent p-2.5 transition-all duration-300 hover:border-brand-600/15 hover:bg-brand-50/50 hover:shadow-soft"
            >
              <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-100 transition-transform duration-300 group-hover:scale-105">
                <span className="absolute inset-0 grid-pattern opacity-40" />
                <span className="relative font-display text-sm font-bold">
                  {p.category.slice(0, 2).toUpperCase()}
                </span>
              </span>
              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-slate-700 transition-colors group-hover:text-brand-700">
                  {p.title}
                </p>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-slate-400">
                  <CalendarDays className="h-3 w-3" /> {p.date}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AuditBanner() {
  const items = [
    { icon: Zap, label: "Website Speed" },
    { icon: Gauge, label: "SEO Score" },
    { icon: LayoutTemplate, label: "UX Review" },
    { icon: Accessibility, label: "Accessibility" },
  ];
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface to-brand-50 p-6 shadow-soft">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-200/30 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 dot-pattern opacity-40" />
      <div className="relative">
        <h3 className="font-display text-lg font-bold text-ink">Free Website Audit</h3>
        <p className="mt-1 text-sm text-slate-500">
          See where your site stands across the metrics that matter.
        </p>
        <ul className="mt-4 space-y-2.5">
          {items.map((it) => (
            <li key={it.label} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-brand-700 shadow-soft ring-1 ring-line">
                <it.icon className="h-3.5 w-3.5" />
              </span>
              {it.label}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg"
        >
          Claim Free Audit
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function NewsletterCard() {
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
      await submitWebsiteForm("Blog Newsletter Subscription", { email: String(data.get("email") ?? "") }, String(data.get("websiteConfirm") ?? ""));
      setSubscribed(true);
      form.reset();
    } catch (error) {
      setSubscribeError(error instanceof Error ? error.message : "We could not subscribe you. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold text-ink">Stay Updated</h3>
      <p className="mt-1 text-sm text-slate-500">
        Get marketing insights in your inbox. No spam.
      </p>
      <form onSubmit={onSubscribe} className="relative mt-4 flex gap-2">
        <input name="websiteConfirm" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <input
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-all placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={submitting}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
      <p className={`mt-2 text-xs ${subscribeError ? "text-rose-600" : "text-slate-400"}`} role={subscribeError ? "alert" : undefined}>
        {subscribeError || (subscribed ? "Thanks! You're subscribed." : "Unsubscribe anytime.")}
      </p>
    </div>
  );
}

export function BlogSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      <LeadGenCard />
      <LatestPosts currentSlug={currentSlug} />
      <AuditBanner />
      <NewsletterCard />
    </motion.aside>
  );
}
