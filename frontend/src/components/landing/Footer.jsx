import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { LogoIcon1, LogoIcon2, LogoIcon3, LogoIcon4, LogoIcon5 } from './LogoShowcase';

const logoMap = { 1: LogoIcon1, 2: LogoIcon2, 3: LogoIcon3, 4: LogoIcon4, 5: LogoIcon5 };

export const Footer = ({ selectedLogo = 1 }) => {
  const { language } = useLanguage();
  const t = content[language].footer;
  const LogoIcon = logoMap[selectedLogo] || LogoIcon1;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative bg-[#060606] text-white overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8963E]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="text-white mb-5" />
            {/* Pride accent */}
            <div className="flex gap-[2px] mb-5">
              <div className="h-[2px] w-5 bg-[#C44D58]/60 rounded-full" />
              <div className="h-[2px] w-5 bg-[#D4895C]/60 rounded-full" />
              <div className="h-[2px] w-5 bg-[#D4B96A]/60 rounded-full" />
              <div className="h-[2px] w-5 bg-[#6A9E6C]/60 rounded-full" />
              <div className="h-[2px] w-5 bg-[#5B7FA5]/60 rounded-full" />
              <div className="h-[2px] w-5 bg-[#8E6A9E]/60 rounded-full" />
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-xs">
              {t.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-[#B8963E] tracking-[0.15em] uppercase mb-6">
              {t.sections.services}
            </h4>
            <ul className="space-y-3">
              {t.serviceLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-[#B8963E] tracking-[0.15em] uppercase mb-6">
              {t.sections.company}
            </h4>
            <ul className="space-y-3">
              {t.companyLinks.map((link, i) => {
                const sectionIds = ['about', 'about', 'testimonials', 'contact'];
                return (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(sectionIds[i])}
                      className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-[#B8963E] tracking-[0.15em] uppercase mb-6">
              {t.sections.legal}
            </h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link, i) => (
                <li key={i}>
                  <button className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">{t.copyright}</p>
          <p className="text-xs text-white/15 text-center sm:text-right max-w-md">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
