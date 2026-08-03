import { useEffect, useMemo, useState } from 'react'
import { CheckCircle, Eye, EyeOff, Globe2, Save, Search } from 'lucide-react'
import { useGames } from './GamesContext'
import {
  normalizeSeoSettings,
  useSeoSettings,
  type GameSeoSettings,
  type SeoPageKey,
  type SeoPageSettings,
  type SeoSettings,
} from './SeoContext'

type TabKey = 'global' | SeoPageKey | 'game'

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'global', label: 'Global defaults' },
  { key: 'home', label: 'Homepage' },
  { key: 'games', label: 'Games page' },
  { key: 'download', label: 'Download page' },
  { key: 'game', label: 'Game SEO' },
]

const fieldClass = 'w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white placeholder:text-white/20 focus:border-[#C5FF00] focus:outline-none'

function Field({ label, hint, count, children }: { label: string; hint?: string; count?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-end justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-white/45">{label}</span>
        {count && <span className="text-[11px] text-white/30">{count}</span>}
      </span>
      {children}
      {hint && <span className="text-xs leading-relaxed text-white/35">{hint}</span>}
    </label>
  )
}

function SearchPreview({ title, description, path }: { title: string; description: string; path: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white p-5 text-left">
      <div className="mb-1 text-sm text-[#202124]">www.joeyoke.com{path === '/' ? '' : path}</div>
      <div className="line-clamp-1 text-xl text-[#1a0dab]">{title || 'Page title preview'}</div>
      <div className="mt-1 line-clamp-2 text-sm leading-5 text-[#4d5156]">{description || 'The search description will appear here.'}</div>
    </div>
  )
}

function PageEditor({ value, onChange }: { value: SeoPageSettings; onChange: (next: SeoPageSettings) => void }) {
  const patch = (changes: Partial<SeoPageSettings>) => onChange({ ...value, ...changes })

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-[#C5FF00]/20 bg-[#C5FF00]/5 p-4 text-sm leading-relaxed text-white/60">
        Use the focus phrase naturally in the title, heading, introduction, and useful page content. The keyword fields are planning notes for your team; Google ignores the old meta-keywords tag.
      </div>

      <SearchPreview title={value.title} description={value.description} path={value.path} />

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="SEO title" count={`${value.title.length}/60`} hint="Aim for a clear, unique title of roughly 50-60 characters.">
          <input className={fieldClass} value={value.title} onChange={event => patch({ title: event.target.value })} />
        </Field>
        <Field label="Canonical path" hint="Must begin with /. This controls the canonical URL for this page.">
          <input className={fieldClass} value={value.path} onChange={event => patch({ path: event.target.value })} />
        </Field>
      </div>

      <Field label="Meta description" count={`${value.description.length}/160`} hint="Describe the page accurately and make the result worth clicking.">
        <textarea className={`${fieldClass} resize-y leading-relaxed`} rows={4} value={value.description} onChange={event => patch({ description: event.target.value })} />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Primary target phrase" hint="Use one main phrase that matches the page's actual purpose.">
          <input className={fieldClass} value={value.primaryKeyword} onChange={event => patch({ primaryKeyword: event.target.value })} placeholder="social games app" />
        </Field>
        <Field label="Related phrases" hint="Comma-separated research notes. Do not repeat them unnaturally on the page.">
          <input className={fieldClass} value={value.secondaryKeywords} onChange={event => patch({ secondaryKeywords: event.target.value })} placeholder="multiplayer games, games with friends" />
        </Field>
      </div>

      <Field label="Visible page heading (H1)" hint="Leave blank to keep the current website heading.">
        <input className={fieldClass} value={value.heading} onChange={event => patch({ heading: event.target.value })} />
      </Field>

      <Field label="Visible introduction" hint="Leave blank to keep the current website introduction.">
        <textarea className={`${fieldClass} resize-y leading-relaxed`} rows={3} value={value.intro} onChange={event => patch({ intro: event.target.value })} />
      </Field>

      <button
        type="button"
        onClick={() => patch({ indexable: !value.indexable })}
        className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-colors ${value.indexable ? 'border-[#C5FF00]/30 bg-[#C5FF00]/5' : 'border-orange-400/30 bg-orange-400/5'}`}
      >
        <span>
          <span className="block font-bold text-white">Search engine visibility</span>
          <span className="mt-1 block text-sm text-white/40">{value.indexable ? 'Indexing is allowed for this page.' : 'A noindex directive will hide this page from search results.'}</span>
        </span>
        <span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${value.indexable ? 'bg-[#C5FF00] text-black' : 'bg-orange-400 text-black'}`}>
          {value.indexable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          {value.indexable ? 'Show' : 'Hide'}
        </span>
      </button>
    </div>
  )
}

export default function SeoManager() {
  const { settings, loading, saving, saveSettings } = useSeoSettings()
  const { games } = useGames()
  const [draft, setDraft] = useState<SeoSettings>(() => normalizeSeoSettings(settings))
  const [activeTab, setActiveTab] = useState<TabKey>('global')
  const [selectedGameId, setSelectedGameId] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => setDraft(normalizeSeoSettings(settings)), [settings])
  useEffect(() => {
    if (!selectedGameId && games[0]) setSelectedGameId(games[0].id)
    if (selectedGameId && !games.some(game => game.id === selectedGameId)) setSelectedGameId(games[0]?.id ?? '')
  }, [games, selectedGameId])

  const selectedGame = games.find(game => game.id === selectedGameId)
  const gameOverride: GameSeoSettings = draft.games[selectedGameId] || { title: '', description: '', primaryKeyword: '', secondaryKeywords: '', heading: '' }
  const gamePreview = useMemo(() => {
    if (!selectedGame) return null
    const fill = (template: string) => template.split('{game}').join(selectedGame.title)
    return {
      title: gameOverride.title || fill(draft.gameDefaults.titleTemplate),
      description: gameOverride.description || fill(draft.gameDefaults.descriptionTemplate),
      heading: gameOverride.heading || fill(draft.gameDefaults.headingTemplate),
    }
  }, [draft.gameDefaults, gameOverride, selectedGame])

  const updatePage = (key: SeoPageKey, value: SeoPageSettings) => {
    setDraft(current => ({ ...current, pages: { ...current.pages, [key]: value } }))
  }

  const updateGameOverride = (changes: Partial<GameSeoSettings>) => {
    if (!selectedGameId) return
    setDraft(current => ({
      ...current,
      games: {
        ...current.games,
        [selectedGameId]: { ...(current.games[selectedGameId] || { title: '', description: '', primaryKeyword: '', secondaryKeywords: '', heading: '' }), ...changes },
      },
    }))
  }

  const save = async () => {
    setError('')
    setSaved(false)
    const invalidPage = Object.values(draft.pages).find(page => !page.path.startsWith('/') || page.path.startsWith('//'))
    if (invalidPage) {
      setError(`${invalidPage.label} needs a valid canonical path beginning with one slash.`)
      return
    }
    if (Object.values(draft.pages).some(page => !page.title.trim() || !page.description.trim())) {
      setError('Every page needs an SEO title and meta description.')
      return
    }

    try {
      await saveSettings(draft)
      setSaved(true)
      window.setTimeout(() => setSaved(false), 3000)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save SEO settings.')
    }
  }

  if (loading) return <div className="p-8 text-white/50">Loading SEO settings...</div>

  return (
    <div className="mx-auto max-w-6xl pb-24">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C5FF00] text-black"><Search className="h-6 w-6" /></div>
        <div>
          <h1 className="text-3xl font-bold text-white">SEO Settings</h1>
          <p className="mt-2 max-w-3xl text-white/45">Manage search titles, descriptions, canonical URLs, headings, and keyword plans without editing source files.</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${activeTab === tab.key ? 'bg-[#C5FF00] text-black' : 'bg-white/5 text-white/45 hover:bg-white/10 hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
        {activeTab === 'global' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-bold text-white">Global search defaults</h2>
              <p className="mt-1 text-sm text-white/40">These values are used as safe fallbacks and for organization information.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Site name"><input className={fieldClass} value={draft.global.siteName} onChange={event => setDraft(current => ({ ...current, global: { ...current.global, siteName: event.target.value } }))} /></Field>
              <Field label="Default social image" hint="Use an absolute https URL or a public path such as /favicon.png."><input className={fieldClass} value={draft.global.defaultImage} onChange={event => setDraft(current => ({ ...current, global: { ...current.global, defaultImage: event.target.value } }))} /></Field>
            </div>
            <Field label="Fallback SEO title" count={`${draft.global.defaultTitle.length}/60`}><input className={fieldClass} value={draft.global.defaultTitle} onChange={event => setDraft(current => ({ ...current, global: { ...current.global, defaultTitle: event.target.value } }))} /></Field>
            <Field label="Fallback meta description" count={`${draft.global.defaultDescription.length}/160`}><textarea className={`${fieldClass} resize-y`} rows={3} value={draft.global.defaultDescription} onChange={event => setDraft(current => ({ ...current, global: { ...current.global, defaultDescription: event.target.value } }))} /></Field>
            <Field label="Organization description" hint="Used in structured data that helps search engines understand Joe Yoke."><textarea className={`${fieldClass} resize-y`} rows={3} value={draft.global.organizationDescription} onChange={event => setDraft(current => ({ ...current, global: { ...current.global, organizationDescription: event.target.value } }))} /></Field>
          </div>
        )}

        {(activeTab === 'home' || activeTab === 'games' || activeTab === 'download') && (
          <PageEditor value={draft.pages[activeTab]} onChange={next => updatePage(activeTab, next)} />
        )}

        {activeTab === 'game' && (
          <div className="flex flex-col gap-7">
            <div>
              <h2 className="text-xl font-bold text-white">Game detail SEO</h2>
              <p className="mt-1 text-sm text-white/40">Templates automatically cover newly added games. Add overrides only where a game needs unique wording.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <Field label="Title template" hint="Use {game} where the game title should appear."><input className={fieldClass} value={draft.gameDefaults.titleTemplate} onChange={event => setDraft(current => ({ ...current, gameDefaults: { ...current.gameDefaults, titleTemplate: event.target.value } }))} /></Field>
              <Field label="Description template"><textarea className={`${fieldClass} resize-y`} rows={3} value={draft.gameDefaults.descriptionTemplate} onChange={event => setDraft(current => ({ ...current, gameDefaults: { ...current.gameDefaults, descriptionTemplate: event.target.value } }))} /></Field>
              <Field label="Heading template"><input className={fieldClass} value={draft.gameDefaults.headingTemplate} onChange={event => setDraft(current => ({ ...current, gameDefaults: { ...current.gameDefaults, headingTemplate: event.target.value } }))} /></Field>
            </div>

            <div className="border-t border-white/10 pt-7">
              <Field label="Select game">
                <select className={fieldClass} value={selectedGameId} onChange={event => setSelectedGameId(event.target.value)}>
                  {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}
                </select>
              </Field>
            </div>

            {selectedGame && gamePreview && (
              <>
                <SearchPreview title={gamePreview.title} description={gamePreview.description} path={`/games/${selectedGame.id}`} />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Custom SEO title" count={`${gameOverride.title.length}/60`} hint="Leave blank to use the template."><input className={fieldClass} value={gameOverride.title} onChange={event => updateGameOverride({ title: event.target.value })} placeholder={gamePreview.title} /></Field>
                  <Field label="Custom H1 heading" hint={`Resolved heading: ${gamePreview.heading}`}><input className={fieldClass} value={gameOverride.heading} onChange={event => updateGameOverride({ heading: event.target.value })} /></Field>
                </div>
                <Field label="Custom meta description" count={`${gameOverride.description.length}/160`} hint="Leave blank to use the template."><textarea className={`${fieldClass} resize-y`} rows={3} value={gameOverride.description} onChange={event => updateGameOverride({ description: event.target.value })} placeholder={gamePreview.description} /></Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Primary target phrase"><input className={fieldClass} value={gameOverride.primaryKeyword} onChange={event => updateGameOverride({ primaryKeyword: event.target.value })} placeholder={`${selectedGame.title.toLowerCase()} online with friends`} /></Field>
                  <Field label="Related phrases"><input className={fieldClass} value={gameOverride.secondaryKeywords} onChange={event => updateGameOverride({ secondaryKeywords: event.target.value })} placeholder={`${selectedGame.title.toLowerCase()} multiplayer, how to play ${selectedGame.title.toLowerCase()}`} /></Field>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      {error && <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      <div className="mt-6 flex items-center justify-between gap-4">
        <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-white/35 hover:text-white"><Globe2 className="h-4 w-4" /> Open Search Console</a>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 rounded-xl bg-[#C5FF00] px-6 py-3 font-bold text-black hover:bg-[#d4ff33] disabled:opacity-50"><Save className="h-5 w-5" /> {saving ? 'Saving...' : 'Save SEO settings'}</button>
      </div>

      {saved && <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-xl bg-[#C5FF00] px-5 py-3.5 text-black shadow-2xl"><CheckCircle className="h-5 w-5" /><span className="text-sm font-bold">SEO settings saved</span></div>}
    </div>
  )
}
