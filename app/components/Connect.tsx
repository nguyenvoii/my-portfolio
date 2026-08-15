'use client';

import { SOCIAL_LINKS } from '@/app/types/portfolio';

export default function Connect() {
  return (
    <section id="connect" className="py-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <h2 className="section-heading text-text-primary mb-6">
            Let's Connect
          </h2>
          <p className="body-text text-text-secondary">
            Whether you want to discuss a project, share music recommendations, or just say hello — I'd love to hear from you.
          </p>
        </div>

        <div className="space-y-4">
          {SOCIAL_LINKS.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target={social.url ? '_blank' : '_self'}
              rel={social.url ? 'noopener noreferrer' : undefined}
              className="block p-6 bg-surface rounded-2xl border border-surface-elevated hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-elevated flex items-center justify-center">
                    <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <p className="metadata text-accent uppercase tracking-wider mb-1">{social.platform}</p>
                    <p className="body-text text-text-primary">{social.handle}</p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full border border-surface-elevated flex items-center justify-center">
                  <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="mailto:phinath08326@gmail.com"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium transition-colors"
          >
            Send me an email
          </a>
        </div>
      </div>
    </section>
  );
}