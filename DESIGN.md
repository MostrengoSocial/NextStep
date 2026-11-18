---
# nextStep design tokens. The source of truth in code is frontend/src/styles/site.css (:root);
# if the two ever disagree, fix this file to match the CSS, then follow the rules below.
name: nextStep
version: 1.0
updated: 2026-11-15
site: https://nextstep.com.pt
stack: React 19 (CRA/craco) · plain CSS custom properties · no Tailwind on the public site

color:
  light:            # default theme
    paper: "#F8F7F4"        # page background (warm off-white) + paper grain overlay
    surface: "#FFFFFF"      # cards, map frames, form
    sunk: "#EFEDE8"         # pills, tab tracks, inset areas
    ink: "#141414"          # primary text, primary button
    ink-2: "#3A3A3A"        # secondary text, ledes
    muted: "#5C5C5C"        # labels, captions, mono metadata
    line: "rgba(20,20,20,0.14)"      # hairlines, borders
    accent: "#B23149"       # raspberry: the one brand accent
    accent-soft: "rgba(178,49,73,0.18)"
    button: { bg: "#141414", text: "#F8F7F4", hover-bg: "#B23149" }
    band: { bg: "#141414", text: "#F4F3F0", muted: "#A9A69F", accent: "#F08497" }   # dark band section (03 Why Portugal)
    whatsapp: "#1F9E50"     # WhatsApp icon/text on light surfaces
  dark:             # [data-theme="dark"] or prefers-color-scheme: dark
    paper: "#0F1010"
    surface: "#171818"
    sunk: "#1E1F1F"
    ink: "#F1EFEA"
    ink-2: "#D2CFC8"
    muted: "#A09D96"
    line: "rgba(241,239,234,0.15)"
    accent: "#F08497"
    accent-soft: "rgba(240,132,151,0.22)"
    button: { bg: "#F1EFEA", text: "#0F1010", hover-bg: "#F08497" }
    band: { bg: "#1A1B1B", text: "#F1EFEA", muted: "#A09D96" }
    whatsapp: "#2BC163"
  spectrum:         # pride colours, used as data colours and the route line. Same in both themes.
    red: "#E44D60"
    orange: "#E8893C"
    yellow: "#E8C93C"
    green: "#3BAF6A"
    blue: "#4A7FBF"
    magenta: "#C94FAB"
  spectrum-gradient: "linear-gradient(90deg, red 0 16.7%, orange 0 33.3%, yellow 0 50%, green 0 66.7%, blue 0 83.3%, magenta 0)"
  service-colors:   # fixed: a service always wears its colour (timeline, panel, dots)
    immigration-visas: red
    relocation-concierge: yellow
    real-estate-investment: orange
    employment-business: blue
    community-connection: magenta
    family-personal-law: green
  houses-flag:      # the 300-houses grid uses the 6-stripe pride flag, two rows per stripe
    ["#E40303", "#FF8C00", "#FFED00", "#008026", "#24408E", "#732982"]
  whatsapp-button: "#25D366"   # floating button only (WhatsApp brand green), white icon

typography:
  families:
    display: '"Bricolage Grotesque", "Helvetica Neue", Arial, sans-serif'   # headlines, names, numbers; opsz 96, weight 700–800
    body: '"Instrument Sans", "Helvetica Neue", Arial, sans-serif'          # running text, buttons, form
    mono: '"DM Mono", ui-monospace, Menlo, Consolas, monospace'             # eyebrows, coordinates, codes, labels
    serif: '"DM Serif Display", Georgia, serif'                             # italic only: one emphasised word per headline
  loading: Google Fonts, one request in frontend/public/index.html (display=swap). Only these four families.
  scale:
    h1: { size: "clamp(3rem, 6.4vw, 5.9rem)", line-height: 0.93, weight: 700, tracking: "-0.045em" }
    h2: { size: "clamp(2.4rem, 5.4vw, 4.6rem)", line-height: 0.98, weight: 700, tracking: "-0.045em" }
    h3: { size: "clamp(1.35rem, 2vw, 1.6rem)", line-height: 1.1, weight: 700, tracking: "-0.03em" }
    lede: { size: "clamp(1.08rem, 1.4vw, 1.22rem)", color: ink-2, max-width: "36rem" }
    body: { size: "17px", line-height: 1.6, weight: 400 }
    eyebrow: { family: mono, size: "12.5px", tracking: "0.12em", case: uppercase, color: muted }
    mono-label: { family: mono, size: "12px", tracking: "0.1em", case: uppercase }
    button: { family: body, size: "15px", weight: 600 }
    ghost-number: { family: display, size: "clamp(7.5rem, 15vw, 13rem)", weight: 800, style: "outlined, accent at 30%" }

layout:
  max-width: "1280px"
  gutter: "max(16px, safe-area, 4vw)"        # .wrap left/right padding; never less than 16px on phones
  section-padding-block: "clamp(72px, 10vw, 136px)"
  header-height: "76px"                       # sticky, blurred paper at 88% opacity
  scroll-padding-top: "88px"
  breakpoints:
    phone: "≤640px"      # compact drawings replace wide ones; single column
    small: "≤560px"
    tablet: "≤860px"     # services timeline stacks (name above bar)
    nav: "≤1060px"       # desktop nav collapses to the burger menu
  rule: "No horizontal scrolling anywhere, at any width from 320px up."

radius:
  xs: "2px"      # bars, swatches
  sm: "6px"
  button: "10px"
  card-sm: "12px"
  card: "14px"   # --radius
  card-lg: "18px"
  pill: "999px"  # tabs, language/theme toggles, timeline bars

elevation:
  default: none          # flat: hairline borders, not shadows
  photo-card: "0 34px 60px -44px rgba(0,0,0,.45)"
  floating-whatsapp: "0 6px 20px rgba(0,0,0,.22)"
  focus-ring: "2px solid accent, offset 3px"
  active-chip: "0 0 0 3px accent-soft"

motion:
  ease: "cubic-bezier(.2, .7, .1, 1)"
  durations: { hover: "0.2–0.25s", reveal: "0.8–1.1s", hero-slide: "6s" }
  reveal: "elements animate once when scrolled into view (useReveal, IntersectionObserver)"
  reduced-motion: "all animation and transitions off under prefers-reduced-motion"

components:
  button-primary: { height: "52px", padding: "0 22px", radius: "10px", bg: button.bg, text: button.text, hover: "bg → accent; arrow nudges ↗" }
  button-ghost: { height: "52px", border: line, hover: "border → ink" }
  pill-toggle: { radius: pill, font: mono, use: "language (EN/PT) and theme (Light/Dark)" }
  tabs: { track: sunk, active: "ink bg, paper text", radius: pill }
  eyebrow-steps: "chevron progress + 'Step N of 7 · Label' in mono"
  whatsapp-float: { size: "58px (54px on phones)", position: "bottom-right, 20px (16px phones), safe-area aware", z-index: 40 }
---

# nextStep · DESIGN.md

How the nextStep website looks, and the rules that keep it consistent. Read this before
changing anything visual. What the site *does* is in [PRODUCT.md](PRODUCT.md).

## 1. The idea in one line

**A relocation dossier with a pride route line.** Editorial grotesque headlines, mono
"travel document" labels (codes, coordinates, step counters), warm paper, one raspberry
accent, and the six pride colours used as *data*: routes, services, towers, houses. The
site should feel like a calm, competent law firm that happens to be fully on your side,
not like a campaign poster.

Influences: mdmlegal.eu (editorial, legal seriousness) mixed with kohulabs.com (bold
grotesque type, playful infographics), in nextStep's own palette and photography.

## 2. Colour

- **One accent: raspberry** `#B23149` (light) / `#F08497` (dark). It marks the second
  line of headlines, eyebrow numbers, the active state, hover on the primary button, the
  Faro office, and the 'Your new life' end of the bridge. Nothing else is accent-coloured.
- **The pride spectrum is for data and wayfinding, never for decoration or text.** Use it
  for: route arcs, service colours, bridge towers, the houses grid, the top progress bar,
  the footer stripe, the chevron logo, and the underline on `.mark`. Each service keeps
  its colour everywhere (see `service-colors` above); never reassign them.
- **Neutrals carry the page**: paper background, white surfaces, ink text, hairline
  borders. Most of the screen should be neutral so the colour in infographics reads.
- **Always use the CSS custom properties** (`var(--accent)`, `var(--red)`…). Never paste a
  hex into a component. A new colour needs a new token in both themes, added here first.
- **Both themes are required.** Light is the default; dark is set by `data-theme="dark"`
  or the OS preference. Every new style must look right in both: check `--paper`,
  `--surface`, `--ink`, `--line` and `--accent` swap correctly.
- Contrast (measured): ink on paper 17.2:1 · ink-2 6.24–10.6:1 · muted on paper 6.24:1 ·
  accent on paper 5.72:1 · dark accent on dark paper 7.67:1 · dark muted 7.04:1. Keep all
  text at 4.5:1 or more.
- **Known exception:** the floating WhatsApp button uses WhatsApp's brand green `#25D366`
  with a white icon (1.98:1). It is kept for instant recognition. Don't copy that pairing
  anywhere else; use `--wa` (`#1F9E50`, 3.46:1 against white) for WhatsApp icons on cards.

**Rejected colours (don't bring them back):** teal (the old brand colour, explicitly
disliked), gold/yellow as the accent (tried and replaced by raspberry). Yellow exists
only as a spectrum/data colour.

## 3. Typography

Four families, each with one job:

| Family | Job | Never use it for |
|---|---|---|
| **Bricolage Grotesque** 700–800 | Headlines, town names, big numbers, the wordmark | Paragraphs |
| **Instrument Sans** 400–600 | Body text, buttons, form, lists | Headlines |
| **DM Mono** 400–500, UPPERCASE, tracked | Eyebrows, coordinates, airport/route codes, small labels, captions on maps | Sentences longer than a line |
| **DM Serif Display** *italic* | Exactly one emphasised word at the end of a headline ("home.", "arrival.", "get it.") | Anything else |

Headline pattern (`Headline` / `SectionHead` in `shared.jsx`): line 1 in ink, line 2 in
accent, ending on one serif italic word. Example: *Wherever you're leaving from.* /
*We handle the **arrival.***

Coordinates are written `37.02° N · 7.93° W` (two decimals on maps, four on photo cards),
with a middle dot `·` as separator. Codes are IATA (`FAO`, `LIS`, `OPO`).

## 4. Layout and spacing

- Content sits in `.wrap`: max 1280px, side gutter `max(16px, 4vw)` and safe-area aware.
- Sections breathe: `clamp(72px, 10vw, 136px)` top and bottom.
- Seven numbered sections, each with an eyebrow `Step N of 7 · Label` (chevron progress)
  and a large outlined ghost number behind the heading: 01 Routes · 02 About · 03 Why
  Portugal (dark band) · 04 Services · 05 Destinations · 06 Stories · 07 Contact.
- Flat surfaces: separate things with 1px `--line` hairlines and white cards, not shadows.
- **No horizontal scrolling, ever.** Not on the page, not inside a chart. If a graphic
  doesn't fit, design a phone version (see §6). Verify at 390px wide: `scrollWidth -
  innerWidth === 0` and every frame's `scrollWidth === clientWidth`.

## 5. Components (what exists; reuse before adding)

| Component | Where | Notes |
|---|---|---|
| Sticky header | `SiteHeader.jsx` | Logo, nav, two clocks (Faro + visitor), EN/PT pill, Light/Dark pill, primary CTA, burger ≤1060px, pride progress bar along the bottom edge |
| Boarding-pass hero | `Hero.jsx` | 5 photo slides (Faro, Tavira, Quinta do Lago, Lisboa, Lagos), 6s auto-advance; pass reads From → To, Passenger YOU, Seat HOME, stub "Admits you and your loved ones" |
| Routes atlas | `RoutesMap.jsx` | Real-coordinate arcs to an enlarged Portugal inset; compact phone drawing lists origins north→south |
| Bridge | `About.jsx` | Three towers Legal / Cultural / Personal (red, yellow, blue); bold mono end labels; phone drawing puts labels under the water |
| 300 houses | `About.jsx` | One pride-flag house per family, plus 20 outlined "yours could be next" |
| Rights timeline | `Rights.jsx` | Dark band section; 2004 → 2018 law milestones |
| Services explorer | `Services.jsx` | 6-month swimlane = the menu; each lane is a tab; panel below shows what's included |
| Destinations map | `Coastline.jsx` | Tabs Algarve / Lisbon / Porto / Madeira / Azores; real coordinates; larger dots for district/regional capitals; phone version = numbered pins + list |
| Stories | `Stories.jsx` | Six-month journey per client, route code chips |
| Contact | `Contact.jsx` | Schematic office map, info list with Copy buttons, tappable phone, WhatsApp card, form (posts to `/api/contact`) |
| Footer | `SiteFooter.jsx` | "One last question" CTA, one mono line of details and legal links, spectrum stripe |
| WhatsApp float | `shared.jsx` | Bottom-right on every page, greeting pre-typed in the page language |

Buttons: one primary per view area (black, turns raspberry on hover, mono `↗`/`→`
arrow). Ghost buttons for secondary actions. Text links: `Talk to us →` style.

## 6. Infographics: the house rules

These are the most distinctive part of the site and the easiest to break.

1. **Real data, honestly drawn.** Map positions are real latitude/longitude, projected
   equirectangular with longitude scaled by cos(latitude). Island outlines come from
   Natural Earth 1:10m (public domain); mainland outlines are hand-drawn approximations
   and the caption says so.
2. **Fit the frame.** A graphic fills the width of its area at every size. It never
   needs sideways scrolling and never shows a swipe hint.
3. **Phones get their own drawing, not a shrunken one.** Under 640px, the wide SVG
   (`.wide`) is hidden and a compact SVG (`.compact`) is shown: re-laid-out, with larger
   type. Pattern: dense labels become numbered markers plus an HTML list below.
4. **Leaders point at the dot.** Dashed leader lines run on the straight line from the
   dot's centre to the label, starting just outside the dot.
5. **Crowded points get nudged, not hidden.** If two markers overlap (an airport next to
   a capital), offset one and draw a short solid leader back to its true position.
6. **Hierarchy by size:** office > district/regional capital > town > minor place.
   Airports use the square plane icon with the IATA code.
7. **Labels in mono caps; place names in display bold;** coordinates under names.
8. Every SVG has `role="img"` and an `aria-label` in the page language that says what
   it shows.

## 7. Imagery

- Real, sunny, specific places in Portugal: Faro (Arco da Vila), Tavira, Quinta do Lago,
  Lisboa (tram 28), Lagos (Ponta da Piedade), people walking together. No stock
  handshakes, gavels, or generic "lawyer" photos.
- Photos sit in rounded cards with a mono caption bar (region left, coordinates right).
- Hosting: Unsplash via `images.unsplash.com` (`auto=format`, ~1100px, q=60), or local
  files in `frontend/public/img/` (max ~1400px wide, EXIF stripped). Credit CC-licensed
  photos (the Faro photo carries its CC BY-SA credit).
- Alt text in both languages, describing the scene, not "image of".

## 8. Logo

The chevron mark: five stacked chevrons in red, orange, yellow, green, blue, pointing
right (the next step). Wordmark "nextStep" in Bricolage Grotesque 700, tracking -0.05em,
lowercase n, capital S. Never recolour the chevrons, never use the wordmark alone in the
accent colour, never put the mark on a busy photo without a paper or ink backing. Social
profile pictures: chevrons centred on paper `#F8F7F4` or ink `#141414`.

## 9. Motion

Quiet and purposeful: things draw or rise in once when they enter the viewport (route
arcs draw, bars grow, houses pop in), hovers respond in ~0.25s with `--ease`. No looping
decorative animation apart from the hero slideshow, the office pin pulse and the bridge
traveller. Everything stops under `prefers-reduced-motion`.

## 10. Accessibility and language

- WCAG 2.1 AA: text contrast ≥4.5:1, visible `:focus-visible` ring (2px accent), real
  buttons for tabs (`role="tab"`, `aria-selected`), labelled form fields, 44px+ touch
  targets.
- Every string exists in **English and European Portuguese** (`content.en` / `content.pt`
  in `frontend/src/data/site.js`). Portuguese copy is written, not machine-literal; use
  pt-PT ("telemóvel", "autorização de residência").
- Don't rely on colour alone: services also have names and codes; map points have labels.

## 11. Anti-patterns (things that went wrong before, or must not happen)

- ❌ Hardcoded hex values in components, or new one-off colours.
- ❌ Teal, or a yellow/gold accent.
- ❌ Horizontal scrolling, `min-width` on charts, "swipe to explore" hints.
- ❌ A graphic shrunk to illegibility on phones instead of a compact version.
- ❌ Shadows and gradients as decoration (the spectrum is the only gradient).
- ❌ The pride colours on body text or as large background fills.
- ❌ More than one serif italic word per headline, or serif anywhere else.
- ❌ Swapping a service's colour, or reordering services in one place but not the others
  (`serviceMeta`, `plan.lanes` and `items` are index-aligned in both languages).
- ❌ Loading extra font families (one Google Fonts request, four families).
- ❌ English-only strings, or Portuguese added later.
- ❌ Changing a visual without checking it at 390px and 1280px, in light and dark.

## 12. Where things live

| What | File |
|---|---|
| Tokens, all styles | `frontend/src/styles/site.css` |
| All copy (EN + PT), images, contact, routes, services | `frontend/src/data/site.js` |
| Map data (regions, towns, airports) | `frontend/src/data/maps.js`, `frontend/src/data/islands.js` |
| Shared bits (headline, eyebrow, logo, WhatsApp) | `frontend/src/components/site/shared.jsx` |
| Page titles and descriptions | `frontend/src/data/pageMeta.js` |
| Fonts, structured data, theme bootstrap | `frontend/public/index.html`, `frontend/public/theme-init.js` |
