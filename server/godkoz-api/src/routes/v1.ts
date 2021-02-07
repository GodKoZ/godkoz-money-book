import { Router } from 'express';
import Auth from './auth.route';
import Categories from './categories.route';
import Expense from './expense.route';
const router = Router();

router.use('/categories', Categories);
router.use('/expense', Expense);
router.use('/auth', Auth);

export default router;
