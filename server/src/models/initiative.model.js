/**
 * Initiative Model
 * Handles database operations for initiatives (2NF Normalized)
 */

import { query, queryOne, execute, saveDatabase } from '../config/database.js';

/**
 * Create a new initiative with associated users
 * @param {Object} data - Initiative data
 * @param {number} userId - ID of user creating the initiative
 * @returns {Promise<Object>} Created initiative
 */
export async function createInitiative(data, userId) {
  const {
    title,
    description,
    problemStatement,
    detailedDescription,
    category,
    priority,
    ideaDate,
    conceptDate,
    projectStartDate,
    developmentDate,
    deploymentDate,
    completionDate
  } = data;

  // Insert initiative
  const sql = `
    INSERT INTO initiatives (
      title, description, problem_statement, detailed_description,
      category, current_stage, priority,
      idea_date, concept_date, project_start_date,
      development_date, deployment_date, completion_date,
      created_at, updated_at, last_stage_change_date
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'), datetime('now'))
  `;

  await execute(sql, [
    title,
    description,
    problemStatement,
    detailedDescription || description,
    category,
    'IDEA', // All new initiatives start in IDEA stage
    priority || 'MEDIUM',
    ideaDate || null,
    conceptDate || null,
    projectStartDate || null,
    developmentDate || null,
    deploymentDate || null,
    completionDate || null
  ]);

  // Get the last inserted initiative
  const result = await queryOne(
    'SELECT * FROM initiatives WHERE id = (SELECT MAX(id) FROM initiatives)'
  );

  // Add submitter as SUBMITTER type
  await execute(`
    INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary)
    VALUES (?, ?, (SELECT id FROM user_types WHERE type_name = 'SUBMITTER'), 1)
  `, [result.id, userId]);

  return result;
}

/**
 * Get initiative by ID with all associated users
 * @param {number} id - Initiative ID
 * @returns {Promise<Object|null>} Initiative with user details
 */
export async function getInitiativeById(id) {
  // Get basic initiative data
  const initiative = await queryOne('SELECT * FROM initiatives WHERE id = ?', [id]);

  if (!initiative) return null;

  // Get all associated users
  const users = await query(`
    SELECT
      u.id, u.first_name, u.last_name, u.email, u.department, u.function, u.phone,
      ut.type_name, iu.is_primary
    FROM initiative_users iu
    JOIN users u ON iu.user_id = u.id
    JOIN user_types ut ON iu.user_type_id = ut.id
    WHERE iu.initiative_id = ?
    ORDER BY
      CASE ut.type_name
        WHEN 'SUBMITTER' THEN 1
        WHEN 'BUSINESS_OWNER' THEN 2
        WHEN 'IT_OWNER' THEN 3
        ELSE 4
      END
  `, [id]);

  // Build user data for easy access
  const submitter = users.find(u => u.type_name === 'SUBMITTER');
  const businessOwner = users.find(u => u.type_name === 'BUSINESS_OWNER');
  const itOwner = users.find(u => u.type_name === 'IT_OWNER');

  // Add convenient fields for backward compatibility
  return {
    ...initiative,
    submitter_name: submitter ? `${submitter.first_name} ${submitter.last_name}` : null,
    submitter_email: submitter?.email,
    business_owner_name: businessOwner ? `${businessOwner.first_name} ${businessOwner.last_name}` : null,
    business_owner_function: businessOwner?.function,
    business_owner_department: businessOwner?.department,
    it_owner_name: itOwner ? `${itOwner.first_name} ${itOwner.last_name}` : null,
    it_owner_department: itOwner?.department,
    owner_name: submitter ? `${submitter.first_name} ${submitter.last_name}` : null, // For backward compatibility
    owner_email: submitter?.email,
    users: users // Full user list
  };
}

/**
 * Get all initiatives with user details
 * @param {Object} filters - Optional filters
 * @returns {Promise<Array>} Array of initiatives
 */
export async function getAllInitiatives(filters = {}) {
  let sql = 'SELECT * FROM initiatives';
  const conditions = [];
  const params = [];

  if (filters.stage) {
    conditions.push('current_stage = ?');
    params.push(filters.stage);
  }

  if (filters.category) {
    conditions.push('category = ?');
    params.push(filters.category);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY created_at DESC';

  const initiatives = await query(sql, params);

  // For each initiative, get submitter and owner names
  const result = await Promise.all(initiatives.map(async (initiative) => {
    const users = await query(`
      SELECT
        u.first_name, u.last_name, u.email,
        ut.type_name
      FROM initiative_users iu
      JOIN users u ON iu.user_id = u.id
      JOIN user_types ut ON iu.user_type_id = ut.id
      WHERE iu.initiative_id = ? AND ut.type_name IN ('SUBMITTER', 'BUSINESS_OWNER', 'IT_OWNER')
    `, [initiative.id]);

    const submitter = users.find(u => u.type_name === 'SUBMITTER');
    const businessOwner = users.find(u => u.type_name === 'BUSINESS_OWNER');
    const itOwner = users.find(u => u.type_name === 'IT_OWNER');

    return {
      ...initiative,
      submitter_name: submitter ? `${submitter.first_name} ${submitter.last_name}` : null,
      submitter_email: submitter?.email,
      owner_name: submitter ? `${submitter.first_name} ${submitter.last_name}` : null,
      owner_email: submitter?.email,
      business_owner_name: businessOwner ? `${businessOwner.first_name} ${businessOwner.last_name}` : null,
      it_owner_name: itOwner ? `${itOwner.first_name} ${itOwner.last_name}` : null
    };
  }));

  return result;
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
  if (data.detailedDescription !== undefined) {
    fields.push('detailed_description = ?');
    params.push(data.detailedDescription);
  }
  if (data.category !== undefined) {
    fields.push('category = ?');
    params.push(data.category);
  }
  if (data.current_stage !== undefined) {
    fields.push('current_stage = ?');
    params.push(data.current_stage);
  }
  if (data.priority !== undefined) {
    fields.push('priority = ?');
    params.push(data.priority);
  }
  if (data.ideaDate !== undefined) {
    fields.push('idea_date = ?');
    params.push(data.ideaDate);
  }
  if (data.conceptDate !== undefined) {
    fields.push('concept_date = ?');
    params.push(data.conceptDate);
  }
  if (data.projectStartDate !== undefined) {
    fields.push('project_start_date = ?');
    params.push(data.projectStartDate);
  }
  if (data.developmentDate !== undefined) {
    fields.push('development_date = ?');
    params.push(data.developmentDate);
  }
  if (data.deploymentDate !== undefined) {
    fields.push('deployment_date = ?');
    params.push(data.deploymentDate);
  }
  if (data.completionDate !== undefined) {
    fields.push('completion_date = ?');
    params.push(data.completionDate);
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

/**
 * Get users for an initiative by type
 * @param {number} initiativeId - Initiative ID
 * @param {string} typeName - User type name (e.g., 'CONTACT')
 * @returns {Promise<Array>} Array of users
 */
export async function getInitiativeUsers(initiativeId, typeName = null) {
  let sql = `
    SELECT
      u.id, u.first_name, u.last_name, u.email, u.department, u.function, u.phone,
      ut.type_name, iu.is_primary, iu.assigned_at
    FROM initiative_users iu
    JOIN users u ON iu.user_id = u.id
    JOIN user_types ut ON iu.user_type_id = ut.id
    WHERE iu.initiative_id = ?
  `;

  const params = [initiativeId];

  if (typeName) {
    sql += ' AND ut.type_name = ?';
    params.push(typeName);
  }

  sql += ' ORDER BY iu.is_primary DESC, iu.assigned_at ASC';

  return await query(sql, params);
}

export default {
  createInitiative,
  getInitiativeById,
  getAllInitiatives,
  updateInitiative,
  getInitiativeUsers
};
