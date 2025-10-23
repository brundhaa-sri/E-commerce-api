import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, seller } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, seller, upload, createProduct);

router.route('/:productId')
    .get(getProductById)
    .put(protect, updateProduct) // Authorization is handled inside the controller
    .delete(protect, deleteProduct); // Authorization is handled inside the controller

export default router;