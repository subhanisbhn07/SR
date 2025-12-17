import dotenv from 'dotenv';

dotenv.config();

// Parse CORS origins from environment or use defaults
const parseCorsOrigins = (): string | string[] => {
  const envOrigins = process.env.CORS_ORIGIN;
  if (envOrigins) {
    // Support comma-separated origins
    const origins = envOrigins.split(',').map(o => o.trim());
    return origins.length === 1 ? origins[0] : origins;
  }
  // Default origins for development
  return [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
  ];
};

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'signroad-dev-secret-change-in-production',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  
  // Cookie Configuration - use 'none' for cross-origin requests in development tunnels
  cookieSecure: true, // Always true for SameSite=None
  cookieSameSite: 'none' as 'strict' | 'lax' | 'none',
  
  // CORS Configuration - supports multiple origins
  corsOrigin: parseCorsOrigins(),
  
  // Database (for future use)
  databaseUrl: process.env.DATABASE_URL || '',
  
  // Stripe (for future use)
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};
