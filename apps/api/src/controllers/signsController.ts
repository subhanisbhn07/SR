import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { signs, userSignLogs, users, universeReceipts } from '../db/inMemoryDb.js';
import type { Sign, UserSignLog, UniverseReceipt } from '@signroad/shared';
import { SPARKS_REWARDS } from '@signroad/shared';

export async function getAllSigns(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const allSigns = Array.from(signs.values());
    
    // If user is authenticated, filter by unlock day
    if (req.user) {
      const unlockedSigns = allSigns.filter(sign => sign.unlockDay <= req.user!.currentDay);
      res.json({
        success: true,
        data: {
          signs: unlockedSigns,
          total: unlockedSigns.length,
        },
      });
      return;
    }

    // For unauthenticated users, return first 20 signs (preview)
    const previewSigns = allSigns.slice(0, 20);
    res.json({
      success: true,
      data: {
        signs: previewSigns,
        total: previewSigns.length,
        isPreview: true,
      },
    });
  } catch (error) {
    console.error('Get signs error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getSignById(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const sign = signs.get(id);

    if (!sign) {
      res.status(404).json({
        success: false,
        error: {
          code: 'SIGN_NOT_FOUND',
          message: 'Sign not found',
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        sign,
      },
    });
  } catch (error) {
    console.error('Get sign error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getActiveSigns(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const allSigns = Array.from(signs.values());
    const unlockedSigns = allSigns.filter(sign => sign.unlockDay <= req.user!.currentDay);

    // Select 3 random signs for today based on user ID + date
    const today = new Date().toISOString().split('T')[0];
    const seed = req.userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + 
                 today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Shuffle using seed
    const shuffled = [...unlockedSigns].sort((a, b) => {
      const hashA = (seed + a.id.charCodeAt(0)) % 100;
      const hashB = (seed + b.id.charCodeAt(0)) % 100;
      return hashA - hashB;
    });

    const activeSigns = shuffled.slice(0, 3);

    res.json({
      success: true,
      data: {
        signs: activeSigns,
        date: today,
      },
    });
  } catch (error) {
    console.error('Get active signs error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function logSign(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { signId, locationNote } = req.body;

    if (!signId) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Sign ID is required',
        },
      });
      return;
    }

    const sign = signs.get(signId);
    if (!sign) {
      res.status(404).json({
        success: false,
        error: {
          code: 'SIGN_NOT_FOUND',
          message: 'Sign not found',
        },
      });
      return;
    }

    // Create sign log
    const logId = uuidv4();
    const now = new Date().toISOString();
    const sparksEarned = SPARKS_REWARDS.SIGN_LOGGED;

    const signLog: UserSignLog = {
      id: logId,
      userId: req.userId,
      signId,
      sign,
      foundAt: now,
      locationNote: locationNote || undefined,
      receiptGenerated: true,
      sparksEarned,
      createdAt: now,
    };

    userSignLogs.set(logId, signLog);

    // Update user sparks and lantern
    const user = users.get(req.userId);
    if (user) {
      user.totalSparks += sparksEarned;
      user.lanternBrightness = Math.min(100, user.lanternBrightness + 2);
      user.lastMeditationDate = now;
      user.updatedAt = now;
      users.set(req.userId, user);
    }

    // Generate Universe Receipt
    const receiptId = uuidv4();
    const userLogs = Array.from(userSignLogs.values()).filter(log => log.userId === req.userId);
    const userSessions = 0; // Would need meditation sessions count

    const receipt: UniverseReceipt = {
      id: receiptId,
      userId: req.userId,
      signLogId: logId,
      type: 'sign',
      title: sign.name,
      subtitle: sign.meaning,
      daysActive: req.user.currentDay,
      signsLogged: userLogs.length,
      sessionsCompleted: userSessions,
      probabilityBeaten: calculateProbability(sign, req.user.streakCount),
      createdAt: now,
    };

    universeReceipts.set(receiptId, receipt);
    signLog.receiptUrl = `/api/receipts/${receiptId}`;

    res.status(201).json({
      success: true,
      data: {
        signLog,
        sparksEarned,
        receipt,
      },
    });
  } catch (error) {
    console.error('Log sign error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getUserSignLogs(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
      return;
    }

    const userLogs = Array.from(userSignLogs.values())
      .filter(log => log.userId === req.userId)
      .sort((a, b) => new Date(b.foundAt).getTime() - new Date(a.foundAt).getTime());

    res.json({
      success: true,
      data: {
        logs: userLogs,
        total: userLogs.length,
      },
    });
  } catch (error) {
    console.error('Get user sign logs error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

function calculateProbability(sign: Sign, streakDays: number): number {
  // Base probability from rarity
  let baseProbability = sign.rarityProbability;

  // Streak bonus (up to 1.3x at 42 days)
  const streakBonus = Math.min(0.3, Math.floor(streakDays / 7) * 0.05);
  
  // Calculate final probability
  const finalProbability = baseProbability * (1 + streakBonus);
  
  // Return as percentage beaten (inverse)
  return Math.round((1 - finalProbability) * 100);
}
