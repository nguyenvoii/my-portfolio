'use client';

import { CODE_MUSIC_CONCEPT } from '@/app/types/portfolio';

export default function CodeMusicConcept() {
  return (
    <section id="concept" className="py-32 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-heading text-white mb-20 text-center">
          Logic × Melody
        </h2>

        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold text-white">{CODE_MUSIC_CONCEPT.code.title}</h3>
            </div>

            <div className="space-y-4">
              {CODE_MUSIC_CONCEPT.code.items.map((item, index) => (
                <div key={index} className="pl-8 border-l-2 border-blue-500/30 hover:border-blue-500 transition-colors">
                  <p className="text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-700">
              {CODE_MUSIC_CONCEPT.code.represents.map((item, index) => (
                <p key={index} className="text-gray-400 text-sm">{item}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
              <h3 className="text-2xl font-bold text-white">{CODE_MUSIC_CONCEPT.music.title}</h3>
            </div>

            <div className="space-y-4">
              {CODE_MUSIC_CONCEPT.music.items.map((item, index) => (
                <div key={index} className="pl-8 border-l-2 border-purple-500/30 hover:border-purple-500 transition-colors">
                  <p className="text-white">{item}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-700">
              {CODE_MUSIC_CONCEPT.music.represents.map((item, index) => (
                <p key={index} className="text-gray-400 text-sm">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center py-12 border-t border-gray-700">
          <p className="text-3xl md:text-4xl font-bold text-white">
            {CODE_MUSIC_CONCEPT.bridge}
          </p>
        </div>
      </div>
    </section>
  );
}