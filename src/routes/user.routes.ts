import { Router } from 'express';
import { userController } from '@controllers';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.post('/login', userController.getUserToken);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
