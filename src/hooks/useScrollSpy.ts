import { useEffect, useState } from 'react';
import type { Section } from '../types';

interface UseScrollSpyOptions {
  sections: Section[];
  threshold?: number;
}

export const useScrollSpy = ({ sections, threshold = 0.3 }: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<Section>('hero');

  useEffect(() => {
    const observers = new Map<Element, IntersectionObserver>();

    // Create intersection observer for each section
    const observerOptions = {
      threshold,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionName = sectionId.replace('section-', '') as Section;
          if (sections.includes(sectionName)) {
            setActiveSection(sectionName);
          }
        }
      });
    };

    // Set up observers for all sections
    sections.forEach((section) => {
      const element = document.getElementById(`section-${section}`);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.set(element, observer);
      }
    });

    // Cleanup
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections, threshold]);

  return activeSection;
};