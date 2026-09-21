import mongoose from 'mongoose';
import { CURRENCY_CODES } from '../../../shared/money.js';

export const INVOICE_STATUSES = [
  'draft',
  'sent',
  'paid',
  'partially-paid',
  'pending',
  'overdue',
  'cancelled',
];

/** Statuses that count toward collected revenue. */
export const REVENUE_STATUSES = ['paid', 'partially-paid'];

const itemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true, trim: true, maxlength: 500 },
    quantity: { type: Number, required: true, min: 0.0001 },
    rate: { type: Number, required: true, min: 0 },
    discountType: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
    discountValue: { type: Number, default: 0, min: 0 },
    taxRate: { type: Number, default: 0, min: 0, max: 100 },
    // Derived server-side by shared/calc.js
    baseAmount: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
  },
  { _id: false }
);

/** Customer details are snapshotted onto the invoice so historic invoices
 *  never change when a customer record is later edited. */
const customerSnapshotSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', default: null },
    name: { type: String, required: true, trim: true, maxlength: 160 },
    company: { type: String, default: '', trim: true },
    email: { type: String, default: '', trim: true, lowercase: true },
    phone: { type: String, default: '', trim: true },
    address: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    country: { type: String, default: '', trim: true },
    postalCode: { type: String, default: '', trim: true },
    taxNumber: { type: String, default: '', trim: true },
  },
  { _id: false }
);

/** Company details are also snapshotted at issue time. */
const companySnapshotSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'Webamazee' },
    logo: { type: String, default: '' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    website: { type: String, default: '' },
    taxNumber: { type: String, default: '' },
    primaryColor: { type: String, default: '#0F6DFF' },
    bankDetails: {
      bankName: { type: String, default: '' },
      accountHolder: { type: String, default: '' },
      accountNumber: { type: String, default: '' },
      ifscSwift: { type: String, default: '' },
      upi: { type: String, default: '' },
      paymentInfo: { type: String, default: '' },
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    invoiceDate: { type: Date, required: true },
    dueDate: { type: Date, default: null },
    /**
     * Epoch milliseconds mirror of `invoiceDate`, maintained automatically.
     * Numeric range queries sort and filter identically across every storage
     * engine, which keeps date filtering exact regardless of whether the
     * driver hands back BSON dates or ISO strings.
     */
    invoiceDateMs: { type: Number, default: 0, index: true },
    status: { type: String, enum: INVOICE_STATUSES, default: 'draft', index: true },
    currency: { type: String, enum: CURRENCY_CODES, default: 'USD' },

    customer: { type: customerSnapshotSchema, required: true },
    company: { type: companySnapshotSchema, default: () => ({}) },

    items: {
      type: [itemSchema],
      validate: [(v) => Array.isArray(v) && v.length > 0, 'At least one invoice item is required'],
    },

    // Invoice-level inputs
    discountType: { type: String, enum: ['fixed', 'percentage'], default: 'fixed' },
    discountValue: { type: Number, default: 0, min: 0 },
    taxRate: { type: Number, default: 0, min: 0, max: 100 },
    additionalCharges: { type: Number, default: 0, min: 0 },
    amountPaid: { type: Number, default: 0, min: 0 },

    // Derived totals (authoritative, written by the calc engine)
    subtotal: { type: Number, default: 0 },
    lineDiscountTotal: { type: Number, default: 0 },
    invoiceDiscount: { type: Number, default: 0 },
    discountTotal: { type: Number, default: 0 },
    lineTaxTotal: { type: Number, default: 0 },
    invoiceTax: { type: Number, default: 0 },
    taxTotal: { type: Number, default: 0 },
    total: { type: Number, default: 0, index: true },
    amountDue: { type: Number, default: 0 },

    notes: { type: String, default: '', maxlength: 4000 },
    paymentTerms: { type: String, default: '', maxlength: 4000 },
    additionalInfo: { type: String, default: '', maxlength: 4000 },
  },
  { timestamps: true }
);

invoiceSchema.index({ 'customer.name': 1 });
invoiceSchema.index({ invoiceDate: -1 });

/** Keep the numeric mirror of invoiceDate in sync on every write. */
invoiceSchema.pre('validate', function syncInvoiceDateMs() {
  if (this.invoiceDate) this.invoiceDateMs = new Date(this.invoiceDate).getTime();
});

invoiceSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export const Invoice = mongoose.model('Invoice', invoiceSchema);
