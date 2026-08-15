import { useState, useEffect } from 'react';
import type { Section } from '../types';

interface NavigationProps {
  currentSection: Section;
  sections: Section[];
}

export const Navigation = ({ currentSection, sections }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sectionLabels: Record<Section, string> = {
    hero: 'ENTER',
    about: 'ABOUT',
    build: 'BUILD',
    projects: 'PROJECTS',
    music: 'PLAY',
    explore: 'EXPLORE',
    gear: 'GEAR',
    connect: 'CONNECT',
  };

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(`section-${section}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  // Desktop navigation
  if (!isMobile) {
    return (
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="glass-panel px-4 py-6 flex flex-col gap-6">
          {sections.filter(s => s !== 'hero').map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="group relative flex items-center gap-3 text-sm font-medium transition-all duration-300 hover:gap-4"
              aria-label={`Navigate to ${sectionLabels[section]}`}
            >
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === section
                  ? 'bg-aurora scale-125 aurora-glow'
                  : 'bg-sky-blue/40 group-hover:bg-sky-blue/60'
              }`} />

              <span className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                currentSection === section ? 'opacity-100' : ''
              }`}>
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                currentSection === section
                  ? 'text-aurora'
                  : 'text-muted-blue group-hover:text-soft-white'
              }`}>
                {sectionLabels[section]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Mobile navigation
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 glass-panel rounded-full interactive"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-soft-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-soft-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-soft-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-midnight/95 backdrop-blur-lg z-40 transition-all duration-500 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="h-full flex flex-col justify-center items-center gap-8 px-6">
          {sections.filter(s => s !== 'hero').map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="text-2xl font-display font-bold text-soft-white hover:text-aurora transition-colors duration-300"
            >
              <span className="text-aurora/60 mr-3">{String(index + 1).padStart(2, '0')}</span>
              {sectionLabels[section]}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
