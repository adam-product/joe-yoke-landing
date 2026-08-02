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

const API_ROOT = '/api/support'

async function request<T>(path: string, options: RequestInit = {}, adminToken?: string): Promise<T> {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
  }>('', { method: 'POST', body: JSON.stringify(input) })
}

export async function getVisitorConversation(conversationId: string, accessToken: string) {
  return request<{ conversation: SupportConversation }>(
    `?conversationId=${encodeURIComponent(conversationId)}&token=${encodeURIComponent(accessToken)}`,
  )
}

export async function getAdminConversations(adminToken: string) {
  return request<{ conversations: SupportConversation[] }>('?admin=list', {}, adminToken)
}

export async function sendAdminReply(conversationId: string, message: string, adminToken: string) {
  return request<{ conversation: SupportConversation }>(
    `?admin=reply&conversationId=${encodeURIComponent(conversationId)}`,
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
    `?admin=update&conversationId=${encodeURIComponent(conversationId)}`,
    { method: 'PATCH', body: JSON.stringify(update) },
    adminToken,
  )
}
