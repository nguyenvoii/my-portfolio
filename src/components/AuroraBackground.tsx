import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const AuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const snowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create aurora layers
    const createAurora = () => {
      if (!auroraRef.current) return;

      const aurora = auroraRef.current;
      const layers = 3;

      for (let i = 0; i < layers; i++) {
        const layer = document.createElement('div');
        layer.className = `absolute inset-0 opacity-20 mix-blend-screen`;
        layer.style.background = `radial-gradient(ellipse at ${30 + i * 20}% ${40 + i * 10}%, ${i === 1 ? 'rgba(123, 104, 238, 0.4)' : 'rgba(0, 245, 255, 0.3)'} 0%, transparent 50%)`;
        layer.style.filter = 'blur(60px)';
        aurora.appendChild(layer);

        // Animate aurora
        gsap.to(layer, {
          x: `${(i + 1) * 10}%`,
          y: `${(i + 1) * 5}%`,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    // Create snow particles
    const createSnow = () => {
      if (!snowRef.current) return;

      const snow = snowRef.current;
      const particleCount = 50; // Conservative for performance

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-white rounded-full particle';

        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 15; // Slower for cinematic feel
        const delay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.top = '-10px';
        particle.style.opacity = String(Math.random() * 0.5 + 0.2);

        snow.appendChild(particle);

        // Animate snow
        gsap.to(particle, {
          y: '110vh',
          x: `+=${Math.random() * 100 - 50}px`,
          duration,
          delay,
          repeat: -1,
          ease: 'none',
        });
      }
    };

    createAurora();
    createSnow();

    return () => {
      // Cleanup will be handled by React unmount
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight to-midnight" />

      {/* Aurora container */}
      <div ref={auroraRef} className="absolute inset-0" />

      {/* Snow container */}
      <div ref={snowRef} className="absolute inset-0" />

      {/* Fog effect */}
      <div className="absolute inset-0 opacity-10 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </div>
  );
};
