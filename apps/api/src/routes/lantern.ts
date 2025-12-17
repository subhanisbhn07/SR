import { Router } from 'express';
import {
  getLanternStatus,
  rekindleLantern,
  updateLanternBrightness,
} from '../controllers/lanternController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// All lantern routes are protected
router.get('/status', authenticateToken, getLanternStatus);
router.post('/rekindle', authenticateToken, rekindleLantern);
router.patch('/brightness', authenticateToken, updateLanternBrightness);

export default router;
