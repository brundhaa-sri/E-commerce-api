import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.post('/refresh-token', refreshToken);

export default router;