"use client";

import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sun, Sparkles, Moon } from 'lucide-react'
import Image from "next/image";

interface Game {
  badge: string
  title: string
  description: string
  id: number
}

interface Category {
  index: string
  title: string
  tags: string
}

interface Stat {
  value: string
  label: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['GAMES', 'COMMUNITY', 'DOWNLOAD APP']

const GAMES: Game[] = [
  {
    id: 1,
    badge: 'GAME — 2025',
    title: 'Trivia Quest',
    description: 'Battle friends across 50+ categories. The quiz game that never gets old.',
  },
  {
    id: 2,
    badge: 'GAME — 2025',
    title: 'Word Blitz',
    description: 'Race the clock to chain words faster than anyone else in the lobby.',
  },
  {
    id: 3,
    badge: 'PARTY — 2025',
    title: 'Draw & Guess',
    description: 'Sketch wild scenes while your crew scrambles to figure out what you drew.',
  },
  {
    id: 4,
    badge: 'STRATEGY — 2025',
    title: 'Bluff Master',
    description: 'Outwit, outbluff, and outlast. The social deduction game for sharp minds.',
  },
]

const CATEGORIES: Category[] = [
  { index: '01', title: 'Action & Arcade', tags: 'Fast-paced / Combat / 3D' },
  { index: '02', title: 'Puzzle & Brain', tags: 'Logic / Wordplay / Strategy' },
  { index: '03', title: 'Party & Social', tags: 'Multiplayer / Trivia / Bluffing' },
  { index: '04', title: 'Sports & Racing', tags: 'Competitive / Real-time / Leaderboard' },
]

const STATS: Stat[] = [
  { value: '1M+', label: 'Active Players' },
  { value: '4%', label: 'Monthly Growth' },
  { value: '2M+', label: 'Games Played' },
  { value: '4.8/5', label: 'App Store Rating' },
]

const FOOTER_LINKS = [
  { heading: 'Product', links: ['Games', 'Community', 'Leaderboard', 'App Store'] },
  { heading: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Blog'] },
  { heading: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'] },
  { heading: 'Social', links: ['Twitter/X', 'Discord', 'Instagram', 'TikTok'] },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  const [activeNav, setActiveNav] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Compute pill position over active nav link
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const el = linkRefs.current[activeNav]
    if (el) {
      const parent = el.parentElement
      if (parent) {
        const parentRect = parent.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        setPillStyle({
          left: elRect.left - parentRect.left,
          width: elRect.width,
        })
      }
    }
  }, [activeNav])

  return (
    <motion.header
      className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <div
        className={`pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full border border-[#E5E7EB] transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg shadow-black/5' : 'bg-white/80 backdrop-blur-md'
        }`}
        style={{ maxWidth: 720, width: '95vw' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5 mr-2">
          <div className="w-7 h-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#C5FF00]" />
          </div>
          <span className="font-black text-[#1A1A1A] text-sm tracking-tighter uppercase">Joe Yoke</span>
        </div>

        {/* Nav Links with sliding pill */}
        <nav className="flex-1 flex items-center justify-center">
          <div className="relative flex items-center gap-0.5">
            {/* Sliding active pill */}
            <motion.div
              className="absolute top-0 bottom-0 bg-[#C5FF00] rounded-full z-0"
              animate={{ left: pillStyle.left, width: pillStyle.width }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                ref={(el) => { linkRefs.current[i] = el }}
                onClick={() => setActiveNav(i)}
                className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors duration-150 whitespace-nowrap ${
                  activeNav === i ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </nav>

        {/* Mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20 transition-all"
        >
          {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{darkMode ? 'DARK' : 'LIGHT'}</span>
        </button>
      </div>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="min-h-screen bg-[#F8F9FA] flex items-center px-6 md:px-12 pt-28 pb-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-8">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-[#1A1A1A] leading-none tracking-tighter">
              The games bring you in, but{' '}
              <span className="inline-block bg-[#C5FF00] text-[#1A1A1A] rounded-2xl px-3 py-1 leading-none">
                the friendships
              </span>{' '}
              keep you here.
            </h1>
          </motion.div>

          <motion.p
            className="text-lg text-[#1A1A1A]/50 max-w-md leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
          >
            Joe Yoke brings people together through the games they love. Compete, connect, and build
            friendships that last well beyond the scoreboard.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
          >
            <button className="group flex items-center gap-3 bg-[#1A1A1A] text-white rounded-full pl-6 pr-2 py-2 font-semibold text-sm hover:bg-[#0A0A0A] transition-colors w-fit">
              Play Games
              <span className="w-8 h-8 rounded-full bg-[#C5FF00] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <ArrowRight className="w-4 h-4 text-[#1A1A1A]" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right — Floating Pyramid */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -22, 0] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease, delay: 0.2 }}
            >
              <Image 
  src="/hero.png" 
  alt="3D Iridescent Graphic" 
  width={500}
  height={500}
  className="object-contain drop-shadow-2xl" 
  priority
/>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── About & Pill Band ────────────────────────────────────────────────────────

function About() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        <FadeUp>
          <p className="text-2xl md:text-3xl text-center text-[#1A1A1A]/70 leading-snug font-medium">
            We believe the best games are the ones played <strong className="text-[#1A1A1A]">together</strong>.
            Joe Yoke is a platform built for <strong className="text-[#1A1A1A]">real connections</strong> —
            where every match is a chance to meet someone new, sharpen your skills, and{' '}
            <strong className="text-[#1A1A1A]">build a crew</strong> you can count on.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(['Play', 'With'] as const).map((word) => (
              <span
                key={word}
                className="px-6 py-2.5 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] font-semibold text-sm tracking-wide"
              >
                {word}
              </span>
            ))}
            <span className="w-10 h-10 rounded-full bg-[#C5FF00] flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-[#1A1A1A]" />
            </span>
            <span className="px-6 py-2.5 rounded-full border border-[#1A1A1A]/20 text-[#1A1A1A] font-semibold text-sm tracking-wide">
              Friends
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Trending Games Grid ──────────────────────────────────────────────────────

function GameCard({ game, delay }: { game: Game; delay: number }) {
  return (
    <FadeUp delay={delay}>
      <div className="group bg-[#0A0A0A] rounded-3xl p-7 flex flex-col gap-4 h-full border border-white/5 hover:-translate-y-2 transition-transform duration-300 hover:shadow-2xl hover:shadow-black/40">
        <div className="flex items-start justify-between">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs font-medium tracking-widest uppercase">
            {game.badge}
          </span>
          <button className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all group/btn">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>

        <div className="flex-1">
          <h3 className="text-white text-2xl font-black tracking-tight leading-tight mb-2">{game.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed">{game.description}</p>
        </div>

        <div>
          <a href="#" className="group/link inline-flex items-center gap-1.5 text-[#C5FF00] text-sm font-semibold tracking-wide hover:gap-3 transition-all duration-200">
            VIEW DETAILS
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </FadeUp>
  )
}

function TrendingGames() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-none">
              Trending Games
            </h2>
            <button className="group flex items-center gap-2 text-sm font-semibold text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
              View all
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {GAMES.map((game, i) => (
            <GameCard key={game.id} game={game} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Interactive Categories ───────────────────────────────────────────────────

function CategoryRow({ cat, delay }: { cat: Category; delay: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <FadeUp delay={delay}>
      <div
        className={`group flex items-center justify-between px-6 md:px-8 py-6 border-t border-[#E5E7EB] last:border-b cursor-pointer transition-all duration-150 rounded-xl ${
          hovered ? 'bg-[#C5FF00]' : 'hover:bg-[#C5FF00]'
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center gap-6 md:gap-10 min-w-0">
          <span className={`text-sm font-mono font-bold shrink-0 transition-colors duration-150 ${hovered ? 'text-[#1A1A1A]/50' : 'text-[#1A1A1A]/30'}`}>
            {cat.index}
          </span>
          <span className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-150 ${hovered ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]'}`}>
            {cat.title}
          </span>
          <span className={`hidden sm:block text-sm transition-colors duration-150 ${hovered ? 'text-[#1A1A1A]/60' : 'text-[#1A1A1A]/40'}`}>
            {cat.tags}
          </span>
        </div>
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 ${
          hovered
            ? 'bg-[#1A1A1A] border-[#1A1A1A] scale-110'
            : 'border-[#1A1A1A]/20 bg-transparent'
        }`}>
          <ArrowUpRight className={`w-4 h-4 transition-colors duration-150 ${hovered ? 'text-[#C5FF00]' : 'text-[#1A1A1A]/40'}`} />
        </div>
      </div>
    </FadeUp>
  )
}

function Categories() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="mb-10">
            <p className="text-xs font-bold text-[#1A1A1A]/40 tracking-widest uppercase mb-3">Browse by</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-none">
              Game Categories
            </h2>
          </div>
        </FadeUp>

        <div className="flex flex-col">
          {CATEGORIES.map((cat, i) => (
            <CategoryRow key={cat.index} cat={cat} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Community Stats ──────────────────────────────────────────────────────────

function CommunityStats() {
  return (
    <section className="bg-[#F8F9FA] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="bg-[#0A0A0A] rounded-3xl p-10 md:p-14 border border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-14">
              <div>
                <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-4">Our Community</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                  Numbers that<br />speak for themselves.
                </h2>
              </div>
              <button className="group flex items-center gap-3 bg-[#C5FF00] text-[#1A1A1A] rounded-full pl-6 pr-2 py-2 font-semibold text-sm hover:bg-[#d4ff33] transition-colors w-fit shrink-0">
                Join Now
                <span className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                  <ArrowRight className="w-4 h-4 text-[#C5FF00]" />
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {STATS.map((stat, i) => (
                <FadeUp key={stat.label} delay={i * 0.1}>
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl md:text-5xl font-black text-[#C5FF00] tracking-tighter leading-none">
                      {stat.value}
                    </span>
                    <span className="text-sm text-white/40 font-medium">{stat.label}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 pb-0 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* CTA */}
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-white/10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none max-w-2xl">
              Ready to join the fun?{' '}
              <span className="text-white/30">Let&apos;s play.</span>
            </h2>
            <button className="group flex items-center gap-3 bg-[#C5FF00] text-[#1A1A1A] rounded-full pl-6 pr-2 py-2.5 font-bold text-sm hover:bg-[#d4ff33] transition-colors w-fit shrink-0">
              Download App
              <span className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <ArrowRight className="w-4 h-4 text-[#C5FF00]" />
              </span>
            </button>
          </div>
        </FadeUp>

        {/* Links Grid */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14 border-b border-white/10">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="text-xs font-bold text-white/30 tracking-widest uppercase">{col.heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/50 hover:text-white transition-colors duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Bottom bar */}
        <div className="flex items-center justify-between py-6 text-xs text-white/20">
          <span>© 2025 Joe Yoke. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#C5FF00]" />
            Play. Connect. Win.
          </span>
        </div>
      </div>

      {/* Watermark */}
      <div className="relative overflow-hidden h-28 md:h-44 flex items-end pointer-events-none select-none" aria-hidden>
        <span
          className="absolute bottom-[-0.15em] left-1/2 -translate-x-1/2 whitespace-nowrap font-black text-[#1A1A1A] tracking-tighter leading-none"
          style={{ fontSize: 'clamp(80px, 18vw, 220px)', color: 'rgba(255,255,255,0.03)' }}
        >
          JOE YOKE
        </span>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="font-sans antialiased" style={{ backgroundColor: '#F8F9FA' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>
        <Hero />
        <About />
        <TrendingGames />
        <Categories />
        <CommunityStats />
      </main>
      <Footer />
    </div>
  )
}
