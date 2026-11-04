// Builds dist/ then inlines JS, CSS and every image into one self-contained preview HTML.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';

const out = process.argv[2] || 'crmg-preview.html';
const dist = 'dist';
let html = readFileSync(join(dist, 'index.html'), 'utf8');
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const imgs = {};
for (const f of readdirSync(join(dist, 'img'))) {
  imgs[f] = `data:${mime[extname(f)]};base64,${readFileSync(join(dist, 'img', f)).toString('base64')}`;
}
html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+)"><\/script>/, (_, p) =>
  `<script>window.__IMG=${JSON.stringify(imgs)};</script>\n<script type="module">${readFileSync(join(dist, p), 'utf8').replace(/<\/script/g, '<\\/script')}</script>`);
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+)">/, (_, p) => `<style>${readFileSync(join(dist, p), 'utf8')}</style>`);
html = html.replace('href="./img/crmg-c.svg"', `href="${imgs['crmg-c.svg']}"`);
writeFileSync(out, html);
console.log(out, (html.length / 1e6).toFixed(2) + ' MB');
