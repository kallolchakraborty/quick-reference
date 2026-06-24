# ai bytes

A modern, search-first documentation portal for developer study notes, cheat sheets, and interactive visual guides — built as a static site for GitHub Pages.

**Current stats:** 2 HTML pages, 103 JSON content files, 103 search entries, 103 route map entries, ~1.5K JS lines, ~950 CSS lines.

## Features

- **Search-first** — Ctrl+K (or Cmd+K) opens a fuzzy search modal that indexes every page and guide. Results filter live as you type.
- **Dark/light mode** — Persistent theme toggle with OS preference detection. Default is light mode with transition parameters.
- **Dynamic content** — Reference pages with Prism syntax highlighting, SVG dynamic animations, and math typesetting templates.
- **Theme-responsive Diagrams** — Inline, interactive SVG diagrams for data structures (Linked Lists, Stacks & Queues, Heaps & Priority Queues, Trees & BSTs) that automatically adapt to light/dark themes.
- **Collapsible sidebar** — Navigation sections close by default; parent section auto-opens when navigating to a page.
- **Share on every page** — Share button opens a modal with URL copy + Twitter/X, LinkedIn, WhatsApp, and Email share options.

## Pages

| Page | Path | Description |
|------|------|-------------|
| Landing | `index.html` | Hero search bar, feature cards linking to docs categories |
| Docs Portal | `docs.html` | Sidebar navigation, dynamic content loader, right-hand outline |

## Keyboard Shortcuts

| Key | Context | Action |
|-----|---------|--------|
| `Ctrl+K` / `Cmd+K` | Anywhere | Open/close search modal |
| `Escape` | Modal | Close share or search modal |

## Theme

`js/theme.js` runs synchronously in the `<head>` to prevent a flash of wrong theme.

1. Checks `localStorage` for a saved `theme` value (`"dark"` / `"light"`). Defaults to `"light"`.
2. If no saved value, checks `prefers-color-scheme` media query.
3. Applies or removes `class="dark"` on `<html>`.
4. All `localStorage` access is wrapped in try-catch for private browsing compatibility.

Both `css/main.css` (custom styles) and `css/tailwind.css` (pre-built Tailwind) use `.dark` ancestor selectors for dark mode variants.

## Tech Stack

- **HTML** — static pages, semantic HTML5, ARIA roles
- **CSS** — Tailwind CSS v3 (static build) + custom `css/main.css`
- **JavaScript** — Vanilla JS (no transpilation step)
- **Icons** — Material Symbols Outlined (Google Fonts CDN)
- **Fonts** — Ubuntu (body) + JetBrains Mono (code) via Google Fonts
- **Brand** — Ubuntu Orange (#E95420)

## Architecture Optimizations

The codebase follows several best practices for a static site:

- **Build Script Indexer** — `scripts/build.mjs` scans all JSON content files in `content/` and automatically compiles them into the `js/generated.js` routes dictionary, eliminating the need to manually register routes.
- **Schema Validation** — `scripts/validate.mjs` checks JSON structures, tag taxomony, and links for absolute integrity.
- **DRY modals** — Share and search modals are injected dynamically by `js/modals.js`.
- **Event delegation** — `modals.js` uses delegated click handlers on `document` instead of binding to individual elements.
- **10% global scale** — `html { font-size: 14.4px }` scales all rem-based Tailwind values proportionally with a single CSS line.
- **Reduced motion respected** — `@media (prefers-reduced-motion: reduce)` disables all animations/transitions.
- **Prism syntax highlighting** — CDN-loaded with custom token color overrides in main.css.

## Project Structure

```
├── index.html              Landing page
├── docs.html               Documentation portal with dynamic loader
├── css/
│   ├── main.css            All custom styles (theme transitions, SVG templates, Prism overrides)
│   ├── tailwind.css        Pre-built Tailwind CSS
│   └── input.css           Tailwind source with @tailwind directives
├── js/
│   ├── modals.js           Share + search modals (HTML injection and event handling)
│   ├── theme.js            Synchronous theme initializer
│   ├── loader.js           Dynamic content loader for docs.html
│   └── generated.js        Build-generated content routes & index mapping
├── scripts/
│   ├── build.mjs           Dynamic content compiler script
│   └── validate.mjs        Schema validation checker
├── content/
│   ├── python/             Python basics & history
│   ├── aiml/               Classic ML, MLOps, math, and roadmap
│   ├── genai/              LLM engineering, pretraining, serving, optimization
│   ├── sysdesign/          System design & distributed systems
│   ├── databases/          SQL & NoSQL database systems
│   ├── security/           Security engineering guides
│   ├── sre/                Site reliability engineering guides
│   ├── faang/              FAANG facts
│   ├── networking/         Computer networking guides
│   ├── oop/                Object-oriented programming concepts
│   ├── os/                 Operating systems notes
│   ├── patterns/           System design and architectural patterns
│   ├── product/            Product sense and product engineering
│   └── programming/        Data structures and algorithms
├── assets/
│   └── logo.svg            Circle of Knowledge logo
├── tailwind.config.js      Unified Tailwind configuration
├── package.json            npm scripts (build, validate, dev)
└── package-lock.json       Dependency lockfile
```

## Building CSS Locally

```bash
# Install dependencies
npm install

# Build Tailwind CSS
npm run build:css

# Watch for changes during development
npm run watch:css
```

The `tailwind.config.js` merges all custom colors (brand orange, accent palette, ink/charcoal, GIL-specific colors) and font families from across the project into a single config.

## Content Format

Content pages are JSON files loaded dynamically by `js/loader.js`. Each file has:

```json
{
  "id": "python-history",
  "title": "History of Python",
  "category": "Python",
  "subcategory": "History",
  "description": "A brief overview...",
  "codeBlock": "A code snippet...",
  "details": "Deep dive explanation...",
  "language": "python",
  "timeline": [
    { "year": "1989", "event": "Work on Python begins" },
    { "year": "1991", "event": "Python 0.9.0 released" }
  ]
}
```

- `codeBlock` is rendered in a syntax block with a copy button.
- `language` drives the Prism.js syntax highlighting class (e.g., `language-python`).
- `timeline` (optional) renders an animated alternating timeline instead of a code block.
- `details` is rendered in a "Deep Dive" info box with a left accent bar.

Routes map 27 hash anchors to 26 unique JSON paths in `js/loader.js` (two routes alias the same file: `#py-basics-ds` and `#py-ds-builtins`). The default route (when no hash is present) falls back to `#python-history`.

## Search

The search modal (`Ctrl+K` / `Cmd+K`) performs live fuzzy filtering across a static JSON index defined in `js/modals.js`.

- Every result is an `<a>` element with `role="option"` inside a `role="listbox"` container.
- The empty state uses `role="status"` with `aria-live="polite"` for screen-reader announcements.
- Results show the category label + title with a hover arrow animation.
- Clicking a result navigates to `docs.html#<anchor>` and closes the modal.

The search index contains:
- **Python Basics** — Data Types & Operations, Loops & Control Flow, Input & Output, File Handling, API Handling, Multithreading & Concurrency, History of Python
- **Python Data Structures** — Built-in Collections, Linked Lists, Stacks & Queues, Priority Queues & Heaps, Trees & BSTs, Graphs & Networks
- **Python Algorithms** — Time & Space Complexity, Algorithms & Patterns, OOP & Design Patterns
- **Gen AI** — What exactly is an LLM?, KV Cache, RAG, Fine-Tuning & PEFT, Prompt Engineering, Context Engineering, Harness Engineering, Loop Engineering, Mixture of Experts, LLM Serving

## Accessibility

- **Skip-to-content** link is the first focusable element on every page (visually hidden until focused via Tab).
- **`main`** elements have `id="main-content"` as skip targets.
- **Scene tags** use `<button role="tab" aria-selected="">` with a parent `role="tablist"`.
- **Modals** use `role="dialog"`, `aria-modal="true"`, `aria-label`.
- **Search results** use `role="listbox"` / `role="option"`.
- **Empty search** uses `role="status"` with `aria-live="polite"`.
- **Iframe** embeds have descriptive `title` attributes.
- **Reduced motion** is respected via `prefers-reduced-motion` media query.

## SEO

Every page includes Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`) meta tags. The shared image is `/assets/logo.svg`.

## Adding a New Guide

1. Create a JSON file in `content/<category>/<guide-name>.json`.
2. Run the build script to update the route map, search index, and sitemap: `npm run build`.
3. Add a sidebar link in `docs.html`.
4. Optionally add a feature card in `index.html`.
5. Rebuild CSS if new Tailwind utility classes are used: `npm run build:css`.

## License

MIT
