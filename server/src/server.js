/**
 * Server Entry Point
 * Starts the Express server and manages graceful shutdown
 */

import app from './app.js';
import config, { validateConfig } from './config/env.js';
import { getDatabase, closeDatabase } from './config/database.js';

// Validate configuration
try {
  validateConfig();
  console.log('✅ Configuration validated');
} catch (error) {
  console.error('❌ Configuration error:', error.message);
  process.exit(1);
}

// Initialize database connection
try {
  await getDatabase();
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  console.error('   Please run: npm run db:reset');
  process.exit(1);
}

// Start server
const PORT = config.PORT;
const server = app.listen(PORT, () => {
  console.log('');
  console.log('🚀 Innovation Lifecycle Manager API');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 Client URL: ${config.CLIENT_URL}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('Available endpoints:');
  console.log(`   GET  http://localhost:${PORT}/health`);
  console.log(`   GET  http://localhost:${PORT}/api`);
  console.log('');
  console.log('Press Ctrl+C to stop');
  console.log('');
});

// =============================================================================
// GRACEFUL SHUTDOWN
// =============================================================================

function shutdown(signal) {
  console.log(`\n${signal} received, shutting down gracefully...`);

  server.close(() => {
    console.log('✅ HTTP server closed');

    // Close database connection
    closeDatabase();

    console.log('👋 Server stopped');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('⚠️  Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
}

// Handle shutdown signals
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  shutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('UNHANDLED_REJECTION');
});
