import express from 'express'
import {
	searchAuthors,
	searchPainting,
} from '../controllers/searchController.js'
import authenticateToken from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/authors', authenticateToken, searchAuthors)
router.get('/paintings', authenticateToken, searchPainting)

export default router