import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Search, Trash2, UserPlus, Users } from 'lucide-react';
import { customerApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import type { Customer } from '../lib/types';
import { formatMoney } from '../lib/format';
import { ConfirmDialog, EmptyState, Field, Modal, PageLoader, Spinner } from '../components/ui';

/** Create/edit form shared by both flows. */
function CustomerModal({
  open,
  initial,
  onClose,
  onSaved,
}: {
  open: boolean;
  initial: Customer | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const toast = useToast();
  const [form, setForm] = useState<Partial<Customer>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : {});
      setErrors({});
    }
  }, [open, initial]);

  const submit = async () => {
    setErrors({});
    if (!form.name?.trim()) return setErrors({ name: 'Customer name is required' });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setErrors({ email: 'Enter a valid email address' });

    setSaving(true);
    try {
      if (initial) {
        await customerApi.update(initial._id, form);
        toast.success('Customer updated');
      } else {
        await customerApi.create(form);
        toast.success('Customer created');
      }
      onSaved();
      onClose();
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setErrors(err.toFieldMap());
        toast.error(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  const text = (key: keyof Customer, label: string, required = false) => (
    <Field label={label} error={errors[key as string]} required={required}>
      <input
        className="wm-input"
        value={(form[key] as string) || ''}
        onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
      />
    </Field>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? `Edit ${initial.name}` : 'Add new customer'}
      width="max-w-2xl"
      footer={
        <>
          <button type="button" className="wm-btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="wm-btn-primary" onClick={submit} disabled={saving}>
            {saving ? <Spinner size={15} /> : null}
            {initial ? 'Save changes' : 'Create customer'}
          </button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {text('name', 'Customer name', true)}
        {text('company', 'Company name')}
        {text('email', 'Email')}
        {text('phone', 'Phone')}
        <div className="sm:col-span-2">{text('address', 'Address')}</div>
        {text('city', 'City')}
        {text('state', 'State')}
        {text('country', 'Country')}
        {text('postalCode', 'Postal code')}
        <div className="sm:col-span-2">{text('taxNumber', 'GST / VAT number')}</div>
      </div>
    </Modal>
  );
}

export function CustomersPage() {
  const toast = useToast();
  const { settings } = useSettings();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [deleting, setDeleting] = useState<Customer | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const load = useCallback(
    async (term = '') => {
      setLoading(true);
      try {
        setCustomers(await customerApi.list(term));
      } catch (err) {
        toast.error(err instanceof ApiRequestError ? err.message : 'Could not load customers');
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  useEffect(() => {
    const timer = setTimeout(() => void load(search), 300);
    return () => clearTimeout(timer);
  }, [search, load]);

  const confirmDelete = async (force: boolean) => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await customerApi.remove(deleting._id, force);
      toast.success(`Customer "${deleting.name}" deleted`);
      setDeleting(null);
      void load(search);
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 409) {
        // Customer still has invoices - ask for explicit confirmation.
        toast.error(err.message);
        setDeleting({ ...deleting, invoiceCount: deleting.invoiceCount || 1 });
      } else {
        toast.error(err instanceof ApiRequestError ? err.message : 'Could not delete customer');
      }
    } finally {
      setDeleteBusy(false);
    }
  };

  const currency = settings?.defaultCurrency ?? 'USD';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Customers</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {customers.length} customer{customers.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          className="wm-btn-primary"
          onClick={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        >
          <UserPlus size={16} />
          Add Customer
        </button>
      </div>

      <div className="wm-card p-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
          />
          <input
            className="wm-input pl-9"
            placeholder="Search by name, company or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <section className="wm-card overflow-hidden">
        {loading ? (
          <PageLoader label="Loading customers…" />
        ) : customers.length === 0 ? (
          <EmptyState
            icon={<Users size={22} />}
            title={search ? 'No matching customers' : 'No customers yet'}
            description={
              search
                ? 'Try a different search term.'
                : 'Add your first customer so you can bill them in seconds.'
            }
            action={
              search ? (
                <button type="button" className="wm-btn-ghost" onClick={() => setSearch('')}>
                  Clear search
                </button>
              ) : (
                <button
                  type="button"
                  className="wm-btn-primary"
                  onClick={() => {
                    setEditing(null);
                    setModalOpen(true);
                  }}
                >
                  <UserPlus size={16} />
                  Add Your First Customer
                </button>
              )
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px]">
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th className="wm-th">Customer</th>
                  <th className="wm-th">Company</th>
                  <th className="wm-th">Email</th>
                  <th className="wm-th">Phone</th>
                  <th className="wm-th text-right">Invoices</th>
                  <th className="wm-th text-right">Total Billed</th>
                  <th className="wm-th text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {customers.map((customer) => (
                  <tr key={customer._id} className="transition-colors hover:bg-surface/60">
                    <td className="wm-td">
                      <Link
                        to={`/customers/${customer._id}`}
                        className="font-bold text-brand hover:underline"
                      >
                        {customer.name}
                      </Link>
                    </td>
                    <td className="wm-td text-ink-muted">{customer.company || '—'}</td>
                    <td className="wm-td text-ink-muted">{customer.email || '—'}</td>
                    <td className="wm-td text-ink-muted">{customer.phone || '—'}</td>
                    <td className="wm-td text-right font-semibold">{customer.invoiceCount ?? 0}</td>
                    <td className="wm-td text-right font-bold">
                      {formatMoney(customer.totalBilled ?? 0, currency)}
                    </td>
                    <td className="wm-td">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-surface hover:text-ink"
                          onClick={() => {
                            setEditing(customer);
                            setModalOpen(true);
                          }}
                          aria-label={`Edit ${customer.name}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-red-50 hover:text-red-600"
                          onClick={() => setDeleting(customer)}
                          aria-label={`Delete ${customer.name}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <CustomerModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSaved={() => void load(search)}
      />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete customer"
        busy={deleteBusy}
        confirmLabel={deleting?.invoiceCount ? 'Delete anyway' : 'Delete'}
        message={
          <>
            Delete <strong className="text-ink">{deleting?.name}</strong>?
            {deleting?.invoiceCount ? (
              <>
                {' '}
                They have <strong className="text-ink">{deleting.invoiceCount}</strong> invoice
                {deleting.invoiceCount === 1 ? '' : 's'}. Those invoices keep their own copy of the
                customer details and will not be deleted.
              </>
            ) : null}
          </>
        }
        onConfirm={() => confirmDelete(Boolean(deleting?.invoiceCount))}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
