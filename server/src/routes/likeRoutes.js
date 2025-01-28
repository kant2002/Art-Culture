import express from "express"
import {
  getLikeCount,
  getLikeStatus,
  getTopLikedEntities,
  likeEntity,
  unlikeEntity,
} from "../controllers/likeController.js"
import authenticateToken from "../middleware/authMiddleware.js"

const router = express.Router()

//* Route to like an entity
router.post("/", authenticateToken, likeEntity)
router.delete("/unlike", authenticateToken, unlikeEntity)
router.get("/top-liked", getTopLikedEntities)
router.get("/status", authenticateToken, getLikeStatus)
router.get("/count", getLikeCount)

export default router
