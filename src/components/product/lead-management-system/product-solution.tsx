"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2, Database, Gauge, CalendarCheck, GitBranch, Users, FileText,
} from "lucide-react";

const pillars = [
  { icon: Database, title: "Centralized lead storage", desc: "Every lead, from every source, in one structured workspace." },
  { icon: Gauge, title: "Lead qualification", desc: "Score and prioritize leads so your team focuses on the best opportunities." },
  { icon: CalendarCheck, title: "Automated follow-ups", desc: "Never miss a touchpoint with reminders and guided follow-up workflows." },
  { icon: GitBranch, title: "Pipeline tracking", desc: "Move leads through a clear, visual sales pipeline with full context." },
  { icon: Users, title: "Team assignment", desc: "Assign owners, share notes and keep everyone aligned." },
  { icon: FileText, title: "Sales activity logs", desc: "Every call, email, and meeting recorded automatically." },
];

export function ProductSolution() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft">
            <CheckCircle2 className="h-3.5 w-3.5" /> The Solution
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
            One Workspace. Every Lead.{" "}
            <span className="text-gradient">Complete Visibility.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
            Webamazee Lead Management System brings lead management,
            qualification, follow-ups, pipeline tracking, and sales activity
            into one centralized, agency-focused workspace.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((p) => (
            <div key={p.title} className="group flex items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow">
              <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
