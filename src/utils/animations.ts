// Animation utilities using GSAP
// Centralized animation configurations and helpers

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
export const checkReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Safe animation wrapper - respects reduced motion
export const safeAnimation = (animation: () => void) => {
  if (!checkReducedMotion()) {
    animation();
  }
};

// Common animation configurations
export const animationConfig = {
  fadeIn: {
    duration: 0.8,
    ease: 'power2.out',
  },
  slideUp: {
    duration: 0.6,
    ease: 'power3.out',
  },
  scaleIn: {
    duration: 0.5,
    ease: 'back.out(1.7)',
  },
  slowFade: {
    duration: 1.2,
    ease: 'power1.inOut',
  },
};

// Hero animations
export const animateHeroEntry = (elements: {
  name: HTMLElement;
  tagline: HTMLElement;
  supporting: HTMLElement;
  avatar: HTMLElement;
}) => {
  const tl = gsap.timeline({ defaults: animationConfig.fadeIn });

  tl.from(elements.avatar, {
    scale: 0.9,
    opacity: 0,
    duration: 1,
  })
  .from(elements.name, {
    y: 50,
    opacity: 0,
  }, '-=0.5')
  .from(elements.tagline, {
    y: 30,
    opacity: 0,
  }, '-=0.3')
  .from(elements.supporting, {
    y: 20,
    opacity: 0,
  }, '-=0.2');

  return tl;
};

// Text reveal animation
export const revealText = (element: HTMLElement, words?: string[]) => {
  if (!element) return;

  safeAnimation(() => {
    const text = element.textContent;
    if (!text) return;

    element.innerHTML = words
      ? words.map(word => `<span class="inline-block">${word}</span>`).join(' ')
      : text.split('').map(char => `<span class="inline-block">${char}</span>`).join('');

    gsap.from(element.children, {
      y: 100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power3.out',
    });
  });
};

// Parallax effect
export const createParallax = (
  element: HTMLElement,
  speed: number = 0.5,
  trigger?: HTMLElement
) => {
  if (!element || checkReducedMotion()) return;

  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Section scroll transitions
export const createSectionTransition = (
  sections: HTMLElement[],
  onUpdate?: (progress: number) => void
) => {
  if (checkReducedMotion()) return;

  sections.forEach((section, index) => {
    gsap.fromTo(section,
      { opacity: 0.3 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => onUpdate?.(index),
          onEnterBack: () => onUpdate?.(index),
        },
      }
    );
  });
};

// Cleanup function for GSAP instances
export const cleanupAnimations = (scope?: Element) => {
  ScrollTrigger.getAll().forEach(trigger => {
    if (!scope || trigger.trigger?.closest?.(':scope')?.contains(scope)) {
      trigger.kill();
    }
  });
};

// Magnetic button effect
export const createMagneticButton = (button: HTMLElement) => {
  if (checkReducedMotion() || !button) return;

  const strength = 0.3;

  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  });
};
