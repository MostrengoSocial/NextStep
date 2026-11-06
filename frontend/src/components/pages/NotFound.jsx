import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { usePageMeta } from '../../hooks/usePageMeta';

const copy = {
  en: { title: 'Page not found | nextStep', h1: 'This page does not exist.', p: 'The link may be old or mistyped. Everything about moving to Portugal with nextStep starts on the home page.', home: 'Go to the home page', contact: 'Contact us' },
  pt: { title: 'Página não encontrada | nextStep', h1: 'Esta página não existe.', p: 'A ligação pode estar desatualizada ou mal escrita. Tudo sobre a mudança para Portugal com a nextStep começa na página inicial.', home: 'Ir para a página inicial', contact: 'Contacte-nos' },
};

export const NotFound = () => {
  const { language } = useLanguage();
  const t = copy[language];
  usePageMeta({ title: t.title, description: t.p, path: '/404', noindex: true });
  return (
    <div className="legal not-found">
      <div className="wrap">
        <p className="updated mono">404</p>
        <h1>{t.h1}</h1>
        <p>{t.p}</p>
        <p className="not-found-links">
          <Link className="btn btn-primary" to="/"><span>{t.home}</span><span className="arr" aria-hidden="true">→</span></Link>
          <Link className="btn btn-ghost" to="/#contact"><span>{t.contact}</span></Link>
        </p>
      </div>
    </div>
  );
};
