import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to local network
    port: 5173,
    allowedHosts: ['qualityjudge.onrender.com', 'localhost'], // Add the allowed hosts here
  },
});
