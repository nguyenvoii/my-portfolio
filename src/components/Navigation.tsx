import { useState, useEffect } from 'react';
import type { Section } from '../types';
import avatar from '/assets/avatar.jpg';

interface NavigationProps {
  currentSection: Section;
  sections: Section[];
  isLoading?: boolean;
}

export const Navigation = ({ currentSection, sections, isLoading = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sectionLabels: Record<Section, string> = {
    hero: 'HOME',
    projects: 'PROJECTS',
    build: 'BUILD',
    about: 'ABOUT',
    music: 'PLAY',
    connect: 'CONNECT',
    explore: 'EXPLORE',
  };

  const sectionIcons: Record<Section, string> = {
    hero: '🏠',
    projects: '💻',
    build: '⚡',
    about: '👋',
    music: '🎸',
    connect: '✉️',
    explore: '🌟',
  };

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Desktop navigation - Sticky top navigation bar
  if (!isMobile) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight/90 backdrop-blur-md border-b border-sky-blue/20 shadow-lg'
          : 'bg-midnight/80 backdrop-blur-sm'
      } ${isLoading ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-1000 ease-out`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Avatar */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-aurora/50 hover:border-aurora transition-all duration-300 hover:scale-105 cursor-pointer aurora-glow"
                onClick={() => scrollToSection('hero')}
              >
                <img
                  src={avatar}
                  alt="Nguyễn Voi Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-soft-white hover:text-aurora transition-colors cursor-pointer" onClick={() => scrollToSection('hero')}>
                Voi
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {sections.filter(s => s !== 'hero').map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 group"
                  aria-label={`Navigate to ${sectionLabels[section]}`}
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    currentSection === section
                      ? 'text-aurora'
                      : 'text-muted-blue group-hover:text-soft-white'
                  }`}>
                    {sectionLabels[section]}
                  </span>

                  {/* Active indicator */}
                  {currentSection === section && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-aurora rounded-full animate-pulse-soft" />
                  )}

                  {/* Hover background */}
                  <div className="absolute inset-0 bg-aurora/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </div>

            {/* Contact CTA */}
            <button
              onClick={() => scrollToSection('connect')}
              className="px-4 py-2 bg-aurora/20 border-2 border-aurora rounded-full text-sm font-medium text-soft-white hover:bg-aurora/30 hover:scale-105 transition-all duration-300 animate-pulse-soft"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-sky-blue/20">
          <div
            className="h-full bg-gradient-to-r from-aurora via-sky-blue to-aurora transition-all duration-300"
            style={{
              width: `${((sections.indexOf(currentSection) + 1) / sections.length) * 100}%`
            }}
          />
        </div>
      </nav>
    );
  }

  // Mobile navigation - Bottom tab bar (thumb-friendly)
  return (
    <>
      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-midnight/95 backdrop-blur-lg border-t border-sky-blue/20">
        <div className="flex items-center justify-around h-16 px-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-1 transition-all duration-300 hover:scale-105 relative"
              aria-label={`Navigate to ${sectionLabels[section]}`}
            >
              <div className={`text-lg transition-colors duration-300 ${
                currentSection === section ? 'text-aurora scale-110' : 'text-muted-blue'
              }`}>
                {sectionIcons[section]}
              </div>
              <span className={`text-[10px] font-medium transition-colors duration-300 ${
                currentSection === section ? 'text-aurora' : 'text-muted-blue'
              }`}>
                {sectionLabels[section]}
              </span>

              {/* Active indicator */}
              {currentSection === section && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-aurora rounded-full animate-pulse-soft" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-midnight/90 backdrop-blur-md border-b border-sky-blue/20">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-aurora/50">
              <img
                src={avatar}
                alt="Nguyễn Voi Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-soft-white">Voi</span>
          </div>

          {/* Current section indicator */}
          <div className="text-xs text-muted-blue">
            {sectionLabels[currentSection]}
          </div>
        </div>
      </div>
    </>
  );
};