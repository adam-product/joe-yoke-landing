import { useEffect, useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle, ChevronDown, ChevronUp, ImagePlus, Plus, Save, Trash2 } from 'lucide-react'
import { fallbackGameImage } from '../gameAssets'
import { useGames, type GameEntry, type GameGuideStep } from './GamesContext'

function cloneGame(game: GameEntry): GameEntry {
  return { ...game, howToPlay: game.howToPlay.map(step => ({ ...step })) }
}

function readImage(file: File, onLoad: (value: string) => void) {
  const reader = new FileReader()
  reader.onloadend = () => onLoad(String(reader.result ?? ''))
  reader.readAsDataURL(file)
}

export default function GameDetailsManager() {
  const { games, loading, updateGame } = useGames()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedId = searchParams.get('game') ?? ''
  const [selectedId, setSelectedId] = useState(requestedId)
  const [draft, setDraft] = useState<GameEntry | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (requestedId && games.some(game => game.id === requestedId) && selectedId !== requestedId) {
      setSelectedId(requestedId)
      return
    }
    if (!selectedId && games[0]) setSelectedId(games[0].id)
    if (selectedId && !games.some(game => game.id === selectedId) && games[0]) setSelectedId(games[0].id)
  }, [games, requestedId, selectedId])

  useEffect(() => {
    const selected = games.find(game => game.id === selectedId)
    setDraft(selected ? cloneGame(selected) : null)
  }, [games, selectedId])

  const updateDraft = <K extends keyof GameEntry>(key: K, value: GameEntry[K]) => {
    setDraft(current => current ? { ...current, [key]: value } : current)
  }

  const updateStep = (stepId: string, patch: Partial<GameGuideStep>) => {
    setDraft(current => current ? {
      ...current,
      howToPlay: current.howToPlay.map(step => step.id === stepId ? { ...step, ...patch } : step),
    } : current)
  }

  const addStep = () => {
    setDraft(current => current ? {
      ...current,
      howToPlay: [...current.howToPlay, {
        id: `${current.id}-step-${Date.now()}`,
        title: `Step ${current.howToPlay.length + 1}`,
        description: '',
        imageUrl: '',
      }],
    } : current)
  }

  const removeStep = (stepId: string) => {
    setDraft(current => current ? {
      ...current,
      howToPlay: current.howToPlay.filter(step => step.id !== stepId),
    } : current)
  }

  const moveStep = (stepId: string, direction: -1 | 1) => {
    setDraft(current => {
      if (!current) return current
      const fromIndex = current.howToPlay.findIndex(step => step.id === stepId)
      const toIndex = fromIndex + direction
      if (fromIndex < 0 || toIndex < 0 || toIndex >= current.howToPlay.length) return current

      const howToPlay = [...current.howToPlay]
      const [step] = howToPlay.splice(fromIndex, 1)
      howToPlay.splice(toIndex, 0, step)
      return { ...current, howToPlay }
    })
  }

  const uploadBanner = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) readImage(file, value => updateDraft('imageUrl', value))
  }

  const uploadStepImage = (stepId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) readImage(file, value => updateStep(stepId, { imageUrl: value }))
  }

  const save = async () => {
    if (!draft) return
    setSaving(true)
    setSaved(false)
    setError('')

    try {
      const { id: _id, ...changes } = draft
      await updateGame(draft.id, changes)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save game details.')
    } finally {
      setSaving(false)
    }
  }

  if (loading && games.length === 0) {
    return <div className="text-white/50 p-8">Loading games…</div>
  }

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Game Details</h1>
        <p className="text-gray-400">Edit each game’s banner, description, and step-by-step player guide.</p>
      </div>

      <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
        <aside className="bg-[#111] border border-white/10 rounded-2xl p-3 h-fit lg:sticky lg:top-8">
          <p className="px-3 py-2 text-[10px] font-bold tracking-widest uppercase text-white/35">Select a game</p>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => {
                  setSelectedId(game.id)
                  setSearchParams({ game: game.id }, { replace: true })
                }}
                className={`min-w-40 lg:min-w-0 w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${selectedId === game.id ? 'bg-[#C5FF00] text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
              >
                <img src={fallbackGameImage(game)} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <span className="font-bold text-sm truncate">{game.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {draft ? (
          <div className="flex flex-col gap-6">
            <section className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-7">
                <div>
                  <h2 className="text-xl font-bold text-white">Game overview</h2>
                  <p className="text-sm text-white/40 mt-1">These fields appear on cards and the detail page.</p>
                </div>
                <label className="flex items-center gap-2 text-sm font-semibold text-white/60">
                  <input type="checkbox" checked={draft.featured} onChange={event => updateDraft('featured', event.target.checked)} className="accent-[#C5FF00] w-4 h-4" />
                  Trending
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/40">Game title</span>
                  <input value={draft.title} onChange={event => updateDraft('title', event.target.value)} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00]" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-white/40">Badge</span>
                  <input value={draft.badge} onChange={event => updateDraft('badge', event.target.value.toUpperCase())} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00]" />
                </label>
              </div>

              <label className="flex flex-col gap-2 mt-5">
                <span className="text-xs font-bold tracking-widest uppercase text-white/40">Game description</span>
                <textarea value={draft.description} onChange={event => updateDraft('description', event.target.value)} rows={5} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white leading-relaxed resize-y focus:outline-none focus:border-[#C5FF00]" />
              </label>

              <div className="mt-6 grid md:grid-cols-[220px_minmax(0,1fr)] gap-5 items-start">
                <img src={fallbackGameImage(draft)} alt="Banner preview" className="w-full aspect-video rounded-xl object-cover border border-white/10" />
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-bold tracking-widest uppercase text-white/40">Banner image URL</label>
                  <input value={draft.imageUrl} onChange={event => updateDraft('imageUrl', event.target.value)} placeholder="https://…" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00]" />
                  <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm font-bold text-white/60 hover:text-white hover:border-[#C5FF00]/50 cursor-pointer">
                    <ImagePlus className="w-4 h-4" /> Upload banner
                    <input type="file" accept="image/*" onChange={uploadBanner} className="hidden" />
                  </label>
                </div>
              </div>
            </section>

            <section className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
                <div>
                  <h2 className="text-xl font-bold text-white">How to play</h2>
                  <p className="text-sm text-white/40 mt-1">Add, remove, and reorder content by editing the numbered steps.</p>
                </div>
                <button onClick={addStep} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/15">
                  <Plus className="w-4 h-4" /> Add step
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {draft.howToPlay.map((step, index) => (
                  <div key={step.id} className="relative rounded-2xl border border-white/10 bg-black/20 p-5 md:p-6">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm font-black text-[#C5FF00]">STEP {String(index + 1).padStart(2, '0')}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveStep(step.id, -1)} disabled={index === 0} className="p-2 text-white/35 hover:text-white disabled:opacity-20" aria-label={`Move step ${index + 1} up`}>
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button onClick={() => moveStep(step.id, 1)} disabled={index === draft.howToPlay.length - 1} className="p-2 text-white/35 hover:text-white disabled:opacity-20" aria-label={`Move step ${index + 1} down`}>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeStep(step.id)} className="p-2 text-white/30 hover:text-red-400" aria-label={`Delete step ${index + 1}`}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[180px_minmax(0,1fr)] gap-5">
                      <div className="flex flex-col gap-3">
                        {step.imageUrl ? (
                          <img src={step.imageUrl} alt="Step preview" className="w-full aspect-video md:aspect-square rounded-xl object-cover border border-white/10" />
                        ) : (
                          <div className="w-full aspect-video md:aspect-square rounded-xl bg-white/5 border border-dashed border-white/15 flex items-center justify-center text-white/25">
                            <ImagePlus className="w-7 h-7" />
                          </div>
                        )}
                        <label className="text-center rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-white/55 hover:text-white cursor-pointer">
                          Upload image
                          <input type="file" accept="image/*" onChange={event => uploadStepImage(step.id, event)} className="hidden" />
                        </label>
                        {step.imageUrl && (
                          <button
                            type="button"
                            onClick={() => updateStep(step.id, { imageUrl: '' })}
                            className="flex items-center justify-center gap-2 rounded-lg border border-red-400/20 px-3 py-2 text-xs font-bold text-red-400/70 hover:border-red-400/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove image
                          </button>
                        )}
                      </div>
                      <div className="flex flex-col gap-4">
                        <label className="flex flex-col gap-2">
                          <span className="text-xs font-bold tracking-widest uppercase text-white/40">Step title</span>
                          <input value={step.title} onChange={event => updateStep(step.id, { title: event.target.value })} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00]" />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-xs font-bold tracking-widest uppercase text-white/40">Instructions</span>
                          <textarea value={step.description} onChange={event => updateStep(step.id, { description: event.target.value })} rows={4} className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white leading-relaxed resize-y focus:outline-none focus:border-[#C5FF00]" />
                        </label>
                        <label className="flex flex-col gap-2">
                          <span className="text-xs font-bold tracking-widest uppercase text-white/40">Image URL</span>
                          <input value={step.imageUrl} onChange={event => updateStep(step.id, { imageUrl: event.target.value })} placeholder="https://…" className="bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C5FF00]" />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                {draft.howToPlay.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/15 p-8 text-center text-white/35">No guide steps yet. Add the first step above.</div>
                )}
              </div>
            </section>

            {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm">{error}</div>}

            <div className="flex justify-end">
              <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-[#C5FF00] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#d4ff33] disabled:opacity-50">
                <Save className="w-5 h-5" /> {saving ? 'Saving…' : 'Save game details'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-10 text-white/40">No games are available.</div>
        )}
      </div>

      {saved && (
        <div className="fixed bottom-8 right-8 bg-[#C5FF00] text-black px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 z-50">
          <CheckCircle className="w-5 h-5" />
          <span className="font-bold text-sm">Game details saved</span>
        </div>
      )}
    </div>
  )
}
