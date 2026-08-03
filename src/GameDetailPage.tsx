import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { badgeColor, useGames } from './admin/GamesContext'
import { useSeoSettings } from './admin/SeoContext'
import { fallbackGameImage } from './gameAssets'
import { useTheme } from './ThemeContext'
import logoNavLight from '@/imports/logo-nav-light.png'
import logoNavDark from '@/imports/logo-nav-dark.png'
import Seo from './Seo'
import StructuredData from './StructuredData'

export default function GameDetailPage() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { games, loading } = useGames()
  const { darkMode, toggleDarkMode } = useTheme()
  const game = games.find(item => item.id === gameId)
  const { settings, gameSeo } = useSeoSettings()
  const resolvedSeo = game ? gameSeo(game) : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [gameId])

  if (loading && !game) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <Seo
          title="Loading Game | Joe Yoke"
          description="Loading this Joe Yoke game guide."
          path={`/games/${encodeURIComponent(gameId || '')}`}
          noIndex
        />
        <div className="w-8 h-8 rounded-full border-2 border-white/15 border-t-[#C5FF00] animate-spin" />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center gap-5 px-6 text-center">
        <Seo
          title="Game Not Found | Joe Yoke"
          description="The requested Joe Yoke game could not be found."
          path={`/games/${encodeURIComponent(gameId || '')}`}
          noIndex
        />
        <p className="text-[#C5FF00] text-xs font-bold tracking-widest uppercase">Game not found</p>
        <h1 className="text-4xl font-black tracking-tight">This game is not available.</h1>
        <button onClick={() => navigate('/games')} className="px-5 py-3 rounded-full bg-[#C5FF00] text-black font-bold">
          Back to all games
        </button>
      </div>
    )
  }

  const accent = badgeColor(game.badge)
  const banner = fallbackGameImage(game)
  const canonicalUrl = `https://www.joeyoke.com/games/${encodeURIComponent(game.id)}`
  const structuredImage = banner.startsWith('data:')
    ? 'https://www.joeyoke.com/favicon.png'
    : new URL(banner, 'https://www.joeyoke.com/').toString()

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0A0A0A] text-white' : 'bg-[#F8F9FA] text-[#1A1A1A]'}`}>
      <Seo
        title={resolvedSeo?.title || settings.global.defaultTitle}
        description={resolvedSeo?.description || game.description}
        path={`/games/${encodeURIComponent(game.id)}`}
        image={banner}
        siteName={settings.global.siteName}
        type="article"
      />
      <StructuredData
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.joeyoke.com/' },
              { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://www.joeyoke.com/games' },
              { '@type': 'ListItem', position: 3, name: game.title, item: canonicalUrl },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: game.title,
            description: resolvedSeo?.description || game.description,
            image: structuredImage,
            url: canonicalUrl,
            genre: game.badge,
            gamePlatform: ['iOS', 'Android'],
          },
        ]}
      />
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-[#0A0A0A]/90 border-white/10' : 'bg-white/90 border-black/10'}`}>
        <div className="max-w-7xl mx-auto h-16 px-5 md:px-12 flex items-center gap-4">
          <button onClick={() => navigate('/games')} className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-white/55 hover:text-white' : 'text-black/55 hover:text-black'}`}>
            <ArrowLeft className="w-4 h-4" /> All games
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <img src={darkMode ? logoNavLight : logoNavDark} alt="Joe Yoke" className="w-7 h-7 rounded-lg" />
            <span className="hidden sm:block text-sm font-black uppercase">Joe Yoke</span>
          </div>
          <button onClick={toggleDarkMode} className={`ml-3 p-2 rounded-full border ${darkMode ? 'border-white/15 text-white/60' : 'border-black/10 text-black/60'}`} aria-label="Toggle theme">
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-5 md:px-12 pt-8 md:pt-12">
          <div className="relative min-h-[440px] md:min-h-[600px] rounded-[28px] md:rounded-[40px] overflow-hidden border border-white/10">
            <img src={banner} alt={`${game.title} banner`} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-12 lg:p-16 max-w-4xl">
              <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4" style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}55` }}>
                {game.badge}
              </span>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">{resolvedSeo?.heading || game.title}</h1>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-5 py-16 md:py-24">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>About the game</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">{game.title}</h2>
          <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{game.description}</p>
        </section>

        <section className={`py-16 md:py-24 ${darkMode ? 'bg-white/[0.03]' : 'bg-black/[0.03]'}`}>
          <div className="max-w-6xl mx-auto px-5 md:px-12">
            <div className="max-w-3xl mb-12 md:mb-16">
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: accent }}>Learn the rules</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">How to play</h2>
            </div>

            {game.howToPlay.length > 0 ? (
              <div className="flex flex-col gap-8 md:gap-12">
                {game.howToPlay.map((step, index) => (
                  <article key={step.id} className={`grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border ${darkMode ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}>
                    {step.imageUrl ? (
                      <img src={step.imageUrl} alt={step.title} className={`w-full h-64 md:h-full min-h-[320px] object-cover ${index % 2 === 1 ? 'md:order-2' : ''}`} />
                    ) : (
                      <div className={`min-h-64 md:min-h-[320px] flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`} style={{ background: `linear-gradient(135deg, ${accent}28, transparent)` }}>
                        <span className="text-8xl font-black" style={{ color: `${accent}45` }}>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    )}
                    <div className="p-7 md:p-10 flex flex-col justify-center">
                      <span className="text-sm font-bold mb-5" style={{ color: accent }}>STEP {String(index + 1).padStart(2, '0')}</span>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4">{step.title}</h3>
                      <p className={`leading-relaxed ${darkMode ? 'text-white/55' : 'text-black/60'}`}>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className={`rounded-3xl border p-10 text-center ${darkMode ? 'border-white/10 text-white/45' : 'border-black/10 text-black/45'}`}>
                The how-to-play guide is being prepared.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
