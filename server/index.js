import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 5173
const WP_BACKEND_URL = 'https://admin.playukraine.com/'

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
