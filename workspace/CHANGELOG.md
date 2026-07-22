<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
- 2026-07-21: Fixed default top-nav visibility and made frosted capsule style scroll-activated only.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Kept nav visible at load with readable labels/toggle, then apply capsule/frosted treatment only when `.is-visible` is added on scroll.
- 2026-07-21: Widened top nav, made it hidden on load, and revealed it only after user scroll.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Updated `.top-nav-wrap` width and added scroll-based `.is-visible` toggling in header nav script.
- 2026-07-21: Added fixed bottom progressive blur and section-by-section reveal transitions.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Added `.bottom-progressive-blur`, `.scroll-reveal-target` animations, and IntersectionObserver-based in-view class activation.
- 2026-07-21: Removed hero scroll CTA button and all associated animation/scroll handler code.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Deleted `.scroll-cta` style/keyframes, removed `#scroll-cta` markup, and dropped obsolete reduced-motion todo tied to that control.
- 2026-07-21: Removed unnecessary footer quick links from the lower footer bar.
  Files: index.html, workspace/CODER.md
  Notes: Deleted Privacy/Terms quick links and kept only the copyright text row.
- 2026-07-21: Updated services row chevrons and hover text color behavior to match reference style.
  Files: index.html, workspace/CODER.md
  Notes: Replaced right-side plain arrow with circular black up-right arrow button and switched row hover label colors on green background from white-toned to black.
- 2026-07-21: Fixed hero headline clipping/overlap and strengthened floating prism depth.
  Files: index.html, workspace/CODER.md
  Notes: Replaced `overflow-hidden` headline wrappers with dedicated headline classes and added width constraint; increased `.hero-icon-float` layered drop-shadows.
- 2026-07-21: Replaced hero floating icon image with the newly attached 3D prism asset.
  Files: index.html, workspace/CODER.md
  Notes: Updated the `#hero .hero-icon-float` image source to `uploaded-asset-1784664263909-0.png` while preserving existing motion/styling.
- 2026-07-21: Updated stats highlighted counters to display M suffix format.
  Files: index.html, workspace/CODER.md
  Notes: Changed Registered Players and Chat groups formed counters to animate to `1M+` and `2M+` using numeric `data-target` plus `data-suffix="M+"`.
- 2026-07-21: Updated hero Engage & Compete card and replaced static scroll label with animated interactive scroll CTA.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Removed Leaderboards/Achievements/Rewards/Challenges/Analytics chips, added rounded glass action card with circular arrow, and wired scroll button to smooth-scroll with click burst effect.
- 2026-07-21: Redesigned stats card and footer to rounded dark panel style and enforced rounded buttons.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Rebuilt `#stats` as a showcase card with suffix-aware counters, replaced `#footer` with rounded CTA/footer layout, and set global button pill radius.
- 2026-07-21: Restyled Portfolio section cards to match rounded showcase style with arrow detail actions.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Replaced square cards with rounded dark cards, added top-right circular arrow icon actions, and changed CTA copy to “View Details” with arrow.
- 2026-07-21: Unified rounded button visuals to match the site theme style.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Added reusable `.rounded-theme-btn` styling and applied it to the rounded theme toggle and hero round CTA button.
- 2026-07-21: Replaced hero right-side icon set with attached single floating icon asset.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Removed dual icon composition and switched to one floating image (`uploaded-asset-1784654004152-0.png`) with updated motion class/keyframes.
- 2026-07-21: Added floating 3D icon visuals to hero right side with subtle motion.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Inserted hosted green bar and yellow cross assets into `#hero`; added responsive floating animation classes and keyframes; icons hidden on <=900px.
- 2026-07-21: Updated top-nav hover text behavior and aligned light-mode primary color with dark mode.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Added `.is-active` nav label state with dark text on goo pill, set light-mode `--primary`/`--ring` to #CCFF00, removed all nav debug logs.
- 2026-07-21: Fixed top-nav hover pill alignment/visibility bug and instrumented runtime logs.
  Files: index.html, workspace/CODER.md, workspace/TODO.md
  Notes: Positioned goo indicator relative to `.top-nav-center`, moved gooey filter to `.nav-goo`, added temporary nav debug logs for hover/focus/resize/move guards.
- 2026-07-21: Updated page shell metadata, base CSS reset styles, and Lenis importmap/module bootstrap.
  Files: index.html, workspace/CODER.md
  Notes: Added explicit title/description/theme-color and appended module-based Lenis raf init before </body>.
- 2026-07-21: Built a frosted glass top nav with gooey spring-hover animation and responsive behavior.
  Files: index.html
  Notes: Added persistent light/dark theme toggle in nav; dark mode primary is #CCFF00 via CSS vars.
<!-- NEXT_ENTRY_HERE -->
</changelog>
