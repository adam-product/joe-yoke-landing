import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import DownloadPage from './DownloadPage.tsx'
import AllGames from './AllGames.tsx'
import GameDetailPage from './GameDetailPage.tsx'
import Login from './admin/Login.tsx'
import AdminShell from './admin/AdminShell.tsx'
import Dashboard from './admin/Dashboard.tsx'
import UserManager from './admin/UserManager.tsx'
import ContentManager from './admin/ContentManager.tsx'
import GameDetailsManager from './admin/GameDetailsManager.tsx'
import { AuthProvider } from './admin/AuthContext.tsx'
import { ContentProvider } from './admin/ContentContext.tsx'
import { GamesProvider } from './admin/GamesContext.tsx'
import { ThemeProvider } from './ThemeContext.tsx'
import './index.css'

const publicRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/download",
    element: <DownloadPage />,
  },
  {
    path: "/games",
    element: <AllGames />,
  },
  {
    path: "/games/:gameId",
    element: <GameDetailPage />,
  }
]

const adminRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <AdminShell />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <UserManager />
      },
      {
        path: "content/:sectionId",
        element: <ContentManager />
      },
      {
        path: "game-details",
        element: <GameDetailsManager />
      }
    ]
  }
]

const adminHostnames = new Set([
  'admin.joeyoke.com',
  'joeyokeadmin.joeyoke.com',
])

const hostname = window.location.hostname.toLowerCase()
const isAdminHostname = adminHostnames.has(hostname)

const router = isAdminHostname
  ? createBrowserRouter(adminRoutes)
  : createBrowserRouter(publicRoutes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <GamesProvider>
            <RouterProvider router={router} />
          </GamesProvider>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
