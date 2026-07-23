import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import App from './App'
import './index.css'
import Login from './admin/Login'
import AdminShell from './admin/AdminShell'
import Dashboard from './admin/Dashboard'
import ContentManager from './admin/ContentManager'
import UserManager from './admin/UserManager'
import { AuthProvider, useAuth } from './admin/AuthContext'
import { GamesProvider } from './admin/GamesContext'
import { ContentProvider } from './admin/ContentContext'
// SiteSettingsContext removed — replaced by ContentContext
import AllGames from './AllGames'

function ProtectedRoute({ children, permission }: { children: React.ReactNode; permission?: string }) {
  const { user, can } = useAuth()
  if (!user) return <Navigate to="/admin" replace />
  if (permission && !can(permission)) return <Navigate to="/admin/dashboard" replace />
  return <>{children}</>
}

function Root() {
  return (
    <React.StrictMode>
      <ContentProvider>
      <GamesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/games" element={<AllGames />} />
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/*" element={<ProtectedRoute><AdminShell /></ProtectedRoute>}>
                <Route path="dashboard" element={<ProtectedRoute permission="view_dashboard"><Dashboard /></ProtectedRoute>} />
                <Route path="content" element={<Navigate to="/admin/content/hero" replace />} />
                <Route path="content/:sectionId" element={<ProtectedRoute permission="edit_content"><ContentManager /></ProtectedRoute>} />
                <Route path="users" element={<ProtectedRoute permission="manage_users"><UserManager /></ProtectedRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </GamesProvider>
      </ContentProvider>
    </React.StrictMode>
  )
}

const container = document.getElementById('root')!

// Store the root on the DOM node itself — survives HMR module re-execution
// because the DOM element persists, but is cleared on a full page reload.
type RootContainer = HTMLElement & { __reactRoot?: ReactDOM.Root }
const node = container as RootContainer
if (!node.__reactRoot) {
  node.__reactRoot = ReactDOM.createRoot(container)
}
node.__reactRoot.render(<Root />)
