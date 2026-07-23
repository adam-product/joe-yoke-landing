import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// Default values — single source of truth for all editable content
export const CONTENT_DEFAULTS: Record<string, Record<string, string>> = {
  hero: {
    headline: 'The games bring you in, but the friendships keep you here.',
    subtext: 'Joe Yoke brings people together through the games they love. Compete, connect, and build friendships that last well beyond the scoreboard.',
    ctaLabel: 'Play Games',
    heroImage: '',
    accentColor: '#C5FF00',
  },
  about: {
    quote: 'We believe the best games are the ones played together. Joe Yoke is a platform built for real connections — where every match is a chance to meet someone new, sharpen your skills, and build a crew you can count on.',
    pill1: 'Play',
    pill2: 'With',
    pill3: 'Friends',
  },
  games: {
    sectionTitle: 'Trending Games',
  },
  stats: {
    headline: 'Millions of players\nEndless ways to connect.',
    ctaLabel: 'Join Now',
    stat1_value: '1M+',  stat1_label: 'Active Players',
    stat2_value: '4%',   stat2_label: 'Monthly Growth',
    stat3_value: '2M+',  stat3_label: 'Games Played',
    stat4_value: '4.8/5', stat4_label: 'App Store Rating',
  },
  footer: {
    ctaHeadline: 'Ready to join the fun?',
    ctaTagline: "Let's play.",
    ctaBtn: 'Download App',
    copyright: '© 2026 Joe Yoke. All rights reserved.',
  },
}

interface ContentCtx {
  values: Record<string, Record<string, string>>
  setField: (sectionId: string, key: string, value: string) => void
  get: (sectionId: string, key: string) => string
}

const Ctx = createContext<ContentCtx | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, Record<string, string>>>(
    () => structuredClone(CONTENT_DEFAULTS)
  )

  const setField = useCallback((sectionId: string, key: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [key]: value },
    }))
  }, [])

  const get = useCallback((sectionId: string, key: string): string => {
    return values[sectionId]?.[key] ?? CONTENT_DEFAULTS[sectionId]?.[key] ?? ''
  }, [values])

  return <Ctx.Provider value={{ values, setField, get }}>{children}</Ctx.Provider>
}

export function useContent() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useContent must be inside ContentProvider')
  return ctx
}
