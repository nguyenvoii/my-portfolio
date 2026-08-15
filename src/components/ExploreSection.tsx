import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hobbies } from '../data/content';

export const ExploreSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hobbiesRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);

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

    if (hobbiesRef.current) {
      tl.from(
        hobbiesRef.current.children,
        {
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    if (musicRef.current) {
      tl.from(
        musicRef.current,
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

  return (
    <section
      id="section-explore"
      ref={sectionRef}
      className="container-section relative"
    >
      <div className="container-content">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6"
            >
              EXPLORE
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl text-muted-blue max-w-2xl mx-auto"
            >
              Beyond programming. The things that make me who I am.
            </p>
          </div>

          {/* Hobbies grid */}
          <div ref={hobbiesRef} className="grid md:grid-cols-2 gap-6 mb-12">
            {hobbies.map((hobby) => (
              <div
                key={hobby.id}
                className="glass-panel p-8 hover:border-aurora/30 transition-all duration-500 interactive group"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {hobby.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-semibold text-soft-white mb-3 group-hover:text-aurora transition-colors">
                      {hobby.title}
                    </h3>
                    <p className="text-muted-blue leading-relaxed mb-4">
                      {hobby.description}
                    </p>

                    {/* Items list */}
                    {hobby.items && (
                      <div className="flex flex-wrap gap-2">
                        {hobby.items.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-midnight/60 text-sm text-sky-blue/80 rounded-full border border-sky-blue/20"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora/20 group-hover:border-aurora/40 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* SAO Influence Section */}
          <div
            ref={musicRef}
            className="glass-panel p-8 md:p-12 border-l-4 border-l-sky-blue"
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-4xl mb-6">⚔️</div>
              <h3 className="text-3xl font-display font-bold text-soft-white mb-6">
                Sword Art Online
              </h3>
              <p className="text-lg text-muted-blue leading-relaxed mb-6">
                Sword Art Online has been one of the works that influenced me, especially because of
                its world-building, virtual reality concepts, and the relationship between virtual
                worlds and real life.
              </p>
              <p className="text-muted-blue/70 italic">
                What interests me most: world-building, virtual reality, technology, and the idea of
                people experiencing meaningful lives inside digital worlds.
              </p>

              {/* Subtle virtual world reference */}
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-2 h-2 bg-aurora/40 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-aurora/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-aurora/80 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
