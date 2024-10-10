// src/controllers/userController.js

import prisma from '../../prismaClient.js'

export const getCreators = async (req, res, next) => {
	try {
		const creators = await prisma.user.findMany({
			where: {
				role: 'CREATOR',
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
		console.error('Error fetching creators:', error)
		next(error)
	}
}

export const getMuseums = async (req, res, next) => {
	try {
		const museums = await prisma.user.findMany({
			where: {
				role: 'MUSEUM',
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

		res.json({ museums })
	} catch (error) {
		console.error('Error fetching museums:', error)
		next(error)
	}
}
