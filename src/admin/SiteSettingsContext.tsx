import { createContext, useContext, useState, ReactNode } from 'react'

interface SiteSettings {
  heroImageUrl: string
  setHeroImageUrl: (url: string) => void
}

const Ctx = createContext<SiteSettings | null>(null)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [heroImageUrl, setHeroImageUrl] = useState('')
  return <Ctx.Provider value={{ heroImageUrl, setHeroImageUrl }}>{children}</Ctx.Provider>
}

export function useSiteSettings() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useSiteSettings must be inside SiteSettingsProvider')
  return ctx
}
