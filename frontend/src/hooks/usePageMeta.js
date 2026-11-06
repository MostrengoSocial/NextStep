import { useEffect } from 'react';
import { pathFor } from '../context/LanguageContext';

export const SITE_URL = 'https://nextstep.com.pt';

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta');
    const m = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
    if (m) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setAlternate(hreflang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/* Sets the page's title, description, canonical address, language alternates and share
   tags. `path` is the English address; the Portuguese page lives at /pt + path.
   The build prerenders each page, so these end up in the static HTML too. */
export function usePageMeta({ title, description, path = '/', lang = 'en', noindex = false }) {
  useEffect(() => {
    const url = SITE_URL + pathFor(path, lang);
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:locale"]', 'content', lang === 'pt' ? 'pt_PT' : 'en_GB');
    setMeta('meta[property="og:locale:alternate"]', 'content', lang === 'pt' ? 'en_GB' : 'pt_PT');
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    if (!noindex) {
      setAlternate('en', SITE_URL + pathFor(path, 'en'));
      setAlternate('pt-PT', SITE_URL + pathFor(path, 'pt'));
      setAlternate('x-default', SITE_URL + pathFor(path, 'en'));
    }
  }, [title, description, path, lang, noindex]);
}
