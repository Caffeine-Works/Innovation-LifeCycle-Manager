/**
 * Initiative Model
 * Handles database operations for initiatives
 */

import { query, queryOne, execute, saveDatabase } from '../config/database.js';

/**
 * Create a new initiative
 * @param {Object} data - Initiative data
 * @param {number} userId - ID of user creating the initiative
 * @returns {Promise<Object>} Created initiative
 */
export async function createInitiative(data, userId) {
  const {
    title,
    description,
    problemStatement,
    category
  } = data;

  // Insert initiative
  const sql = `
    INSERT INTO initiatives (
      title, description, problem_statement, category,
      current_stage, submitter_id, owner_id,
      created_at, updated_at, last_stage_change_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
  `;

  await execute(sql, [
    title,
    description,
    problemStatement,
    category,
    'IDEA', // All new initiatives start in IDEA stage
    userId, // submitter
    userId  // owner (initially same as submitter)
  ]);

  // Get the last inserted initiative
  const result = await queryOne(
    'SELECT * FROM initiatives WHERE id = (SELECT MAX(id) FROM initiatives)'
  );

  return result;
}

/**
 * Get initiative by ID with user details
 * @param {number} id - Initiative ID
 * @returns {Promise<Object|null>} Initiative with user details
 */
export async function getInitiativeById(id) {
  const sql = `
    SELECT
      i.*,
      u_submitter.first_name || ' ' || u_submitter.last_name AS submitter_name,
      u_submitter.email AS submitter_email,
      u_owner.first_name || ' ' || u_owner.last_name AS owner_name,
      u_owner.email AS owner_email
    FROM initiatives i
    LEFT JOIN users u_submitter ON i.submitter_id = u_submitter.id
    LEFT JOIN users u_owner ON i.owner_id = u_owner.id
    WHERE i.id = ?
  `;

  return await queryOne(sql, [id]);
}

/**
 * Get all initiatives with user details
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of initiatives
 */
export async function getAllInitiatives(filters = {}) {
  let sql = `
    SELECT
      i.*,
      u_submitter.first_name || ' ' || u_submitter.last_name AS submitter_name,
      u_submitter.email AS submitter_email,
      u_owner.first_name || ' ' || u_owner.last_name AS owner_name,
      u_owner.email AS owner_email
    FROM initiatives i
    LEFT JOIN users u_submitter ON i.submitter_id = u_submitter.id
    LEFT JOIN users u_owner ON i.owner_id = u_owner.id
  `;

  const conditions = [];
  const params = [];

  if (filters.stage) {
    conditions.push('i.current_stage = ?');
    params.push(filters.stage);
  }

  if (filters.category) {
    conditions.push('i.category = ?');
    params.push(filters.category);
  }

  if (filters.owner_id) {
    conditions.push('i.owner_id = ?');
    params.push(filters.owner_id);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY i.created_at DESC';

  return await query(sql, params);
}

/**
 * Update an initiative
 * @param {number} id - Initiative ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>} Updated initiative
 */
export async function updateInitiative(id, data) {
  const fields = [];
  const params = [];

  // Only update provided fields
  if (data.title !== undefined) {
    fields.push('title = ?');
    params.push(data.title);
  }
  if (data.description !== undefined) {
    fields.push('description = ?');
    params.push(data.description);
  }
  if (data.problemStatement !== undefined) {
    fields.push('problem_statement = ?');
    params.push(data.problemStatement);
  }
  if (data.category !== undefined) {
    fields.push('category = ?');
    params.push(data.category);
  }

  // Always update the updated_at timestamp
  fields.push('updated_at = datetime(\'now\')');

  params.push(id);

  const sql = `
    UPDATE initiatives
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  await execute(sql, params);

  return await getInitiativeById(id);
}

export default {
  createInitiative,
  getInitiativeById,
  getAllInitiatives,
  updateInitiative
};
