import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

/* Render the decorated heading based on decoration type */
const ServiceHeading = ({ item }) => {
  switch (item.decoration) {
    case 'red-wavy':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} <span className="accent-underline-red">{item.highlight}</span>
        </h3>
      );
    case 'orange-line':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          <span className="accent-underline-orange">{item.title.replace(',', '')}</span>, {item.highlight}
        </h3>
      );
    case 'yellow-line':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} <span className="accent-underline-yellow">{item.highlight}</span>
        </h3>
      );
    case 'green-circle':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} {item.highlight} <span className="accent-circle-green">{item.highlightAccent}</span>
        </h3>
      );
    case 'blue-wavy':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} <span className="accent-underline-blue">{item.highlight}</span>
        </h3>
      );
    case 'magenta-highlight':
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} <span className="accent-highlight-magenta">{item.highlight}</span>
        </h3>
      );
    default:
      return (
        <h3 className="font-heading text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug">
          {item.title} {item.highlight}
        </h3>
      );
  }
};

export const Services = () => {
  const { language } = useLanguage();
  const t = content[language].services;
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView();

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            'mb-16 anim-fade-up',
            headerVisible ? 'visible' : ''
          )}
        >
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] italic">
            {t.tagline}
          </h2>
        </div>

        {/* 2-column grid with stagger */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 gap-x-16 gap-y-16"
        >
          {t.items.map((item, i) => (
            <div
              key={i}
              className={cn(
                'group anim-fade-up',
                gridVisible ? 'visible' : ''
              )}
              style={{ transitionDelay: gridVisible ? `${i * 0.12}s` : '0s' }}
            >
              <ServiceHeading item={item} />
              <p className="text-[#5C5C5C] leading-relaxed mt-5 max-w-md">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
