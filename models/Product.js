import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `prod_${new mongoose.Types.ObjectId()}`,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: 50,
    },
    price: {
      type: Number, // Mongoose schema type for decimal is Number
      required: [true, 'Price is required'],
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    categoryId: {
      type: String, // Reference to our custom Category ID
      ref: 'Category',
      required: true,
    },
    sellerId: {
      type: String, // Reference to our custom User ID
      ref: 'User',
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    specifications: {
      type: Map,
      of: String,
    },
    tags: [String],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
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

const Product = mongoose.model('Product', productSchema);

export default Product;