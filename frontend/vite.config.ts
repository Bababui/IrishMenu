import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Two separate pages: the guest page and the admin panel.
    // Guests never download the admin code.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        admin: resolve(import.meta.dirname, 'admin.html'),
      },
    },
  },
  server: {
    // During development, send every /api/... request on to the Python backend.
    // The browser thinks it's talking to the same site, so no CORS setup is needed.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
