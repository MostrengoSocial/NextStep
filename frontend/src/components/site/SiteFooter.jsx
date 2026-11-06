import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contact } from '../../data/site';
import { useContent } from './shared';
import { useLanguage, pathFor, homeFor } from '../../context/LanguageContext';

/* Footer · One last question: a single invitation to book, then one quiet
   line with the contact details and legal links. */
export const SiteFooter = () => {
  const c = useContent();
  const t = c.footer;
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const base = pathname === homeFor(language) ? '' : homeFor(language);
  const legalPaths = ['/privacy-policy', '/terms-of-service', '/legal-disclaimer'];

  return (
    <footer className="foot-ask">
      <div className="wrap">
        <h2 className="foot-ask-q">{t.askA} <span className="serif">{t.askWord}</span></h2>
        <a className="btn btn-primary foot-ask-cta" href={`${base}#contact`}>
          <span>{c.nav.cta}</span><span className="arr" aria-hidden="true">↗</span>
        </a>
        <p className="foot-ask-line mono">
          <span>Faro</span>
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          {legalPaths.map((p, i) => <Link key={p} to={pathFor(p, language)}>{t.legalLinks[i]}</Link>)}
          <span>© {new Date().getFullYear()} nextStep</span>
        </p>
        <p className="foot-ask-disc">{t.disclaimer}</p>
      </div>
      <div className="foot-spectrum" aria-hidden="true" />
    </footer>
  );
};
