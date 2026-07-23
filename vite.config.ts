import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Standard Vite config without the missing Figma plugins
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})