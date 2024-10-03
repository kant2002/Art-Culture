// import { PrismaClient } from '@prisma/client'
// import jwt from 'jsonwebtoken'

// const prisma = new PrismaClient()

// const authenticateToken = async (req, res, next) => {
// 	const authHeader = req.headers['authorization']
// 	const token = authHeader && authHeader.split(' ')[1]

// 	if (!authHeader) {
// 		return res.status(401).json({ error: 'Access token is missing' })
// 	}

// 	if (!token) return res.sendStatus(401)

// 	if (!token) {
// 		return res.status(401).json({ error: 'Access token not found' })
// 	} // Unauthorized

// 	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
// 		if (err) return res.sendStatus(403) // Forbidden
// 		console.log('Decoded token:', decoded)

// 		if (!decoded || !decoded.id) {
// 			return res.status(400).json({ error: 'Invalid token structure' })
// 		}
// 		const user = await prisma.user.findUnique({
// 			where: { id: decoded.id },
// 			select: {
// 				id: true,
// 				email: true,
// 				role: true,
// 				// Include any other fields you need
// 			},
// 		})

// 		try {
// 			const user = await prisma.user.findUnique({ where: { id: decoded.id } })
// 			if (!user) return res.sendStatus(404) // Not Found

// 			req.user = user
// 			// Attach user to request
// 			next()
// 		} catch (error) {
// 			console.error('Auth error;', error)
// 			return res.status(403).json({ error: 'Invalid token' })
// 		}
// 	})
// }

// export default authenticateToken

// src/middleware/authMiddleware.js

import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!authHeader || !token) {
		return res.status(401).json({ error: 'Access token is missing' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log('Decoded token:', decoded)

		if (!decoded || !decoded.id) {
			return res.status(400).json({ error: 'Invalid token structure' })
		}

		// Fetch user from the database
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
			select: {
				id: true,
				email: true,
				role: true,
				// Include any other fields you need
			},
		})

		if (!user) {
			return res.status(404).json({ error: 'User not found' })
		}

		req.user = user // Attach the full user object to req.user
		next()
	} catch (error) {
		console.error('Auth error:', error)
		return res.status(403).json({ error: 'Invalid token' })
	}
	console.log('authenticateToken - req.user:', req.user)
}

export default authenticateToken
