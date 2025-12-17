import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
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
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   SignRoad API Server                                     ║
║   Version: 1.0.0                                          ║
║                                                           ║
║   Server running on port ${config.port}                          ║
║   Environment: ${config.nodeEnv.padEnd(20)}                ║
║   CORS Origin: ${config.corsOrigin.padEnd(20)}             ║
║                                                           ║
║   Note: Using in-memory database.                         ║
║   Data will be lost on server restart.                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

export default app;
