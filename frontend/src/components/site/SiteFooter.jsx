import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLogo, useContent } from './shared';

export const SiteFooter = () => {
  const c = useContent();
  const t = c.footer;
  const { pathname } = useLocation();
  const base = pathname === '/' ? '' : '/';
  const legalPaths = ['/privacy-policy', '/terms-of-service', '/legal-disclaimer'];

  return (
    <>
      <footer className="foot">
        <div className="wrap">
          <p className="foot-word" aria-hidden="true"><ChevronLogo />nextStep</p>
          <div className="foot-grid">
            <div>
              <p>{t.desc}</p>
              <p className="mono" style={{ marginTop: 20 }}>Faro · 37.0194° N · 7.9304° W</p>
            </div>
            <div>
              <h4>{t.services}</h4>
              <ul>{c.services.items.map((s) => <li key={s.title}><a href={`${base}#services`}>{s.title}</a></li>)}</ul>
            </div>
            <div>
              <h4>{t.company}</h4>
              <ul>
                <li><a href={`${base}#about`}>{c.nav.about}</a></li>
                <li><a href={`${base}#stories`}>{c.nav.stories}</a></li>
                <li><a href={`${base}#contact`}>{c.nav.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4>{t.legal}</h4>
              <ul>{legalPaths.map((p, i) => <li key={p}><Link to={p}>{t.legalLinks[i]}</Link></li>)}</ul>
            </div>
          </div>
          <div className="foot-legal">
            <p>{t.disclaimer}</p>
            <span className="mono">© {new Date().getFullYear()} nextStep</span>
          </div>
        </div>
      </footer>
      <div className="foot-spectrum" aria-hidden="true" />
    </>
  );
};
