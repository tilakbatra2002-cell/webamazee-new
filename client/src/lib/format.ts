// @ts-expect-error - plain JS module shared with the Express server
import { formatMoney as sharedFormatMoney, CURRENCIES as SHARED_CURRENCIES } from '@shared/money.js';
import type { CurrencyCode } from './types';

export interface CurrencyMeta {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  label: string;
}

export const CURRENCIES = SHARED_CURRENCIES as Record<CurrencyCode, CurrencyMeta>;
export const CURRENCY_LIST = Object.values(CURRENCIES) as CurrencyMeta[];

export function formatMoney(amount: number, currency: CurrencyCode = 'USD'): string {
  return sharedFormatMoney(amount, currency);
}

/** dd MMM yyyy in UTC, matching the invoice template. */
export function formatDate(value?: string | Date | null): string {
  if (!value) return '—';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

/** yyyy-MM-dd for <input type="date">, kept in UTC to avoid off-by-one days. */
export function toDateInput(value?: string | Date | null): string {
  if (!value) return '';
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

export function todayInput(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysInput(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
