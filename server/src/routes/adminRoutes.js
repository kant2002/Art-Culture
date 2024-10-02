import express from 'express'
import { body } from 'express-validator'
import {
	deleteUser,
	getAllUsers,
	updateUserRole,
} from '../controllers/adminController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import authorize from '../middleware/roleMIddleware.js'

const router = express.Router()

router.get('/users', authenticateToken, authorize('ADMIN'), getAllUsers)

router.put(
	'/users/:id/role',
	authenticateToken,
	authorize('ADMIN'),
	[
		body('role')
			.isIn(['ADMIN', 'USER', 'MUSEUM', 'CREATOR', 'EDITOR'])
			.withMessage('Invalid role'),
	],
	updateUserRole
)

router.delete('/users/:id', authenticateToken, authorize('ADMIN'), deleteUser)

export default router
