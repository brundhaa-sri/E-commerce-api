import Product from '../models/Product.js';
import User from '../models/User.js';

// Utility to create a slug
const createSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

// @desc    Create a product
// @route   POST /api/products
// @access  Seller/Admin
export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, sku, categoryId, specifications, tags } = req.body;
        
        // Assume req.files contains uploaded image info from Multer
        const images = req.files.map(file => `/uploads/${file.filename}`);
        if(images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required.' });
        }

        const product = new Product({
            name,
            slug: createSlug(name),
            description,
            price,
            stock,
            sku,
            categoryId,
            sellerId: req.user.userId,
            images,
            specifications: JSON.parse(specifications || '{}'),
            tags: tags ? tags.split(',') : [],
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);

    } catch(error) {
        next(error);
    }
};

// @desc    Get all products with filtering, searching, pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword ? {
        name: { $regex: req.query.keyword, $options: 'i' }
    } : {};
    
    const count = await Product.countDocuments({ ...keyword, isActive: true });
    const products = await Product.find({ ...keyword, isActive: true })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Get single product
// @route   GET /api/products/:productId
// @access  Public
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId, isActive: true });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch(error) {
        next(error);
    }
};


// @desc    Update a product
// @route   PUT /api/products/:productId
// @access  Owner/Admin
export const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const product = await Product.findOne({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Authorization: Check if the user is the owner or an admin
        if (product.sellerId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized to update this product' });
        }
        
        product.name = name || product.name;
        product.slug = name ? createSlug(name) : product.slug;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.categoryId = categoryId || product.categoryId;

        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } catch(error) {
        next(error);
    }
};


// @desc    Delete a product (soft delete)
// @route   DELETE /api/products/:productId
// @access  Owner/Admin
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOne({ productId: req.params.productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Authorization: Check if the user is the owner or an admin
        if (product.sellerId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized to delete this product' });
        }
        
        product.isActive = false; // Soft delete
        await product.save();

        res.status(204).send();

    } catch(error) {
        next(error);
    }
};