import { PrismaClient } from "@prisma/client"
import logger from "../utils/logging.js"
const prisma = new PrismaClient()

export const likeEntity = async (req, res) => {
  try {
    const { entityId, entityType } = req.body
    const userId = req.user.userId

    if (!["post", "product", "exhibition", "user"].includes(entityType)) {
      return res.status(400).json({ error: "Invalid entity type" })
    }

    const field = `${entityType}Id`

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        [field]: entityId,
      },
    })

    if (existingLike) {
      return res.status(400).json({ error: "Already liked" })
    }

    const newLike = await prisma.like.create({
      data: {
        userId,
        [field]: entityId,
      },
    })

    res.status(200).json(newLike)
  } catch (error) {
    logger.error("Error liking", error)
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." })
  }
}

//*Unlike an entity
export const unlikeEntity = async (req, res) => {
  try {
    const { entityId, entityType } = req.body
    const userId = req.user.userId

    const field = `${entityType}Id`

    await prisma.like.deleteMany({
      where: {
        userId,
        [field]: entityId,
      },
    })

    res.status(200).json({ message: "Unliked successfully" })
  } catch (error) {
    logger.error("Error unliking", error)
    res
      .status(500)
      .json({ error: "An unexpected error occurred. Please try again later." })
  }
}

//* Get top liked entities
export const getTopLikedEntities = async (req, res) => {
  try {
    const { entityType, limit = 10 } = req.query // limit: max results

    const field = `${entityType}Id`

    const topEntities = await prisma.like.groupBy({
      by: [field],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: Number(limit),
    })

    res.json({ topEntities })
  } catch (error) {
    console.error("Error fetching top liked entities:", error)
    res.status(500).json({ error: "Failed to fetch top liked entities" })
  }
}
