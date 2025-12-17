import { Router } from 'express';
import authRoutes from './auth.js';
import signsRoutes from './signs.js';
import lanternRoutes from './lantern.js';
import futureDropsRoutes from './futureDrops.js';
import dailyMessageRoutes from './dailyMessage.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/signs', signsRoutes);
router.use('/lantern', lanternRoutes);
router.use('/future-drops', futureDropsRoutes);
router.use('/daily-message', dailyMessageRoutes);

export default router;
