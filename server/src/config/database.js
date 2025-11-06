/**
 * Database Configuration
 * Manages SQLite database connection using sql.js (pure JavaScript, no compilation)
 */

import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database path from environment or default
const DB_PATH = process.env.DATABASE_PATH || path.join(__dirname, '../../data/innovation-manager.db');

/**
 * Database instance (sql.js)
 */
let dbInstance = null;
let SQL = null;

/**
 * Initialize sql.js
 */
async function initSQL() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
  return SQL;
}

/**
 * Get database instance
 * Returns sql.js Database object
 */
export async function getDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  // Initialize sql.js
  await initSQL();

  // Check if database file exists
  if (!fs.existsSync(DB_PATH)) {
    throw new Error(
      `Database not found at ${DB_PATH}. Please run 'npm run db:reset' to create it.`
    );
  }

  // Load database from file
  const buffer = fs.readFileSync(DB_PATH);
  dbInstance = new SQL.Database(buffer);

  console.log('✅ Database connected:', DB_PATH);

  return dbInstance;
}

/**
 * Save database to file
 * sql.js keeps database in memory, so we need to explicitly save changes
 */
export function saveDatabase() {
  if (!dbInstance) {
    throw new Error('Database not initialized');
  }

  const data = dbInstance.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

/**
 * Close database connection
 */
export function closeDatabase() {
  if (dbInstance) {
    // Save before closing
    saveDatabase();
    dbInstance.close();
    dbInstance = null;
    console.log('📪 Database connection closed');
  }
}

/**
 * Helper function to run a query and get results
 */
export async function query(sql, params = []) {
  const db = await getDatabase();
  const stmt = db.prepare(sql);

  if (params.length > 0) {
    stmt.bind(params);
  }

  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();

  return results;
}

/**
 * Helper function to run a query and get first result
 */
export async function queryOne(sql, params = []) {
  const results = await query(sql, params);
  return results.length > 0 ? results[0] : null;
}

/**
 * Helper function to execute SQL (INSERT, UPDATE, DELETE)
 */
export async function execute(sql, params = []) {
  const db = await getDatabase();
  db.run(sql, params);
  saveDatabase(); // Auto-save after write operations
}

/**
 * Helper function to execute multiple SQL statements (for schema/seed)
 */
export async function executeBatch(sqlStatements) {
  const db = await getDatabase();
  db.exec(sqlStatements);
  saveDatabase();
}

/**
 * Helper function to handle database errors
 */
export function handleDatabaseError(error) {
  console.error('Database error:', error);

  return {
    status: 500,
    message: 'Database error occurred',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  };
}

export default {
  getDatabase,
  closeDatabase,
  saveDatabase,
  query,
  queryOne,
  execute,
  executeBatch,
  handleDatabaseError
};
