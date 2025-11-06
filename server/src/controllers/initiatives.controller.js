/**
 * Initiatives Controller
 * Handles HTTP requests for initiative management
 */

import * as InitiativeModel from '../models/initiative.model.js';

/**
 * Create a new initiative
 * POST /api/initiatives
 */
export async function createInitiative(req, res) {
  try {
    const userId = req.user?.id || 1; // TODO: Get from authentication middleware
    const data = req.body;

    // Create initiative
    const initiative = await InitiativeModel.createInitiative(data, userId);

    // Get full initiative details with user info
    const fullInitiative = await InitiativeModel.getInitiativeById(initiative.id);

    res.status(201).json({
      success: true,
      message: 'Initiative created successfully',
      initiative: fullInitiative
    });

  } catch (error) {
    console.error('Error creating initiative:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create initiative',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Get all initiatives
 * GET /api/initiatives
 */
export async function getAllInitiatives(req, res) {
  try {
    const filters = {
      stage: req.query.stage,
      category: req.query.category,
      owner_id: req.query.owner
    };

    const initiatives = await InitiativeModel.getAllInitiatives(filters);

    res.json({
      success: true,
      count: initiatives.length,
      initiatives
    });

  } catch (error) {
    console.error('Error fetching initiatives:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch initiatives',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Get single initiative by ID
 * GET /api/initiatives/:id
 */
export async function getInitiativeById(req, res) {
  try {
    const { id } = req.params;
    const initiative = await InitiativeModel.getInitiativeById(id);

    if (!initiative) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Initiative with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      initiative
    });

  } catch (error) {
    console.error('Error fetching initiative:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch initiative',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Update an initiative
 * PATCH /api/initiatives/:id
 */
export async function updateInitiative(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if initiative exists
    const existing = await InitiativeModel.getInitiativeById(id);
    if (!existing) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Initiative with ID ${id} not found`
      });
    }

    // Update initiative
    const updated = await InitiativeModel.updateInitiative(id, data);

    res.json({
      success: true,
      message: 'Initiative updated successfully',
      initiative: updated
    });

  } catch (error) {
    console.error('Error updating initiative:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update initiative',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default {
  createInitiative,
  getAllInitiatives,
  getInitiativeById,
  updateInitiative
};
