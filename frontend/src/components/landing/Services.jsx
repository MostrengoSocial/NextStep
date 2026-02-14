import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { Scale, Handshake, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const iconMap = { Scale, Handshake, TrendingUp, Shield };

export const Services = () => {
  const { language } = useLanguage();
  const t = content[language].services;
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <section id="services" className="relative py-28 lg:py-36 bg-[#0D0D0D] overflow-hidden noise-overlay">
      {/* Decorative orbs */}
      <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#B8963E]/[0.04] blur-[120px] animate-float-reverse" />

      {/* Top section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'mb-16 transition-all duration-1000 ease-out',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="accent-line mb-6" />
          <span className="modern-tag bg-white/5 text-[#B8963E] border border-white/10 mb-6">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-semibold text-white leading-tight max-w-3xl mb-5 tracking-tight">
            {t.title}
          </h2>
          <p className="text-lg text-white/40 max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className={cn(
            'grid md:grid-cols-2 gap-5 stagger-children',
            gridVisible ? 'visible' : ''
          )}
        >
          {t.items.map((item, i) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={i}
                className="group relative glass-card rounded-2xl p-8 lg:p-10 gradient-border card-glow cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#B8963E]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-[#B8963E]/10 flex items-center justify-center mb-7 group-hover:bg-[#B8963E]/15 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-7 h-7 text-[#B8963E]" strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl font-semibold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/35 leading-relaxed mb-7">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium text-[#B8963E] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span>{language === 'en' ? 'Learn more' : 'Saber mais'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
