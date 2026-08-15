import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const GearSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gearCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate section entry
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          gearCardRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
    >
      {/* Section Title */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-soft-white mb-6"
        >
          My <span className="text-aurora">Gear</span>
        </h2>
        <p
          ref={contentRef}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl"
        >
          Check out my complete gear setup and equipment
        </p>
      </div>

      {/* Gear Card - Clickable */}
      <div className="max-w-6xl mx-auto">
        <a
          href="https://equipboard.com/nguyen_voi"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <div ref={gearCardRef} className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-aurora/20 aurora-glow hover:border-aurora/50 hover:scale-[1.02] transition-all duration-300">
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-aurora/10 to-sky-blue/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-soft-white mb-2">
                    Nguyễn Voi's Gear Board
                  </h3>
                  <p className="text-gray-400">
                    Guitars • Amps • Effects • Accessories
                  </p>
                </div>
                <div className="text-5xl">🎸</div>
              </div>

              {/* Gear Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-aurora mb-1">1</div>
                  <div className="text-xs sm:text-sm text-gray-400">Guitars</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-aurora mb-1">1</div>
                  <div className="text-xs sm:text-sm text-gray-400">Amps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-aurora mb-1">3</div>
                  <div className="text-xs sm:text-sm text-gray-400">Effects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-aurora mb-1">5</div>
                  <div className="text-xs sm:text-sm text-gray-400">Accessories</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-aurora/20 border-2 border-aurora/40 hover:bg-aurora/30 hover:border-aurora/60 transition-all duration-300 group-hover:scale-105">
                  <span className="text-soft-white font-medium">View Full Gear List</span>
                  <svg
                    className="w-5 h-5 text-aurora group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Particles Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-aurora/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};