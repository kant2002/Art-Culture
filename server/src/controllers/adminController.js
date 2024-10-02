import { PrismaClient } from '@prisma/client'
import { validationResult } from 'express-validator'

const prisma = new PrismaClient()

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				role: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		res.json(users)
	} catch (error) {
		next(error)
	}
}

export const updateUserRole = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const userId = parseInt(req.params.id)
		const { role } = req.body
		if (userId === req.user.id && role !== 'ADMIN') {
			return res
				.status(400)
				.json({ error: 'Admin cannot change your own role' })
		}

		const user = await prisma.user.update({
			where: { id: userId },
			data: { role },
			select: { id: true, email: true, role: true },
		})

		res.json(user)
	} catch (error) {
		if (error.code === 'P2025') {
			return res.status(404).json({ error: 'User not found' })
		}
		next(error)
	}
}
export const deleteUser = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id)

		if (userId === req.user.id) {
			return res.status(400).json({ error: 'Admin cannot delete own account' })
		}

		await prisma.user.delete({ where: { id: userId } })

		res.json({ message: 'User deleted successfully' })
	} catch (error) {
		if (error.code === 'P2025') {
			return res.status(404).json({ error: 'User not found' })
		}
		next(error)
	}
}
