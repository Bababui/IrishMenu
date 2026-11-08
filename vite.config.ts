import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // During development, send every /api/... request on to the Python backend.
    // The browser thinks it's talking to the same site, so no CORS setup is needed.
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
})
