import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { users, getLanternState } from '../db/inMemoryDb.js';
import type { LanternStatus } from '@signroad/shared';
import { SPARKS_REWARDS } from '@signroad/shared';

export async function getLanternStatus(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user || !req.userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
      return;
    }

    const user = users.get(req.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    const status: LanternStatus = {
      brightness: user.lanternBrightness,
      state: getLanternState(user.lanternBrightness),
      lastActivityDate: user.lastMeditationDate,
      consecutiveDaysActive: user.streakCount,
      totalDaysActive: user.currentDay,
      rekindleCount: 0, // Would need to track this
      lastRekindleDate: undefined,
    };

    res.json({
      success: true,
      data: {
        lantern: status,
      },
    });
  } catch (error) {
    console.error('Get lantern status error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function rekindleLantern(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user || !req.userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
      return;
    }

    const user = users.get(req.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    // Rekindle lantern to 25% (as per PRD)
    const previousBrightness = user.lanternBrightness;
    user.lanternBrightness = 25;
    user.updatedAt = new Date().toISOString();

    // Award sparks for returning
    const sparksEarned = SPARKS_REWARDS.REKINDLING_RETURN;
    user.totalSparks += sparksEarned;

    users.set(req.userId, user);

    const status: LanternStatus = {
      brightness: user.lanternBrightness,
      state: getLanternState(user.lanternBrightness),
      lastActivityDate: user.lastMeditationDate,
      consecutiveDaysActive: user.streakCount,
      totalDaysActive: user.currentDay,
      rekindleCount: 1,
      lastRekindleDate: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: {
        lanternStatus: status,
        sparksEarned,
        previousBrightness,
        message: 'Your lantern has been rekindled! Welcome back.',
      },
    });
  } catch (error) {
    console.error('Rekindle lantern error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function updateLanternBrightness(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user || !req.userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
      return;
    }

    const { amount, action } = req.body;

    if (typeof amount !== 'number' || !['add', 'subtract'].includes(action)) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Amount (number) and action (add/subtract) are required',
        },
      });
      return;
    }

    const user = users.get(req.userId);
    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    if (action === 'add') {
      user.lanternBrightness = Math.min(100, user.lanternBrightness + amount);
    } else {
      // Never let lantern go below 0 (ember state)
      user.lanternBrightness = Math.max(0, user.lanternBrightness - amount);
    }

    user.updatedAt = new Date().toISOString();
    users.set(req.userId, user);

    const status: LanternStatus = {
      brightness: user.lanternBrightness,
      state: getLanternState(user.lanternBrightness),
      lastActivityDate: user.lastMeditationDate,
      consecutiveDaysActive: user.streakCount,
      totalDaysActive: user.currentDay,
      rekindleCount: 0,
      lastRekindleDate: undefined,
    };

    res.json({
      success: true,
      data: {
        lanternStatus: status,
      },
    });
  } catch (error) {
    console.error('Update lantern brightness error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}
