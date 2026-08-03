import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../../utils/supabase/info'
import type { GameEntry } from './GamesContext'

const supabase = createClient(`https://${projectId}.supabase.co`, publicAnonKey)
const SEO_STORAGE_KEY = 'site_seo'

export type SeoPageKey = 'home' | 'games' | 'download'

export interface SeoPageSettings {
  label: string
  path: string
  title: string
  description: string
  primaryKeyword: string
  secondaryKeywords: string
  heading: string
  intro: string
  indexable: boolean
}

export interface GameSeoSettings {
  title: string
  description: string
  primaryKeyword: string
  secondaryKeywords: string
  heading: string
}

export interface SeoSettings {
  global: {
    siteName: string
    defaultTitle: string
    defaultDescription: string
    defaultImage: string
    organizationDescription: string
  }
  pages: Record<SeoPageKey, SeoPageSettings>
  gameDefaults: {
    titleTemplate: string
    descriptionTemplate: string
    headingTemplate: string
  }
  games: Record<string, GameSeoSettings>
}

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  global: {
    siteName: 'Joe Yoke',
    defaultTitle: 'Joe Yoke - Social Games App for Playing With Friends',
    defaultDescription: 'Play multiplayer games, discover new favorites, connect with friends, and join the Joe Yoke gaming community.',
    defaultImage: '/favicon.png',
    organizationDescription: 'A multiplayer social games app and gaming community for playing games with friends.',
  },
  pages: {
    home: {
      label: 'Homepage',
      path: '/',
      title: 'Joe Yoke - Social Games App for Playing With Friends',
      description: 'Play chess, carrom, snooker and party games with friends on Joe Yoke, a multiplayer social games app for Android and iPhone.',
      primaryKeyword: 'social games app',
      secondaryKeywords: 'multiplayer games with friends, mobile gaming community, play social games online',
      heading: '',
      intro: '',
      indexable: true,
    },
    games: {
      label: 'Games page',
      path: '/games',
      title: 'Multiplayer Social Games - Chess, Carrom and More | Joe Yoke',
      description: 'Discover multiplayer social games including chess, carrom, snooker and party games. Play with friends using the Joe Yoke app.',
      primaryKeyword: 'multiplayer social games',
      secondaryKeywords: 'play chess with friends, multiplayer carrom app, online snooker with friends',
      heading: 'Multiplayer Social Games',
      intro: 'Browse chess, carrom, snooker and party games that you can play online with friends.',
      indexable: true,
    },
    download: {
      label: 'Download page',
      path: '/download',
      title: 'Download Joe Yoke Social Games App for iOS and Android',
      description: 'Download Joe Yoke for Android or iPhone and start playing multiplayer social games with your friends.',
      primaryKeyword: 'download social games app',
      secondaryKeywords: 'multiplayer games app Android, social games app iPhone, Joe Yoke download',
      heading: '',
      intro: '',
      indexable: true,
    },
  },
  gameDefaults: {
    titleTemplate: 'Play {game} Online With Friends | Joe Yoke',
    descriptionTemplate: 'Play {game} with friends on Joe Yoke. Learn the rules, gameplay and strategies, then download the multiplayer social games app.',
    headingTemplate: 'Play {game} Online With Friends',
  },
  games: {},
}

const cleanString = (value: unknown, fallback = '') => typeof value === 'string' ? value.trim() || fallback : fallback

function normalizePage(value: Partial<SeoPageSettings> | undefined, fallback: SeoPageSettings): SeoPageSettings {
  const path = cleanString(value?.path, fallback.path)
  return {
    label: fallback.label,
    path: path.startsWith('/') && !path.startsWith('//') ? path : fallback.path,
    title: cleanString(value?.title, fallback.title),
    description: cleanString(value?.description, fallback.description),
    primaryKeyword: cleanString(value?.primaryKeyword, fallback.primaryKeyword),
    secondaryKeywords: cleanString(value?.secondaryKeywords, fallback.secondaryKeywords),
    heading: typeof value?.heading === 'string' ? value.heading.trim() : fallback.heading,
    intro: typeof value?.intro === 'string' ? value.intro.trim() : fallback.intro,
    indexable: value?.indexable !== false,
  }
}

export function normalizeSeoSettings(value: Partial<SeoSettings> | null | undefined): SeoSettings {
  const global = value?.global || DEFAULT_SEO_SETTINGS.global
  const games = Object.fromEntries(
    Object.entries(value?.games || {}).map(([id, entry]) => [id, {
      title: cleanString(entry?.title),
      description: cleanString(entry?.description),
      primaryKeyword: cleanString(entry?.primaryKeyword),
      secondaryKeywords: cleanString(entry?.secondaryKeywords),
      heading: cleanString(entry?.heading),
    }]),
  )

  return {
    global: {
      siteName: cleanString(global.siteName, DEFAULT_SEO_SETTINGS.global.siteName),
      defaultTitle: cleanString(global.defaultTitle, DEFAULT_SEO_SETTINGS.global.defaultTitle),
      defaultDescription: cleanString(global.defaultDescription, DEFAULT_SEO_SETTINGS.global.defaultDescription),
      defaultImage: cleanString(global.defaultImage, DEFAULT_SEO_SETTINGS.global.defaultImage),
      organizationDescription: cleanString(global.organizationDescription, DEFAULT_SEO_SETTINGS.global.organizationDescription),
    },
    pages: {
      home: normalizePage(value?.pages?.home, DEFAULT_SEO_SETTINGS.pages.home),
      games: normalizePage(value?.pages?.games, DEFAULT_SEO_SETTINGS.pages.games),
      download: normalizePage(value?.pages?.download, DEFAULT_SEO_SETTINGS.pages.download),
    },
    gameDefaults: {
      titleTemplate: cleanString(value?.gameDefaults?.titleTemplate, DEFAULT_SEO_SETTINGS.gameDefaults.titleTemplate),
      descriptionTemplate: cleanString(value?.gameDefaults?.descriptionTemplate, DEFAULT_SEO_SETTINGS.gameDefaults.descriptionTemplate),
      headingTemplate: cleanString(value?.gameDefaults?.headingTemplate, DEFAULT_SEO_SETTINGS.gameDefaults.headingTemplate),
    },
    games,
  }
}

const applyGameTemplate = (template: string, game: GameEntry) => template.split('{game}').join(game.title)

interface SeoContextValue {
  settings: SeoSettings
  loading: boolean
  saving: boolean
  pageSeo: (key: SeoPageKey) => SeoPageSettings
  gameSeo: (game: GameEntry) => GameSeoSettings
  saveSettings: (next: SeoSettings) => Promise<void>
}

const SeoContext = createContext<SeoContextValue | null>(null)

export function SeoProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SeoSettings>(DEFAULT_SEO_SETTINGS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true

    const load = async () => {
      const { data, error } = await supabase
        .from('kv_store_dd2dc34e')
        .select('value')
        .eq('key', SEO_STORAGE_KEY)
        .maybeSingle()

      if (!active) return
      if (error) console.error('Unable to load SEO settings:', error.message)
      if (data?.value) setSettings(normalizeSeoSettings(data.value))
      setLoading(false)
    }

    load()

    const channel = supabase
      .channel('site-seo-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kv_store_dd2dc34e', filter: `key=eq.${SEO_STORAGE_KEY}` },
        (payload: any) => {
          if (payload.new?.value) setSettings(normalizeSeoSettings(payload.new.value))
        },
      )
      .subscribe()

    return () => {
      active = false
      supabase.removeChannel(channel)
    }
  }, [])

  const value = useMemo<SeoContextValue>(() => ({
    settings,
    loading,
    saving,
    pageSeo: key => settings.pages[key],
    gameSeo: game => {
      const override = settings.games[game.id]
      return {
        title: override?.title || applyGameTemplate(settings.gameDefaults.titleTemplate, game),
        description: override?.description || applyGameTemplate(settings.gameDefaults.descriptionTemplate, game),
        primaryKeyword: override?.primaryKeyword || `${game.title.toLowerCase()} online with friends`,
        secondaryKeywords: override?.secondaryKeywords || `${game.title.toLowerCase()} multiplayer, how to play ${game.title.toLowerCase()}`,
        heading: override?.heading || applyGameTemplate(settings.gameDefaults.headingTemplate, game),
      }
    },
    saveSettings: async next => {
      const normalized = normalizeSeoSettings(next)
      const previous = settings
      setSettings(normalized)
      setSaving(true)
      const { error } = await supabase.from('kv_store_dd2dc34e').upsert({ key: SEO_STORAGE_KEY, value: normalized })
      setSaving(false)
      if (error) {
        setSettings(previous)
        throw new Error(error.message)
      }
    },
  }), [settings, loading, saving])

  return <SeoContext.Provider value={value}>{children}</SeoContext.Provider>
}

export function useSeoSettings() {
  const context = useContext(SeoContext)
  if (!context) throw new Error('useSeoSettings must be used within SeoProvider')
  return context
}
