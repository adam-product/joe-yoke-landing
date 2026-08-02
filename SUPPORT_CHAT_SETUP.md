# Joe Yoke AI Support setup

The visitor widget and admin inbox are included in the React app. The secure API, AI call, and conversation storage run through the existing Supabase Edge Function in `supabase/functions/server`.

## 1. Create secrets

Create an OpenAI project API key. Do not put it in `.env`, Vite variables, frontend code, Git, or Vercel client variables.

Choose a long random admin token (at least 32 characters). This token protects the Support Inbox API.

## 2. Add secrets to Supabase

From the project directory, run the Supabase CLI through pnpm (no global installation is required):

```powershell
pnpm dlx supabase login
pnpm dlx supabase link --project-ref xcmknkbxkjhnplnhmwkg
pnpm dlx supabase secrets set OPENAI_API_KEY="YOUR_OPENAI_PROJECT_KEY"
pnpm dlx supabase secrets set OPENAI_MODEL="gpt-5.6-terra"
pnpm dlx supabase secrets set SUPPORT_ADMIN_TOKEN="YOUR_LONG_RANDOM_ADMIN_TOKEN"
```

Never commit the real values. `gpt-5.6-terra` balances answer quality, latency, and cost. You can change the model later without rebuilding the frontend.

## 3. Deploy the Edge Function

```powershell
pnpm dlx supabase functions deploy server --project-ref xcmknkbxkjhnplnhmwkg
```

The function uses the existing Supabase service-role secret automatically in the hosted Edge Function environment.

## 4. Deploy the website

Commit and push the React changes so Vercel deploys them. The support widget appears on every public route.

## 5. Open the inbox

1. Sign in at `https://admin.joeyoke.com`.
2. Select **Support Inbox**.
3. Enter the value you configured as `SUPPORT_ADMIN_TOKEN`.
4. Review conversations, reply, and change each status to Open, Needs attention, or Resolved.

The admin token is stored only in `sessionStorage`, so it is cleared when the browser session ends.

## Fallback behavior

If `OPENAI_API_KEY` is missing or the OpenAI request is temporarily unavailable, the Edge Function returns an instant answer from the built-in Joe Yoke knowledge base and flags unknown questions for admin review. Conversations are still stored in Supabase.
