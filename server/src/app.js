/**
 * Express Application Setup
 * Configures middleware, routes, and error handling
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env.js';

const app = express();

// =============================================================================
// MIDDLEWARE
// =============================================================================

// Security headers
app.use(helmet());

// CORS - Allow frontend to access API
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true
}));

// Request logging
if (config.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================================================================
// ROUTES
// =============================================================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV
  });
});

// API routes (to be added)
app.get('/api', (req, res) => {
  res.json({
    message: 'Innovation Lifecycle Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      initiatives: '/api/initiatives',
      transitions: '/api/transitions'
    }
  });
});

// Import route modules
import initiativeRoutes from './routes/initiatives.routes.js';

// Mount routes
app.use('/api/initiatives', initiativeRoutes);

// TODO: Add more routes as features are built
// import authRoutes from './routes/auth.routes.js';
// import transitionRoutes from './routes/transitions.routes.js';
// app.use('/api/auth', authRoutes);
// app.use('/api/transitions', transitionRoutes);

// =============================================================================
// ERROR HANDLING
// =============================================================================

// 404 handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    path: req.url
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: err.name || 'Error',
    message: message,
    ...(config.isDevelopment && { stack: err.stack })
  });
});

export default app;
