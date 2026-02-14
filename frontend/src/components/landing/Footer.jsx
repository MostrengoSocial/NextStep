import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { RainbowLogo } from './Logo';

export const Footer = () => {
  const { language } = useLanguage();
  const t = content[language].footer;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#0D0D0D] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <RainbowLogo size="small" />
              <span className="font-heading text-xl text-white">nextStep</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">{t.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/50 tracking-[0.15em] uppercase mb-5">{t.sections.services}</h4>
            <ul className="space-y-3">
              {t.serviceLinks.map((link, i) => (
                <li key={i}><button onClick={() => scrollToSection('services')} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">{link}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/50 tracking-[0.15em] uppercase mb-5">{t.sections.company}</h4>
            <ul className="space-y-3">
              {t.companyLinks.map((link, i) => {
                const ids = ['about', 'about', 'testimonials', 'contact'];
                return <li key={i}><button onClick={() => scrollToSection(ids[i])} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">{link}</button></li>;
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/50 tracking-[0.15em] uppercase mb-5">{t.sections.legal}</h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link, i) => (
                <li key={i}><button className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">{link}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">{t.copyright}</p>
          <p className="text-xs text-white/15 text-center sm:text-right max-w-md">{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
