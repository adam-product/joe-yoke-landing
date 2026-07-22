<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## 2026-07-21
- Top nav now stays visible in default state with readable brand/menu/toggle colors, and only transitions into frosted capsule styling when `.top-nav-wrap.is-visible` is applied after scroll.
- Top frosted nav (`.top-nav-wrap`) is now wider (`min(97vw, 1220px)`), hidden at initial load, and only appears after scrolling past 36px via `.is-visible` toggled in nav script.
- Added persistent fixed bottom progressive blur overlay (`.bottom-progressive-blur`) using gradient + backdrop blur so it remains visible during scroll.
- Added section reveal system using `.scroll-reveal-target` + `.is-inview` with IntersectionObserver and staggered `--reveal-delay`.
- Removed hero `#scroll-cta` button from `#hero` and deleted its related `.scroll-cta*` CSS plus click-handler script to keep the section clean.
- Footer bottom legal quick links were reduced by removing `Privacy` and `Terms`, leaving only the copyright line in the lower bar.
- `#services` row trail icon now uses a black circular `ph-arrow-up-right` button style and row hover labels (index, title, meta) switch to black on `hover:bg-primary`.
- Hero headline in `#hero` now uses `.hero-headline`/`.hero-headline-line`/`.hero-headline-text` (no `overflow-hidden` wrappers) to avoid clipped letterforms and prevent overlap with right-side visual by reserving width.
- Hero floating 3D prism now uses stronger layered drop shadows on `.hero-icon-float` for better depth on light backgrounds.
- Hero floating 3D icon in `#hero` now points to `uploaded-asset-1784664263909-0.png` (new attached prism image), replacing the previous floating asset URL.
- Stats counters for Registered Players and Chat groups formed now use `data-target` numeric values (`1`, `2`) with `data-suffix="M+"` so animation ends as `1M+` and `2M+`.
- Hero primary CTA card now uses a rounded glass style (`.engage-card`) with larger two-line copy and a glowing circular arrow action; removed the mini feature chips row under it.
- Hero scroll indicator is now an interactive pill button (`#scroll-cta`) with animated traveling dot, floating arrow badge, burst feedback on click, and smooth scroll-to-`#about`.
- `#stats` now uses a rounded dark showcase card with “By the numbers” heading and animated counters using per-item suffixes via `data-suffix`.
- `#footer` is now a rounded dark panel layout with large CTA headline, white pill action button with arrow capsule, and 4-column link/content structure.
- Global `button` base rule now enforces pill rounding (`border-radius: 999px`) so all button elements keep rounded corners consistently.
- Portfolio cards in `#portfolio` now follow a rounded dark card style (`rounded-[24px]`) with top-right circular arrow actions and “View Details” arrow links.
- Rounded-corner buttons are now visually standardized with `.rounded-theme-btn` (shared border and shadow) applied to theme toggle and hero round CTA.
- Hero right-side visuals now use a single floating icon (`.hero-icon-float` with `heroFloatIcon`) replacing the previous two-image composition; still hidden below 900px.
- Hero now includes right-side floating decorative icons via `.hero-floating-icons`, `.hero-icon-cross`, `.hero-icon-bar` with `heroFloatCross`/`heroFloatBar` keyframes; hidden below 900px.
- Attached icon assets are hosted at `uploaded-asset-1784650122254-0.png` (green bar) and `uploaded-asset-1784650122254-1.png` (yellow cross) and used directly in `index.html`.
- Top nav now uses `.is-active` class assigned in JS (`moveTo`) so hovered/default menu labels on the goo pill always use `--primary-foreground`.
- Removed temporary nav debug logs after hover alignment verification.
- Light mode primary palette is now aligned with dark mode (`#CCFF00`, HSL `72 100% 50%`) including `--ring`.
- Top nav goo indicator must be positioned relative to `.top-nav-center` (not `#top-nav`) to prevent misaligned hover pills.
- Applying the gooey SVG filter to the whole nav-center can clip/hide sibling labels; filter should be on `.nav-goo` only.
- index.html uses inline Tailwind CDN config plus custom CSS in the same file.
- Page shell now explicitly includes title/description/theme-color, base reset rules, and Lenis importmap+module boot script at the end of body.
</coder>
