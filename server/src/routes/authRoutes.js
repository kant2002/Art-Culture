import express from 'express'
import { body } from 'express-validator'
import {
	// authController,
	getCurrentUser,
	login,
	register,
	registerUser,
	resetPassword,
	resetPasswordConfirm,
	updateUserProfile,
} from '../controllers/authController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import authorize from '../middleware/roleMIddleware.js'
import upload from '../middleware/uploadUserProfileImages.js'

const router = express.Router()

// Registration Route with Validation
router.post(
	'/register',
	upload.single('profileImage'),
	registerUser,
	[
		body('email').isEmail().withMessage('Enter a valid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
		body('role')
			.optional()
			.isIn(['ADMIN', 'USER', 'MUSEUM', 'CREATOR', 'EDITOR'])
			.withMessage('Invalid role'),
	],
	register
)

// Self-Registration Route - Accessible to All
router.post(
	'/signup',
	authenticateToken,
	authorize('ADMIN'),
	[
		body('email').isEmail().withMessage('Enter a valid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
	],
	registerUser
)

// Login Route
router.post('/login', login)

// Password Reset Request
router.post('/reset-password', resetPassword)

// Password Reset Confirmation
router.post('/reset-password/:token', resetPasswordConfirm)

router.get('/me', authenticateToken, getCurrentUser)

router.put(
	'/me',
	authenticateToken,
	upload.single('profileImage'),
	[
		body('title')
			.optional()
			.isLength({ max: 100 })
			.withMessage('Title must be less than 100 characters'),
		body('bio')
			.optional()
			.isLength({ max: 500 })
			.withMessage('Bio must be less than 500 characters'),
	],
	updateUserProfile
)
export default router
