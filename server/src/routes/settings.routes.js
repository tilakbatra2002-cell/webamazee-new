import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { settingsSchema } from '../utils/schemas.js';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = Router();
router.use(requireAuth);

router.get('/', getSettings);
router.put('/', validate(settingsSchema), updateSettings);

export default router;
