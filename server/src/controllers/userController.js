// src/controllers/userController.js

import prisma from "../../prismaClient.js"
import logger from "../utils/logging.js"

export const getCreators = async (req, res, next) => {
  try {
    const creators = await prisma.user.findMany({
      where: {
        role: "CREATOR",
      },
      select: {
        id: true,
        email: true,
        title: true,
        bio: true,
        images: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({ creators })
  } catch (error) {
    logger.error("Error fetching creators:", error)
    next(error)
  }
}

export const getCreatorById = async (req, res, next) => {
  try {
    const creatorId = parseInt(req.params.id, 10)
    if (isNaN(creatorId)) {
      return res.status(400).json({ error: "invalid creator id" })
    }

    const creator = await prisma.user.findUnique({
      where: { id: creatorId },
      include: {
        products: {
          include: {
            images: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!creator || creator.role !== "CREATOR") {
      return res.status(404).json({ error: "Creator not found" })
    }
    res.json({ creator })
  } catch (error) {
    logger.error("Error fetch data creator id", error)
    next(error)
  }
}

export const getMuseums = async (req, res, next) => {
  try {
    const museums = await prisma.user.findMany({
      where: {
        role: "MUSEUM",
      },
      select: {
        id: true,
        email: true,
        title: true,
        bio: true,
        images: true,
        createdAt: true,
        updatedAt: true,
        lat: true,
        lon: true,
        country: true,
        city: true,
        street: true,
        house_number: true,
        postcode: true,
        museum_logo_image: {
          select: {
            imageUrl: true,
          },
        },
      },
    })

    res.json({ museums })
  } catch (error) {
    logger.error("Error fetching museums:", error)
    next(error)
  }
}
export const getMuseumById = async (req, res, next) => {
  try {
    const museumId = parseInt(req.params.id, 10)
    if (isNaN(museumId)) {
      return res.status(400).json({ error: "invalid museum id" })
    }

    const museum = await prisma.user.findUnique({
      where: { id: museumId },
      include: {
        museum_logo_image: true,
        products: {
          include: {
            images: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!museum || museum.role !== "MUSEUM") {
      return res.status(404).json({ error: "Museum not found" })
    }
    res.json({ museum })
  } catch (error) {
    logger.error("Error fetch data creator id", error)
    next(error)
  }
}
