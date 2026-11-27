"use client";

/**
 * The audit result screen.
 *
 * The previous build stacked a centred gauge, then repeated the score as a
 * "56 / 100" line directly beneath it, then dropped the seven categories into
 * a three-column grid that left the seventh card orphaned on its own row. The
 * panel ran past the viewport before the findings ever appeared.
 *
 * This version restructures the result around what a visitor actually needs, in
 * the order they need it:
 *
 *   1. a header that names the site and its verdict in one line,
 *   2. a score panel with the gauge and the category breakdown side by side,
 *      so the score is read once and the detail sits next to it,
 *   3. categories as full-width rows with a small bar each, which handles
 *      seven items without an orphan at any width,
 *   4. findings grouped by severity, then the positives, then the collapsible
 *      technical detail.
 *
 * No score, finding, category or fact is invented or dropped — every value
 * rendered here comes straight from `AuditResponse`.
 */
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Minus,
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
      return { Icon: CheckCircle2, label: "Good", cls: "text-success", bar: "bg-success" };
    case "warning":
      return {
        Icon: AlertTriangle,
        label: "Needs attention",
        cls: "text-amber-600",
        bar: "bg-amber-500",
      };
    case "critical":
      return { Icon: XCircle, label: "Critical", cls: "text-rose-600", bar: "bg-rose-500" };
    default:
      return { Icon: Globe2, label: "Not enough data", cls: "text-slate-400", bar: "bg-slate-300" };
  }
}

/** One category as a full-width row: label, bar, score, verdict. */
function CategoryRow({ cat }: { cat: AuditCategory }) {
  const { Icon, label, cls, bar } = statusMeta(cat.status);
  const value = cat.available && cat.score !== null ? cat.score : null;

  return (
    <li className="border-b border-line/70 py-3 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-[13px] font-semibold text-ink">{cat.label}</span>
        <span className="flex shrink-0 items-center gap-2.5">
          <span className="font-display text-[13.5px] font-bold tabular-nums text-ink">
            {value === null ? "—" : `${value}`}
          </span>
          <span className={`inline-flex items-center gap-1 text-[11.5px] font-semibold ${cls}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">{cat.available ? label : "No data"}</span>
          </span>
        </span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${bar} transition-[width] duration-700 ease-out`}
          style={{ width: `${value === null ? 0 : Math.max(2, Math.min(100, value))}%` }}
        />
      </div>
      {!cat.available && cat.unavailableReason && (
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">{cat.unavailableReason}</p>
      )}
    </li>
  );
}

function severityMeta(severity: FindingSeverity) {
  switch (severity) {
    case "critical":
      return { cls: "border-rose-200 text-rose-700 bg-rose-50", label: "Critical" };
    case "high":
      return { cls: "border-amber-200 text-amber-700 bg-amber-50", label: "High" };
    default:
      return { cls: "border-brand-200 text-brand-700 bg-brand-50", label: "Opportunity" };
  }
}

/** A finding: title, severity tag, then the two explanations in a pair. */
function FindingCard({ finding }: { finding: AuditFinding }) {
  const { cls, label } = severityMeta(finding.severity);
  return (
    <li className="rounded-2xl border border-line bg-white p-4 shadow-soft sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-[14px] font-semibold leading-snug text-ink">{finding.title}</p>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.08em] ${cls}`}
        >
          {label}
        </span>
      </div>
      <div className="mt-3 grid gap-3 border-t border-line/70 pt-3 sm:grid-cols-2 sm:gap-5">
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.11em] text-slate-400">
            Why it matters
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{finding.whyItMatters}</p>
        </div>
        <div>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.11em] text-slate-400">
            How to fix it
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{finding.howToFix}</p>
        </div>
      </div>
    </li>
  );
}

function FindingGroup({
  title,
  items,
  empty,
  count,
}: {
  title: string;
  items: AuditFinding[];
  empty: string;
  count: number;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <h4 className="font-display text-[15px] font-bold text-ink">{title}</h4>
        <span className="font-display text-[12px] font-bold tabular-nums text-slate-400">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      {items.length === 0 ? (
        <p className="mt-1.5 text-[13px] text-slate-500">{empty}</p>
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
    <div className="grid grid-cols-1 gap-0.5 border-b border-line/70 py-2.5 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">{label}</dt>
      <dd className="break-all text-[13px] text-ink">{value}</dd>
    </div>
  );
}

function groupFindings(findings: AuditFinding[], severity: FindingSeverity) {
  return findings.filter((f) => f.severity === severity);
}

/** A plain-language reading of the overall score, derived from the score only. */
function verdict(overall: number | null) {
  if (overall === null) return { line: "Not enough data to score", tone: "text-slate-500" };
  if (overall >= 80) return { line: "In good shape", tone: "text-success" };
  if (overall >= 55) return { line: "Solid base, clear gaps", tone: "text-brand-700" };
  return { line: "Needs work before it ranks", tone: "text-rose-600" };
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
  const v = verdict(overall);

  return (
    <div className="space-y-7">
      {/* ---------------------------------------------------------------- */}
      {/* Header: who was audited, and the verdict in one line.            */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-b border-line pb-5">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
          Audit complete
        </p>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
            {result.domain}
          </h3>
          <span className={`text-[13px] font-semibold ${v.tone}`}>{v.line}</span>
        </div>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Based on live checks of the submitted homepage.
        </p>
      </div>

      {result.partialFailure && (
        <p
          role="status"
          className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] leading-relaxed text-amber-800"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Some audit checks were temporarily unavailable, so only the checks we
          could run are reported below.
        </p>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Score panel: gauge once on the left, breakdown on the right.     */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid gap-6 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6 lg:grid-cols-[auto_1fr] lg:gap-8">
        {/* Top-aligned, not centred: with seven rows on the right a centred
            gauge floats beside rows 3-4 and reads as detached. */}
        <div className="flex flex-col items-center lg:items-start lg:pt-6">
          <SeoAuditScore score={overall} />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
              Category breakdown
            </p>
            <p className="text-[11px] font-medium text-slate-400">
              {result.seoScore.categories.length} checks
            </p>
          </div>
          <ul className="mt-3">
            {result.seoScore.categories.map((cat) => (
              <CategoryRow key={cat.key} cat={cat} />
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Findings                                                          */}
      {/* ---------------------------------------------------------------- */}
      <div>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-ink">
            What needs attention
          </h3>
          <p className="text-[11.5px] font-medium text-slate-400">
            {result.topFindings.length} found
          </p>
        </div>
        <p className="mt-1 max-w-[70ch] text-[12.5px] leading-relaxed text-slate-500">
          Only issues we could actually detect are listed. Impact is described
          without ranking guarantees.
        </p>
        <div className="mt-5 space-y-6">
          <FindingGroup
            title="Critical"
            items={critical}
            count={critical.length}
            empty="No critical issues detected."
          />
          <FindingGroup
            title="High priority"
            items={high}
            count={high.length}
            empty="No high-priority issues detected."
          />
          <FindingGroup
            title="Opportunities"
            items={opportunities}
            count={opportunities.length}
            empty="No extra opportunities detected in this overview."
          />
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Positives                                                         */}
      {/* ---------------------------------------------------------------- */}
      {result.positives.length > 0 && (
        <div className="rounded-2xl border border-line bg-white p-5 shadow-soft">
          <h3 className="font-display text-[15px] font-bold text-ink">What is already working</h3>
          <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2">
            {result.positives.map((item) => (
              <li key={item.id} className="flex items-start gap-2 text-[13px] text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Technical detail                                                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <button
          type="button"
          onClick={() => setDetailsOpen((prev) => !prev)}
          aria-expanded={detailsOpen}
          className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-surface/60"
        >
          <span className="font-display text-[14px] font-bold text-ink">Technical details</span>
          <span className="flex items-center gap-2 text-[11.5px] font-medium text-slate-400">
            <Minus className="h-3 w-3 sm:hidden" aria-hidden />
            <span className="hidden sm:inline">{detailsOpen ? "Hide" : "Show"}</span>
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </span>
        </button>
        {detailsOpen && (
          <dl className="border-t border-line px-5 pb-3">
            <DetailRow label="URL analyzed" value={s.finalUrl} />
            <DetailRow label="HTTP status" value={String(s.httpStatus)} />
            <DetailRow label="Canonical" value={s.canonicalUrl || "Not detected"} />
            <DetailRow label="robots.txt" value={s.robotsFound ? "Found" : "Not found"} />
            <DetailRow
              label="Sitemap"
              value={s.sitemapFound ? s.sitemapUrl || "Found" : "Not found"}
            />
            <DetailRow label="Title" value={s.title || "Not detected"} />
            <DetailRow label="Meta description" value={s.metaDescription || "Not detected"} />
            <DetailRow
              label="H1"
              value={s.h1Text || (s.h1Count ? `${s.h1Count} H1 tags` : "Not detected")}
            />
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

      <p className="text-[11.5px] leading-relaxed text-slate-400">
        AI Search Readiness evaluates website signals that can support visibility
        across modern search and AI-powered search experiences. It is not a
        prediction that the website will appear in ChatGPT or any other assistant.
      </p>

      <SeoAuditLeadForm result={result} onClose={onClose} />
    </div>
  );
}
