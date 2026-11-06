# nextStep · launch checklist

Live site: https://nextstep.com.pt (Cloudflare Worker `nextstep`, config `wrangler.jsonc`).
Automated checks: `.claude/website-check.json` (website-check skill).

## Done in code
- [x] One address: http and www redirect to https://nextstep.com.pt (path and query kept)
- [x] Missing pages answer 404 with a proper "page not found" page
- [x] Every page prerendered: real HTML, its own title, description, canonical and one h1 for search engines and AI crawlers
- [x] robots.txt (AI crawlers welcome), sitemap.xml, llms.txt, structured data (LegalService), security.txt
- [x] Share image 1200x630 (og-image.jpg) and phone home-screen icon
- [x] Security headers: HSTS, CSP, nosniff, referrer, permissions, no framing
- [x] Removed the Emergent template scripts and its PostHog analytics (another account's key, no consent)
- [x] Build manifest and source maps no longer public
- [x] Phone layout: step labels, services timeline, maps open on Portugal/Faro, contact details, tap targets

## The accounts (Cloudflare, Hostinger, Resend, Google/Bing)
- [ ] Resend: add secret RESEND_API_KEY to the Worker; set SENDER_EMAIL to a verified address on nextstep.com.pt; send one real test from the contact form
- [ ] Resend: add its SPF include and DKIM records for nextstep.com.pt in Cloudflare DNS (Resend shows them when you verify the domain)
- [ ] Cloudflare DNS: ftp and autoconfig still resolve (old Hostinger records?): delete if unused
- [ ] Cloudflare: SSL/TLS > Edge Certificates > "Always Use HTTPS" on (belt and braces with the Worker redirect)
- [ ] Email (Hostinger): DMARC is p=none with no reports: add rua=mailto:... now, move to p=quarantine after 2-4 weeks of clean reports
- [ ] Email: SPF ends in ~all: switch to -all once Resend is included
- [ ] Google Search Console and Bing Webmaster Tools: verify nextstep.com.pt, submit https://nextstep.com.pt/sitemap.xml
- [ ] Domain (.pt registrar): confirm renewal date and auto-renew (no public lookup for .pt)

## The client (nextStep)
- [ ] Confirm the facts: law timeline (2004/2010/2016/2018), figures 300+/20+/99%/24-7, journey milestones, swimlane timings, example "boarding" routes
- [ ] Privacy policy is dated February 2025 and mentions cookies: review it; the site now sets no tracking cookies (only language and theme are saved in the browser)
- [ ] Decide on analytics: none today. If wanted, use a cookieless option (e.g. Cloudflare Web Analytics) or add a consent banner
- [ ] Faro photo credit (Hugo Ferreira, CC BY-SA 4.0) must stay visible, or replace the photo with one nextStep owns

## Later
- [ ] Separate English and Portuguese addresses (e.g. /pt/) so search engines index both languages; today only the English version is prerendered
