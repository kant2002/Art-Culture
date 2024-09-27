import express from 'express'
import { body } from 'express-validator'
import {
	getCurrentUser,
	// authController,
	// authenticateToken,
	login,
	register,
	resetPassword,
	resetPasswordConfirm,
} from '../controllers/authController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router()

// Registration Route with Validation
router.post(
	'/register',
	[
		body('email').isEmail().withMessage('Enter a valid email'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters'),
	],
	register
)

// Login Route
router.post('/login', login)

// Password Reset Request
router.post('/reset-password', resetPassword)

// Password Reset Confirmation
router.post('/reset-password/:token', resetPasswordConfirm)

router.get('/me', authenticateToken, getCurrentUser)

export default router
