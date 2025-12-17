import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// CORS configuration - handle multiple origins and tunnel URLs
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) {
      return callback(null, true);
    }
    
    // Allow all devinapps.com tunnel URLs
    if (origin.includes('devinapps.com')) {
      return callback(null, true);
    }
    
    // Check against configured origins
    const allowedOrigins = Array.isArray(config.corsOrigin) 
      ? config.corsOrigin 
      : [config.corsOrigin];
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // For development, allow localhost on any port
    if (origin.startsWith('http://localhost:')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// API routes
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'SignRoad API',
      version: '1.0.0',
      description: 'Backend API for SignRoad meditation and manifestation platform',
      documentation: '/api/health',
    },
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  const corsDisplay = Array.isArray(config.corsOrigin) 
    ? `${config.corsOrigin.length} origins (+ devinapps.com)`
    : config.corsOrigin;
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   SignRoad API Server                                     ║
║   Version: 1.0.0                                          ║
║                                                           ║
║   Server running on port ${config.port}                          ║
║   Environment: ${config.nodeEnv.padEnd(20)}                ║
║   CORS: ${String(corsDisplay).padEnd(27)}             ║
║                                                           ║
║   Note: Using in-memory database.                         ║
║   Data will be lost on server restart.                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
