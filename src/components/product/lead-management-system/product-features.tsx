"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { staggerContainer, staggerItem } from "@/components/ui/reveal";
import {
  Users, Gauge, GitBranch, CalendarCheck, Radio, UserCheck, StickyNote,
  CalendarDays, FileText, BarChart3, Layers, LineChart,
} from "lucide-react";

const features = [
  { icon: Users, title: "Lead Management", desc: "Capture and organize every lead with complete context." },
  { icon: Gauge, title: "Lead Scoring", desc: "Score leads by intent and fit to prioritize effort." },
  { icon: GitBranch, title: "Sales Pipeline", desc: "A visual, drag-friendly pipeline for every stage." },
  { icon: CalendarCheck, title: "Follow-up Management", desc: "Automated reminders so no lead slips through." },
  { icon: Radio, title: "Lead Source Tracking", desc: "Know exactly which channel each lead came from." },
  { icon: UserCheck, title: "Team Assignment", desc: "Assign owners and keep accountability clear." },
  { icon: StickyNote, title: "Notes & Activities", desc: "Log calls, emails, and notes on every lead." },
  { icon: CalendarDays, title: "Meeting Management", desc: "Schedule and track calls and demos with ease." },
  { icon: FileText, title: "Proposal Tracking", desc: "Send proposals and see when they're viewed." },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Dashboards that show real agency performance." },
  { icon: Layers, title: "Agency Service Tracking", desc: "Group leads by the service your agency offers." },
  { icon: LineChart, title: "Conversion Tracking", desc: "Measure win rates and revenue with confidence." },
];

export function ProductFeatures() {
  return (
    <section id="features" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Features"
          title="Everything Your Agency Needs to"
          highlight="Win More Clients"
          subtitle="A complete set of tools designed for how digital marketing agencies actually sell."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={staggerItem} className="h-full">
              <SpotlightCard className="h-full rounded-3xl">
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:border-brand-600/20 hover:shadow-glow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
