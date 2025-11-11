/**
 * Initiatives Routes
 * Defines API endpoints for initiative management
 */

import express from 'express';
import * as InitiativesController from '../controllers/initiatives.controller.js';
import * as AttachmentsController from '../controllers/attachments.controller.js';
import * as ContactsController from '../controllers/contacts.controller.js';
import { validateCreateInitiative, validateUpdateInitiative } from '../middleware/validation.middleware.js';
import { uploadSingle, handleUploadError } from '../middleware/upload.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/initiatives
 * @desc    Create a new initiative
 * @access  Public (will be protected later with auth middleware)
 */
router.post('/',
  validateCreateInitiative,
  InitiativesController.createInitiative
);

/**
 * @route   GET /api/initiatives
 * @desc    Get all initiatives (with optional filters)
 * @query   stage, category, owner
 * @access  Public
 */
router.get('/',
  InitiativesController.getAllInitiatives
);

/**
 * @route   GET /api/initiatives/:id
 * @desc    Get single initiative by ID
 * @access  Public
 */
router.get('/:id',
  InitiativesController.getInitiativeById
);

/**
 * @route   PATCH /api/initiatives/:id
 * @desc    Update an initiative
 * @access  Public (will be protected - owner only)
 */
router.patch('/:id',
  validateUpdateInitiative,
  InitiativesController.updateInitiative
);

// =============================================================================
// ATTACHMENTS ROUTES
// =============================================================================

/**
 * @route   GET /api/initiatives/:id/attachments
 * @desc    Get all attachments for an initiative
 * @access  Public
 */
router.get('/:id/attachments',
  AttachmentsController.getAttachments
);

/**
 * @route   POST /api/initiatives/:id/attachments
 * @desc    Create a new attachment (file upload or link)
 * @access  Public (will be protected)
 */
router.post('/:id/attachments',
  uploadSingle,
  handleUploadError,
  AttachmentsController.createAttachment
);

/**
 * @route   DELETE /api/initiatives/:id/attachments/:attachmentId
 * @desc    Delete an attachment
 * @access  Public (will be protected)
 */
router.delete('/:id/attachments/:attachmentId',
  AttachmentsController.deleteAttachment
);

// =============================================================================
// CONTACTS ROUTES
// =============================================================================

/**
 * @route   GET /api/initiatives/:id/contacts
 * @desc    Get all contacts for an initiative
 * @access  Public
 */
router.get('/:id/contacts',
  ContactsController.getContacts
);

/**
 * @route   POST /api/initiatives/:id/contacts
 * @desc    Create a new contact
 * @access  Public (will be protected)
 */
router.post('/:id/contacts',
  ContactsController.createContact
);

/**
 * @route   PATCH /api/initiatives/:id/contacts/:contactId
 * @desc    Update a contact
 * @access  Public (will be protected)
 */
router.patch('/:id/contacts/:contactId',
  ContactsController.updateContact
);

/**
 * @route   DELETE /api/initiatives/:id/contacts/:contactId
 * @desc    Delete a contact
 * @access  Public (will be protected)
 */
router.delete('/:id/contacts/:contactId',
  ContactsController.deleteContact
);

export default router;
