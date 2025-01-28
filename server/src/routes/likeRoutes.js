import express from "express"
import {
  getTopLikedEntities,
  likeEntity,
  unlikeEntity,
} from "../controllers/likeController.js"
import authenticateToken from "../middleware/authMiddleware.js"

const router = express.Router()

//* Route to like an entity
router.post("/like", authenticateToken, likeEntity)
router.post("/unlike", authenticateToken, unlikeEntity)
router.get("/top-liked", getTopLikedEntities)

export default router
