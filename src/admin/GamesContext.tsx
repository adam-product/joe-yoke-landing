import { createContext, useContext, useState, ReactNode } from 'react'

export interface GameEntry {
  id: string
  badge: string
  title: string
  description: string
  imageUrl: string
  featured: boolean
}

// Badge → accent color
export const BADGE_COLORS: Record<string, string> = {
  'STRATEGY': '#60a5fa',
  'CUE SPORTS': '#34d399',
  'BOARD': '#fb923c',
  'PARTY': '#f87171',
  'ACTION': '#a78bfa',
  'PUZZLE': '#fbbf24',
  'SPORTS': '#38bdf8',
  'TRIVIA': '#e879f9',
}

export function badgeColor(badge: string): string {
  return BADGE_COLORS[badge.toUpperCase()] ?? '#C5FF00'
}

const DEFAULT_GAMES: GameEntry[] = [
  { id: '1', badge: 'STRATEGY', title: 'Chess', featured: true, imageUrl: '', description: 'Plan every move. Outthink your opponent across the most iconic strategy game ever made.' },
  { id: '2', badge: 'CUE SPORTS', title: 'Snooker', featured: true, imageUrl: '', description: 'Precision, patience, and power. Pot balls and dominate the table against friends worldwide.' },
  { id: '3', badge: 'BOARD', title: 'Carrom', featured: true, imageUrl: '', description: 'Flick, aim, and pocket. The classic board game reimagined for fast online multiplayer.' },
  { id: '4', badge: 'PARTY', title: "Liar's Dice", featured: true, imageUrl: '', description: "Bluff your way to victory. Roll, bet, and deceive — the last one with dice standing wins." },
]

interface GamesCtx {
  games: GameEntry[]
  addGame: (g: Omit<GameEntry, 'id'>) => void
  updateGame: (id: string, patch: Partial<Omit<GameEntry, 'id'>>) => void
  deleteGame: (id: string) => void
}

const Ctx = createContext<GamesCtx | null>(null)

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<GameEntry[]>(DEFAULT_GAMES)

  const addGame = (g: Omit<GameEntry, 'id'>) =>
    setGames(prev => [...prev, { ...g, id: String(Date.now()) }])

  const updateGame = (id: string, patch: Partial<Omit<GameEntry, 'id'>>) =>
    setGames(prev => prev.map(g => g.id === id ? { ...g, ...patch } : g))

  const deleteGame = (id: string) =>
    setGames(prev => prev.filter(g => g.id !== id))

  return <Ctx.Provider value={{ games, addGame, updateGame, deleteGame }}>{children}</Ctx.Provider>
}

export function useGames() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useGames must be inside GamesProvider')
  return ctx
}
