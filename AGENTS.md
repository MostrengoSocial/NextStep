# Agent instructions for nextStep

Before any change, read:

- [PRODUCT.md](PRODUCT.md): what the site does, who it's for, business and content rules.
- [DESIGN.md](DESIGN.md): design tokens (YAML front matter) and the visual rules.

Non-negotiables (details in those files):
- Use the CSS custom properties in `frontend/src/styles/site.css`; never hardcode colours.
- Every string in English and European Portuguese (`frontend/src/data/site.js`).
- No horizontal scrolling at any width; graphics get a phone layout under 640px.
- Never invent facts (stats, stories, prices, contact details).
- Before opening a PR: `CI=true npm run build` in `frontend/` and check at 390px and 1280px.
