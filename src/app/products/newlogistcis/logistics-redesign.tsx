"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Layers,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeader } from "@/components/ui/sections-blocks";
import { Words } from "@/components/ui/text-reveal";
import { ServiceIcon } from "@/components/services/service-icon";
import { ProductCtaButtons } from "@/components/product/product-cta-buttons";
import { LogisticsPreview } from "@/components/product/product-previews";
import type { Product } from "@/lib/products";

type ModuleCategory = "all" | "commercial" | "dispatch" | "finance";
type PreviewTab = "overview" | "shipments" | "fleet";

const MODULE_GROUPS: Record<string, Exclude<ModuleCategory, "all">> = {
  Leads: "commercial",
  Customers: "commercial",
  Quotes: "commercial",
  Communications: "commercial",
  Orders: "dispatch",
  Shipments: "dispatch",
  Tracking: "dispatch",
  Routes: "dispatch",
  Drivers: "dispatch",
  Vehicles: "dispatch",
  Fleet: "dispatch",
  Dashboard: "finance",
  Invoices: "finance",
  Payments: "finance",
  Expenses: "finance",
  Documents: "finance",
  Tasks: "finance",
  Reports: "finance",
};

const GROUP_LABELS: Record<ModuleCategory, string> = {
  all: "All Modules (18)",
  commercial: "CRM & Sales (4)",
  dispatch: "Orders & Fleet (7)",
  finance: "Finance & Workspace (7)",
};

const WORKFLOW_STAGE_META: Record<
  string,
  { roles: string[]; modules: string[] }
> = {
  Lead: { roles: ["Sales", "Admin"], modules: ["Leads", "Communications", "Tasks"] },
  Customer: { roles: ["Sales", "Managers"], modules: ["Customers", "Communications"] },
  Quote: { roles: ["Sales", "Admin"], modules: ["Quotes", "Customers"] },
  Order: { roles: ["Sales", "Operations"], modules: ["Orders", "Quotes", "Tasks"] },
  Shipment: { roles: ["Operations", "Drivers"], modules: ["Shipments", "Routes", "Fleet", "Vehicles"] },
  Delivery: { roles: ["Drivers", "Operations"], modules: ["Tracking", "Drivers", "Documents"] },
  Invoice: { roles: ["Accounts", "Operations"], modules: ["Invoices", "Orders", "Documents"] },
  Payment: { roles: ["Accounts", "Managers"], modules: ["Payments", "Expenses", "Reports", "Dashboard"] },
};

const ROLE_MODULES: Record<string, string[]> = {
  Admin: ["Dashboard", "Reports", "Tasks", "Documents"],
  Sales: ["Leads", "Customers", "Quotes", "Communications"],
  Operations: ["Orders", "Shipments", "Tracking", "Routes"],
  Accounts: ["Invoices", "Payments", "Expenses", "Reports"],
  Drivers: ["Shipments", "Tracking", "Vehicles", "Routes"],
  Managers: ["Dashboard", "Reports", "Orders", "Fleet"],
};

const MULTI_TENANT_POINTS = [
  {
    icon: Building2,
    title: "Dedicated workspace",
    desc: "Every company gets its own isolated workspace inside the platform.",
  },
  {
    icon: Lock,
    title: "Private data",
    desc: "One company's data is never visible to another.",
  },
  {
    icon: Layers,
    title: "Consistent experience",
    desc: "Every workspace runs on the same reliable, up-to-date platform.",
  },
];

export function LogisticsRedesign({ product }: { product: Product }) {
  const [previewTab, setPreviewTab] = useState<PreviewTab>("overview");
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [moduleFilter, setModuleFilter] = useState<ModuleCategory>("all");
  const [activeRole, setActiveRole] = useState<string>(product.teamRoles[0]?.role ?? "Admin");

  const capabilityMap = new Map(product.capabilities.map((cap) => [cap.title, cap]));
  const activeStage = product.workflow[activeStageIndex] ?? product.workflow[0];
  const stageMeta = WORKFLOW_STAGE_META[activeStage] ?? {
    roles: ["Admin", "Operations"],
    modules: ["Dashboard", "Orders"],
  };

  const filteredCapabilities =
    moduleFilter === "all"
      ? product.capabilities
      : product.capabilities.filter((cap) => MODULE_GROUPS[cap.title] === moduleFilter);

  return (
    <div className="bg-white text-ink">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line/70 pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 grid-pattern [mask-image:radial-gradient(60%_65%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-44 left-1/2 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full bg-hero-glow blur-2xl" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-brand-400/10 blur-3xl animate-aurora"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl animate-aurora"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/products" className="transition-colors hover:text-brand-700">
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            <span className="font-semibold text-ink">{product.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-2.5"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/15 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700 shadow-soft backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  {product.eyebrow}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                  {product.badge} · {product.industry}
                </span>
              </motion.div>

              <h1 className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem] text-balance">
                <Words text={product.heading} as="span" stagger={0.03} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 text-pretty"
              >
                {product.supportingCopy}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.48 }}
                className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500"
              >
                {product.positioning}
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.54 }}
                className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
              >
                {product.cardFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.62 }}
                className="mt-8"
              >
                <ProductCtaButtons
                  productName={product.name}
                  primaryLabel={product.primaryCta}
                  secondaryLabel={product.secondaryCta}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.72 }}
                className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"
              >
                <a href="#workflow" className="inline-flex items-center gap-1 text-brand-700 hover:underline">
                  View 8-step workflow <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <a href="#features" className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-700">
                  Explore all {product.capabilities.length} modules
                </a>
              </motion.div>
            </div>

            {/* Interactive Dashboard Frame */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:col-span-6"
            >
              <div className="pointer-events-none absolute -inset-6 rounded-full bg-brand-200/25 blur-3xl" />
              <div className="relative rounded-[1.85rem] bg-gradient-to-br from-brand-400/65 via-brand-100/60 to-brand-300/50 p-px shadow-lift-lg">
                <div className="overflow-hidden rounded-[calc(1.85rem-1px)] bg-white/95 backdrop-blur-xl">
                  {/* Mock Browser Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface/80 px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                      <span className="ml-2 rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                        {product.name} Workspace
                      </span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
                      {(
                        [
                          { id: "overview", label: "Overview" },
                          { id: "shipments", label: "Shipments" },
                          { id: "fleet", label: "Fleet & Roles" },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setPreviewTab(tab.id)}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                            previewTab === tab.id
                              ? "bg-brand-gradient text-white shadow-sm"
                              : "text-slate-500 hover:text-ink"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {previewTab === "overview" && <LogisticsPreview />}

                    {previewTab === "shipments" && (
                      <div
                        className="rounded-2xl border border-line bg-white p-4 shadow-inner-soft"
                        role="region"
                        aria-label="Illustrative Logistics CRM shipment dispatch queue with demo data"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-500">Shipments &amp; Route Queue</p>
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                            Demo data
                          </span>
                        </div>
                        <div className="space-y-2.5">
                          {[
                            { id: "SHP-1042", route: "Mohali → Delhi", status: "In Transit", vehicle: "PB-01-4521", badge: "text-success bg-success/10" },
                            { id: "SHP-1041", route: "Pune → Nagpur", status: "Delivered", vehicle: "PB-65-1123", badge: "text-brand-700 bg-brand-50" },
                            { id: "SHP-1040", route: "Delhi → Jaipur", status: "Pending", vehicle: "HR-26-8890", badge: "text-amber-600 bg-amber-50" },
                          ].map((row) => (
                            <div
                              key={row.id}
                              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-surface/50 px-3.5 py-2.5"
                            >
                              <div>
                                <p className="text-xs font-bold text-ink">
                                  {row.id} · {row.route}
                                </p>
                                <p className="text-[11px] text-slate-500">Assigned vehicle: {row.vehicle}</p>
                              </div>
                              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${row.badge}`}>
                                {row.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {previewTab === "fleet" && (
                      <div
                        className="rounded-2xl border border-line bg-white p-4 shadow-inner-soft"
                        role="region"
                        aria-label="Illustrative Logistics CRM fleet and team overview with demo data"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-500">Fleet &amp; Workspace Roles</p>
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                            Demo data
                          </span>
                        </div>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          <div className="rounded-xl border border-line bg-surface/50 p-3">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                              Vehicles (34 On Road)
                            </p>
                            <ul className="space-y-1.5 text-xs text-slate-600">
                              <li className="flex justify-between"><span>PB-01-4521</span><span className="font-semibold text-success">Active</span></li>
                              <li className="flex justify-between"><span>PB-65-1123</span><span className="font-semibold text-success">Active</span></li>
                              <li className="flex justify-between"><span>HR-26-8890</span><span className="font-semibold text-slate-400">Maintenance</span></li>
                            </ul>
                          </div>
                          <div className="rounded-xl border border-line bg-surface/50 p-3">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                              Role Permissions
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {product.teamRoles.map((r) => (
                                <span
                                  key={r.role}
                                  className="rounded-lg border border-line bg-white px-2 py-1 text-[11px] font-semibold text-ink"
                                >
                                  {r.role}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Workflow mini bar inside preview card */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-surface/70 px-4 py-3">
                      <p className="text-[11px] text-slate-500">
                        Illustrative UI preview using fictional demo figures.
                      </p>
                      <span className="text-[11px] font-semibold text-brand-700">
                        {product.workflow.length}-step workflow · {product.capabilities.length} modules
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. CENTRALIZED OVERVIEW BAND */}
      <section className="border-b border-line/70 bg-surface py-10 sm:py-12">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                Centralized Logistics Platform
              </p>
              <p className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl text-balance">
                {product.description}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-5">
              {[
                { label: "Modules", value: `${product.capabilities.length}` },
                { label: "Workflow Stages", value: `${product.workflow.length}` },
                { label: "Team Roles", value: `${product.teamRoles.length}` },
                { label: "Architecture", value: "Multi-Tenant" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-white px-4 py-3.5 text-center shadow-soft"
                >
                  <p className="font-display text-lg font-bold text-brand-700 sm:text-xl">{stat.value}</p>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM — EDITORIAL ANCHOR + 7 CHALLENGES */}
      <section id="challenges" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:sticky lg:top-28 lg:col-span-4">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#070d24] p-7 text-white shadow-lift-lg sm:p-8">
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-500/25 blur-3xl" />
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">
                  The Problem
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-[2.2rem]">
                  Real Operational Challenges,{" "}
                  <span className="text-brand-400">Solved</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                  Common pain points {product.name} is built to remove from day-to-day operations.
                </p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs leading-relaxed text-white/60">
                    {product.positioning}
                  </p>
                  <a
                    href="#workflow"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-colors hover:text-white"
                  >
                    See how the workflow connects <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              {product.problems.map((p, index) => (
                <div key={p.title} className="h-full">
                  <SpotlightCard className="h-full rounded-3xl">
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow-lg">
                      <div className="flex items-center justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                          <ServiceIcon name={p.icon} className="h-5 w-5" />
                        </span>
                        <span className="font-display text-xs font-bold tracking-widest text-slate-300 transition-colors group-hover:text-brand-600">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                    </div>
                  </SpotlightCard>
                </div>
              ))}

              {/* Balanced 8th grid card pointing directly to solution & action */}
              <div className="h-full">
                <div className="flex h-full flex-col justify-between rounded-3xl border border-brand-600/15 bg-brand-50/55 p-6 shadow-soft">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700 shadow-sm">
                      One Centralized Platform
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">
                      Replace disconnected files with one shared system
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Bring enquiries, quotations, orders, shipments, fleet, invoices and payments together across your team.
                    </p>
                  </div>
                  <div className="mt-5">
                    <a
                      href="#features"
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline"
                    >
                      Explore all {product.capabilities.length} modules <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SOLUTION — INTERACTIVE 8-STEP WORKFLOW */}
      <section id="workflow" className="scroll-mt-24 border-y border-line/70 bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow icon={<CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />}>
              The Solution
            </Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] text-balance">
              One Platform.{" "}
              <span className="text-gradient">Every Step of the Workflow.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
              {product.name} connects every stage of your operations into one clear, structured workflow.
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block"
              />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {product.workflow.map((step, i) => {
                  const selected = i === activeStageIndex;
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setActiveStageIndex(i)}
                      aria-pressed={selected}
                      className={`group relative flex flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 ${
                        selected
                          ? "border-brand-600 bg-white shadow-glow-lg -translate-y-1"
                          : "border-line bg-white/90 shadow-soft hover:-translate-y-0.5 hover:border-brand-300"
                      }`}
                    >
                      <span
                        className={`relative z-10 grid h-9 w-9 place-items-center rounded-xl font-display text-xs font-bold transition-colors ${
                          selected
                            ? "bg-brand-gradient text-white shadow-glow"
                            : "bg-brand-50 text-brand-700 group-hover:bg-brand-100"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="mt-3 font-display text-sm font-bold text-ink">{step}</span>
                      <span className="mt-1 text-[11px] font-medium text-slate-400">
                        Stage {i + 1} of {product.workflow.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Stage Inspector */}
            <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
                    Workflow Stage 0{activeStageIndex + 1} / 0{product.workflow.length}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                    {activeStage}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Team Roles:</span>
                  {stageMeta.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full border border-brand-600/15 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stageMeta.modules.map((modName) => {
                  const mod = capabilityMap.get(modName);
                  if (!mod) return null;
                  return (
                    <div
                      key={mod.title}
                      className="flex items-start gap-3.5 rounded-2xl border border-line bg-surface/60 p-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-sm">
                        <ServiceIcon name={mod.icon} className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-display text-sm font-bold text-ink">{mod.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{mod.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ALL 18 MODULES / FEATURES */}
      <section id="features" className="scroll-mt-24 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Features"
            title="Everything You Need to Run"
            highlight={product.industry}
            subtitle={`A complete set of modules built around how ${product.industry.toLowerCase()} businesses actually operate.`}
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {(Object.keys(GROUP_LABELS) as ModuleCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setModuleFilter(cat)}
                aria-pressed={moduleFilter === cat}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  moduleFilter === cat
                    ? "bg-brand-gradient text-white shadow-glow"
                    : "border border-line bg-surface text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {GROUP_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCapabilities.map((f) => {
              const globalIndex = product.capabilities.findIndex((item) => item.title === f.title) + 1;
              const category = MODULE_GROUPS[f.title];
              const categoryLabel =
                category === "commercial"
                  ? "CRM & Sales"
                  : category === "dispatch"
                    ? "Orders & Fleet"
                    : "Finance & Workspace";
              return (
                <SpotlightCard key={f.title} className="h-full rounded-3xl">
                  <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/25 hover:shadow-glow-lg">
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                          <ServiceIcon name={f.icon} className="h-5 w-5" />
                        </span>
                        <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          {categoryLabel}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-lg font-bold text-ink">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.desc}</p>
                    </div>
                    <p className="mt-5 text-[11px] font-semibold tracking-wider text-slate-400">
                      Module {String(globalIndex).padStart(2, "0")} of {product.capabilities.length}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. TEAM MANAGEMENT / ROLES */}
      <section id="roles" className="scroll-mt-24 border-t border-line/70 bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Team Management"
            title="Role-Based Access for"
            highlight="Every Team Member"
            subtitle="Different users get different permissions, so each person sees exactly what they need."
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {product.teamRoles.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => setActiveRole(r.role)}
                aria-pressed={activeRole === r.role}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  activeRole === r.role
                    ? "bg-[#070d24] text-white shadow-soft"
                    : "border border-line bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {r.role}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.teamRoles.map((r) => {
              const highlighted = r.role === activeRole;
              const modules = ROLE_MODULES[r.role] ?? [];
              return (
                <div key={r.role} className="h-full">
                  <div
                    onClick={() => setActiveRole(r.role)}
                    className={`group flex h-full cursor-pointer flex-col justify-between rounded-3xl border bg-white p-6 shadow-soft transition-all duration-300 ${
                      highlighted
                        ? "border-brand-600/40 ring-2 ring-brand-500/15 shadow-glow"
                        : "border-line hover:border-brand-600/20 hover:shadow-glow"
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300 ${
                            highlighted
                              ? "bg-brand-gradient text-white shadow-glow"
                              : "bg-brand-50 text-brand-700 group-hover:bg-brand-gradient group-hover:text-white"
                          }`}
                        >
                          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="font-display text-base font-bold text-ink">{r.role}</h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{r.desc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line/80 pt-4">
                      {modules.map((m) => (
                        <span
                          key={m}
                          className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. MULTI-TENANT ARCHITECTURE */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1350px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>Multi-Tenant SaaS</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl text-balance">
                Built for Multiple Companies —{" "}
                <span className="text-gradient">Securely Separated</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
                {product.name} is built as a multi-tenant platform. Each business that signs up gets its own
                dedicated workspace and data, kept completely separate from every other company using the platform.
              </p>

              <div className="mt-8 grid gap-4">
                {MULTI_TENANT_POINTS.map((p) => (
                  <div
                    key={p.title}
                    className="flex items-start gap-4 rounded-3xl border border-line bg-surface/60 p-5 shadow-soft"
                  >
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Tenant Isolation Diagram */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-[#070d24] p-6 text-white shadow-lift-lg sm:p-8">
                <div className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">
                        Workspace Architecture
                      </p>
                      <p className="mt-1 font-display text-lg font-bold text-white">
                        Isolated Company Workspaces
                      </p>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-semibold text-white/80">
                      Multi-Tenant SaaS
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {["Company A Workspace", "Company B Workspace", "Company C Workspace"].map((tenant) => (
                      <div
                        key={tenant}
                        className="rounded-2xl border border-white/15 bg-white/[0.05] p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between">
                          <Building2 className="h-4 w-4 text-brand-300" aria-hidden="true" />
                          <Lock className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                        </div>
                        <p className="mt-3 font-display text-xs font-bold text-white">{tenant}</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-white/60">
                          Private customers, orders, fleet &amp; ledger
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-brand-400/30 bg-brand-gradient/20 p-4 text-center">
                    <p className="font-display text-sm font-bold text-white">
                      Shared {product.name} Platform Core
                    </p>
                    <p className="mt-1 text-xs text-white/75">
                      Consistent experience across every workspace with strict company data separation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grain relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow-xl sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-aurora" />
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/30 blur-3xl animate-aurora"
              style={{ animationDelay: "2s" }}
            />
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> {product.badge} Product
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl text-balance">
                Ready to simplify your logistics operations?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85">
                {product.supportingCopy}
              </p>
              <div className="mt-8">
                <ProductCtaButtons
                  productName={product.name}
                  primaryLabel={product.primaryCta}
                  secondaryLabel={product.secondaryCta}
                  align="center"
                  variant="dark"
                />
              </div>
              <p className="mt-6 text-sm text-white/75">Personal follow-up from our team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
