/**
 * Canonical invoice calculation engine.
 *
 * Shared by the Express API (authoritative recalculation on write) and the
 * React client (live preview). Every figure is derived here so the browser and
 * the database can never disagree.
 *
 * All intermediate arithmetic uses integer minor units (cents).
 */
import { toCents, fromCents, percentOfCents } from './money.js';

export const DISCOUNT_TYPES = ['fixed', 'percentage'];

/**
 * Per-line maths.
 *   base      = quantity x rate
 *   discount  = fixed amount or % of base
 *   taxable   = base - discount
 *   tax       = taxRate % of taxable
 *   amount    = taxable + tax
 */
export function computeLine(rawLine) {
  const quantity = Number(rawLine?.quantity ?? 0) || 0;
  const rateCents = toCents(rawLine?.rate ?? 0);
  const baseCents = Math.round(rateCents * quantity);

  const discountType = DISCOUNT_TYPES.includes(rawLine?.discountType)
    ? rawLine.discountType
    : 'fixed';
  const discountValue = Number(rawLine?.discountValue ?? 0) || 0;

  let discountCents =
    discountType === 'percentage'
      ? percentOfCents(baseCents, discountValue)
      : toCents(discountValue);

  // A line discount can never exceed the line base.
  discountCents = Math.min(Math.max(discountCents, 0), Math.max(baseCents, 0));

  const taxableCents = baseCents - discountCents;
  const taxRate = Number(rawLine?.taxRate ?? 0) || 0;
  const taxCents = percentOfCents(taxableCents, taxRate);
  const amountCents = taxableCents + taxCents;

  return {
    description: String(rawLine?.description ?? '').trim(),
    quantity,
    rate: fromCents(rateCents),
    discountType,
    discountValue,
    taxRate,
    // Derived, always server-authoritative:
    baseAmount: fromCents(baseCents),
    discountAmount: fromCents(discountCents),
    taxAmount: fromCents(taxCents),
    amount: fromCents(amountCents),
    _cents: { baseCents, discountCents, taxableCents, taxCents, amountCents },
  };
}

/**
 * Whole-invoice maths.
 *
 *   subtotal          = sum of line bases
 *   lineDiscounts     = sum of per-line discounts
 *   invoiceDiscount   = fixed amount or % of (subtotal - lineDiscounts)
 *   discountTotal     = lineDiscounts + invoiceDiscount
 *   lineTax           = sum of per-line tax
 *   invoiceTax        = taxRate % of (subtotal - discountTotal)  [when no line tax is used]
 *   total             = subtotal - discountTotal + taxTotal + additionalCharges
 */
export function computeInvoice(input = {}) {
  const lines = Array.isArray(input.items) ? input.items.map(computeLine) : [];

  const subtotalCents = lines.reduce((acc, l) => acc + l._cents.baseCents, 0);
  const lineDiscountCents = lines.reduce((acc, l) => acc + l._cents.discountCents, 0);
  const lineTaxCents = lines.reduce((acc, l) => acc + l._cents.taxCents, 0);

  const netAfterLineDiscount = Math.max(subtotalCents - lineDiscountCents, 0);

  const discountType = DISCOUNT_TYPES.includes(input.discountType) ? input.discountType : 'fixed';
  const discountValue = Number(input.discountValue ?? 0) || 0;
  let invoiceDiscountCents =
    discountType === 'percentage'
      ? percentOfCents(netAfterLineDiscount, discountValue)
      : toCents(discountValue);
  // Invoice-level discount cannot exceed what is left after line discounts.
  invoiceDiscountCents = Math.min(Math.max(invoiceDiscountCents, 0), netAfterLineDiscount);

  const discountTotalCents = lineDiscountCents + invoiceDiscountCents;
  const taxableCents = Math.max(subtotalCents - discountTotalCents, 0);

  const invoiceTaxRate = Number(input.taxRate ?? 0) || 0;
  const invoiceTaxCents = percentOfCents(taxableCents, invoiceTaxRate);
  const taxTotalCents = lineTaxCents + invoiceTaxCents;

  const additionalChargesCents = Math.max(toCents(input.additionalCharges ?? 0), 0);
  const totalCents = taxableCents + taxTotalCents + additionalChargesCents;

  const amountPaidCents = Math.min(
    Math.max(toCents(input.amountPaid ?? 0), 0),
    Math.max(totalCents, 0)
  );

  return {
    items: lines.map(({ _cents, ...line }) => line),
    subtotal: fromCents(subtotalCents),
    lineDiscountTotal: fromCents(lineDiscountCents),
    discountType,
    discountValue,
    invoiceDiscount: fromCents(invoiceDiscountCents),
    discountTotal: fromCents(discountTotalCents),
    taxRate: invoiceTaxRate,
    lineTaxTotal: fromCents(lineTaxCents),
    invoiceTax: fromCents(invoiceTaxCents),
    taxTotal: fromCents(taxTotalCents),
    additionalCharges: fromCents(additionalChargesCents),
    total: fromCents(totalCents),
    amountPaid: fromCents(amountPaidCents),
    amountDue: fromCents(totalCents - amountPaidCents),
  };
}
