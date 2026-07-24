import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from '../../utils/supabase/info'

// Initialize Supabase Client
const supabaseUrl = `https://${projectId}.supabase.co`
const supabase = createClient(supabaseUrl, publicAnonKey)

interface ContentContextType {
  content: Record<string, any>
  get: (section: string, field: string) => string
  updateContent: (newContent: any) => Promise<void>
  loading: boolean
}

const ContentContext = createContext<ContentContextType | null>(null)

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)

  // 1. Fetch live content from Supabase DB on initial page load
  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('kv_store_dd2dc34e')
          .select('value')
          .eq('key', 'site_content')
          .maybeSingle()

        if (error) {
          console.error('Error fetching site content from Supabase:', error.message)
        } else if (data?.value) {
          setContent(data.value)
        }
      } catch (err) {
        console.error('Unexpected error loading content:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()

    // 2. Realtime Listener: Automatically update website text whenever the DB changes
    const channel = supabase
      .channel('site-content-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'kv_store_dd2dc34e',
          filter: 'key=eq.site_content',
        },
        (payload: any) => {
          if (payload.new?.value) {
            setContent(payload.new.value)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Helper method used throughout App.tsx to safely retrieve text values
  const get = (section: string, field: string): string => {
    return content?.[section]?.[field] || ''
  }

  // 3. Save function called by the Admin Content Manager
  const updateContent = async (newContent: any) => {
    // Instantly update local UI
    setContent(newContent)

    // Save globally to Supabase table
    const { error } = await supabase
      .from('kv_store_dd2dc34e')
      .upsert({ key: 'site_content', value: newContent })

    if (error) {
      console.error('Failed to save content to Supabase:', error.message)
    }
  }

  return (
    <ContentContext.Provider value={{ content, get, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}