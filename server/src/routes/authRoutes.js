import express from 'express';
import { register, login, getMe, logout } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, registerValidator, register);
router.post('/login', authLimiter, loginValidator, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
