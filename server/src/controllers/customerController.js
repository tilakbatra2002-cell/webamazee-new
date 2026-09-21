import mongoose from 'mongoose';
import { Customer } from '../models/Customer.js';
import { Invoice } from '../models/Invoice.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';
import { containsInsensitive } from '../utils/query.js';

/** Attaches invoice count + total billed to a set of customers. */
async function withInvoiceStats(customers) {
  const ids = customers.map((c) => c._id);
  if (!ids.length) return [];

  const rows = await Invoice.find(
    { 'customer.customerId': mongoose.trusted({ $in: ids }) },
    'customer total amountPaid'
  ).lean();

  const map = new Map();
  for (const row of rows) {
    const key = String(row.customer?.customerId || '');
    if (!key) continue;
    const entry = map.get(key) || { invoiceCount: 0, totalBilled: 0, totalPaid: 0 };
    entry.invoiceCount += 1;
    entry.totalBilled += Number(row.total) || 0;
    entry.totalPaid += Number(row.amountPaid) || 0;
    map.set(key, entry);
  }
  return customers.map((c) => {
    const s = map.get(String(c._id));
    return {
      ...(c.toJSON ? c.toJSON() : c),
      invoiceCount: s?.invoiceCount || 0,
      totalBilled: Math.round((s?.totalBilled || 0) * 100) / 100,
      totalPaid: Math.round((s?.totalPaid || 0) * 100) / 100,
    };
  });
}

/** GET /api/customers */
export const listCustomers = asyncHandler(async (req, res) => {
  const search = String(req.query.search || '').trim();
  const rx = search ? containsInsensitive(search) : null;
  const filter = rx ? { $or: [{ name: rx }, { company: rx }, { email: rx }] } : {};

  const customers = await Customer.find(filter).sort({ name: 1 }).limit(500);
  res.json({ success: true, data: { customers: await withInvoiceStats(customers) } });
});

/** GET /api/customers/:id */
export const getCustomer = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw ApiError.notFound('Customer not found');
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw ApiError.notFound('Customer not found');

  const invoices = await Invoice.find({ 'customer.customerId': customer._id }).sort({ invoiceDate: -1 });
  const [withStats] = await withInvoiceStats([customer]);

  res.json({ success: true, data: { customer: withStats, invoices } });
});

/** POST /api/customers */
export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({ success: true, data: { customer: customer.toJSON() } });
});

/** PUT /api/customers/:id */
export const updateCustomer = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw ApiError.notFound('Customer not found');
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw ApiError.notFound('Customer not found');

  customer.set(req.body);
  await customer.save();
  res.json({ success: true, data: { customer: customer.toJSON() } });
});

/** DELETE /api/customers/:id */
export const deleteCustomer = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw ApiError.notFound('Customer not found');
  const customer = await Customer.findById(req.params.id);
  if (!customer) throw ApiError.notFound('Customer not found');

  const invoiceCount = await Invoice.countDocuments({ 'customer.customerId': customer._id });
  if (invoiceCount > 0 && req.query.force !== 'true') {
    throw ApiError.conflict(
      `This customer has ${invoiceCount} invoice${invoiceCount === 1 ? '' : 's'}. Existing invoices keep their own copy of the customer details.`
    );
  }

  await customer.deleteOne();
  // Detach the link but keep the snapshot on historic invoices.
  await Invoice.updateMany(
    { 'customer.customerId': customer._id },
    { $set: { 'customer.customerId': null } }
  );

  res.json({ success: true, data: { id: req.params.id } });
});
