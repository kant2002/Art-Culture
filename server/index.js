import express from 'express'
import helmet from 'helmet'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5173
const WP_BACKEND_URL = 'https://art.playukraine.com/'

const addHeadersMiddleware = (req, res, next) => {
	// Set CORS headers
	res.header('Access-Control-Allow-Origin', '*') // Allow all origins
	res.header(
		'Access-Control-Allow-Headers',
		'Authorization, X-WP-Nonce, Content-Type, Authorization'
	) // Allow specific headers
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Allow specific methods

	const jwt = req.headers['authorization'] // Retrieve JWT from request authorization
	const wpNonce = req.headers['x-wp-nonce'] // Retrieve WordPress nonce from request headers

	if (jwt) {
		req.headers['authorization'] = jwt
	}

	if (wpNonce) {
		req.headers['x-wp-nonce'] = wpNonce
	}

	if (req.method === 'OPTIONS') {
		return res.sendStatus(200)
	}

	next()
}

app.use(helmet())

app.use(
	addHeadersMiddleware,
	createProxyMiddleware({
		target: WP_BACKEND_URL,
		changeOrigin: true,
		logLevel: 'debug',
	})
)

app.use(
	'/wp-admin',
	createProxyMiddleware({ target: WP_BACKEND_URL, changeOrigin: true })
)
app.use(
	'/wp-login.php',
	createProxyMiddleware({ target: WP_BACKEND_URL, changeOrigin: true })
)
app.use(
	'/wp-content',
	createProxyMiddleware({ target: WP_BACKEND_URL, changeOrigin: true })
)
app.use(
	'/wp-includes',
	createProxyMiddleware({ target: WP_BACKEND_URL, changeOrigin: true })
)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './dist')))

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
