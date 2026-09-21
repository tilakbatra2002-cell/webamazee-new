import mongoose from 'mongoose';
import { CURRENCY_CODES } from '../../../shared/money.js';

/** Singleton document holding the Webamazee company profile + invoice defaults. */
const companySettingsSchema = new mongoose.Schema(
  {
    singleton: { type: String, default: 'company', unique: true, immutable: true },

    // Company tab
    companyName: { type: String, default: 'Webamazee', trim: true, maxlength: 160 },
    logo: { type: String, default: '' }, // data URL or absolute https URL
    address: { type: String, default: '', trim: true, maxlength: 300 },
    city: { type: String, default: '', trim: true, maxlength: 120 },
    state: { type: String, default: '', trim: true, maxlength: 120 },
    country: { type: String, default: '', trim: true, maxlength: 120 },
    postalCode: { type: String, default: '', trim: true, maxlength: 40 },
    email: { type: String, default: '', trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, default: '', trim: true, maxlength: 60 },
    website: { type: String, default: '', trim: true, maxlength: 200 },
    taxNumber: { type: String, default: '', trim: true, maxlength: 60 },

    // Invoice tab
    invoicePrefix: { type: String, default: 'WM', trim: true, maxlength: 12 },
    nextInvoiceNumber: { type: Number, default: 1, min: 1 },
    defaultCurrency: { type: String, enum: CURRENCY_CODES, default: 'USD' },
    defaultTax: { type: Number, default: 0, min: 0, max: 100 },
    defaultDueDays: { type: Number, default: 15, min: 0, max: 365 },
    defaultPaymentTerms: { type: String, default: '', maxlength: 4000 },
    defaultNotes: { type: String, default: '', maxlength: 4000 },

    // Branding tab
    primaryColor: { type: String, default: '#0F6DFF', maxlength: 9 },

    // Bank / payment tab
    bankDetails: {
      bankName: { type: String, default: '', trim: true, maxlength: 160 },
      accountHolder: { type: String, default: '', trim: true, maxlength: 160 },
      accountNumber: { type: String, default: '', trim: true, maxlength: 80 },
      ifscSwift: { type: String, default: '', trim: true, maxlength: 60 },
      upi: { type: String, default: '', trim: true, maxlength: 120 },
      paymentInfo: { type: String, default: '', maxlength: 4000 },
    },
  },
  { timestamps: true }
);

companySettingsSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v;
    return ret;
  },
});

export const DEFAULT_SETTINGS = {
  singleton: 'company',
  companyName: 'Webamazee',
  logo: '',
  address: '',
  city: 'Mohali',
  state: 'Punjab',
  country: 'India',
  postalCode: '',
  email: 'info@webamazee.com',
  phone: '',
  website: 'https://www.webamazee.com/',
  taxNumber: '',
  invoicePrefix: 'WM',
  nextInvoiceNumber: 1,
  defaultCurrency: 'USD',
  defaultTax: 0,
  defaultDueDays: 15,
  defaultPaymentTerms: 'Payment due within 15 days.',
  defaultNotes: 'Thank you for choosing Webamazee.',
  primaryColor: '#0F6DFF',
  bankDetails: {
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifscSwift: '',
    upi: '',
    paymentInfo: '',
  },
};

/** Always returns the singleton settings doc, creating it on first access. */
companySettingsSchema.statics.getSingleton = async function getSingleton() {
  let doc = await this.findOne({ singleton: 'company' });
  if (!doc) doc = await this.create(DEFAULT_SETTINGS);
  return doc;
};

export const CompanySettings = mongoose.model('CompanySettings', companySettingsSchema);
