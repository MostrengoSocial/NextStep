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
    <section id="about" className="relative py-28 lg:py-36 bg-[#0A0A0A] overflow-hidden noise-overlay">
      {/* Background orb */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#B8963E]/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main content */}
        <div
          ref={sectionRef}
          className={cn(
            'transition-all duration-1000 ease-out',
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="accent-line mb-6" />
          <span className="modern-tag bg-white/5 text-[#B8963E] border border-white/10 mb-6">
            {t.tagline}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[3.5rem] font-semibold text-white leading-tight max-w-3xl mb-12 tracking-tight">
            {t.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {t.paragraphs.map((p, i) => (
              <p key={i} className="text-white/40 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Stats — Glass cards */}
        <div
          ref={statsRef}
          className={cn(
            'grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24 stagger-children',
            statsVisible ? 'visible' : ''
          )}
        >
          {t.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-7 text-center hover:bg-white/[0.06] transition-all duration-500 group card-glow"
            >
              <div className="font-heading text-4xl lg:text-5xl font-semibold text-white mb-2 group-hover:text-gradient-gold transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-xs text-white/30 font-medium tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Why Portugal — Rich card */}
        <div
          ref={whyRef}
          className={cn(
            'relative rounded-3xl overflow-hidden transition-all duration-1000 ease-out',
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Card gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#B8963E]/10 via-[#141414] to-[#B8963E]/5" />
          <div className="absolute inset-0 border border-[#B8963E]/15 rounded-3xl" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B8963E]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

          <div className="relative p-10 lg:p-16">
            <h3 className="font-heading text-3xl lg:text-4xl font-semibold text-white mb-10">
              {t.whyPortugal.title}
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-14 gap-y-6">
              {t.whyPortugal.points.map((point, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 mt-1 w-6 h-6 rounded-full bg-[#B8963E]/15 flex items-center justify-center group-hover:bg-[#B8963E]/25 transition-colors duration-300">
                    <Check className="w-3.5 h-3.5 text-[#B8963E]" />
                  </div>
                  <span className="text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
