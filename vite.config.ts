import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Mengatasi masalah EPERM di Windows dengan OneDrive
  cacheDir: 'node_modules/.vite',
  server: {
    fs: {
      strict: false,
    },
  },
})

