/**
 * Contacts Controller
 * Handles HTTP requests for initiative contacts
 */

import * as ContactModel from '../models/contact.model.js';
import * as InitiativeModel from '../models/initiative.model.js';

/**
 * Get all contacts for an initiative
 * GET /api/initiatives/:id/contacts
 */
export async function getContacts(req, res) {
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

    const contacts = await ContactModel.getContactsByInitiative(id);

    res.json({
      success: true,
      count: contacts.length,
      contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch contacts',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Create a new contact
 * POST /api/initiatives/:id/contacts
 */
export async function createContact(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, department, function: userFunction, isPrimary } = req.body;

    // Check if initiative exists
    const initiative = await InitiativeModel.getInitiativeById(id);
    if (!initiative) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Initiative with ID ${id} not found`
      });
    }

    // Validate required fields
    if (!firstName || !lastName) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'First name and last name are required'
      });
    }

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      department,
      function: userFunction,
      isPrimary: isPrimary || false
    };

    const contact = await ContactModel.createContact(id, contactData);

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      contact
    });

  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create contact',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Update a contact
 * PATCH /api/initiatives/:id/contacts/:contactId
 */
export async function updateContact(req, res) {
  try {
    const { id, contactId } = req.params;
    const updateData = req.body;

    // Check if contact exists
    const contact = await ContactModel.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Contact with ID ${contactId} not found`
      });
    }

    // Check if contact belongs to this initiative
    if (contact.initiative_id !== parseInt(id)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Contact does not belong to this initiative'
      });
    }

    const updatedContact = await ContactModel.updateContact(contactId, updateData);

    res.json({
      success: true,
      message: 'Contact updated successfully',
      contact: updatedContact
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update contact',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Delete a contact
 * DELETE /api/initiatives/:id/contacts/:contactId
 */
export async function deleteContact(req, res) {
  try {
    const { id, contactId } = req.params;

    // Check if contact exists
    const contact = await ContactModel.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Contact with ID ${contactId} not found`
      });
    }

    // Check if contact belongs to this initiative
    if (contact.initiative_id !== parseInt(id)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Contact does not belong to this initiative'
      });
    }

    await ContactModel.deleteContact(contactId);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete contact',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

export default {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};
