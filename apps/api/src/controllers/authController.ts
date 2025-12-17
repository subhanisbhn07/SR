import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/env.js';
import { users, refreshTokens, hashPassword, verifyPassword } from '../db/inMemoryDb.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import type { User, LoginRequest, SignUpRequest, SubscriptionTier, SubscriptionStatus } from '@signroad/shared';

function generateAccessToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: config.jwtAccessExpiresIn,
  });
}

function generateRefreshToken(userId: string): string {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
  refreshTokens.set(token, { userId, expiresAt });
  return token;
}

function setAuthCookies(res: Response, accessToken: string, refreshToken: string): void {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

function clearAuthCookies(res: Response): void {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
}

export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, fullName, timezone } = req.body as SignUpRequest;

    // Validate input
    if (!email || !password || !fullName) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email, password, and full name are required',
        },
      });
      return;
    }

    // Check if user already exists
    const existingUser = Array.from(users.values()).find((u) => u.email === email);
    if (existingUser) {
      res.status(409).json({
        success: false,
        error: {
          code: 'USER_EXISTS',
          message: 'A user with this email already exists',
        },
      });
      return;
    }

    // Create new user
    const userId = uuidv4();
    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    
    // Calculate trial end date (14 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14);

    const newUser: User & { passwordHash: string } = {
      id: userId,
      email,
      fullName,
      username: email.split('@')[0],
      timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      currentDay: 1,
      currentRoadStep: 1,
      streakCount: 0,
      lanternBrightness: 100,
      totalSparks: 0,
      subscriptionTier: 'free' as SubscriptionTier,
      subscriptionStatus: 'trialing' as SubscriptionStatus,
      onboardingCompleted: false,
      trialEndsAt: trialEndsAt.toISOString(),
      createdAt: now,
      updatedAt: now,
      passwordHash,
    };

    users.set(userId, newUser);

    // Generate tokens
    const accessToken = generateAccessToken(userId, email);
    const refreshToken = generateRefreshToken(userId);

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    // Return user without password hash
    const { passwordHash: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken,
        expiresIn: 900, // 15 minutes in seconds
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during signup',
      },
    });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as LoginRequest;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Email and password are required',
        },
      });
      return;
    }

    // Find user
    const user = Array.from(users.values()).find((u) => u.email === email);
    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
      return;
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      });
      return;
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, email);
    const refreshToken = generateRefreshToken(user.id);

    // Set cookies
    setAuthCookies(res, accessToken, refreshToken);

    // Return user without password hash
    const { passwordHash: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken,
        expiresIn: 900,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during login',
      },
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  try {
    // Get refresh token from cookie
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      refreshTokens.delete(refreshToken);
    }

    // Clear cookies
    clearAuthCookies(res);

    res.json({
      success: true,
      data: {
        message: 'Logged out successfully',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred during logout',
      },
    });
  }
}

export async function refreshAccessToken(req: Request, res: Response): Promise<void> {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        error: {
          code: 'NO_REFRESH_TOKEN',
          message: 'Refresh token required',
        },
      });
      return;
    }

    const tokenData = refreshTokens.get(refreshToken);
    if (!tokenData) {
      clearAuthCookies(res);
      res.status(401).json({
        success: false,
        error: {
          code: 'INVALID_REFRESH_TOKEN',
          message: 'Invalid refresh token',
        },
      });
      return;
    }

    // Check if token is expired
    if (new Date() > tokenData.expiresAt) {
      refreshTokens.delete(refreshToken);
      clearAuthCookies(res);
      res.status(401).json({
        success: false,
        error: {
          code: 'REFRESH_TOKEN_EXPIRED',
          message: 'Refresh token has expired',
        },
      });
      return;
    }

    // Get user
    const user = users.get(tokenData.userId);
    if (!user) {
      refreshTokens.delete(refreshToken);
      clearAuthCookies(res);
      res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found',
        },
      });
      return;
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user.id, user.email);

    // Update access token cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: config.cookieSameSite,
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        expiresIn: 900,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred while refreshing token',
      },
    });
  }
}

export async function getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        },
      });
      return;
    }

    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { fullName, manifestationGoal, timezone, preferredMessageTime, selectedRoad } = req.body;

    // Update user fields
    if (fullName) user.fullName = fullName;
    if (manifestationGoal) user.manifestationGoal = manifestationGoal;
    if (timezone) user.timezone = timezone;
    if (preferredMessageTime) user.preferredMessageTime = preferredMessageTime;
    if (selectedRoad) user.selectedRoad = selectedRoad;
    user.updatedAt = new Date().toISOString();

    users.set(req.userId, user);

    const { passwordHash: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}

export async function completeOnboarding(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const { fullName, manifestationGoal, selectedRoad, intention, timezone } = req.body;

    // Update user with onboarding data
    if (fullName) user.fullName = fullName;
    if (manifestationGoal) user.manifestationGoal = manifestationGoal;
    if (selectedRoad) user.selectedRoad = selectedRoad;
    if (timezone) user.timezone = timezone;
    user.onboardingCompleted = true;
    user.updatedAt = new Date().toISOString();

    users.set(req.userId, user);

    const { passwordHash: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        message: 'Onboarding completed successfully',
      },
    });
  } catch (error) {
    console.error('Complete onboarding error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An error occurred',
      },
    });
  }
}
