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
