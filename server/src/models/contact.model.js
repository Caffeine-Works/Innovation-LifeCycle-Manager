/**
 * Contact Model (2NF Normalized)
 * Handles database operations for initiative contacts via users and initiative_users tables
 */

import { query, queryOne, execute } from '../config/database.js';

/**
 * Create a new contact (user + initiative_users relationship)
 * @param {number} initiativeId - Initiative ID
 * @param {Object} data - Contact data
 * @returns {Promise<Object>} Created contact relationship
 */
export async function createContact(initiativeId, data) {
  const {
    firstName,
    lastName,
    email,
    phone,
    department,
    function: userFunction,
    isPrimary
  } = data;

  // If this is marked as primary, unset other primary contacts for this initiative
  if (isPrimary) {
    await execute(`
      UPDATE initiative_users
      SET is_primary = 0
      WHERE initiative_id = ? AND user_type_id = (SELECT id FROM user_types WHERE type_name = 'CONTACT')
    `, [initiativeId]);
  }

  // Check if user already exists by email
  let user = email ? await queryOne('SELECT * FROM users WHERE email = ?', [email]) : null;

  if (!user) {
    // Create new user
    await execute(`
      INSERT INTO users (first_name, last_name, email, phone, department, function, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, datetime('now'))
    `, [
      firstName,
      lastName,
      email || null,
      phone || null,
      department || null,
      userFunction || null
    ]);

    user = await queryOne('SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)');
  }

  // Create initiative_users relationship
  await execute(`
    INSERT INTO initiative_users (initiative_id, user_id, user_type_id, is_primary, assigned_at)
    VALUES (?, ?, (SELECT id FROM user_types WHERE type_name = 'CONTACT'), ?, datetime('now'))
  `, [initiativeId, user.id, isPrimary ? 1 : 0]);

  // Get the created relationship
  const result = await queryOne(`
    SELECT
      iu.id, iu.initiative_id, iu.user_id, iu.is_primary, iu.assigned_at,
      u.first_name, u.last_name, u.email, u.phone, u.department, u.function,
      ut.type_name
    FROM initiative_users iu
    JOIN users u ON iu.user_id = u.id
    JOIN user_types ut ON iu.user_type_id = ut.id
    WHERE iu.id = (SELECT MAX(id) FROM initiative_users)
  `);

  return result;
}

/**
 * Get all contacts for an initiative
 * @param {number} initiativeId - Initiative ID
 * @returns {Promise<Array>} Array of contacts with user details
 */
export async function getContactsByInitiative(initiativeId) {
  const sql = `
    SELECT
      iu.id, iu.initiative_id, iu.user_id, iu.is_primary, iu.assigned_at,
      u.first_name, u.last_name, u.email, u.phone, u.department, u.function,
      ut.type_name
    FROM initiative_users iu
    JOIN users u ON iu.user_id = u.id
    JOIN user_types ut ON iu.user_type_id = ut.id
    WHERE iu.initiative_id = ? AND ut.type_name = 'CONTACT'
    ORDER BY iu.is_primary DESC, iu.assigned_at ASC
  `;

  return await query(sql, [initiativeId]);
}

/**
 * Get contact relationship by initiative_users ID
 * @param {number} id - initiative_users ID
 * @returns {Promise<Object|null>} Contact relationship object
 */
export async function getContactById(id) {
  const sql = `
    SELECT
      iu.id, iu.initiative_id, iu.user_id, iu.is_primary, iu.assigned_at,
      u.first_name, u.last_name, u.email, u.phone, u.department, u.function,
      ut.type_name
    FROM initiative_users iu
    JOIN users u ON iu.user_id = u.id
    JOIN user_types ut ON iu.user_type_id = ut.id
    WHERE iu.id = ?
  `;
  return await queryOne(sql, [id]);
}

/**
 * Update a contact's user information
 * @param {number} id - initiative_users ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>} Updated contact
 */
export async function updateContact(id, data) {
  // Get the contact to find the user_id
  const contact = await getContactById(id);
  if (!contact) {
    throw new Error('Contact not found');
  }

  const userFields = [];
  const userParams = [];

  // Update user table fields
  if (data.firstName !== undefined) {
    userFields.push('first_name = ?');
    userParams.push(data.firstName);
  }
  if (data.lastName !== undefined) {
    userFields.push('last_name = ?');
    userParams.push(data.lastName);
  }
  if (data.email !== undefined) {
    userFields.push('email = ?');
    userParams.push(data.email);
  }
  if (data.phone !== undefined) {
    userFields.push('phone = ?');
    userParams.push(data.phone);
  }
  if (data.department !== undefined) {
    userFields.push('department = ?');
    userParams.push(data.department);
  }
  if (data.function !== undefined) {
    userFields.push('function = ?');
    userParams.push(data.function);
  }

  // Update users table if there are user fields to update
  if (userFields.length > 0) {
    userParams.push(contact.user_id);
    const userSql = `UPDATE users SET ${userFields.join(', ')} WHERE id = ?`;
    await execute(userSql, userParams);
  }

  // Update initiative_users table for is_primary
  if (data.isPrimary !== undefined) {
    // If setting as primary, unset other primary contacts for this initiative
    if (data.isPrimary) {
      await execute(`
        UPDATE initiative_users
        SET is_primary = 0
        WHERE initiative_id = ? AND user_type_id = (SELECT id FROM user_types WHERE type_name = 'CONTACT')
      `, [contact.initiative_id]);
    }

    await execute('UPDATE initiative_users SET is_primary = ? WHERE id = ?', [
      data.isPrimary ? 1 : 0,
      id
    ]);
  }

  return await getContactById(id);
}

/**
 * Delete a contact (remove initiative_users relationship)
 * @param {number} id - initiative_users ID
 * @returns {Promise<void>}
 */
export async function deleteContact(id) {
  const sql = 'DELETE FROM initiative_users WHERE id = ?';
  await execute(sql, [id]);
}

export default {
  createContact,
  getContactsByInitiative,
  getContactById,
  updateContact,
  deleteContact
};
