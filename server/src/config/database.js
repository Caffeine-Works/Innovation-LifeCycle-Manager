/**
 * Database Configuration
 * Manages MySQL database connection using mysql2
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database connection pool
 */
let pool = null;

/**
 * Get database connection pool
 */
export async function getDatabase() {
  if (pool) {
    return pool;
  }

  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'innovation_manager',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });

    // Test the connection
    const connection = await pool.getConnection();
    console.log('✅ Database connected:', process.env.DB_NAME || 'innovation_manager');
    connection.release();

    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

/**
 * Close database connection pool
 */
export async function closeDatabase() {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('📪 Database connection closed');
  }
}

/**
 * Helper function to run a query and get results
 */
export async function query(sql, params = []) {
  const db = await getDatabase();
  const [rows] = await db.execute(sql, params);
  return rows;
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
  const [result] = await db.execute(sql, params);
  return result;
}

/**
 * Helper function to execute multiple SQL statements (for schema/seed)
 */
export async function executeBatch(sqlStatements) {
  const db = await getDatabase();
  const connection = await db.getConnection();

  try {
    // Split statements and execute one by one
    const statements = sqlStatements
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await connection.execute(statement);
    }

    connection.release();
  } catch (error) {
    connection.release();
    throw error;
  }
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
  query,
  queryOne,
  execute,
  executeBatch,
  handleDatabaseError
};
