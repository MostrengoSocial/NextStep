import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronLogo, useContent } from './shared';

const THEME_KEY = 'ns-theme';

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const useTheme = () => {
  const [explicit, setExplicit] = useState(() => {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  });
  const [systemDark, setSystemDark] = useState(prefersDark);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (explicit) root.setAttribute('data-theme', explicit);
    else root.removeAttribute('data-theme');
  }, [explicit]);

  const isDark = explicit ? explicit === 'dark' : systemDark;
  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    setExplicit(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage unavailable */ }
  };
  return [isDark, toggle];
};

export const SiteHeader = () => {
  const t = useContent().nav;
  const { language, toggleLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [isDark, toggleTheme] = useTheme();
  const base = pathname === '/' ? '' : '/';

  const links = [
    ['routes', t.routes], ['about', t.about], ['rights', t.rights], ['services', t.services], ['stories', t.stories],
  ];

  return (
    <header className="site-head">
      <div className="wrap head-row">
        <Link className="logo" to="/" aria-label="nextStep home">
          <ChevronLogo />
          nextStep<small>Faro · PT</small>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map(([id, label]) => <a key={id} href={`${base}#${id}`}>{label}</a>)}
        </nav>
        <div className="head-tools">
          <button className="pill" type="button" onClick={toggleLanguage} aria-label={t.switchLang}>
            {language === 'en' ? 'PT' : 'EN'}
          </button>
          <button className="pill" type="button" onClick={toggleTheme} aria-label={t.theme}>
            <span className="dot" aria-hidden="true" />
            <span>{isDark ? t.dark : t.light}</span>
          </button>
          <a className="btn btn-primary head-cta" href={`${base}#contact`}>
            <span>{t.cta}</span><span className="arr" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
};
