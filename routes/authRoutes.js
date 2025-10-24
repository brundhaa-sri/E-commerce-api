import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRegisterUser, validateLoginUser } from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [customer, seller]
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Bad request (e.g., user already exists, validation error)
 */
router.post('/register', validateRegisterUser, registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successful login, returns user info and accessToken
 *       '401':
 *         description: Invalid email or password
 */
router.post('/login', validateLoginUser, loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out the current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Logged out successfully
 *       '401':
 *         description: Not authorized, no token
 */
router.post('/logout', protect, logoutUser);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Get a new access token using a refresh token
 *     tags: [Authentication]
 *     description: The refresh token must be sent in an httpOnly cookie.
 *     responses:
 *       '200':
 *         description: A new access token is returned
 *       '401':
 *         description: Refresh token not found
 *       '403':
 *         description: Invalid refresh token
 */
router.post('/refresh-token', refreshToken);

export default router;