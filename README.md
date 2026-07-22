# Joe Yoke — Next.js conversion

This is the generated `index.html` landing page rebuilt as a Next.js 16
(App Router) + Tailwind CSS v4 project, matching the stack already used
in `joe-yoke-landing` (Next 16.2.10, React 19.2.4, Tailwind v4, next-themes).

## How to merge into your existing repo

Your `joe-yoke-landing` repo already has `app/`, `components/`, `public/`,
`package.json`, etc. from an earlier scaffold. To bring this design in:

1. Copy everything from this project's `app/`, `components/`, and `public/`
   folders into your repo, overwriting the existing files.
2. Merge `package.json` — this project adds `lucide-react` and `lenis` as
   dependencies (icons + smooth scroll). Everything else matches your
   existing versions.
3. Replace your existing `tailwind.config.ts` — this design uses Tailwind
   v4's CSS-first `@theme` config living in `app/globals.css`, so a
   separate JS/TS config file isn't needed for this page. If other pages
   in your repo rely on the old config's custom colors
   (`primary: #CCFF00`, etc.), reconcile those first.
4. Run:
   ```
   npm install
   npm run dev
   ```
5. Push to `main` — Vercel will pick it up automatically since the repo
   is already connected.

## What changed from the generated HTML

- **Tailwind CDN script → Tailwind v4 build pipeline** (`@tailwindcss/postcss`),
  configured in `app/globals.css` via `@theme inline`, using the same HSL
  color tokens (`--background`, `--foreground`, `--primary`, etc.) and the
  same light/dark values, toggled via a `data-theme` attribute exactly as
  before.
- **`next-themes`** replaces the manual `localStorage` + `data-theme`
  script for the light/dark toggle.
- **Phosphor Icons (CDN)** → `lucide-react` (see `components/icons.tsx`
  for the name mapping).
- **Lenis smooth scroll** and the **scroll-reveal IntersectionObserver**
  are now small client components (`SmoothScroll.tsx`, `ScrollReveal.tsx`)
  instead of inline `<script>` tags.
- **`next/font/google`** loads Onest instead of the Google Fonts `<link>`
  tag, and **`next/image`** is used for the two images (see `public/README.md`
  for moving those off the temporary Anima CDN).
- All markup/styling is otherwise a 1:1 port — same section IDs
  (`#hero`, `#about`, `#portfolio`, `#services`, `#stats`, `#footer`),
  same classes, same animations.

## Verified

- `npm install` completes cleanly.
- `npx next build` compiles and builds successfully in this sandbox
  (the only sandbox-specific hiccup is fetching Google Fonts, since this
  sandbox has no outbound access to `fonts.googleapis.com` — Vercel's
  build servers do, so this resolves itself on deploy).
