import { useEffect, useState } from 'react';
import { ConfigProvider, useConfig } from './store.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import { FONTS, applyFont } from './fonts.js';
import { TopBar } from './parts/TopBars.jsx';
import { Footer } from './parts/Footers.jsx';
import { Background } from './parts/Backgrounds.jsx';
import { Deck } from './parts/Deck.jsx';
import Site from './pages/Site.jsx';
import Gallery from './pages/Gallery.jsx';

function useRoute() {
  const get = () => (window.location.hash.startsWith('#/wildcards') ? 'gallery' : 'site');
  const [r, setR] = useState(get);
  useEffect(() => {
    const on = () => {
      const n = get();
      setR((prev) => { if (prev !== n) window.scrollTo({ top: 0, behavior: 'instant' }); return n; });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}

function Shell() {
  const { cfg } = useConfig();
  const route = useRoute();

  useEffect(() => { document.documentElement.dataset.theme = cfg.__dark ? 'dark' : 'light'; }, [cfg.__dark]);
  useEffect(() => { applyFont(FONTS[cfg.font]); }, [cfg.font]);
  useEffect(() => {
    const site = route === 'site';
    document.body.classList.toggle('has-rail', site && cfg.topbar === 5);
    document.body.classList.toggle('has-dock', site && cfg.topbar === 9);
  }, [cfg.topbar, route]);

  return (
    <>
      <a className="skip" href="#top">Skip to content</a>
      <Background v={cfg.bg} />
      <div className={`wsite ${cfg.clean ? 'clean' : ''}`}>
        {route === 'gallery' ? <Gallery /> : (
          <>
            <TopBar v={cfg.topbar} />
            <Site />
            <Footer v={cfg.footer} />
          </>
        )}
      </div>
      <Deck />
    </>
  );
}

export default function App() {
  return <LanguageProvider><ConfigProvider><Shell /></ConfigProvider></LanguageProvider>;
}
