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
- [ ] Cloudflare DNS: Hostinger DKIM records (hostingermail-a/b/c._domainkey) are proxied, so receivers find no key and mail goes out unsigned: switch the three to DNS only
- [ ] Cloudflare DNS: autoconfig and autodiscover are Hostinger's mail set-up records: keep them, but switch to DNS only
- [ ] Cloudflare DNS: ftp points to 187.77.31.227 (old VPS?): delete if that server is no longer used
- [ ] Cloudflare: SSL/TLS > Edge Certificates > Minimum TLS Version 1.2 (SSL Labs grade is B with 1.0 allowed)
- [ ] Cloudflare: SSL/TLS > Edge Certificates > "Always Use HTTPS" on (belt and braces with the Worker redirect)
- [ ] Email (Hostinger): DMARC is p=none with no reports: add rua=mailto:... now, move to p=quarantine after 2-4 weeks of clean reports
- [ ] Email: SPF ends in ~all: switch to -all once Resend is included
- [ ] Google Search Console and Bing Webmaster Tools: verify nextstep.com.pt, submit https://nextstep.com.pt/sitemap.xml
- [x] Domain (.pt registrar): renewal taken care of (confirmed by the client)

## The client (nextStep)
- [x] Facts confirmed by the client: law timeline, figures, journey milestones, swimlane timings, example routes
- [x] Privacy policy confirmed correct by the client; date updated to November 2026
- [x] Analytics: Cloudflare Web Analytics (cookieless), allowed in the CSP
- [ ] Faro photo credit (Hugo Ferreira, CC BY-SA 4.0) must stay visible, or replace the photo with one nextStep owns

## Later
- [x] Portuguese pages at /pt/ (prerendered, hreflang, in the sitemap)
