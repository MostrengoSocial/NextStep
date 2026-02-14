import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Logo } from './Logo';
import { Menu, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = ['about', 'services', 'testimonials', 'contact'];

export const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = content[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.04]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group"
          >
            <Logo className="text-white" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8963E] hover:after:w-full after:transition-all after:duration-300"
              >
                {t[link]}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-[13px] font-semibold text-white/40 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#B8963E] hover:bg-[#C9A74F] text-[#0A0A0A] text-[13px] font-semibold px-6 h-10 rounded-full transition-all duration-300 shadow-lg shadow-[#B8963E]/20 hover:shadow-[#B8963E]/30"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-[13px] font-semibold text-white/40 px-2 py-1"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-white/70">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0D0D0D] border-l border-white/5 w-80">
                <div className="flex flex-col gap-2 mt-12">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link)}
                      className="text-left text-lg font-medium text-white/70 py-3 px-4 rounded-xl hover:bg-white/5 hover:text-white transition-colors duration-200"
                    >
                      {t[link]}
                    </button>
                  ))}
                  <div className="mt-6 px-4">
                    <Button
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-[#B8963E] hover:bg-[#C9A74F] text-[#0A0A0A] text-sm font-semibold h-12 rounded-full"
                    >
                      {t.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
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
