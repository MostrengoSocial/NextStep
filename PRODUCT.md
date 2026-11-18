---
# nextStep product context. Pair with DESIGN.md (how it looks). Facts below are the
# single source for agents; the copy itself lives in frontend/src/data/site.js.
name: nextStep
updated: 2026-11-18
url: https://nextstep.com.pt
type: Marketing and lead-generation website for a boutique legal practice
languages: [en, pt-PT]          # every page in both; Portuguese under /pt/
primary-goal: Book a confidential consultation (form, WhatsApp, phone or email)
business:
  office: "Largo de São Luís, nº11 C, 4ºD, 8000-143 Faro, Portugal"
  email: hello@nextstep.com.pt
  phone: "+351 965 638 897"     # also WhatsApp: https://wa.me/351965638897
  hours: "24/7 by appointment"
  reply-promise: "Within 24 hours"
  consultations: "Confidential, legally privileged"
services:                       # this order everywhere (timeline, panel, form options)
  - { key: visa, code: IV, name: "Immigration & visas", months: "0–4.5" }
  - { key: concierge, code: RC, name: "Relocation concierge", months: "1–4" }
  - { key: property, code: RE, name: "Real estate & investment", months: "2–5" }
  - { key: business, code: EB, name: "Employment & business", months: "3–6" }
  - { key: community, code: CC, name: "Community connection", months: "4–6, then ongoing" }
  - { key: family, code: FL, name: "Family & personal law", months: "0–6, as needed" }
stats: ["300+ families supported", "20+ years of experience", "99% success rate", "24/7 availability by appointment"]
regions: [Algarve, Lisbon, Porto, Madeira, Azores]
stack:
  frontend: "React 19 (CRA + craco), react-router 7, prerendered to static HTML (scripts/prerender.mjs)"
  hosting: "Cloudflare Worker 'nextstep' serving frontend/build as static assets (wrangler.jsonc)"
  api: "POST /api/contact in frontend/worker/index.js, sends email through Resend"
  analytics: "Cloudflare Web Analytics (cookieless)"
  email-hosting: "Hostinger (hello@ mailboxes, MX)"
  dns: "Cloudflare"
---

# nextStep · PRODUCT.md

What the nextStep website is for, who it serves, what it does and the rules behind it.
Read this before adding or changing a feature. How it should *look* is in
[DESIGN.md](DESIGN.md).

## 1. What nextStep is

nextStep is a boutique legal and relocation practice in **Faro, Portugal**, for
**LGBTQIA+ individuals and families moving to Portugal**. One team covers the whole move:
the visa, the property, the paperwork, the family law and the settling in, so nothing
falls between two offices.

**Promise:** *"Your next step is home."* Legal security, personal attention and a safe
harbour: lawyers who get it.

The website exists to **turn a nervous, curious visitor into a booked consultation**.
Everything on the page either builds trust (expertise, rights, real stories, real
places) or removes friction from getting in touch.

## 2. Who it's for

| Persona | Situation | What they need from the site |
|---|---|---|
| **The couple leaving the US** (e.g. Marcus & David, San Francisco → Cascais, D7 visa) | Politically motivated, anxious, comfortable financially | Reassurance that Portugal protects them; a clear visa path and timeline; a team that understands why they're leaving |
| **The trans woman moving alone** (e.g. Sarah, Toronto → Faro, residency) | Fears legal complexity and discrimination | Dignity, privacy, proof the team has done this before; confidential first contact |
| **The family with children** (e.g. Maria & Ana, São Paulo → Tavira) | Same-sex couple with kids; documents from two legal systems | Marriage and parental recognition, schools, healthcare, one team for everything |
| **The investor or remote worker** | Golden Visa, Digital Nomad, buying property, starting a company | Practical scope, timing, what's included |

Common to all: they're far away, comparing options, often reading on a phone in English
(sometimes Portuguese-speaking Brazilians), and need to trust a law firm before sharing
personal details.

## 3. The page, section by section

Single long home page in seven numbered steps, plus legal pages. Each section has one job.

| # | Section | Job | Key content |
|---|---|---|---|
| — | **Hero** | Say who we are and for whom, in one glance | "Your next step is home."; boarding-pass card over five destination photos; CTAs: book a confidential consultation / see services; facts strip (Office Faro · EN/PT · reply within 24h · legally privileged) |
| 01 | **Routes** | "We've done your route before" | Atlas of client routes (SFO, YYZ, JFK, YVR, GRU, GIG → Portuguese cities), status Arrived/Boarding |
| 02 | **About** | Trust in the people | Lawyers who get it; bridge (Legal / Cultural / Personal); 300 houses = families supported; stats |
| 03 | **Why Portugal** | Trust in the country | Rights timeline (2004 constitution, 2010 marriage, 2016 adoption, 2018 self-determination); six reasons; ILGA-Europe ranking |
| 04 | **Services** | What exactly we do, and when | Six-month timeline doubling as the services menu; panel with what's included and typical timing |
| 05 | **Destinations** | Picture the new life | Photo tiles (Quinta do Lago, Faro, Tavira, Lagos…); map with tabs Algarve / Lisbon / Porto / Madeira / Azores, towns, capitals and airports at real coordinates |
| 06 | **Stories** | Social proof | Three client stories with route, visa and a journey from first call to home |
| 07 | **Contact** | Convert | Office map and address, email/phone with copy buttons, WhatsApp card, consultation form |
| — | **Footer** | Last nudge | "One last question" CTA, details, legal links |

Other pages: `/privacy-policy`, `/terms-of-service`, `/legal-disclaimer` (and `/pt/…`
versions), and a real 404 page.

## 4. Features and behaviour

### Contact and conversion
- **Consultation form** (`Contact.jsx` → `POST /api/contact`): name, email, phone
  (optional), moving from, main interest (the six services), message. Client-side
  validation: name, valid email and message required.
  - The Worker validates again, caps field lengths, escapes HTML, and sends **two
    emails through Resend** from `nextStep <website@nextstep.com.pt>`:
    1. a notification to `hello@nextstep.com.pt`, with the visitor as reply-to (must
       succeed);
    2. a confirmation to the visitor, with a WhatsApp link (best effort).
  - The secret `RESEND_API_KEY` is set on the Worker in Cloudflare and is never in the repo.
- **WhatsApp:** a floating button on every page, plus a card in Contact. Both open
  `wa.me/351965638897` with a greeting pre-typed in the page language.
- **Phone:** tappable `tel:` link in Contact and the footer.
- **Primary CTA** "Book a consultation" in the header, hero, footer: always scrolls to
  `#contact`.

### Language
- English at `/`, Portuguese at `/pt/`. The address decides the language
  (`LanguageContext`). The EN/PT pill switches to the same page in the other language and
  keeps the scroll position.
- Every string has both versions in `frontend/src/data/site.js` (`content.en`,
  `content.pt`). Page titles and descriptions are in `frontend/src/data/pageMeta.js`.
- `hreflang` alternates, canonical URLs and `og:locale` are set per page.

### Theme
- Light (default) and dark. Follows the OS until the visitor picks one with the
  Light/Dark pill; the choice is stored in `localStorage` (`ns-theme`) and applied before
  first paint by `public/theme-init.js`.

### Interactive infographics
- Routes atlas, bridge, houses grid, rights timeline, services timeline (each lane is a
  tab), destinations map (region tabs). All work by touch and keyboard, fit the screen at
  every width with no sideways scrolling, and have phone-specific layouts (see DESIGN.md §6).

### Header extras
- Two live clocks: Faro time and the visitor's own time. Scroll progress bar in pride
  colours. Burger menu on narrow screens.

## 5. Business rules and content rules

1. **Never invent facts.** Services, stats, client stories, rights dates, coordinates,
   phone numbers and prices come from the client or from verifiable sources. If something
   is unknown, ask; don't fill it in.
2. **Not legal advice.** The site gives general information. The legal disclaimer and the
   footer note must stay. No guarantees of outcomes on visa or legal results.
3. **Confidentiality first.** Consultations are confidential and legally privileged; the
   form collects the minimum. No third-party trackers, no cookies for analytics, no
   marketing pixels. Cloudflare Web Analytics only (cookieless).
4. **GDPR.** The privacy policy (last updated November 2026) must match what the site
   actually collects and where it's sent (Cloudflare, Resend, Hostinger). Update it when
   data handling changes.
5. **Both languages, always.** No feature or copy ships in English only. Portuguese is
   European Portuguese.
6. **Client stories need consent** and use the names and details the clients approved.
7. **Inclusive language.** LGBTQIA+ (this exact form), "partner", "families", "you and
   your loved ones". Never assume gender or family shape.
8. **The services order is fixed** (front matter above) and the six lists must stay
   aligned: `serviceMeta`, `plan.lanes` and `items` (EN and PT).
9. **Contact details have one source:** `contact` in `site.js`, plus the copies in
   `public/index.html` (structured data), `public/llms.txt` and `worker/index.js`. Change
   all of them together.

## 6. SEO and AI discoverability

- Every page is prerendered to static HTML (real content without JavaScript) with title,
  description, canonical, hreflang, Open Graph and JSON-LD (`LegalService` /
  `Organization`) in `public/index.html`.
- `robots.txt` welcomes search engines and named AI crawlers; `sitemap.xml` (generated at
  build) lists 8 URLs with language alternates; `llms.txt` summarises the business for AI
  assistants; `.well-known/security.txt` exists.
- Unknown URLs return a real 404; `http`/`www` redirect to `https://nextstep.com.pt`.

## 7. Infrastructure and how a change ships

| Piece | Where |
|---|---|
| App source | `frontend/src/` |
| Worker (redirects, security headers, CSP, caching, `/api/contact`) | `frontend/worker/index.js` |
| Worker config, build command | `wrangler.jsonc` (repo root) |
| Prerender + sitemap | `frontend/scripts/prerender.mjs` |
| Launch checklist and open items | `LAUNCH.md` |
| Archived design exploration (not deployed) | `wildcards/` |
| Old, unused backend (not deployed) | `backend/` |

**Ship flow:**
1. Branch.
2. `CI=true npm run build` in `frontend/` (also prerenders).
3. Check at 390px and 1280px, EN and PT, light and dark, with zero horizontal overflow.
4. Open a pull request and squash-merge to `main`.

Cloudflare builds and deploys `main` automatically in about 3–4 minutes.

**Security headers** are set by the Worker (HSTS, CSP, nosniff, Referrer-Policy,
Permissions-Policy, X-Frame-Options). New third-party scripts, fonts, images or API
calls must be added to the CSP there, and only with a clear reason.

## 8. Known open items

- DNS (needs the owner's approval in Cloudflare):
  - Set the Hostinger DKIM CNAMEs (`hostingermail-a/b/c._domainkey`) and
    `autoconfig`/`autodiscover` to **DNS only**.
  - Delete the stale `ftp` record.
  - Turn on Always Use HTTPS and minimum TLS 1.2.
- Hostinger: Business Web Hosting ends 14 Feb 2027 and isn't needed (the site runs on
  Cloudflare). The Business Email trial converts on 14 Feb 2027.
- Update the new phone number on Google Business Profile, Facebook and email signatures.

## 9. Out of scope (don't build without a decision)

- Online payments, client portal or logins, case tracking.
- Live chat widgets, cookie banners (no cookies are used), third-party trackers.
- A blog or CMS. Content changes are code changes in `site.js`.
- Sending email through Cloudflare Email Service (needs the paid Workers plan; the
  client chose Resend's free tier).
