/**
 * Database Reset Script
 * This script can be run multiple times safely (idempotent)
 * It will drop all tables and recreate them with seed data
 *
 * Usage: npm run db:reset
 */

import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const DB_PATH = path.join(__dirname, '..', 'data', 'innovation-manager.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');

console.log('🔄 Starting database reset...\n');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  console.log('📁 Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
}

// Delete existing database file if it exists
if (fs.existsSync(DB_PATH)) {
  console.log('🗑️  Removing existing database...');
  fs.unlinkSync(DB_PATH);
}

// Initialize sql.js and create database
console.log('✨ Creating new database...');

const SQL = await initSqlJs();
const db = new SQL.Database();

try {
  // Read and execute schema
  console.log('📋 Creating schema...');
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  console.log('✅ Schema created successfully');

  // Read and execute seed data
  console.log('🌱 Seeding data...');
  const seed = fs.readFileSync(SEED_PATH, 'utf8');
  db.exec(seed);
  console.log('✅ Seed data inserted successfully');

  // Save database to file
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);

  // Verify data was inserted
  const userCountResult = db.exec('SELECT COUNT(*) as count FROM users');
  const initiativeCountResult = db.exec('SELECT COUNT(*) as count FROM initiatives');
  const transitionCountResult = db.exec('SELECT COUNT(*) as count FROM stage_transitions');

  const userCount = userCountResult[0].values[0][0];
  const initiativeCount = initiativeCountResult[0].values[0][0];
  const transitionCount = transitionCountResult[0].values[0][0];

  console.log('\n📊 Database Statistics:');
  console.log(`   Users: ${userCount}`);
  console.log(`   Initiatives: ${initiativeCount}`);
  console.log(`   Stage Transitions: ${transitionCount}`);

  console.log('\n✅ Database reset completed successfully!');
  console.log(`📍 Database location: ${DB_PATH}\n`);

  // Display demo user credentials
  console.log('🔑 Demo User Credentials:');
  const users = db.exec('SELECT email, role FROM users ORDER BY id');

  if (users.length > 0 && users[0].values) {
    users[0].values.forEach(row => {
      console.log(`   ${row[0]} (${row[1]}) - Password: demo123`);
    });
  }

  console.log('\n✨ Ready to start the server!\n');

  // Close database
  db.close();

  process.exit(0);

} catch (error) {
  console.error('❌ Error resetting database:', error.message);
  console.error(error);
  db.close();
  process.exit(1);
}
