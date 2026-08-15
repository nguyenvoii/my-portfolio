'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { title: 'Web Experience', tech: 'React / TypeScript', status: 'Currently Building' },
  { title: 'Interactive Interface', tech: 'Next.js / Tailwind CSS', status: 'In Development' },
  { title: 'Database Project', tech: 'Database / Web Development', status: 'Planning Phase' }
];

export default function Portfolio() {
  useEffect(() => {
    gsap.from('.project-item', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="portfolio" className="py-32 px-6 bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">Selected Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Currently building and shipping. More projects coming soon.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div key={index} className="project-item p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500/30 transition-all">
              <div className="inline-block px-3 py-1 bg-blue-500/20 rounded-full mb-6">
                <span className="text-sm text-blue-400">{project.status}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm uppercase">{project.tech}</p>
            </div>
          ))}

          <div className="project-item p-8 bg-gray-900 rounded-2xl border-2 border-dashed border-gray-700 hover:border-blue-500/20 transition-colors flex items-center justify-center min-h-[200px]">
            <p className="text-gray-500 text-sm uppercase">More Coming Soon</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <MagneticButton onClick={() => window.location.href = 'mailto:phinath08326@gmail.com'}>
            Discuss a Project
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}