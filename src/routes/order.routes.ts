import { Router } from 'express';
import { orderController } from '@controllers';
const router = Router();

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.get('/', orderController.getOrders);
router.patch('/:id', orderController.updateOrder);

export default router;
