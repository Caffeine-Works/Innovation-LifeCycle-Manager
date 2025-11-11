/**
 * Attachment Model
 * Handles database operations for initiative attachments
 */

import { query, queryOne, execute } from '../config/database.js';

/**
 * Create a new attachment
 * @param {number} initiativeId - Initiative ID
 * @param {Object} data - Attachment data
 * @param {number} userId - ID of user creating the attachment
 * @returns {Promise<Object>} Created attachment
 */
export async function createAttachment(initiativeId, data, userId) {
  const {
    attachmentType,
    filePath,
    externalUrl,
    storageProvider,
    filename,
    fileSize,
    mimeType
  } = data;

  const sql = `
    INSERT INTO initiative_attachments (
      initiative_id, attachment_type, file_path, external_url,
      storage_provider, filename, file_size, mime_type,
      created_at, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), ?)
  `;

  await execute(sql, [
    initiativeId,
    attachmentType,
    filePath || null,
    externalUrl || null,
    storageProvider || 'LOCAL',
    filename || null,
    fileSize || null,
    mimeType || null,
    userId
  ]);

  // Get the last inserted attachment
  const result = await queryOne(
    'SELECT * FROM initiative_attachments WHERE id = (SELECT MAX(id) FROM initiative_attachments)'
  );

  return result;
}

/**
 * Get all attachments for an initiative
 * @param {number} initiativeId - Initiative ID
 * @returns {Promise<Array>} Array of attachments
 */
export async function getAttachmentsByInitiative(initiativeId) {
  const sql = `
    SELECT * FROM initiative_attachments
    WHERE initiative_id = ?
    ORDER BY created_at DESC
  `;

  return await query(sql, [initiativeId]);
}

/**
 * Get attachment by ID
 * @param {number} id - Attachment ID
 * @returns {Promise<Object|null>} Attachment object
 */
export async function getAttachmentById(id) {
  const sql = 'SELECT * FROM initiative_attachments WHERE id = ?';
  return await queryOne(sql, [id]);
}

/**
 * Delete an attachment
 * @param {number} id - Attachment ID
 * @returns {Promise<void>}
 */
export async function deleteAttachment(id) {
  const sql = 'DELETE FROM initiative_attachments WHERE id = ?';
  await execute(sql, [id]);
}

export default {
  createAttachment,
  getAttachmentsByInitiative,
  getAttachmentById,
  deleteAttachment
};
