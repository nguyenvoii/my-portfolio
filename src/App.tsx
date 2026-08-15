import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { AdvancedAuroraBackground } from './components/AdvancedAuroraBackground';
import { AccessibilityHints } from './components/AccessibilityHints';
import { LoadingState } from './components/LoadingState';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useScrollSpy } from './hooks/useScrollSpy';
import { personalInfo, skills, socialLinks, guitarJourney, hobbies } from './data/content';
import { getBands, getSoloArtists } from './data/artists';
import { projects } from './data/projects';
import './styles/globals.css';
import type { Section } from './types';
import avatar from '/assets/avatar.jpg';

function App() {
  const sections: Section[] = ['hero', 'about', 'build', 'projects', 'music', 'explore', 'connect'];
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [isLoading, setIsLoading] = useState(true);

  // Auto-detect current section on scroll
  const activeSection = useScrollSpy({ sections });

  // Update current section when scroll spy detects change
  useEffect(() => {
    setCurrentSection(activeSection);
  }, [activeSection]);

  // Simulate loading time
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Animation hooks for each section
  const heroAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  const aboutAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const buildAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const projectsAnimation = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const musicAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const exploreAnimation = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const connectAnimation = useScrollAnimation({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="relative min-h-screen bg-midnight">
      {/* Loading State */}
      {isLoading && <LoadingState />}

      {/* Accessibility hints */}
      <AccessibilityHints />

      {/* Advanced Background with aurora and snow */}
      <AdvancedAuroraBackground />

      {/* Navigation - z-index 50 */}
      <div className="relative z-50">
        <Navigation
          currentSection={currentSection}
          sections={sections}
        />
      </div>

      {/* Main Content - z-index 20 (above background and snow) */}
      <main className="relative z-20" role="main" aria-label="Main content">
        {/* Hero Section */}
        <section id="section-hero" ref={heroAnimation.ref} className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto w-full">
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 xl:gap-24">
              {/* Text Content - Top on mobile, Left on desktop */}
              <div className="flex-1 max-w-xl w-full lg:order-1 order-2 text-center lg:text-left">
                <h1 id="hero-heading" className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient text-glow mb-4 sm:mb-6 transition-all duration-1000 ${
                  heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}>
                  {personalInfo.name}
                </h1>

                <p className={`text-xl sm:text-2xl md:text-subtitle text-sky-blue mb-3 sm:mb-4 transition-all duration-1000 delay-200 ${
                  heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {personalInfo.tagline}
                </p>

                <p className={`text-base sm:text-lg lg:text-xl text-gray-300 max-w-md mx-auto lg:mx-0 transition-all duration-1000 delay-300 ${
                  heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}>
                  {personalInfo.taglineExtended}
                </p>

                {/* Scroll indicator - Hidden on mobile */}
                <div className={`absolute -bottom-24 left-0 hidden lg:flex items-center gap-3 text-gray-400/60 text-sm transition-all duration-1000 delay-700 ${
                  heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <span>Scroll to explore</span>
                  <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* Avatar Container - Top on mobile, Right on desktop */}
              <div className={`flex-1 flex justify-center items-center transition-all duration-1000 delay-300 relative z-30 lg:order-2 order-1 ${
                heroAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] xl:w-[500px] xl:h-[500px]">
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 bg-aurora/30 rounded-full blur-3xl animate-pulse-soft" />
                  <div className="absolute inset-0 bg-gradient-radial from-aurora/40 via-transparent to-transparent rounded-full" />

                  {/* Avatar - elevated above snow with aurora glow */}
                  <div className="relative w-full h-full rounded-full overflow-hidden aurora-glow border-2 border-aurora/40 shadow-2xl z-10">
                    <img
                      src={avatar}
                      alt="Professional portrait photo of Nguyễn Voi Anh Phi, guitarist and web developer"
                      className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                      loading="eager"
                    />
                  </div>

                  {/* Floating particles around avatar */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-aurora/60 rounded-full animate-float aurora-glow"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${15 + i * 8}%`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="section-about" ref={aboutAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className={`text-7xl font-bold text-gradient mb-12 text-center transition-all duration-1000 ${
              aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
              ABOUT
            </h2>

            <div className="space-y-6">
              {/* Bio */}
              <div className={`glass-panel p-8 transition-all duration-1000 delay-200 ${
                aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-2xl font-semibold text-soft-white mb-4">
                  Hello, I'm {personalInfo.name}
                </h3>
                <div className="space-y-3 text-base text-gray-300 leading-relaxed">
                  {personalInfo.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Three Learning Paths */}
              <div className={`glass-panel p-8 transition-all duration-1000 delay-300 ${
                aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-xl font-semibold text-sky-blue mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-sky-blue rounded-full animate-pulse" />
                  Learning Journey
                </h3>

                <div className="grid md:grid-cols-3 gap-5">
                  {/* Education - IT */}
                  <a
                    href="https://fpt.edu.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-sky-blue/20 hover:border-sky-blue/40 transition-all duration-300 interactive"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sky-blue/20 flex items-center justify-center group-hover:bg-sky-blue/30 transition-colors">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h4 className="text-lg font-semibold text-soft-white text-center mb-3 group-hover:text-sky-blue transition-colors">
                      Education
                    </h4>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-soft-white">{personalInfo.education.field}</p>
                      <p className="text-xs text-gray-300">{personalInfo.education.institution}</p>
                      <p className="text-xs text-gray-400 mt-2">{personalInfo.education.period}</p>
                      <p className="text-xs text-emerald-400 mt-2">{personalInfo.education.status}</p>
                    </div>
                  </a>

                  {/* English - DOL */}
                  <a
                    href={personalInfo.english.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-aurora/20 hover:border-aurora/40 transition-all duration-300 interactive"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-aurora/20 flex items-center justify-center group-hover:bg-aurora/30 transition-colors">
                      <span className="text-2xl">📤</span>
                    </div>
                    <h4 className="text-lg font-semibold text-soft-white text-center mb-3 group-hover:text-aurora transition-colors">
                      English
                    </h4>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-soft-white">{personalInfo.english.field}</p>
                      <p className="text-xs text-gray-300">{personalInfo.english.institution}</p>
                      <p className="text-xs text-aurora font-semibold mt-2">{personalInfo.english.level}</p>
                      <p className="text-xs text-gray-400">{personalInfo.english.period}</p>
                    </div>
                  </a>

                  {/* Guitar - GuitarPlus */}
                  <a
                    href={personalInfo.guitar.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 interactive"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-400/20 flex items-center justify-center group-hover:bg-purple-400/30 transition-colors">
                      <span className="text-2xl">🎸</span>
                    </div>
                    <h4 className="text-lg font-semibold text-soft-white text-center mb-3 group-hover:text-purple-400 transition-colors">
                      Guitar
                    </h4>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-soft-white">{personalInfo.guitar.field}</p>
                      <p className="text-xs text-gray-300">{personalInfo.guitar.institution}</p>
                      <p className="text-xs text-purple-400 font-semibold mt-2">{personalInfo.guitar.level}</p>
                      <p className="text-xs text-gray-400">{personalInfo.guitar.period}</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Quote */}
              <div className={`glass-panel p-8 border-l-4 border-l-aurora transition-all duration-1000 delay-400 ${
                aboutAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <blockquote className="text-lg md:text-xl text-soft-white/90 italic leading-relaxed">
                  "Programming is my career direction. Music is a major part of my identity.
                  Together, they represent who I am."
                </blockquote>
                <p className="mt-4 text-gray-400 text-sm">— Nguyễn "Voi" Anh Phi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Build Section */}
        <section id="section-build" ref={buildAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24 relative">

          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="text-center mb-20">
              <h2 className={`text-7xl font-bold text-gradient mb-8 transition-all duration-1000 ${
                buildAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}>
                BUILDING WITH CODE
              </h2>
              <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                buildAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Currently exploring software development and building technical foundations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Development */}
              <div className={`glass-panel p-10 border-t-4 border-t-sky-blue transition-all duration-1000 delay-300 ${
                buildAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-3xl font-semibold text-sky-blue mb-8 flex items-center gap-4">
                  <span className="w-3 h-3 bg-sky-blue rounded-full animate-pulse" />
                  DEVELOPMENT
                </h3>
                <div className="space-y-4">
                  {skills.filter(s => s.category === 'development').map((skill, index) => (
                    <div
                      key={index}
                      className="group p-5 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-sky-blue/10 hover:border-sky-blue/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-soft-white font-medium">{skill.name}</span>
                        <div className="w-2 h-2 bg-aurora/40 rounded-full group-hover:bg-aurora group-hover:aurora-glow transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data */}
              <div className={`glass-panel p-10 border-t-4 border-t-purple-400 transition-all duration-1000 delay-400 ${
                buildAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-3xl font-semibold text-purple-400 mb-8 flex items-center gap-4">
                  <span className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                  DATA
                </h3>
                <div className="space-y-4">
                  {skills.filter(s => s.category === 'data').map((skill, index) => (
                    <div
                      key={index}
                      className="group p-5 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-purple-400/10 hover:border-purple-400/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-soft-white font-medium">{skill.name}</span>
                        <div className="w-2 h-2 bg-aurora/40 rounded-full group-hover:bg-aurora group-hover:aurora-glow transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="section-projects" ref={projectsAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="text-center mb-20">
              <h2 className={`text-7xl font-bold text-gradient mb-8 transition-all duration-1000 ${
                projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}>
                THINGS I'VE BUILT
              </h2>
              <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Projects, experiments, and things I'm learning through.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`glass-panel p-8 group hover:border-aurora/40 transition-all duration-500 ${
                    projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Project Image/Icon */}
                  <div className="aspect-video mb-6 bg-midnight/50 rounded-lg overflow-hidden flex items-center justify-center">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-5xl opacity-20">💻</div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-semibold text-soft-white mb-4 group-hover:text-aurora transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-blue text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-midnight/60 text-sm text-sky-blue rounded-full border border-sky-blue/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      project.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                      'bg-sky-blue/20 text-sky-blue border-sky-blue/30'
                    }`}>
                      {project.status.toUpperCase()}
                    </span>

                    {/* Links */}
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-blue hover:text-aurora transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted-blue hover:text-aurora transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coming Soon Section */}
            <div className={`glass-panel p-12 border-2 border-dashed border-aurora/30 text-center transition-all duration-1000 delay-700 ${
              projectsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold text-gradient mb-4">Coming Soon</h3>
              <p className="text-lg text-muted-blue max-w-2xl mx-auto leading-relaxed">
                I'm currently working on several exciting projects and continuously improving my skills.
                From web applications to creative coding experiments, I'm dedicated to building meaningful software
                that combines technical excellence with creative problem-solving.
                <span className="block mt-4 text-sky-blue font-semibold">
                  More projects will be added here as I continue my development journey!
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Music Section */}
        <section id="section-music" ref={musicAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-20">
              <h2 className={`text-7xl font-bold text-gradient mb-8 transition-all duration-1000 ${
                musicAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}>
                PLAY
              </h2>
              <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                musicAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Music is not just a hobby. It's one of the main creative sides of my identity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 mb-16">
              {/* Bands */}
              <div className={`glass-panel p-10 transition-all duration-1000 delay-300 ${
                musicAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-3xl font-semibold text-sky-blue mb-8">BANDS / GROUPS</h3>
                <div className="space-y-4">
                  {getBands().map((artist, index) => (
                    <a
                      key={index}
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-5 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-sky-blue/10 hover:border-sky-blue/30 transition-all duration-300 block interactive"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg text-soft-white font-medium group-hover:text-sky-blue transition-colors">{artist.name}</h4>
                          {artist.note && <p className="text-sm text-muted-blue/70 mt-1">{artist.note}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-sky-blue/40 rounded-full group-hover:bg-sky-blue transition-colors" />
                          <svg className="w-4 h-4 text-sky-blue/40 group-hover:text-sky-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Artists */}
              <div className={`glass-panel p-10 transition-all duration-1000 delay-400 ${
                musicAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <h3 className="text-3xl font-semibold text-purple-400 mb-8">ARTISTS</h3>
                <div className="space-y-4">
                  {getSoloArtists().map((artist, index) => (
                    <a
                      key={index}
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-5 rounded-lg bg-midnight/50 hover:bg-midnight/70 border border-purple-400/10 hover:border-purple-400/30 transition-all duration-300 block interactive"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg text-soft-white font-medium group-hover:text-purple-400 transition-colors">{artist.name}</h4>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-400/40 rounded-full group-hover:bg-purple-400 transition-colors" />
                          <svg className="w-4 h-4 text-purple-400/40 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Guitar Journey */}
            <div className={`glass-panel p-12 transition-all duration-1000 delay-500 ${
              musicAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <div className="text-center mb-12">
                <div className="text-6xl mb-6">🎸</div>
                <h3 className="text-4xl font-bold text-gradient mb-6">GUITAR JOURNEY</h3>
                <p className="text-2xl text-sky-blue font-semibold mb-3">{guitarJourney.duration}</p>
                <p className="text-gray-400 italic">Still learning, still improving.</p>
              </div>

              {/* Timeline */}
              <div className="relative mb-12">
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-blue/30 via-aurora/50 to-sky-blue/30" />
                <div className="relative flex justify-between">
                  {guitarJourney.stages.map((stage, index) => (
                    <div key={index} className="flex-1 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-midnight border-2 border-aurora/50 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-aurora rounded-full aurora-glow" />
                      </div>
                      <h4 className="text-sm font-semibold text-soft-white mb-2">{stage.stage}</h4>
                      <p className="text-xs text-muted-blue/70">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div className="text-center">
                <h4 className="text-xl font-semibold text-soft-white mb-6">Currently Learning</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {guitarJourney.currentFocus.map((focus, index) => (
                    <span
                      key={index}
                      className="px-5 py-3 bg-aurora/10 border-2 border-aurora/30 rounded-full text-aurora text-sm font-medium hover:bg-aurora/20 transition-colors duration-300"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore Section */}
        <section id="section-explore" ref={exploreAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-20">
              <h2 className={`text-7xl font-bold text-gradient mb-8 transition-all duration-1000 ${
                exploreAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}>
                EXPLORE
              </h2>
              <p className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                exploreAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Beyond programming. The things that make me who I am.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {hobbies.map((hobby, index) => (
                <div
                  key={hobby.id}
                  className={`glass-panel p-10 group hover:border-aurora/40 transition-all duration-500 ${
                    exploreAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {hobby.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-3xl font-semibold text-soft-white mb-4 group-hover:text-aurora transition-colors">
                        {hobby.title}
                      </h3>
                      <p className="text-lg text-muted-blue leading-relaxed mb-6">
                        {hobby.description}
                      </p>

                      {/* Items */}
                      {hobby.items && (
                        <div className="flex flex-wrap gap-3">
                          {hobby.items.map((item, i) => (
                            <span key={i} className="px-4 py-2 bg-midnight/60 text-sm text-sky-blue rounded-full border border-sky-blue/20 hover:border-sky-blue/40 transition-colors">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-aurora/20 group-hover:border-aurora/40 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section id="section-connect" ref={connectAnimation.ref} className="min-h-screen flex items-center justify-center px-6 py-24 relative">
          {/* Return of aurora atmosphere */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aurora/10 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Avatar Returns */}
            <div className={`w-40 h-40 mx-auto mb-12 rounded-full overflow-hidden aurora-glow border-2 border-aurora/30 transition-all duration-1000 ${
              connectAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <img src={avatar} alt={personalInfo.name} className="w-full h-full object-cover" />
            </div>

            <h2 className={`text-7xl font-bold text-gradient mb-8 transition-all duration-1000 delay-200 ${
              connectAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}>
              COME SAY HI.
            </h2>
            <p className={`text-xl text-muted-blue mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              connectAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              I'm always happy to meet people who share the same interests.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-20">
              {socialLinks.map((link, index) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target={link.url ? '_blank' : undefined}
                  rel={link.url ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 px-8 py-6 glass-panel hover:border-aurora/50 transition-all duration-300 group ${
                    connectAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {link.icon}
                  </span>
                  <div className="text-left">
                    <div className="text-xs text-muted-blue/70 uppercase tracking-wider">{link.platform}</div>
                    <div className="text-lg text-soft-white font-medium group-hover:text-aurora transition-colors">
                      {link.platform === 'Email' ? link.username : `@${link.username}`}
                    </div>
                  </div>

                  {/* External Link Arrow */}
                  {link.url && (
                    <svg className="w-5 h-5 text-muted-blue/50 group-hover:text-aurora group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </a>
              ))}
            </div>

            {/* Final Message */}
            <div className={`glass-panel p-12 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${
              connectAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <p className="text-xl text-soft-white/80 leading-relaxed mb-6">
                Thanks for visiting my personal space.
              </p>
              <p className="text-lg text-muted-blue italic">
                Whether you're into music, programming, anime, or just exploring — I'd love to connect.
              </p>
            </div>

            {/* Ending Signature */}
            <div className={`mt-16 transition-all duration-1000 delay-900 ${
              connectAnimation.isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="inline-flex items-center gap-4 px-8 py-4 glass-panel">
                <div className="text-aurora animate-pulse">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-soft-white font-medium">Built with logic & melody</span>
                <div className="w-px h-8 bg-sky-blue/30" />
                <span className="text-muted-blue text-sm">Nguyễn "Voi" Anh Phi</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-12 text-center z-10">
        <p className="text-muted-blue text-sm">© 2025 Nguyễn "Voi" Anh Phi. Built with logic & melody.</p>
      </footer>

      {/* Floating Music Player - z-index 100 (always on top) */}
      <div className="relative z-100">
        <FloatingMusicPlayer />
      </div>
    </div>
  );
}

export default App;