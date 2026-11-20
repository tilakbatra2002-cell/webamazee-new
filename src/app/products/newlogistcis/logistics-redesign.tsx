"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Layers,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ServiceIcon } from "@/components/services/service-icon";
import { ProductEnquiryModal } from "@/components/product/product-enquiry-modal";
import { LogisticsPreview } from "@/components/product/product-previews";
import type { Product } from "@/lib/products";

type ModuleCategory = "all" | "commercial" | "dispatch" | "finance";
type PreviewTab = "overview" | "shipments" | "fleet";

const CONTAINER = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "text-[12px] font-bold uppercase tracking-[0.16em] text-[#0f6dff]";
const HEADING =
  "font-display text-[1.85rem] font-bold leading-[1.14] tracking-[-0.025em] text-[#0b1528] sm:text-[2.35rem]";

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

function LogisticsCtaGroup({
  productName,
  primaryLabel,
  secondaryLabel,
  variant = "light",
}: {
  productName: string;
  primaryLabel: string;
  secondaryLabel: string;
  variant?: "light" | "dark";
}) {
  const [modal, setModal] = useState<"Try for Free" | "Book a Demo" | null>(null);

  function open(type: "Try for Free" | "Book a Demo") {
    setModal(type);
    trackEvent("product_enquiry_opened", { product: productName, requestType: type });
  }

  const primaryCls =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0f6dff] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#0b57d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";
  const secondaryCls =
    variant === "dark"
      ? "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-500 px-6 text-[14px] font-bold text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      : "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-[14px] font-bold text-[#0b1528] transition-colors hover:border-[#0f6dff] hover:text-[#0f6dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f6dff]";

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={() => open("Try for Free")} className={primaryCls}>
          {primaryLabel}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => open("Book a Demo")} className={secondaryCls}>
          <CalendarDays aria-hidden="true" className="h-4 w-4" />
          {secondaryLabel}
        </button>
      </div>

      <ProductEnquiryModal
        open={modal !== null}
        onClose={() => setModal(null)}
        productName={productName}
        requestType={modal ?? "Try for Free"}
      />
    </>
  );
}

export function LogisticsRedesign({ product }: { product: Product }) {
  const [previewTab, setPreviewTab] = useState<PreviewTab>("overview");
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [moduleFilter, setModuleFilter] = useState<ModuleCategory>("all");

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
    <div className="min-h-screen bg-white pt-16 text-[#0b1528] selection:bg-[#0f6dff]/15 selection:text-[#0b57d0] sm:pt-20">
      <div id="main-content" className="overflow-x-clip">
        {/* 1. HERO SECTION */}
        <section className="border-b border-slate-200/80 bg-[#f4f8ff] py-10">
          <div className={CONTAINER}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-slate-500">
                <li>
                  <Link href="/products" className="transition-colors hover:text-[#0f6dff]">
                    Products
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-[#0b1528]">
                  {product.shortName}
                </li>
              </ol>
            </nav>

            <div className="grid items-center gap-9 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <p className={EYEBROW}>
                  {product.eyebrow} · {product.industry}
                </p>

                <h1 className="mt-3 max-w-xl font-display text-[2.25rem] font-bold leading-[1.08] tracking-[-0.03em] text-[#0b1528] sm:text-[3rem] lg:text-[3.4rem]">
                  {product.heading}
                </h1>

                <p className="mt-4 max-w-xl text-[17px] leading-[1.65] text-slate-600">
                  {product.supportingCopy}
                </p>

                <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-slate-500">
                  {product.positioning}
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {product.cardFeatures.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[14px] font-semibold text-[#0b1528]">
                      <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <LogisticsCtaGroup
                    productName={product.name}
                    primaryLabel={product.primaryCta}
                    secondaryLabel={product.secondaryCta}
                  />
                </div>

                <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-semibold text-slate-600">
                  <a href="#workflow" className="text-[#0f6dff] hover:underline">
                    View {product.workflow.length}-step workflow
                  </a>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                  <a href="#features" className="hover:text-[#0f6dff]">
                    Explore all {product.capabilities.length} modules
                  </a>
                </p>
              </div>

              {/* Clean Product Workspace Visual */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-[#dce7f6] bg-white p-3.5 shadow-[0_20px_50px_-30px_rgba(11,21,40,0.22)] sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                        {product.industry}
                      </p>
                      <p className="mt-0.5 font-display text-base font-bold text-[#0b1528]">
                        {product.name}
                      </p>
                    </div>

                    <div className="inline-flex rounded-lg border border-slate-200 bg-[#f7f9fc] p-0.5">
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
                          aria-pressed={previewTab === tab.id}
                          className={`rounded-md px-3 py-1.5 text-[11px] font-bold transition-colors ${
                            previewTab === tab.id
                              ? "bg-[#0b1528] text-white"
                              : "text-slate-600 hover:text-[#0b1528]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {previewTab === "overview" && <LogisticsPreview />}

                  {previewTab === "shipments" && (
                    <div
                      className="rounded-xl border border-slate-200 bg-white p-4"
                      role="region"
                      aria-label="Illustrative Logistics CRM shipment dispatch queue with demo data"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500">Shipments &amp; Route Queue</p>
                        <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[10px] font-semibold text-[#0f6dff]">
                          Demo data
                        </span>
                      </div>
                      <div className="divide-y divide-slate-200 border-y border-slate-200">
                        {[
                          { id: "SHP-1042", route: "Mohali → Delhi", status: "In Transit", vehicle: "PB-01-4521", badge: "text-emerald-700 bg-emerald-50" },
                          { id: "SHP-1041", route: "Pune → Nagpur", status: "Delivered", vehicle: "PB-65-1123", badge: "text-[#0f6dff] bg-[#edf4ff]" },
                          { id: "SHP-1040", route: "Delhi → Jaipur", status: "Pending", vehicle: "HR-26-8890", badge: "text-amber-700 bg-amber-50" },
                        ].map((row) => (
                          <div key={row.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                            <div>
                              <p className="text-xs font-bold text-[#0b1528]">
                                {row.id} · {row.route}
                              </p>
                              <p className="text-[11px] text-slate-500">Vehicle: {row.vehicle}</p>
                            </div>
                            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${row.badge}`}>
                              {row.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {previewTab === "fleet" && (
                    <div
                      className="rounded-xl border border-slate-200 bg-white p-4"
                      role="region"
                      aria-label="Illustrative Logistics CRM fleet and team overview with demo data"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500">Fleet &amp; Workspace Roles</p>
                        <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[10px] font-semibold text-[#0f6dff]">
                          Demo data
                        </span>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-[#f7f9fc] p-3">
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Vehicles (34 On Road)
                          </p>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            <li className="flex justify-between">
                              <span>PB-01-4521</span>
                              <span className="font-semibold text-emerald-700">Active</span>
                            </li>
                            <li className="flex justify-between">
                              <span>PB-65-1123</span>
                              <span className="font-semibold text-emerald-700">Active</span>
                            </li>
                            <li className="flex justify-between">
                              <span>HR-26-8890</span>
                              <span className="font-semibold text-slate-500">Maintenance</span>
                            </li>
                          </ul>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-[#f7f9fc] p-3">
                          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Workspace Roles
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {product.teamRoles.map((r) => (
                              <span
                                key={r.role}
                                className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0b1528]"
                              >
                                {r.role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-500">
                    <span>Illustrative preview with fictional demo data; not an actual product screenshot.</span>
                    <span className="font-semibold text-[#0b1528]">
                      {product.workflow.length}-step workflow · {product.capabilities.length} modules
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM */}
        <section id="challenges" className="scroll-mt-24 bg-white py-10">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
              <div>
                <p className={EYEBROW}>The Problem</p>
                <h2 className={`${HEADING} mt-2 max-w-xl`}>
                  Real Operational Challenges, Solved
                </h2>
              </div>
              <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                Common pain points {product.name} is built to remove from day-to-day operations. {product.description}
              </p>
            </div>

            <div className="mt-7 grid overflow-hidden rounded-2xl border border-slate-200 lg:grid-cols-12">
              <div className="flex flex-col justify-between bg-[#0b1528] p-6 text-white sm:p-7 lg:col-span-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#8fb9ff]">
                    Centralized Platform
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                    Replace disconnected files with one shared workspace.
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-300">
                    {product.positioning}
                  </p>
                </div>
                <a
                  href="#workflow"
                  className="mt-6 inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-white hover:underline"
                >
                  See how the workflow connects
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>

              <ol className="divide-y divide-slate-200 bg-white lg:col-span-8">
                {product.problems.map((p, index) => (
                  <li
                    key={p.title}
                    className="grid gap-1.5 px-5 py-4 sm:grid-cols-[28px_250px_1fr] sm:items-baseline sm:gap-4 sm:px-6"
                  >
                    <span className="font-display text-[12px] font-bold text-[#0f6dff]">
                      0{index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <ServiceIcon name={p.icon} className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                      <h3 className="font-display text-[15px] font-bold text-[#0b1528]">{p.title}</h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-slate-600">{p.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 3. THE SOLUTION — 8-STEP WORKFLOW */}
        <section id="workflow" className="scroll-mt-24 bg-[#f7f9fc] py-10">
          <div className={CONTAINER}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
              <div>
                <p className={EYEBROW}>The Solution</p>
                <h2 className={`${HEADING} mt-2`}>
                  One Platform. Every Step of the Workflow.
                </h2>
              </div>
              <p className="max-w-xl text-[15px] leading-relaxed text-slate-600 lg:justify-self-end">
                {product.name} connects every stage of your operations into one clear, structured workflow.
              </p>
            </div>

            <div className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="grid grid-cols-2 divide-y divide-slate-200 sm:grid-cols-4 sm:divide-x lg:grid-cols-8 lg:divide-y-0">
                {product.workflow.map((step, i) => {
                  const selected = i === activeStageIndex;
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => setActiveStageIndex(i)}
                      aria-pressed={selected}
                      className={`border-b-2 px-3 py-3.5 text-left transition-colors ${
                        selected
                          ? "border-b-[#0f6dff] bg-[#f4f8ff]"
                          : "border-b-transparent bg-white hover:bg-slate-50"
                      }`}
                    >
                      <span
                        className={`block font-display text-[11px] font-bold ${
                          selected ? "text-[#0f6dff]" : "text-slate-400"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="mt-0.5 block font-display text-[14px] font-bold text-[#0b1528]">
                        {step}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6dff]">
                      Stage 0{activeStageIndex + 1} of 0{product.workflow.length}
                    </p>
                    <h3 className="mt-0.5 font-display text-xl font-bold text-[#0b1528]">
                      {activeStage}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-semibold text-slate-500">Team access:</span>
                    {stageMeta.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md border border-slate-200 bg-[#f7f9fc] px-2.5 py-1 text-[12px] font-semibold text-[#0b1528]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {stageMeta.modules.map((modName) => {
                    const mod = capabilityMap.get(modName);
                    if (!mod) return null;
                    return (
                      <div
                        key={mod.title}
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-[#f7f9fc] p-3.5"
                      >
                        <ServiceIcon
                          name={mod.icon}
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#0f6dff]"
                        />
                        <div>
                          <p className="font-display text-[14px] font-bold text-[#0b1528]">
                            {mod.title}
                          </p>
                          <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                            {mod.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ALL 18 MODULES */}
        <section id="features" className="scroll-mt-24 bg-white py-10">
          <div className={CONTAINER}>
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className={EYEBROW}>Features</p>
                <h2 className={`${HEADING} mt-2 max-w-xl`}>
                  Everything You Need to Run {product.industry}
                </h2>
                <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-slate-600">
                  A complete set of modules built around how {product.industry.toLowerCase()} businesses actually operate.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 lg:shrink-0">
                {(Object.keys(GROUP_LABELS) as ModuleCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setModuleFilter(cat)}
                    aria-pressed={moduleFilter === cat}
                    className={`rounded-lg px-3 py-2 text-[12px] font-bold whitespace-nowrap transition-colors ${
                      moduleFilter === cat
                        ? "bg-[#0b1528] text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-[#0f6dff] hover:text-[#0f6dff]"
                    }`}
                  >
                    {GROUP_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCapabilities.map((f) => {
                const category = MODULE_GROUPS[f.title];
                const categoryLabel =
                  category === "commercial"
                    ? "CRM & Sales"
                    : category === "dispatch"
                      ? "Orders & Fleet"
                      : "Finance & Workspace";
                return (
                  <div key={f.title} className="border-t border-slate-200 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <ServiceIcon
                          name={f.icon}
                          className="h-4 w-4 shrink-0 text-[#0f6dff]"
                        />
                        <h3 className="font-display text-[16px] font-bold text-[#0b1528]">
                          {f.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400">
                        {categoryLabel}
                      </span>
                    </div>
                    <p className="mt-1.5 pl-[26px] text-[13.5px] leading-relaxed text-slate-600">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. TEAM MANAGEMENT */}
        <section id="roles" className="scroll-mt-24 bg-[#f7f9fc] py-10">
          <div className={`${CONTAINER} grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12`}>
            <div>
              <p className={EYEBROW}>Team Management</p>
              <h2 className={`${HEADING} mt-2`}>
                Role-Based Access for Every Team Member
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                Different users get different permissions, so each person sees exactly what they need.
              </p>
            </div>

            <ul className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
              {product.teamRoles.map((r) => {
                const modules = ROLE_MODULES[r.role] ?? [];
                return (
                  <li
                    key={r.role}
                    className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-5"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                      <h3 className="font-display text-[15px] font-bold text-[#0b1528]">{r.role}</h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-slate-600">{r.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {modules.map((m) => (
                        <span
                          key={m}
                          className="rounded-md border border-slate-200 bg-[#f7f9fc] px-2 py-0.5 text-[11px] font-semibold text-slate-600"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 6. MULTI-TENANT ARCHITECTURE */}
        <section className="bg-white py-10">
          <div className={`${CONTAINER} grid items-center gap-8 lg:grid-cols-12 lg:gap-12`}>
            <div className="lg:col-span-6">
              <p className={EYEBROW}>Multi-Tenant SaaS</p>
              <h2 className={`${HEADING} mt-2`}>
                Built for Multiple Companies — Securely Separated
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-600">
                {product.name} is built as a multi-tenant platform. Each business that signs up gets its own
                dedicated workspace and data, kept completely separate from every other company using the platform.
              </p>

              <ul className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
                {MULTI_TENANT_POINTS.map((p) => (
                  <li key={p.title} className="grid gap-1.5 py-3.5 sm:grid-cols-[180px_1fr] sm:items-baseline sm:gap-4">
                    <div className="flex items-center gap-2.5">
                      <p.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#0f6dff]" />
                      <h3 className="font-display text-[14px] font-bold text-[#0b1528]">{p.title}</h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-slate-600">{p.desc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[#0b1528] p-6 text-white sm:p-7">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8fb9ff]">
                      Workspace Architecture
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-white">
                      Isolated Company Workspaces
                    </p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                    Multi-Tenant SaaS
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["Company A Workspace", "Company B Workspace", "Company C Workspace"].map((tenant) => (
                    <div
                      key={tenant}
                      className="rounded-xl border border-white/15 bg-white/[0.04] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Building2 aria-hidden="true" className="h-4 w-4 text-[#8fb9ff]" />
                        <Lock aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <p className="mt-3 font-display text-[13px] font-bold text-white">{tenant}</p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-slate-400">
                        Private customers, orders, fleet &amp; ledger
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-center">
                  <p className="font-display text-[13px] font-bold text-white">
                    Shared {product.name} Platform Core
                  </p>
                  <p className="mt-0.5 text-[12px] text-slate-300">
                    Consistent experience across every workspace with strict company data separation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="bg-[#f7f9fc] py-10">
          <div className={CONTAINER}>
            <div className="grid gap-6 rounded-2xl bg-[#0b1528] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#87b4ff]">
                  {product.eyebrow}
                </p>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
                  Ready to simplify your logistics operations?
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                  {product.supportingCopy}
                </p>
                <p className="mt-3 text-[12px] font-medium text-slate-400">
                  Personal follow-up from our team
                </p>
              </div>
              <LogisticsCtaGroup
                productName={product.name}
                primaryLabel={product.primaryCta}
                secondaryLabel={product.secondaryCta}
                variant="dark"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
