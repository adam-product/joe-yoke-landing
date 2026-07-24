import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import pyramidImg from '@/imports/hero.png'
import faviconImg from '@/imports/favicon.ico-1.jpg'
import gameImg1 from '@/imports/photo_2026-07-23_20-54-30.jpg'
import gameImg2 from '@/imports/photo_2026-07-23_20-54-27.jpg'
import gameImg3 from '@/imports/photo_2026-07-23_20-54-21.jpg'
import gameImg4 from '@/imports/photo_2026-07-23_20-54-19.jpg'
import { useGames } from './admin/GamesContext'
import { useContent } from './admin/ContentContext'

interface Game { badge: string; title: string; description: string; id: number; image: string; }
interface Category { index: string; title: string; tags: string; }

const NAV_LINKS = ['GAMES', 'COMMUNITY', 'DOWNLOAD APP']
const NAV_TARGETS = ['games', 'community', 'download']

const GAMES: Game[] = [
  { id: 1, badge: 'STRATEGY', title: 'Chess', description: 'Plan every move. Outthink your opponent across the most iconic strategy game ever made.', image: gameImg1 },
  { id: 2, badge: 'CUE SPORTS', title: 'Snooker', description: 'Precision, patience, and power. Pot balls and dominate the table against friends worldwide.', image: gameImg2 },
  { id: 3, badge: 'BOARD', title: 'Carrom', description: 'Flick, aim, and pocket. The classic board game reimagined for fast online multiplayer.', image: gameImg3 },
  { id: 4, badge: 'PARTY', title: "Liar's Dice", description: 'Bluff your way to victory. Roll, bet, and deceive — the last one with dice standing wins.', image: gameImg4 },
]

const FOOTER_LINKS = [
  { heading: 'Product', links: ['Games', 'Community', 'Leaderboard', 'App Store'] },
  { heading: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms'] },
  { heading: 'Social', links: ['Twitter/X', 'Discord', 'Instagram', 'TikTok'] },
]

const ease = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className, dark }: { children: ReactNode; delay?: number; className?: string; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  void dark
  return (
    <motion.div ref={ref} className={className} initial={{ y: 30, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }} transition={{ duration: 0.7, ease, delay }}>
      {children}
    </motion.div>
  )
}

const renderHTML = (html: string) => {
  if (!html) return { __html: '' };
  if (!html.includes('<p>') && html.includes('\n')) {
    return { __html: html.replace(/\n/g, '<br/>') };
  }
  return { __html: html };
};

function Header({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (v: boolean) => void }) {
  const [activeNav, setActiveNav] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const pillNavRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 })
  const manualNav = useRef(false)

  const scrollTo = (i: number) => {
    manualNav.current = true
    setActiveNav(i)
    const el = document.getElementById(NAV_TARGETS[i])
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => { manualNav.current = false }, 900)
  }

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (manualNav.current) return
      const threshold = window.innerHeight * 0.45
      let current = 0
      NAV_TARGETS.forEach((id, i) => {
        const section = document.getElementById(id)
        if (!section) return
        if (section.getBoundingClientRect().top <= threshold) current = i
      })
      setActiveNav(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = pillNavRefs.current[activeNav]
      if (!el) return
      const parent = el.parentElement
      if (!parent) return
      const parentRect = parent.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      setPillStyle({ left: elRect.left - parentRect.left, width: elRect.width })
    })
  }, [activeNav, scrolled])

  return (
    <motion.header className="fixed top-0 inset-x-0 z-50 pointer-events-none" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }}>
      <motion.div className="flex items-center justify-between px-4 sm:px-8 md:px-14 py-4 md:py-5 w-full" animate={{ opacity: scrolled ? 0 : 1 }} transition={{ duration: 0.25 }} style={{ pointerEvents: scrolled ? 'none' : 'auto' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden shrink-0"><img src={faviconImg} alt="Joe Yoke" className="w-full h-full object-cover" /></div>
          <span className={`font-black text-sm tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Joe Yoke</span>
        </div>
        <nav className="flex-1 hidden md:flex items-center justify-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <button key={link} onClick={() => scrollTo(i)} className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-colors duration-150 whitespace-nowrap ${activeNav === i ? 'bg-[#C5FF00] text-[#1A1A1A]' : darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'}`}>{link}</button>
          ))}
        </nav>
        <button onClick={() => setDarkMode(!darkMode)} className={`flex items-center gap-1.5 text-xs font-semibold transition-all ${darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'}`}>
          {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{darkMode ? 'LIGHT' : 'DARK'}</span>
        </button>
      </motion.div>

      <motion.div className="absolute top-2 md:top-4 inset-x-0 flex justify-center px-2" animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -8 }} transition={{ duration: 0.3 }} style={{ pointerEvents: scrolled ? 'auto' : 'none' }}>
        <div className={`flex items-center justify-between gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2.5 rounded-full border transition-all duration-300 ${darkMode ? 'bg-[#111111]/90 backdrop-blur-md shadow-lg shadow-black/30 border-white/10' : 'bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 border-[#E5E7EB]'}`} style={{ maxWidth: 720, width: '100%' }}>
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0 md:mr-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl overflow-hidden shrink-0"><img src={faviconImg} alt="Joe Yoke" className="w-full h-full object-cover" /></div>
            <span className={`hidden sm:block font-black text-sm tracking-tighter uppercase transition-colors ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Joe Yoke</span>
          </div>
          <nav className="flex-1 flex items-center justify-center min-w-0">
            <div className="relative flex items-center gap-0.5 md:gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <motion.div className="absolute top-0 bottom-0 bg-[#C5FF00] rounded-full z-0" animate={{ left: pillStyle.left, width: pillStyle.width }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              {NAV_LINKS.map((link, i) => (
                <button key={link} ref={(el) => { pillNavRefs.current[i] = el }} onClick={() => scrollTo(i)} className={`relative z-10 px-2.5 py-1.5 md:px-3.5 md:py-1.5 text-[10px] md:text-xs font-semibold tracking-wide rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 ${activeNav === i ? 'text-[#1A1A1A]' : darkMode ? 'text-white/50 hover:text-white' : 'text-[#1A1A1A]/55 hover:text-[#1A1A1A]'}`}>{link}</button>
              ))}
            </div>
          </nav>
          <button onClick={() => setDarkMode(!darkMode)} className={`shrink-0 ml-1 md:ml-2 flex items-center gap-1.5 px-2 py-1.5 md:px-3 md:py-1.5 rounded-full border text-[10px] md:text-xs font-semibold transition-all ${darkMode ? 'border-white/15 text-white/50 hover:text-white hover:border-white/30' : 'border-[#E5E7EB] text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20'}`}>
            {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{darkMode ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  )
}

function Hero({ dark }: { dark: boolean }) {
  const { get } = useContent()
  const heroSrc = get('hero', 'heroImage') || pyramidImg

  return (
    <section className={`min-h-screen flex items-center px-4 sm:px-6 md:px-12 pt-24 md:pt-20 pb-16 transition-colors duration-500 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F8F9FA]'}`}>
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8 overflow-hidden">
        
        <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col gap-6 md:gap-8 z-10 shrink-0 min-w-0">
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease, delay: 0.1 }}>
            <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tighter transition-colors duration-500 break-words w-full [&_p]:m-0 ${dark ? 'text-white' : 'text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(get('hero', 'headline'))} />
          </motion.div>

          {/* FIX: Added w-full, break-words, and [&_p]:m-0 to the subtext container to force wrapping */}
          <motion.div className={`w-full max-w-md break-words text-base md:text-lg leading-relaxed transition-colors duration-500 [&_p]:m-0 ${dark ? 'text-white/50' : 'text-[#1A1A1A]/50'}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease, delay: 0.3 }} dangerouslySetInnerHTML={renderHTML(get('hero', 'subtext'))} />

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease, delay: 0.45 }}>
            <button className={`group flex items-center gap-3 rounded-full pl-6 pr-2 py-2 font-semibold text-sm transition-colors w-fit ${dark ? 'bg-white text-[#0A0A0A] hover:bg-white/90' : 'bg-[#1A1A1A] text-white hover:bg-[#0A0A0A]'}`}>
              <span dangerouslySetInnerHTML={renderHTML(get('hero', 'ctaLabel'))} />
              <span className="w-8 h-8 rounded-full bg-[#C5FF00] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <ArrowRight className="w-4 h-4 text-[#1A1A1A]" />
              </span>
            </button>
          </motion.div>
        </div>

        <div className="w-full md:w-2/5 lg:w-1/3 flex items-center justify-center md:justify-end">
          <motion.div animate={{ y: [0, -22, 0] }} transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}>
            <motion.div initial={{ opacity: 0, scale: 0.85, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease, delay: 0.2 }}>
              <img src={heroSrc} alt="Hero mockup" className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] object-contain drop-shadow-2xl select-none" draggable={false} />
            </motion.div>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}

function About({ dark }: { dark: boolean }) {
  const { get } = useContent()
  const pills = [get('about', 'pill1'), get('about', 'pill2'), get('about', 'pill3')].filter(Boolean)

  return (
    <section className={`py-16 md:py-20 px-4 sm:px-6 md:px-12 transition-colors duration-500 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F8F9FA]'}`}>
      {/* Added w-full to ensure container takes up available space but respects padding */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-10 md:gap-12">
        <FadeUp className="w-full">
          {/* Added w-full and break-words so the text wraps instead of bursting out */}
          <div className={`w-full break-words text-xl sm:text-2xl md:text-3xl text-center leading-snug font-medium transition-colors duration-500 [&_p]:m-0 ${dark ? 'text-white/60' : 'text-[#1A1A1A]/70'}`} dangerouslySetInnerHTML={renderHTML(get('about', 'quote'))} />
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {pills.slice(0, -1).map((word, i) => (
              <span key={i} className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full border font-semibold text-xs md:text-sm tracking-wide transition-colors duration-500 [&_p]:m-0 ${dark ? 'border-white/15 text-white' : 'border-[#1A1A1A]/20 text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(word)} />
            ))}
            <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#C5FF00] flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-[#1A1A1A]" />
            </span>
            {pills[pills.length - 1] && (
              <span className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full border font-semibold text-xs md:text-sm tracking-wide transition-colors duration-500 [&_p]:m-0 ${dark ? 'border-white/15 text-white' : 'border-[#1A1A1A]/20 text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(pills[pills.length - 1])} />
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

const CARD_ACCENTS = ['#60a5fa', '#34d399', '#fb923c', '#f87171', '#a78bfa', '#fbbf24']

function GameCard({ game, delay, index }: { game: Game; delay: number; dark: boolean; index: number }) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
  return (
    <FadeUp delay={delay}>
      <div className="rounded-[24px] md:rounded-[28px] p-[3px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl" style={{ background: `linear-gradient(135deg, ${accent}30 0%, transparent 60%)`, boxShadow: `0 0 0 1px ${accent}22, 0 24px 48px ${accent}15` }}>
        <div className="group relative rounded-[21px] md:rounded-3xl overflow-hidden" style={{ minHeight: 300 }}>
          <img src={game.image} alt={game.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${accent} 0%, transparent 70%)` }} />
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase backdrop-blur-sm" style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}>{game.badge}</span>
            <button className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all group/btn">
              <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-1 md:gap-2 px-4 md:px-5 pb-4 md:pb-5 pt-16">
            <div className="absolute inset-0 z-0 pointer-events-none" style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,10,0.6) 40%, rgba(8,8,10,0.95) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)'
            }} />
            <h3 className="relative z-10 text-white text-lg md:text-xl font-black tracking-tight leading-tight">{game.title}</h3>
            <p className="relative z-10 text-white/75 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{game.description}</p>
            <a href="#" className="relative z-10 group/link inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold tracking-wide hover:gap-3 transition-all duration-200 mt-1" style={{ color: accent }}>
              VIEW DETAILS <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

function TrendingGames({ dark }: { dark: boolean }) {
  const navigate = useNavigate()
  const { games } = useGames()
  const { get } = useContent()
  const featured = games.filter(g => g.featured).slice(0, 4)
  const displayGames: Game[] = featured.length > 0
    ? featured.map((g, i) => ({ id: Number(g.id) || i + 1, badge: g.badge, title: g.title, description: g.description, image: g.imageUrl || [gameImg1, gameImg2, gameImg3, gameImg4][i] || gameImg1 }))
    : GAMES

  return (
    <section id="games" className={`py-16 md:py-20 px-4 sm:px-6 md:px-12 transition-colors duration-500 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F8F9FA]'}`}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4 w-full">
            <div className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none transition-colors duration-500 break-words w-full [&_p]:m-0 ${dark ? 'text-white' : 'text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(get('games', 'sectionTitle'))} />
            <button onClick={() => navigate('/games')} className={`group inline-flex items-center gap-2 text-xs md:text-sm font-semibold transition-colors w-fit shrink-0 ${dark ? 'text-white/40 hover:text-white' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'}`}>
              View all <ArrowRight className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {displayGames.map((game, i) => <GameCard key={game.id} game={game} delay={i * 0.08} dark={dark} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function CategoryRow({ cat, delay, dark }: { cat: Category; delay: number; dark: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <FadeUp delay={delay}>
      <div className={`group flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 md:px-8 py-5 md:py-6 cursor-pointer transition-all duration-150 rounded-xl gap-4 sm:gap-0 ${hovered ? 'bg-[#C5FF00]' : ''} ${dark ? 'border-t border-white/10 last:border-b' : 'border-t border-[#E5E7EB] last:border-b'}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-10 min-w-0 flex-1">
          <span className={`text-xs md:text-sm font-mono font-bold shrink-0 transition-colors duration-150 pt-1 sm:pt-0 ${hovered ? 'text-[#1A1A1A]/50' : dark ? 'text-white/30' : 'text-[#1A1A1A]/30'}`}>{cat.index}</span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 md:gap-10 min-w-0">
            <div className={`text-lg sm:text-xl md:text-2xl font-black tracking-tight transition-colors duration-150 break-words w-full [&_p]:m-0 ${hovered ? 'text-[#1A1A1A]' : dark ? 'text-white' : 'text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(cat.title)} />
            <div className={`text-xs md:text-sm transition-colors duration-150 break-words w-full [&_p]:m-0 ${hovered ? 'text-[#1A1A1A]/60' : dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`} dangerouslySetInnerHTML={renderHTML(cat.tags)} />
          </div>
        </div>
        <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border transition-all duration-200 self-end sm:self-auto ${hovered ? 'bg-[#1A1A1A] border-[#1A1A1A] scale-110' : dark ? 'border-white/20 bg-transparent' : 'border-[#1A1A1A]/20 bg-transparent'}`}>
          <ArrowUpRight className={`w-3 h-3 md:w-4 md:h-4 transition-colors duration-150 ${hovered ? 'text-[#C5FF00]' : dark ? 'text-white/40' : 'text-[#1A1A1A]/40'}`} />
        </div>
      </div>
    </FadeUp>
  )
}

function Categories({ dark }: { dark: boolean }) {
  const { get, content } = useContent()
  
  const rawList = Array.isArray(content?.categories?.categoryList) 
    ? content.categories.categoryList 
    : (Array.isArray(get('categories', 'categoryList')) ? get('categories', 'categoryList') : []);
    
  const categoriesData: Category[] = rawList.map((cat: any, i: number) => ({
    index: `0${i + 1}`.slice(-2),
    title: cat.title,
    tags: cat.tags
  }))

  return (
    <section className={`py-16 md:py-20 px-4 sm:px-6 md:px-12 transition-colors duration-500 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F8F9FA]'}`}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div className="mb-8 md:mb-10 w-full min-w-0">
            <div className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-2 md:mb-3 transition-colors duration-500 break-words w-full [&_p]:m-0 ${dark ? 'text-white/30' : 'text-[#1A1A1A]/40'}`} dangerouslySetInnerHTML={renderHTML(get('categories', 'subhead'))} />
            <div className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none transition-colors duration-500 break-words w-full [&_p]:m-0 ${dark ? 'text-white' : 'text-[#1A1A1A]'}`} dangerouslySetInnerHTML={renderHTML(get('categories', 'headline'))} />
          </div>
        </FadeUp>
        <div className="flex flex-col">
          {categoriesData.map((cat, i) => <CategoryRow key={cat.index} cat={cat} delay={i * 0.07} dark={dark} />)}
        </div>
      </div>
    </section>
  )
}

function CommunityStats({ dark }: { dark: boolean }) {
  const { get } = useContent()
  const stats = [1, 2, 3, 4].map(n => ({ value: get('stats', `stat${n}_value`), label: get('stats', `stat${n}_label`) }))

  return (
    <section id="community" className={`py-16 md:py-20 px-4 sm:px-6 md:px-12 transition-colors duration-500 ${dark ? 'bg-[#0A0A0A]' : 'bg-[#F8F9FA]'}`}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          {/* Added overflow-hidden to ensure internal elements cannot force this card wider than the screen */}
          <div className={`w-full rounded-3xl p-6 sm:p-10 md:p-14 border transition-colors duration-500 overflow-hidden ${dark ? 'bg-[#111111] border-white/5' : 'bg-[#0A0A0A] border-white/5'}`}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 mb-10 md:mb-14 w-full">
              {/* Added min-w-0 and flex-1 so text respects the flex boundary */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-white/30 tracking-widest uppercase mb-3 md:mb-4">Our Community</p>
                {/* Added w-full and break-words to ensure text drops down instead of pushing right */}
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] break-words w-full [&_p]:m-0" dangerouslySetInnerHTML={renderHTML(get('stats', 'headline'))} />
              </div>
              <button className="group flex items-center gap-3 bg-[#C5FF00] text-[#1A1A1A] rounded-full pl-6 pr-2 py-2 font-bold text-xs md:text-sm hover:bg-[#d4ff33] transition-colors w-fit shrink-0">
                <span dangerouslySetInnerHTML={renderHTML(get('stats', 'ctaLabel'))} className="[&_p]:m-0" />
                <span className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300 shrink-0">
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[#C5FF00]" />
                </span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 w-full">
              {stats.map((stat, i) => (
                <FadeUp key={i} delay={i * 0.1} className="min-w-0">
                  <div className="flex flex-col gap-1 md:gap-2 w-full min-w-0">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C5FF00] tracking-tighter leading-none break-words w-full [&_p]:m-0" dangerouslySetInnerHTML={renderHTML(stat.value)} />
                    <div className="text-[10px] md:text-sm text-white/40 font-medium break-words w-full [&_p]:m-0" dangerouslySetInnerHTML={renderHTML(stat.label)} />
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

function Footer({ dark }: { dark: boolean }) {
  const { get } = useContent()

  return (
    <footer id="download" className={`pt-16 md:pt-20 pb-0 px-4 sm:px-6 md:px-12 overflow-hidden transition-colors duration-500 ${dark ? 'bg-[#050505]' : 'bg-[#0A0A0A]'}`}>
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <FadeUp className="w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-12 md:pb-16 border-b border-white/10 w-full min-w-0">
            <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none max-w-2xl flex flex-wrap gap-1.5 md:gap-2 break-words w-full [&_p]:m-0">
              <span dangerouslySetInnerHTML={renderHTML(get('footer', 'ctaHeadline'))} />
              <span dangerouslySetInnerHTML={renderHTML(get('footer', 'ctaTagline'))} />
            </div>
            <button className="group flex items-center gap-3 bg-[#C5FF00] text-[#1A1A1A] rounded-full pl-6 pr-2 py-2 md:py-2.5 font-bold text-xs md:text-sm hover:bg-[#d4ff33] transition-colors w-fit shrink-0">
              <span dangerouslySetInnerHTML={renderHTML(get('footer', 'ctaBtn'))} className="[&_p]:m-0" />
              <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-transform group-hover:rotate-45 duration-300 shrink-0">
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[#C5FF00]" />
              </span>
            </button>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 py-10 md:py-14 border-b border-white/10 w-full">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3 md:gap-4 min-w-0 w-full">
                <p className="text-[10px] md:text-xs font-bold text-white/30 tracking-widest uppercase">{col.heading}</p>
                <ul className="flex flex-col gap-2 md:gap-2.5">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition-colors duration-150 break-words">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
        <div className="flex items-center py-6 text-[10px] md:text-xs text-white/20 break-words w-full [&_p]:m-0">
          <span dangerouslySetInnerHTML={renderHTML(get('footer', 'copyright'))} />
        </div>
      </div>
      <div className="relative overflow-hidden h-20 sm:h-28 md:h-44 flex items-end pointer-events-none select-none" aria-hidden>
        <span className="absolute bottom-[-0.15em] left-1/2 -translate-x-1/2 whitespace-nowrap font-black tracking-tighter leading-none" style={{ fontSize: 'clamp(60px, 18vw, 220px)', color: 'rgba(255,255,255,0.03)' }}>JOE YOKE</span>
      </div>
    </footer>
  )
}

const BLUR_LAYERS = [
  { blur: 1,  start: 0,   end: 16  }, { blur: 2,  start: 8,   end: 28  },
  { blur: 4,  start: 18,  end: 42  }, { blur: 8,  start: 30,  end: 58  },
  { blur: 12, start: 44,  end: 72  }, { blur: 18, start: 56,  end: 84  },
  { blur: 24, start: 68,  end: 92  }, { blur: 32, start: 78,  end: 100 },
]

function LiquidGlassBar({ dark }: { dark: boolean }) {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const maxShift = typeof window !== 'undefined' ? window.innerHeight * 0.35 : 260
  const shift = Math.min(scrollY * 0.3, maxShift)
  const tint = dark ? 'rgba(10,10,10,0.5)' : 'rgba(248,249,250,0.6)'
  return (
    <div className="fixed inset-x-0 z-40 pointer-events-none" style={{ bottom: 0, height: `calc(200px - ${shift}px)` }}>
      {BLUR_LAYERS.map(({ blur, start, end }) => (
        <div key={blur} style={{ position: 'absolute', inset: 0, backdropFilter: `blur(${blur}px)`, WebkitBackdropFilter: `blur(${blur}px)`, maskImage: `linear-gradient(to bottom, transparent ${start}%, black ${end}%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent ${start}%, black ${end}%)` }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 40%, ${tint} 100%)`, transition: 'background 0.4s ease' }} />
    </div>
  )
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className="font-sans antialiased overflow-x-hidden w-full relative">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <LiquidGlassBar dark={darkMode} />
      <main>
        <Hero dark={darkMode} />
        <About dark={darkMode} />
        <TrendingGames dark={darkMode} />
        <Categories dark={darkMode} />
        <CommunityStats dark={darkMode} />
      </main>
      <Footer dark={darkMode} />
    </div>
  )
}