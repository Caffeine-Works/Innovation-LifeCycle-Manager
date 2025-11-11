/**
 * Contact Model
 * Handles database operations for initiative contacts
 */

import { query, queryOne, execute } from '../config/database.js';

/**
 * Create a new contact
 * @param {number} initiativeId - Initiative ID
 * @param {Object} data - Contact data
 * @returns {Promise<Object>} Created contact
 */
export async function createContact(initiativeId, data) {
  const {
    contactName,
    contactRole,
    contactEmail,
    contactPhone,
    isPrimary
  } = data;

  // If this is marked as primary, unset other primary contacts
  if (isPrimary) {
    await execute(
      'UPDATE initiative_contacts SET is_primary = 0 WHERE initiative_id = ?',
      [initiativeId]
    );
  }

  const sql = `
    INSERT INTO initiative_contacts (
      initiative_id, contact_name, contact_role, contact_email,
      contact_phone, is_primary, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
  `;

  await execute(sql, [
    initiativeId,
    contactName,
    contactRole || null,
    contactEmail || null,
    contactPhone || null,
    isPrimary ? 1 : 0
  ]);

  // Get the last inserted contact
  const result = await queryOne(
    'SELECT * FROM initiative_contacts WHERE id = (SELECT MAX(id) FROM initiative_contacts)'
  );

  return result;
}

/**
 * Get all contacts for an initiative
 * @param {number} initiativeId - Initiative ID
 * @returns {Promise<Array>} Array of contacts
 */
export async function getContactsByInitiative(initiativeId) {
  const sql = `
    SELECT * FROM initiative_contacts
    WHERE initiative_id = ?
    ORDER BY is_primary DESC, created_at ASC
  `;

  return await query(sql, [initiativeId]);
}

/**
 * Get contact by ID
 * @param {number} id - Contact ID
 * @returns {Promise<Object|null>} Contact object
 */
export async function getContactById(id) {
  const sql = 'SELECT * FROM initiative_contacts WHERE id = ?';
  return await queryOne(sql, [id]);
}

/**
 * Update a contact
 * @param {number} id - Contact ID
 * @param {Object} data - Updated data
 * @returns {Promise<Object>} Updated contact
 */
export async function updateContact(id, data) {
  const fields = [];
  const params = [];

  if (data.contactName !== undefined) {
    fields.push('contact_name = ?');
    params.push(data.contactName);
  }
  if (data.contactRole !== undefined) {
    fields.push('contact_role = ?');
    params.push(data.contactRole);
  }
  if (data.contactEmail !== undefined) {
    fields.push('contact_email = ?');
    params.push(data.contactEmail);
  }
  if (data.contactPhone !== undefined) {
    fields.push('contact_phone = ?');
    params.push(data.contactPhone);
  }
  if (data.isPrimary !== undefined) {
    // If setting as primary, get initiative_id first to unset others
    if (data.isPrimary) {
      const contact = await getContactById(id);
      if (contact) {
        await execute(
          'UPDATE initiative_contacts SET is_primary = 0 WHERE initiative_id = ?',
          [contact.initiative_id]
        );
      }
    }
    fields.push('is_primary = ?');
    params.push(data.isPrimary ? 1 : 0);
  }

  if (fields.length === 0) {
    return await getContactById(id);
  }

  params.push(id);

  const sql = `
    UPDATE initiative_contacts
    SET ${fields.join(', ')}
    WHERE id = ?
  `;

  await execute(sql, params);

  return await getContactById(id);
}

/**
 * Delete a contact
 * @param {number} id - Contact ID
 * @returns {Promise<void>}
 */
export async function deleteContact(id) {
  const sql = 'DELETE FROM initiative_contacts WHERE id = ?';
  await execute(sql, [id]);
}

export default {
  createContact,
  getContactsByInitiative,
  getContactById,
  updateContact,
  deleteContact
};
