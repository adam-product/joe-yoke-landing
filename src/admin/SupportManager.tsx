import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Clock3, Headphones, KeyRound, Loader2, Mail, MessageCircle, RefreshCw, Search, Send, User } from 'lucide-react'
import {
  getAdminConversations,
  sendAdminReply,
  updateAdminConversation,
  type SupportConversation,
  type SupportStatus,
} from '../supportApi'

const TOKEN_KEY = 'joeyoke_support_admin_token'

function formatTime(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}

function statusStyle(status: SupportStatus) {
  if (status === 'needs_attention') return 'bg-amber-400/10 text-amber-300 border-amber-400/20'
  if (status === 'resolved') return 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
  return 'bg-blue-400/10 text-blue-300 border-blue-400/20'
}

export default function SupportManager() {
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [tokenInput, setTokenInput] = useState('')
  const [conversations, setConversations] = useState<SupportConversation[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [reply, setReply] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | SupportStatus>('all')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const load = async (token = adminToken, quiet = false) => {
    if (!token) return false
    if (!quiet) setLoading(true)
    setError('')
    try {
      const result = await getAdminConversations(token)
      setConversations(result.conversations)
      setSelectedId(current => current || result.conversations[0]?.id || '')
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load support conversations.')
      return false
    } finally {
      if (!quiet) setLoading(false)
    }
  }

  useEffect(() => {
    if (!adminToken) return
    load(adminToken)
    const timer = window.setInterval(() => load(adminToken, true), 15000)
    return () => window.clearInterval(timer)
  }, [adminToken])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return conversations.filter(item => {
      if (filter !== 'all' && item.status !== filter) return false
      if (!needle) return true
      const haystack = `${item.subject} ${item.visitor.name || ''} ${item.visitor.email || ''} ${item.messages.map(message => message.content).join(' ')}`.toLowerCase()
      return haystack.includes(needle)
    })
  }, [conversations, filter, query])

  const selected = conversations.find(item => item.id === selectedId) || null
  const unreadCount = conversations.reduce((sum, item) => sum + (item.unreadByAdmin || 0), 0)
  const attentionCount = conversations.filter(item => item.status === 'needs_attention').length

  const unlock = async () => {
    const clean = tokenInput.trim()
    if (!clean) return
    const valid = await load(clean)
    if (valid) {
      sessionStorage.setItem(TOKEN_KEY, clean)
      setAdminToken(clean)
      setTokenInput('')
    }
  }

  const selectConversation = async (conversation: SupportConversation) => {
    setSelectedId(conversation.id)
    if (conversation.unreadByAdmin > 0) {
      try {
        const result = await updateAdminConversation(conversation.id, { markRead: true }, adminToken)
        setConversations(items => items.map(item => item.id === conversation.id ? result.conversation : item))
      } catch {
        // Reading the thread should still work if the read receipt fails.
      }
    }
  }

  const submitReply = async () => {
    if (!selected || !reply.trim() || sending) return
    setSending(true)
    setError('')
    try {
      const result = await sendAdminReply(selected.id, reply.trim(), adminToken)
      setConversations(items => items.map(item => item.id === selected.id ? result.conversation : item))
      setReply('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the reply.')
    } finally {
      setSending(false)
    }
  }

  const changeStatus = async (status: SupportStatus) => {
    if (!selected) return
    try {
      const result = await updateAdminConversation(selected.id, { status, markRead: true }, adminToken)
      setConversations(items => items.map(item => item.id === selected.id ? result.conversation : item))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the conversation.')
    }
  }

  if (!adminToken) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-[#111] p-8 text-center">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#C5FF00] text-black"><KeyRound className="h-7 w-7" /></div>
          <h1 className="text-2xl font-black text-white">Unlock Support Inbox</h1>
          <p className="mt-2 text-sm leading-6 text-white/45">Enter the same private token configured as <code className="text-[#C5FF00]">SUPPORT_ADMIN_TOKEN</code> in Supabase. It is kept only for this browser session.</p>
          <input value={tokenInput} onChange={event => setTokenInput(event.target.value)} onKeyDown={event => event.key === 'Enter' && unlock()} type="password" placeholder="Support admin token" className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-[#C5FF00]/60" />
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button onClick={unlock} disabled={loading || !tokenInput.trim()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C5FF00] px-4 py-3 font-extrabold text-black disabled:opacity-40">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Open inbox
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-80px)] min-h-[650px] flex-col gap-5 text-white">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black">Support Inbox</h1>
            {unreadCount > 0 && <span className="rounded-full bg-[#C5FF00] px-2.5 py-1 text-xs font-black text-black">{unreadCount} new</span>}
          </div>
          <p className="mt-1 text-sm text-white/45">Review AI conversations and reply when a visitor needs human help.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="rounded-xl border border-white/10 bg-[#111] px-4 py-2 text-sm"><span className="font-black text-amber-300">{attentionCount}</span> <span className="text-white/45">need attention</span></div>
          <button onClick={() => load()} className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111] px-4 py-2 text-sm font-bold text-white/65 hover:text-white"><RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh</button>
        </div>
      </div>

      {error && <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"><AlertCircle className="h-4 w-4" />{error}</div>}

      <div className="grid min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#111] lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="flex min-h-0 flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="space-y-3 border-b border-white/10 p-4">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3">
              <Search className="h-4 w-4 text-white/30" />
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search conversations" className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/25" />
            </div>
            <div className="flex gap-1 overflow-x-auto">
              {(['all', 'open', 'needs_attention', 'resolved'] as const).map(value => (
                <button key={value} onClick={() => setFilter(value)} className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-bold capitalize ${filter === value ? 'bg-[#C5FF00] text-black' : 'bg-white/5 text-white/45 hover:text-white'}`}>{value.replace('_', ' ')}</button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="grid h-48 place-items-center px-6 text-center text-sm text-white/30">No matching support conversations.</div>
            ) : filtered.map(item => {
              const last = item.messages[item.messages.length - 1]
              return (
                <button key={item.id} onClick={() => selectConversation(item)} className={`w-full border-b border-white/5 p-4 text-left transition ${selectedId === item.id ? 'bg-[#C5FF00]/8' : 'hover:bg-white/[0.03]'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-extrabold">{item.visitor.name || 'Website visitor'}</p>
                        {item.unreadByAdmin > 0 && <span className="h-2 w-2 shrink-0 rounded-full bg-[#C5FF00]" />}
                      </div>
                      <p className="mt-1 truncate text-xs text-white/40">{item.subject}</p>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold uppercase ${statusStyle(item.status)}`}>{item.status.replace('_', ' ')}</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/35">{last?.content}</p>
                  <p className="mt-2 text-[10px] text-white/20">{formatTime(item.updatedAt)}</p>
                </button>
              )
            })}
          </div>
        </aside>

        <section className="flex min-h-0 flex-col">
          {!selected ? (
            <div className="grid flex-1 place-items-center p-8 text-center">
              <div><MessageCircle className="mx-auto h-10 w-10 text-white/15" /><p className="mt-3 text-sm text-white/30">Select a conversation to review it.</p></div>
            </div>
          ) : (
            <>
              <header className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate font-extrabold">{selected.subject}</h2>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {selected.visitor.name || 'Guest'}</span>
                    {selected.visitor.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {selected.visitor.email}</span>}
                    <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" /> {formatTime(selected.createdAt)}</span>
                  </div>
                </div>
                <select value={selected.status} onChange={event => changeStatus(event.target.value as SupportStatus)} className={`rounded-xl border px-3 py-2 text-xs font-bold outline-none ${statusStyle(selected.status)} bg-[#171717]`}>
                  <option value="open">Open</option>
                  <option value="needs_attention">Needs attention</option>
                  <option value="resolved">Resolved</option>
                </select>
              </header>

              <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
                {selected.messages.map(item => {
                  const visitor = item.role === 'user'
                  return (
                    <div key={item.id} className={`flex ${visitor ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${visitor ? 'rounded-tl-md bg-white/7 text-white/75' : item.role === 'admin' ? 'rounded-tr-md bg-blue-500 text-white' : 'rounded-tr-md bg-[#C5FF00] text-black'}`}>
                        <div className="mb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider opacity-55">
                          {visitor ? <User className="h-3 w-3" /> : item.role === 'admin' ? <Headphones className="h-3 w-3" /> : <MessageCircle className="h-3 w-3" />}
                          {visitor ? 'Visitor' : item.role === 'admin' ? 'Admin' : 'AI'}
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-6">{item.content}</p>
                        <p className="mt-1 text-[9px] opacity-40">{formatTime(item.createdAt)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-white/10 p-4">
                {selected.status === 'resolved' && (
                  <button onClick={() => changeStatus('open')} className="mb-3 flex items-center gap-2 text-xs font-bold text-[#C5FF00]"><CheckCircle2 className="h-4 w-4" /> Reopen this conversation</button>
                )}
                <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 focus-within:border-[#C5FF00]/50">
                  <textarea value={reply} onChange={event => setReply(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitReply() } }} rows={2} maxLength={2000} placeholder="Write a reply as Joe Yoke Support…" className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-white/20" />
                  <button onClick={submitReply} disabled={!reply.trim() || sending} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#C5FF00] text-black disabled:opacity-30">
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
