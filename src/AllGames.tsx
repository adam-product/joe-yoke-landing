import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Search, Sun, Moon } from 'lucide-react'
import { useGames, badgeColor } from './admin/GamesContext'
import gameImg1 from '@/imports/photo_2026-07-23_20-54-30.jpg'
import gameImg2 from '@/imports/photo_2026-07-23_20-54-27.jpg'
import gameImg3 from '@/imports/photo_2026-07-23_20-54-21.jpg'
import gameImg4 from '@/imports/photo_2026-07-23_20-54-19.jpg'
import faviconImg from '@/imports/favicon.ico-1.jpg'

const FALLBACK_IMAGES = [gameImg1, gameImg2, gameImg3, gameImg4]

const ease = [0.16, 1, 0.3, 1] as const

const BADGE_OPTIONS = ['All', 'STRATEGY', 'CUE SPORTS', 'BOARD', 'PARTY', 'ACTION', 'PUZZLE', 'SPORTS', 'TRIVIA']

export default function AllGames() {
  const navigate = useNavigate()
  const { games } = useGames()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [darkMode, setDarkMode] = useState(false)

  const filtered = games.filter(g => {
    const matchBadge = filter === 'All' || g.badge === filter
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) || g.badge.toLowerCase().includes(search.toLowerCase())
    return matchBadge && matchSearch
  })

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#F8F9FA] text-[#1A1A1A]'}`}>
      {/* ── Header ── */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${darkMode ? 'bg-[#0A0A0A]/90 border-white/6' : 'bg-[#F8F9FA]/90 border-black/6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className={`flex items-center gap-2 transition-colors text-sm font-semibold ${darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2 ml-2">
            <img src={faviconImg} alt="Joe Yoke" className="w-6 h-6 rounded-lg object-cover" />
            <span className={`font-black text-sm tracking-tighter uppercase ${darkMode ? 'text-white/70' : 'text-[#1A1A1A]/70'}`}>Joe Yoke</span>
          </div>

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
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-all ml-4 ${darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'}`}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{darkMode ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Title */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-3">
            All Games
          </h1>
          <p className={darkMode ? 'text-white/40 text-lg' : 'text-[#1A1A1A]/45 text-lg'}>
            {games.length} game{games.length !== 1 ? 's' : ''} — play anything, connect with everyone.
          </p>
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
            const color = b === 'All' ? '#C5FF00' : badgeColor(b)
            const active = filter === b
            const inactiveBg = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'
            const inactiveText = darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,26,0.45)'
            const inactiveBorder = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
            return (
              <button
                key={b}
                onClick={() => setFilter(b)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all"
                style={{
                  background: active ? `${color}20` : inactiveBg,
                  color: active ? color : inactiveText,
                  border: `1px solid ${active ? color + '50' : inactiveBorder}`,
                }}
              >
                {b}
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-24 gap-4 ${darkMode ? 'text-white/30' : 'text-[#1A1A1A]/35'}`}>
            <span className="text-5xl">🎮</span>
            <p className="text-lg font-semibold">No games found</p>
            <p className="text-sm">Try a different filter or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((game, i) => {
              const accent = badgeColor(game.badge)
              const img = game.imageUrl || FALLBACK_IMAGES[Number(game.id) % FALLBACK_IMAGES.length] || gameImg1
              return (
                <motion.div
                  key={game.id}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                >
                  <div
                    className="group rounded-[24px] p-[2.5px] hover:-translate-y-1.5 transition-all duration-300 hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${accent}28 0%, transparent 60%)`,
                      boxShadow: `0 0 0 1px ${accent}20`,
                    }}
                  >
                    <div className="relative rounded-[22px] overflow-hidden bg-[#111111]" style={{ minHeight: 280 }}>
                      {/* Image */}
                      <img
                        src={img}
                        alt={game.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Accent top strip */}
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${accent} 0%, transparent 70%)` }} />

                      {/* Top row */}
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm"
                          style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}38` }}
                        >
                          {game.badge}
                        </span>
                        {game.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-[#C5FF00]/20 text-[#C5FF00] text-[10px] font-bold tracking-wide border border-[#C5FF00]/30 backdrop-blur-sm">
                            ★ TRENDING
                          </span>
                        )}
                      </div>

                      {/* Bottom panel */}
                      <div
                        className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 pt-8"
                        style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,8,10,0.85) 40%, rgba(8,8,10,0.95) 100%)' }}
                      >
                        <div className="absolute inset-0 pointer-events-none" style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)' }} />
                        <h3 className="relative text-white text-lg font-black tracking-tight leading-tight mb-1">{game.title}</h3>
                        <p className="relative text-white/50 text-xs leading-relaxed line-clamp-2">{game.description}</p>
                        <button
                          className="relative mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all"
                          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
                        >
                          Play Now <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}