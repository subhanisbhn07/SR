import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { dailyMessages, users, generateDailyMessage, dailyMessageTemplates } from '../db/inMemoryDb.js';
import type { DailyMessage, MessageCategory } from '@signroad/shared';

export async function getDailyMessage(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const today = new Date().toISOString().split('T')[0];
    
    // Check if user already has a message for today
    const existingMessage = Array.from(dailyMessages.values())
      .find(msg => msg.userId === req.userId && msg.messageDate === today);

    if (existingMessage) {
      res.json({
        success: true,
        data: {
          message: existingMessage,
          isNew: false,
        },
      });
      return;
    }

    // Generate new daily message
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

    const renderedText = generateDailyMessage(user);
    
    // Determine category based on day rotation
    const categories: MessageCategory[] = ['transformation', 'validation', 'timing', 'relationships', 'purpose', 'abundance'];
    const categoryIndex = user.currentDay % categories.length;
    const category = categories[categoryIndex];

    const messageId = uuidv4();
    const now = new Date().toISOString();

    const newMessage: DailyMessage = {
      id: messageId,
      userId: req.userId,
      messageDate: today,
      templateId: `template_${category}_${user.currentDay % 10}`,
      templateCategory: category,
      renderedText,
      personalizationScore: 0.75, // Placeholder score
      opened: false,
      createdAt: now,
    };

    dailyMessages.set(messageId, newMessage);

    res.json({
      success: true,
      data: {
        message: newMessage,
        isNew: true,
      },
    });
  } catch (error) {
    console.error('Get daily message error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function markMessageOpened(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    const message = dailyMessages.get(id);

    if (!message) {
      res.status(404).json({
        success: false,
        error: {
          code: 'MESSAGE_NOT_FOUND',
          message: 'Daily message not found',
        },
      });
      return;
    }

    if (message.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this message',
        },
      });
      return;
    }

    if (!message.opened) {
      message.opened = true;
      message.openedAt = new Date().toISOString();
      dailyMessages.set(id, message);
    }

    res.json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    console.error('Mark message opened error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function updateTimeSpent(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    const { timeSpentSeconds } = req.body;

    if (typeof timeSpentSeconds !== 'number' || timeSpentSeconds < 0) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Valid time spent in seconds is required',
        },
      });
      return;
    }

    const message = dailyMessages.get(id);

    if (!message) {
      res.status(404).json({
        success: false,
        error: {
          code: 'MESSAGE_NOT_FOUND',
          message: 'Daily message not found',
        },
      });
      return;
    }

    if (message.userId !== req.userId) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have access to this message',
        },
      });
      return;
    }

    message.timeSpentSeconds = timeSpentSeconds;
    dailyMessages.set(id, message);

    res.json({
      success: true,
      data: {
        message,
      },
    });
  } catch (error) {
    console.error('Update time spent error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function getMessageHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const userMessages = Array.from(dailyMessages.values())
      .filter(msg => msg.userId === req.userId)
      .sort((a, b) => new Date(b.messageDate).getTime() - new Date(a.messageDate).getTime());

    res.json({
      success: true,
      data: {
        messages: userMessages,
        total: userMessages.length,
      },
    });
  } catch (error) {
    console.error('Get message history error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}
