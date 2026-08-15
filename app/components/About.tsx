'use client';

import { EDUCATION, ABOUT_STORY } from '@/app/types/portfolio';

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="section-heading text-text-primary mb-16">
          About
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight">
              Building digital experiences by day,
              <span className="text-accent block">exploring rhythm by night.</span>
            </h3>
          </div>

          <div className="space-y-6">
            <p className="body-text text-text-secondary">
              {ABOUT_STORY}
            </p>
          </div>
        </div>

        <div className="mt-20">
          <div className="border-l-2 border-accent pl-8 py-4">
            <p className="metadata text-accent uppercase tracking-widest mb-2">
              Education
            </p>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              {EDUCATION.institution}
            </h3>
            <p className="body-text text-text-secondary mb-2">
              {EDUCATION.major}
            </p>
            <div className="flex items-center gap-4 text-text-tertiary metadata">
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