import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createHead, UnheadProvider } from '@unhead/react/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App.tsx'
import DownloadPage from './DownloadPage.tsx'
import AllGames from './AllGames.tsx'
import GameDetailPage from './GameDetailPage.tsx'
import { PrivacyPolicyPage, TermsPage } from './LegalPages.tsx'
import Login from './admin/Login.tsx'
import AdminShell from './admin/AdminShell.tsx'
import Dashboard from './admin/Dashboard.tsx'
import UserManager from './admin/UserManager.tsx'
import ContentManager from './admin/ContentManager.tsx'
import GameDetailsManager from './admin/GameDetailsManager.tsx'
import SupportManager from './admin/SupportManager.tsx'
import SupportChatWidget from './SupportChatWidget.tsx'
import { AuthProvider } from './admin/AuthContext.tsx'
import { ContentProvider } from './admin/ContentContext.tsx'
import { GamesProvider } from './admin/GamesContext.tsx'
import { ThemeProvider } from './ThemeContext.tsx'
import Seo from './Seo.tsx'
import './index.css'

const head = createHead()

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
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/terms",
    element: <TermsPage />,
  }
]

const adminRoutes = [
  {
    path: "/",
    element: (
      <>
        <Seo title="Joe Yoke Admin" description="Joe Yoke website administration." path="/" noIndex />
        <Login />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Seo title="Joe Yoke Admin" description="Joe Yoke website administration." path="/" noIndex />
        <AdminShell />
      </>
    ),
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
      },
      {
        path: "support",
        element: <SupportManager />
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
    <UnheadProvider head={head}>
      <ThemeProvider>
        <AuthProvider>
          <ContentProvider>
            <GamesProvider>
              <RouterProvider router={router} />
              {!isAdminHostname && <SupportChatWidget />}
              {!isAdminHostname && <Analytics />}
              {!isAdminHostname && <SpeedInsights />}
            </GamesProvider>
          </ContentProvider>
        </AuthProvider>
      </ThemeProvider>
    </UnheadProvider>
  </StrictMode>,
)
