import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../../utils/supabase/info'

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey)
const GAMES_STORAGE_KEY = 'site_games'

export interface GameGuideStep {
  id: string
  title: string
  description: string
  imageUrl: string
}

export interface GameEntry {
  id: string
  badge: string
  title: string
  description: string
  imageUrl: string
  featured: boolean
  showInTrending: boolean
  showDetails: boolean
  howToPlay: GameGuideStep[]
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

const guide = (gameId: string, steps: Array<[string, string]>): GameGuideStep[] =>
  steps.map(([title, description], index) => ({
    id: `${gameId}-step-${index + 1}`,
    title,
    description,
    imageUrl: '',
  }))

const DEFAULT_GAMES: GameEntry[] = [
  {
    id: '1', badge: 'STRATEGY', title: 'Chess', featured: true, showInTrending: true, showDetails: true, imageUrl: '',
    description: 'Plan every move. Outthink your opponent across the most iconic strategy game ever made.',
    howToPlay: guide('1', [
      ['Set up the board', 'Place the pieces in their starting positions with the queen on her matching color. White always moves first.'],
      ['Move and capture', 'Move one piece per turn according to its movement rules. Capture an opposing piece by moving onto its square.'],
      ['Checkmate the king', 'Attack the opposing king so it has no legal move, block, or capture available. That position wins the game.'],
    ]),
  },
  {
    id: '2', badge: 'CUE SPORTS', title: 'Snooker', featured: true, showInTrending: true, showDetails: true, imageUrl: '',
    description: 'Precision, patience, and power. Pot balls and dominate the table against friends worldwide.',
    howToPlay: guide('2', [
      ['Break from the D', 'Start with the cue ball inside the D and strike a red ball to open the frame.'],
      ['Alternate reds and colors', 'Pot a red for one point, then nominate and pot a colored ball for its assigned value.'],
      ['Clear the colors', 'After all reds are gone, pot the colors in value order from yellow through black. Highest score wins.'],
    ]),
  },
  {
    id: '3', badge: 'BOARD', title: 'Carrom', featured: true, showInTrending: true, showDetails: true, imageUrl: '',
    description: 'Flick, aim, and pocket. The classic board game reimagined for fast online multiplayer.',
    howToPlay: guide('3', [
      ['Place the striker', 'Position the striker on your baseline without crossing the diagonal arrows.'],
      ['Pocket your pieces', 'Flick the striker to pocket all pieces of your assigned color while avoiding fouls.'],
      ['Cover the queen', 'After pocketing the red queen, pocket one of your own pieces on the next shot to cover it and secure the points.'],
    ]),
  },
  {
    id: '4', badge: 'PARTY', title: "Liar's Dice", featured: true, showInTrending: true, showDetails: true, imageUrl: '',
    description: 'Bluff your way to victory. Roll, bet, and deceive — the last one with dice standing wins.',
    howToPlay: guide('4', [
      ['Roll in secret', 'Every player rolls their dice and keeps the result hidden from the other players.'],
      ['Make a bid', 'Bid how many dice of a chosen face you believe exist across every player’s hidden dice.'],
      ['Raise or challenge', 'Raise the previous bid or call liar. Reveal the dice; the incorrect player loses a die. Last player with dice wins.'],
    ]),
  },
]

function normalizeGame(value: Partial<GameEntry>, index: number): GameEntry {
  const id = String(value.id ?? index + 1)
  const defaultGame = DEFAULT_GAMES.find(game => game.id === id)
  const steps = Array.isArray(value.howToPlay) ? value.howToPlay : defaultGame?.howToPlay ?? []

  return {
    id,
    badge: String(value.badge ?? defaultGame?.badge ?? 'GAME'),
    title: String(value.title ?? defaultGame?.title ?? `Game ${index + 1}`),
    description: String(value.description ?? defaultGame?.description ?? ''),
    imageUrl: String(value.imageUrl ?? ''),
    featured: value.featured ?? defaultGame?.featured ?? false,
    showInTrending: value.showInTrending ?? defaultGame?.showInTrending ?? true,
    showDetails: value.showDetails ?? defaultGame?.showDetails ?? true,
    howToPlay: steps.map((step, stepIndex) => ({
      id: String(step.id ?? `${id}-step-${stepIndex + 1}`),
      title: String(step.title ?? `Step ${stepIndex + 1}`),
      description: String(step.description ?? ''),
      imageUrl: String(step.imageUrl ?? ''),
    })),
  }
}

interface GamesCtx {
  games: GameEntry[]
  loading: boolean
  addGame: (game: Omit<GameEntry, 'id'>) => Promise<void>
  updateGame: (id: string, patch: Partial<Omit<GameEntry, 'id'>>) => Promise<void>
  deleteGame: (id: string) => Promise<void>
}

const Ctx = createContext<GamesCtx | null>(null)

export function GamesProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<GameEntry[]>(DEFAULT_GAMES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadGames = async () => {
      const { data, error } = await supabase
        .from('kv_store_dd2dc34e')
        .select('value')
        .eq('key', GAMES_STORAGE_KEY)
        .maybeSingle()

      if (!active) return
      if (error) console.error('Unable to load games:', error.message)
      if (Array.isArray(data?.value) && data.value.length > 0) {
        setGames(data.value.map(normalizeGame))
      }
      setLoading(false)
    }

    loadGames()

    const channel = supabase
      .channel('site-games-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kv_store_dd2dc34e', filter: `key=eq.${GAMES_STORAGE_KEY}` },
        (payload: any) => {
          if (Array.isArray(payload.new?.value)) {
            setGames(payload.new.value.map(normalizeGame))
          }
        },
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  const persistGames = async (nextGames: GameEntry[]) => {
    const previousGames = games
    setGames(nextGames)

    const { error } = await supabase
      .from('kv_store_dd2dc34e')
      .upsert({ key: GAMES_STORAGE_KEY, value: nextGames })

    if (error) {
      setGames(previousGames)
      throw new Error(error.message)
    }
  }

  const addGame = async (game: Omit<GameEntry, 'id'>) => {
    await persistGames([...games, { ...game, id: String(Date.now()) }])
  }

  const updateGame = async (id: string, patch: Partial<Omit<GameEntry, 'id'>>) => {
    await persistGames(games.map(game => game.id === id ? { ...game, ...patch } : game))
  }

  const deleteGame = async (id: string) => {
    await persistGames(games.filter(game => game.id !== id))
  }

  return <Ctx.Provider value={{ games, loading, addGame, updateGame, deleteGame }}>{children}</Ctx.Provider>
}

export function useGames() {
  const context = useContext(Ctx)
  if (!context) throw new Error('useGames must be inside GamesProvider')
  return context
}
