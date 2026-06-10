# Tabby Plus 2.0 — Interactive HTML Prototype

Static mobile prototype (iPhone frame) for **Tabby Plus** subscription flows. No build step — open HTML in a browser or serve via GitHub Pages.

## Quick start

```bash
cd plus
python3 -m http.server 8080
# http://localhost:8080/index.html
```

## Published URLs

| What | URL |
|------|-----|
| Prototype (entry) | https://rushankaiumov-lab.github.io/Plus/ |
| Main app | https://rushankaiumov-lab.github.io/Plus/plus/index.html |
| Debug menu (scenario launcher) | https://rushankaiumov-lab.github.io/Plus/plus/debug-menu.html |
| Scenario map | https://rushankaiumov-lab.github.io/Plus/plus/debug-map.html |
| GitHub | https://github.com/rushankaiumov-lab/Plus |

Root `index.html` redirects to `plus/index.html`.

## Repository layout

```
Plus/
├── index.html              # GitHub Pages redirect → plus/
├── CLAUDE.md               # This file — read before editing
├── plus/
│   ├── index.html          # ~6600 lines — ALL prototype UI + logic
│   ├── debug-menu.html     # Scenario launcher, URL builder, EN/RU
│   ├── debug-map.html      # Visual flow map (activation / benefits / cancellation)
│   ├── page-naming-convention.md
│   └── assets/
│       ├── debug/scenarios.js   # Scenario definitions (source of truth for debug)
│       ├── omni/                # Product icons, sheet covers, category SVGs
│       ├── fonts/               # Tabby Sans Display/Text
│       ├── previews/            # Dev screenshots (reference only, not used at runtime)
│       └── tabby-trial-benefits/
└── tmp/                    # Local scratch — gitignored, do NOT commit
```

## Architecture

### Single-page app in `plus/index.html`

- **Screens** (`setScreen`): `landing`, `subscription`, `trial-success`, `cancel-warning`, `cancelled`, `offer`, `lose-benefits`, `settle-payments`, `cashback-selection`, etc.
- **Bottom sheets** (`openSheet` / `<template data-sheet-id>`): payment tokenization, lifetime savings, benefit details, subscription actions, etc.
- **State**: `localStorage` keys prefixed `plus-*` (payment method, trial, cashback flags, cancellation context, savings counter animation, etc.).
- **Styling**: CSS variables for Omni/DS tokens (`--ds-*`, `--color-*`). Tabby Sans fonts loaded via `@font-face`.

### Debug / scenario system

1. **`plus/assets/debug/scenarios.js`** — defines scenarios with:
   - `id`, `flow`, `title`, `entry` (`screen`, optional `openSheet`)
   - `state` — initial flags written to `localStorage`
   - `variants` A/B/C (copy/structure experiments, mostly scaffolding)

2. **`plus/debug-menu.html`** — UI to pick scenario + variant, toggle conditions, generate shareable URLs.

3. **`plus/index.html`** — on load:
   - `resolveDebugScenarioFromUrl()` reads `?scenario=…&variant=…` and `cw_*` / `animate_savings_*` params
   - `applyDebugScenario()` hydrates `localStorage` and calls `setScreen(entry.screen)`

Example URL:

```
plus/index.html?scenario=activation-cards-benefits&variant=A&animate_savings_counter=1&animate_savings_start=1019.97
```

### Scenarios (current)

| ID | Entry screen | Purpose |
|----|--------------|---------|
| `activation` | `landing` | Non-subscriber, trial available |
| `activation-cards-benefits` | `subscription` | Subscriber, paid active |
| `subscriber-active-trial` | `subscription` | Subscriber, trial active |
| `cancellation` | `cancel-warning` | Cancel flow baseline |

### Savings counter animation

On `subscription` screen, `animateSavingsCounter()` runs if `plus-animate-savings-counter !== '0'`.

- **No delta** (`animateSavingsDelta` empty): rolls up from `0` → start value (default `1019.97`), left-to-right stagger.
- **With delta** (`Increase by` in debug menu): animates `start` → `start + delta`, right-to-left (fractions first).

Config keys: `plus-animate-savings-start`, `plus-animate-savings-delta`.

### Cancellation warning (`cancel-warning`)

Dynamic supercells driven by `applyCancelWarningState()`:

- `hasTabbyCard`, `hasOlPurchases`, `hasActiveSplit6`
- URL overrides: `cw_has_tabby_card`, `cw_has_ol_purchases`, `cw_has_active_split6`

### Cashback selection

Screen `cashback-selection` with Tabby Cash / Tabby Card tabs, category pickers, widget states. Controlled via scenario state and `cw_cb_*` URL params from debug menu.

### Split in 6 widget

`#subscription-si6-card` on subscription page; visibility via `split6Available` / `plus-split6-available`.

## Conventions for changes

1. **Minimize scope** — this is one large `index.html`; match existing patterns (vanilla JS IIFEs, `localStorage`, CSS in `<style>`).
2. **New scenario state** — add to `scenarios.js`, wire URL param in `resolveDebugScenarioFromUrl()` + `applyDebugScenario()`, add control in `debug-menu.html` if user-facing.
3. **Page names** — follow `plus/page-naming-convention.md` for display titles; keep technical screen ids stable.
4. **Assets** — put new SVGs/PNGs under `plus/assets/omni/` with kebab-case names.
5. **Do not commit** `tmp/`, `.DS_Store`, or accidental git submodules under `tmp/`.
6. **No npm/build** unless explicitly requested — prototype is static HTML.

## Deploy (GitHub Pages)

- Branch: `main`, folder: `/` (root)
- After push, site updates in ~1–2 min at `https://rushankaiumov-lab.github.io/Plus/`
- If Pages build fails on submodules, remove stale `tmp/ds-context` from git index.

## Figma references (context)

- Tabby Plus 2.0 product screens
- Omni Design System components (accordion, supercells, sheets)

Prototype is pixel-oriented to Figma but not auto-synced — verify spacing/typography against design when changing UI.

## Language

- Product UI: **English**
- Debug menu: **EN / RU** toggle (`data-i18n` in `debug-menu.html`)
