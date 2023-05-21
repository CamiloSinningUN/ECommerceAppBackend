import { Router } from 'express';
import { orderController } from '@controllers';
import { verifyToken } from '@middlewares/auth';
const router = Router();

router.post('/', verifyToken, orderController.createOrder);
router.get('/:id', verifyToken, orderController.getOrder);
router.get('/', verifyToken, orderController.getOrders);
router.patch('/:id', verifyToken, orderController.updateOrder);

export default router;
