import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: () => `user_${new mongoose.Types.ObjectId()}`, // Or use UUID
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6, // Enforce a minimum length for security
    },
    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Middleware to hash password before saving a new user
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;