import { Router } from 'express';
import { productController } from '@controllers';
import { verifyToken } from '@middlewares/auth';
const router = Router();

router.post('/', verifyToken, productController.createProduct);
router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.get('/categories/:userId', productController.getProductCategories);
router.patch('/:id', verifyToken, productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

export default router;
