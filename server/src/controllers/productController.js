import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

export const createProduct = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { title, description, specs } = req.body
		const userId = req.user.id

		console.log('reg.user', req.user)

		const images = req.files.map(file => ({
			imageUrl: `../../uploads/productImages/${file.filename}`,
		}))

		const product = await prisma.product.create({
			data: {
				title,
				description,
				specs,
				images: {
					create: images,
				},
				author: { connect: { id: userId } },
			},
			include: {
				images: true,
			},
		})

		res.status(201).json({ product, message: 'Product created successfully' })
	} catch (error) {
		console.error('Error creating product:', error)
		next(error)
	}
}
export const getProducts = async (req, res, next) => {
	try {
		const products = await prisma.product.findMany({
			include: {
				images: true,
				author: {
					select: {
						id: true,
						email: true,
						title: true,
					},
				},
			},
		})
		res.json({ products })
	} catch (error) {
		console.error('Error fetching products:', error)
		next(error)
	}
	console.log('createProduct - req.user:', req.user)
}
