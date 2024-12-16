// src/routes/userRoutes.js

import express from "express"
import {
  getCreatorById,
  getCreators,
  getMuseumById,
  getMuseums,
} from "../controllers/userController.js"

const router = express.Router()

// Route to get all creators
router.get("/museums/:id", getMuseumById)
router.get("/creators/:id", getCreatorById)
router.get("/creators", getCreators)
router.get("/museums", getMuseums)

export default router
