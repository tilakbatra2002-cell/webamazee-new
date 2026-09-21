import { Router } from 'express';
import authRoutes from './auth.routes.js';
import invoiceRoutes from './invoice.routes.js';
import customerRoutes from './customer.routes.js';
import settingsRoutes from './settings.routes.js';
import { requireAuth } from '../middleware/auth.js';
import { dashboardStats } from '../controllers/invoiceController.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));
router.use('/auth', authRoutes);
router.use('/invoices', invoiceRoutes);
router.use('/customers', customerRoutes);
router.use('/settings', settingsRoutes);
router.get('/dashboard/stats', requireAuth, dashboardStats);

export default router;
