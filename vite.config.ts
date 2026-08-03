import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

const publicRoutes = [
  '/games',
  '/download',
  '/privacy-policy',
  '/terms',
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
      hostname: 'https://www.joeyoke.com',
      dynamicRoutes: publicRoutes,
      exclude: adminRoutes,
      // Keep sitemap URL values compact. Google Search Console can report
      // "Couldn't fetch" when pretty-printed XML contains extra whitespace.
      readable: false,
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
        '/privacy-policy': 'yearly',
        '/terms': 'yearly',
        '*': 'monthly',
      },
      priority: {
        '/': 1,
        '/games': 0.9,
        '/download': 0.8,
        '/privacy-policy': 0.5,
        '/terms': 0.5,
        '*': 0.7,
      },
    }),
  ],
})
