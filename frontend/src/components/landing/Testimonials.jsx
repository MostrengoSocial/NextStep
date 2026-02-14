import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { Quote } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Testimonials = () => {
  const { language } = useLanguage();
  const t = content[language].testimonials;
  const [headerRef, headerVisible] = useInView();
  const [cardsRef, cardsVisible] = useInView();

  return (
    <section id="testimonials" className="relative py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#B8963E]/[0.03] blur-[100px] animate-float-slow" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-16 transition-all duration-1000 ease-out',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="modern-tag bg-white/5 text-[#B8963E] border border-white/10 mb-6 mx-auto">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-semibold text-white leading-tight max-w-3xl mx-auto mb-5 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className={cn(
            'grid md:grid-cols-3 gap-5 stagger-children',
            cardsVisible ? 'visible' : ''
          )}
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className="group relative glass-card rounded-2xl p-8 gradient-border card-glow"
            >
              {/* Quote icon */}
              <div className="w-10 h-10 rounded-xl bg-[#B8963E]/10 flex items-center justify-center mb-7">
                <Quote className="w-5 h-5 text-[#B8963E]/60" />
              </div>

              <p className="text-white/50 leading-relaxed mb-8 group-hover:text-white/65 transition-colors duration-300">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.06]">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#B8963E]/30 to-[#B8963E]/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#B8963E]">
                    {item.initials}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{item.name}</div>
                  <div className="text-xs text-white/30">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
