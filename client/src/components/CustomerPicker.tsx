import { useEffect, useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { customerApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import type { Customer, InvoiceCustomerSnapshot } from '../lib/types';
import { Field, Modal, Spinner } from './ui';

export const EMPTY_CUSTOMER: InvoiceCustomerSnapshot = {
  customerId: null,
  name: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  taxNumber: '',
};

export function toSnapshot(customer: Customer): InvoiceCustomerSnapshot {
  return {
    customerId: customer._id,
    name: customer.name,
    company: customer.company || '',
    email: customer.email || '',
    phone: customer.phone || '',
    address: customer.address || '',
    city: customer.city || '',
    state: customer.state || '',
    country: customer.country || '',
    postalCode: customer.postalCode || '',
    taxNumber: customer.taxNumber || '',
  };
}

/** Modal form used to create a customer without leaving the invoice editor. */
export function NewCustomerModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (customer: Customer) => void;
}) {
  const toast = useToast();
  const [form, setForm] = useState<Partial<Customer>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({});
      setErrors({});
    }
  }, [open]);

  const set = (key: keyof Customer, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    setErrors({});
    if (!form.name?.trim()) return setErrors({ name: 'Customer name is required' });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setErrors({ email: 'Enter a valid email address' });

    setSaving(true);
    try {
      const created = await customerApi.create(form);
      toast.success(`Customer "${created.name}" created`);
      onCreated(created);
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
        onChange={(e) => set(key, e.target.value)}
      />
    </Field>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add new customer"
      width="max-w-2xl"
      footer={
        <>
          <button type="button" className="wm-btn-ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="wm-btn-primary" onClick={submit} disabled={saving}>
            {saving ? <Spinner size={15} /> : null}
            Save customer
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

/** Existing-customer selector plus an inline "add new" escape hatch. */
export function CustomerPicker({
  value,
  onSelect,
  onClear,
}: {
  value: InvoiceCustomerSnapshot;
  onSelect: (snapshot: InvoiceCustomerSnapshot) => void;
  onClear: () => void;
}) {
  const toast = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const load = async () => {
    try {
      setCustomers(await customerApi.list());
    } catch (err) {
      toast.error(err instanceof ApiRequestError ? err.message : 'Could not load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = useMemo(
    () =>
      customers.map((c) => ({
        value: c._id,
        label: c.company ? `${c.name} — ${c.company}` : c.name,
      })),
    [customers]
  );

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Field label="Select existing customer" className="min-w-[240px] flex-1">
        <select
          className="wm-input"
          value={value.customerId || ''}
          disabled={loading}
          onChange={(e) => {
            const id = e.target.value;
            if (!id) return onClear();
            const found = customers.find((c) => c._id === id);
            if (found) onSelect(toSnapshot(found));
          }}
        >
          <option value="">
            {loading ? 'Loading customers…' : '— Enter details manually —'}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <button type="button" className="wm-btn-ghost" onClick={() => setModalOpen(true)}>
        <UserPlus size={15} />
        Add New Customer
      </button>

      <NewCustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={(created) => {
          setCustomers((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
          onSelect(toSnapshot(created));
        }}
      />
    </div>
  );
}
