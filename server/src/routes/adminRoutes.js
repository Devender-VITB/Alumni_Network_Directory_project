import express from 'express';
import { getStats } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Allow reading stats publicly or for admin
router.get('/stats', getStats);

export default router;
