import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { verifyToken } from '../middleware/verify-token';
import { verifyValidate } from '../middleware/verify-validate';
import UserCreate from '../validation/user';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', verifyValidate(UserCreate), authController.register);
router.post('/logout', verifyToken, authController.logout);
router.post('/verify', authController.verify);

export default router;
