import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, pathFor, homeFor } from '../../context/LanguageContext';
import { ChevronLogo, useContent } from './shared';

const THEME_KEY = 'ns-theme';

const useTheme = () => {
  const [explicit, setExplicit] = useState(() => {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', explicit === 'dark' ? 'dark' : 'light');
  }, [explicit]);

  const isDark = explicit === 'dark';
  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    setExplicit(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
  };
  return [isDark, toggle];
};

/* Live time in Faro and in the visitor's own time zone. */
const fmt = (tz) => {
  try { return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date()); }
  catch (e) { return '--:--'; }
};
const useClocks = () => {
  const [t, setT] = useState(() => ({ faro: fmt('Europe/Lisbon'), you: fmt(undefined) }));
  useEffect(() => {
    const id = setInterval(() => setT({ faro: fmt('Europe/Lisbon'), you: fmt(undefined) }), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
};

/* How far down the page the visitor has scrolled, 0 to 1. */
const useScrollProgress = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  return p;
};

export const SiteHeader = () => {
  const t = useContent().nav;
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [isDark, toggleTheme] = useTheme();
  const clocks = useClocks();
  const progress = useScrollProgress();
  const [menu, setMenu] = useState(false);
  const home = homeFor(language);
  const base = pathname === home ? '' : home;
  const other = language === 'en' ? 'pt' : 'en';

  const links = [
    ['routes', t.routes], ['about', t.about], ['rights', t.rights], ['services', t.services], ['stories', t.stories],
  ];

  return (
    <header className="site-head">
      <div className="wrap head-row">
        <Link className="logo" to={home} aria-label="nextStep home">
          <ChevronLogo />
          nextStep
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map(([id, label]) => <a key={id} href={`${base}#${id}`}>{label}</a>)}
        </nav>
        <div className="clocks mono" aria-label={`Faro ${clocks.faro}, ${t.you} ${clocks.you}`}>
          <span>Faro <b>{clocks.faro}</b></span>
          <i className="clocks-sep" aria-hidden="true" />
          <span className="clocks-you">{t.you} <b>{clocks.you}</b></span>
        </div>
        <div className="head-tools">
          <Link
            className="pill"
            to={pathFor(pathname, other)}
            hrefLang={other === 'pt' ? 'pt-PT' : 'en'}
            lang={other === 'pt' ? 'pt-PT' : 'en'}
            aria-label={t.switchLang}
            onClick={(e) => { e.preventDefault(); setLanguage(other); }}
          >
            {other.toUpperCase()}
          </Link>
          <button className="pill" type="button" onClick={toggleTheme} aria-label={t.theme}>
            <span className="dot" aria-hidden="true" />
            <span>{isDark ? t.dark : t.light}</span>
          </button>
          <a className="btn btn-primary head-cta" href={`${base}#contact`}>
            <span>{t.cta}</span><span className="arr" aria-hidden="true">↗</span>
          </a>
          <button type="button" className={`burger${menu ? ' open' : ''}`} onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-controls="mobile-menu" aria-label="Menu"><i /><i /></button>
        </div>
      </div>
      <div className="progress" aria-hidden="true"><i style={{ width: `${(progress * 100).toFixed(1)}%` }} /></div>
      <nav id="mobile-menu" className={`mobile-menu${menu ? ' open' : ''}`} aria-label="Main" hidden={!menu}>
        <div className="wrap">
          {links.map(([id, label], i) => (
            <a key={id} href={`${base}#${id}`} onClick={() => setMenu(false)}><span className="mono">0{i + 1}</span>{label}</a>
          ))}
          <a className="btn btn-primary" href={`${base}#contact`} onClick={() => setMenu(false)}><span>{t.cta}</span><span className="arr" aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  );
};
