import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	assetsInclude: [`**/*.ttf`],
	css: {
		preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
				silenceDeprecations: ["import"]
            }
		}
	},	
	server: {
		https: {
			key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
			cert: fs.readFileSync(path.resolve(__dirname, 'server.cert')),
		},
		proxy: {
			'/api': {
				target: 'https://localhost:5173/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
		esbuild: {
			minifyIdentifiers: false,
		},
		build: {
			sourcemap: true,
		},
	},
})
