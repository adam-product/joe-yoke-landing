import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

const publicRoutes = [
  '/games',
  '/download',
  '/games/1',
  '/games/2',
  '/games/3',
  '/games/4',
]

const adminRoutes = [
  '/admin',
  '/dashboard',
  '/users',
  '/content',
  '/game-details',
]

// Standard Vite config without the missing Figma plugins
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://joeyoke.com',
      dynamicRoutes: publicRoutes,
      exclude: adminRoutes,
      readable: true,
      generateRobotsTxt: true,
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: adminRoutes,
        },
      ],
      changefreq: {
        '/': 'weekly',
        '/games': 'weekly',
        '/download': 'monthly',
        '*': 'monthly',
      },
      priority: {
        '/': 1,
        '/games': 0.9,
        '/download': 0.8,
        '*': 0.7,
      },
    }),
  ],
})
