'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from '@/app/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  useEffect(() => {
    gsap.from('.skill-card', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="skills" className="py-32 px-6 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-white mb-16">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILLS.map((skillGroup, index) => (
            <div
              key={index}
              className="skill-card p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500/30 transition-all"
            >
              <p className="text-sm text-blue-400 uppercase tracking-widest mb-6">
                {skillGroup.category}
              </p>

              <div className="space-y-3">
                {skillGroup.items.map((skill, itemIndex) => (
                  <div key={itemIndex} className="py-2 border-b border-gray-700">
                    <p className="text-white">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}