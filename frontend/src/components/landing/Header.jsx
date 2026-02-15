import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { RainbowLogo } from './Logo';
import { Menu, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = ['services', 'about', 'testimonials', 'contact'];

export const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    setMobileOpen(false);
  };

  const goHome = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  // Handle scroll after navigation from legal pages
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={goHome}
            className="flex items-center gap-2 group"
          >
            <RainbowLogo size="small" />
            <span className={cn(
              'font-heading text-2xl tracking-tight transition-colors duration-300',
              scrolled || !isHomePage ? 'text-[#1A1A1A]' : 'text-white'
            )}>
              nextStep
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={cn(
                  'text-[13px] font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A8A84] hover:after:w-full after:transition-all after:duration-300',
                  scrolled || !isHomePage ? 'text-[#5C5C5C] hover:text-[#1A1A1A]' : 'text-white/70 hover:text-white'
                )}
              >
                {t[link]}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={cn(
                'text-[13px] font-semibold px-3 py-1.5 rounded-full border transition-colors duration-300',
                scrolled || !isHomePage ? 'text-[#5C5C5C] border-[#E0DDD6] hover:border-[#1A8A84]' : 'text-white/60 border-white/20 hover:border-white/40'
              )}
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className={cn(
                'text-[13px] font-semibold px-6 h-10 rounded-full transition-all duration-300',
                scrolled || !isHomePage
                  ? 'bg-[#1A1A1A] hover:bg-[#333] text-white'
                  : 'bg-white hover:bg-white/90 text-[#1A1A1A]'
              )}
            >
              {t.cta}
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleLanguage} className={cn('text-[13px] font-semibold px-2 py-1', scrolled || !isHomePage ? 'text-[#5C5C5C]' : 'text-white/60')}>
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className={cn('p-2', scrolled || !isHomePage ? 'text-[#1A1A1A]' : 'text-white')}>
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-[#E8E5DE] w-80">
                <div className="flex flex-col gap-2 mt-12">
                  {navLinks.map((link) => (
                    <button key={link} onClick={() => scrollToSection(link)} className="text-left text-lg font-medium text-[#1A1A1A] py-3 px-4 rounded-xl hover:bg-[#F4F3F0] transition-colors duration-200">
                      {t[link]}
                    </button>
                  ))}
                  <div className="mt-6 px-4">
                    <Button onClick={() => scrollToSection('contact')} className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white text-sm font-semibold h-12 rounded-full">
                      {t.cta}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
