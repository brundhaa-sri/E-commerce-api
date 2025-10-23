import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ firstName, lastName, email, password, role });
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.userId,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user.userId, user.role);
      const refreshToken = generateRefreshToken(user.userId);
      
      // Store hashed refresh token in DB for security
      const salt = await bcrypt.genSalt(10);
      user.refreshToken = await bcrypt.hash(refreshToken, salt);
      await user.save();

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      
      res.json({
        userId: user.userId,
        email: user.email,
        role: user.role,
        accessToken,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ userId: decoded.userId });

    if (!user || !user.refreshToken) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verify the refresh token from the cookie against the hashed one in the DB
    const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isTokenValid) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user.userId, user.role);
    res.json({ accessToken: newAccessToken });

  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};


// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async (req, res, next) => {
  try {
    // Clear the refresh token from the database
    const user = await User.findOne({ userId: req.user.userId });
    if (user) {
        user.refreshToken = undefined;
        await user.save();
    }
    
    // Clear the cookie
    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch(error) {
    next(error);
  }
};