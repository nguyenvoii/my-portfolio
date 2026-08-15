import { useEffect, useRef } from 'react';

export const EnhancedAuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const auroraLayersRef = useRef<HTMLDivElement>(null);
  const snowBackRef = useRef<HTMLDivElement>(null);
  const snowFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create sophisticated aurora layers based on research
    const createAuroraLayers = () => {
      if (!auroraLayersRef.current) return;

      const aurora = auroraLayersRef.current;

      // Create multiple aurora layers for mesh gradient effect
      const layers = [
        { colors: ['rgba(0, 245, 255, 0.3)', 'rgba(123, 104, 238, 0.2)'], duration: 12 },
        { colors: ['rgba(123, 104, 238, 0.2)', 'rgba(0, 245, 255, 0.25)'], duration: 15 },
        { colors: ['rgba(0, 245, 255, 0.2)', 'rgba(74, 144, 226, 0.15)'], duration: 18 },
        { colors: ['rgba(123, 104, 238, 0.15)', 'rgba(0, 245, 255, 0.2)'], duration: 20 },
      ];

      layers.forEach((layer, index) => {
        const auroraLayer = document.createElement('div');
        auroraLayer.className = 'absolute inset-0 opacity-30 mix-blend-screen';
        auroraLayer.style.background = `
          radial-gradient(ellipse at ${30 + index * 15}% ${40 + index * 10}%,
            ${layer.colors[0]} 0%, transparent 50%),
          radial-gradient(ellipse at ${70 - index * 10}% ${60 - index * 5}%,
            ${layer.colors[1]} 0%, transparent 50%)
        `;
        auroraLayer.style.filter = 'blur(80px)';
        auroraLayer.style.animation = `aurora-drift ${layer.duration}s ease-in-out infinite alternate`;
        auroraLayer.style.animationDelay = `${index * 2}s`;
        aurora.appendChild(auroraLayer);
      });
    };

    // Create enhanced snow system based on performance research
    const createSnowParticles = () => {
      const backSnow = snowBackRef.current;
      const frontSnow = snowFrontRef.current;

      if (!backSnow || !frontSnow) return;

      // Background snow (fewer, slower, behind content)
      const backParticleCount = 60;
      for (let i = 0; i < backParticleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-white/20 rounded-full pointer-events-none';
        const size = Math.random() * 2 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 15 + 20; // Slower

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.top = '-10px';
        particle.style.opacity = String(Math.random() * 0.3 + 0.1);

        backSnow.appendChild(particle);

        // CSS animation for smooth performance
        particle.style.animation = `snow-fall ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
      }

      // Front snow (more particles, middle depth)
      const frontParticleCount = 80;
      for (let i = 0; i < frontParticleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute bg-white/40 rounded-full pointer-events-none';
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 12 + 15;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${startX}%`;
        particle.style.top = '-10px';
        particle.style.opacity = String(Math.random() * 0.5 + 0.2);

        frontSnow.appendChild(particle);

        particle.style.animation = `snow-fall ${duration}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
      }
    };

    // Add CSS keyframes dynamically
    const addKeyframes = () => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes aurora-drift {
          0% { transform: translateX(-5%) translateY(-3%) rotate(0deg); }
          50% { transform: translateX(5%) translateY(3%) rotate(2deg); }
          100% { transform: translateX(-3%) translateY(-2%) rotate(-1deg); }
        }

        @keyframes snow-fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    };

    createAuroraLayers();
    createSnowParticles();
    addKeyframes();

    return () => {
      // Cleanup
      if (snowBackRef.current) snowBackRef.current.innerHTML = '';
      if (snowFrontRef.current) snowFrontRef.current.innerHTML = '';
      if (auroraLayersRef.current) auroraLayersRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-midnight to-midnight" />

      {/* Aurora layers - z-index 1 */}
      <div ref={auroraLayersRef} className="absolute inset-0" style={{ zIndex: 1 }} />

      {/* Background snow - z-index 2 (behind content) */}
      <div ref={snowBackRef} className="absolute inset-0" style={{ zIndex: 2 }} />

      {/* Middle snow - z-index 3 (same depth as some content) */}
      <div ref={snowFrontRef} className="absolute inset-0" style={{ zIndex: 3 }} />

      {/* Fog effect - z-index 4 */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" style={{ zIndex: 4 }} />

      {/* Radial gradient overlay for depth - z-index 5 */}
      <div className="absolute inset-0 opacity-10 bg-gradient-radial from-aurora/10 via-transparent to-transparent pointer-events-none" style={{ zIndex: 5 }} />
    </div>
  );
};
