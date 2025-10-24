import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { validateCreateCategory, validateUpdateCategory } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, validateCreateCategory, createCategory);

router.route('/:categoryId')
  .put(protect, admin, validateUpdateCategory, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;