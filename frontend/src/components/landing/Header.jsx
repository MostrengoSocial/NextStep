import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { content } from '../../data/mock';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#FAFAF7]/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <span className="font-heading text-2xl font-semibold tracking-tight text-[#1A1A1A] group-hover:text-[#B8963E] transition-colors duration-300">
              Next Step
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-sm font-medium text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B8963E] hover:after:w-full after:transition-all after:duration-300"
              >
                {t[link]}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors duration-300 px-3 py-1.5 rounded-md hover:bg-[#F2F0EB]"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#1A1A1A] hover:bg-[#2C2C2E] text-white text-sm font-medium px-6 h-10 rounded-md transition-colors duration-300"
            >
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-[#5C5C5C] px-2 py-1"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-[#1A1A1A]">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#FAFAF7] border-l border-[#E8E5DE] w-80">
                <div className="flex flex-col gap-2 mt-12">
                  {navLinks.map((link) => (
                    <button
                      key={link}
                      onClick={() => scrollToSection(link)}
                      className="text-left text-lg font-medium text-[#1A1A1A] py-3 px-4 rounded-lg hover:bg-[#F2F0EB] transition-colors duration-200"
                    >
                      {t[link]}
                    </button>
                  ))}
                  <div className="mt-6 px-4">
                    <Button
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-[#1A1A1A] hover:bg-[#2C2C2E] text-white text-sm font-medium h-12 rounded-md"
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
