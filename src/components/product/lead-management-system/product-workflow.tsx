"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/sections-blocks";
import {
  Inbox, BadgeCheck, UserCheck, CalendarCheck, Handshake, ArrowDown,
} from "lucide-react";

const steps = [
  { icon: Inbox, label: "Capture" },
  { icon: BadgeCheck, label: "Qualify" },
  { icon: UserCheck, label: "Assign" },
  { icon: CalendarCheck, label: "Follow Up" },
  { icon: Handshake, label: "Convert" },
];

export function ProductWorkflow() {
  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Workflow"
          title="From Lead to Client —"
          highlight="Without the Chaos"
          subtitle="A simple, repeatable workflow your whole team can follow."
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="grid gap-8 sm:grid-cols-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-600/15 bg-white text-brand-700 shadow-soft transition-all duration-300 hover:bg-brand-gradient hover:text-white hover:shadow-glow">
                  <s.icon className="h-6 w-6" />
                </span>
                <p className="mt-3 font-display text-sm font-bold text-ink">{s.label}</p>
                {i < steps.length - 1 && (
                  <span className="absolute -right-4 top-5 hidden text-brand-300 sm:block">
                    <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
