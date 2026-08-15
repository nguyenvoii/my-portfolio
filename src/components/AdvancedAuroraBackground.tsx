import { useEffect, useRef, useState } from 'react';

export const AdvancedAuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detect if user prefers reduced motion or has low-end device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || /(android|iphone|ipad|ipod)/i.test(navigator.userAgent);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Aurora particle system
    interface AuroraParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      phase: number;
    }

    const auroraParticles: AuroraParticle[] = [];

    // Progressive particle loading
    let currentAuroraCount = 60; // Start with 60 particles
    const targetAuroraCount = prefersReducedMotion || isLowEndDevice ? 80 : 120;

    const createAuroraParticles = (count: number) => {
      const colors = [
        'rgba(0, 245, 255, ',  // Cyan
        'rgba(123, 104, 238, ', // Purple
        'rgba(74, 144, 226, ',  // Blue
        'rgba(138, 43, 226, ',  // Purple-blue
        'rgba(0, 191, 255, ',   // Deep sky blue
      ];

      for (let i = 0; i < count; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        auroraParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 180 + 80,
          color: color,
          alpha: Math.random() * 0.12 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    // Snow particle system
    interface SnowParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      layer: number;
    }

    const snowParticles: SnowParticle[] = [];

    let currentSnowCount = 100; // Start with 100 particles
    const targetSnowCount = prefersReducedMotion || isLowEndDevice ? 150 : 250;

    const createSnowParticles = (count: number) => {
      for (let i = 0; i < count; i++) {
        const layer = Math.random() < 0.33 ? 0 : Math.random() < 0.66 ? 1 : 2;
        const sizeMultiplier = layer === 0 ? 0.5 : layer === 1 ? 0.75 : 1;

        snowParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: Math.random() * 1.2 + 0.4,
          size: (Math.random() * 1.8 + 0.8) * sizeMultiplier,
          alpha: (Math.random() * 0.25 + 0.08) * (layer === 0 ? 0.5 : layer === 1 ? 0.7 : 0.9),
          layer,
        });
      }
    };

    // Initial load
    createAuroraParticles(currentAuroraCount);
    createSnowParticles(currentSnowCount);

    // Progressive loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Add more particles progressively
    const progressiveLoad = setInterval(() => {
      if (currentAuroraCount < targetAuroraCount) {
        const addCount = Math.min(20, targetAuroraCount - currentAuroraCount);
        createAuroraParticles(addCount);
        currentAuroraCount += addCount;
      }

      if (currentSnowCount < targetSnowCount) {
        const addCount = Math.min(30, targetSnowCount - currentSnowCount);
        createSnowParticles(addCount);
        currentSnowCount += addCount;
      }

      if (currentAuroraCount >= targetAuroraCount && currentSnowCount >= targetSnowCount) {
        clearInterval(progressiveLoad);
        setIsOptimized(true);
      }
    }, 1000);

    // Animation loop with performance optimization
    let animationFrameId: number;
    let time = 0;
    let lastFrameTime = performance.now();
    const targetFPS = prefersReducedMotion ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= frameInterval) {
        lastFrameTime = currentTime - (deltaTime % frameInterval);
        time += 0.008;

        // Clear canvas with gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0a0e1a');
        gradient.addColorStop(0.5, '#0d111d');
        gradient.addColorStop(1, '#0d111d');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw aurora
        auroraParticles.forEach((particle) => {
          // Update position with wave motion
          particle.x += particle.vx + Math.sin(time + particle.phase) * 0.25;
          particle.y += particle.vy + Math.cos(time + particle.phase * 0.4) * 0.15;

          // Wrap around screen
          if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
          if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
          if (particle.y < -particle.size) particle.y = canvas.height * 0.6 + particle.size;
          if (particle.y > canvas.height * 0.6 + particle.size) particle.y = -particle.size;

          // Draw aurora glow
          const glowGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          glowGradient.addColorStop(0, particle.color + particle.alpha + ')');
          glowGradient.addColorStop(0.5, particle.color + (particle.alpha * 0.4) + ')');
          glowGradient.addColorStop(1, particle.color + '0)');

          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw snow particles by layer (back to front)
        [0, 1, 2].forEach(layer => {
          snowParticles.filter(p => p.layer === layer).forEach(particle => {
            // Update position
            particle.x += particle.vx + Math.sin(time + particle.x * 0.008) * 0.08;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) {
              particle.y = canvas.height;
              particle.x = Math.random() * canvas.width;
            }
            if (particle.y > canvas.height) {
              particle.y = 0;
              particle.x = Math.random() * canvas.width;
            }

            // Draw snow particle with soft opacity
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          });
        });

        // Add aurora wave overlay
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < 2; i++) {
          const waveY = canvas.height * 0.25 + Math.sin(time + i * 1.5) * 40;
          const waveGradient = ctx.createLinearGradient(0, waveY - 80, 0, waveY + 80);
          waveGradient.addColorStop(0, 'rgba(0, 245, 255, 0)');
          waveGradient.addColorStop(0.5, `rgba(${i === 0 ? '0, 245, 255' : '123, 104, 238'}, 0.02)`);
          waveGradient.addColorStop(1, 'rgba(0, 245, 255, 0)');

          ctx.fillStyle = waveGradient;
          ctx.fillRect(0, waveY - 80, canvas.width, 160);
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(progressiveLoad);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-midnight z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-aurora/20 border-t-aurora rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Loading experience...</p>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      {/* Performance indicator */}
      {isOptimized && !isLoading && (
        <div className="absolute bottom-4 left-4 text-xs text-gray-600 pointer-events-none">
          Optimized performance
        </div>
      )}
    </div>
  );
};