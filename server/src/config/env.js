/**
 * Environment Configuration
 * Loads and validates environment variables
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from root directory
dotenv.config({ path: path.join(__dirname, '../../../.env') });

/**
 * Environment configuration object
 */
const config = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 3000,

  // Database
  DATABASE_PATH: process.env.DATABASE_PATH || './data/innovation-manager.db',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

  // Anthropic AI
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',

  // CORS
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',

  // Is development?
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production'
};

/**
 * Validate required environment variables
 */
export function validateConfig() {
  const warnings = [];

  // Check JWT secret
  if (config.JWT_SECRET === 'dev-secret-change-in-production' && config.isProduction) {
    throw new Error('JWT_SECRET must be set in production!');
  }

  // Warn if Anthropic API key is missing
  if (!config.ANTHROPIC_API_KEY) {
    warnings.push('ANTHROPIC_API_KEY is not set - AI features will not work');
  }

  // Display warnings
  if (warnings.length > 0) {
    console.warn('\n⚠️  Configuration warnings:');
    warnings.forEach(warning => console.warn(`   - ${warning}`));
    console.warn('');
  }

  return true;
}

export default config;
