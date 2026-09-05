"use client";

import { motion } from "framer-motion";

function scoreColor(score: number): string {
  if (score >= 80) return "#16A34A";
  if (score >= 55) return "#1E88FF";
  return "#EF4444";
}

export function SeoAuditScore({
  score,
  label = "Website Score",
}: {
  score: number | null;
  label?: string;
}) {
  const clamped = score === null ? 0 : Math.max(0, Math.min(100, score));
  const r = 68;
  const c = 2 * Math.PI * r;
  const color = score === null ? "#94A3B8" : scoreColor(clamped);

  return (
    <div className="relative mx-auto h-44 w-44 sm:h-52 sm:w-52">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#EAF3FF" strokeWidth="12" />
        <motion.circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: score === null ? c : c * (1 - clamped / 100) }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-5xl font-bold text-ink">
          {score === null ? "—" : clamped}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </span>
        <span className="text-xs font-medium text-slate-400">/ 100</span>
      </div>
    </div>
  );
}
