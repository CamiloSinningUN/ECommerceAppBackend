import { Router } from 'express';
const router = Router();

import productRouter from './product.routes';
import orderRouter from './order.routes';
import userRouter from './user.routes';

router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/users', userRouter);

export default router;
