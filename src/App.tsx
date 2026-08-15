import { useEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { BuildSection } from './components/BuildSection';
import { ProjectsSection } from './components/ProjectsSection';
import { MusicSection } from './components/MusicSection';
import { ExploreSection } from './components/ExploreSection';
import { ConnectSection } from './components/ConnectSection';
import { CustomCursor } from './components/CustomCursor';
import { AuroraBackground } from './components/AuroraBackground';
import './styles/globals.css';
import type { Section } from './types';
import { cleanupAnimations } from './utils/animations';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [isMobile, setIsMobile] = useState(false);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Handle resize
    const handleResize = () => {
      checkMobile();
      // Refresh ScrollTrigger on resize
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cleanupAnimations();
    };
  }, []);

  const sections: Section[] = ['hero', 'about', 'build', 'projects', 'music', 'explore', 'connect'];

  return (
    <div ref={appRef} className="relative">
      {/* Background effects */}
      <AuroraBackground />

      {/* Custom cursor - desktop only */}
      {!isMobile && <CustomCursor />}

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        sections={sections}
      />

      {/* Main content */}
      <main>
        <HeroSection />
        <AboutSection />
        <BuildSection />
        <ProjectsSection />
        <MusicSection />
        <ExploreSection />
        <ConnectSection />
      </main>

      {/* Footer */}
      <footer className="relative py-8 text-center text-muted-blue">
        <p className="text-sm">
          © 2025 Nguyễn Voi. Built with logic & melody.
        </p>
      </footer>
    </div>
  );
}

export default App;
