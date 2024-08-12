import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: [`**/*.ttf`],
	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
			cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
		},
	},
})
