import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { invoiceSchema, invoiceStatusSchema, invoiceListQuerySchema } from '../utils/schemas.js';
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  updateInvoiceStatus,
  duplicateInvoice,
  deleteInvoice,
  downloadInvoicePdf,
  downloadInvoiceImage,
  nextInvoiceNumber,
} from '../controllers/invoiceController.js';

const router = Router();
router.use(requireAuth);

router.get('/', validate(invoiceListQuerySchema, 'query'), listInvoices);
router.get('/next-number', nextInvoiceNumber);
router.post('/', validate(invoiceSchema), createInvoice);

router.get('/:id', getInvoice);
router.put('/:id', validate(invoiceSchema), updateInvoice);
router.patch('/:id/status', validate(invoiceStatusSchema), updateInvoiceStatus);
router.post('/:id/duplicate', duplicateInvoice);
router.delete('/:id', deleteInvoice);

router.get('/:id/pdf', downloadInvoicePdf);
router.get('/:id/image', downloadInvoiceImage);

export default router;
