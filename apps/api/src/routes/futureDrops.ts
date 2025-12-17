import { Router } from 'express';
import {
  createFutureDrop,
  getPendingDrops,
  getReadyDrops,
  markDropDelivered,
  deleteFutureDrop,
  getDeliveredDrops,
} from '../controllers/futureDropController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// All future drop routes are protected
router.post('/', authenticateToken, createFutureDrop);
router.get('/pending', authenticateToken, getPendingDrops);
router.get('/ready', authenticateToken, getReadyDrops);
router.get('/delivered', authenticateToken, getDeliveredDrops);
router.patch('/:id/deliver', authenticateToken, markDropDelivered);
router.delete('/:id', authenticateToken, deleteFutureDrop);

export default router;
