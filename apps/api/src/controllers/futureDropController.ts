import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { futureDrops } from '../db/inMemoryDb.js';
import type { FutureDrop, FutureDropTrigger } from '@signroad/shared';

export async function createFutureDrop(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { messageText, triggerContext, relatedSignId, deliverAfterDays } = req.body;

    if (!messageText || messageText.length > 140) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Message text is required and must be 140 characters or less',
        },
      });
      return;
    }

    if (!triggerContext) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Trigger context is required',
        },
      });
      return;
    }

    const now = new Date();
    const deliverAfter = new Date(now);
    
    // Calculate delivery date based on trigger context or custom days
    if (deliverAfterDays) {
      deliverAfter.setDate(deliverAfter.getDate() + deliverAfterDays);
    } else {
      // Default delivery times based on trigger context
      switch (triggerContext as FutureDropTrigger) {
        case 'day_7':
          deliverAfter.setDate(deliverAfter.getDate() + 23); // Deliver on day 30
          break;
        case 'day_14':
          deliverAfter.setDate(deliverAfter.getDate() + 16); // Deliver on day 30
          break;
        case 'day_30':
          deliverAfter.setDate(deliverAfter.getDate() + 30); // Deliver on day 60
          break;
        case 'rare_sign':
          deliverAfter.setDate(deliverAfter.getDate() + 21); // Deliver in 21 days
          break;
        case 'rekindle':
          deliverAfter.setDate(deliverAfter.getDate() + 14); // Deliver in 14 days
          break;
        case 'milestone':
          deliverAfter.setDate(deliverAfter.getDate() + 30); // Deliver in 30 days
          break;
        default:
          deliverAfter.setDate(deliverAfter.getDate() + 21); // Default 21 days
      }
    }

    const dropId = uuidv4();
    const futureDrop: FutureDrop = {
      id: dropId,
      userId: req.userId,
      messageText,
      triggerContext: triggerContext as FutureDropTrigger,
      relatedSignId: relatedSignId || undefined,
      writtenAt: now.toISOString(),
      deliverAfter: deliverAfter.toISOString(),
      delivered: false,
      deliveredAt: undefined,
    };

    futureDrops.set(dropId, futureDrop);

    res.status(201).json({
      success: true,
      data: {
        futureDrop,
        message: `Your message to future you will be delivered on ${deliverAfter.toLocaleDateString()}`,
      },
    });
  } catch (error) {
    console.error('Create future drop error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getPendingDrops(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const now = new Date();
    const userDrops = Array.from(futureDrops.values())
      .filter(drop => drop.userId === req.userId && !drop.delivered)
      .sort((a, b) => new Date(a.deliverAfter).getTime() - new Date(b.deliverAfter).getTime());

    res.json({
      success: true,
      data: {
        drops: userDrops,
        total: userDrops.length,
      },
    });
  } catch (error) {
    console.error('Get pending drops error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getReadyDrops(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const now = new Date();
    const readyDrops = Array.from(futureDrops.values())
      .filter(drop => 
        drop.userId === req.userId && 
        !drop.delivered && 
        new Date(drop.deliverAfter) <= now
      )
      .sort((a, b) => new Date(a.writtenAt).getTime() - new Date(b.writtenAt).getTime());

    res.json({
      success: true,
      data: {
        drops: readyDrops,
        total: readyDrops.length,
        hasNewDrops: readyDrops.length > 0,
      },
    });
  } catch (error) {
    console.error('Get ready drops error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function markDropDelivered(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { id } = req.params;
    const drop = futureDrops.get(id);

    if (!drop) {
      res.status(404).json({
        success: false,
        error: {
          code: 'DROP_NOT_FOUND',
          message: 'Future drop not found',
        },
      });
      return;
    }

    if (drop.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this drop',
        },
      });
      return;
    }

    drop.delivered = true;
    drop.deliveredAt = new Date().toISOString();
    futureDrops.set(id, drop);

    res.json({
      success: true,
      data: {
        futureDrop: drop,
        message: 'Drop marked as delivered',
      },
    });
  } catch (error) {
    console.error('Mark drop delivered error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function deleteFutureDrop(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { id } = req.params;
    const drop = futureDrops.get(id);

    if (!drop) {
      res.status(404).json({
        success: false,
        error: {
          code: 'DROP_NOT_FOUND',
          message: 'Future drop not found',
        },
      });
      return;
    }

    if (drop.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this drop',
        },
      });
      return;
    }

    futureDrops.delete(id);

    res.json({
      success: true,
      data: {
        message: 'Future drop deleted successfully',
      },
    });
  } catch (error) {
    console.error('Delete future drop error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getDeliveredDrops(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const deliveredDrops = Array.from(futureDrops.values())
      .filter(drop => drop.userId === req.userId && drop.delivered)
      .sort((a, b) => new Date(b.deliveredAt || b.writtenAt).getTime() - new Date(a.deliveredAt || a.writtenAt).getTime());

    res.json({
      success: true,
      data: {
        drops: deliveredDrops,
        total: deliveredDrops.length,
      },
    });
  } catch (error) {
    console.error('Get delivered drops error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}
