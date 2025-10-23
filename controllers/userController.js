import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.user.userId }).select('-password -refreshToken');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.user.userId });
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      const updatedUser = await user.save();
      res.json({
        userId: updatedUser.userId,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ userId: req.user.userId });

        if (!user || !(await user.matchPassword(oldPassword))) {
            return res.status(401).json({ message: 'Invalid old password' });
        }

        user.password = newPassword; // The 'pre-save' hook will hash it
        await user.save();
        
        res.json({ message: 'Password changed successfully' });
    } catch(error) {
        next(error);
    }
};