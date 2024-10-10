// src/routes/productRoutes.js

import express from 'express'
import { body } from 'express-validator'
import {
	createProduct,
	getProducts,
	getUserProducts,
} from '../controllers/productController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import uploadPaintings from '../middleware/productImageUploader.js'
import authorize from '../middleware/roleMIddleware.js'
const router = express.Router()

// Create a new product (only accessible by MUSEUM and CREATOR roles)
router.post(
	'/',

	authenticateToken,
	authorize('MUSEUM', 'CREATOR', 'ADMIN'),
	uploadPaintings.array('productImages', 7),
	// Maximum of 7 images
	[
		body('title').notEmpty().withMessage('Title is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('specs').optional().isString(),
	],
	createProduct
)

// Get all products
router.get('/', getProducts)
router.get('/my-products', authenticateToken, getUserProducts)

export default router
