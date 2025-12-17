import { Router } from 'express';
import {
  signup,
  login,
  logout,
  refreshAccessToken,
  getMe,
  updateProfile,
  completeOnboarding,
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/me', authenticateToken, getMe);
router.patch('/profile', authenticateToken, updateProfile);
router.post('/onboarding/complete', authenticateToken, completeOnboarding);

export default router;
