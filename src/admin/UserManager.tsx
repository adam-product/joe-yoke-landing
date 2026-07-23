import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, Shield, Eye, Edit3 } from 'lucide-react'
import { useAuth, type Role, ROLE_PERMISSIONS, MOCK_USERS } from './AuthContext'

const ROLE_META: Record<Role, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  super_admin: { label: 'Super Admin', color: '#C5FF00', bg: 'rgba(197,255,0,0.1)', icon: Shield },
  editor: { label: 'Editor', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', icon: Edit3 },
  viewer: { label: 'Viewer', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: Eye },
}

const ALL_PERMISSIONS = ['view_dashboard', 'edit_content', 'manage_users', 'view_analytics']

interface UserRow {
  id: string; name: string; email: string; role: Role; avatar: string; status: 'active' | 'inactive'
}

const initialUsers: UserRow[] = MOCK_USERS.map(u => ({ ...u, status: 'active' as const }))

function RoleBadge({ role }: { role: Role }) {
  const m = ROLE_META[role]
  const Icon = m.icon
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold" style={{ color: m.color, background: m.bg }}>
      <Icon className="w-3 h-3" />{m.label}
    </span>
  )
}

function UserModal({ user, onSave, onClose }: {
  user: Partial<UserRow> | null; onSave: (u: UserRow) => void; onClose: () => void
}) {
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [role, setRole] = useState<Role>(user?.role ?? 'viewer')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const isEdit = !!user?.id

  const save = () => {
    if (!name || !email) return
    if (!isEdit && !password) return
    onSave({
      id: user?.id ?? String(Date.now()),
      name, email, role,
      avatar: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      status: 'active',
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-bold text-white">{user?.id ? 'Edit User' : 'Add User'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-white/40"><X className="w-4 h-4" /></button>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5FF00]/50" placeholder="e.g. Alex Rivera" />
          </div>
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5FF00]/50" placeholder="user@joeyoke.com" />
          </div>
          {/* Password — required for new users, optional for edits */}
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">
              Password {isEdit && <span className="normal-case text-white/20">(leave blank to keep current)</span>}
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={isEdit ? '••••••••' : 'Set a password'}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 pr-10 text-sm text-white focus:outline-none focus:border-[#C5FF00]/50 placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPw
                  ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Role</label>
            <div className="flex flex-col gap-2">
              {(Object.keys(ROLE_META) as Role[]).map(r => {
                const m = ROLE_META[r]
                const Icon = m.icon
                const perms = ROLE_PERMISSIONS[r]
                return (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${role === r ? 'border-[#C5FF00]/40 bg-[#C5FF00]/5' : 'border-white/8 hover:border-white/15'}`}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: m.bg }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{m.label}</p>
                      <p className="text-xs text-white/35 mt-0.5">{perms.join(', ')}</p>
                    </div>
                    {role === r && <Check className="w-4 h-4 text-[#C5FF00] shrink-0 mt-1" />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-semibold hover:bg-white/5 transition-colors">Cancel</button>
          <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-[#C5FF00] text-[#0A0A0A] text-sm font-bold hover:bg-[#d4ff33] transition-colors">
            {user?.id ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function UserManager() {
  const { can, user: me } = useAuth()
  const [users, setUsers] = useState<UserRow[]>(initialUsers)
  const [editingUser, setEditingUser] = useState<Partial<UserRow> | null>(null)
  const [showModal, setShowModal] = useState(false)
  const canManage = can('manage_users')

  const openAdd = () => { setEditingUser({}); setShowModal(true) }
  const openEdit = (u: UserRow) => { setEditingUser(u); setShowModal(true) }

  const saveUser = (u: UserRow) => {
    setUsers(prev => {
      const idx = prev.findIndex(x => x.id === u.id)
      if (idx >= 0) { const next = [...prev]; next[idx] = u; return next }
      return [...prev, u]
    })
  }

  const deleteUser = (id: string) => {
    if (id === me?.id) return
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">User Management</h1>
          <p className="text-white/40 text-sm mt-1">Roles & access control</p>
        </div>
        {canManage && (
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-[#C5FF00] text-[#0A0A0A] rounded-xl text-sm font-bold hover:bg-[#d4ff33] transition-colors">
            <Plus className="w-4 h-4" /> Add User
          </button>
        )}
      </div>

      {/* Permissions matrix */}
      <div className="bg-[#111111] border border-white/8 rounded-2xl p-5">
        <h2 className="text-sm font-bold text-white mb-4">Role Permissions Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-white/40 font-semibold tracking-widest uppercase pb-3 pr-6">Permission</th>
                {(Object.keys(ROLE_META) as Role[]).map(r => (
                  <th key={r} className="text-center pb-3 px-4">
                    <RoleBadge role={r} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ALL_PERMISSIONS.map(perm => (
                <tr key={perm}>
                  <td className="py-3 pr-6 text-white/60 font-medium capitalize">{perm.replace(/_/g, ' ')}</td>
                  {(Object.keys(ROLE_META) as Role[]).map(r => (
                    <td key={r} className="py-3 px-4 text-center">
                      {ROLE_PERMISSIONS[r].includes(perm)
                        ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C5FF00]/15"><Check className="w-3 h-3 text-[#C5FF00]" /></span>
                        : <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5"><X className="w-3 h-3 text-white/20" /></span>
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User table */}
      <div className="bg-[#111111] border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/8">
          <h2 className="text-sm font-bold text-white">All Users ({users.length})</h2>
        </div>
        <div className="divide-y divide-white/5">
          {users.map(u => {
            const isMe = u.id === me?.id
            return (
              <div key={u.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-[#C5FF00]/15 flex items-center justify-center text-xs font-black text-[#C5FF00] shrink-0">
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{u.name}</p>
                    {isMe && <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">You</span>}
                  </div>
                  <p className="text-xs text-white/40 truncate">{u.email}</p>
                </div>
                <RoleBadge role={u.role} />
                <button
                  onClick={() => canManage && toggleStatus(u.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    u.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-white/5 text-white/30'
                  } ${canManage ? 'cursor-pointer hover:opacity-70' : 'cursor-default'}`}
                >
                  {u.status}
                </button>
                {canManage && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-white/8 text-white/30 hover:text-white transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteUser(u.id)}
                      disabled={isMe}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {showModal && (
        <UserModal user={editingUser} onSave={saveUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
