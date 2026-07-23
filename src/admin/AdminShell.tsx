import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FileEdit, Users, LogOut, ExternalLink,
  Menu, X, ChevronRight, ChevronDown, Film, Gamepad2, BarChart3, Type, Footprints,
} from 'lucide-react'
import { useAuth, ROLE_PERMISSIONS } from './AuthContext'
import faviconImg from '@/imports/favicon.ico-1.jpg'

const CONTENT_SECTIONS = [
  { id: 'hero',    label: 'Hero Section',      icon: Film },
  { id: 'about',   label: 'About',             icon: Type },
  { id: 'games',   label: 'Trending Games',    icon: Gamepad2 },
  { id: 'stats',   label: 'Community Stats',   icon: BarChart3 },
  { id: 'footer',  label: 'Footer',            icon: Footprints },
]

const ROLE_COLOR: Record<string, string> = {
  super_admin: '#C5FF00',
  editor: '#60a5fa',
  viewer: '#a78bfa',
}

export default function AdminShell() {
  const { user, logout, can } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(location.pathname.startsWith('/admin/content'))

  const handleLogout = () => { logout(); navigate('/admin') }
  const isContentActive = location.pathname.startsWith('/admin/content')

  const Sidebar = () => (
    <aside className="flex flex-col h-full bg-[#0D0D0D] border-r border-white/8 w-60 shrink-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-3">
          <img src={faviconImg} alt="Joe Yoke" className="w-8 h-8 rounded-xl object-cover shrink-0" />
          <div>
            <p className="text-sm font-black text-white tracking-tight">Joe Yoke</p>
            <p className="text-xs text-white/30">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        {/* Dashboard */}
        {can('view_dashboard') && (
          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive ? 'bg-[#C5FF00] text-[#0A0A0A]' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                Dashboard
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </>
            )}
          </NavLink>
        )}

        {/* Content — expandable */}
        {can('edit_content') && (
          <div>
            <button
              onClick={() => setContentExpanded(e => !e)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isContentActive ? 'text-white bg-white/8' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileEdit className="w-4 h-4 shrink-0" />
              Content
              <span className="ml-auto">
                {contentExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            </button>

            {contentExpanded && (
              <div className="ml-3 mt-0.5 pl-3 border-l border-white/8 flex flex-col gap-0.5">
                {CONTENT_SECTIONS.map(({ id, label, icon: Icon }) => (
                  <NavLink
                    key={id}
                    to={`/admin/content/${id}`}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive ? 'bg-[#C5FF00] text-[#0A0A0A]' : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users */}
        {can('manage_users') && (
          <NavLink
            to="/admin/users"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive ? 'bg-[#C5FF00] text-[#0A0A0A]' : 'text-white/50 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Users className="w-4 h-4 shrink-0" />
                Users
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </>
            )}
          </NavLink>
        )}

        <div className="mt-auto pt-3 border-t border-white/8">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/40 hover:text-white hover:bg-white/5 transition-all"
          >
            <ExternalLink className="w-4 h-4" /> View Site
          </a>
        </div>
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-white/8 shrink-0">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
            style={{ background: `${ROLE_COLOR[user?.role ?? 'viewer']}20`, color: ROLE_COLOR[user?.role ?? 'viewer'] }}
          >
            {user?.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs truncate capitalize" style={{ color: ROLE_COLOR[user?.role ?? 'viewer'] }}>
              {user?.role?.replace('_', ' ')}
            </p>
          </div>
          <button onClick={handleLogout} className="p-1 rounded-lg text-white/25 hover:text-red-400 transition-colors" title="Log out">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2 px-1">
          {ROLE_PERMISSIONS[user?.role ?? 'viewer'].map(p => (
            <span key={p} className="text-[10px] text-white/25 bg-white/4 rounded-md px-1.5 py-0.5 font-medium">
              {p.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex text-white">
      <div className="hidden md:flex flex-col sticky top-0 h-screen">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex flex-col h-full">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#0D0D0D] sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-white/8 text-white/60">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-sm font-bold text-white">Joe Yoke Admin</span>
        </div>
        <main className="flex-1 p-5 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
