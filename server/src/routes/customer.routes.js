import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { customerSchema, customerUpdateSchema } from '../utils/schemas.js';
import {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customerController.js';

const router = Router();
router.use(requireAuth);

router.get('/', listCustomers);
router.post('/', validate(customerSchema), createCustomer);
router.get('/:id', getCustomer);
router.put('/:id', validate(customerUpdateSchema), updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
