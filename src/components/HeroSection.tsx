import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/content';
import { animateHeroEntry, createParallax, checkReducedMotion } from '../utils/animations';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (checkReducedMotion()) {
      // Simple fade in for reduced motion
      if (nameRef.current) gsap.set(nameRef.current, { opacity: 1 });
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 1 });
      if (supportingRef.current) gsap.set(supportingRef.current, { opacity: 1 });
      if (avatarImgRef.current) gsap.set(avatarImgRef.current, { opacity: 1 });
      return;
    }

    // Initial entry animation
    if (nameRef.current && taglineRef.current && supportingRef.current && avatarImgRef.current) {
      animateHeroEntry({
        name: nameRef.current,
        tagline: taglineRef.current,
        supporting: supportingRef.current,
        avatar: avatarImgRef.current,
      });
    }

    // Scroll-based camera movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Move avatar and create parallax
    if (avatarRef.current) {
      createParallax(avatarRef.current, 0.3);

      tl.to(avatarRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 1,
      });
    }

    // Fade out text
    if (nameRef.current) {
      tl.to(
        nameRef.current,
        {
          y: -100,
          opacity: 0,
          duration: 1,
        },
        0
      );
    }

    if (taglineRef.current) {
      tl.to(
        taglineRef.current,
        {
          y: -50,
          opacity: 0,
          duration: 1,
        },
        0.2
      );
    }

    if (supportingRef.current) {
      tl.to(
        supportingRef.current,
        {
          y: -30,
          opacity: 0,
          duration: 1,
        },
        0.4
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      className="container-section min-h-screen relative overflow-hidden"
    >
      <div className="container-content relative z-10">
        {/* Avatar */}
        <div
          ref={avatarRef}
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-0"
        >
          <div className="relative w-full h-full">
            {/* Avatar glow */}
            <div className="absolute inset-0 bg-aurora/20 rounded-full blur-3xl animate-pulse-soft" />

            {/* Avatar image */}
            <div className="relative w-full h-full rounded-full overflow-hidden aurora-glow">
              <img
                ref={avatarImgRef}
                src="/assets/avatar.jpg"
                alt="Nguyễn Voi - Guitarist & Developer"
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                loading="eager"
              />
            </div>

            {/* Floating particles around avatar */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-aurora/40 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${4 + Math.random() * 4}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl">
          {/* Main name */}
          <h1
            ref={nameRef}
            className="text-hero font-display font-bold text-gradient text-glow mb-6 opacity-0"
          >
            {personalInfo.name}
          </h1>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-subtitle font-display font-medium text-sky-blue mb-4 opacity-0"
          >
            {personalInfo.tagline}
          </p>

          {/* Supporting line */}
          <p
            ref={supportingRef}
            className="text-xl text-muted-blue max-w-2xl opacity-0"
          >
            {personalInfo.taglineExtended}
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-0 animate-bounce">
            <div className="flex items-center gap-2 text-muted-blue/60">
              <span className="text-sm">Scroll to enter</span>
              <svg
                className="w-5 h-5 animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-midnight/50" />

        {/* Scan line effect */}
        <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#000_1px,#000_2px)]" />
      </div>
    </section>
  );
};
