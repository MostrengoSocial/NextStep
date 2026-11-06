import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/* The language comes from the address: /pt/... is Portuguese, everything else English.
   Each language therefore has its own pages for search engines (see hreflang in
   usePageMeta and the prerender step). The visitor's last choice is remembered and
   used once, when they arrive on an English page with Portuguese saved. */
const LanguageContext = createContext(undefined);
const STORAGE_KEY = 'ns-lang';

export const isPtPath = (pathname) => pathname === '/pt' || pathname.startsWith('/pt/');

// The same page in the other language: "/privacy-policy" <-> "/pt/privacy-policy", "/" <-> "/pt/".
export const pathFor = (pathname, lang) => {
  const base = isPtPath(pathname) ? pathname.replace(/^\/pt/, '') || '/' : pathname;
  return lang === 'pt' ? (base === '/' ? '/pt/' : `/pt${base}`) : base;
};

// Address of the home page in a language, used to build "#section" links.
export const homeFor = (lang) => (lang === 'pt' ? '/pt/' : '/');

export const LanguageProvider = ({ children }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const language = isPtPath(pathname) ? 'pt' : 'en';

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
  }, [language]);

  // A visitor who chose Portuguese before and lands on an English page goes to the Portuguese one.
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    if (saved === 'pt' && language === 'en') navigate(pathFor(pathname, 'pt') + hash, { replace: true });
  // only on first load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang) => {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
    if (lang !== language) navigate(pathFor(pathname, lang) + hash);
  };
  const toggleLanguage = () => setLanguage(language === 'en' ? 'pt' : 'en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
