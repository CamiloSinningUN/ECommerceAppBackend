import { Router } from 'express';
import { userController } from '@controllers';
import { verifyToken } from '@middlewares/auth';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.post('/login', userController.getUserToken);
router.patch('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

export default router;
