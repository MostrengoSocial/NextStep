import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content, heroImages } from '../../data/mock';
import { Button } from '../ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const SLIDE_DURATION = 6000; // 6 seconds per slide

export const Hero = () => {
  const { language } = useLanguage();
  const t = content[language].hero;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index) => {
    if (index === current || isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [current, isTransitioning]);

  const nextSlide = useCallback(() => {
    const next = (current + 1) % heroImages.length;
    goToSlide(next);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Slideshow background images */}
      {heroImages.map((img, i) => (
        <div
          key={i}
          className={cn(
            'absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-in-out',
            i === current
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          )}
          style={{
            backgroundImage: `url(${img.url})`,
            zIndex: i === current ? 1 : 0,
          }}
          aria-hidden={i !== current}
        />
      ))}

      {/* Ken Burns subtle zoom on active slide */}
      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>

      {/* Dark overlay — consistent across all slides */}
      <div className="absolute inset-0 z-[2] hero-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Heading */}
          <div>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight">
              <span className="block hero-reveal hero-reveal-1">{t.titleLine1}</span>
              <span className="block italic hero-reveal hero-reveal-2">{t.titleLine2}</span>
            </h1>
          </div>

          {/* Right — Subtitle + CTAs */}
          <div>
            <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-10 hero-reveal hero-reveal-3">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 hero-reveal hero-reveal-4">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-white hover:bg-white/90 text-[#1A1A1A] text-sm font-semibold px-8 h-13 rounded-full transition-all duration-300 shadow-xl shadow-black/10 hover:scale-[1.03]"
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

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroImages.map((img, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group relative flex items-center justify-center"
            aria-label={`Go to slide ${i + 1}: ${img.alt}`}
          >
            <div
              className={cn(
                'rounded-full transition-all duration-500',
                i === current
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 group-hover:bg-white/70'
              )}
            />
            {/* Progress bar animation for active dot */}
            {i === current && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/50 rounded-full"
                  style={{
                    animation: `slide-progress ${SLIDE_DURATION}ms linear`,
                  }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes slide-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white transition-colors duration-300 animate-gentle-bounce"
      >
        <ChevronDown className="h-6 w-6" />
      </button>
    </section>
  );
};
