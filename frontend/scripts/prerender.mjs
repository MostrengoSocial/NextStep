// Prerender: after `craco build`, write real HTML for every page so search engines and
// AI crawlers that do not run JavaScript still see the content, titles and descriptions.
//   build/index.html            "/"
//   build/privacy-policy.html   "/privacy-policy"  (served at /privacy-policy, no trailing slash)
//   build/404.html              served with status 404 for unknown addresses
//   build/sitemap.xml
// The browser app then renders over this HTML as usual (see src/index.js).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'build');
const SITE = 'https://nextstep.com.pt';

const tmp = mkdtempSync(join(tmpdir(), 'nextstep-prerender-'));
const bundle = join(tmp, 'render.cjs');
await build({
  entryPoints: [join(root, 'scripts/prerender-entry.jsx')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: bundle,
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.css': 'empty', '.svg': 'empty' },
  alias: { '@': join(root, 'src') },
  define: { 'process.env.PUBLIC_URL': '""', 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
const { render } = createRequire(import.meta.url)(bundle);
const metaOut = join(tmp, 'meta.cjs');
await build({ entryPoints: [join(root, 'src/data/pageMeta.js')], bundle: true, platform: 'node', format: 'cjs', outfile: metaOut, logLevel: 'warning' });
const { PAGE_META, PRERENDER_PATHS } = createRequire(import.meta.url)(metaOut);

const template = readFileSync(join(out, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(path, meta, { noindex = false } = {}) {
  const url = SITE + (path === '/404' ? '/' : path);
  let html = template;
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`prerender: ${re} not found in index.html`);
    html = html.replace(re, value);
  };
  set(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  set(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(meta.description)}"/>`);
  set(/<link rel="canonical" href="[^"]*"\s*\/?>/, noindex ? '' : `<link rel="canonical" href="${url}"/>`);
  set(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/>`);
  set(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`);
  set(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(meta.title)}"/>`);
  set(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(meta.description)}"/>`);
  set(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(meta.title)}"/>`);
  set(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(meta.description)}"/>`);
  set(/<div id="root"><\/div>/, `<div id="root">${render(path)}</div>`);
  return html;
}

for (const path of PRERENDER_PATHS) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`;
  writeFileSync(join(out, file), page(path, PAGE_META[path].en));
  console.log(`prerendered ${path} -> build/${file}`);
}
writeFileSync(join(out, '404.html'), page('/404', {
  title: 'Page not found | nextStep',
  description: 'This page does not exist. Everything about moving to Portugal with nextStep starts on the home page.',
}, { noindex: true }));
console.log('prerendered 404 -> build/404.html');

const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDER_PATHS.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/' ? 'monthly' : 'yearly'}</changefreq><priority>${p === '/' ? '1.0' : '0.3'}</priority></url>`).join('\n')}
</urlset>
`);
console.log(`sitemap.xml: ${PRERENDER_PATHS.length} URLs`);
rmSync(tmp, { recursive: true, force: true });
