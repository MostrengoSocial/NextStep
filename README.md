# nextStep

Website for [nextStep](https://nextstep.com.pt): legal guidance and relocation support for
LGBTQIA+ people and families moving to Portugal. English and Portuguese.

- **[PRODUCT.md](PRODUCT.md)**: what the site does, audience, features, business rules.
- **[DESIGN.md](DESIGN.md)**: design tokens and visual rules.
- **[AGENTS.md](AGENTS.md)**: instructions for coding agents.
- **[LAUNCH.md](LAUNCH.md)**: launch checklist and open items.

## Develop

```bash
cd frontend
npm ci
npm start                 # dev server
CI=true npm run build     # production build + prerendered pages + sitemap
```

Deployed as the Cloudflare Worker `nextstep` (see `wrangler.jsonc`); `main` deploys
automatically.
