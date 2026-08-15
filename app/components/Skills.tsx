'use client';

import { SKILLS } from '@/app/types/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 bg-surface">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-text-primary mb-16">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILLS.map((skillGroup, index) => (
            <div
              key={index}
              className="p-8 bg-surface-elevated rounded-2xl border border-surface-elevated hover:border-accent/20 transition-colors"
            >
              <p className="metadata text-accent uppercase tracking-widest mb-6">
                {skillGroup.category}
              </p>

              <div className="space-y-3">
                {skillGroup.items.map((skill, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="py-2 border-b border-surface last:border-0"
                  >
                    <p className="body-text text-text-primary">{skill}</p>
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