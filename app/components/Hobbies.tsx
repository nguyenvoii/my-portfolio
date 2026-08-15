'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HOBBIES } from '@/app/types/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Hobbies() {
  useEffect(() => {
    gsap.from('.hobby-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#hobbies',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="hobbies" className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-white mb-16">
          Hobbies
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {HOBBIES.map((hobby, index) => (
            <div
              key={index}
              className="hobby-card p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-6">{hobby.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{hobby.title}</h3>
              <p className="text-gray-400">{hobby.description}</p>
              <div className="mt-6 w-12 h-px bg-blue-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}