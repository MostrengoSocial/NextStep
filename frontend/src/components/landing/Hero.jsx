import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
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
    <section className="relative min-h-screen flex items-center bg-[#FAFAF7] overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8963E]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#B8963E]/[0.02] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Pride accent line */}
          <div className="flex gap-[2px] mb-10 opacity-80">
            <div className="h-[2px] w-6 bg-[#C44D58] rounded-full" />
            <div className="h-[2px] w-6 bg-[#D4895C] rounded-full" />
            <div className="h-[2px] w-6 bg-[#D4B96A] rounded-full" />
            <div className="h-[2px] w-6 bg-[#6A9E6C] rounded-full" />
            <div className="h-[2px] w-6 bg-[#5B7FA5] rounded-full" />
            <div className="h-[2px] w-6 bg-[#8E6A9E] rounded-full" />
          </div>

          {/* Tagline */}
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#B8963E] mb-6">
            {t.tagline}
          </span>

          {/* Heading */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1A1A1A] leading-[1.08] mb-8">
            {t.titleLine1}
            <br />
            <span className="text-[#B8963E]">{t.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-[#5C5C5C] leading-relaxed max-w-2xl mb-12">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#B8963E] hover:bg-[#A68535] text-[#FAFAF7] text-sm font-medium px-8 h-13 rounded-md transition-colors duration-300 shadow-lg shadow-[#B8963E]/20"
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('services')}
              className="border-[#D4D0C8] text-[#1A1A1A] hover:bg-[#F2F0EB] hover:border-[#B8963E]/40 text-sm font-medium px-8 h-13 rounded-md transition-all duration-300"
            >
              {t.cta2}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A8A8A] hover:text-[#B8963E] transition-colors duration-300 animate-gentle-bounce"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </section>
  );
};
