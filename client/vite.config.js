import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 👈 ensures proper routing on Render static hosting
  plugins: [react()],
})
