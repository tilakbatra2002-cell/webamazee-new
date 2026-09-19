"use client";

import {
  Package, Truck, Users, Wallet, MapPin, Warehouse, GraduationCap,
  ClipboardCheck, Presentation, CalendarCheck, Receipt, TrendingUp,
} from "lucide-react";

/**
 * Fictional, illustrative SaaS UI previews for the product cards and hero
 * sections. All figures shown are demo data — no real customers, revenue
 * or testimonials are represented.
 */

function StatChip({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 shadow-soft">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] text-slate-400">{label}</p>
        <p className="text-sm font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

export function LogisticsPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="rounded-2xl border border-line bg-white p-4 shadow-inner-soft"
      role="img"
      aria-label="Illustrative Logistics CRM dashboard preview showing demo shipment, order, customer, fleet and revenue data"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">Logistics Overview</p>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Demo data</span>
      </div>
      <div className={`grid gap-2.5 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
        <StatChip icon={Package} label="Active Shipments" value="128" />
        <StatChip icon={Truck} label="Fleet On Road" value="34" />
        <StatChip icon={Users} label="Customers" value="212" />
        <StatChip icon={Wallet} label="Revenue (Demo)" value="₹4.2L" />
      </div>
      {!compact && (
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface/50 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <MapPin className="h-3.5 w-3.5" /> Recent Shipments
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex justify-between"><span>SHP-1042 · Mohali → Delhi</span><span className="font-medium text-success">In Transit</span></li>
              <li className="flex justify-between"><span>SHP-1041 · Pune → Nagpur</span><span className="font-medium text-brand-700">Delivered</span></li>
              <li className="flex justify-between"><span>SHP-1040 · Delhi → Jaipur</span><span className="font-medium text-amber-500">Pending</span></li>
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Warehouse className="h-3.5 w-3.5" /> Fleet Status
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex justify-between"><span>PB-01-4521</span><span className="font-medium text-success">Active</span></li>
              <li className="flex justify-between"><span>PB-65-1123</span><span className="font-medium text-success">Active</span></li>
              <li className="flex justify-between"><span>HR-26-8890</span><span className="font-medium text-slate-400">Maintenance</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function AcademyPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="rounded-2xl border border-line bg-white p-4 shadow-inner-soft"
      role="img"
      aria-label="Illustrative Academy CRM dashboard preview showing demo student, admission, batch, attendance and fee data"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-500">Academy Overview</p>
        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Demo data</span>
      </div>
      <div className={`grid gap-2.5 ${compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
        <StatChip icon={GraduationCap} label="Active Students" value="356" />
        <StatChip icon={ClipboardCheck} label="New Admissions" value="24" />
        <StatChip icon={Presentation} label="Running Batches" value="18" />
        <StatChip icon={CalendarCheck} label="Attendance Today" value="92%" />
      </div>
      {!compact && (
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface/50 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Receipt className="h-3.5 w-3.5" /> Fee Follow-ups
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex justify-between"><span>Aarav Sharma · Batch B2</span><span className="font-medium text-amber-500">Due Soon</span></li>
              <li className="flex justify-between"><span>Simran Kaur · Batch A1</span><span className="font-medium text-success">Paid</span></li>
              <li className="flex justify-between"><span>Rohan Mehta · Batch C3</span><span className="font-medium text-rose-500">Overdue</span></li>
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface/50 p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <TrendingUp className="h-3.5 w-3.5" /> Enquiry Sources
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex justify-between"><span>Walk-in</span><span className="font-medium text-ink">38%</span></li>
              <li className="flex justify-between"><span>Website</span><span className="font-medium text-ink">31%</span></li>
              <li className="flex justify-between"><span>Referral</span><span className="font-medium text-ink">31%</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
