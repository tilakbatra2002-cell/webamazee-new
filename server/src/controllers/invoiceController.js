import mongoose from 'mongoose';
import { Invoice } from '../models/Invoice.js';
import { ApiError, asyncHandler } from '../utils/ApiError.js';
import { buildInvoicePayload, commitCounter, isOverdue } from '../services/invoiceService.js';
import { generateInvoiceNumber } from '../services/invoiceNumber.js';
import { renderInvoicePdf, renderInvoiceImage } from '../services/renderInvoice.js';
import { containsInsensitive, dateRangeClause } from '../utils/query.js';

async function findInvoiceOr404(id) {
  if (!mongoose.isValidObjectId(id)) throw ApiError.notFound('Invoice not found');
  const invoice = await Invoice.findById(id);
  if (!invoice) throw ApiError.notFound('Invoice not found');
  return invoice;
}

/** GET /api/invoices */
export const listInvoices = asyncHandler(async (req, res) => {
  const q = req.validatedQuery;
  const filter = {};

  if (q.search) {
    const rx = containsInsensitive(q.search);
    filter.$or = [
      { invoiceNumber: rx },
      { 'customer.name': rx },
      { 'customer.company': rx },
      { 'customer.email': rx },
    ];
  }
  if (q.status && q.status !== 'all') filter.status = q.status;
  if (q.currency && q.currency !== 'all') filter.currency = q.currency;
  if (q.customerId) filter['customer.customerId'] = new mongoose.Types.ObjectId(q.customerId);

  const dateClause = dateRangeClause('invoiceDateMs', q.from, q.to);
  if (dateClause) Object.assign(filter, dateClause);

  const sortMap = {
    newest: { invoiceDateMs: -1, createdAt: -1 },
    oldest: { invoiceDateMs: 1, createdAt: 1 },
    highest: { total: -1 },
    lowest: { total: 1 },
  };

  const skip = (q.page - 1) * q.limit;
  const [items, total] = await Promise.all([
    Invoice.find(filter).sort(sortMap[q.sort]).skip(skip).limit(q.limit),
    Invoice.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: {
      invoices: items,
      pagination: { page: q.page, limit: q.limit, total, pages: Math.max(Math.ceil(total / q.limit), 1) },
    },
  });
});

/** GET /api/invoices/next-number */
export const nextInvoiceNumber = asyncHandler(async (_req, res) => {
  const { invoiceNumber } = await generateInvoiceNumber();
  res.json({ success: true, data: { invoiceNumber } });
});

/** GET /api/invoices/:id */
export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await findInvoiceOr404(req.params.id);
  res.json({ success: true, data: { invoice } });
});

/** POST /api/invoices */
export const createInvoice = asyncHandler(async (req, res) => {
  const { payload, allocatedCounter } = await buildInvoicePayload(req.body);
  const invoice = await Invoice.create(payload);
  await commitCounter(allocatedCounter);
  res.status(201).json({ success: true, data: { invoice } });
});

/** PUT /api/invoices/:id */
export const updateInvoice = asyncHandler(async (req, res) => {
  const existing = await findInvoiceOr404(req.params.id);
  const { payload, allocatedCounter } = await buildInvoicePayload(req.body, { existing });

  existing.set(payload);
  await existing.save();
  await commitCounter(allocatedCounter);

  res.json({ success: true, data: { invoice: existing } });
});

/** PATCH /api/invoices/:id/status */
export const updateInvoiceStatus = asyncHandler(async (req, res) => {
  const invoice = await findInvoiceOr404(req.params.id);
  invoice.status = req.body.status;
  await invoice.save();
  res.json({ success: true, data: { invoice } });
});

/** POST /api/invoices/:id/duplicate */
export const duplicateInvoice = asyncHandler(async (req, res) => {
  const source = await findInvoiceOr404(req.params.id);
  const { invoiceNumber, counter } = await generateInvoiceNumber();

  const copy = source.toObject();
  delete copy._id;
  delete copy.createdAt;
  delete copy.updatedAt;

  const invoice = await Invoice.create({
    ...copy,
    invoiceNumber,
    status: 'draft',
    amountPaid: 0,
    amountDue: source.total,
    invoiceDate: new Date(),
    dueDate: source.dueDate
      ? new Date(Date.now() + (new Date(source.dueDate) - new Date(source.invoiceDate)))
      : null,
  });
  await commitCounter(counter);

  res.status(201).json({ success: true, data: { invoice } });
});

/** DELETE /api/invoices/:id */
export const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await findInvoiceOr404(req.params.id);
  await invoice.deleteOne();
  res.json({ success: true, data: { id: req.params.id } });
});

const asFilename = (invoice, ext) =>
  `${String(invoice.invoiceNumber).replace(/[^A-Za-z0-9._-]/g, '_')}.${ext}`;

/** GET /api/invoices/:id/pdf */
export const downloadInvoicePdf = asyncHandler(async (req, res) => {
  const invoice = await findInvoiceOr404(req.params.id);
  const pdf = await renderInvoicePdf(invoice.toObject());

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', pdf.length);
  res.setHeader(
    'Content-Disposition',
    `${req.query.inline === '1' ? 'inline' : 'attachment'}; filename="${asFilename(invoice, 'pdf')}"`
  );
  res.send(pdf);
});

/** GET /api/invoices/:id/image */
export const downloadInvoiceImage = asyncHandler(async (req, res) => {
  const invoice = await findInvoiceOr404(req.params.id);
  const format = req.query.format === 'jpg' || req.query.format === 'jpeg' ? 'jpg' : 'png';
  const { buffer, contentType } = await renderInvoiceImage(invoice.toObject(), { format });

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', buffer.length);
  res.setHeader('Content-Disposition', `attachment; filename="${asFilename(invoice, format)}"`);
  res.send(buffer);
});

/** GET /api/dashboard/stats */
export const dashboardStats = asyncHandler(async (_req, res) => {
  const [invoices, recent] = await Promise.all([
    Invoice.find({}, 'status total amountDue amountPaid currency dueDate invoiceDate').lean(),
    Invoice.find().sort({ createdAt: -1 }).limit(8).lean(),
  ]);

  const now = new Date();
  const byStatus = {};
  let totalRevenue = 0;
  let outstanding = 0;
  let overdueCount = 0;
  let overdueAmount = 0;

  for (const inv of invoices) {
    const effectiveStatus = isOverdue(inv, now) && inv.status !== 'overdue' ? 'overdue' : inv.status;
    byStatus[effectiveStatus] = (byStatus[effectiveStatus] || 0) + 1;

    totalRevenue += Number(inv.amountPaid) || 0;
    if (!['cancelled', 'draft', 'paid'].includes(inv.status)) {
      outstanding += Number(inv.amountDue) || 0;
    }
    if (effectiveStatus === 'overdue') {
      overdueCount += 1;
      overdueAmount += Number(inv.amountDue) || 0;
    }
  }

  // Revenue is reported in the currency each invoice was raised in.
  const revenueByCurrency = {};
  for (const inv of invoices) {
    const c = inv.currency || 'USD';
    revenueByCurrency[c] = (revenueByCurrency[c] || 0) + (Number(inv.amountPaid) || 0);
  }

  res.json({
    success: true,
    data: {
      totals: {
        invoices: invoices.length,
        paid: byStatus.paid || 0,
        pending: (byStatus.pending || 0) + (byStatus.sent || 0) + (byStatus['partially-paid'] || 0),
        overdue: overdueCount,
        draft: byStatus.draft || 0,
        cancelled: byStatus.cancelled || 0,
        revenue: Math.round(totalRevenue * 100) / 100,
        outstanding: Math.round(outstanding * 100) / 100,
        overdueAmount: Math.round(overdueAmount * 100) / 100,
      },
      revenueByCurrency,
      byStatus,
      recentInvoices: recent,
    },
  });
});
