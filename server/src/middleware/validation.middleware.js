/**
 * Validation Middleware
 * Validates request data using express-validator
 */

import { body, validationResult } from 'express-validator';

/**
 * Handle validation errors
 */
export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }

  next();
}

/**
 * Validation rules for creating an initiative
 */
export const validateCreateInitiative = [
  body('title')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),

  body('description')
    .trim()
    .isLength({ min: 50, max: 5000 })
    .withMessage('Description must be between 50 and 5000 characters'),

  body('problemStatement')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Problem statement must be between 20 and 2000 characters'),

  body('category')
    .isIn(['TECHNOLOGY', 'PROCESS', 'PRODUCT', 'OTHER'])
    .withMessage('Category must be one of: TECHNOLOGY, PROCESS, PRODUCT, OTHER'),

  handleValidationErrors
];

/**
 * Validation rules for updating an initiative
 */
export const validateUpdateInitiative = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Title must be between 10 and 200 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ min: 50, max: 5000 })
    .withMessage('Description must be between 50 and 5000 characters'),

  body('problemStatement')
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Problem statement must be between 20 and 2000 characters'),

  body('category')
    .optional()
    .isIn(['TECHNOLOGY', 'PROCESS', 'PRODUCT', 'OTHER'])
    .withMessage('Category must be one of: TECHNOLOGY, PROCESS, PRODUCT, OTHER'),

  handleValidationErrors
];

export default {
  validateCreateInitiative,
  validateUpdateInitiative,
  handleValidationErrors
};
