import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changePassword
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateChangePassword } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/change-password', protect, validateChangePassword, changePassword);

export default router;