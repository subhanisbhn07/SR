import { Router } from 'express';
import {
  getAllSigns,
  getSignById,
  getActiveSigns,
  logSign,
  getUserSignLogs,
} from '../controllers/signsController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = Router();

// Public routes (with optional auth for personalization)
router.get('/', optionalAuth, getAllSigns);
router.get('/:id', getSignById);

// Protected routes
router.get('/user/active', authenticateToken, getActiveSigns);
router.post('/log', authenticateToken, logSign);
router.get('/user/logs', authenticateToken, getUserSignLogs);

export default router;
