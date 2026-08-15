import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// === REUSABLE ANIMATION UTILITIES ===

export const fadeUp = (
  element: string | Element | Element[],
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  }
) => {
  const config = {
    y: 60,
    opacity: 0,
    duration: options?.duration || 0.8,
    delay: options?.delay || 0,
    stagger: options?.stagger || 0,
    ease: 'power3.out'
  };

  if (options?.scrollTrigger && typeof element === 'string') {
    return gsap.from(element, {
      ...config,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  return gsap.from(element, config);
};

export const staggerReveal = (
  parent: string,
  childrenSelector: string,
  options?: {
    delay?: number;
    stagger?: number;
    scrollTrigger?: boolean;
  }
) => {
  const config = {
    y: 40,
    opacity: 0,
    duration: 0.6,
    delay: options?.delay || 0,
    stagger: options?.stagger || 0.1,
    ease: 'power2.out'
  };

  if (options?.scrollTrigger) {
    return gsap.from(`${parent} ${childrenSelector}`, {
      ...config,
      scrollTrigger: {
        trigger: parent,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  return gsap.from(`${parent} ${childrenSelector}`, config);
};

export const scaleReveal = (
  element: string | Element | Element[],
  options?: {
    stagger?: number;
    scrollTrigger?: boolean;
  }
) => {
  const config = {
    scale: 0.9,
    opacity: 0,
    duration: 0.5,
    stagger: options?.stagger || 0,
    ease: 'power2.out'
  };

  if (options?.scrollTrigger && typeof element === 'string') {
    return gsap.from(element, {
      ...config,
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  return gsap.from(element, config);
};

export const cleanupScrollTrigger = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};