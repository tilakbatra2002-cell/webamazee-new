/**
 * Integer-cent based money helpers.
 * All invoice arithmetic runs on integer minor units to avoid
 * floating point currency drift (0.1 + 0.2 !== 0.3).
 */

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US', label: 'US Dollar' },
  INR: { code: 'INR', symbol: '\u20B9', locale: 'en-IN', label: 'Indian Rupee' },
  GBP: { code: 'GBP', symbol: '\u00A3', locale: 'en-GB', label: 'British Pound' },
  // en-IE places the euro sign before the amount, which reads better in a
  // right-aligned invoice totals column than the de-DE "2.716,03 €" form.
  EUR: { code: 'EUR', symbol: '\u20AC', locale: 'en-IE', label: 'Euro' },
  // en-AU/en-NZ would render a bare "$", which is ambiguous next to USD on an
  // international invoice, so format these from en-US to keep A$ / NZ$.
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-US', display: 'symbol', label: 'Australian Dollar' },
  NZD: { code: 'NZD', symbol: 'NZ$', locale: 'en-US', display: 'symbol', label: 'New Zealand Dollar' },
};

export const CURRENCY_CODES = Object.keys(CURRENCIES);

/** Round half-up at 2 decimals, returning integer minor units. */
export function toCents(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  // Use a string round-trip to dodge binary representation edges (1.005 etc).
  const scaled = Math.round((n + Number.EPSILON) * 100);
  return Object.is(scaled, -0) ? 0 : scaled;
}

export function fromCents(cents) {
  return Math.round(cents) / 100;
}

/** Apply a percentage to a cent amount, rounded half-up. */
export function percentOfCents(cents, percent) {
  const p = Number(percent);
  if (!Number.isFinite(p) || p === 0) return 0;
  return Math.round((cents * p) / 100);
}

export function formatMoney(amount, currencyCode = 'USD') {
  const cfg = CURRENCIES[currencyCode] || CURRENCIES.USD;
  try {
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency: cfg.code,
      currencyDisplay: cfg.display || 'narrowSymbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  } catch {
    const n = (Number(amount) || 0).toFixed(2);
    return `${cfg.symbol}${n}`;
  }
}
