import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (!token) return res.sendStatus(401) // Unauthorized

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) return res.sendStatus(403) // Forbidden
		console.log('Decoded token:', decoded)

		if (!decoded || !decoded.id) {
			return res.status(400).json({ error: 'Invalid token structure' })
		}
		try {
			const user = await prisma.user.findUnique({ where: { id: decoded.id } })
			if (!user) return res.sendStatus(404) // Not Found

			req.user = user // Attach user to request
			next()
		} catch (error) {
			console.error('Auth error;', error)
			return res.status(403).json({ error: 'Invalid token' })
		}
	})
}

export default authenticateToken
