import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/UPS-Digital-E2E-Experience-2.0/',
  plugins: [react()],
})
