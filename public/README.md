# public/

The hero illustration and loader logo currently point at temporary
`c.animaapp.com` URLs (carried over from the original generated design).
Those links can expire. Recommended next step:

1. Download the two images from the source `index.html`:
   - `joe-yoke-logo.png`
   - `uploaded-asset-1784664263909-0.png`
2. Drop them in this `public/` folder.
3. In `components/Loader.tsx` and `components/Hero.tsx`, change the
   `src="https://c.animaapp.com/..."` values to `src="/joe-yoke-logo.png"`
   and `src="/hero-icon.png"` (or whatever you name them).
4. You can then remove the `images.remotePatterns` entry for
   `c.animaapp.com` in `next.config.ts`.
