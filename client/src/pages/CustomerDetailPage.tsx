import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FilePlus2, FileText, Mail, MapPin, Phone, Receipt } from 'lucide-react';
import { customerApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import type { Customer, Invoice } from '../lib/types';
import { formatDate, formatMoney } from '../lib/format';
import { EmptyState, PageLoader, StatusPill } from '../components/ui';
import { InvoiceActions } from '../components/InvoiceActions';

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { settings } = useSettings();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const data = await customerApi.get(id);
      setCustomer(data.customer);
      setInvoices(data.invoices);
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not load customer');
      navigate('/customers');
    } finally {
      setLoading(false);
    }
  }, [id, navigate, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) return <PageLoader label="Loading customer…" />;
  if (!customer) return null;

  const currency = settings?.defaultCurrency ?? 'USD';
  const address = [customer.address, customer.city, customer.state, customer.country, customer.postalCode]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/customers" className="wm-btn-ghost wm-btn-sm" aria-label="Back to customers">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink">{customer.name}</h1>
            {customer.company ? (
              <p className="mt-0.5 text-sm text-ink-muted">{customer.company}</p>
            ) : null}
          </div>
        </div>
        <Link to="/invoices/new" className="wm-btn-primary">
          <FilePlus2 size={16} />
          New Invoice
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="wm-card space-y-3 p-5">
            <h2 className="text-sm font-bold text-ink">Contact details</h2>
            {customer.email ? (
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <span className="break-all">{customer.email}</span>
              </p>
            ) : null}
            {customer.phone ? (
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <Phone size={15} className="mt-0.5 shrink-0" />
                {customer.phone}
              </p>
            ) : null}
            {address ? (
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {address}
              </p>
            ) : null}
            {customer.taxNumber ? (
              <p className="flex items-start gap-2 text-sm text-ink-muted">
                <Receipt size={15} className="mt-0.5 shrink-0" />
                GST / VAT: {customer.taxNumber}
              </p>
            ) : null}
          </section>

          <section className="grid grid-cols-2 gap-3">
            <div className="wm-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Invoices
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ink">
                {customer.invoiceCount ?? invoices.length}
              </p>
            </div>
            <div className="wm-card p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Total billed
              </p>
              <p className="mt-2 font-display text-xl font-bold text-ink">
                {formatMoney(customer.totalBilled ?? 0, currency)}
              </p>
            </div>
          </section>
        </aside>

        <section className="wm-card overflow-hidden">
          <header className="border-b border-line px-5 py-4">
            <h2 className="text-base font-bold text-ink">Invoices</h2>
          </header>

          {invoices.length === 0 ? (
            <EmptyState
              icon={<FileText size={22} />}
              title="No invoices for this customer"
              description="Create an invoice and select this customer to see it listed here."
              action={
                <Link to="/invoices/new" className="wm-btn-primary">
                  <FilePlus2 size={16} />
                  Create Invoice
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead className="border-b border-line bg-surface">
                  <tr>
                    <th className="wm-th">Invoice #</th>
                    <th className="wm-th">Date</th>
                    <th className="wm-th">Due Date</th>
                    <th className="wm-th text-right">Amount</th>
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
    </div>
  );
}
