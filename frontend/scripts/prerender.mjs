// Prerender: after `craco build`, write real HTML for every page, in English and Portuguese,
// so search engines and AI crawlers that do not run JavaScript still see the content.
//   build/index.html               "/"
//   build/privacy-policy.html      "/privacy-policy"  (served at /privacy-policy, no trailing slash)
//   build/pt/index.html            "/pt/"
//   build/pt/privacy-policy.html   "/pt/privacy-policy"
//   build/404.html              served with status 404 for unknown addresses
//   build/sitemap.xml
// The browser app then renders over this HTML as usual (see src/index.js).
import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'build');
const SITE = 'https://nextstep.com.pt';
// Same rule as pathFor() in src/context/LanguageContext.jsx.
const pathFor = (path, lang) => (lang === 'pt' ? (path === '/' ? '/pt/' : `/pt${path}`) : path);

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

function page(path, lang, meta, { noindex = false } = {}) {
  const location = pathFor(path, lang);
  const url = SITE + (noindex ? '/' : location);
  let html = template;
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`prerender: ${re} not found in index.html`);
    html = html.replace(re, value);
  };
  set(/<html lang="[^"]*">/, `<html lang="${lang === 'pt' ? 'pt-PT' : 'en'}">`);
  set(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  set(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(meta.description)}"/>`);
  const alternates = noindex ? '' : ['en', 'pt'].map((l) => `<link rel="alternate" hreflang="${l === 'pt' ? 'pt-PT' : 'en'}" href="${SITE}${pathFor(path, l)}"/>`).join('')
    + `<link rel="alternate" hreflang="x-default" href="${SITE}${pathFor(path, 'en')}"/>`;
  set(/<link rel="canonical" href="[^"]*"\s*\/?>/, noindex ? '' : `<link rel="canonical" href="${url}"/>${alternates}`);
  set(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/>`);
  set(/<meta property="og:locale" content="[^"]*"\s*\/?>/, `<meta property="og:locale" content="${lang === 'pt' ? 'pt_PT' : 'en_GB'}"/>`);
  set(/<meta property="og:locale:alternate" content="[^"]*"\s*\/?>/, `<meta property="og:locale:alternate" content="${lang === 'pt' ? 'en_GB' : 'pt_PT'}"/>`);
  set(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}"/>`);
  set(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(meta.title)}"/>`);
  set(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(meta.description)}"/>`);
  set(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(meta.title)}"/>`);
  set(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(meta.description)}"/>`);
  set(/<div id="root"><\/div>/, `<div id="root">${render(noindex ? '/404-not-found' : location)}</div>`);
  return html;
}

mkdirSync(join(out, 'pt'), { recursive: true });
for (const path of PRERENDER_PATHS) {
  for (const lang of ['en', 'pt']) {
    const loc = pathFor(path, lang);
    const file = loc.endsWith('/') ? `${loc.slice(1)}index.html` : `${loc.slice(1)}.html`;
    writeFileSync(join(out, file), page(path, lang, PAGE_META[path][lang]));
    console.log(`prerendered ${loc} -> build/${file}`);
  }
}
writeFileSync(join(out, '404.html'), page('/', 'en', {
  title: 'Page not found | nextStep',
  description: 'This page does not exist. Everything about moving to Portugal with nextStep starts on the home page.',
}, { noindex: true }));
console.log('prerendered 404 -> build/404.html');

const today = new Date().toISOString().slice(0, 10);
const alt = (path) => ['en', 'pt'].map((l) => `<xhtml:link rel="alternate" hreflang="${l === 'pt' ? 'pt-PT' : 'en'}" href="${SITE}${pathFor(path, l)}"/>`).join('');
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PRERENDER_PATHS.flatMap((p) => ['en', 'pt'].map((l) => `  <url><loc>${SITE}${pathFor(p, l)}</loc>${alt(p)}<lastmod>${today}</lastmod><changefreq>${p === '/' ? 'monthly' : 'yearly'}</changefreq><priority>${p === '/' ? '1.0' : '0.3'}</priority></url>`)).join('\n')}
</urlset>
`);
console.log(`sitemap.xml: ${PRERENDER_PATHS.length * 2} URLs`);
rmSync(tmp, { recursive: true, force: true });
