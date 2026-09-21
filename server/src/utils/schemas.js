import { z } from 'zod';
import { CURRENCY_CODES } from '../../../shared/money.js';
import { INVOICE_STATUSES } from '../models/Invoice.js';

const trimmed = (max) => z.string().trim().max(max);
const optionalText = (max) => trimmed(max).optional().default('');

const emailOptional = z
  .union([z.literal(''), z.string().trim().email('Enter a valid email address')])
  .optional()
  .default('');

const dateLike = z.union([z.string(), z.date()]).transform((v, ctx) => {
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) {
    ctx.addIssue({ code: 'custom', message: 'Enter a valid date' });
    return z.NEVER;
  }
  return d;
});

const money = (label) =>
  z.coerce
    .number({ message: `${label} must be a number` })
    .min(0, `${label} cannot be negative`)
    .max(1e12, `${label} is too large`);

/* ------------------------------------------------------------------- auth */

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required').max(200),
});

export const registerSchema = z.object({
  name: trimmed(120).min(1, 'Name is required'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200),
});

/* --------------------------------------------------------------- customer */

export const customerSchema = z.object({
  name: trimmed(160).min(1, 'Customer name is required'),
  company: optionalText(160),
  email: emailOptional,
  phone: optionalText(60),
  address: optionalText(300),
  city: optionalText(120),
  state: optionalText(120),
  country: optionalText(120),
  postalCode: optionalText(40),
  taxNumber: optionalText(60),
  notes: optionalText(2000),
});

export const customerUpdateSchema = customerSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: 'No fields to update' }
);

/* ---------------------------------------------------------------- invoice */

export const invoiceItemSchema = z.object({
  description: trimmed(500).min(1, 'Item description is required'),
  quantity: z.coerce
    .number({ message: 'Quantity must be a number' })
    .gt(0, 'Quantity must be greater than 0')
    .max(1e6, 'Quantity is too large'),
  rate: money('Rate'),
  discountType: z.enum(['fixed', 'percentage']).optional().default('fixed'),
  discountValue: money('Discount').optional().default(0),
  taxRate: z.coerce
    .number({ message: 'Tax must be a number' })
    .min(0, 'Tax cannot be negative')
    .max(100, 'Tax cannot exceed 100%')
    .optional()
    .default(0),
});

const invoiceCustomerSchema = z.object({
  customerId: z
    .union([z.string().regex(/^[a-f\d]{24}$/i, 'Invalid customer id'), z.null(), z.literal('')])
    .optional(),
  name: trimmed(160).min(1, 'Customer name is required'),
  company: optionalText(160),
  email: emailOptional,
  phone: optionalText(60),
  address: optionalText(300),
  city: optionalText(120),
  state: optionalText(120),
  country: optionalText(120),
  postalCode: optionalText(40),
  taxNumber: optionalText(60),
});

export const invoiceSchema = z
  .object({
    invoiceNumber: trimmed(60)
      .regex(/^[A-Za-z0-9/_-]*$/, 'Invoice number may only contain letters, numbers, - / _')
      .optional()
      .default(''),
    invoiceDate: dateLike,
    dueDate: dateLike.nullish(),
    status: z.enum(INVOICE_STATUSES, { message: 'Invalid status' }).optional().default('draft'),
    currency: z.enum(CURRENCY_CODES, { message: 'Invalid currency' }).optional().default('USD'),
    customer: invoiceCustomerSchema,
    items: z.array(invoiceItemSchema).min(1, 'Add at least one invoice item'),
    discountType: z.enum(['fixed', 'percentage']).optional().default('fixed'),
    discountValue: money('Discount').optional().default(0),
    taxRate: z.coerce
      .number({ message: 'Tax must be a number' })
      .min(0, 'Tax cannot be negative')
      .max(100, 'Tax cannot exceed 100%')
      .optional()
      .default(0),
    additionalCharges: money('Additional charges').optional().default(0),
    amountPaid: money('Amount paid').optional().default(0),
    notes: optionalText(4000),
    paymentTerms: optionalText(4000),
    additionalInfo: optionalText(4000),
  })
  .refine((data) => !data.dueDate || data.dueDate >= data.invoiceDate, {
    message: 'Due date cannot be before the invoice date',
    path: ['dueDate'],
  });

export const invoiceStatusSchema = z.object({
  status: z.enum(INVOICE_STATUSES, { message: 'Invalid status' }),
});

export const invoiceListQuerySchema = z.object({
  search: trimmed(200).optional().default(''),
  status: z.union([z.enum(INVOICE_STATUSES), z.literal('all'), z.literal('')]).optional().default(''),
  currency: z.union([z.enum(CURRENCY_CODES), z.literal('all'), z.literal('')]).optional().default(''),
  customerId: z.string().regex(/^[a-f\d]{24}$/i).optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  sort: z.enum(['newest', 'oldest', 'highest', 'lowest']).optional().default('newest'),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

/* --------------------------------------------------------------- settings */

const logoSchema = z
  .string()
  .trim()
  .max(3_000_000, 'Logo file is too large (max ~2MB)')
  .refine(
    (v) =>
      v === '' ||
      /^data:image\/(png|jpeg|jpg|webp|gif|svg\+xml);base64,[A-Za-z0-9+/=\s]+$/i.test(v) ||
      /^https:\/\/[^\s"'<>]+$/i.test(v),
    'Logo must be an uploaded image or an https URL'
  );

export const settingsSchema = z
  .object({
    companyName: trimmed(160).min(1, 'Company name is required'),
    logo: logoSchema.optional(),
    address: optionalText(300),
    city: optionalText(120),
    state: optionalText(120),
    country: optionalText(120),
    postalCode: optionalText(40),
    email: emailOptional,
    phone: optionalText(60),
    website: optionalText(200),
    taxNumber: optionalText(60),
    invoicePrefix: trimmed(12)
      .regex(/^[A-Za-z0-9-]+$/, 'Prefix may only contain letters, numbers and dashes')
      .optional(),
    nextInvoiceNumber: z.coerce.number().int().min(1, 'Starting number must be 1 or higher').optional(),
    defaultCurrency: z.enum(CURRENCY_CODES, { message: 'Invalid currency' }).optional(),
    defaultTax: z.coerce.number().min(0, 'Tax cannot be negative').max(100, 'Tax cannot exceed 100%').optional(),
    defaultDueDays: z.coerce.number().int().min(0).max(365).optional(),
    defaultPaymentTerms: optionalText(4000),
    defaultNotes: optionalText(4000),
    primaryColor: z
      .string()
      .trim()
      .regex(/^#[0-9a-fA-F]{6}$/, 'Use a hex colour like #0F6DFF')
      .optional(),
    bankDetails: z
      .object({
        bankName: optionalText(160),
        accountHolder: optionalText(160),
        accountNumber: optionalText(80),
        ifscSwift: optionalText(60),
        upi: optionalText(120),
        paymentInfo: optionalText(4000),
      })
      .optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'No settings to update' });
