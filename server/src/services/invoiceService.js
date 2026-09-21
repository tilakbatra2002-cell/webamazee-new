import { Invoice } from '../models/Invoice.js';
import { Customer } from '../models/Customer.js';
import { CompanySettings } from '../models/CompanySettings.js';
import { computeInvoice } from '../../../shared/calc.js';
import { ApiError } from '../utils/ApiError.js';
import { generateInvoiceNumber, advanceInvoiceCounter } from './invoiceNumber.js';

/** Snapshot of the company profile as it stands right now. */
export async function buildCompanySnapshot(settingsDoc) {
  const s = settingsDoc || (await CompanySettings.getSingleton());
  return {
    companyName: s.companyName,
    logo: s.logo,
    address: s.address,
    city: s.city,
    state: s.state,
    country: s.country,
    postalCode: s.postalCode,
    email: s.email,
    phone: s.phone,
    website: s.website,
    taxNumber: s.taxNumber,
    primaryColor: s.primaryColor,
    bankDetails: {
      bankName: s.bankDetails?.bankName || '',
      accountHolder: s.bankDetails?.accountHolder || '',
      accountNumber: s.bankDetails?.accountNumber || '',
      ifscSwift: s.bankDetails?.ifscSwift || '',
      upi: s.bankDetails?.upi || '',
      paymentInfo: s.bankDetails?.paymentInfo || '',
    },
  };
}

async function resolveCustomerSnapshot(customerInput) {
  const snapshot = { ...customerInput };

  if (customerInput.customerId) {
    const customer = await Customer.findById(customerInput.customerId);
    if (!customer) throw ApiError.badRequest('Selected customer no longer exists');
    snapshot.customerId = customer._id;
  } else {
    snapshot.customerId = null;
  }

  return snapshot;
}

/**
 * Turns validated request input into a persistable invoice.
 * Totals are ALWAYS recomputed here - client-sent totals are ignored.
 */
export async function buildInvoicePayload(input, { existing = null } = {}) {
  const settings = await CompanySettings.getSingleton();
  const totals = computeInvoice(input);

  let invoiceNumber = (input.invoiceNumber || '').trim();
  let allocatedCounter = null;

  if (!invoiceNumber) {
    const generated = await generateInvoiceNumber(settings);
    invoiceNumber = generated.invoiceNumber;
    allocatedCounter = generated.counter;
  }

  // Uniqueness check (the unique index is the final guard).
  const clash = await Invoice.findOne({ invoiceNumber }).select('_id');
  if (clash && (!existing || String(clash._id) !== String(existing._id))) {
    throw ApiError.conflict(`Invoice number "${invoiceNumber}" is already in use`, [
      { field: 'invoiceNumber', message: 'This invoice number already exists' },
    ]);
  }

  const payload = {
    invoiceNumber,
    invoiceDate: input.invoiceDate,
    dueDate: input.dueDate ?? null,
    status: input.status,
    currency: input.currency,
    customer: await resolveCustomerSnapshot(input.customer),
    // Company snapshot is taken at creation; edits keep the original branding
    // unless the invoice is new.
    company: existing ? existing.company : await buildCompanySnapshot(settings),
    items: totals.items,
    discountType: totals.discountType,
    discountValue: totals.discountValue,
    taxRate: totals.taxRate,
    additionalCharges: totals.additionalCharges,
    amountPaid: totals.amountPaid,
    subtotal: totals.subtotal,
    lineDiscountTotal: totals.lineDiscountTotal,
    invoiceDiscount: totals.invoiceDiscount,
    discountTotal: totals.discountTotal,
    lineTaxTotal: totals.lineTaxTotal,
    invoiceTax: totals.invoiceTax,
    taxTotal: totals.taxTotal,
    total: totals.total,
    amountDue: totals.amountDue,
    notes: input.notes,
    paymentTerms: input.paymentTerms,
    additionalInfo: input.additionalInfo,
  };

  return { payload, allocatedCounter };
}

export async function commitCounter(allocatedCounter) {
  if (allocatedCounter != null) await advanceInvoiceCounter(allocatedCounter);
}

/** An invoice is overdue when it has a past due date and is not settled. */
export function isOverdue(invoice, now = new Date()) {
  if (!invoice.dueDate) return false;
  if (['paid', 'cancelled', 'draft'].includes(invoice.status)) return false;
  return new Date(invoice.dueDate) < now;
}
