import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:  '0.0.0.0', // or use '0.0.0.0' to expose to local network
    port: 3000,
  },
})
