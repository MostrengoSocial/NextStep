import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext(undefined);
const STORAGE_KEY = 'ns-lang';

const initialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'pt') return saved;
  } catch (e) { /* storage unavailable */ }
  if (typeof navigator !== 'undefined' && /^pt\b/i.test(navigator.language || '')) return 'pt';
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
    try { localStorage.setItem(STORAGE_KEY, language); } catch (e) { /* storage unavailable */ }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'pt' : 'en'));
  };

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
