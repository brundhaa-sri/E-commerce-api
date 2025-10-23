import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `cat_${new mongoose.Types.ObjectId()}`,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parentCategoryId: {
      type: String, // Storing our custom ID
      ref: 'Category',
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;