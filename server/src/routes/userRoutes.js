// src/routes/userRoutes.js

import express from 'express'
import {
	getCreatorById,
	getCreators,
	getMuseums,
} from '../controllers/userController.js'

const router = express.Router()

// Route to get all creators
router.get('/creators/:id', getCreatorById)
router.get('/creators', getCreators)
router.get('/museums', getMuseums)

export default router
