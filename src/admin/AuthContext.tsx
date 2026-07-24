import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Initialize Supabase Client
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

const DEFAULT_USERS = [
  { id: '1', name: 'Alex Rivera', email: 'admin@joeyoke.com', password: 'password', role: 'Super Admin' }
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  'Super Admin': ['view_dashboard', 'edit_content', 'manage_users', 'view_analytics'],
  'Editor': ['view_dashboard', 'edit_content', 'view_analytics'],
  'Viewer': ['view_dashboard', 'view_analytics']
};

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  permissions?: string[];
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  can: (permission: string) => boolean;
  addUser: (user: User) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load all users from Supabase on mount
    async function fetchUsers() {
      const { data } = await supabase
        .from('kv_store_dd2dc34e')
        .select('value')
        .eq('key', 'site_users')
        .maybeSingle();

      if (data?.value) {
        setUsers(data.value);
      } else {
        // Initialize default admin if no users exist in database
        setUsers(DEFAULT_USERS);
        await supabase.from('kv_store_dd2dc34e').upsert({ key: 'site_users', value: DEFAULT_USERS });
      }
    }
    fetchUsers();

    // Check local storage to keep user logged in on refresh
    const savedUser = localStorage.getItem('joeyoke_admin_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Helper to persist user list updates to Supabase
  const syncUsers = async (newUsers: User[]) => {
    setUsers(newUsers);
    await supabase.from('kv_store_dd2dc34e').upsert({ key: 'site_users', value: newUsers });
  };

  const login = async (email: string, pass: string) => {
    // Always fetch fresh users from DB right before login to catch newly added accounts
    const { data } = await supabase.from('kv_store_dd2dc34e').select('value').eq('key', 'site_users').maybeSingle();
    const currentUsers = data?.value || users;
    
    const foundUser = currentUsers.find((u: User) => u.email === email && u.password === pass);
    if (foundUser) {
      const loggedInUser = { ...foundUser, permissions: ROLE_PERMISSIONS[foundUser.role] || [] };
      setUser(loggedInUser);
      localStorage.setItem('joeyoke_admin_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('joeyoke_admin_user');
  };

  const can = (permission: string) => {
    return user?.permissions?.includes(permission) || false;
  };

  const addUser = async (newUser: User) => {
    const updatedUsers = [...users, { ...newUser, id: Date.now().toString() }];
    await syncUsers(updatedUsers);
  };

  const updateUser = async (id: string, updatedFields: Partial<User>) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, ...updatedFields } : u);
    await syncUsers(updatedUsers);
    
    // Update active session if editing your own account
    if (user?.id === id) {
        const freshUser = { ...user, ...updatedFields, permissions: ROLE_PERMISSIONS[updatedFields.role || user.role] };
        setUser(freshUser);
        localStorage.setItem('joeyoke_admin_user', JSON.stringify(freshUser));
    }
  };

  const deleteUser = async (id: string) => {
    const updatedUsers = users.filter(u => u.id !== id);
    await syncUsers(updatedUsers);
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, can, addUser, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};