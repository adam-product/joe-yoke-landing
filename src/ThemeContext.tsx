import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'joeyoke_theme'

interface ThemeCtx {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
  toggleDarkMode: () => void
}

const Ctx = createContext<ThemeCtx | null>(null)

function readInitialTheme(): boolean {
  if (typeof window === 'undefined') return false
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return false
}

// Shared across every route (home, /games, /download, …) so switching the
// theme on one page — or navigating between them via "View all", back, etc. —
// keeps the same dark/light mode instead of each page defaulting on its own.
// Persisted to localStorage so it also survives a full page reload.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkModeState] = useState<boolean>(readInitialTheme)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, darkMode ? 'dark' : 'light')
  }, [darkMode])

  const setDarkMode = (v: boolean) => setDarkModeState(v)
  const toggleDarkMode = () => setDarkModeState(prev => !prev)

  return <Ctx.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>{children}</Ctx.Provider>
}

export function useTheme() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
