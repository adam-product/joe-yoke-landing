import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Initialize Supabase Client
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

// 1. Bulletproof Fallback Content (Prevents blank screens!)
const DEFAULT_CONTENT: Record<string, any> = {
  hero: {
    headline: "The games\nbring you in,\nbut the\nfriendships\nkeep you\nhere.",
    subtext: "Discover multiplayer party games, host rooms, and meet gamers from across the globe in one seamless hub.",
    ctaLabel: "Download App"
  },
  about: {
    quote: "We believe gaming is better together. Our mission is to create a space where playing your favorite games naturally leads to finding your favorite people.",
    pill1: "Play",
    pill2: "Connect",
    pill3: "Belong"
  },
  games: {
    sectionTitle: "Trending Games"
  },
  stats: {
    headline: "Built for gamers,\nby gamers.",
    ctaLabel: "Join Discord",
    stat1_value: "2M+", stat1_label: "Active Players",
    stat2_value: "50+", stat2_label: "Party Games",
    stat3_value: "100k", stat3_label: "Communities",
    stat4_value: "24/7", stat4_label: "Live Events"
  },
  footer: {
    ctaHeadline: "Ready to join the fun?",
    ctaTagline: "Let's play.",
    ctaBtn: "Download App",
    copyright: "© 2026 Joe Yoke. All rights reserved."
  }
};

interface ContentContextType {
  content: Record<string, any>;
  get: (section: string, field: string) => string;
  updateContent: (sectionOrFull: any, possibleData?: any) => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with defaults immediately
  const [content, setContent] = useState<Record<string, any>>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  // 2. Fetch live content and merge it over defaults
  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('kv_store_dd2dc34e')
          .select('value')
          .eq('key', 'site_content')
          .maybeSingle();

        if (error) {
          console.error('Supabase fetch error:', error.message);
        }

        if (data?.value) {
          // Merge database data on top of defaults
          setContent((prev) => ({ ...prev, ...data.value }));
        }
      } catch (err) {
        console.error('Error fetching content:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();

    const channel = supabase
      .channel('site-content-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'kv_store_dd2dc34e', filter: 'key=eq.site_content' },
        (payload: any) => {
          if (payload.new?.value) {
            setContent((prev) => ({ ...prev, ...payload.new.value }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 3. Smart Get: Safely returns DB value, or Default value, or empty string
  const get = (section: string, field: string): string => {
    return content?.[section]?.[field] ?? DEFAULT_CONTENT[section]?.[field] ?? '';
  };

  // 4. Smart Save: Handles both full object saves and section-specific saves
  const updateContent = async (sectionOrFull: any, possibleData?: any) => {
    let newContent;
    if (typeof sectionOrFull === 'string' && possibleData) {
      newContent = { ...content, [sectionOrFull]: possibleData };
    } else {
      newContent = { ...content, ...sectionOrFull };
    }

    // Instantly update UI
    setContent(newContent);

    // Save to Supabase
    const { error } = await supabase
      .from('kv_store_dd2dc34e')
      .upsert({ key: 'site_content', value: newContent });

    if (error) {
      console.error('Database Save Failed:', error.message);
      alert('Error saving to database. Check console.');
    }
  };

  return (
    <ContentContext.Provider value={{ content, get, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within a ContentProvider');
  return context;
};