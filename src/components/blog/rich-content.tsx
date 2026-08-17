"use client";

import { motion } from "framer-motion";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  Quote,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import type { ContentBlock } from "@/lib/blog-types";
import { cn } from "@/lib/utils";

function Callout({
  variant = "info",
  title,
  text,
}: {
  variant?: "info" | "tip" | "warning" | "highlight";
  title: string;
  text: string;
}) {
  const styles: Record<string, { icon: typeof Info; ring: string; bg: string; iconBg: string; iconColor: string; label: string }> = {
    info: { icon: Info, ring: "border-brand-200", bg: "bg-brand-50/70", iconBg: "bg-brand-100", iconColor: "text-brand-700", label: "Info" },
    tip: { icon: Lightbulb, ring: "border-emerald-200", bg: "bg-emerald-50/60", iconBg: "bg-emerald-100", iconColor: "text-emerald-700", label: "Tip" },
    warning: { icon: AlertTriangle, ring: "border-amber-200", bg: "bg-amber-50/60", iconBg: "bg-amber-100", iconColor: "text-amber-700", label: "Note" },
    highlight: { icon: Sparkles, ring: "border-brand-300", bg: "bg-brand-gradient-soft", iconBg: "bg-brand-gradient", iconColor: "text-white", label: "Key insight" },
  };
  const s = styles[variant];
  const Icon = s.icon;
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("my-8 flex gap-4 rounded-2xl border p-5", s.ring, s.bg)}
    >
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", s.iconBg, s.iconColor)}>
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className={cn("text-xs font-bold uppercase tracking-wider", s.iconColor)}>
          {s.label} · {title}
        </p>
        <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{text}</p>
      </div>
    </motion.aside>
  );
}

function InlineCTA({ title, text, button, href }: { title: string; text: string; button: string; href?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grain relative my-10 overflow-hidden rounded-3xl bg-brand-gradient p-8 shadow-glow-lg"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Free
        </span>
        <h3 className="mt-4 font-display text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{text}</p>
        <Link
          href={href ?? "/contact"}
          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lift transition-all duration-300 hover:shadow-lift-lg"
        >
          {button}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="text-[17px] leading-[1.85] text-slate-600"
              >
                {block.text}
              </motion.p>
            );
          case "heading":
            return (
              <motion.h2
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                id={`section-${i}`}
                className={cn(
                  "scroll-mt-28 pt-6 font-display font-bold tracking-tight text-ink",
                  block.level === 3 ? "text-xl leading-snug" : "text-[1.9rem] leading-tight"
                )}
              >
                {block.text}
              </motion.h2>
            );
          case "list":
            return block.ordered ? (
              <ol key={i} className="my-4 space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: j * 0.05 }}
                    className="flex items-start gap-3 text-[16px] leading-relaxed text-slate-600"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 font-display text-xs font-bold text-brand-700">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="my-4 space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: j * 0.05 }}
                    className="flex items-start gap-3 text-[16px] leading-relaxed text-slate-600"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative my-8 rounded-2xl border-l-4 border-brand-500 bg-gradient-to-br from-brand-50 to-white p-6 pl-8"
              >
                <Quote className="absolute left-4 top-4 h-5 w-5 text-brand-300" />
                <p className="text-lg font-medium leading-relaxed text-ink italic">
                  "{block.text}"
                </p>
                {block.cite && (
                  <footer className="mt-3 text-sm font-semibold text-brand-700">
                    — {block.cite}
                  </footer>
                )}
              </motion.blockquote>
            );
          case "code":
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="group my-6 overflow-hidden rounded-2xl border border-slate-800 bg-[#0a1128] shadow-lift"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="text-xs font-medium text-white/40">
                    {block.language ?? "code"}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 text-[13.5px] leading-relaxed text-brand-100">
                  <code>{block.code}</code>
                </pre>
              </motion.div>
            );
          case "table":
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className="my-6 overflow-hidden rounded-2xl border border-line shadow-soft"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface">
                      <tr>
                        {block.head.map((h) => (
                          <th key={h} className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-slate-500">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => (
                        <tr key={r} className="border-t border-line transition-colors hover:bg-brand-50/40">
                          {row.map((cell, c) => (
                            <td key={c} className={cn("px-5 py-3.5 text-slate-600", c === 0 && "font-semibold text-ink")}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            );
          case "callout":
            return (
              <Callout key={i} variant={block.variant} title={block.title} text={block.text} />
            );
          case "cta":
            return (
              <InlineCTA key={i} title={block.title} text={block.text} button={block.button} href={block.href} />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
