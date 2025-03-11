import express from "express"
import { body } from "express-validator"
import {
  approvePost,
  approveProduct,
  deleteUser,
  getAllUsers,
  getPendingCounts,
  getPendingPosts,
  getPendingProducts,
  rejectPost,
  rejectProduct,
  updateUserRole,
} from "../controllers/adminController.js"
import authenticateToken from "../middleware/authMiddleware.js"
import authorize from "../middleware/roleMIddleware.js"

const router = express.Router()

router.get("/users", authenticateToken, authorize("ADMIN"), getAllUsers)

router.get(
  "/pending-counts",
  authenticateToken,
  authorize("ADMIN"),
  getPendingCounts,
)

router.get(
  "/pending-posts",
  authenticateToken,
  authorize("ADMIN"),
  getPendingPosts,
)

router.get(
  "/pending-products",
  authenticateToken,
  authorize("ADMIN"),
  getPendingProducts,
)

router.patch(
  "/posts/:id/approve",
  authenticateToken,
  authorize("ADMIN"),
  approvePost,
)
router.patch(
  "/posts/:id/reject",
  authenticateToken,
  authorize("ADMIN"),
  rejectPost,
)

router.patch(
  "/products/:id/approve",
  authenticateToken,
  authorize("ADMIN"),
  approveProduct,
)
router.patch(
  "/products/:id/reject",
  authenticateToken,
  authorize("ADMIN"),
  rejectProduct,
)

router.put(
  "/users/:id/role",
  authenticateToken,
  authorize("ADMIN"),
  [
    body("role")
      .isIn(["ADMIN", "USER", "MUSEUM", "CREATOR", "EDITOR"])
      .withMessage("Invalid role"),
  ],
  updateUserRole,
)

router.delete("/users/:id", authenticateToken, authorize("ADMIN"), deleteUser)

export default router
