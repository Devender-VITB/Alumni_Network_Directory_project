import express from 'express';
import {
  getAlumni,
  getAlumniById,
  updateAlumniProfile,
  deleteAlumni,
} from '../controllers/alumniController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAlumni);
router.get('/:id', getAlumniById);
router.patch('/:id', protect, updateAlumniProfile);
router.delete('/:id', protect, authorize('admin'), deleteAlumni);

export default router;
