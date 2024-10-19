import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createExhibitions = async (req, res, next) => {
	try {
		// Manual validation
		const errors = []
		const { title, description, startDate, endDate, time, location } = req.body
		let { artistIds } = req.body

		if (!title) errors.push({ msg: 'Title is required' })
		if (!description) errors.push({ msg: 'Description is required' })
		if (!location) errors.push({ msg: 'Location is required' })

		if (!artistIds) {
			errors.push({ msg: 'Artist IDs are required' })
		} else {
			if (!Array.isArray(artistIds)) {
				artistIds = [artistIds]
			}
			artistIds = artistIds.map(id => parseInt(id, 10))
			if (artistIds.some(isNaN)) {
				errors.push({ msg: 'All artist IDs must be valid numbers' })
			}
		}

		if (errors.length > 0) {
			return res.status(400).json({ errors })
		}

		const userId = req.user.id

		console.log('Request Body:', req.body)
		console.log('Uploaded Files:', req.files)
		console.log('Received artistIds:', artistIds) // For debugging

		const images = req.files.map(file => ({
			imageUrl: `../../uploads/exhibitionsImages/${file.filename}`,
		}))

		const creators = await prisma.user.findMany({
			where: {
				id: { in: artistIds },
				role: 'CREATOR',
			},
		})

		if (creators.length !== artistIds.length) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Invalid artist IDs provided' }] })
		}

		const exhibition = await prisma.exhibition.create({
			data: {
				title,
				description,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				time,
				location,
				images: {
					create: images,
				},
				createdBy: { connect: { id: userId } },
				exhibitionArtists: {
					create: artistIds.map(artistId => ({
						artist: { connect: { id: artistId } },
					})),
				},
			},
			include: {
				images: true,
				exhibitionArtists: {
					include: {
						artist: true,
					},
				},
			},
		})

		res
			.status(201)
			.json({ exhibition, message: 'Exhibition created successfully' })
	} catch (error) {
		console.error('Error creating exhibition:', error)
		next(error)
	}
}

export const getAllExhibitions = async (req, res, next) => {
	try {
		const exhibitions = await prisma.exhibition.findMany({
			include: {
				images: true,
				createdBy: {
					select: {
						id: true,
						email: true,
						title: true,
						// description: true,
						// startDate: true,
						// endDate: true,
						// time: true,
						// location: true,
						// artistIds: true,
					},
				},
				exhibitionArtists: {
					include: {
						artist: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		res.json({ exhibitions })
	} catch (error) {
		console.error('Error fetching exhibitions:', error)
		next(error)
	}
}

export const getExhibitionById = async (req, res, next) => {
	try {
		const exhibitionId = parseInt(req.params.id)

		const exhibition = await prisma.exhibition.findUnique({
			where: { id: exhibitionId },
			include: {
				images: true,
				createdBy: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				exhibitionArtists: {
					include: {
						artist: true,
					},
				},
			},
		})

		// const exhibition = await prisma.exhibition.findUnique({
		// 	where: { id: exhibitionId },
		// 	include: {
		// 		author: {
		// 			select: {
		// 				id: true,
		// 				title: true,
		// 				description: true,
		// 				startDate: true,
		// 				endDate: true,
		// 				time: true,
		// 				location: true,
		// 			},
		// 		},
		// 	},
		// })

		if (!exhibition) return res.status(404).json({ error: 'Post not found' })

		res.json(exhibition)
	} catch (error) {
		console.error('Error fetching post:', error)
		next(error)
	}
}

export const updateExhibition = async (req, res, next) => {
	try {
		const { id } = req.params
		const {
			title,
			description,
			startDate,
			endDate,
			time,
			location,
			artistIds,
		} = req.body
		const userId = req.user.id

		// Verify ownership
		const exhibition = await prisma.exhibition.findUnique({
			where: { id: parseInt(id) },
		})
		if (!exhibition)
			return res.status(404).json({ error: 'Exhibition not found' })
		if (exhibition.createdById !== userId)
			return res.status(403).json({ error: 'Unauthorized' })

		// Update exhibition
		const updatedExhibition = await prisma.exhibition.update({
			where: { id: parseInt(id) },
			data: {
				title,
				description,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
				time,
				location,
				// Update artists if provided
				...(artistIds && {
					exhibitionArtists: {
						deleteMany: {}, // Remove existing relations
						create: artistIds.map(artistId => ({
							artist: { connect: { id: artistId } },
						})),
					},
				}),
			},
			include: {
				images: true,
				createdBy: true,
				exhibitionArtists: {
					include: {
						artist: true,
					},
				},
			},
		})

		res.json(updatedExhibition)
	} catch (error) {
		console.error('Error updating exhibition:', error)
		next(error)
	}
}

export const deleteExhibition = async (req, res, next) => {
	try {
		const { id } = req.params
		const userId = req.user.id

		// Verify ownership
		const exhibition = await prisma.exhibition.findUnique({
			where: { id: parseInt(id) },
		})
		if (!exhibition)
			return res.status(404).json({ error: 'Exhibition not found' })
		if (exhibition.createdById !== userId)
			return res.status(403).json({ error: 'Unauthorized' })

		// Delete exhibition
		await prisma.exhibition.delete({ where: { id: parseInt(id) } })

		res.json({ message: 'Exhibition deleted successfully' })
	} catch (error) {
		console.error('Error deleting exhibition:', error)
		next(error)
	}
}

// In exhibitionController.js

export const getMyExhibitions = async (req, res, next) => {
	try {
		const userId = req.user.id

		const exhibitions = await prisma.exhibition.findMany({
			where: { createdById: userId },
			include: {
				images: true,
				createdBy: {
					select: {
						id: true,
						email: true,
						title: true,
						bio: true,
					},
				},
				exhibitionArtists: {
					include: {
						artist: {
							select: {
								id: true,

								email: true,
								title: true,
								bio: true,
							},
						},
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		res.json({ exhibitions })
	} catch (error) {
		console.error('Error fetching exhibitions:', error)
		next(error)
	}
}
