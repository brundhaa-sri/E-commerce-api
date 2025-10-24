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
import { validateCreateProduct, validateUpdateProduct } from '../middleware/validationMiddleware.js';


const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(protect, seller, upload, validateCreateProduct, createProduct);

router.route('/:productId')
    .get(getProductById)
    .put(protect, validateUpdateProduct, updateProduct) // Authorization is inside controller
    .delete(protect, deleteProduct); // Authorization is inside controller

export default router;