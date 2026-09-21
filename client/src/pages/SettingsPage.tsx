import { useEffect, useState } from 'react';
import { Building2, CreditCard, Palette, Receipt, Save } from 'lucide-react';
import { settingsApi, ApiRequestError } from '../lib/api';
import { useToast } from '../context/ToastContext';
import { useSettings } from '../context/SettingsContext';
import type { BankDetails, CurrencyCode, Settings } from '../lib/types';
import { CURRENCY_LIST } from '../lib/format';
import { Field, PageLoader, Spinner } from '../components/ui';
import { LogoUpload } from '../components/LogoUpload';

const TABS = [
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'invoice', label: 'Invoice', icon: Receipt },
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'bank', label: 'Bank / Payment', icon: CreditCard },
] as const;

type TabId = (typeof TABS)[number]['id'];

export function SettingsPage() {
  const toast = useToast();
  const { settings, applySettings } = useSettings();
  const [form, setForm] = useState<Settings | null>(null);
  const [tab, setTab] = useState<TabId>('company');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm({ ...settings, bankDetails: { ...settings.bankDetails } });
  }, [settings]);

  if (!form) return <PageLoader label="Loading settings…" />;

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));

  const setBank = (key: keyof BankDetails, value: string) =>
    setForm((prev) =>
      prev ? { ...prev, bankDetails: { ...prev.bankDetails, [key]: value } } : prev
    );

  const save = async () => {
    setErrors({});
    const next: Record<string, string> = {};
    if (!form.companyName.trim()) next.companyName = 'Company name is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Enter a valid email address';
    if (!/^#[0-9a-fA-F]{6}$/.test(form.primaryColor))
      next.primaryColor = 'Use a hex colour like #0F6DFF';
    if (form.defaultTax < 0 || form.defaultTax > 100)
      next.defaultTax = 'Tax must be between 0 and 100';
    if (form.nextInvoiceNumber < 1) next.nextInvoiceNumber = 'Must be 1 or higher';
    if (Object.keys(next).length) {
      setErrors(next);
      toast.error('Please fix the highlighted fields');
      return;
    }

    setSaving(true);
    try {
      const { _id: _ignored, ...payload } = form;
      const updated = await settingsApi.update(payload);
      applySettings(updated);
      toast.success('Settings saved');
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setErrors(err.toFieldMap());
        toast.error(err.message);
      } else {
        toast.error('Could not save settings');
      }
    } finally {
      setSaving(false);
    }
  };

  const text = (key: keyof Settings, label: string, required = false) => (
    <Field label={label} error={errors[key as string]} required={required}>
      <input
        className="wm-input"
        value={(form[key] as string) ?? ''}
        onChange={(e) => set(key, e.target.value as never)}
      />
    </Field>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Settings</h1>
          <p className="mt-1 text-sm text-ink-muted">
            These details are applied to every new invoice you create.
          </p>
        </div>
        <button type="button" className="wm-btn-primary" onClick={save} disabled={saving}>
          {saving ? <Spinner size={15} /> : <Save size={15} />}
          Save settings
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav className="wm-card flex gap-1 overflow-x-auto p-2 lg:flex-col">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                tab === id ? 'bg-brand-50 text-brand' : 'text-ink-muted hover:bg-surface hover:text-ink'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <section className="wm-card p-5">
          {tab === 'company' ? (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-ink">Company information</h2>
              <LogoUpload value={form.logo} onChange={(v) => set('logo', v)} />
              <div className="grid gap-4 sm:grid-cols-2">
                {text('companyName', 'Company name', true)}
                {text('website', 'Website')}
                {text('email', 'Email')}
                {text('phone', 'Phone')}
                <div className="sm:col-span-2">{text('address', 'Address')}</div>
                {text('city', 'City')}
                {text('state', 'State')}
                {text('country', 'Country')}
                {text('postalCode', 'Postal code')}
                <div className="sm:col-span-2">{text('taxNumber', 'GST / VAT number')}</div>
              </div>
            </div>
          ) : null}

          {tab === 'invoice' ? (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-ink">Invoice defaults</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Invoice prefix"
                  error={errors.invoicePrefix}
                  hint="Numbers look like PREFIX-YEAR-0001."
                >
                  <input
                    className="wm-input"
                    value={form.invoicePrefix}
                    onChange={(e) => set('invoicePrefix', e.target.value)}
                  />
                </Field>
                <Field label="Next / starting number" error={errors.nextInvoiceNumber}>
                  <input
                    type="number"
                    min={1}
                    className="wm-input"
                    value={form.nextInvoiceNumber}
                    onChange={(e) => set('nextInvoiceNumber', Number(e.target.value || 1))}
                  />
                </Field>
                <Field label="Default currency">
                  <select
                    className="wm-input"
                    value={form.defaultCurrency}
                    onChange={(e) => set('defaultCurrency', e.target.value as CurrencyCode)}
                  >
                    {CURRENCY_LIST.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.symbol}) — {c.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Default tax (%)" error={errors.defaultTax}>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step="any"
                    className="wm-input"
                    value={form.defaultTax}
                    onChange={(e) => set('defaultTax', Number(e.target.value || 0))}
                  />
                </Field>
                <Field label="Default payment window (days)" error={errors.defaultDueDays}>
                  <input
                    type="number"
                    min={0}
                    max={365}
                    className="wm-input"
                    value={form.defaultDueDays}
                    onChange={(e) => set('defaultDueDays', Number(e.target.value || 0))}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Default payment terms" error={errors.defaultPaymentTerms}>
                    <textarea
                      rows={3}
                      className="wm-input resize-y"
                      value={form.defaultPaymentTerms}
                      onChange={(e) => set('defaultPaymentTerms', e.target.value)}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Default notes" error={errors.defaultNotes}>
                    <textarea
                      rows={3}
                      className="wm-input resize-y"
                      value={form.defaultNotes}
                      onChange={(e) => set('defaultNotes', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ) : null}

          {tab === 'branding' ? (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-ink">Branding</h2>
              <Field
                label="Primary colour"
                error={errors.primaryColor}
                hint="Used for invoice highlights and the app accent."
              >
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="h-10 w-14 cursor-pointer rounded-lg border border-line bg-white p-1"
                    value={/^#[0-9a-fA-F]{6}$/.test(form.primaryColor) ? form.primaryColor : '#0F6DFF'}
                    onChange={(e) => set('primaryColor', e.target.value.toUpperCase())}
                    aria-label="Pick primary colour"
                  />
                  <input
                    className="wm-input max-w-[160px] font-mono uppercase"
                    value={form.primaryColor}
                    onChange={(e) => set('primaryColor', e.target.value.toUpperCase())}
                  />
                </div>
              </Field>
              <LogoUpload value={form.logo} onChange={(v) => set('logo', v)} />
            </div>
          ) : null}

          {tab === 'bank' ? (
            <div className="space-y-5">
              <h2 className="text-base font-bold text-ink">Bank &amp; payment details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Bank name">
                  <input
                    className="wm-input"
                    value={form.bankDetails.bankName}
                    onChange={(e) => setBank('bankName', e.target.value)}
                  />
                </Field>
                <Field label="Account holder">
                  <input
                    className="wm-input"
                    value={form.bankDetails.accountHolder}
                    onChange={(e) => setBank('accountHolder', e.target.value)}
                  />
                </Field>
                <Field label="Account number">
                  <input
                    className="wm-input"
                    value={form.bankDetails.accountNumber}
                    onChange={(e) => setBank('accountNumber', e.target.value)}
                  />
                </Field>
                <Field label="IFSC / SWIFT">
                  <input
                    className="wm-input"
                    value={form.bankDetails.ifscSwift}
                    onChange={(e) => setBank('ifscSwift', e.target.value)}
                  />
                </Field>
                <Field label="UPI">
                  <input
                    className="wm-input"
                    value={form.bankDetails.upi}
                    onChange={(e) => setBank('upi', e.target.value)}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Other payment information">
                    <textarea
                      rows={3}
                      className="wm-input resize-y"
                      value={form.bankDetails.paymentInfo}
                      onChange={(e) => setBank('paymentInfo', e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
