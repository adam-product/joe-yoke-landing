import { useState, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Save, ImagePlus, Pencil, Check, Film, Type, Gamepad2, BarChart3, Footprints, Plus, Trash2, Star, StarOff, ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from './AuthContext'
import { useGames, badgeColor, type GameEntry } from './GamesContext'
import { useContent } from './ContentContext'

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'color'
  value: string
  placeholder?: string
}

interface SectionDef {
  id: string
  label: string
  description: string
  icon: React.ElementType
  fields: Field[]
}

const SECTIONS: SectionDef[] = [
  {
    id: 'hero',
    label: 'Hero Section',
    description: 'The first thing visitors see — headline, subtext, and primary CTA.',
    icon: Film,
    fields: [
      { key: 'headline', label: 'Headline', type: 'textarea', value: 'The games bring you in, but the friendships keep you here.', placeholder: 'Main hero headline' },
      { key: 'subtext', label: 'Subtext / Description', type: 'textarea', value: 'Joe Yoke brings people together through the games they love. Compete, connect, and build friendships that last well beyond the scoreboard.', placeholder: 'Supporting paragraph below headline' },
      { key: 'ctaLabel', label: 'Primary CTA Button', type: 'text', value: 'Play Games', placeholder: 'e.g. Play Games' },
      { key: 'heroImage', label: 'Hero / Phone Mockup Image', type: 'image', value: '' },
      { key: 'accentColor', label: 'Accent Color', type: 'color', value: '#C5FF00' },
    ],
  },
  {
    id: 'about',
    label: 'About Section',
    description: 'The pull-quote and pill tags that summarise the Joe Yoke mission.',
    icon: Type,
    fields: [
      { key: 'quote', label: 'Pull Quote', type: 'textarea', value: 'We believe the best games are the ones played together. Joe Yoke is a platform built for real connections — where every match is a chance to meet someone new, sharpen your skills, and build a crew you can count on.', placeholder: 'Mission statement quote' },
      { key: 'pill1', label: 'Pill Tag 1', type: 'text', value: 'Play', placeholder: 'e.g. Play' },
      { key: 'pill2', label: 'Pill Tag 2', type: 'text', value: 'With', placeholder: 'e.g. With' },
      { key: 'pill3', label: 'Pill Tag 3', type: 'text', value: 'Friends', placeholder: 'e.g. Friends' },
    ],
  },
  {
    id: 'games',
    label: 'Trending Games',
    description: 'The 2×2 game card grid shown on the landing page.',
    icon: Gamepad2,
    fields: [
      { key: 'sectionTitle', label: 'Section Title', type: 'text', value: 'Trending Games', placeholder: 'Section heading' },
      { key: 'game1_badge', label: 'Game 1 — Badge', type: 'text', value: 'STRATEGY', placeholder: 'e.g. STRATEGY' },
      { key: 'game1_title', label: 'Game 1 — Title', type: 'text', value: 'Chess', placeholder: 'Game name' },
      { key: 'game1_desc', label: 'Game 1 — Description', type: 'textarea', value: 'Plan every move. Outthink your opponent across the most iconic strategy game ever made.', placeholder: 'Short description' },
      { key: 'game1_image', label: 'Game 1 — Cover Image', type: 'image', value: '' },
      { key: 'game2_badge', label: 'Game 2 — Badge', type: 'text', value: 'CUE SPORTS', placeholder: 'e.g. CUE SPORTS' },
      { key: 'game2_title', label: 'Game 2 — Title', type: 'text', value: 'Snooker', placeholder: 'Game name' },
      { key: 'game2_desc', label: 'Game 2 — Description', type: 'textarea', value: 'Precision, patience, and power. Pot balls and dominate the table against friends worldwide.', placeholder: 'Short description' },
      { key: 'game2_image', label: 'Game 2 — Cover Image', type: 'image', value: '' },
      { key: 'game3_badge', label: 'Game 3 — Badge', type: 'text', value: 'BOARD', placeholder: 'e.g. BOARD' },
      { key: 'game3_title', label: 'Game 3 — Title', type: 'text', value: 'Carrom', placeholder: 'Game name' },
      { key: 'game3_desc', label: 'Game 3 — Description', type: 'textarea', value: 'Flick, aim, and pocket. The classic board game reimagined for fast online multiplayer.', placeholder: 'Short description' },
      { key: 'game3_image', label: 'Game 3 — Cover Image', type: 'image', value: '' },
      { key: 'game4_badge', label: 'Game 4 — Badge', type: 'text', value: 'PARTY', placeholder: 'e.g. PARTY' },
      { key: 'game4_title', label: 'Game 4 — Title', type: 'text', value: "Liar's Dice", placeholder: 'Game name' },
      { key: 'game4_desc', label: 'Game 4 — Description', type: 'textarea', value: "Bluff your way to victory. Roll, bet, and deceive — the last one with dice standing wins.", placeholder: 'Short description' },
      { key: 'game4_image', label: 'Game 4 — Cover Image', type: 'image', value: '' },
    ],
  },
  {
    id: 'stats',
    label: 'Community Stats',
    description: 'The dark stats panel showing player counts and metrics.',
    icon: BarChart3,
    fields: [
      { key: 'headline', label: 'Section Headline', type: 'textarea', value: 'Millions of players\nEndless ways to connect.', placeholder: 'Headline (use \\n for line break)' },
      { key: 'ctaLabel', label: 'CTA Button Text', type: 'text', value: 'Join Now', placeholder: 'e.g. Join Now' },
      { key: 'stat1_value', label: 'Stat 1 — Value', type: 'text', value: '1M+', placeholder: 'e.g. 1M+' },
      { key: 'stat1_label', label: 'Stat 1 — Label', type: 'text', value: 'Active Players', placeholder: 'e.g. Active Players' },
      { key: 'stat2_value', label: 'Stat 2 — Value', type: 'text', value: '4%', placeholder: 'e.g. 4%' },
      { key: 'stat2_label', label: 'Stat 2 — Label', type: 'text', value: 'Monthly Growth', placeholder: 'e.g. Monthly Growth' },
      { key: 'stat3_value', label: 'Stat 3 — Value', type: 'text', value: '2M+', placeholder: 'e.g. 2M+' },
      { key: 'stat3_label', label: 'Stat 3 — Label', type: 'text', value: 'Games Played', placeholder: 'e.g. Games Played' },
      { key: 'stat4_value', label: 'Stat 4 — Value', type: 'text', value: '4.8/5', placeholder: 'e.g. 4.8/5' },
      { key: 'stat4_label', label: 'Stat 4 — Label', type: 'text', value: 'App Store Rating', placeholder: 'e.g. App Store Rating' },
    ],
  },
  {
    id: 'footer',
    label: 'Footer',
    description: 'Footer CTA, links, and copyright text.',
    icon: Footprints,
    fields: [
      { key: 'ctaHeadline', label: 'CTA Headline', type: 'text', value: "Ready to join the fun?", placeholder: 'e.g. Ready to join the fun?' },
      { key: 'ctaTagline', label: 'CTA Tagline', type: 'text', value: "Let's play.", placeholder: 'Tagline after headline' },
      { key: 'ctaBtn', label: 'CTA Button Text', type: 'text', value: 'Download App', placeholder: 'e.g. Download App' },
      { key: 'copyright', label: 'Copyright Text', type: 'text', value: '© 2025 Joe Yoke. All rights reserved.', placeholder: 'e.g. © 2025 Joe Yoke.' },
    ],
  },
]

// ─── Field components ─────────────────────────────────────────────────────────

function ImageField({ field, onChange, canEdit }: { field: Field; onChange: (v: string) => void; canEdit: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 h-20 rounded-xl border border-white/12 bg-white/3 overflow-hidden flex items-center justify-center shrink-0">
        {field.value
          ? <img src={field.value} alt={field.label} className="w-full h-full object-cover" />
          : <ImagePlus className="w-6 h-6 text-white/20" />
        }
      </div>
      {canEdit && (
        <>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/12 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all"
            >
              <ImagePlus className="w-3.5 h-3.5" /> Upload Image
            </button>
            {field.value && (
              <button onClick={() => onChange('')} className="text-xs text-red-400/70 hover:text-red-400 transition-colors text-left">
                Remove image
              </button>
            )}
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => {
            const file = e.target.files?.[0]
            if (file) onChange(URL.createObjectURL(file))
          }} />
        </>
      )}
    </div>
  )
}

function ColorField({ field, onChange, canEdit }: { field: Field; onChange: (v: string) => void; canEdit: boolean }) {
  return (
    <div className="flex items-center gap-3 h-10 px-3 bg-white/3 border border-white/12 rounded-xl w-full">
      <div className="w-5 h-5 rounded-md border border-white/20 shrink-0" style={{ background: field.value }} />
      <span className="text-sm font-mono text-white/70 flex-1">{field.value}</span>
      {canEdit && (
        <label className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white cursor-pointer transition-colors">
          <Pencil className="w-3 h-3" /> Change
          <input type="color" value={field.value} onChange={e => onChange(e.target.value)} className="w-0 h-0 opacity-0 absolute" />
        </label>
      )}
    </div>
  )
}

function TextField({ field, onChange, canEdit }: { field: Field; onChange: (v: string) => void; canEdit: boolean }) {
  const [active, setActive] = useState(false)

  return (
    <div className={`relative flex items-center border rounded-xl transition-all ${
      active ? 'border-[#C5FF00]/50 bg-[#C5FF00]/3' : 'border-white/12 bg-white/3 hover:border-white/20'
    }`}>
      {field.type === 'textarea' ? (
        <textarea
          value={field.value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholder={field.placeholder}
          rows={3}
          readOnly={!canEdit}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none resize-none"
        />
      ) : (
        <input
          value={field.value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholder={field.placeholder}
          readOnly={!canEdit}
          className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none"
        />
      )}
      <div className={`pr-3 shrink-0 transition-colors ${active ? 'text-[#C5FF00]' : 'text-white/20'}`}>
        <Pencil className="w-3.5 h-3.5" />
      </div>
    </div>
  )
}

// ─── Games section manager ────────────────────────────────────────────────────

const BADGE_OPTIONS = ['STRATEGY', 'CUE SPORTS', 'BOARD', 'PARTY', 'ACTION', 'PUZZLE', 'SPORTS', 'TRIVIA']

function GameEntryCard({ entry, canEdit, onUpdate, onDelete, onToggleFeatured }: {
  entry: GameEntry
  canEdit: boolean
  onUpdate: (patch: Partial<Omit<GameEntry, 'id'>>) => void
  onDelete: () => void
  onToggleFeatured: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const imageRef = useRef<HTMLInputElement>(null)
  const accent = badgeColor(entry.badge)

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={{ borderColor: `${accent}30`, background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)` }}
    >
      {/* Card header — always visible */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: accent }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white truncate">{entry.title || 'Untitled Game'}</p>
          <p className="text-xs font-semibold" style={{ color: accent }}>{entry.badge}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {canEdit && (
            <button
              onClick={onToggleFeatured}
              title={entry.featured ? 'Remove from trending' : 'Add to trending'}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/8"
              style={{ color: entry.featured ? '#C5FF00' : 'rgba(255,255,255,0.2)' }}
            >
              {entry.featured ? <Star className="w-3.5 h-3.5 fill-current" /> : <StarOff className="w-3.5 h-3.5" />}
            </button>
          )}
          <button onClick={() => setExpanded(e => !e)} className="p-1.5 rounded-lg hover:bg-white/8 text-white/40 hover:text-white transition-colors">
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {canEdit && (
            <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/25 hover:text-red-400 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="px-4 pb-4 flex flex-col gap-4 border-t border-white/6 pt-4">
          {/* Badge selector */}
          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-2 block">Category Badge</label>
            <div className="flex flex-wrap gap-1.5">
              {BADGE_OPTIONS.map(b => {
                const bc = badgeColor(b)
                const active = entry.badge === b
                return (
                  <button
                    key={b}
                    disabled={!canEdit}
                    onClick={() => onUpdate({ badge: b })}
                    className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wider transition-all"
                    style={{
                      background: active ? `${bc}25` : 'rgba(255,255,255,0.05)',
                      color: active ? bc : 'rgba(255,255,255,0.3)',
                      border: `1px solid ${active ? bc + '50' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    {b}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Title</label>
            <TextField
              field={{ key: 'title', label: 'Title', type: 'text', value: entry.title, placeholder: 'Game name' }}
              onChange={v => onUpdate({ title: v })}
              canEdit={canEdit}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Description</label>
            <TextField
              field={{ key: 'desc', label: 'Description', type: 'textarea', value: entry.description, placeholder: 'Short game description' }}
              onChange={v => onUpdate({ description: v })}
              canEdit={canEdit}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-1.5 block">Cover Image</label>
            <div className="flex items-center gap-4">
              <div className="w-28 h-18 rounded-xl border border-white/12 bg-white/3 overflow-hidden flex items-center justify-center shrink-0" style={{ height: 72 }}>
                {entry.imageUrl
                  ? <img src={entry.imageUrl} alt={entry.title} className="w-full h-full object-cover" />
                  : <ImagePlus className="w-5 h-5 text-white/20" />
                }
              </div>
              {canEdit && (
                <>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => imageRef.current?.click()}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/12 rounded-xl text-xs font-semibold text-white/60 hover:text-white transition-all"
                    >
                      <ImagePlus className="w-3.5 h-3.5" /> Upload
                    </button>
                    {entry.imageUrl && (
                      <button onClick={() => onUpdate({ imageUrl: '' })} className="text-xs text-red-400/60 hover:text-red-400 transition-colors">
                        Remove
                      </button>
                    )}
                  </div>
                  <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={e => {
                    const f = e.target.files?.[0]
                    if (f) onUpdate({ imageUrl: URL.createObjectURL(f) })
                  }} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GamesManager({ canEdit }: { canEdit: boolean }) {
  const { games, addGame, updateGame, deleteGame } = useGames()
  const featuredCount = games.filter(g => g.featured).length

  const handleAdd = () => {
    addGame({ badge: 'STRATEGY', title: 'New Game', description: 'Describe this game...', imageUrl: '', featured: false })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-white">{games.length} games — <span className="text-[#C5FF00]">{featuredCount} trending</span></p>
          <p className="text-xs text-white/35 mt-0.5">Star icon = shown in Trending section on landing page</p>
        </div>
        {canEdit && (
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#C5FF00] text-[#0A0A0A] rounded-xl text-xs font-bold hover:bg-[#d4ff33] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Game
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {games.map(entry => (
          <GameEntryCard
            key={entry.id}
            entry={entry}
            canEdit={canEdit}
            onUpdate={patch => updateGame(entry.id, patch)}
            onDelete={() => deleteGame(entry.id)}
            onToggleFeatured={() => updateGame(entry.id, { featured: !entry.featured })}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Section page ─────────────────────────────────────────────────────────────

export default function ContentManager() {
  const { sectionId } = useParams<{ sectionId: string }>()
  const { can } = useAuth()
  const canEdit = can('edit_content')
  const { get, setField } = useContent()
  const [saved, setSaved] = useState(false)

  const section = SECTIONS.find(s => s.id === sectionId) ?? null
  if (!section) return <Navigate to="/admin/content/hero" replace />

  const Icon = section.icon

  // Read live value from shared context (falls back to SECTIONS default)
  const getVal = (key: string) => get(section.id, key) || (section.fields.find(f => f.key === key)?.value ?? '')

  const handleChange = (key: string, value: string) => {
    setField(section.id, key, value)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C5FF00]/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#C5FF00]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{section.label}</h1>
            <p className="text-white/40 text-sm mt-0.5">{section.description}</p>
          </div>
        </div>

        {!canEdit && (
          <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-semibold shrink-0">
            View only
          </span>
        )}
      </div>

      {/* Fields */}
      {section.id === 'games' ? (
        <GamesManager canEdit={canEdit} />
      ) : (
        <div className="flex flex-col gap-5">
          {section.fields.map(field => {
            const fieldWithVal = { ...field, value: getVal(field.key) }
            return (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-white/40 tracking-widest uppercase">{field.label}</label>
                {field.type === 'image' ? (
                  <ImageField field={fieldWithVal} onChange={v => handleChange(field.key, v)} canEdit={canEdit} />
                ) : field.type === 'color' ? (
                  <ColorField field={fieldWithVal} onChange={v => handleChange(field.key, v)} canEdit={canEdit} />
                ) : (
                  <TextField field={fieldWithVal} onChange={v => handleChange(field.key, v)} canEdit={canEdit} />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Save — hidden for games section (auto-saved via context) */}
      {canEdit && section.id !== 'games' && (
        <div className="flex justify-end pt-2 border-t border-white/8">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              saved
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : 'bg-[#C5FF00] text-[#0A0A0A] hover:bg-[#d4ff33]'
            }`}
          >
            {saved ? <><Check className="w-4 h-4" /> Changes saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      )}
    </div>
  )
}
