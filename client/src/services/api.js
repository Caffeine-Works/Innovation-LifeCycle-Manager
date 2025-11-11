/**
 * API Service
 * Handles all HTTP requests to the backend API
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for future auth token injection)
api.interceptors.request.use(
  (config) => {
    // TODO: Add auth token when authentication is implemented
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// =============================================================================
// Initiatives API
// =============================================================================

/**
 * Create a new initiative
 * @param {Object} data - Initiative data
 * @returns {Promise} API response
 */
export const createInitiative = (data) => {
  return api.post('/initiatives', data);
};

/**
 * Get all initiatives
 * @param {Object} params - Query parameters (stage, category, owner)
 * @returns {Promise} API response
 */
export const getAllInitiatives = (params = {}) => {
  return api.get('/initiatives', { params });
};

/**
 * Get initiative by ID
 * @param {number} id - Initiative ID
 * @returns {Promise} API response
 */
export const getInitiativeById = (id) => {
  return api.get(`/initiatives/${id}`);
};

/**
 * Update an initiative
 * @param {number} id - Initiative ID
 * @param {Object} data - Updated data
 * @returns {Promise} API response
 */
export const updateInitiative = (id, data) => {
  return api.patch(`/initiatives/${id}`, data);
};

// =============================================================================
// Attachments API
// =============================================================================

/**
 * Get all attachments for an initiative
 * @param {number} initiativeId - Initiative ID
 * @returns {Promise} API response
 */
export const getAttachments = (initiativeId) => {
  return api.get(`/initiatives/${initiativeId}/attachments`);
};

/**
 * Upload a file attachment
 * @param {number} initiativeId - Initiative ID
 * @param {File} file - File to upload
 * @returns {Promise} API response
 */
export const uploadAttachment = (initiativeId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(`/initiatives/${initiativeId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Add a link attachment
 * @param {number} initiativeId - Initiative ID
 * @param {Object} linkData - Link data (externalUrl, storageProvider, filename)
 * @returns {Promise} API response
 */
export const addLinkAttachment = (initiativeId, linkData) => {
  return api.post(`/initiatives/${initiativeId}/attachments`, linkData);
};

/**
 * Delete an attachment
 * @param {number} initiativeId - Initiative ID
 * @param {number} attachmentId - Attachment ID
 * @returns {Promise} API response
 */
export const deleteAttachment = (initiativeId, attachmentId) => {
  return api.delete(`/initiatives/${initiativeId}/attachments/${attachmentId}`);
};

// =============================================================================
// Contacts API
// =============================================================================

/**
 * Get all contacts for an initiative
 * @param {number} initiativeId - Initiative ID
 * @returns {Promise} API response
 */
export const getContacts = (initiativeId) => {
  return api.get(`/initiatives/${initiativeId}/contacts`);
};

/**
 * Create a new contact
 * @param {number} initiativeId - Initiative ID
 * @param {Object} contactData - Contact data
 * @returns {Promise} API response
 */
export const createContact = (initiativeId, contactData) => {
  return api.post(`/initiatives/${initiativeId}/contacts`, contactData);
};

/**
 * Update a contact
 * @param {number} initiativeId - Initiative ID
 * @param {number} contactId - Contact ID
 * @param {Object} contactData - Updated contact data
 * @returns {Promise} API response
 */
export const updateContact = (initiativeId, contactId, contactData) => {
  return api.patch(`/initiatives/${initiativeId}/contacts/${contactId}`, contactData);
};

/**
 * Delete a contact
 * @param {number} initiativeId - Initiative ID
 * @param {number} contactId - Contact ID
 * @returns {Promise} API response
 */
export const deleteContact = (initiativeId, contactId) => {
  return api.delete(`/initiatives/${initiativeId}/contacts/${contactId}`);
};

// =============================================================================
// Health Check
// =============================================================================

/**
 * Check API health
 * @returns {Promise} API response
 */
export const checkHealth = () => {
  return axios.get('http://localhost:3000/health');
};

export default api;
