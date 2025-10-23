import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // Optional: for colorful console logs
import bcrypt from 'bcryptjs';

// Load env vars
dotenv.config();

// Load models
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

// Load sample data
import { users } from './data/users.js';
import { categories } from './data/categories.js';
import { products } from './data/products.js';

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for Seeding...'.cyan.underline);
  } catch (err) {
    console.error(`${err.message}`.red.bold);
    process.exit(1);
  }
};

// Import data into DB
const importData = async () => {
  try {
    // Clear previous data
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Hash user passwords before inserting
    const createdUsers = users.map(user => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        return { ...user, password: hashedPassword };
    });
    
    // Insert new data
    await User.insertMany(createdUsers);
    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Logic to run the script
const runSeeder = async () => {
  await connectDB();
  // Check for command line argument for '-d' to destroy data
  if (process.argv[2] === '-d') {
    await destroyData();
  } else {
    await importData();
  }
};

runSeeder();