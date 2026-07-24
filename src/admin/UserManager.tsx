import React, { useState } from 'react';
import { useAuth, ROLE_PERMISSIONS } from './AuthContext';
import { Plus, X, Edit2, Trash2, Shield, Eye, Edit3 } from 'lucide-react';

export default function UserManager() {
  const { users, addUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Default form state
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Viewer' });

  const openModal = (userToEdit?: any) => {
    if (userToEdit) {
      setEditingId(userToEdit.id);
      setFormData({ 
        name: userToEdit.name, 
        email: userToEdit.email, 
        password: userToEdit.password || '', 
        role: userToEdit.role 
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', email: '', password: '', role: 'Viewer' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateUser(editingId, formData);
    } else {
      await addUser(formData as any);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  const roleIcons: Record<string, React.ReactNode> = {
    'Super Admin': <Shield className="w-4 h-4 text-[#C5FF00]" />,
    'Editor': <Edit3 className="w-4 h-4 text-blue-400" />,
    'Viewer': <Eye className="w-4 h-4 text-purple-400" />
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage admin access and roles.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="flex items-center gap-2 bg-[#C5FF00] text-black px-5 py-2.5 rounded-xl font-bold hover:bg-[#d4ff33] transition-colors"
        >
          <Plus className="w-5 h-5" /> Add User
        </button>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-widest text-white/40 uppercase bg-black/20">
                <th className="p-6 font-bold">Name</th>
                <th className="p-6 font-bold">Email</th>
                <th className="p-6 font-bold">Role</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">{u.name}</td>
                  <td className="p-6 text-white/60">{u.email}</td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-white/5 text-white">
                      {roleIcons[u.role] || <Eye className="w-4 h-4" />} {u.role}
                    </span>
                  </td>
                  <td className="p-6 flex justify-end gap-3">
                    <button 
                      onClick={() => openModal(u)} 
                      className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id)} 
                      disabled={u.id === currentUser?.id} 
                      className={`p-2 transition-colors rounded-lg ${u.id === currentUser?.id ? 'text-white/10 cursor-not-allowed' : 'text-red-500/50 hover:text-red-500 hover:bg-red-500/10'}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingId ? 'Edit User' : 'Add User'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors" 
                  placeholder="e.g. Alex Rivera"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Email</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors" 
                  placeholder="user@joeyoke.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Password</label>
                <input 
                  type={editingId ? "password" : "text"} 
                  required={!editingId} 
                  placeholder={editingId ? "Leave blank to keep current password" : "Set a password"} 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Role</label>
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {Object.keys(ROLE_PERMISSIONS).map(role => (
                    <label key={role} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${formData.role === role ? 'border-[#C5FF00] bg-[#C5FF00]/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}>
                      <input 
                        type="radio" 
                        name="role" 
                        value={role} 
                        checked={formData.role === role} 
                        onChange={e => setFormData({...formData, role: e.target.value})} 
                        className="mt-1 accent-[#C5FF00]" 
                      />
                      <div className="flex flex-col">
                        <span className={`font-bold ${formData.role === role ? 'text-white' : 'text-white/70'}`}>{role}</span>
                        <span className="text-xs text-white/40 mt-1 leading-relaxed">{ROLE_PERMISSIONS[role].join(', ')}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-[#C5FF00] text-black py-3 rounded-xl font-bold hover:bg-[#d4ff33] transition-colors shadow-[0_0_15px_rgba(197,255,0,0.3)]">{editingId ? 'Save Changes' : 'Add User'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}