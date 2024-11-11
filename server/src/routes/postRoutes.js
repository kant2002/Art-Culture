import express from 'express'
import { body } from 'express-validator'
import {
	createPost,
	deletePost,
	getAllPosts,
	getCreatorsPosts,
	getPostById,
	updatePost,
	upload,
} from '../controllers/postController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import { logPostActions } from '../middleware/postMiddleware.js'

const router = express.Router()

// Create a new post
router.post(
	'/',
	authenticateToken,
	logPostActions,
	upload.single('images'),
	[
		body('title_en').notEmpty().withMessage('Title is required'),
		body('content_en').notEmpty().withMessage('Content is required'),
		body('title_uk').notEmpty().withMessage('Потрібен заголовок'),
		body('content_uk').notEmpty().withMessage('Потрібен опис'),
	],
	createPost
)

// Get post by Creator
router.get('/creators', getCreatorsPosts)

// Get all posts
router.get('/', getAllPosts)

// Get a single post by ID
router.get('/:id', getPostById)

// Update a post
router.put(
	'/:id',
	authenticateToken,
	upload.single('images'),
	[
		body('title_en').notEmpty().withMessage('Title is required'),
		body('content_en').notEmpty().withMessage('Content is required'),
		body('title_uk').notEmpty().withMessage('Потрібен заголовок'),
		body('content_uk').notEmpty().withMessage('Потрібен опис'),
	],
	updatePost
)

// Delete a post
router.delete('/:id', authenticateToken, deletePost)

export default router
