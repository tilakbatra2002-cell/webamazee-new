"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import {
  UserPlus, PhoneCall, BadgeCheck, FileText, Handshake, Award, XCircle,
} from "lucide-react";

const stages = [
  { icon: UserPlus, label: "New", color: "text-brand-600", count: "18" },
  { icon: PhoneCall, label: "Contacted", color: "text-brand-600", count: "12" },
  { icon: BadgeCheck, label: "Qualified", color: "text-brand-600", count: "9" },
  { icon: FileText, label: "Proposal Sent", color: "text-brand-600", count: "6" },
  { icon: Handshake, label: "Negotiation", color: "text-amber-600", count: "4" },
  { icon: Award, label: "Won", color: "text-success", count: "3" },
  { icon: XCircle, label: "Lost", color: "text-slate-400", count: "2" },
];

const cards: Record<string, string[]> = {
  New: ["SEO · New", "Web Dev · New"],
  Contacted: ["AI SEO · Follow-up", "Local SEO · Called"],
  Qualified: ["E-Commerce · High", "Redesign · Budget"],
  "Proposal Sent": ["Ranking Growth · Sent"],
  Negotiation: ["Content · Pricing"],
  Won: ["Landing Page · Won"],
  Lost: ["Link Building · Lost"],
};

export function ProductPipeline() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pipeline"
          title="A Clear Pipeline From"
          highlight="Lead to Client"
          subtitle="See every deal and where it stands — at a glance."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-line bg-surface/60 p-3 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className={`grid h-8 w-8 place-items-center rounded-lg bg-white shadow-soft ${s.color}`}>
                  <s.icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-bold text-slate-400">{s.count}</span>
              </div>
              <p className="mt-2 font-display text-sm font-bold text-ink">{s.label}</p>
              <div className="mt-2 space-y-1.5">
                {(cards[s.label] || []).map((c) => (
                  <div key={c} className="rounded-lg border border-line bg-white px-2 py-1.5 text-[10px] font-medium text-slate-500 shadow-soft">
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
