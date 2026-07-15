# Brew & Co — Component Specifications

Every spec below resolves to tokens from [`tokens/tokens.css`](./tokens/tokens.css) — see [`style-guide.md`](./style-guide.md) for the reasoning. Class names shown are Tailwind v4 utilities generated from those tokens (e.g. `bg-cherry`, `text-crema`, `font-display`) plus the two hand-written helpers, `.roast-line` and `.roast-underline`.

---

## 1. Button

**Purpose:** the single action a section wants you to take. Label is always a verb phrase describing what happens ("Order now," "Add to bag"), never "Submit" or "Click here."

**Variants**

| Variant | Surface | Use when |
|---|---|---|
| Primary | `bg-cherry`, `text-crema` | One per section — the main action |
| Secondary | `bg-transparent`, `border border-espresso` (or `border-crema` on dark), `text-espresso`/`text-crema` | Paired next to a primary, e.g. "Explore menu" beside "Order now" |
| Ghost | no fill, no border, `text-cherry` | Low-emphasis inline actions, e.g. "View all" |

**Anatomy:** `[ icon? ] label [ icon? ]` — icon optional, leading or trailing, 16–18px, same color as label.

**Sizing:** height `44px` (meets the 44px tap-target minimum from the accessibility section on its own — don't add extra hit-area padding as a workaround). Horizontal padding `spacing-pot` (24px). Radius `radius-md`. Label in `font-body`, `text-base`, medium weight.

**States**

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | `bg-cherry` | `border-espresso` `text-espresso` | `text-cherry` |
| Hover | `bg-cherry-700`, 2px `border-b` in `gold` (Roast Line accent, not full gradient) | `bg-espresso/5` | `.roast-underline` sweep under label |
| Focus-visible | `ring-2 ring-cherry ring-offset-2` on all variants | | |
| Active/pressed | `translate-y-[1px]` | same | same |
| Disabled | `bg-cherry-300`, `text-crema/70`, `cursor-not-allowed`, no hover/active transform | analogous tint | analogous tint |

**Responsive:** full-width (`w-full`) on screens `< sm`, inline (`w-auto`) from `sm` up. Two buttons side by side (hero) stack vertically on mobile with `gap-cup`.

---

## 2. Navigation Bar

**Purpose:** wayfinding + brand mark, persistent across the site.

**Anatomy:** `[ Wordmark ]  [ nav links ]  [ Reserve a table button ]`, single row, `h-20` (80px), `bg-espresso`, `text-crema`.

Brew & Co has no accounts or online ordering, so there's no "Sign in" and no "Order now" — the one real conversion action on this site is reserving a table, so that's the nav's single trailing CTA. Nav links: Home / Menu / About.

**Details:**
- Wordmark in `font-display`, `text-xl`, no logotype box — set directly on `bg-espresso`.
- Nav links: `font-body`, `text-base`, `text-crema/85` default → `text-crema` + `.roast-underline` active/hover. Never underline by default; the sweep is the only underline treatment.
- Container: `max-w-[--container-brew]`, `mx-auto`, `px-mug` (mobile) / `px-pot` (desktop).
- Trailing action is the Primary button (§1), tone `onEspresso`, label "Reserve a table" → `/reservations`.

**States:** sticky on scroll after `80px` of scroll — background stays `bg-espresso` but gains `shadow-card` to separate from content below (no color change, no shrinking).

**Responsive:** below `md`, nav links collapse into a menu triggered by an icon button (hamburger → close), expanding as a full-width panel in `bg-espresso` below the bar; the "Reserve a table" button remains visible in the collapsed bar too, repeated inside the open panel. Respect `prefers-reduced-motion`: the panel's expand transition is skipped (`motion-reduce:transition-none`), so it snaps open/closed instead of animating.

---

## 3. Hero

**Purpose:** the thesis statement — what Brew & Co is, in one look.

**Anatomy (desktop, two-column):**
- Left: eyebrow-free headline in `font-display`, `text-5xl`, `text-crema`, max-width ~10 characters per line, one word set in Fraunces italic for emphasis (not color, not bold — see style-guide §3). Below it, one line of supporting copy in `font-body text-md text-crema/80`, max-width `32ch`. Below that, Primary + Secondary buttons (§1) side by side. Below that, a stat row (§9).
- Right: a single photograph (drink or pour), no frame, allowed a `2°` tilt and thin `border border-crema-100/20` per the imagery guidance.
- Background: `bg-espresso` with the low-opacity wordmark/bean watermark from style-guide §6, never a photo background behind the text — text always sits on flat `espresso` for contrast.

**Spacing:** section padding `py-roastery` desktop / `py-urn` mobile. Column gap `spacing-carafe`.

**Motion:** on load, headline → image → stat row fade/rise in, staggered ~80ms apart, `duration-slow`, `ease-brew`. Skip entirely under `prefers-reduced-motion`.

**Responsive:** stacks to a single column below `lg`; image moves above the text block on mobile is *not* used — text stays first for scan order, image follows.

---

## 3a. HeroHome (homepage-only Hero variant)

**Purpose:** the client asked for a hero with a full-bleed background photo specifically on the homepage. Rather than weaken the base Hero's "never a photo background" rule everywhere, this is a scoped, sanctioned variant — the base Hero (§3) is unchanged and stays available for any future non-photo use.

**Anatomy (single column, left-aligned):**
- Full-bleed background photo (`next/image`, `fill`, `object-cover`), `preload={true}` on this image specifically since it's the page's LCP element — **not** the deprecated `priority` prop.
- A solid `bg-espresso/85` scrim layered over the *entire* text-bearing region (not a thin edge gradient) — conservative enough that the composited color stays close to the verified `crema`/`espresso` 15.8:1 (AAA) contrast pairing from style-guide §2.
- No separate side photo, no low-opacity watermark — the photo itself carries the imagery role the base Hero splits across both.
- Content, otherwise identical to base Hero: headline (`font-display text-5xl text-crema`, one Fraunces-italic word), supporting copy (`font-body text-md text-crema/80`, `max-w-32ch` via a container `max-w-xl`), Primary ("Reserve a table" → `/reservations`) + Secondary tone `onEspresso` ("View menu" → `/menu`) buttons, Stat Row (§9) below.

**Spacing:** `py-roastery` desktop / `py-urn` mobile, same as base Hero.

**Motion:** headline → buttons → stat row staggered ~80ms apart, `duration-slow ease-brew` (no separate image element to stagger, since the photo is the background). Full `prefers-reduced-motion` fallback — no stagger, everything present immediately.

**Verification:** once a real photo is in place, spot-check contrast with the scrim applied (e.g. via devtools) rather than assuming 85% opacity is safe for every image — style-guide §9 already directs re-checking contrast rather than assuming a tint works.

---

## 4. Section Divider (Roast Line)

**Purpose:** the signature motif marking a transition between major page sections, replacing a plain hairline `<hr>`.

**Anatomy:** a single `.roast-line` element, `height: 3px`, full content width (`max-w-[--container-brew] mx-auto`), placed in the `spacing-carafe` gap between two sections.

**Rules:** use only at true section boundaries (hero→menu, menu→story, story→testimonials, etc.) — never inside a card or between two paragraphs. At most one per transition. Never place body text directly on top of it.

---

## 5. Menu Item Card

**Purpose:** the core commerce unit — one drink or food item.

**Anatomy:**
```
┌───────────────────────────┐
│  photo (1:1, radius-lg)    │
│  [Popular] badge, top-left │ → bg-espresso text-crema pill, only when the item has a badge
├───────────────────────────┤
│  Name              font-display text-lg text-ink
│  Short description  font-body text-sm text-ink-muted, 2-line clamp
│  ● ● ○  Medium roast      → Roast indicator (§6), only on coffee items
│  $4.50              font-mono text-md text-cherry
└───────────────────────────┘
```
- Card surface `bg-crema-100`, `border border-latte`, `radius-lg`, padding `spacing-pot`.
- Price is the one place `font-mono` appears in a card — it's meant to read like a receipt line, deliberately distinct from the name above it.
- Badge (when present — "Popular" or "House Favorite"): `bg-espresso text-crema`, `radius-sm`, `text-xs uppercase tracking-wide`, positioned top-left over the photo.
- **No per-item action button.** Brew & Co doesn't take online orders — this card is for browsing (in person or on the phone), not adding to a cart, so the price is the card's only "action." If online ordering is ever added, a button slot can be reintroduced here without changing the rest of the anatomy.
- Grid: 3 columns desktop (`lg:grid-cols-3`), 2 tablet (`sm:grid-cols-2`), 1 mobile, gap `spacing-pot`.

**States:** resting `shadow-card`; hover `shadow-lift` + `-translate-y-1`, `duration-base ease-brew`. (No `focus-within` state — the card has no interactive descendant now that there's no per-item button; if one is reintroduced later, restore a matching `focus-within` lift so keyboard and mouse users see equivalent feedback.)

---

## 6. Roast Indicator

**Purpose:** communicates a real product attribute (roast level) — the one legitimate use of a sequence marker in this system (see style-guide §7).

**Anatomy:** three small dots (`8px`, `radius-pill`, `gap-sip`) plus a text label, e.g. `● ● ○  Medium roast`. Filled dots take the gradient stop colors left-to-right (`cherry`, `gold`, `espresso`); unfilled dots are `bg-latte`.

| Roast | Filled dots |
|---|---|
| Light | 1 (`cherry`) |
| Medium | 2 (`cherry`, `gold`) |
| Dark | 3 (`cherry`, `gold`, `espresso`) |

**Accessibility:** the text label is mandatory, not optional decoration — dots alone don't convey the value to screen readers or colorblind users. Mark the dot row `aria-hidden="true"`; the visible text label is the accessible name.

---

## 7. Testimonial Card

**Purpose:** social proof, one quote at a time.

**Anatomy:** `bg-espresso text-crema`, `radius-lg`, padding `spacing-carafe`. Avatar (`40px`, circular, `border-2 border-gold`) + name (`font-body` medium) + star rating (`gold` filled icons, `text-sm`, with a visually-hidden "4.9 out of 5" for screen readers — never color-only). Quote itself in `font-display text-lg`, not `text-base` — testimonials get display treatment to feel like a pull-quote, not a form field.

**Layout:** single card centered, `max-w-2xl`, with Prev/Next icon buttons (`border border-crema/30`, `radius-pill`, `44px` square) flanking or below — reuse the Icon Button pattern from §1's icon-button note, on dark surface.

---

## 8. Newsletter / Form Input

**Purpose:** single-field email capture; the only form in the core marketing pages besides checkout.

**Anatomy:** input (`h-12`, `bg-crema-100`, `border border-latte`, `radius-md`, `px-mug`, placeholder `text-ink-muted`) with the Primary button's icon-only variant docked to its right edge (`radius-md` on outer corners only, shares the input's height).

**States:** focus → `border-cherry` + `ring-2 ring-cherry/30` (not the full button focus ring — inputs get a softer ring so a form with several fields doesn't feel like a wall of red). Error → `border-cherry`, helper text below in `text-sm text-cherry`, phrased as what to fix ("Enter a valid email address"), never "Invalid input."

**On dark sections** (e.g. footer newsletter block): input becomes `bg-espresso-300/40`, `text-crema`, `border-crema/20`.

---

## 9. Stat Row

**Purpose:** quick-hit credibility numbers in the hero (item count, orders, customers) — supporting detail, not the thesis.

**Anatomy:** 3 items in a row, each `[ number ] [ label ]` stacked. Number in `font-mono` (receipt-style, not display — these are data, not a headline) `text-xl text-crema`; label in `font-body text-xs uppercase tracking-wide text-crema/60`. Items separated by a `1px` vertical rule in `crema/15`, not by extra whitespace alone.

**Responsive:** stays a 3-column row even on mobile (numbers are short); reduce to `text-lg` for the number below `sm` if the hero column narrows.

---

## 10. Footer

**Purpose:** contact info, secondary nav, final newsletter capture.

**Anatomy:** `bg-espresso text-crema`, three-column layout desktop (Brand + tagline / Contact / Newsletter form §8), stacking to one column mobile with `spacing-carafe` gaps. A `.roast-line` sits at the very top of the footer, functioning as the last Section Divider (§4) on the page. Links use `.roast-underline` on hover, matching the nav.

**Bottom bar:** below the three columns, a `1px` `crema/15` rule, then copyright + secondary links (privacy, terms) in `text-sm text-crema/60`.

---

## 11. Event Card

**Purpose:** one recurring event (Open Mic Night, Coffee Cupping) shown on the homepage's "Upcoming events" section, with a real, computed next-occurrence date — never a hardcoded one.

**Anatomy:**
```
┌───────────────────────────┐
│  FRI · 17 JUL              → eyebrow, font-mono text-xs uppercase text-cherry
│  Open Mic Night            → font-display text-lg text-ink
│  7–9:30pm                  → font-body text-sm text-ink-muted
│  Bring a song, a poem...   → font-body text-sm text-ink-muted, 2-line clamp
│  [ Reserve a table — Ghost button ] → /reservations
└───────────────────────────┘
```
- Card surface `bg-latte` (not `bg-crema-100` like Menu Item Card, deliberately — events should read as a different content type from menu items at a glance), `border border-espresso/10`, `radius-lg`, padding `spacing-pot`.
- Grid: `grid-cols-1 sm:grid-cols-2 gap-pot` — there are only two recurring events, so this never needs a third column.
- **Not** a Roast Line usage — style-guide §7 is an explicit, closed list of where the signature motif appears, and Event Card isn't on it.

**States:** resting `shadow-card`; hover `shadow-lift` + `-translate-y-1`, `duration-base ease-brew` — same motion vocabulary as Menu Item Card, for consistency.

---

## 12. Page Banner

**Purpose:** a flat, photo-less header for `/menu` and `/about`, so Hero (§3/§3a) stays the homepage's one "thesis statement" moment and isn't diluted by reuse.

**Anatomy:**
- `bg-espresso text-crema`, `py-carafe md:py-urn` — shorter than Hero's `py-roastery`/`py-urn`, so it visibly reads as a secondary moment.
- Optional eyebrow: `font-mono text-xs uppercase tracking-wide text-gold` (gold-on-espresso is already an approved pairing for labels per style-guide §2's contrast table — AA at 6.1:1 for large text/labels, which an all-caps mono label qualifies as).
- Title: `font-display text-3xl md:text-4xl text-crema`.
- Optional supporting line: `font-body text-md text-crema/80`, `max-w-[60ch]`.
- No photo, no buttons, no stat row.
- A `.roast-line` sits at the banner's bottom edge, functioning as the page's first Section Divider (§4) into the content below.
