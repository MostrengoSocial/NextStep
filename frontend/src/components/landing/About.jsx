import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { useInView } from '../../hooks/useInView';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const About = () => {
  const { language } = useLanguage();
  const t = content[language].about;
  const [sectionRef, sectionVisible] = useInView();
  const [statsRef, statsVisible] = useInView();
  const [whyRef, whyVisible] = useInView();

  return (
    <section id="about" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main content */}
        <div
          ref={sectionRef}
          className={cn(
            'transition-all duration-1000 ease-out',
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#B8963E] mb-5">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1A1A1A] leading-tight max-w-3xl mb-10">
            {t.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {t.paragraphs.map((p, i) => (
              <p key={i} className="text-[#5C5C5C] text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={cn(
            'grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 transition-all duration-1000 ease-out delay-200',
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {t.stats.map((stat, i) => (
            <div
              key={i}
              className="text-center lg:text-left p-6 rounded-xl border border-[#E8E5DE] bg-[#FAFAF7] hover:border-[#B8963E]/30 transition-colors duration-300"
            >
              <div className="font-heading text-4xl lg:text-5xl font-semibold text-[#1A1A1A] mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-[#8A8A8A] font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Portugal */}
        <div
          ref={whyRef}
          className={cn(
            'relative p-10 lg:p-14 rounded-2xl bg-[#1A1A1A] text-white overflow-hidden transition-all duration-1000 ease-out delay-300',
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#B8963E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h3 className="font-heading text-3xl lg:text-4xl font-semibold mb-8">
              {t.whyPortugal.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
              {t.whyPortugal.points.map((point, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-[#B8963E]/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#B8963E]" />
                  </div>
                  <span className="text-[#B0B0B0] leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
