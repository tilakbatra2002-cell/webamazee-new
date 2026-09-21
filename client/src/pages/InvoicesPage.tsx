import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FilePlus2, FileText, Search, SlidersHorizontal, X } from 'lucide-react';
import { invoiceApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import type { Invoice, Pagination } from '../lib/types';
import { CURRENCY_LIST, formatDate, formatMoney } from '../lib/format';
import { ALL_STATUSES, EmptyState, PageLoader, STATUS_LABELS, StatusPill } from '../components/ui';
import { InvoiceActions } from '../components/InvoiceActions';

const SORTS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'highest', label: 'Highest amount' },
  { value: 'lowest', label: 'Lowest amount' },
];

export function InvoicesPage() {
  const toast = useToast();
  const [params, setParams] = useSearchParams();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(params.get('search') ?? '');

  const query = useMemo(
    () => ({
      search: params.get('search') ?? '',
      status: params.get('status') ?? '',
      currency: params.get('currency') ?? '',
      from: params.get('from') ?? '',
      to: params.get('to') ?? '',
      sort: params.get('sort') ?? 'newest',
      page: Number(params.get('page') ?? 1),
    }),
    [params]
  );

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: true });
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await invoiceApi.list({ ...query, limit: 20 });
      setInvoices(data.invoices);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not load invoices');
    } finally {
      setLoading(false);
    }
  }, [query, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  // Debounce the search box so typing does not spam the API.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== query.search) setParam('search', searchInput);
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const hasFilters = Boolean(query.status || query.currency || query.from || query.to);
  const isFiltered = hasFilters || Boolean(query.search);

  const clearFilters = () => {
    setSearchInput('');
    setParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Invoices</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {pagination ? `${pagination.total} invoice${pagination.total === 1 ? '' : 's'}` : '—'}
          </p>
        </div>
        <Link to="/invoices/new" className="wm-btn-primary">
          <FilePlus2 size={16} />
          Create Invoice
        </Link>
      </div>

      <section className="wm-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
            <input
              className="wm-input pl-9"
              placeholder="Search invoice #, customer or company…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <select
            className="wm-input w-auto min-w-[150px]"
            value={query.sort}
            onChange={(e) => setParam('sort', e.target.value)}
            aria-label="Sort invoices"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={`wm-btn-ghost ${hasFilters ? 'border-brand text-brand' : ''}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          {isFiltered ? (
            <button type="button" className="wm-btn-ghost" onClick={clearFilters}>
              <X size={15} />
              Clear
            </button>
          ) : null}
        </div>

        {showFilters ? (
          <div className="mt-4 grid gap-3 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="wm-label">Status</label>
              <select
                className="wm-input"
                value={query.status}
                onChange={(e) => setParam('status', e.target.value)}
              >
                <option value="">All statuses</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="wm-label">Currency</label>
              <select
                className="wm-input"
                value={query.currency}
                onChange={(e) => setParam('currency', e.target.value)}
              >
                <option value="">All currencies</option>
                {CURRENCY_LIST.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="wm-label">From date</label>
              <input
                type="date"
                className="wm-input"
                value={query.from}
                onChange={(e) => setParam('from', e.target.value)}
              />
            </div>
            <div>
              <label className="wm-label">To date</label>
              <input
                type="date"
                className="wm-input"
                value={query.to}
                onChange={(e) => setParam('to', e.target.value)}
              />
            </div>
          </div>
        ) : null}
      </section>

      <section className="wm-card overflow-hidden">
        {loading ? (
          <PageLoader label="Loading invoices…" />
        ) : invoices.length === 0 ? (
          <EmptyState
            icon={<FileText size={22} />}
            title={isFiltered ? 'No matching invoices' : 'No invoices yet'}
            description={
              isFiltered
                ? 'Try a different search term or clear the filters.'
                : 'Create your first invoice to start tracking billing and payments.'
            }
            action={
              isFiltered ? (
                <button type="button" className="wm-btn-ghost" onClick={clearFilters}>
                  Clear filters
                </button>
              ) : (
                <Link to="/invoices/new" className="wm-btn-primary">
                  <FilePlus2 size={16} />
                  Create Your First Invoice
                </Link>
              )
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px]">
                <thead className="border-b border-line bg-surface">
                  <tr>
                    <th className="wm-th">Invoice #</th>
                    <th className="wm-th">Customer</th>
                    <th className="wm-th">Invoice Date</th>
                    <th className="wm-th">Due Date</th>
                    <th className="wm-th text-right">Amount</th>
                    <th className="wm-th">Currency</th>
                    <th className="wm-th">Status</th>
                    <th className="wm-th text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {invoices.map((invoice) => (
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
                      <td className="wm-td text-ink-muted">{invoice.currency}</td>
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

            {pagination && pagination.pages > 1 ? (
              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
                <p className="text-sm text-ink-muted">
                  Page {pagination.page} of {pagination.pages}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="wm-btn-ghost wm-btn-sm"
                    disabled={pagination.page <= 1}
                    onClick={() => setParam('page', String(pagination.page - 1))}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="wm-btn-ghost wm-btn-sm"
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => setParam('page', String(pagination.page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
