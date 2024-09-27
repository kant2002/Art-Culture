const errorHandler = (err, req, res, next) => {
	console.error(err.stack)

	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	}
	res.status(500).json({
		error: 'An unexpected error occurred. Please try again later.',
	})
}

export default errorHandler
