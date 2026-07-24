import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, ExternalLink, LogOut, ChevronDown, Gamepad2, Type, BarChart2, LayoutTemplate, Layers } from 'lucide-react';
import { useAuth } from './AuthContext';
import faviconImg from '@/imports/favicon.ico-1.jpg';

export default function AdminShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contentOpen, setContentOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
      isActive 
        ? 'bg-[#C5FF00] text-black' 
        : 'text-white/50 hover:text-white hover:bg-white/5'
    }`;

  const subNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-2.5 ml-4 rounded-xl font-medium text-sm transition-colors ${
      isActive 
        ? 'text-[#C5FF00] bg-[#C5FF00]/10' 
        : 'text-white/50 hover:text-white hover:bg-white/5'
    }`;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#111] border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <img src={faviconImg} alt="Joe Yoke" className="w-8 h-8 rounded-lg object-cover" />
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tight leading-none">Joe Yoke</span>
            <span className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <NavLink to="/admin/dashboard" className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </NavLink>

          <div className="mt-2">
            <button 
              onClick={() => setContentOpen(!contentOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" /> Content
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {contentOpen && (
              <div className="flex flex-col gap-1 mt-1">
                <NavLink to="/admin/content/hero" className={subNavLinkClass}>
                  <LayoutTemplate className="w-4 h-4" /> Hero Section
                </NavLink>
                <NavLink to="/admin/content/about" className={subNavLinkClass}>
                  <Type className="w-4 h-4" /> About
                </NavLink>
                <NavLink to="/admin/content/games" className={subNavLinkClass}>
                  <Gamepad2 className="w-4 h-4" /> Trending Games
                </NavLink>
                {/* NEW CATEGORIES LINK ADDED HERE */}
                <NavLink to="/admin/content/categories" className={subNavLinkClass}>
                  <Layers className="w-4 h-4" /> Game Categories
                </NavLink>
                <NavLink to="/admin/content/stats" className={subNavLinkClass}>
                  <BarChart2 className="w-4 h-4" /> Community Stats
                </NavLink>
                <NavLink to="/admin/content/footer" className={subNavLinkClass}>
                  <LayoutTemplate className="w-4 h-4 rotate-180" /> Footer
                </NavLink>
              </div>
            )}
          </div>

          <NavLink to="/admin/users" className={navLinkClass}>
            <Users className="w-5 h-5" /> Users
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors mb-2">
            <ExternalLink className="w-5 h-5" /> View Site
          </a>
          
          <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#C5FF00]/20 flex items-center justify-center text-[#C5FF00] font-black shrink-0">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-bold truncate">{user?.name}</span>
                <span className="text-[#C5FF00] text-xs font-semibold truncate">{user?.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 text-white/40 hover:text-red-500 transition-colors" title="Log Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}