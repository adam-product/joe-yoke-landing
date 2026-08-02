import { useEffect, useMemo, useRef, useState } from 'react'
import { Bot, Headphones, Loader2, MessageCircle, RotateCcw, Send, ShieldCheck, User, X } from 'lucide-react'
import {
  getVisitorConversation,
  sendSupportMessage,
  type SupportConversation,
  type SupportMessage,
} from './supportApi'

const STORAGE_KEY = 'joeyoke_support_session'

type StoredSession = {
  conversationId: string
  accessToken: string
}

const WELCOME = "Hi! I’m Joe Yoke Support. Ask me about downloading the app, accounts, multiplayer games, game rules, privacy, safety, or troubleshooting."

function readSession(): StoredSession | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

export default function SupportChatWidget() {
  const [open, setOpen] = useState(false)
  const [conversation, setConversation] = useState<SupportConversation | null>(null)
  const [session, setSession] = useState<StoredSession | null>(readSession)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const messages = useMemo(() => conversation?.messages || [], [conversation])

  useEffect(() => {
    const openFromHelpLink = () => {
      if (window.location.hash === '#help-center') setOpen(true)
    }
    openFromHelpLink()
    window.addEventListener('hashchange', openFromHelpLink)
    return () => window.removeEventListener('hashchange', openFromHelpLink)
  }, [])

  useEffect(() => {
    if (!open || !session) return

    let active = true
    const refresh = async () => {
      try {
        const result = await getVisitorConversation(session.conversationId, session.accessToken)
        if (active) setConversation(result.conversation)
      } catch {
        // Keep the last successful transcript visible during temporary outages.
      }
    }

    refresh()
    const timer = window.setInterval(refresh, 12000)
    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [open, session])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, open, sending])

  const submit = async () => {
    const clean = message.trim()
    if (!clean || sending) return
    setError('')
    setMessage('')
    setSending(true)

    const optimistic: SupportMessage = {
      id: `local-${Date.now()}`,
      role: 'user',
      content: clean,
      createdAt: new Date().toISOString(),
    }
    setConversation(previous => previous
      ? { ...previous, messages: [...previous.messages, optimistic] }
      : {
          id: 'pending',
          status: 'open',
          subject: clean.slice(0, 72),
          visitor: { name, email },
          page: window.location.pathname,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          unreadByAdmin: 1,
          unreadByVisitor: 0,
          messages: [optimistic],
        })

    try {
      const result = await sendSupportMessage({
        message: clean,
        conversationId: session?.conversationId,
        accessToken: session?.accessToken,
        visitor: { name: name.trim(), email: email.trim() },
        page: window.location.pathname,
      })
      const nextSession = {
        conversationId: result.conversation.id,
        accessToken: result.accessToken,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession))
      setSession(nextSession)
      setConversation(result.conversation)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message. Please retry.')
      setConversation(previous => previous
        ? { ...previous, messages: previous.messages.filter(item => item.id !== optimistic.id) }
        : null)
      setMessage(clean)
    } finally {
      setSending(false)
    }
  }

  const startNewConversation = () => {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
    setConversation(null)
    setMessage('')
    setError('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6">
      {open && (
        <section className="mb-3 flex h-[min(680px,calc(100vh-100px))] w-[calc(100vw-32px)] max-w-[390px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#101010] text-white shadow-2xl shadow-black/40" aria-label="Joe Yoke support chat">
          <header className="flex items-center justify-between border-b border-white/10 bg-[#151515] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#C5FF00] text-black">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-extrabold leading-tight">Joe Yoke Support</h2>
                <p className="flex items-center gap-1.5 text-[11px] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-[#C5FF00]" /> AI replies instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {conversation && (
                <button onClick={startNewConversation} className="grid h-9 w-9 place-items-center rounded-full text-white/45 hover:bg-white/10 hover:text-white" title="Start a new conversation">
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/45 hover:bg-white/10 hover:text-white" aria-label="Close support chat">
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
            <div className="flex items-start gap-2.5">
              <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-[#C5FF00] text-black"><Bot className="h-4 w-4" /></div>
              <div className="max-w-[82%] rounded-2xl rounded-tl-md bg-white/8 px-4 py-3 text-sm leading-6 text-white/80">{WELCOME}</div>
            </div>

            {messages.map(item => {
              const visitor = item.role === 'user'
              return (
                <div key={item.id} className={`flex items-start gap-2.5 ${visitor ? 'flex-row-reverse' : ''}`}>
                  <div className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-xl ${visitor ? 'bg-white/10 text-white' : item.role === 'admin' ? 'bg-blue-500 text-white' : 'bg-[#C5FF00] text-black'}`}>
                    {visitor ? <User className="h-4 w-4" /> : item.role === 'admin' ? <Headphones className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap ${visitor ? 'rounded-tr-md bg-[#C5FF00] text-black' : 'rounded-tl-md bg-white/8 text-white/80'}`}>
                    {item.content}
                    {!visitor && (
                      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider opacity-40">{item.role === 'admin' ? 'Support team' : item.source === 'knowledge-base' ? 'Instant help' : 'AI assistant'}</span>
                    )}
                  </div>
                </div>
              )
            })}

            {sending && (
              <div className="flex items-center gap-2.5 text-xs text-white/45">
                <div className="grid h-7 w-7 place-items-center rounded-xl bg-[#C5FF00] text-black"><Bot className="h-4 w-4" /></div>
                <Loader2 className="h-4 w-4 animate-spin" /> Finding the best answer…
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-white/10 bg-[#151515] p-3">
            {error && <p className="mb-2 rounded-xl bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>}
            <button onClick={() => setShowDetails(value => !value)} className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold text-white/35 hover:text-white/60">
              <ShieldCheck className="h-3.5 w-3.5" /> {showDetails ? 'Hide contact details' : 'Add contact details (optional)'}
            </button>
            {showDetails && (
              <div className="mb-2 grid grid-cols-2 gap-2">
                <input value={name} onChange={event => setName(event.target.value)} maxLength={80} placeholder="Name" className="min-w-0 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#C5FF00]/60" />
                <input value={email} onChange={event => setEmail(event.target.value)} maxLength={160} type="email" placeholder="Email" className="min-w-0 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs outline-none focus:border-[#C5FF00]/60" />
              </div>
            )}
            <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-black/30 p-2 focus-within:border-[#C5FF00]/50">
              <textarea
                value={message}
                onChange={event => setMessage(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    submit()
                  }
                }}
                maxLength={2000}
                rows={1}
                placeholder="Ask Joe Yoke Support…"
                className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-white/25"
              />
              <button onClick={submit} disabled={!message.trim() || sending} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C5FF00] text-black transition hover:bg-[#d4ff33] disabled:cursor-not-allowed disabled:opacity-30" aria-label="Send message">
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/25">AI can make mistakes. Don’t share passwords or payment details.</p>
          </div>
        </section>
      )}

      <button onClick={() => setOpen(value => !value)} className="group ml-auto flex h-14 items-center gap-2 rounded-full bg-[#C5FF00] px-4 text-sm font-extrabold text-black shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d4ff33]" aria-expanded={open} aria-label={open ? 'Close support chat' : 'Open support chat'}>
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && <span>Help</span>}
      </button>
    </div>
  )
}
