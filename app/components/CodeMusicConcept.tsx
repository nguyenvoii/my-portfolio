'use client';

import { CODE_MUSIC_CONCEPT } from '@/app/types/portfolio';

export default function CodeMusicConcept() {
  return (
    <section id="concept" className="py-32 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-heading text-text-primary mb-20 text-center">
          Logic × Melody
        </h2>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* CODE Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <h3 className="text-2xl font-bold text-text-primary">
                {CODE_MUSIC_CONCEPT.code.title}
              </h3>
            </div>

            <div className="space-y-4">
              {CODE_MUSIC_CONCEPT.code.items.map((item, index) => (
                <div key={index} className="pl-8">
                  <p className="body-text text-text-primary">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-surface-elevated">
              {CODE_MUSIC_CONCEPT.code.represents.map((item, index) => (
                <p key={index} className="metadata text-text-tertiary">{item}</p>
              ))}
            </div>
          </div>

          {/* MUSIC Side */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-accent rounded-full" />
              <h3 className="text-2xl font-bold text-text-primary">
                {CODE_MUSIC_CONCEPT.music.title}
              </h3>
            </div>

            <div className="space-y-4">
              {CODE_MUSIC_CONCEPT.music.items.map((item, index) => (
                <div key={index} className="pl-8">
                  <p className="body-text text-text-primary">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-surface-elevated">
              {CODE_MUSIC_CONCEPT.music.represents.map((item, index) => (
                <p key={index} className="metadata text-text-tertiary">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center py-12 border-t border-surface-elevated">
          <p className="text-3xl md:text-4xl font-bold text-text-primary">
            {CODE_MUSIC_CONCEPT.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}