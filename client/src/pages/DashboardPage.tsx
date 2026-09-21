import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FilePlus2,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { dashboardApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import type { DashboardStats } from '../lib/types';
import { formatDate, formatMoney } from '../lib/format';
import { EmptyState, PageLoader, StatusPill } from '../components/ui';
import { InvoiceActions } from '../components/InvoiceActions';

function StatCard({
  label,
  value,
  icon: Icon,
  tone = 'default',
  sub,
}: {
  label: string;
  value: string;
  icon: typeof FileText;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'brand';
  sub?: string;
}) {
  const tones = {
    default: 'bg-surface text-ink-muted',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    danger: 'bg-red-50 text-red-600',
    brand: 'bg-brand-50 text-brand',
  };

  return (
    <div className="wm-card p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon size={16} />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-ink">{value}</p>
      {sub ? <p className="mt-1 text-xs text-ink-muted">{sub}</p> : null}
    </div>
  );
}

export function DashboardPage() {
  const toast = useToast();
  const { settings } = useSettings();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setStats(await dashboardApi.stats());
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not load dashboard');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <PageLoader label="Loading dashboard…" />;
  if (!stats) return null;

  const { totals, revenueByCurrency, recentInvoices } = stats;
  const baseCurrency = settings?.defaultCurrency ?? 'USD';

  // Revenue is currency-aware: show the base currency headline plus a breakdown.
  const currencyEntries = Object.entries(revenueByCurrency).filter(([, v]) => v > 0);
  const revenueSub =
    currencyEntries.length > 1
      ? currencyEntries
          .map(([code, amount]) => formatMoney(amount, code as never))
          .join('  ·  ')
      : 'Collected across all invoices';

  const headlineRevenue =
    currencyEntries.length === 1
      ? formatMoney(currencyEntries[0][1], currencyEntries[0][0] as never)
      : formatMoney(revenueByCurrency[baseCurrency] ?? 0, baseCurrency);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Invoicing overview for {settings?.companyName || 'Webamazee'}.
          </p>
        </div>
        <Link to="/invoices/new" className="wm-btn-primary">
          <FilePlus2 size={16} />
          Create Invoice
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Invoices" value={String(totals.invoices)} icon={FileText} tone="brand" />
        <StatCard label="Paid" value={String(totals.paid)} icon={CheckCircle2} tone="success" />
        <StatCard label="Pending" value={String(totals.pending)} icon={Clock} tone="warning" />
        <StatCard label="Overdue" value={String(totals.overdue)} icon={AlertTriangle} tone="danger" />
        <StatCard
          label="Total Revenue"
          value={headlineRevenue}
          icon={TrendingUp}
          tone="brand"
          sub={revenueSub}
        />
      </div>

      <section className="wm-card overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 className="text-base font-bold text-ink">Recent Invoices</h2>
          <Link to="/invoices" className="text-sm font-semibold text-brand hover:underline">
            View all
          </Link>
        </header>

        {recentInvoices.length === 0 ? (
          <EmptyState
            icon={<FileText size={22} />}
            title="No invoices yet"
            description="Create your first invoice and it will appear here with its status and totals."
            action={
              <Link to="/invoices/new" className="wm-btn-primary">
                <FilePlus2 size={16} />
                Create Your First Invoice
              </Link>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th className="wm-th">Invoice #</th>
                  <th className="wm-th">Customer</th>
                  <th className="wm-th">Date</th>
                  <th className="wm-th">Due Date</th>
                  <th className="wm-th text-right">Amount</th>
                  <th className="wm-th">Status</th>
                  <th className="wm-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recentInvoices.map((invoice) => (
                  <tr key={invoice._id} className="transition-colors hover:bg-surface/60">
                    <td className="wm-td">
                      <Link
                        to={`/invoices/${invoice._id}`}
                        className="font-bold text-brand hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </td>
                    <td className="wm-td">
                      <p className="font-semibold text-ink">{invoice.customer?.name}</p>
                      {invoice.customer?.company ? (
                        <p className="text-xs text-ink-muted">{invoice.customer.company}</p>
                      ) : null}
                    </td>
                    <td className="wm-td text-ink-muted">{formatDate(invoice.invoiceDate)}</td>
                    <td className="wm-td text-ink-muted">{formatDate(invoice.dueDate)}</td>
                    <td className="wm-td text-right font-bold">
                      {formatMoney(invoice.total, invoice.currency)}
                    </td>
                    <td className="wm-td">
                      <StatusPill status={invoice.status} />
                    </td>
                    <td className="wm-td text-right">
                      <InvoiceActions invoice={invoice} onChanged={load} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
