'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDUCATION, ABOUT_STORY } from '@/app/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    gsap.from('.about-text', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="about" className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-white mb-16">
          About
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="about-text">
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Building digital experiences by day,
              <span className="text-blue-400 block">exploring rhythm by night.</span>
            </h3>
          </div>

          <div className="about-text space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              {ABOUT_STORY}
            </p>
          </div>
        </div>

        <div className="about-text mt-20">
          <div className="border-l-2 border-blue-400 pl-8 py-4 bg-gray-900/50 rounded-r-2xl">
            <p className="text-sm text-blue-400 uppercase tracking-widest mb-2">
              Education
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">
              {EDUCATION.institution}
            </h3>
            <p className="text-gray-300 mb-2">{EDUCATION.major}</p>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>{EDUCATION.period}</span>
              <span>•</span>
              <span>{EDUCATION.status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}