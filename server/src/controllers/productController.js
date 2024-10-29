import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

export const createProduct = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const {
			title_en,
			title_uk,
			description_en,
			description_uk,
			specs_en,
			specs_uk,
		} = req.body
		const userId = req.user.id

		console.log('reg.user', req.user)

		const images = req.files.map(file => ({
			imageUrl: `../../uploads/productImages/${file.filename}`,
		}))

		const product = await prisma.product.create({
			data: {
				title_en,
				title_uk,
				description_en,
				description_uk,
				specs_en,
				specs_uk,
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

export const getProductById = async (req, res, next) => {
	try {
		const productId = parseInt(req.params.productId, 10)
		if (isNaN(productId)) {
			return res.status(400).json({ error: 'Invalid product ID' })
		}

		const product = await prisma.product.findUnique({
			where: { id: productId },
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

		if (!product) {
			return res.status(404).json({ error: 'Product not found' })
		}

		res.json({ product })
	} catch (error) {
		console.error('Error fetching product by ID:', error)
		next(error)
	}
}

export const getUserProducts = async (req, res, next) => {
	try {
		const userId = req.user.id

		console.log('getUserProducts - req.user:', req.user)

		const products = await prisma.product.findMany({
			where: {
				authorId: userId,
			},
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
		console.error('Error fetching user products:', error)
		next(error)
	}
}

export const getCreatorProducts = async (req, res, next) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				author: {
					role: 'CREATOR',
				},
			},
			include: {
				images: true,
				author: {
					select: {
						id: true,
						email: true,
						title: true,
						role: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})
		res.json({ products })
	} catch (error) {
		console.error('Error fetching creator products', error)
		next(error)
	}
}

export const getProductByAuthorId = async (req, res, next) => {
	try {
		const authorId = parseInt(req.params.authorId, 10)
		if (isNaN(authorId)) {
			return res.status(400).json({ error: 'invalid product id' })
		}
		const products = await prisma.product.findMany({
			where: {
				authorId: authorId,
			},
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
			orderBy: {
				createdAt: 'desc',
			},
		})

		if (!products || products.length === 0) {
			return res.status(404).json({ error: 'Products not found' })
		}

		res.json({ products }) // Wrap products in an object
	} catch (error) {
		console.error('Error fetching products by author ID:', error)
		next(error)
	}
}
