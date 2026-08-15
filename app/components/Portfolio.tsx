'use client';

import MagneticButton from './MagneticButton';

const PLACEHOLDER_PROJECTS = [
  {
    title: 'Web Experience',
    technologies: 'React / TypeScript',
    status: 'Currently Building'
  },
  {
    title: 'Interactive Interface',
    technologies: 'Next.js / Tailwind CSS',
    status: 'In Development'
  },
  {
    title: 'Database Project',
    technologies: 'Database / Web Development',
    status: 'Planning Phase'
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-6 bg-surface">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="section-heading text-text-primary mb-4">
            Selected Work
          </h2>
          <p className="body-text text-text-secondary max-w-2xl mx-auto">
            Currently building and shipping. More projects coming soon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACEHOLDER_PROJECTS.map((project, index) => (
            <div
              key={index}
              className="p-8 bg-surface-elevated rounded-2xl border border-surface-elevated hover:border-accent/30 transition-all duration-300"
            >
              <div className="inline-block px-3 py-1 bg-accent/10 rounded-full mb-6">
                <span className="metadata text-accent">{project.status}</span>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3 hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="metadata text-text-tertiary mb-4 uppercase tracking-wider">
                {project.technologies}
              </p>

              <div className="flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100">
                <span className="text-sm">View Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}

          <div className="p-8 bg-surface rounded-2xl border-2 border-dashed border-surface-elevated hover:border-accent/20 transition-colors flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <p className="metadata text-text-tertiary uppercase tracking-wider">
                More Coming Soon
              </p>
            </div>
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