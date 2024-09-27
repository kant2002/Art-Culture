import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import prisma from '../../prismaClient.js'
import generateToken from '../utils/generateToken.js'
import sendEmail from '../utils/sendEmails.js'

export const register = async (req, res, next) => {
	try {
		// Handle Validation Errors
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password, images } = req.body

		// Check if user exists
		const existingUser = await prisma.user.findUnique({ where: { email } })
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' })
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create user
		await prisma.user.create({
			data: { email, password: hashedPassword, images },
		})

		res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		next(error)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// Find user
		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) return res.status(401).json({ error: 'Invalid credentials' })

		// Compare passwords
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword)
			return res.status(401).json({ error: 'Invalid credentials' })

		// Generate token
		const token = generateToken(user.id)

		const { password: pwd, ...userWithoutPassword } = user

		res.json({ token, user: userWithoutPassword })
	} catch (error) {
		next(error)
	}
}

export const resetPassword = async (req, res, next) => {
	try {
		const { email } = req.body

		// Find user
		const user = await prisma.user.findUnique({ where: { email } })
		if (!user) return res.status(404).json({ error: 'User not found' })

		// Generate reset token
		const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		})

		// Update user with reset token and expiry
		await prisma.user.update({
			where: { email },
			data: {
				resetToken,
				resetTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
			},
		})

		// Send reset email
		const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`
		await sendEmail(
			user.email,
			'Password Reset Request',
			`Click the link to reset your password: ${resetLink}`
		)

		res.json({ message: 'Password reset link sent to email' })
	} catch (error) {
		next(error)
	}
}

export const resetPasswordConfirm = async (req, res, next) => {
	try {
		const { token } = req.params
		const { newPassword } = req.body

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const userId = decoded.id

		// Find user
		const user = await prisma.user.findUnique({ where: { id: userId } })
		if (!user) return res.status(404).json({ error: 'User not found' })

		// Check if token matches and is not expired
		if (user.resetToken !== token || user.resetTokenExpiry < new Date()) {
			return res.status(400).json({ error: 'Invalid or expired token' })
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10)

		// Update password and remove reset token
		await prisma.user.update({
			where: { id: userId },
			data: {
				password: hashedPassword,
				resetToken: null,
				resetTokenExpiry: null,
			},
		})

		res.json({ message: 'Password reset successful' })
	} catch (error) {
		if (error.name === 'JsonWebTokenError') {
			return res.status(400).json({ error: 'Invalid token' })
		}
		next(error)
	}
}
// Add the following controller method
export const getCurrentUser = async (req, res, next) => {
	try {
		const user = req.user // Attached by authenticateToken middleware
		const { password, ...userWithoutPassword } = user
		res.json({ user: userWithoutPassword })
	} catch (error) {
		next(error)
	}
}
