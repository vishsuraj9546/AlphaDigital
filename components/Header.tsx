'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';  // ✅ Unique font import

// ✅ Orbitron font load
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600', '700', '800'],  // multiple weights for flexibility
});

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['alphadigital', 'about', 'services', 'portfolio', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="px-8 py-6">
          <nav className="flex items-center justify-between">
            
            {/* ✅ Logo with new font */}
            <div className={`text-3xl font-bold text-white ${orbitron.className}`}>
              <Link
                href="/"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                AlphaDigital
              </Link>
            </div>

            {/* ✅ Top Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Normal sections ke liye scroll */}
              {[
                { id: 'about', label: 'ABOUT' },
                { id: 'services', label: 'SERVICES' },
                { id: 'portfolio', label: 'PORTFOLIO' },
                { id: 'contact', label: 'CONTACT' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-bold tracking-widest transition-all duration-300 hover:text-purple-400 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id ? 'text-purple-400' : 'text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* ✅ Careers button direct page pe le jayega */}
              <Link
                href="/careers"
                className="text-sm font-bold tracking-widest transition-all duration-300 hover:text-purple-400 cursor-pointer whitespace-nowrap text-white/70"
              >
                CAREERS
              </Link>
            </div>

            {/* ✅ Start Project Button */}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              START PROJECT
            </button>
          </nav>
        </div>
      </header>

      {/* ✅ Side Scroll Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {[
            { id: 'hero', label: 'TOP' },
            { id: 'about', label: 'ABOUT' },
            { id: 'services', label: 'SERVICES' },
            { id: 'portfolio', label: 'WORK' },
            { id: 'contact', label: 'CONTACT' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center cursor-pointer"
            >
              <span
                className={`text-xs font-bold tracking-widest transition-all duration-300 mr-3 ${
                  activeSection === item.id ? 'text-purple-400' : 'text-white/40'
                } group-hover:text-purple-400`}
              >
                {item.label}
              </span>
              <div
                className={`w-8 h-0.5 transition-all duration-300 ${
                  activeSection === item.id ? 'bg-purple-400' : 'bg-white/20'
                } group-hover:bg-purple-400`}
              />
            </button>
          ))}

          {/* ✅ Careers ke liye Link (side nav pe bhi) */}
          <Link
            href="/careers"
            className="group flex items-center cursor-pointer"
          >
            <span className="text-xs font-bold tracking-widest transition-all duration-300 mr-3 text-white/70 group-hover:text-purple-400">
              CAREERS
            </span>
            <div className="w-8 h-0.5 bg-white/20 group-hover:bg-purple-400 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </>
  );
}
