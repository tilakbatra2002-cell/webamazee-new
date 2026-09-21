/**
 * DEVELOPMENT / DEMO SEED SCRIPT.
 *
 * Creates the Webamazee company profile, an admin login, 3 sample customers
 * and 4 sample invoices (including a long, multi-page one).
 *
 *   npm run seed          # add demo data
 *   npm run seed -- --reset   # wipe invoices/customers first
 *
 * This is never executed automatically and refuses to run with
 * NODE_ENV=production unless ALLOW_PRODUCTION_SEED=true is set.
 */
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { Customer } from '../models/Customer.js';
import { Invoice } from '../models/Invoice.js';
import { CompanySettings, DEFAULT_SETTINGS } from '../models/CompanySettings.js';
import { buildInvoicePayload, commitCounter } from '../services/invoiceService.js';

const DEMO_ADMIN = {
  name: 'Webamazee Admin',
  email: env.adminEmail,
  password: env.adminPassword || 'Webamazee@2026',
};

const WEBAMAZEE_SETTINGS = {
  ...DEFAULT_SETTINGS,
  companyName: 'Webamazee',
  address: 'Sector 82, JLPL Industrial Area',
  city: 'Mohali',
  state: 'Punjab',
  country: 'India',
  postalCode: '160055',
  email: 'info@webamazee.com',
  phone: '+91 98765 43210',
  website: 'https://www.webamazee.com/',
  taxNumber: '03ABCDE1234F1Z5',
  invoicePrefix: 'WM',
  defaultCurrency: 'USD',
  defaultTax: 0,
  defaultDueDays: 15,
  defaultPaymentTerms: 'Payment due within 15 days. Late payments may attract a 2% monthly charge.',
  defaultNotes: 'Thank you for choosing Webamazee.',
  primaryColor: '#0F6DFF',
  bankDetails: {
    bankName: 'HDFC Bank',
    accountHolder: 'Webamazee Technologies',
    accountNumber: '50200012345678',
    ifscSwift: 'HDFC0001234',
    upi: 'webamazee@hdfcbank',
    paymentInfo: 'Please reference the invoice number with your payment.',
  },
};

const DEMO_CUSTOMERS = [
  {
    name: 'Aarav Sharma',
    company: 'Kabir Oil Mills',
    email: 'accounts@kabiroilmills.com',
    phone: '+91 98140 11223',
    address: 'Industrial Focal Point, Phase 2',
    city: 'Bathinda',
    state: 'Punjab',
    country: 'India',
    postalCode: '151001',
    taxNumber: '03KABIR4567L1Z2',
  },
  {
    name: 'Emily Carter',
    company: 'Wellington Airport City Tours',
    email: 'finance@wellingtontours.co.nz',
    phone: '+64 4 555 0192',
    address: '18 Cambridge Terrace',
    city: 'Wellington',
    state: 'Wellington',
    country: 'New Zealand',
    postalCode: '6011',
    taxNumber: 'NZ-GST-118-402-663',
  },
  {
    name: 'Daniel Okafor',
    company: 'Shine Gold Tours India',
    email: 'billing@shinegoldtours.in',
    phone: '+91 99887 77665',
    address: 'MG Road, Block C',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    taxNumber: '07SHINE8899M1Z9',
  },
];

const daysFromNow = (days) => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
};

function customerSnapshot(customer) {
  return {
    customerId: String(customer._id),
    name: customer.name,
    company: customer.company,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    country: customer.country,
    postalCode: customer.postalCode,
    taxNumber: customer.taxNumber,
  };
}

/** A deliberately long invoice to exercise multi-page PDF output. */
function longItemList() {
  const services = [
    'Discovery workshop and technical audit',
    'Information architecture and sitemap',
    'Wireframes - desktop and mobile',
    'UI design system and component library',
    'Homepage design',
    'Inner page templates (x8)',
    'Front-end development - Next.js',
    'CMS integration and content modelling',
    'Blog module with category taxonomy',
    'Case study module',
    'Contact and lead capture forms',
    'On-page SEO implementation',
    'Schema markup and structured data',
    'Core Web Vitals performance tuning',
    'Accessibility review (WCAG 2.2 AA)',
    'Analytics and conversion tracking setup',
    'Staging environment and QA cycle',
    'Content migration (120 pages)',
    'Production deployment and DNS cutover',
    'Post-launch support - 30 days',
    'Team training session',
    'Documentation handover',
  ];
  return services.map((description, i) => ({
    description,
    quantity: 1,
    rate: 180 + i * 35,
    discountType: 'fixed',
    discountValue: 0,
    taxRate: 18,
  }));
}

async function run() {
  const reset = process.argv.includes('--reset');

  if (env.isProduction && process.env.ALLOW_PRODUCTION_SEED !== 'true') {
    console.error('[seed] Refusing to seed demo data with NODE_ENV=production.');
    process.exit(1);
  }

  await connectDatabase();
  console.log('[seed] connected to MongoDB');

  if (reset) {
    await Promise.all([Invoice.deleteMany({}), Customer.deleteMany({}), CompanySettings.deleteMany({})]);
    console.log('[seed] cleared invoices, customers and settings');
  }

  // --- company settings -----------------------------------------------
  let settings = await CompanySettings.findOne({ singleton: 'company' });
  if (!settings) settings = await CompanySettings.create(WEBAMAZEE_SETTINGS);
  else {
    settings.set(WEBAMAZEE_SETTINGS);
    await settings.save();
  }
  console.log('[seed] company settings ready');

  // --- admin user ------------------------------------------------------
  const existingAdmin = await User.findOne({ email: DEMO_ADMIN.email });
  if (!existingAdmin) {
    await User.create({
      name: DEMO_ADMIN.name,
      email: DEMO_ADMIN.email,
      passwordHash: await User.hashPassword(DEMO_ADMIN.password),
    });
    console.log(`[seed] admin created -> ${DEMO_ADMIN.email} / ${DEMO_ADMIN.password}`);
  } else {
    console.log(`[seed] admin already exists -> ${DEMO_ADMIN.email}`);
  }

  // --- customers -------------------------------------------------------
  const customers = [];
  for (const data of DEMO_CUSTOMERS) {
    // eslint-disable-next-line no-await-in-loop
    let customer = await Customer.findOne({ name: data.name });
    // eslint-disable-next-line no-await-in-loop
    if (!customer) customer = await Customer.create(data);
    customers.push(customer);
  }
  console.log(`[seed] ${customers.length} demo customers ready`);

  // --- invoices --------------------------------------------------------
  const drafts = [
    {
      label: 'paid USD invoice',
      input: {
        invoiceDate: daysFromNow(-30),
        dueDate: daysFromNow(-15),
        status: 'paid',
        currency: 'USD',
        customer: customerSnapshot(customers[0]),
        items: [
          { description: 'Website Development', quantity: 1, rate: 800, taxRate: 0 },
          { description: 'Logo & brand refresh', quantity: 1, rate: 200, taxRate: 0 },
        ],
        discountType: 'fixed',
        discountValue: 100,
        taxRate: 18,
        additionalCharges: 0,
        amountPaid: 1062,
        notes: settings.defaultNotes,
        paymentTerms: settings.defaultPaymentTerms,
        additionalInfo: '',
      },
    },
    {
      label: 'overdue INR invoice',
      input: {
        invoiceDate: daysFromNow(-45),
        dueDate: daysFromNow(-10),
        status: 'overdue',
        currency: 'INR',
        customer: customerSnapshot(customers[2]),
        items: [
          { description: 'AI SEO retainer - March', quantity: 1, rate: 45000, taxRate: 18 },
          { description: 'Content production (8 articles)', quantity: 8, rate: 3500, taxRate: 18 },
        ],
        discountType: 'percentage',
        discountValue: 5,
        taxRate: 0,
        additionalCharges: 1500,
        amountPaid: 0,
        notes: settings.defaultNotes,
        paymentTerms: settings.defaultPaymentTerms,
        additionalInfo: '',
      },
    },
    {
      label: 'sent NZD invoice',
      input: {
        invoiceDate: daysFromNow(-3),
        dueDate: daysFromNow(12),
        status: 'sent',
        currency: 'NZD',
        customer: customerSnapshot(customers[1]),
        items: [
          { description: 'Tour booking platform - Sprint 4', quantity: 1, rate: 4200, taxRate: 15 },
          { description: 'Payment gateway integration', quantity: 1, rate: 950, taxRate: 15 },
          { description: 'Hosting & maintenance (quarterly)', quantity: 3, rate: 180, taxRate: 15 },
        ],
        discountType: 'fixed',
        discountValue: 0,
        taxRate: 0,
        additionalCharges: 0,
        amountPaid: 0,
        notes: settings.defaultNotes,
        paymentTerms: settings.defaultPaymentTerms,
        additionalInfo: 'Project code: WAT-2026-SPR4',
      },
    },
    {
      label: 'long multi-page GBP invoice',
      input: {
        invoiceDate: daysFromNow(-1),
        dueDate: daysFromNow(14),
        status: 'pending',
        currency: 'GBP',
        customer: customerSnapshot(customers[1]),
        items: longItemList(),
        discountType: 'percentage',
        discountValue: 10,
        taxRate: 0,
        additionalCharges: 250,
        amountPaid: 1000,
        notes: settings.defaultNotes,
        paymentTerms: settings.defaultPaymentTerms,
        additionalInfo: 'Phase 1 of the 2026 digital transformation programme.',
      },
    },
  ];

  let created = 0;
  for (const draft of drafts) {
    // eslint-disable-next-line no-await-in-loop
    const { payload, allocatedCounter } = await buildInvoicePayload(draft.input);
    // eslint-disable-next-line no-await-in-loop
    await Invoice.create(payload);
    // eslint-disable-next-line no-await-in-loop
    await commitCounter(allocatedCounter);
    created += 1;
    console.log(`[seed] created ${payload.invoiceNumber} (${draft.label})`);
  }

  console.log(`[seed] done - ${created} demo invoices created`);
  await disconnectDatabase();
}

run().catch(async (err) => {
  console.error('[seed] failed:', err);
  await disconnectDatabase().catch(() => {});
  process.exit(1);
});
