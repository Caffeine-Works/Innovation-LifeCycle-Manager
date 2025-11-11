/**
 * Attachments Controller
 * Handles HTTP requests for initiative attachments
 */

import * as AttachmentModel from '../models/attachment.model.js';
import * as InitiativeModel from '../models/initiative.model.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Get all attachments for an initiative
 * GET /api/initiatives/:id/attachments
 */
export async function getAttachments(req, res) {
  try {
    const { id } = req.params;

    // Check if initiative exists
    const initiative = await InitiativeModel.getInitiativeById(id);
    if (!initiative) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Initiative with ID ${id} not found`
      });
    }

    const attachments = await AttachmentModel.getAttachmentsByInitiative(id);

    res.json({
      success: true,
      count: attachments.length,
      attachments
    });

  } catch (error) {
    console.error('Error fetching attachments:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch attachments',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Create a new attachment (file upload or link)
 * POST /api/initiatives/:id/attachments
 */
export async function createAttachment(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 1; // TODO: Get from auth middleware

    // Check if initiative exists
    const initiative = await InitiativeModel.getInitiativeById(id);
    if (!initiative) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Initiative with ID ${id} not found`
      });
    }

    let attachmentData = {};

    // Check if file was uploaded
    if (req.file) {
      attachmentData = {
        attachmentType: req.file.mimetype.startsWith('image/') ? 'IMAGE'
                      : req.file.mimetype.startsWith('video/') ? 'VIDEO'
                      : 'DOCUMENT',
        filePath: req.file.path,
        storageProvider: 'LOCAL',
        filename: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      };
    } else if (req.body.externalUrl) {
      // Link attachment
      const { externalUrl, storageProvider, filename } = req.body;
      attachmentData = {
        attachmentType: 'LINK',
        externalUrl,
        storageProvider: storageProvider || 'GENERIC',
        filename: filename || 'External Link'
      };
    } else {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Either file upload or external URL is required'
      });
    }

    const attachment = await AttachmentModel.createAttachment(id, attachmentData, userId);

    res.status(201).json({
      success: true,
      message: 'Attachment created successfully',
      attachment
    });

  } catch (error) {
    console.error('Error creating attachment:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create attachment',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Delete an attachment
 * DELETE /api/initiatives/:id/attachments/:attachmentId
 */
export async function deleteAttachment(req, res) {
  try {
    const { id, attachmentId } = req.params;

    // Check if attachment exists
    const attachment = await AttachmentModel.getAttachmentById(attachmentId);
    if (!attachment) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Attachment with ID ${attachmentId} not found`
      });
    }

    // Check if attachment belongs to this initiative
    if (attachment.initiative_id !== parseInt(id)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Attachment does not belong to this initiative'
      });
    }

    // If it's a local file, delete the file from filesystem
    if (attachment.file_path && attachment.storage_provider === 'LOCAL') {
      try {
        await fs.unlink(attachment.file_path);
      } catch (err) {
        console.warn('Failed to delete file:', err.message);
        // Continue with database deletion even if file deletion fails
      }
    }

    // Delete from database
    await AttachmentModel.deleteAttachment(attachmentId);

    res.json({
      success: true,
      message: 'Attachment deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting attachment:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete attachment',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default {
  getAttachments,
  createAttachment,
  deleteAttachment
};
