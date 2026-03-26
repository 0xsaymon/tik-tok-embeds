# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (auto-opens browser)
pnpm build      # Type-check (tsc -b) + Vite production build
pnpm lint       # ESLint with flat config
```

## Architecture

Feature-Sliced Design (FSD) with strict import rules: each layer can only import from layers below it.

```
app/ → pages/ → widgets/ → features/ → shared/
```

- **app/** — Router, providers (ThemeProvider, Toaster). ~25 lines.
- **pages/** — Route-level compositions. Each page in `pages/{name}/ui/{Name}Page.tsx` with barrel `index.ts`.
- **widgets/** — Reusable UI blocks: `app-navigation`, `embed-config-panel`, `embed-preview`. Prop-driven, no feature imports.
- **features/** — Business logic with zustand stores: `embed-playground` (single video testing), `embed-grid` (multi-video grid). Import only from `shared/`.
- **shared/lib/tiktok/** — TikTok embed types (`EmbedConfig`, `TabValue`), URL builders (`buildIframeUrl`), URL parser, constants. The core shared module.
- **shared/ui-kit/** — shadcn/Radix components in `components/ui/`, theme system in `theme/`. Do not restructure — follows shadcn conventions.

## Key Conventions

- **Path alias:** `@/*` → `./src/*`
- **Package manager:** pnpm (not npm/yarn)
- **State:** Zustand with `persist` middleware for localStorage
- **Styling:** Tailwind CSS v4 with `prettier-plugin-tailwindcss` (auto-sorts classes)
- **Imports:** Auto-sorted by `eslint-plugin-simple-import-sort`
- **Language:** All UI text in Ukrainian. Technical terms (Iframe, oEmbed, TikTok) stay in English.
- **ESLint ignores:** `src/shared/ui-kit/{lib,hooks,components}/**` — shadcn-generated code
- **Prettier:** 100 char line width, single quotes, trailing commas, arrow parens "avoid"

## Routes

| Path | Page | Query params |
|------|------|-------------|
| `/` | PlaygroundPage | `?tab=iframe\|oembed` |
| `/grid` | GridPage | — |
| `/research` | ResearchPage | — |
| `/alternatives` | AlternativesPage | — |

## TikTok Embed Methods

Two methods exist with different capabilities:

- **oEmbed** (blockquote + embed.js): Zero customization of internal elements. Only `max-width` on container.
- **Iframe Player** (`/player/v1/{id}?params`): 10 verified query parameters (autoplay, muted, loop, music_info, description, rel, controls, timestamp, closed_caption, native_context_menu). 4 params from vibe-coded demo don't work (progress_bar, play_button, volume_control, fullscreen_button). Recommended approach.

Neither method allows: hiding author info, removing TikTok branding, or blocking redirects.
