import express from 'express'
import {
	createExhibitions,
	getAllExhibitions,
	getExhibitionById,
	getMyExhibitions,
} from '../controllers/exhibitionController.js'
import authenticateToken from '../middleware/authMiddleware.js'
import uploadExhibition from '../middleware/exhibitionImageUploader.js'
import authorize from '../middleware/roleMIddleware.js'

const router = express.Router()

router.post(
	'/',

	authenticateToken,
	authorize('MUSEUM', 'CREATOR', 'ADMIN'),
	uploadExhibition.array('exhibitionImages', 10),
	// [
	// 	body('title').notEmpty().withMessage('Title is required'),
	// 	body('description').notEmpty().withMessage('Description is required'),
	// 	body('location').notEmpty().withMessage('Location is required'),
	// 	body('artistIds').isArray().withMessage('Artist must be an array'),
	// ],

	createExhibitions
)

router.get('/', getAllExhibitions)
router.get(
	'/my-exhibitions',
	authenticateToken,

	getMyExhibitions
)
router.get('/:id', getExhibitionById)

export default router
