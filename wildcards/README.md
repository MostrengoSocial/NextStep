# nextStep · wildcard redesign

A working React (Vite) version of the nextStep redesign where every design decision is a deck of **10 wildcards** you can flip through live, compare side by side, and pick.

- **Client brand:** [nextstep.com.pt](https://nextstep.com.pt): copy (EN/PT), the six photos, the rainbow-chevron logo, warm paper and ink, raspberry accent, the six pride colours.
- **Design language:** [mdmlegal.eu](https://mdmlegal.eu) × [kohulabs.com](https://kohulabs.com): mono eyebrows, two-line headings with an accent second line, grid-paper infographic cards, flip-tile boards, stat grids, dark bands.
- **Production site is separate.** This app lives in `wildcards/` and does not change the live site in `frontend/`.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
npm run single       # builds and writes nextstep-preview.html (one self-contained file)
```

## How to switch options

- **Wildcards button** (bottom left): the deck. *System* tab: top bar, footer, background, numbering, typeface, light/dark, ghost numbers on/off. *Infographics* tab: one row per section. Shuffle all, Reset to picks, Hide arrows, Gallery.
- **Arrows under each infographic**: `← Wildcard 03/10 · name →` switches that section in place.
- **Gallery** at `#/wildcards`: every option side by side; “Use this” applies it. Choices are saved in the browser (`localStorage` key `nextstep-wildcards-v1`).

## Design language

| | Choice |
|---|---|
| Palette | Paper `#F8F7F4`, ink `#141414`, raspberry `#B23149` (dark `#F08497`), pride red/orange/yellow/green/blue/magenta, dark band `#141414` |
| Structure | Mono eyebrow → two-line heading (second line in raspberry, accent word) → lede on the right; grid-paper figure cards; ruled stat grids; one dark “Why Portugal” band |
| Motifs | Rainbow chevrons (logo, steps, traveller on the bridge), boarding pass, flip tiles, azulejo, map coordinates, handwritten letters |
| Type | Display / body / mono / accent-word faces via CSS variables (`--f-display`, `--f-body`, `--f-mono`, `--f-accent`, `--dw`, `--track`, `--dscale`, `--dcase`) |
| Defaults | The client’s picks: Spectrum Clocks bar, One Last Question footer, Azulejo & Grain, Chevron Steps, ghost numbers on, Departure Signal type; infographic 01 in each section is the design already approved |

## Every wildcard

### Infographics (8 sections × 10)
Wildcard 01 is the approved design; 02–10 come from the infographic catalogue.

- **Hero:** Boarding pass · Passport stamps · Chevron flight path · Azulejo morph · Move meter · Atlantic globe · Headline on flaps · Postcard flip · Pride compass · Tram 28 ticket
- **Routes:** Atlantic arc map · Metro map · Sankey flow · Luggage tags · Time-zone clocks (live) · Radar sweep · Stamp collection · Gate progress · Distance ruler · Paper planes
- **About:** Bridge · 300 houses · 20-year ribbon · 99% gauge · 24/7 clock · Three-way Venn · Case-file stack · Tally count-up · Circles of care · Translation card
- **Why Portugal:** Rainbow timeline · Staircase of rights · Highlighted Article 13 · Rights ledger · Layered shield · Life icons arc · Tree rings · Gazette clippings · Rising equaliser · Map of reasons
- **Services:** Services explorer · Orbit hub · Key ring · Tabbed dossier · One-point pie · Board game · Periodic table · House cutaway · Life-stage matrix · Stacked blocks
- **Destinations:** Whole Algarve map · Portugal pin map · Postcard rack · Climate strips · Polaroid pile · Distance from Faro · Tile per town · Window views · Lifestyle sliders · Pending address
- **Stories:** Handwritten letters · Chat thread · Before / after slider · Story routes · Six-month journey · Voice waveform · Polaroid + stamp · Giant pull quote · Constellation · Ticket stubs
- **Contact:** Office map · Boarding-pass form · Three-step promise · Overlap clock (live) · Letter & envelope · Chat-style form · 24-hour reply ring · Take-a-number · Door ajar · Contact cards

When a non-default infographic is on, Services and Stories also show their full content as a list, so nothing is lost.

### Top bars (all collapse to a burger menu below 980 px)
Spectrum Clocks · Departures Ticker · Floating Pill · Boarding Pass · Black Gate · Side Rail · Shrinking Wordmark · Azulejo Band · Language First · Bottom Dock

### Footers
One Last Question · Postcard · Final Call · Map Footer · Spectrum Stairs · Algarve Sunset · Table of Contents · Signed Off · Tile Mosaic · Big Wordmark

### Backgrounds
Azulejo & Grain · Dot Grid · Azulejo · Paper Grain · Monchique Contours · Chart Grid · Pride Glow · Calçada Waves · Legal Pad · Night Tile (dark)

### Numbering
Chevron Steps · Mono Label · Section Stamp · Gate Number · Outline Numeral · Legal Article · Progress Dots · Fraction · Tram Stops · Dossier Tab

### Typefaces
Departure Signal (Big Shoulders + Public Sans) · House Blend (Bricolage + Instrument Sans) · Instrument Pair · Soft Counsel (Fraunces + Work Sans) · Studio Syne (Syne + Manrope) · Wide Joy (Unbounded + DM Sans) · Gravitas (Gloock + Schibsted Grotesk) · Old Town (Young Serif + Figtree) · Stretch (Anybody + Onest) · Riviera (Bodoni Moda + Hanken Grotesk)

## Placeholders and things to confirm

- **Contact form:** prototype only. It opens the visitor's email app addressed to hello@nextstep.com.pt (the production site posts to `/api/contact`).
- **Sample data:** the swimlane timings, “Boarding” example routes, climate strips, Sankey shape and gate progress bars are illustrative and labelled as such.
- **Facts to confirm with nextStep:** the 2004/2010/2016/2018 law timeline and law numbers, map coordinates and approximate outlines, and the figures 300+ / 20+ / 99% / 24/7 (taken from the current site).
- **Infographic labels** inside the sketches are in English; the page copy switches EN/PT.
