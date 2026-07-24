import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import faviconImg from '@/imports/favicon.ico-1.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Attempt Login
    const success = await login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <img src={faviconImg} alt="Joe Yoke" className="w-12 h-12 rounded-xl mb-4 object-cover" />
          <h1 className="text-2xl font-black text-white">Joe Yoke Admin</h1>
          <p className="text-white/50 text-sm">Sign in to your dashboard</p>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
                {error}
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white focus:outline-none focus:border-[#C5FF00] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C5FF00] text-black font-bold py-3 rounded-xl mt-2 hover:bg-[#d4ff33] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}