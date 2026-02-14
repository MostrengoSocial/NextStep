import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content, aboutImage } from '../../data/mock';
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
    <section id="about" className="py-24 lg:py-32 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Two column: Image + Text */}
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24"
        >
          {/* Image */}
          <div className={cn('relative img-zoom anim-slide-left', sectionVisible ? 'visible' : '')}>
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
              <img
                src={aboutImage}
                alt="Lisbon street"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Pride accent dots */}
            <div className="absolute -bottom-4 -right-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#E44D60]" />
              <div className="w-3 h-3 rounded-full bg-[#E8893C]" />
              <div className="w-3 h-3 rounded-full bg-[#E8C93C]" />
              <div className="w-3 h-3 rounded-full bg-[#3BAF6A]" />
              <div className="w-3 h-3 rounded-full bg-[#4A7FBF]" />
              <div className="w-3 h-3 rounded-full bg-[#C94FAB]" />
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[2.8rem] text-[#1A1A1A] leading-tight mb-8 italic">
              {t.title}
            </h2>
            <div className="space-y-5">
              {t.paragraphs.map((p, i) => (
                <p key={i} className="text-[#5C5C5C] text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={cn(
            'grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 transition-all duration-1000 ease-out delay-200',
            statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {t.stats.map((stat, i) => {
            const colors = ['#E44D60', '#E8893C', '#3BAF6A', '#4A7FBF'];
            return (
              <div key={i} className="text-center p-8 rounded-2xl bg-white shadow-sm card-lift">
                <div className="font-heading text-4xl lg:text-5xl text-[#1A1A1A] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-[#8A8A8A] font-medium">{stat.label}</div>
                <div className="w-8 h-[3px] rounded-full mx-auto mt-4" style={{ background: colors[i] }} />
              </div>
            );
          })}
        </div>

        {/* Why Portugal */}
        <div
          ref={whyRef}
          className={cn(
            'relative p-10 lg:p-14 rounded-3xl bg-[#1A1A1A] text-white overflow-hidden transition-all duration-1000 ease-out delay-300',
            whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          <div className="relative">
            <h3 className="font-heading text-3xl lg:text-4xl italic mb-10">{t.whyPortugal.title}</h3>
            <div className="grid sm:grid-cols-2 gap-x-14 gap-y-6">
              {t.whyPortugal.points.map((point, i) => {
                const colors = ['#E44D60', '#E8893C', '#E8C93C', '#3BAF6A', '#4A7FBF'];
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${colors[i]}25` }}>
                      <Check className="w-3 h-3" style={{ color: colors[i] }} />
                    </div>
                    <span className="text-white/60 leading-relaxed">{point}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
