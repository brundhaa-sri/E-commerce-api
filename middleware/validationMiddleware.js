import { body, validationResult } from 'express-validator';

// Middleware to handle validation errors from express-validator
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// --- Auth Validations ---
export const validateRegisterUser = [
  body('firstName').notEmpty().withMessage('First name is required').isLength({ min: 2, max: 50 }),
  body('lastName').notEmpty().withMessage('Last name is required').isLength({ min: 2, max: 50 }),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  handleValidationErrors,
];

export const validateLoginUser = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
];

export const validateChangePassword = [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
    handleValidationErrors,
];


// --- Product Validations ---
export const validateCreateProduct = [
    body('name').notEmpty().withMessage('Product name is required').trim(),
    body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('sku').notEmpty().withMessage('SKU is required'),
    body('categoryId').notEmpty().withMessage('Category ID is required'),
    handleValidationErrors,
];

export const validateUpdateProduct = [
    body('name').optional().notEmpty().withMessage('Product name cannot be empty').trim(),
    body('description').optional().isLength({ min: 20 }).withMessage('Description must be at least 20 characters long'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('categoryId').optional().notEmpty().withMessage('Category ID cannot be empty'),
    handleValidationErrors,
];


// --- Category Validations ---
export const validateCreateCategory = [
    body('name').notEmpty().withMessage('Category name is required').trim(),
    body('description').optional().trim(),
    handleValidationErrors,
];

export const validateUpdateCategory = [
    body('name').optional().notEmpty().withMessage('Category name cannot be empty').trim(),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean value'),
    handleValidationErrors,
];