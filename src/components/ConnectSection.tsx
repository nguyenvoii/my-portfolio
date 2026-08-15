import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { socialLinks, personalInfo } from '../data/content';

export const ConnectSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const avatarReturnRef = useRef<HTMLDivElement>(null);

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

    if (socialRef.current) {
      tl.from(
        socialRef.current.children,
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

    if (avatarReturnRef.current) {
      tl.from(
        avatarReturnRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="section-connect"
      ref={sectionRef}
      className="container-section relative overflow-hidden"
    >
      {/* Return of aurora atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-deep-space to-midnight opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-aurora/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-content relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar returns - connecting back to hero */}
          <div
            ref={avatarReturnRef}
            className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden aurora-glow"
          >
            <img
              src="/assets/avatar.jpg"
              alt={personalInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Section header */}
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl font-display font-bold text-gradient mb-6"
          >
            COME SAY HI.
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-muted-blue mb-12 max-w-2xl mx-auto"
          >
            I'm always happy to meet people who share the same interests.
          </p>

          {/* Social links */}
          <div ref={socialRef} className="flex flex-wrap justify-center gap-6 mb-16">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.url ? '_blank' : undefined}
                rel={link.url ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-6 py-4 glass-panel hover:border-aurora/50 transition-all duration-300 interactive"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <div className="text-left">
                  <div className="text-xs text-muted-blue/70 uppercase tracking-wider">
                    {link.platform}
                  </div>
                  <div className="text-soft-white font-medium group-hover:text-aurora transition-colors">
                    {link.platform === 'Email' ? link.username : `@${link.username}`}
                  </div>
                </div>

                {/* Arrow for external links */}
                {link.url && (
                  <svg
                    className="w-4 h-4 text-muted-blue/50 group-hover:text-aurora group-hover:translate-x-1 transition-all duration-300"
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
                )}
              </a>
            ))}
          </div>

          {/* Final message */}
          <div className="glass-panel p-8 max-w-2xl mx-auto">
            <p className="text-lg text-soft-white/80 leading-relaxed mb-4">
              Thanks for visiting my personal space.
            </p>
            <p className="text-muted-blue italic">
              Whether you're into music, programming, anime, or just exploring — I'd love to
              connect.
            </p>
          </div>

          {/* Ending signature */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 glass-panel">
              <div className="text-aurora animate-pulse">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-soft-white font-medium">
                Built with logic & melody
              </span>
              <div className="w-px h-6 bg-sky-blue/30" />
              <span className="text-muted-blue text-sm">
                Nguyễn Voi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Final calm atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle snow at the end */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-snow-fall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};
