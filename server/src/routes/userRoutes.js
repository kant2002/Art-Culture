// src/routes/userRoutes.js

import express from 'express'
import { getCreators, getMuseums } from '../controllers/userController.js'

const router = express.Router()

// Route to get all creators
router.get('/creators', getCreators)
router.get('/museums', getMuseums)

export default router
