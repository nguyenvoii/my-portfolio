'use client';

import { HOBBIES } from '@/app/types/portfolio';

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-text-primary mb-16">
          Hobbies
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {HOBBIES.map((hobby, index) => (
            <div
              key={index}
              className="p-8 bg-surface rounded-2xl border border-surface-elevated hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-6">{hobby.icon}</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                {hobby.title}
              </h3>
              <p className="body-text text-text-secondary">{hobby.description}</p>
              <div className="mt-6 w-12 h-px bg-accent/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}