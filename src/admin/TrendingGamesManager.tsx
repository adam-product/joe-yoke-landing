import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, CheckCircle, ImagePlus, Plus, Save, Trash2, X } from 'lucide-react'
import { fallbackGameImage } from '../gameAssets'
import { useGames, type GameEntry } from './GamesContext'

type GameDraft = Pick<GameEntry, 'title' | 'badge' | 'description' | 'imageUrl'>

const EMPTY_GAME: GameDraft = {
  title: '',
  badge: 'GAME',
  description: '',
  imageUrl: '',
}

function toDraft(game?: GameEntry): GameDraft {
  return game ? {
    title: game.title,
    badge: game.badge,
    description: game.description,
    imageUrl: game.imageUrl,
  } : { ...EMPTY_GAME }
}

function readImage(file: File, onLoad: (value: string) => void) {
  const reader = new FileReader()
  reader.onloadend = () => onLoad(String(reader.result ?? ''))
  reader.readAsDataURL(file)
}

interface GameEditorProps {
  game?: GameEntry
  onSave: (draft: GameDraft) => Promise<void>
  onCancel?: () => void
  onRemove?: () => Promise<void>
  onOpenDetails?: () => void
}

function GameEditor({ game, onSave, onCancel, onRemove, onOpenDetails }: GameEditorProps) {
  const [draft, setDraft] = useState<GameDraft>(() => toDraft(game))
  const [saving, setSaving] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setDraft(toDraft(game))
  }, [game])

  const setField = <K extends keyof GameDraft>(key: K, value: GameDraft[K]) => {
    setDraft(current => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) readImage(file, value => setField('imageUrl', value))
  }

  const save = async () => {
    if (!draft.title.trim()) {
      setError('Game title is required.')
      return
    }

    setSaving(true)
    setSaved(false)
    setError('')
    try {
      await onSave({
        ...draft,
        title: draft.title.trim(),
        badge: draft.badge.trim().toUpperCase() || 'GAME',
        description: draft.description.trim(),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save this game.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!onRemove) return
    setRemoving(true)
    setError('')
    try {
      await onRemove()
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Unable to remove this game from Trending.')
      setRemoving(false)
    }
  }

  const preview = draft.imageUrl || (game ? fallbackGameImage(game) : '')

  return (
    <article className="rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C5FF00]">{game ? 'Trending game' : 'New trending game'}</p>
          <h3 className="mt-1 text-lg font-bold text-white">{draft.title || 'Add game information'}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {onOpenDetails && (
            <button type="button" onClick={onOpenDetails} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/55 transition-colors hover:border-white/25 hover:text-white">
              Edit full details <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          )}
          {onCancel && (
            <button type="button" onClick={onCancel} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-bold text-white/55 transition-colors hover:text-white">
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-[200px_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          {preview ? (
            <img src={preview} alt="Game banner preview" className="aspect-video w-full rounded-xl border border-white/10 object-cover md:aspect-square" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 text-white/25 md:aspect-square">
              <ImagePlus className="h-7 w-7" />
            </div>
          )}
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-white/55 transition-colors hover:text-white">
            <ImagePlus className="h-3.5 w-3.5" /> Upload banner
            <input type="file" accept="image/*" onChange={uploadImage} className="hidden" />
          </label>
          {draft.imageUrl && (
            <button type="button" onClick={() => setField('imageUrl', '')} className="flex items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-xs font-bold text-red-400/70 transition-colors hover:border-red-400/40 hover:text-red-400">
              <Trash2 className="h-3.5 w-3.5" /> Remove banner
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Game title</span>
              <input value={draft.title} onChange={event => setField('title', event.target.value)} placeholder="Game title" className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white focus:border-[#C5FF00] focus:outline-none" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Badge / category</span>
              <input value={draft.badge} onChange={event => setField('badge', event.target.value.toUpperCase())} placeholder="GAME" className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white focus:border-[#C5FF00] focus:outline-none" />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Short description</span>
            <textarea value={draft.description} onChange={event => setField('description', event.target.value)} rows={4} placeholder="Describe the game" className="resize-y rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 leading-relaxed text-white focus:border-[#C5FF00] focus:outline-none" />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Banner image URL</span>
            <input value={draft.imageUrl} onChange={event => setField('imageUrl', event.target.value)} placeholder="https://..." className="rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-white focus:border-[#C5FF00] focus:outline-none" />
          </label>
        </div>
      </div>

      {error && <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      <div className="mt-5 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
        {onRemove ? (
          <button type="button" onClick={remove} disabled={removing || saving} className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-2.5 text-sm font-bold text-red-400/70 transition-colors hover:border-red-400/40 hover:text-red-400 disabled:opacity-40">
            <Trash2 className="h-4 w-4" /> {removing ? 'Removing...' : 'Remove from Trending'}
          </button>
        ) : <span />}
        <button type="button" onClick={save} disabled={saving || removing} className="flex items-center justify-center gap-2 rounded-xl bg-[#C5FF00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#d4ff33] disabled:opacity-50">
          {saved ? <CheckCircle className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving...' : saved ? 'Saved' : game ? 'Save game' : 'Add game'}
        </button>
      </div>
    </article>
  )
}

export default function TrendingGamesManager() {
  const navigate = useNavigate()
  const { games, loading, addGame, updateGame } = useGames()
  const [adding, setAdding] = useState(false)
  const featuredGames = games.filter(game => game.featured)

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-[#111] p-6 md:p-8">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Trending game cards</h2>
          <p className="mt-1 text-sm text-white/40">Games saved here use the same records as Game Details and the public website.</p>
        </div>
        <button type="button" onClick={() => setAdding(true)} disabled={adding} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/15 disabled:opacity-40">
          <Plus className="h-4 w-4" /> Add more game
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {adding && (
          <GameEditor
            onCancel={() => setAdding(false)}
            onSave={async draft => {
              await addGame({ ...draft, featured: true, howToPlay: [] })
              setAdding(false)
            }}
          />
        )}

        {featuredGames.map(game => (
          <GameEditor
            key={game.id}
            game={game}
            onSave={draft => updateGame(game.id, { ...draft, featured: true })}
            onRemove={() => updateGame(game.id, { featured: false })}
            onOpenDetails={() => navigate(`/game-details?game=${encodeURIComponent(game.id)}`)}
          />
        ))}

        {!loading && !adding && featuredGames.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-white/35">No trending games yet. Add your first game above.</div>
        )}

        {loading && featuredGames.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/15 p-10 text-center text-white/35">Loading games...</div>
        )}
      </div>
    </section>
  )
}
