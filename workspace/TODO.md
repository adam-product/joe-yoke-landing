<instructions>
This file powers chat suggestion chips. Keep it focused and actionable.

# Be proactive
- Suggest ideas and things the user might want to add *soon*. 
- Important things the user might be overlooking (SEO, more features, bug fixes). 
- Look specifically for bugs and edge cases the user might be missing (e.g., what if no user has logged in).

# Rules
- Each task must be wrapped in a "<todo id="todo-id">" and "</todo>" tag pair.
- Inside each <todo> block:
  - First line: title (required)
  - Second line: description (optional)
- The id must be a short stable identifier for the task and must not change when you rewrite the title or description.
- You should proactively review this file after each response, even if the user did not explicitly ask, maintain it if there were meaningful changes (new requirement, task completion, reprioritization, or stale task cleanup).
- Think BIG: suggest ambitious features, UX improvements, technical enhancements, and creative possibilities.
- Balance quick wins with transformative ideas — include both incremental improvements and bold new features.
- Aim for 3-5 high-impact tasks that would genuinely excite the user.
- Tasks should be specific enough to act on, but visionary enough to inspire.
- Remove or rewrite stale tasks when completed, obsolete, or clearly lower-priority than current work.
- Re-rank by impact and user value, not just urgency.
- Draw inspiration from the project's existing features — what would make them 10x better?
- Don't be afraid to suggest features the user hasn't explicitly mentioned.
</instructions>

<todo id="top-nav-contrast-dark-mode">
Validate pre-scroll nav readability in dark mode
Check brand/menu/toggle contrast before frosted state so labels stay visible on dark hero imagery.
</todo>

<todo id="nav-active-section-sync">
Sync top-nav active pill with current scroll section
Update active nav label based on visible section so the goo state stays accurate after manual scrolling.
</todo>

<todo id="scroll-reveal-threshold-tune">
Tune section reveal timing for long and short viewports
Adjust observer threshold/rootMargin so transitions trigger consistently across desktop and mobile heights.
</todo>

<todo id="theme-color-contrast-audit">
Audit contrast after light-mode primary update
Verify text/button contrast in all primary surfaces after switching light mode primary to #CCFF00.
</todo>

<todo id="footer-mobile-stack-polish">
Polish mobile spacing for the new rounded footer panel
Refine CTA/button spacing and column stacking below 640px so the new footer keeps the same premium rhythm.
</todo>

<!-- Add tasks here only when there are real next steps. -->
