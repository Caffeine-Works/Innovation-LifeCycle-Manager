/**
 * Database Reset Script
 * This script can be run multiple times safely (idempotent)
 * It will drop all tables and recreate them with seed data
 *
 * Usage: npm run db:reset
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || ''
};

const dbName = process.env.DB_NAME || 'innovation_manager';

console.log('🔄 Starting database reset...\n');

let connection = null;

try {
  // Connect to MySQL server (without specifying database)
  console.log('🗄️  Connecting to MySQL...');
  connection = await mysql.createConnection(dbConfig);

  // Drop database if exists and create new one
  console.log('✨ Creating database...');
  await connection.query(`DROP DATABASE IF EXISTS ${dbName}`);
  await connection.query(`CREATE DATABASE ${dbName}`);
  await connection.query(`USE ${dbName}`);

  // Read and execute schema
  console.log('📋 Creating schema...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

  // Split by semicolons and execute each statement
  const schemaStatements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of schemaStatements) {
    await connection.query(statement);
  }
  console.log('✅ Schema created successfully');

  // Read and execute seed data
  console.log('🌱 Seeding data...');
  const seed = fs.readFileSync(SEED_PATH, 'utf8');

  const seedStatements = seed
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of seedStatements) {
    await connection.query(statement);
  }
  console.log('✅ Seed data inserted successfully');

  // Verify data was inserted
  const [userCountResult] = await connection.query('SELECT COUNT(*) as count FROM users');
  const [initiativeCountResult] = await connection.query('SELECT COUNT(*) as count FROM initiatives');
  const [transitionCountResult] = await connection.query('SELECT COUNT(*) as count FROM stage_transitions');

  const userCount = userCountResult[0].count;
  const initiativeCount = initiativeCountResult[0].count;
  const transitionCount = transitionCountResult[0].count;

  console.log('\n📊 Database Statistics:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Initiatives: ${initiativeCount}`);
  console.log(`   Stage Transitions: ${transitionCount}`);

  console.log('\n✅ Database reset completed successfully!');
  console.log(`📍 Database: ${dbName}\n`);

  // Display demo user credentials
  console.log('🔑 Demo User Credentials:');
  const [users] = await connection.query('SELECT email, role FROM users ORDER BY id');

  users.forEach(user => {
    console.log(`   ${user.email} (${user.role}) - Password: demo123`);
  });

  console.log('\n✨ Ready to start the server!\n');

  // Close connection
  await connection.end();

  process.exit(0);

} catch (error) {
  console.error('❌ Error resetting database:', error.message);
  console.error(error);

  if (connection) {
    await connection.end();
  }

  process.exit(1);
}
