/**
 * Initiatives Routes
 * Defines API endpoints for initiative management
 */

import express from 'express';
import * as InitiativesController from '../controllers/initiatives.controller.js';
import { validateCreateInitiative, validateUpdateInitiative } from '../middleware/validation.middleware.js';

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

export default router;
