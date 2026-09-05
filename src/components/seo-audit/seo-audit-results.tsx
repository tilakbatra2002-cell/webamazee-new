"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Globe2,
  XCircle,
} from "lucide-react";
import type {
  AuditCategory,
  AuditFinding,
  AuditResponse,
  FindingSeverity,
} from "@/lib/seo-audit/types";
import { SeoAuditScore } from "./seo-audit-score";
import { SeoAuditLeadForm } from "./seo-audit-lead-form";

function statusMeta(status: string) {
  switch (status) {
    case "good":
      return { Icon: CheckCircle2, label: "Good", cls: "text-success" };
    case "warning":
      return { Icon: AlertTriangle, label: "Needs attention", cls: "text-amber-500" };
    case "critical":
      return { Icon: XCircle, label: "Critical", cls: "text-rose-500" };
    default:
      return { Icon: Globe2, label: "Not enough data", cls: "text-slate-400" };
  }
}

function CategoryCard({ cat }: { cat: AuditCategory }) {
  const { Icon, label, cls } = statusMeta(cat.status);
  return (
    <div className="rounded-2xl border border-line bg-white p-4 text-left shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{cat.label}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <span className="font-display text-2xl font-bold text-ink">
          {cat.available && cat.score !== null ? `${cat.score}/100` : "—"}
        </span>
        <span className={"inline-flex items-center gap-1 text-xs font-semibold " + cls}>
          <Icon className="h-3.5 w-3.5" /> {cat.available ? label : "Not enough data"}
        </span>
      </div>
      {!cat.available && cat.unavailableReason && (
        <p className="mt-1 text-[11px] text-slate-400">{cat.unavailableReason}</p>
      )}
    </div>
  );
}

function FindingCard({ finding }: { finding: AuditFinding }) {
  const tone =
    finding.severity === "critical"
      ? "border-rose-100 bg-rose-50/60"
      : finding.severity === "high"
        ? "border-amber-100 bg-amber-50/50"
        : "border-line bg-surface/60";
  return (
    <li className={`rounded-2xl border p-4 ${tone}`}>
      <p className="text-sm font-semibold text-ink">{finding.title}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Why it matters</p>
      <p className="mt-0.5 text-sm text-slate-600">{finding.whyItMatters}</p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">How to fix it</p>
      <p className="mt-0.5 text-sm text-slate-600">{finding.howToFix}</p>
    </li>
  );
}

function FindingGroup({
  title,
  items,
  empty,
}: {
  title: string;
  items: AuditFinding[];
  empty: string;
}) {
  return (
    <div>
      <h5 className="font-display text-base font-bold text-ink">{title}</h5>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500">{empty}</p>
      ) : (
        <ul className="mt-3 space-y-2.5">
          {items.map((f) => (
            <FindingCard key={f.id} finding={f} />
          ))}
        </ul>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-line py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="break-all text-sm text-ink">{value}</dd>
    </div>
  );
}

function groupFindings(findings: AuditFinding[], severity: FindingSeverity) {
  return findings.filter((f) => f.severity === severity);
}

export function SeoAuditResults({
  result,
  onClose,
}: {
  result: AuditResponse;
  onClose?: () => void;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const s = result.summary;
  const overall = result.seoScore.overall;
  const critical = groupFindings(result.topFindings, "critical");
  const high = groupFindings(result.topFindings, "high");
  const opportunities = groupFindings(result.topFindings, "opportunity");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">Your Website Score</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          {result.domain}
        </h3>
        <p className="mt-1 text-sm text-slate-500">Based on live checks of the submitted homepage.</p>
      </div>

      {result.partialFailure && (
        <p role="status" className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Some audit checks are temporarily unavailable. We&apos;ve completed the checks we could run.
        </p>
      )}

      <div className="rounded-3xl border border-line bg-gradient-to-br from-brand-50/60 to-white p-6 text-center sm:p-8">
        <SeoAuditScore score={overall} />
        <p className="mt-2 font-display text-lg font-bold text-ink">
          {overall === null ? "Not enough data" : `${overall} / 100`}
        </p>
        <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {result.seoScore.categories.map((cat) => (
            <CategoryCard key={cat.key} cat={cat} />
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-lg font-bold text-ink">What needs attention?</h4>
        <p className="mt-1 text-sm text-slate-500">
          Only issues we could actually detect are listed. Impact is described without ranking guarantees.
        </p>
        <div className="mt-5 space-y-6">
          <FindingGroup title="Critical" items={critical} empty="No critical issues detected." />
          <FindingGroup title="High priority" items={high} empty="No high-priority issues detected." />
          <FindingGroup title="Opportunities" items={opportunities} empty="No extra opportunities detected in this overview." />
        </div>
      </div>

      {result.positives.length > 0 && (
        <div>
          <h4 className="font-display text-lg font-bold text-ink">What&apos;s already working</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {result.positives.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-slate-700 shadow-soft"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <button
          type="button"
          onClick={() => setDetailsOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="font-display text-base font-bold text-ink">Technical details</span>
          <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
        </button>
        {detailsOpen && (
          <dl className="border-t border-line px-5 pb-4">
            <DetailRow label="URL analyzed" value={s.finalUrl} />
            <DetailRow label="HTTP status" value={String(s.httpStatus)} />
            <DetailRow label="Canonical" value={s.canonicalUrl || "Not detected"} />
            <DetailRow label="robots.txt" value={s.robotsFound ? "Found" : "Not found"} />
            <DetailRow label="Sitemap" value={s.sitemapFound ? s.sitemapUrl || "Found" : "Not found"} />
            <DetailRow label="Title" value={s.title || "Not detected"} />
            <DetailRow label="Meta description" value={s.metaDescription || "Not detected"} />
            <DetailRow label="H1" value={s.h1Text || (s.h1Count ? `${s.h1Count} H1 tags` : "Not detected")} />
            <DetailRow label="Word count" value={String(s.wordCount)} />
            <DetailRow label="Internal links" value={String(s.internalLinks)} />
            <DetailRow label="External links" value={String(s.externalLinks)} />
            <DetailRow label="Images" value={String(s.imageCount)} />
            <DetailRow label="Images missing alt" value={String(s.imagesMissingAlt)} />
            <DetailRow
              label="Schema detected"
              value={
                s.hasStructuredData
                  ? `Schema detected${s.schemaTypes.length ? `: ${s.schemaTypes.slice(0, 8).join(", ")}` : ""}`
                  : "No structured data detected"
              }
            />
            <DetailRow
              label="Performance"
              value={
                s.performance.available && s.performance.performanceScore !== null
                  ? `Mobile PSI ${s.performance.performanceScore}/100`
                  : "Performance data unavailable"
              }
            />
          </dl>
        )}
      </div>

      <p className="text-xs leading-relaxed text-slate-400">
        AI Search Readiness evaluates website signals that can support visibility across modern search and
        AI-powered search experiences. It is not a prediction that the website will appear in ChatGPT or any
        other assistant.
      </p>

      <SeoAuditLeadForm result={result} onClose={onClose} />
    </div>
  );
}
