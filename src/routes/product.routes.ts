import { Router } from "express";
import { productController } from "@controllers";
const router = Router();

router.post('/', productController.createProduct);
router.get('/:id', productController.getProduct);
router.get('/', productController.getProducts);
router.get('/categories/:userId', productController.getProductCategories);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
