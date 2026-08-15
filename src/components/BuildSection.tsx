import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/content';

export const BuildSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create digital particles for this section
    const createParticles = () => {
      if (!particlesRef.current) return;

      const particleCount = 30;
      const particles = particlesRef.current;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-aurora/20 rounded-full';
        particle.style.width = `${Math.random() * 4 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particles.appendChild(particle);

        // Floating animation
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}px`,
          x: `+=${Math.random() * 100 - 50}px`,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    createParticles();

    // Section animations
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

    if (skillsRef.current) {
      tl.from(
        skillsRef.current.children,
        {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Group skills by category
  const developmentSkills = skills.filter(s => s.category === 'development');
  const dataSkills = skills.filter(s => s.category === 'data');

  return (
    <section
      id="section-build"
      ref={sectionRef}
      className="container-section relative overflow-hidden"
    >
      {/* Digital transformation effects */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Grid overlay for digital feel */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container-content relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6"
            >
              BUILDING WITH CODE
            </h2>
            <p
              ref={subtitleRef}
              className="text-xl text-muted-blue max-w-2xl mx-auto"
            >
              Currently exploring software development and building technical foundations.
            </p>
          </div>

          {/* Skills display */}
          <div ref={skillsRef} className="grid md:grid-cols-2 gap-8">
            {/* Development Skills */}
            <div className="glass-panel p-8 border-t-4 border-t-sky-blue">
              <h3 className="text-2xl font-display font-semibold text-sky-blue mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-sky-blue rounded-full animate-pulse" />
                DEVELOPMENT
              </h3>
              <div className="space-y-4">
                {developmentSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative p-4 rounded-lg bg-midnight/50 hover:bg-midnight/70 transition-all duration-300 cursor-default interactive"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-soft-white font-medium">
                        {skill.name}
                      </span>
                      <div className="w-2 h-2 bg-aurora/60 rounded-full group-hover:bg-aurora group-hover:aurora-glow transition-all duration-300" />
                    </div>
                    {/* Subtle code decoration */}
                    <div className="absolute top-0 right-0 text-aurora/20 text-xs font-mono">
                      &lt;/&gt;
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Skills */}
            <div className="glass-panel p-8 border-t-4 border-t-aurora-soft">
              <h3 className="text-2xl font-display font-semibold text-aurora-soft mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-aurora-soft rounded-full animate-pulse" />
                DATA
              </h3>
              <div className="space-y-4">
                {dataSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group relative p-4 rounded-lg bg-midnight/50 hover:bg-midnight/70 transition-all duration-300 cursor-default interactive"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-soft-white font-medium">
                        {skill.name}
                      </span>
                      <div className="w-2 h-2 bg-aurora/60 rounded-full group-hover:bg-aurora group-hover:aurora-glow transition-all duration-300" />
                    </div>
                    {/* Subtle data decoration */}
                    <div className="absolute top-0 right-0 text-aurora-soft/20 text-xs font-mono">
                      {`{ }`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning statement */}
          <div className="mt-12 text-center">
            <p className="text-muted-blue/80 italic">
              "Continuously learning and building. Each project is a step forward."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
