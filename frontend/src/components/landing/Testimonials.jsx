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
    <section id="testimonials" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'text-center mb-16 transition-all duration-1000 ease-out',
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#B8963E] mb-5">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight max-w-3xl mx-auto mb-5">
            {t.title}
          </h2>
          <p className="text-lg text-[#5C5C5C] max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Testimonial Cards */}
        <div
          ref={cardsRef}
          className={cn(
            'grid md:grid-cols-3 gap-6 transition-all duration-1000 ease-out delay-200',
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-xl border border-[#E8E5DE] bg-[#FAFAF7] hover:border-[#B8963E]/30 hover:shadow-lg hover:shadow-[#B8963E]/5 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-[#B8963E]/30 mb-6 group-hover:text-[#B8963E]/50 transition-colors duration-300" />
              <p className="text-[#3A3A3A] leading-relaxed mb-8 italic">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#B8963E]">
                    {item.initials}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-[#1A1A1A] text-sm">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#8A8A8A]">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
