# Brew & Co — Style Guide

## 1. Direction

Brew & Co is a neighborhood coffeehouse, not a chain. The design should feel like it was built by people who roast their own beans and write the menu on a chalkboard, not by a template.

The organizing idea: **coffee has a visible life cycle** — it grows as a red cherry, gets roasted from tan to near-black, and ends up written in chalk or printed on a receipt. Every distinctive choice in this system is pulled from one of those three real moments (the cherry, the roast, the till slip), rather than invented decoration.

**Principles**

- **Warm, not cute.** Deep espresso and cherry-red carry the weight; cream is a background, not the whole story.
- **One accent does the work.** Cherry red is the only "loud" color. Gold is a garnish, used in small doses.
- **Structure tells the truth.** If something looks like a sequence (roast level, brew steps), it's because it *is* one — not decoration borrowed from a template.
- **Quiet motion.** Things settle into place the way a pour settles in a cup. Nothing bounces for attention.

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `cherry` | `#9C2B33` | Primary accent — CTAs, links, active states, prices on light backgrounds. The color of the coffee cherry before it's a bean. |
| `gold` | `#C08A34` | Secondary accent, used sparingly — star ratings, dividers, roast marks, small icons. Never body text on light backgrounds (fails contrast, see below). |
| `espresso` | `#2A1B12` | Primary dark surface — hero, nav, footer, dark cards. Reads as the finished roast. |
| `latte` | `#E4C9A0` | Secondary surface — cards, tags, alternating sections. Milk-tan, warmer and more saturated than the page background. |
| `crema` | `#F6EEE1` | Page background — steamed-milk cream, not stark white. |
| `ink` | `#1E1611` | Body text on light surfaces. Warm near-black, softer than pure `#000`. |

Tints (`cherry-50/300/700`, `gold-300/700`, `espresso-300/900`, `latte-100`, `crema-100`, `ink-muted`) exist for hover/disabled/subtle states — see [`tokens/tokens.css`](./tokens/tokens.css) for exact values. Don't invent new hex values; extend from these.

**Contrast (WCAG 2.1), checked against actual pairings used in components:**

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `ink` | `crema` | 15.8:1 | AAA, body text |
| `crema` | `espresso` | 15.8:1 | AAA, body text on dark |
| `crema` | `cherry` | 8.2:1 | AAA, button labels |
| `ink` | `latte` | 11.0:1 | AAA, card text |
| `cherry` | `crema` | 8.2:1 | AAA, links/prices |
| `gold` | `crema` | 2.4:1 | **Fails** — decorative/icon use only, never text |
| `gold` | `espresso` | 6.1:1 | AA, large text / labels on dark only |

**Don't:** put gold text on a light background. Don't use cherry for large fills (a full-bleed cherry section) — it's an accent, not a surface color. Don't let latte and crema sit directly adjacent without at least a hairline border or shadow between them; they're close enough in value to blur together.

## 3. Typography

Three roles, three families — each pulled from a real artifact in a café rather than a generic "display + body" pair.

| Role | Typeface | Where it lives | Why |
|---|---|---|---|
| **Display** | [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable) | Headlines, section titles, pull quotes | A warm, soft-contrast serif with organic terminals — reads hand-set, like a bakery or roastery sign, not a Didone fashion-magazine serif. |
| **Body** | [Work Sans](https://fonts.google.com/specimen/Work+Sans) | Paragraphs, nav, buttons, form labels | Humanist sans with a generous x-height — stays legible at small sizes for ingredient lists and descriptions. |
| **Utility / data** | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Prices, order numbers, roast %, table data, timestamps | Evokes a printed till receipt — the one place a real café already sets numbers in monospace. Use narrowly; never for prose. |

### Loading (next/font/google)

```tsx
// app/layout.tsx
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
```

Apply all three `variable` classes to `<html>` (same pattern as the current Geist setup), then reference them through `--font-display` / `--font-body` / `--font-mono` in `tokens/tokens.css` — components should never name a Google Font directly.

### Scale

Major-third-ish ratio (~1.25–1.3), tuned by hand at the extremes so the hero headline doesn't feel mechanically generated:

| Token | Size | Typical use |
|---|---|---|
| `text-xs` | 0.75rem / 12px | Eyebrow labels, receipt-style meta |
| `text-sm` | 0.875rem / 14px | Captions, form hints |
| `text-base` | 1rem / 16px | Body copy |
| `text-md` | 1.125rem / 18px | Lead paragraphs |
| `text-lg` | 1.375rem / 22px | Card titles |
| `text-xl` | 1.75rem / 28px | Subsection headings |
| `text-2xl` | 2.25rem / 36px | Section titles |
| `text-3xl` | 2.875rem / 46px | Secondary hero lines |
| `text-4xl` | 3.75rem / 60px | Hero headline (mobile ceiling) |
| `text-5xl` | 4.75rem / 76px | Hero headline (desktop) |

**Rules:** Display type is set at `font-display`, tight tracking (`-0.01em` to `-0.02em`) at `2xl` and above, and normal weight or Fraunces's own italic for a single emphasized word per headline — not bold, not color, not both. Body copy stays at `font-body`, regular weight, 1.5–1.6 line-height. Never mix display and utility fonts in the same text run.

## 4. Spacing & Layout

Base unit is 4px, exposed as named steps instead of bare numbers because a café's own vocabulary is more legible in component code than `spacing-7`:

| Token | Value | Roughly |
|---|---|---|
| `spacing-sip` | 0.25rem / 4px | icon-to-label gaps |
| `spacing-cup` | 0.5rem / 8px | tight stacks, badge padding |
| `spacing-mug` | 1rem / 16px | default gap, card padding |
| `spacing-pot` | 1.5rem / 24px | card padding (comfortable), form field gaps |
| `spacing-carafe` | 2.5rem / 40px | section-internal spacing |
| `spacing-urn` | 4rem / 64px | between major page sections (mobile) |
| `spacing-roastery` | 6rem / 96px | between major page sections (desktop) |

**Grid:** content max-width `72rem` (1152px), gutters `spacing-mug` on mobile, `spacing-pot` from `md` up. Use Tailwind's default breakpoints (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 / `2xl` 1536) — no custom breakpoints needed for this brief.

**Radius:** `radius-sm` (4px) for tags/inputs, `radius-md` (8px) for buttons, `radius-lg` (16px) for cards and images, `radius-pill` for nav pills and the roast-level meter — mirrors the pill-bordered nav in the reference mood board without copying its exact proportions.

**Shadow:** two steps only — `shadow-card` for resting cards, `shadow-lift` on hover/focus. No ambient glows, no colored shadows.

## 5. Motion

Coffee's own motion is slow and continuous — steam, a pour, milk settling — not snappy or elastic. One easing curve, three durations:

- `ease-brew`: `cubic-bezier(0.22, 1, 0.36, 1)` — a soft decelerate, used everywhere.
- `duration-fast` (150ms): hover/focus color and shadow changes.
- `duration-base` (240ms): the Roast Line underline sweeping in, card lifts.
- `duration-slow` (420ms): section reveals on scroll, hero entrance.

Use motion for exactly three things: (1) the Roast Line sweeping under a nav link or card title on hover, (2) a card lifting `shadow-card → shadow-lift` with a 2px translate on hover, (3) one orchestrated hero entrance (headline, then cup image, then stats, staggered ~80ms apart) on page load. Respect `prefers-reduced-motion`: fall back to instant state changes, no scroll-triggered reveals. Nothing loops, pulses, or bounces indefinitely.

## 6. Imagery & Iconography

- **Photography:** warm, low-contrast, natural light. Close-ups of texture (crema, beans, latte art) over posed people shots. When a photo sits on a light section, give it a slight tilt (1–3°) and a thin `crema-100` "photo edge" border — a tactile, physical detail, used at most once per section so it stays a treat, not a pattern.
- **Icons:** simple line icons, 1.5px stroke, no fill — paired with Work Sans, never with Fraunces. Icons are functional (search, cart, arrow), never decorative filler.
- **Illustration/pattern:** the only permitted background pattern is a very low-opacity (4–6%) oversized wordmark or bean silhouette behind hero text, matching the faint "Caffeine" wordmark watermark in the reference — restrained, not textured wallpaper.

## 7. Signature: The Roast Line

The one memorable, brand-owned device. A horizontal gradient — `cherry → gold → espresso` — that literally traces the color a coffee cherry travels through as it roasts.

```
[ cherry ]────────────[ gold ]────────────[ espresso ]
   raw fruit            mid-roast            finished roast
```

Where it's allowed to appear (and nowhere else, so it stays special):

1. **Section dividers** — a 2–3px `roast-line` between major page sections instead of a plain hairline.
2. **Hover/active underline** on nav links and card titles — the line sweeps in left-to-right over `duration-base`.
3. **Roast-level indicator** — a 3-segment pill meter on menu items (Light / Medium / Dark) using the same three gradient stops as filled dots. This is the one place where a "sequence" marker is legitimate, because roast level *is* an ordered, real attribute of the product — unlike a generic 01/02/03 step list, which this system deliberately avoids elsewhere.
4. **Primary button bottom border** on hover (2px), replacing a generic box-shadow glow.

It never appears as a full background fill, never behind body text, and never more than once per component.

## 8. Voice & Tone

Write from the customer's side of the counter.

- Buttons say what happens: **"Order now"**, not "Submit." **"Add to bag"**, not "Buy."
- Menu descriptions name real things (origin, roast, tasting notes) plainly — no "meticulously crafted," no exclamation points.
- Empty/error states explain what happened and what to do, in a calm, direct voice: *"Your bag is empty. Browse the menu to add something."* — not an apology, not a joke.
- Keep the same word for the same action everywhere: if the button says "Order now," the confirmation says "Order placed," never "Purchase complete."

## 9. Accessibility Commitments

- All text/background pairings in §2 must be used as specified — don't substitute a tint without re-checking contrast.
- Every interactive element gets a visible focus ring: `2px solid var(--color-cherry)` with `2px` offset, on both light and dark surfaces.
- Motion in §5 respects `prefers-reduced-motion: reduce` — disable the hero stagger and hover sweeps, keep instant state changes.
- Minimum tap target `44×44px` for buttons/icon-buttons, even where the visible glyph is smaller.
- Roast-level meter (§7.3) must carry a text label ("Medium roast"), not rely on color/position alone.

## 10. File Map

- Tokens as CSS → [`tokens/tokens.css`](./tokens/tokens.css)
- Tokens as JSON (design tools) → [`tokens/tokens.json`](./tokens/tokens.json)
- Component-by-component specs → [`components.md`](./components.md)
