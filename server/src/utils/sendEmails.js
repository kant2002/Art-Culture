import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text) => {
	// Configure transporter
	const transporter = nodemailer.createTransport({
		service: 'Gmail', // Use your email service
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	})

	// Email options
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	}

	// Send email
	await transporter.sendMail(mailOptions)
}

export default sendEmail
