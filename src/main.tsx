import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import DownloadPage from './DownloadPage.tsx'
import Login from './admin/Login.tsx'
import AdminShell from './admin/AdminShell.tsx'
import Dashboard from './admin/Dashboard.tsx'
import UserManager from './admin/UserManager.tsx'
import ContentManager from './admin/ContentManager.tsx'
import { AuthProvider } from './admin/AuthContext.tsx'
import { ContentProvider } from './admin/ContentContext.tsx'
import { GamesProvider } from './admin/GamesContext.tsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/download",
    element: <DownloadPage />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin",
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
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ContentProvider>
        <GamesProvider>
          <RouterProvider router={router} />
        </GamesProvider>
      </ContentProvider>
    </AuthProvider>
  </StrictMode>,
)