import { Router } from 'express';
import {
  getDailyMessage,
  markMessageOpened,
  updateTimeSpent,
  getMessageHistory,
} from '../controllers/dailyMessageController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// All daily message routes are protected
router.get('/today', authenticateToken, getDailyMessage);
router.get('/history', authenticateToken, getMessageHistory);
router.patch('/:id/opened', authenticateToken, markMessageOpened);
router.patch('/:id/time-spent', authenticateToken, updateTimeSpent);

export default router;
