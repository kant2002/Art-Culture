// src/routes/userRoutes.js

import express from "express"
import {
  getCreatorById,
  getCreators,
  getCreatorsByLanguage,
  getMuseumById,
  getMuseums,
} from "../controllers/userController.js"

const router = express.Router()

// Route to get all creators
router.get("/creators/language/:language", getCreatorsByLanguage)
router.get("/creators/:id", getCreatorById)
router.get("/creators", getCreators)
router.get("/museums/:id", getMuseumById)
router.get("/museums", getMuseums)

export default router
