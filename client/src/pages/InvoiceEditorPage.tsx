import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Plus, Save, Trash2 } from 'lucide-react';
// Live totals come from the exact engine the server uses to persist them.
// @ts-expect-error - plain JS module shared with the Express server
import { computeInvoice } from '@shared/calc.js';
import { invoiceApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import type {
  CurrencyCode,
  DiscountType,
  Invoice,
  InvoiceCustomerSnapshot,
  InvoiceItem,
  InvoiceStatus,
} from '../lib/types';
import { CURRENCY_LIST, formatMoney, addDaysInput, toDateInput, todayInput } from '../lib/format';
import { ALL_STATUSES, Field, PageLoader, STATUS_LABELS, Spinner } from '../components/ui';
import { CustomerPicker, EMPTY_CUSTOMER } from '../components/CustomerPicker';
import { InvoiceDocument } from '../components/InvoiceDocument';

interface DraftItem extends InvoiceItem {
  key: string;
}

interface Draft {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  currency: CurrencyCode;
  customer: InvoiceCustomerSnapshot;
  items: DraftItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  additionalCharges: number;
  amountPaid: number;
  notes: string;
  paymentTerms: string;
  additionalInfo: string;
}

const newKey = () => Math.random().toString(36).slice(2, 10);

const emptyItem = (taxRate = 0): DraftItem => ({
  key: newKey(),
  description: '',
  quantity: 1,
  rate: 0,
  discountType: 'fixed',
  discountValue: 0,
  taxRate,
});

/** Numeric inputs keep an empty string while typing, so coerce carefully. */
const num = (value: string) => (value === '' ? 0 : Number(value));

export function InvoiceEditorPage({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { settings } = useSettings();

  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  /* ---------------------------------------------------------- initialise */

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (mode === 'edit' && id) {
          const invoice = await invoiceApi.get(id);
          if (cancelled) return;
          setDraft({
            invoiceNumber: invoice.invoiceNumber,
            invoiceDate: toDateInput(invoice.invoiceDate),
            dueDate: toDateInput(invoice.dueDate),
            status: invoice.status,
            currency: invoice.currency,
            customer: { ...EMPTY_CUSTOMER, ...invoice.customer },
            items: invoice.items.map((item) => ({ ...item, key: newKey() })),
            discountType: invoice.discountType,
            discountValue: invoice.discountValue,
            taxRate: invoice.taxRate,
            additionalCharges: invoice.additionalCharges,
            amountPaid: invoice.amountPaid,
            notes: invoice.notes,
            paymentTerms: invoice.paymentTerms,
            additionalInfo: invoice.additionalInfo,
          });
        } else {
          // New invoice: number + defaults come from company settings.
          const invoiceNumber = await invoiceApi.nextNumber();
          if (cancelled) return;
          setDraft({
            invoiceNumber,
            invoiceDate: todayInput(),
            dueDate: addDaysInput(settings?.defaultDueDays ?? 15),
            status: 'draft',
            currency: settings?.defaultCurrency ?? 'USD',
            customer: { ...EMPTY_CUSTOMER },
            items: [emptyItem(settings?.defaultTax ?? 0)],
            discountType: 'fixed',
            discountValue: 0,
            taxRate: 0,
            additionalCharges: 0,
            amountPaid: 0,
            notes: settings?.defaultNotes ?? '',
            paymentTerms: settings?.defaultPaymentTerms ?? '',
            additionalInfo: '',
          });
        }
      } catch (err) {
        toast.error(err instanceof ApiRequestError ? err.message : 'Could not load invoice');
        navigate('/invoices');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id, settings]);

  /* ------------------------------------------------------------- helpers */

  const patch = useCallback((changes: Partial<Draft>) => {
    setDraft((prev) => (prev ? { ...prev, ...changes } : prev));
  }, []);

  const patchItem = (key: string, changes: Partial<DraftItem>) =>
    setDraft((prev) =>
      prev
        ? { ...prev, items: prev.items.map((it) => (it.key === key ? { ...it, ...changes } : it)) }
        : prev
    );

  const addItem = () =>
    setDraft((prev) =>
      prev ? { ...prev, items: [...prev.items, emptyItem(settings?.defaultTax ?? 0)] } : prev
    );

  const removeItem = (key: string) =>
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.length > 1 ? prev.items.filter((it) => it.key !== key) : prev.items,
          }
        : prev
    );

  /* --------------------------------------------------------- live totals */

  const totals = useMemo(() => {
    if (!draft) return null;
    return computeInvoice({
      items: draft.items,
      discountType: draft.discountType,
      discountValue: draft.discountValue,
      taxRate: draft.taxRate,
      additionalCharges: draft.additionalCharges,
      amountPaid: draft.amountPaid,
    });
  }, [draft]);

  /** The invoice exactly as it will be stored/exported, for live preview. */
  const previewInvoice = useMemo(() => {
    if (!draft || !totals) return null;
    return {
      invoiceNumber: draft.invoiceNumber || 'WM-DRAFT',
      invoiceDate: draft.invoiceDate,
      dueDate: draft.dueDate || null,
      status: draft.status,
      currency: draft.currency,
      customer: { ...draft.customer, name: draft.customer.name || 'Customer name' },
      company: {
        ...(settings ?? {}),
        bankDetails: settings?.bankDetails,
        primaryColor: settings?.primaryColor || '#0F6DFF',
      },
      ...totals,
      notes: draft.notes,
      paymentTerms: draft.paymentTerms,
      additionalInfo: draft.additionalInfo,
    } as unknown as Invoice;
  }, [draft, totals, settings]);

  /* -------------------------------------------------------------- submit */

  const validate = (d: Draft): Record<string, string> => {
    const next: Record<string, string> = {};
    if (!d.customer.name.trim()) next['customer.name'] = 'Customer name is required';
    if (d.customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.customer.email))
      next['customer.email'] = 'Enter a valid email address';
    if (!d.invoiceDate) next.invoiceDate = 'Invoice date is required';
    if (d.dueDate && d.invoiceDate && d.dueDate < d.invoiceDate)
      next.dueDate = 'Due date cannot be before the invoice date';

    d.items.forEach((item, i) => {
      if (!item.description.trim()) next[`items.${i}.description`] = 'Description is required';
      if (!(Number(item.quantity) > 0)) next[`items.${i}.quantity`] = 'Must be greater than 0';
      if (Number(item.rate) < 0) next[`items.${i}.rate`] = 'Cannot be negative';
      if (Number(item.taxRate) < 0) next[`items.${i}.taxRate`] = 'Cannot be negative';
      if (Number(item.discountValue) < 0) next[`items.${i}.discountValue`] = 'Cannot be negative';

      const base = Number(item.quantity) * Number(item.rate);
      if (item.discountType === 'fixed' && Number(item.discountValue) > base)
        next[`items.${i}.discountValue`] = 'Discount exceeds the line amount';
      if (item.discountType === 'percentage' && Number(item.discountValue) > 100)
        next[`items.${i}.discountValue`] = 'Cannot exceed 100%';
    });

    if (d.discountType === 'percentage' && d.discountValue > 100)
      next.discountValue = 'Cannot exceed 100%';
    if (d.discountType === 'fixed' && totals && d.discountValue > totals.subtotal)
      next.discountValue = 'Discount exceeds the subtotal';
    if (d.taxRate < 0 || d.taxRate > 100) next.taxRate = 'Tax must be between 0 and 100';

    return next;
  };

  const save = async () => {
    if (!draft) return;
    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error('Please fix the highlighted fields');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        invoiceNumber: draft.invoiceNumber.trim(),
        invoiceDate: draft.invoiceDate,
        dueDate: draft.dueDate || null,
        status: draft.status,
        currency: draft.currency,
        customer: { ...draft.customer, customerId: draft.customer.customerId || undefined },
        items: draft.items.map(({ key: _key, ...item }) => item),
        discountType: draft.discountType,
        discountValue: draft.discountValue,
        taxRate: draft.taxRate,
        additionalCharges: draft.additionalCharges,
        amountPaid: draft.amountPaid,
        notes: draft.notes,
        paymentTerms: draft.paymentTerms,
        additionalInfo: draft.additionalInfo,
      };

      const saved =
        mode === 'edit' && id
          ? await invoiceApi.update(id, payload)
          : await invoiceApi.create(payload);

      toast.success(mode === 'edit' ? 'Invoice updated' : `Invoice ${saved.invoiceNumber} created`);
      navigate(`/invoices/${saved._id}`);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setErrors(err.toFieldMap());
        toast.error(err.message);
      } else {
        toast.error('Could not save the invoice');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading || !draft || !totals) return <PageLoader label="Preparing invoice…" />;

  const cur = draft.currency;
  const customerField = (
    key: keyof InvoiceCustomerSnapshot,
    label: string,
    required = false
  ) => (
    <Field label={label} error={errors[`customer.${key}`]} required={required}>
      <input
        className="wm-input"
        value={(draft.customer[key] as string) || ''}
        onChange={(e) =>
          patch({ customer: { ...draft.customer, [key]: e.target.value } })
        }
      />
    </Field>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link to="/invoices" className="wm-btn-ghost wm-btn-sm" aria-label="Back to invoices">
            <ArrowLeft size={15} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-ink">
              {mode === 'edit' ? 'Edit Invoice' : 'Create Invoice'}
            </h1>
            <p className="mt-0.5 text-sm text-ink-muted">
              {mode === 'edit' ? draft.invoiceNumber : 'Numbers are generated automatically.'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="wm-btn-ghost xl:hidden"
            onClick={() => setShowPreview((v) => !v)}
          >
            <Eye size={15} />
            {showPreview ? 'Hide preview' : 'Preview'}
          </button>
          <button type="button" className="wm-btn-primary" onClick={save} disabled={saving}>
            {saving ? <Spinner size={15} /> : <Save size={15} />}
            {mode === 'edit' ? 'Save changes' : 'Save invoice'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_480px]">
        {/* ------------------------------------------------------ form */}
        <div className="space-y-5">
          <section className="wm-card p-5">
            <h2 className="mb-4 text-base font-bold text-ink">Invoice Information</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Invoice number" error={errors.invoiceNumber} required>
                <input
                  className="wm-input font-semibold"
                  value={draft.invoiceNumber}
                  onChange={(e) => patch({ invoiceNumber: e.target.value })}
                />
              </Field>
              <Field label="Invoice date" error={errors.invoiceDate} required>
                <input
                  type="date"
                  className="wm-input"
                  value={draft.invoiceDate}
                  onChange={(e) => patch({ invoiceDate: e.target.value })}
                />
              </Field>
              <Field label="Due date" error={errors.dueDate}>
                <input
                  type="date"
                  className="wm-input"
                  value={draft.dueDate}
                  min={draft.invoiceDate}
                  onChange={(e) => patch({ dueDate: e.target.value })}
                />
              </Field>
              <Field label="Payment status">
                <select
                  className="wm-input"
                  value={draft.status}
                  onChange={(e) => patch({ status: e.target.value as InvoiceStatus })}
                >
                  {ALL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Currency">
                <select
                  className="wm-input"
                  value={draft.currency}
                  onChange={(e) => patch({ currency: e.target.value as CurrencyCode })}
                >
                  {CURRENCY_LIST.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol}) — {c.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <section className="wm-card p-5">
            <h2 className="mb-4 text-base font-bold text-ink">Customer Information</h2>
            <CustomerPicker
              value={draft.customer}
              onSelect={(snapshot) => patch({ customer: snapshot })}
              onClear={() => patch({ customer: { ...EMPTY_CUSTOMER } })}
            />
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {customerField('name', 'Customer name', true)}
              {customerField('company', 'Company name')}
              {customerField('email', 'Email')}
              {customerField('phone', 'Phone')}
              <div className="sm:col-span-2 lg:col-span-1">
                {customerField('address', 'Address')}
              </div>
              {customerField('city', 'City')}
              {customerField('state', 'State')}
              {customerField('country', 'Country')}
              {customerField('postalCode', 'Postal code')}
              {customerField('taxNumber', 'GST / VAT number')}
            </div>
          </section>

          <section className="wm-card overflow-hidden">
            <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
              <h2 className="text-base font-bold text-ink">Invoice Items</h2>
              <button type="button" className="wm-btn-ghost wm-btn-sm" onClick={addItem}>
                <Plus size={14} />
                Add Item
              </button>
            </header>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[840px]">
                <thead className="border-b border-line bg-surface">
                  <tr>
                    <th className="wm-th">Description</th>
                    <th className="wm-th w-24">Qty</th>
                    <th className="wm-th w-32">Rate</th>
                    <th className="wm-th w-44">Discount</th>
                    <th className="wm-th w-24">Tax %</th>
                    <th className="wm-th w-32 text-right">Amount</th>
                    <th className="wm-th w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {draft.items.map((item, i) => (
                    <tr key={item.key} className="align-top">
                      <td className="px-4 py-3">
                        <input
                          className="wm-input"
                          placeholder="e.g. Website Development"
                          value={item.description}
                          onChange={(e) => patchItem(item.key, { description: e.target.value })}
                        />
                        {errors[`items.${i}.description`] ? (
                          <p className="wm-error">{errors[`items.${i}.description`]}</p>
                        ) : null}
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="number"
                          min={0}
                          step="any"
                          className="wm-input"
                          value={item.quantity}
                          onChange={(e) => patchItem(item.key, { quantity: num(e.target.value) })}
                        />
                        {errors[`items.${i}.quantity`] ? (
                          <p className="wm-error">{errors[`items.${i}.quantity`]}</p>
                        ) : null}
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="number"
                          min={0}
                          step="any"
                          className="wm-input"
                          value={item.rate}
                          onChange={(e) => patchItem(item.key, { rate: num(e.target.value) })}
                        />
                        {errors[`items.${i}.rate`] ? (
                          <p className="wm-error">{errors[`items.${i}.rate`]}</p>
                        ) : null}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex gap-1.5">
                          <input
                            type="number"
                            min={0}
                            step="any"
                            className="wm-input"
                            value={item.discountValue}
                            onChange={(e) =>
                              patchItem(item.key, { discountValue: num(e.target.value) })
                            }
                          />
                          <select
                            className="wm-input w-20 px-2"
                            value={item.discountType}
                            onChange={(e) =>
                              patchItem(item.key, { discountType: e.target.value as DiscountType })
                            }
                            aria-label="Discount type"
                          >
                            <option value="fixed">{CURRENCY_LIST.find((c) => c.code === cur)?.symbol}</option>
                            <option value="percentage">%</option>
                          </select>
                        </div>
                        {errors[`items.${i}.discountValue`] ? (
                          <p className="wm-error">{errors[`items.${i}.discountValue`]}</p>
                        ) : null}
                      </td>
                      <td className="px-2 py-3">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step="any"
                          className="wm-input"
                          value={item.taxRate}
                          onChange={(e) => patchItem(item.key, { taxRate: num(e.target.value) })}
                        />
                        {errors[`items.${i}.taxRate`] ? (
                          <p className="wm-error">{errors[`items.${i}.taxRate`]}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-ink">
                        {formatMoney(totals.items[i]?.amount ?? 0, cur)}
                      </td>
                      <td className="px-2 py-3">
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          disabled={draft.items.length === 1}
                          className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Remove item ${i + 1}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-2">
            <section className="wm-card p-5">
              <h2 className="mb-4 text-base font-bold text-ink">Totals</h2>
              <div className="space-y-4">
                <Field label="Invoice discount" error={errors.discountValue}>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      className="wm-input"
                      value={draft.discountValue}
                      onChange={(e) => patch({ discountValue: num(e.target.value) })}
                    />
                    <select
                      className="wm-input w-32"
                      value={draft.discountType}
                      onChange={(e) => patch({ discountType: e.target.value as DiscountType })}
                      aria-label="Invoice discount type"
                    >
                      <option value="fixed">Fixed</option>
                      <option value="percentage">Percent</option>
                    </select>
                  </div>
                </Field>

                <Field label="Invoice tax (%)" error={errors.taxRate} hint="Applied after discounts.">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step="any"
                    className="wm-input"
                    value={draft.taxRate}
                    onChange={(e) => patch({ taxRate: num(e.target.value) })}
                  />
                </Field>

                <Field label="Additional charges" error={errors.additionalCharges}>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    className="wm-input"
                    value={draft.additionalCharges}
                    onChange={(e) => patch({ additionalCharges: num(e.target.value) })}
                  />
                </Field>

                <Field label="Amount paid" error={errors.amountPaid}>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    className="wm-input"
                    value={draft.amountPaid}
                    onChange={(e) => patch({ amountPaid: num(e.target.value) })}
                  />
                </Field>
              </div>

              <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Subtotal</dt>
                  <dd className="font-semibold">{formatMoney(totals.subtotal, cur)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Discount</dt>
                  <dd className="font-semibold">− {formatMoney(totals.discountTotal, cur)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Tax</dt>
                  <dd className="font-semibold">{formatMoney(totals.taxTotal, cur)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Additional charges</dt>
                  <dd className="font-semibold">{formatMoney(totals.additionalCharges, cur)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                  <dt className="font-bold text-ink">Total</dt>
                  <dd className="font-display text-lg font-bold text-brand">
                    {formatMoney(totals.total, cur)}
                  </dd>
                </div>
                {totals.amountPaid > 0 ? (
                  <div className="flex justify-between">
                    <dt className="text-ink-muted">Amount due</dt>
                    <dd className="font-bold">{formatMoney(totals.amountDue, cur)}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            <section className="wm-card space-y-4 p-5">
              <h2 className="text-base font-bold text-ink">Notes &amp; Terms</h2>
              <Field label="Notes">
                <textarea
                  rows={3}
                  className="wm-input resize-y"
                  value={draft.notes}
                  onChange={(e) => patch({ notes: e.target.value })}
                  placeholder="Thank you for choosing Webamazee."
                />
              </Field>
              <Field label="Payment terms">
                <textarea
                  rows={3}
                  className="wm-input resize-y"
                  value={draft.paymentTerms}
                  onChange={(e) => patch({ paymentTerms: e.target.value })}
                  placeholder="Payment due within 15 days."
                />
              </Field>
              <Field label="Additional information">
                <textarea
                  rows={2}
                  className="wm-input resize-y"
                  value={draft.additionalInfo}
                  onChange={(e) => patch({ additionalInfo: e.target.value })}
                />
              </Field>
            </section>
          </div>
        </div>

        {/* --------------------------------------------------- preview */}
        <aside className={`${showPreview ? 'block' : 'hidden'} xl:block`}>
          <div className="sticky top-24">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
              Live preview
            </p>
            <div className="wm-card overflow-hidden p-3">
              {previewInvoice ? <InvoiceDocument invoice={previewInvoice} /> : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
