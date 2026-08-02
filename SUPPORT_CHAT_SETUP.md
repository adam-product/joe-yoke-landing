# Joe Yoke AI Support setup

The visitor widget and admin inbox are included in the React app. The secure API runs as the same-origin Vercel Function at `/api/support`; conversation data is stored in Supabase and AI calls happen only on the server.

## 1. Create secrets

Create an OpenAI project API key. Do not put it in `.env`, Vite variables, frontend code, Git, or Vercel client variables.

Choose a long random admin token (at least 32 characters). This token protects the Support Inbox API.

## 2. Add server secrets to Vercel

In the Vercel project, open **Settings → Environment Variables** and create these Production variables:

```text
OPENAI_API_KEY=YOUR_OPENAI_PROJECT_KEY
OPENAI_MODEL=gpt-5.6-terra
SUPPORT_ADMIN_TOKEN=YOUR_LONG_RANDOM_ADMIN_TOKEN
```

Never commit the real values. `gpt-5.6-terra` balances answer quality, latency, and cost. You can change the model later without rebuilding the frontend.

Optionally add `SUPABASE_SERVICE_ROLE_KEY` as a Vercel server environment variable. This is recommended if you later restrict anonymous access to the existing key-value table. Never prefix any server secret with `VITE_`.

## 3. Redeploy Vercel

Commit and push the changes. Vercel deploys the React app and `/api/support` together. After adding or changing environment variables, trigger a new deployment so the function receives them.

## 4. Open the inbox

1. Sign in at `https://admin.joeyoke.com`.
2. Select **Support Inbox**.
3. Enter the value you configured as `SUPPORT_ADMIN_TOKEN`.
4. Review conversations, reply, and change each status to Open, Needs attention, or Resolved.

The admin token is stored only in `sessionStorage`, so it is cleared when the browser session ends.

## Fallback behavior

If `OPENAI_API_KEY` is missing or the OpenAI request is temporarily unavailable, the Vercel Function returns an instant answer from the built-in Joe Yoke knowledge base and flags unknown questions for admin review. Conversations are still stored in Supabase.
