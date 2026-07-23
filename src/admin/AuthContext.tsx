import { createContext, useContext, useState, type ReactNode } from 'react'

export type Role = 'super_admin' | 'editor' | 'viewer'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
}

const MOCK_USERS: (AdminUser & { password: string })[] = [
  { id: '1', name: 'Alex Rivera', email: 'admin@joeyoke.com', password: 'admin123', role: 'super_admin', avatar: 'AR' },
  { id: '2', name: 'Sam Chen', email: 'editor@joeyoke.com', password: 'editor123', role: 'editor', avatar: 'SC' },
  { id: '3', name: 'Jordan Lee', email: 'viewer@joeyoke.com', password: 'viewer123', role: 'viewer', avatar: 'JL' },
]

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  super_admin: ['view_dashboard', 'edit_content', 'manage_users', 'view_analytics'],
  editor: ['view_dashboard', 'edit_content', 'view_analytics'],
  viewer: ['view_dashboard', 'view_analytics'],
}

interface AuthCtx {
  user: AdminUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
  can: (permission: string) => boolean
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)

  const login = (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (found) {
      const { password: _, ...adminUser } = found
      void _
      setUser(adminUser)
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  const can = (permission: string) => {
    if (!user) return false
    return ROLE_PERMISSIONS[user.role].includes(permission)
  }

  return <Ctx.Provider value={{ user, login, logout, can }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

export { MOCK_USERS }
