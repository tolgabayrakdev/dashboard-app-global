import express from 'express';
import { AuthController } from '../controller/auth-controller';
import { verifyToken } from '../middleware/verify-token';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', verifyToken, authController.logout);

export default router;
