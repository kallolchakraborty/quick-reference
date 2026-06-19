## Goal
- Optimize the Quick Reference GitHub Pages documentation portal for performance, correctness, and maintainability, with typography and visual styling matching specific reference sites.

## Constraints & Preferences
- Site supports both light and dark modes with a user-toggleable theme toggle button.
- Tailwind CDN (play CDN) is used for CSS generation; no static CSS build.
- Fonts are served via Google Fonts CDN.
- All changes must work on GitHub Pages (no server-side config).
- Body font must match ubuntu.com, which uses Ubuntu font (a sans-serif typeface).
- Site theme must match ubuntu.com's visual style using Ubuntu Orange (#E95420) as the brand accent.

## Progress
### Done
- Created `js/theme.js` that handles theme toggling with `localStorage` persistence and `prefers-color-scheme` system preference detection (runs before Tailwind CDN to prevent FOUC).
- Removed hardcoded `class="dark"` from `<html>` in all 5 HTML files — theme is now applied dynamically by `theme.js`.
- Added theme toggle buttons (Material Symbols sun/moon icon) to the header of index.html, docs.html, compiler.html, interpreter.html.
- Restructured CSS on all pages: light mode defaults with `html.dark`-wrapped overrides for dark mode.
- index.html & docs.html: Light mode shows white backgrounds, dark text, light borders.
- compiler.html & interpreter.html: Light mode overrides for canvas, panels, borders, text colors.
- Fixed AST SVG text fill in compiler.html: CSS selectors `#ast-svg text` toggle between `#374151` (light) and `#E8E8E8` (dark).
- Updated all 5 HTML pages to use Ubuntu font (body) and JetBrains Mono (monospace) via Google Fonts.
- Full visual redesign of compiler.html (9 scenes) and interpreter.html (10 scenes) to makingsoftware.com blueprint/technical illustration style — blue linework (#1342FF), light blue fills (#E6EBFF/B9C7FD/97ACFF), white/paper backgrounds, dashed connecting lines, blueprint-styled code panels, red error borders.
- Fixed `js/search.js` line 105: replaced undefined `font-code-sm text-code-sm` with `font-mono text-sm`.
- Fixed `js/loader.js` line 38: replaced dark iframe embed background `bg-[#090A0D]` with blueprint-styled `bg-white border-blue-200`.
- Updated index.html playground section: replaced old color references with brand-500, emerald, orange Tailwind colors.
- Created `content/python/gil.json` — content metadata for the GIL interactive guide.
- Created `gil.html` — full 10-scene interactive animation (dark mode) explaining How Python's GIL Works, matching Making Software visual style.
- Added GIL entry to `js/search.js` search index at `docs.html#gil`.
- Added `#gil` route to `js/loader.js` route map and iframe embed condition.
- Added "Python" sidebar category with GIL link to `docs.html`.
- Added "Python Internals" feature card to `index.html`.
- Fixed `gil.html` animation system: rewrote `showScene` to properly handle class-based cross-fade transitions without inline opacity conflicts; rewrote `triggerSceneAnimation` for all 10 scenes using `snapHidden`/`revealEl`/`snapWidth` helpers that disable CSS transitions during reset, force reflow, then re-enable transitions to prevent flicker on re-entry.
- Added missing `transition-all` classes to scene 4 code lines and scene 6 thread/object elements in `gil.html` for smooth pulse and transform animations.
- Initialized `currentScene` to 0 in `gil.html` to prevent early-return guard from blocking first scene render.
- Updated brand color from purple (#B38CFF) to Ubuntu Orange (#E95420) across index.html and docs.html:
  - Tailwind config `brand` color map set to orange shades (50/100/500/600/700).
  - CSS `!important` overrides for `.text-brand-500`, `.bg-brand-500`, `.hover\:border-brand-500` use orange.
  - Active sidebar link border/color in docs.html updated to orange.
  - Search button and theme toggle hover states use orange.
  - Footer updated: `bg-slate-100` (light) / `bg-slate-900/60` (dark) for ubuntu.com dark theme feel.
  - Nav link text colors updated to `text-slate-700 dark:text-slate-300`.
  - `accentPurple` retained as distinct palette color for GIL thread labels and other non-brand uses.
- compiler.html & interpreter.html headers, gil.html: left with their own distinct color palettes (blueprint blue, GIL multi-color) — not changed to orange.

### Blocked
- Tailwind CDN version pinning — the `cdn.tailwindcss.com` URL does not support stable version pinning; a static CSS build step would be required for production-grade optimization.

## Key Decisions
- Created `theme.js` as an IIFE that runs synchronously before Tailwind CDN to set `html.dark` class before Tailwind generates its `dark:` variant rules, preventing a flash of wrong theme.
- Used `localStorage` key `theme` with values `"dark"`/`"light"` / no preference (follows OS `prefers-color-scheme`).
- Used `html.dark` CSS selector to scope all dark overrides instead of relying on Tailwind's `.dark` ancestor — avoids specificity fights.
- Replaced multi-color accent palette with monochromatic blueprint palette (#1342FF) across compiler/interpreter pages to match makingsoftware.com's technical illustration style.
- Changed brand accent from purple (#B38CFF) to Ubuntu Orange (#E95420) to match ubuntu.com theme; `accentPurple` retained as a distinct palette color for thread/visualization elements.
- `gil.html` is always-dark mode with its own color scheme (Inter font, specific accent colors per storyboard) — not affected by site theme toggle.
- For GIL page animation resets, used `style.transition = 'none'` + reflow + `style.transition = ''` pattern to snap elements to hidden state without animating the visible→hidden transition, preventing flicker on scene re-entry.
- compiler.html, interpreter.html, and gil.html retain their own distinct visual identities (blueprint blue, GIL multi-color) — brand orange is applied only to index.html and docs.html.

## Next Steps
- Verify search modal, theme toggle, and all interactive animations still work after theme update.
- Consider updating compiler.html and interpreter.html header styling if desired.

## Critical Context
- `theme.js` must load before Tailwind CDN so the `dark` class is present when Tailwind generates `dark:` variant styles — prevents flash of wrong theme.
- Tailwind CDN JIT hardcodes custom color values; `!important` overrides on specific CSS classes are required for brand colors.
- The site has exactly 10 searchable content items across 5 categories (Frontend, Tools, DevOps, Backend, Python, Programming).
- `gil.html` uses `currentScene` initialization at 0 with early-return guard `if (currentScene === sceneIndex) return;` — first call always passes because 0 !== targetScene.
- Ubuntu.com design language: dark header (#2C2C2C or similar), Ubuntu Orange (#E95420) brand accent, clean minimal layout, Ubuntu font throughout.

## Relevant Files
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/js/theme.js`: Theme toggle logic (localStorage, system preference, CSS class toggle).
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/index.html`: Landing page. Brand colors updated to Ubuntu Orange (#E95420); header/footer updated to ubuntu.com style.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/docs.html`: Documentation portal. Brand colors updated to orange; active sidebar link uses orange; header/footer updated.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/compiler.html`: Interactive compiler animation (9 scenes). Blueprint/technical illustration style with makingsoftware.com aesthetic. Unchanged from brand update.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/interpreter.html`: Interactive interpreter animation (10 scenes). Blueprint/technical illustration style. Unchanged from brand update.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/gil.html`: Interactive GIL animation (10 scenes). Always-dark mode with Inter font, GIL-specific color palette. Unchanged from brand update.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/js/search.js`: Search modal logic with 10 indexed items.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/js/loader.js`: Dynamic content loader for docs page.
- `/Users/kallolchakraborty/Proof Of Concepts/Quick Reference - GitHub Pages/content/python/gil.json`: GIL content metadata.
