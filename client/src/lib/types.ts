export type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'EUR' | 'AUD' | 'NZD';

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'paid'
  | 'partially-paid'
  | 'pending'
  | 'overdue'
  | 'cancelled';

export type DiscountType = 'fixed' | 'percentage';

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  baseAmount?: number;
  discountAmount?: number;
  taxAmount?: number;
  amount?: number;
}

export interface Customer {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  taxNumber: string;
  notes?: string;
  invoiceCount?: number;
  totalBilled?: number;
  totalPaid?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceCustomerSnapshot {
  customerId?: string | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  taxNumber: string;
}

export interface BankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  ifscSwift: string;
  upi: string;
  paymentInfo: string;
}

export interface CompanySnapshot {
  companyName: string;
  logo: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  taxNumber: string;
  primaryColor: string;
  bankDetails: BankDetails;
}

export interface Invoice {
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string | null;
  status: InvoiceStatus;
  currency: CurrencyCode;
  customer: InvoiceCustomerSnapshot;
  company: CompanySnapshot;
  items: InvoiceItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  additionalCharges: number;
  amountPaid: number;
  subtotal: number;
  lineDiscountTotal: number;
  invoiceDiscount: number;
  discountTotal: number;
  lineTaxTotal: number;
  invoiceTax: number;
  taxTotal: number;
  total: number;
  amountDue: number;
  notes: string;
  paymentTerms: string;
  additionalInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  _id?: string;
  companyName: string;
  logo: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  taxNumber: string;
  invoicePrefix: string;
  nextInvoiceNumber: number;
  defaultCurrency: CurrencyCode;
  defaultTax: number;
  defaultDueDays: number;
  defaultPaymentTerms: string;
  defaultNotes: string;
  primaryColor: string;
  bankDetails: BankDetails;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface DashboardStats {
  totals: {
    invoices: number;
    paid: number;
    pending: number;
    overdue: number;
    draft: number;
    cancelled: number;
    revenue: number;
    outstanding: number;
    overdueAmount: number;
  };
  revenueByCurrency: Record<string, number>;
  byStatus: Record<string, number>;
  recentInvoices: Invoice[];
}

/** Field-level errors surfaced by the API's zod validation. */
export interface ApiFieldError {
  field: string;
  message: string;
}
