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
    <section className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden noise-overlay">
      {/* Animated gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#B8963E]/[0.06] blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-[#B8963E]/[0.04] blur-[100px] animate-float-reverse" />
      <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#D4B262]/[0.03] blur-[80px] animate-pulse-glow" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Pride accent line — muted, sophisticated */}
          <div className="flex gap-[3px] mb-10">
            <div className="h-[2px] w-8 bg-[#C44D58]/70 rounded-full" />
            <div className="h-[2px] w-8 bg-[#D4895C]/70 rounded-full" />
            <div className="h-[2px] w-8 bg-[#D4B96A]/70 rounded-full" />
            <div className="h-[2px] w-8 bg-[#6A9E6C]/70 rounded-full" />
            <div className="h-[2px] w-8 bg-[#5B7FA5]/70 rounded-full" />
            <div className="h-[2px] w-8 bg-[#8E6A9E]/70 rounded-full" />
          </div>

          {/* Tagline badge */}
          <div className="modern-tag bg-[#B8963E]/10 text-[#B8963E] border border-[#B8963E]/20 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8963E] animate-pulse-glow" />
            {t.tagline}
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold text-white leading-[1.05] mb-8 tracking-tight">
            {t.titleLine1}
            <br />
            <span className="text-gradient-gold">{t.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/45 leading-relaxed max-w-2xl mb-14">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#B8963E] hover:bg-[#C9A74F] text-[#0A0A0A] text-sm font-semibold px-8 h-13 rounded-full transition-all duration-300 shadow-xl shadow-[#B8963E]/20 hover:shadow-[#B8963E]/30 hover:scale-[1.02]"
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('services')}
              className="border-white/15 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/25 text-sm font-medium px-8 h-13 rounded-full transition-all duration-300"
            >
              {t.cta2}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25 hover:text-[#B8963E] transition-colors duration-300 animate-gentle-bounce"
      >
        <ChevronDown className="h-5 w-5" />
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
};
