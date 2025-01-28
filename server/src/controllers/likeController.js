import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const likeEntity = async (req, res) => {
  try {
    console.log("Request body:", req.body)
    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      console.error("User not authenticated.")
      return res.status(401).json({ error: "User not authenticated" })
    }

    const { entityId, entityType } = req.body
    const userId = req.user.id // Extract userId from authenticated user

    // Validate entityType
    if (!["post", "product", "exhibition", "user"].includes(entityType)) {
      console.error("Invalid entity type:", entityType)
      return res.status(400).json({ error: "Invalid entity type" })
    }

    const field = `${entityType}Id`

    // Check if the user has already liked the entity
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        [field]: entityId,
      },
    })

    if (existingLike) {
      console.warn("Entity already liked by this user.")
      return res.status(400).json({ error: "Already liked" })
    }

    // Create a new like entry
    const newLike = await prisma.like.create({
      data: {
        userId,
        [field]: entityId,
      },
    })

    res.status(200).json(newLike)
  } catch (error) {
    console.error("Error liking entity:", error)
    res.status(500).json({ error: "Failed to like entity" })
  }
}

//*Unlike an entity
export const unlikeEntity = async (req, res) => {
  try {
    const { entityId, entityType } = req.body
    const userId = req.user.id

    if (!["post", "product", "exhibition", "userId"].includes(entityType)) {
      return res.status(400).json({ error: "Invalid entity type" })
    }

    const field = `${entityType}Id`

    await prisma.like.deleteMany({
      where: {
        userId,
        [field]: parseInt(entityId, 10),
      },
    })

    res.status(200).json({ message: "Successfully unliked" })
  } catch (error) {
    console.error("Error unliking entity:", error)
    res.status(500).json({ error: "Failed to unlike entity" })
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

export const getLikeStatus = async (req, res) => {
  try {
    const { entityId, entityType } = req.query
    const userId = req.user.id ? req.user.id : null //* Allow unauthenticated users

    if (
      !entityId ||
      entityType ||
      !["post", "product", "exhibition", "user"].includes(entityType)
    ) {
      return res.status(400).json({ error: "Invalid entity type" })
    }

    const field = `${entityType}Id`
    const likeCount = await prisma.like.count({
      where: { [field]: parseInt(entityId, 10) },
    })

    let liked = false
    if (userId) {
      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          [field]: parseInt(entityId, 10),
        },
      })
      liked = !!existingLike
    }

    res.status(200).json({
      liked,
      likeCount,
    })
  } catch (error) {
    console.error("Error fetching like status:", error)
    res.status(500).json({ error: "Failed to fetch like status" })
  }
}

export const getLikeCount = async (req, res) => {
  try {
    const { entityId, entityType } = req.query

    if (
      !entityId ||
      !entityType ||
      !["post", "product", "exhibition", "user"].includes(entityType)
    ) {
      return res.status(400).json({ error: "Invalid or missing parameters" })
    }

    const field = `${entityType}Id`
    const count = await prisma.like.count({
      where: { [field]: parseInt(entityId, 10) },
    })

    res.status(200).json({ likeCount: count })
  } catch (error) {
    console.error("Error fetching like count:", error)
    res.status(500).json({ error: "Failed to fetch like count" })
  }
}
