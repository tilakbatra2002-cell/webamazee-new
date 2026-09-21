import { Invoice } from '../models/Invoice.js';
import { CompanySettings } from '../models/CompanySettings.js';

const pad = (n) => String(n).padStart(4, '0');

/**
 * Builds the next unique invoice number, e.g. WM-2026-0001.
 *
 * The counter lives in settings, but we still probe the invoices collection
 * so a manually entered number can never be reissued.
 */
export async function generateInvoiceNumber(settingsDoc) {
  const settings = settingsDoc || (await CompanySettings.getSingleton());
  const prefix = (settings.invoicePrefix || 'WM').trim().replace(/\s+/g, '');
  const year = new Date().getUTCFullYear();

  let counter = Math.max(Number(settings.nextInvoiceNumber) || 1, 1);

  // Never collide, even if numbers were entered by hand or seeded.
  for (let attempt = 0; attempt < 10000; attempt += 1) {
    const candidate = `${prefix}-${year}-${pad(counter)}`;
    // eslint-disable-next-line no-await-in-loop
    const exists = await Invoice.exists({ invoiceNumber: candidate });
    if (!exists) return { invoiceNumber: candidate, counter };
    counter += 1;
  }
  throw new Error('Unable to allocate a unique invoice number');
}

/** Advances the stored counter past `counter` once an invoice is persisted. */
export async function advanceInvoiceCounter(counter) {
  const settings = await CompanySettings.getSingleton();
  if (Number(settings.nextInvoiceNumber) <= counter) {
    settings.nextInvoiceNumber = counter + 1;
    await settings.save();
  }
}
