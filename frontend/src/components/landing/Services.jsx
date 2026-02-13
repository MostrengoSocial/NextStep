import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { Scale, Handshake, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const iconMap = {
  Scale,
  Handshake,
  TrendingUp,
  Shield,
};

export const Services = () => {
  const { language } = useLanguage();
  const t = content[language].services;
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <section id="services" className="py-28 lg:py-36 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'mb-16 transition-all duration-1000 ease-out',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#B8963E] mb-5">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight max-w-3xl mb-5">
            {t.title}
          </h2>
          <p className="text-lg text-[#5C5C5C] max-w-2xl">{t.subtitle}</p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className={cn(
            'grid md:grid-cols-2 gap-6 transition-all duration-1000 ease-out delay-200',
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {t.items.map((item, i) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div
                key={i}
                className="group relative p-8 lg:p-10 bg-white rounded-xl border border-[#E8E5DE] hover:border-[#B8963E]/40 hover:shadow-xl hover:shadow-[#B8963E]/5 transition-all duration-500 cursor-default"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#B8963E] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t-xl" />
                <div className="w-12 h-12 rounded-lg bg-[#B8963E]/10 flex items-center justify-center mb-6 group-hover:bg-[#B8963E]/15 transition-colors duration-300">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-[#B8963E]" />
                  )}
                </div>
                <h3 className="font-heading text-xl lg:text-2xl font-semibold text-[#1A1A1A] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#5C5C5C] leading-relaxed mb-6">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-[#B8963E] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>{language === 'en' ? 'Learn more' : 'Saber mais'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
