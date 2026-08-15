import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { personalInfo, skills, socialLinks, guitarJourney, hobbies } from './data/content';
import { getBands, getSoloArtists } from './data/artists';
import { projects } from './data/projects';
import './styles/globals.css';
import type { Section } from './types';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const sections: Section[] = ['hero', 'about', 'build', 'projects', 'music', 'explore', 'connect'];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight to-midnight" />
        <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </div>

      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        sections={sections}
      />

      {/* Hero Section */}
      <section id="section-hero" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="relative z-10 max-w-4xl">
            {/* Avatar */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-90">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-aurora/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/assets/avatar.jpg"
                    alt="Nguyễn Voi - Guitarist & Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
                {personalInfo.name}
              </h1>
              <p className="text-2xl md:text-3xl text-sky-blue mb-4">
                {personalInfo.tagline}
              </p>
              <p className="text-xl text-gray-400 max-w-2xl">
                {personalInfo.taglineExtended}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="section-about" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-16">ABOUT</h2>
          <div className="space-y-12">
            <div className="bg-midnight/30 p-8 md:p-12 rounded-lg border border-sky-blue/20">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Hello, I'm {personalInfo.name}
              </h3>
              <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
                {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="bg-midnight/30 p-8 md:p-12 rounded-lg border border-sky-blue/20">
              <h3 className="text-xl font-semibold text-sky-blue mb-6">Education</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 mt-2 bg-aurora rounded-full" />
                  <div>
                    <h4 className="text-lg font-medium text-white">
                      {personalInfo.education.field}
                    </h4>
                    <p className="text-gray-400 mt-1">{personalInfo.education.institution}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {personalInfo.education.period} • {personalInfo.education.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Section */}
      <section id="section-build" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">BUILDING WITH CODE</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Currently exploring software development and building technical foundations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-midnight/30 p-8 rounded-lg border-t-4 border-t-sky-blue">
              <h3 className="text-2xl font-semibold text-sky-blue mb-6">DEVELOPMENT</h3>
              <div className="space-y-4">
                {skills.filter(s => s.category === 'development').map((skill, index) => (
                  <div key={index} className="p-4 rounded-lg bg-midnight/50">
                    <span className="text-lg text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-midnight/30 p-8 rounded-lg border-t-4 border-t-purple-400">
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">DATA</h3>
              <div className="space-y-4">
                {skills.filter(s => s.category === 'data').map((skill, index) => (
                  <div key={index} className="p-4 rounded-lg bg-midnight/50">
                    <span className="text-lg text-white">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="section-projects" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">THINGS I'VE BUILT</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Projects, experiments, and things I'm learning through.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-midnight/30 p-6 rounded-lg border border-sky-blue/20">
                <div className="aspect-video mb-6 bg-midnight/50 rounded-lg flex items-center justify-center">
                  <div className="text-4xl opacity-20">💻</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-midnight/80 text-xs text-sky-blue rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="section-music" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">PLAY</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Music is not just a hobby. It's one of the main creative sides of my identity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-midnight/30 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-sky-blue mb-6">BANDS / GROUPS</h3>
              <div className="space-y-4">
                {getBands().map((artist, index) => (
                  <div key={index} className="p-4 rounded-lg bg-midnight/50">
                    <h4 className="text-white font-medium">{artist.name}</h4>
                    {artist.note && <p className="text-sm text-gray-500 mt-1">{artist.note}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-midnight/30 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-purple-400 mb-6">ARTISTS</h3>
              <div className="space-y-4">
                {getSoloArtists().map((artist, index) => (
                  <div key={index} className="p-4 rounded-lg bg-midnight/50">
                    <h4 className="text-white font-medium">{artist.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-midnight/30 p-8 md:p-12 rounded-lg">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🎸</div>
              <h3 className="text-3xl font-bold text-white mb-4">GUITAR JOURNEY</h3>
              <p className="text-xl text-sky-blue font-semibold mb-2">{guitarJourney.duration}</p>
              <p className="text-gray-400 italic">Still learning, still improving.</p>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-4">Currently Learning</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {guitarJourney.currentFocus.map((focus, index) => (
                  <span key={index} className="px-4 py-2 bg-aurora/10 border border-aurora/30 rounded-full text-sm text-aurora">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="section-explore" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">EXPLORE</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Beyond programming. The things that make me who I am.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {hobbies.map((hobby) => (
              <div key={hobby.id} className="bg-midnight/30 p-8 rounded-lg border border-sky-blue/20">
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{hobby.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-3">{hobby.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{hobby.description}</p>
                    {hobby.items && (
                      <div className="flex flex-wrap gap-2">
                        {hobby.items.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-midnight/60 text-sm text-sky-blue rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="section-connect" className="min-h-screen relative flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden">
            <img src="/assets/avatar.jpg" alt={personalInfo.name} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">COME SAY HI.</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            I'm always happy to meet people who share the same interests.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url ? '_blank' : undefined}
                rel={link.url ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 px-6 py-4 bg-midnight/30 rounded-lg border border-sky-blue/20 hover:border-aurora/50 transition-all"
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="text-left">
                  <div className="text-xs text-gray-500 uppercase">{link.platform}</div>
                  <div className="text-white font-medium">
                    {link.platform === 'Email' ? link.username : `@${link.username}`}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-midnight/30 p-8 max-w-2xl mx-auto rounded-lg">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              Thanks for visiting my personal space.
            </p>
            <p className="text-gray-400 italic">
              Whether you're into music, programming, anime, or just exploring — I'd love to connect.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 text-center text-gray-500">
        <p className="text-sm">© 2025 Nguyễn Voi. Built with logic & melody.</p>
      </footer>
    </div>
  );
}

export default App;
