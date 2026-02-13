import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { Separator } from '../ui/separator';

export const Footer = () => {
  const { language } = useLanguage();
  const t = content[language].footer;
  const nav = content[language].nav;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-heading text-2xl font-semibold text-white mb-4">
              Next Step
            </div>
            {/* Pride accent */}
            <div className="flex gap-[2px] mb-5">
              <div className="h-[2px] w-4 bg-[#C44D58] rounded-full" />
              <div className="h-[2px] w-4 bg-[#D4895C] rounded-full" />
              <div className="h-[2px] w-4 bg-[#D4B96A] rounded-full" />
              <div className="h-[2px] w-4 bg-[#6A9E6C] rounded-full" />
              <div className="h-[2px] w-4 bg-[#5B7FA5] rounded-full" />
              <div className="h-[2px] w-4 bg-[#8E6A9E] rounded-full" />
            </div>
            <p className="text-sm text-[#8A8A8A] leading-relaxed max-w-xs">
              {t.description}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[#B8963E] tracking-wide uppercase mb-5">
              {t.sections.services}
            </h4>
            <ul className="space-y-3">
              {t.serviceLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-sm text-[#8A8A8A] hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[#B8963E] tracking-wide uppercase mb-5">
              {t.sections.company}
            </h4>
            <ul className="space-y-3">
              {t.companyLinks.map((link, i) => {
                const sectionIds = ['about', 'about', 'testimonials', 'contact'];
                return (
                  <li key={i}>
                    <button
                      onClick={() => scrollToSection(sectionIds[i])}
                      className="text-sm text-[#8A8A8A] hover:text-white transition-colors duration-200"
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
            <h4 className="text-sm font-semibold text-[#B8963E] tracking-wide uppercase mb-5">
              {t.sections.legal}
            </h4>
            <ul className="space-y-3">
              {t.legalLinks.map((link, i) => (
                <li key={i}>
                  <button className="text-sm text-[#8A8A8A] hover:text-white transition-colors duration-200">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-[#2C2C2E] mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5C5C5C]">{t.copyright}</p>
          <p className="text-xs text-[#5C5C5C] text-center sm:text-right max-w-md">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
