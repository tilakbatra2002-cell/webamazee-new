import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { loginSchema, registerSchema } from '../utils/schemas.js';
import { login, register, me, authStatus } from '../controllers/authController.js';

const router = Router();

// Brute-force protection on credential endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: { message: 'Too many attempts, please try again later' } },
});

router.get('/status', authStatus);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/register', authLimiter, validate(registerSchema), register);
router.get('/me', requireAuth, me);

export default router;
