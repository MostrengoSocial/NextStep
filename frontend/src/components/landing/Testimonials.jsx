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
  const colors = ['#E44D60', '#E8893C', '#3BAF6A'];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div
          ref={headerRef}
          className={cn(
            'mb-16 anim-fade-up',
            headerVisible ? 'visible' : ''
          )}
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] italic mb-5">
            {t.title}
          </h2>
          <p className="text-lg text-[#5C5C5C] max-w-2xl">{t.subtitle}</p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6"
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className={cn(
                'bg-white rounded-2xl p-8 shadow-sm card-lift relative overflow-hidden anim-fade-up',
                cardsVisible ? 'visible' : ''
              )}
              style={{ transitionDelay: cardsVisible ? `${i * 0.15}s` : '0s' }}
            >
              {/* Color accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: colors[i] }} />

              <Quote className="w-8 h-8 mb-6" style={{ color: `${colors[i]}40` }} />

              <p className="text-[#3A3A3A] leading-relaxed mb-8">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[#F0EDE8]">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ background: colors[i] }}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-medium text-[#1A1A1A] text-sm">{item.name}</div>
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
