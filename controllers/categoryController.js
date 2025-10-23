import Category from '../models/Category.js';

// Utility to create a slug
const createSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

// @desc    Create a category
// @route   POST /api/categories
// @access  Admin
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, parentCategoryId } = req.body;
    const slug = createSlug(name);

    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
        return res.status(400).json({ message: 'Category name already exists.' });
    }

    const category = new Category({ name, slug, description, parentCategoryId });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:categoryId
// @access  Admin
export const updateCategory = async (req, res, next) => {
    try {
        const { name, description, parentCategoryId, isActive } = req.body;
        const category = await Category.findOne({ categoryId: req.params.categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        category.slug = name ? createSlug(name) : category.slug;
        category.description = description || category.description;
        category.parentCategoryId = parentCategoryId;
        category.isActive = isActive;
        
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch(error) {
        next(error);
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:categoryId
// @access  Admin
export const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findOne({ categoryId: req.params.categoryId });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Instead of deleting, we deactivate it (soft delete)
        category.isActive = false;
        await category.save();
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};