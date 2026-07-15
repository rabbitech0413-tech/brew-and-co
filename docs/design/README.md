# Brew & Co — Design System

This is the single source of truth for how Brew & Co looks, sounds, and behaves across the site. It exists so that every screen — hero, menu, checkout, footer — reads as one place, not a stitched-together set of pages.

## Contents

| File | What it's for |
|---|---|
| [`style-guide.md`](./style-guide.md) | Brand direction, color, type, spacing, motion, imagery, voice & tone, accessibility. Read this first. |
| [`tokens/tokens.css`](./tokens/tokens.css) | The tokens as real Tailwind CSS v4 `@theme` — drop-in for `app/globals.css`. |
| [`tokens/tokens.json`](./tokens/tokens.json) | The same tokens as flat JSON, for design tools (Figma, etc.) or scripts that need raw values. |
| [`components.md`](./components.md) | Anatomy, variants, states, and Tailwind usage for every reusable UI piece. |

## Reference

[`references/1.png`](./references/1.png) is a competitor coffee-shop landing page ("Caffeine") used as a *mood and structure* reference during this pass — warm dark hero, cream body sections, serif display type, tilted photo cards, testimonial block. It is inspiration, not a template: Brew & Co's palette, type pairing, and signature motif (the **Roast Line**, see the style guide) are deliberately its own, not a reskin of that layout.

## Stack this system targets

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS v4**, CSS-first config via `@theme` (already in use in `app/globals.css` — no `tailwind.config.js`)
- Fonts loaded with `next/font/google` and exposed as CSS variables, the same pattern already used for Geist in `app/layout.tsx`

## How to wire the tokens in

1. Add the three Google fonts in `app/layout.tsx` via `next/font/google` (see [`style-guide.md`](./style-guide.md#typography) for the exact call and variable names) and put their `variable` classes on `<html>`, replacing the current Geist ones.
2. Import the token file from `app/globals.css`, after the Tailwind import:
   ```css
   @import "tailwindcss";
   @import "../docs/design/tokens/tokens.css";
   ```
   (or copy its contents directly into `globals.css` if you'd rather not reach outside `app/`).
3. Everything in `tokens/tokens.css` is declared inside `@theme`, so Tailwind auto-generates utilities from it — `bg-espresso`, `text-cherry`, `font-display`, `rounded-lg`, `shadow-card`, etc. — no plugin, no config file.
4. Build components against [`components.md`](./components.md) rather than eyeballing the reference screenshot — it already resolves each piece to specific tokens.

This system is documentation + tokens, not a components library — no `app/` code has been changed. It's written so that implementing a component means translating its spec, not inventing one.
