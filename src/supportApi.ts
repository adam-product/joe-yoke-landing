import { projectId, publicAnonKey } from '../utils/supabase/info'

export type SupportRole = 'user' | 'assistant' | 'admin'
export type SupportStatus = 'open' | 'needs_attention' | 'resolved'

export type SupportMessage = {
  id: string
  role: SupportRole
  content: string
  createdAt: string
  source?: 'openai' | 'knowledge-base' | 'admin'
}

export type SupportConversation = {
  id: string
  status: SupportStatus
  subject: string
  visitor: { name?: string; email?: string }
  page?: string
  createdAt: string
  updatedAt: string
  unreadByAdmin: number
  unreadByVisitor: number
  messages: SupportMessage[]
}

const API_ROOT = `https://${projectId}.supabase.co/functions/v1/server/make-server-dd2dc34e/support`

async function request<T>(path: string, options: RequestInit = {}, adminToken?: string): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      apikey: publicAnonKey,
      Authorization: `Bearer ${publicAnonKey}`,
      ...(adminToken ? { 'x-admin-token': adminToken } : {}),
      ...(options.headers || {}),
    },
  })

  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(body?.error || 'Support service is unavailable. Please try again.')
  }
  return body as T
}

export async function sendSupportMessage(input: {
  message: string
  conversationId?: string
  accessToken?: string
  visitor?: { name?: string; email?: string }
  page?: string
}) {
  return request<{
    conversation: SupportConversation
    accessToken: string
    reply: SupportMessage
  }>('/chat', { method: 'POST', body: JSON.stringify(input) })
}

export async function getVisitorConversation(conversationId: string, accessToken: string) {
  return request<{ conversation: SupportConversation }>(
    `/conversation/${encodeURIComponent(conversationId)}?token=${encodeURIComponent(accessToken)}`,
  )
}

export async function getAdminConversations(adminToken: string) {
  return request<{ conversations: SupportConversation[] }>('/admin/conversations', {}, adminToken)
}

export async function sendAdminReply(conversationId: string, message: string, adminToken: string) {
  return request<{ conversation: SupportConversation }>(
    `/admin/conversations/${encodeURIComponent(conversationId)}/reply`,
    { method: 'POST', body: JSON.stringify({ message }) },
    adminToken,
  )
}

export async function updateAdminConversation(
  conversationId: string,
  update: { status?: SupportStatus; markRead?: boolean },
  adminToken: string,
) {
  return request<{ conversation: SupportConversation }>(
    `/admin/conversations/${encodeURIComponent(conversationId)}`,
    { method: 'PATCH', body: JSON.stringify(update) },
    adminToken,
  )
}
