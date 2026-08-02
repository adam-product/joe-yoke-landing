import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Sun, Moon, Gamepad2, Flame } from 'lucide-react'
import { useGames, badgeColor, type GameEntry } from './admin/GamesContext'
import { useContent } from './admin/ContentContext'
import { useTheme } from './ThemeContext'
import { fallbackGameImage } from './gameAssets'
import logoNavLight from '@/imports/logo-nav-light.png'
import logoNavDark from '@/imports/logo-nav-dark.png'

// Images are matched to games by creation order (id 1 → first image, id 2 → second, …),
// mirroring exactly how the homepage's Trending Games section maps them. Using
// `Number(id) % length` (the old logic) shifts everything by one slot once ids
// start at 1 instead of 0 — that was the source of the mismatched photos.
const ease = [0.16, 1, 0.3, 1] as const

// Raw brand lime (#C5FF00) reads great on the dark theme but is nearly
// invisible as text against the light off-white background. Use a darker
// olive tone for lime-colored text specifically in light mode.
const LIME_LIGHT_TEXT = '#5C7A00'

const BADGE_OPTIONS = ['All', 'STRATEGY', 'CUE SPORTS', 'BOARD', 'PARTY', 'ACTION', 'PUZZLE', 'SPORTS', 'TRIVIA']

function plainText(value: unknown, fallback: string): string {
  const text = String(value ?? '').replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim()
  return text || fallback
}

function normalizePlayNowDestination(value: unknown): string {
  const destination = plainText(value, '/download')

  if (destination.startsWith('/') && !destination.startsWith('//')) {
    return destination
  }

  try {
    const url = new URL(destination)
    if (url.protocol === 'https:' || url.protocol === 'http:') {
      return url.toString()
    }
  } catch {
    // Invalid or unsafe destinations fall back to the local download page.
  }

  return '/download'
}

// Same magnetic-pull micro-interaction used elsewhere on the site, so buttons
// feel consistent between the landing page and this one.
function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  return (
    <motion.div
      ref={ref}
      onMouseMove={e => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        setOffset({ x: (e.clientX - (rect.left + rect.width / 2)) * strength, y: (e.clientY - (rect.top + rect.height / 2)) * strength })
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

function GameCard({ game, dark, playNowLabel, onPlayNow, size = 'normal' }: { game: GameEntry; dark: boolean; playNowLabel: string; onPlayNow: () => void; size?: 'normal' | 'spotlight' }) {
  const accent = badgeColor(game.badge)
  const img = fallbackGameImage(game)
  const spotlight = size === 'spotlight'
  void dark

  return (
    <div
      className="group rounded-[24px] p-[2.5px] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl h-full"
      style={{ background: `linear-gradient(135deg, ${accent}35 0%, transparent 60%)`, boxShadow: `0 0 0 1px ${accent}20` }}
    >
      <div
        className="relative rounded-[22px] overflow-hidden bg-[#111111] h-full"
        style={{ minHeight: spotlight ? 420 : 280 }}
      >
        <img
          src={img}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${accent} 0%, transparent 70%)` }} />

        <div className="absolute top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 flex items-start justify-between z-10">
          <span
            className={`px-2.5 py-0.5 rounded-full font-bold tracking-widest uppercase backdrop-blur-sm ${spotlight ? 'text-xs' : 'text-[10px]'}`}
            style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}38` }}
          >
            {game.badge}
          </span>
          {game.featured && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C5FF00]/20 text-[#C5FF00] font-bold tracking-wide border border-[#C5FF00]/30 backdrop-blur-sm ${spotlight ? 'text-xs' : 'text-[10px]'}`}>
              <Flame className={spotlight ? 'w-3.5 h-3.5' : 'w-3 h-3'} aria-hidden /> TRENDING
            </span>
          )}
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 z-10 ${spotlight ? 'px-6 pb-6 pt-16 md:px-8 md:pb-8' : 'px-4 pb-4 pt-8'}`}
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,8,10,0.85) 40%, rgba(8,8,10,0.96) 100%)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)' }} />
          <h3 className={`relative text-white font-black tracking-tight leading-tight mb-1.5 ${spotlight ? 'text-2xl md:text-4xl' : 'text-lg'}`}>{game.title}</h3>
          <p className={`relative text-white/50 leading-relaxed ${spotlight ? 'text-sm md:text-base max-w-md mb-4' : 'text-xs line-clamp-2 mb-0'}`}>{game.description}</p>
          <Magnetic strength={spotlight ? 0.15 : 0.1}>
            <button
              type="button"
              onClick={onPlayNow}
              className={`relative flex items-center justify-center gap-2 rounded-xl font-bold transition-all ${spotlight ? 'mt-1 px-6 py-2.5 text-sm w-fit' : 'mt-3 w-full px-4 py-2.5 text-xs'}`}
              style={{ background: `${accent}1c`, color: accent, border: `1px solid ${accent}40` }}
            >
              <span>{playNowLabel}</span> <ArrowUpRight className={spotlight ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
            </button>
          </Magnetic>
        </div>
      </div>
    </div>
  )
}

export default function AllGames() {
  const navigate = useNavigate()
  const { games } = useGames()
  const { get } = useContent()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const { darkMode, toggleDarkMode } = useTheme()
  const playNowLabel = plainText(get('playNow', 'label'), 'Play Now')
  const playNowDestination = normalizePlayNowDestination(get('playNow', 'destination'))

  const handlePlayNow = () => {
    if (playNowDestination.startsWith('/')) {
      navigate(playNowDestination)
      return
    }

    window.location.assign(playNowDestination)
  }

  const filtered = games.filter(g => {
    const matchBadge = filter === 'All' || g.badge === filter
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.badge.toLowerCase().includes(search.toLowerCase())
    return matchBadge && matchSearch
  })

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    games.forEach(g => { counts[g.badge] = (counts[g.badge] ?? 0) + 1 })
    return counts
  }, [games])

  const showSpotlight = filter === 'All' && !search
  const spotlightGame = showSpotlight ? (games.find(g => g.featured) ?? games[0]) : undefined
  const gridGames = spotlightGame ? filtered.filter(g => g.id !== spotlightGame.id) : filtered

  const categoryCount = new Set(games.map(g => g.badge)).size

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${darkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#F8F9FA] text-[#1A1A1A]'}`}>
      {/* Ambient background glow, matches the brand's lime/dark aesthetic */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: darkMode ? 'rgba(197,255,0,0.06)' : 'rgba(197,255,0,0.12)' }} />
        <div className="absolute top-1/3 -right-40 w-[420px] h-[420px] rounded-full blur-[120px]" style={{ background: darkMode ? 'rgba(96,165,250,0.05)' : 'rgba(96,165,250,0.08)' }} />
      </div>

      {/* ── Header ── */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${darkMode ? 'bg-[#0A0A0A]/90 border-white/6' : 'bg-[#F8F9FA]/90 border-black/6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 transition-colors text-sm font-semibold ${darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            aria-label="Go to Joe Yoke home"
            className={`flex items-center gap-2 ml-2 rounded-lg transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5FF00] ${darkMode ? 'text-white/70' : 'text-[#1A1A1A]/70'}`}
          >
            <img src={darkMode ? logoNavLight : logoNavDark} alt="Joe Yoke" className="w-6 h-6 rounded-lg object-cover" />
            <span className="font-black text-sm tracking-tighter uppercase">Joe Yoke</span>
          </button>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden sm:flex items-center">
            <Search className={`absolute left-3 w-3.5 h-3.5 pointer-events-none ${darkMode ? 'text-white/30' : 'text-[#1A1A1A]/30'}`} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search games…"
              className={`pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:border-[#C5FF00]/40 w-52 transition-all focus:w-64 border ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25' : 'bg-black/5 border-black/10 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30'}`}
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all ml-4 ${darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'}`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{darkMode ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
        {/* Title + stat chips */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className={`flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase ${darkMode ? 'text-[#C5FF00]/80' : ''}`} style={darkMode ? undefined : { color: LIME_LIGHT_TEXT }}>
              <Gamepad2 className="w-3.5 h-3.5" /> Game Library
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-3">
              All Games
            </h1>
            <p className={darkMode ? 'text-white/40 text-lg' : 'text-[#1A1A1A]/70 text-lg'}>
              {games.length} game{games.length !== 1 ? 's' : ''} — play anything, connect with everyone.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 shrink-0">
            {[{ label: 'Games', value: games.length }, { label: 'Categories', value: categoryCount }, { label: 'Trending', value: games.filter(g => g.featured).length }].map(stat => (
              <div
                key={stat.label}
                className={`rounded-2xl px-4 py-3 md:px-5 md:py-3.5 border text-center min-w-[84px] ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/[0.03] border-black/10'}`}
              >
                <div className="text-xl md:text-2xl font-black tracking-tight leading-none" style={{ color: darkMode ? '#C5FF00' : LIME_LIGHT_TEXT }}>{stat.value}</div>
                <div className={`text-[10px] font-semibold tracking-wide uppercase mt-1 ${darkMode ? 'text-white/35' : 'text-[#1A1A1A]/60'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search (mobile) */}
        <div className="relative flex items-center sm:hidden mb-6">
          <Search className={`absolute left-3 w-3.5 h-3.5 pointer-events-none ${darkMode ? 'text-white/30' : 'text-[#1A1A1A]/30'}`} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search games…"
            className={`pl-9 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-[#C5FF00]/40 w-full border ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25' : 'bg-black/5 border-black/10 text-[#1A1A1A] placeholder:text-[#1A1A1A]/30'}`}
          />
        </div>

        {/* Badge filter pills */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {BADGE_OPTIONS.filter(b => b === 'All' || games.some(g => g.badge === b)).map(b => {
            const color = b === 'All' ? (darkMode ? '#C5FF00' : LIME_LIGHT_TEXT) : badgeColor(b)
            const active = filter === b
            const count = b === 'All' ? games.length : categoryCounts[b] ?? 0
            const inactiveBg = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
            const inactiveText = darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,26,0.65)'
            const inactiveBorder = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
            return (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all"
                style={{
                  background: active ? `${color}20` : inactiveBg,
                  color: active ? color : inactiveText,
                  border: `1px solid ${active ? color + '50' : inactiveBorder}`,
                }}
              >
                {b}
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] leading-none"
                  style={{ background: active ? `${color}25` : 'rgba(128,128,128,0.15)' }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-24 gap-4 rounded-3xl border ${darkMode ? 'text-white/30 border-white/10 bg-white/[0.02]' : 'text-[#1A1A1A]/35 border-black/10 bg-black/[0.02]'}`}>
            <span className="text-5xl">🎮</span>
            <p className="text-lg font-semibold">No games found</p>
            <p className="text-sm">Try a different filter or search term</p>
          </div>
        ) : (
          <>
            {/* Spotlight banner — only when browsing the unfiltered library */}
            {spotlightGame && (
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease }}
                className="mb-6"
              >
                <GameCard game={spotlightGame} dark={darkMode} playNowLabel={playNowLabel} onPlayNow={handlePlayNow} size="spotlight" />
              </motion.div>
            )}

            {gridGames.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {gridGames.map((game, i) => (
                  <motion.div
                    key={game.id}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                  >
                    <GameCard game={game} dark={darkMode} playNowLabel={playNowLabel} onPlayNow={handlePlayNow} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bottom CTA strip, echoes the footer's magnetic button pattern */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className={`mt-16 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-[#0A0A0A]'}`}
        >
          <div>
            <div className="text-2xl md:text-3xl font-black tracking-tighter text-white leading-tight">Can't find your game?</div>
            <p className="text-white/40 text-sm md:text-base mt-1">Get the app for the full lineup, updated weekly.</p>
          </div>
          <Magnetic>
            <button
              onClick={() => navigate('/download')}
              className="group flex items-center gap-3 bg-[#C5FF00] text-[#1A1A1A] rounded-full pl-6 pr-2 py-2.5 font-bold text-sm hover:bg-[#d4ff33] transition-colors w-fit shrink-0"
            >
              Download App
              <span className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <ArrowRight className="w-4 h-4 text-[#C5FF00]" />
              </span>
            </button>
          </Magnetic>
        </motion.div>
      </main>
    </div>
  )
}
