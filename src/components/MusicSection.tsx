import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBands, getSoloArtists } from '../data/artists';
import { guitarJourney, featuredTrack } from '../data/content';

export const MusicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);
  const guitarRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (subtitleRef.current) {
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      );
    }

    if (playerRef.current) {
      tl.from(
        playerRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        '-=0.2'
      );
    }

    if (artistsRef.current) {
      tl.from(
        artistsRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.1'
      );
    }

    if (guitarRef.current) {
      tl.from(
        guitarRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.1'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Simulated waveform animation
  const waveformBars = [...Array(20)].map(() => ({
    height: Math.random() * 100,
  }));

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Note: Actual audio implementation would go here
    // For now, this demonstrates the UI architecture
  };

  return (
    <section
      id="section-music"
      ref={sectionRef}
      className="container-section relative overflow-hidden"
    >
      {/* Music-inspired background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-aurora/30 to-transparent" />
      </div>

      <div className="container-content relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6"
            >
              PLAY
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl text-muted-blue max-w-2xl mx-auto"
            >
              Music is not just a hobby. It's one of the main creative sides of my identity.
            </p>
          </div>

          {/* Music Player */}
          <div
            ref={playerRef}
            className="glass-panel p-8 mb-12 max-w-2xl mx-auto aurora-glow"
          >
            <div className="flex items-center gap-6">
              {/* Play button */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-aurora/20 border-2 border-aurora flex items-center justify-center hover:bg-aurora/30 hover:scale-105 transition-all duration-300 interactive"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-aurora ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Track info */}
              <div className="flex-1">
                <h3 className="text-xl font-display font-semibold text-soft-white">
                  {featuredTrack.title}
                </h3>
                <p className="text-muted-blue">{featuredTrack.artist}</p>
              </div>

              {/* Waveform visualization */}
              <div className="flex items-end gap-1 h-12">
                {waveformBars.map((bar, i) => (
                  <div
                    key={i}
                    className="w-1 bg-aurora/60 rounded-full transition-all duration-150"
                    style={{
                      height: isPlaying ? `${bar.height}%` : '20%',
                      transitionDuration: `${150 + Math.random() * 100}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="w-full h-1 bg-midnight/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-aurora to-sky-blue transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Artists grid */}
          <div ref={artistsRef} className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Bands */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-display font-semibold text-sky-blue mb-6">
                BANDS / GROUPS
              </h3>
              <div className="space-y-4">
                {getBands().map((artist, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-lg bg-midnight/50 hover:bg-midnight/70 transition-all duration-300 interactive"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-soft-white font-medium group-hover:text-aurora transition-colors">
                          {artist.name}
                        </h4>
                        {artist.note && (
                          <p className="text-sm text-muted-blue/70 mt-1">{artist.note}</p>
                        )}
                      </div>
                      <div className="w-2 h-2 bg-sky-blue/40 rounded-full group-hover:bg-aurora transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solo Artists */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-display font-semibold text-aurora-soft mb-6">
                ARTISTS
              </h3>
              <div className="space-y-4">
                {getSoloArtists().map((artist, index) => (
                  <div
                    key={index}
                    className="group p-4 rounded-lg bg-midnight/50 hover:bg-midnight/70 transition-all duration-300 interactive"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-soft-white font-medium group-hover:text-aurora transition-colors">
                        {artist.name}
                      </h4>
                      <div className="w-2 h-2 bg-aurora-soft/40 rounded-full group-hover:bg-aurora transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Guitar Journey */}
          <div ref={guitarRef} className="glass-panel p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎸</div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-3 sm:mb-4">
                GUITAR JOURNEY
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-sky-blue font-semibold mb-1 sm:mb-2">
                {guitarJourney.duration}
              </p>
              <p className="text-sm sm:text-base text-muted-blue italic">
                Still learning, still improving.
              </p>
            </div>

            {/* Timeline - Responsive */}
            <div className="relative mb-6 sm:mb-8 overflow-x-auto">
              <div className="min-w-max px-2">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-blue/30 via-aurora/50 to-sky-blue/30 hidden sm:block" />
                <div className="relative flex justify-between gap-2 sm:gap-4">
                  {guitarJourney.stages.map((stage, index) => (
                    <div key={index} className="text-center flex-shrink-0 w-20 sm:w-auto sm:flex-1">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 rounded-full bg-midnight border-2 border-aurora/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-aurora rounded-full" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-medium text-soft-white mb-0.5 sm:mb-1 truncate">
                        {stage.stage}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted-blue/70 line-clamp-2 hidden sm:block">
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Gear */}
            <div className="text-center px-2 sm:px-0">
              <h4 className="text-base sm:text-lg md:text-xl font-semibold text-soft-white mb-3 sm:mb-4">My Gear</h4>
              <a
                href="https://equipboard.com/nguyen_voi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group max-w-full"
              >
                <div className="px-4 sm:px-6 py-2 sm:py-3 bg-aurora/10 border-2 border-aurora/30 rounded-full hover:bg-aurora/20 hover:border-aurora/50 transition-all duration-300 group-hover:scale-105">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl">🎸</span>
                    <div className="text-left flex-shrink min-w-0">
                      <div className="text-sm sm:text-base text-aurora font-medium truncate">View My Gear Setup</div>
                      <div className="text-[10px] sm:text-xs text-gray-400 truncate">1 Guitar • 1 Multi-Effects • 7 Accessories</div>
                    </div>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-aurora group-hover:translate-x-1 transition-transform flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
