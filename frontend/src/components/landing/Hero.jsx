import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content, heroImage } from '../../data/mock';
import { Button } from '../ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { language } = useLanguage();
  const t = content[language].hero;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Heading */}
          <div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
              {t.titleLine1}
              <br />
              <span className="italic">{t.titleLine2}</span>
            </h1>
          </div>

          {/* Right — Subtitle + CTAs */}
          <div>
            <p className="text-lg lg:text-xl text-white/75 leading-relaxed mb-10">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-white hover:bg-white/90 text-[#1A1A1A] text-sm font-semibold px-8 h-13 rounded-full transition-all duration-300 shadow-xl shadow-black/10"
              >
                {t.cta1}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('about')}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-sm font-medium px-8 h-13 rounded-full transition-all duration-300"
              >
                {t.cta2}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection('services')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white transition-colors duration-300 animate-gentle-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};
