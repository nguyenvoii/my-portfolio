import { useEffect, useRef, useState } from 'react';

interface SnowParticle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  size: number;
  alpha: number;
}

export const AdvancedAuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set canvas size with proper device pixel ratio scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize snow particles
    const snowParticles: SnowParticle[] = [];
    const snowCount = prefersReducedMotion ? 30 : 150;

    for (let i = 0; i < snowCount; i++) {
      snowParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vy: 0.3 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.1,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.4
      });
    }

    let animationFrameId: number;
    let time = 0;

    // Draw DARKER gradient overlay
    const drawGradientOverlay = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Darker gradient - user requested darker background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);

      // Start darker (more opacity)
      gradient.addColorStop(0, 'rgba(10, 10, 15, 0.3)');
      gradient.addColorStop(0.3, 'rgba(10, 22, 40, 0.5)'); // Darker midnight tint
      gradient.addColorStop(0.7, 'rgba(26, 42, 74, 0.7)'); // Darker blue-black tint
      gradient.addColorStop(1, 'rgba(10, 22, 40, 0.9)'); // Much darker at bottom

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add stronger vignette effect for depth
      const vignetteGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height * 0.3,
        width / 2,
        height / 2,
        height * 0.8
      );
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0.2)'); // Darker center
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)'); // Darker edges

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Draw snow particles
    const drawSnowParticles = () => {
      snowParticles.forEach((particle) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    // Update snow positions
    const updateSnowParticles = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      snowParticles.forEach((particle) => {
        particle.y += particle.vy;
        particle.x += particle.vx;

        if (particle.y > height + 10) {
          particle.y = -10;
          particle.x = Math.random() * width;
        }
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
      });
    };

    // Main animation loop
    const animate = () => {
      time += 1;

      // Clear canvas completely each frame
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      // Draw darker gradient overlay
      drawGradientOverlay();

      // Update and draw snow
      if (!prefersReducedMotion || time % 10 === 0) {
        updateSnowParticles();
        drawSnowParticles();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation and mark as ready
    setIsReady(true);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none aurora-bg" style={{ zIndex: 1 }}>
      {!isReady && (
        <div className="absolute inset-0 bg-fade-start flex items-center justify-center">
          <div className="w-16 h-16 mx-auto border-4 border-aurora-mid/20 border-t-aurora-deep rounded-full animate-spin" />
        </div>
      )}

      {/* Canvas overlays on top of CSS aurora */}
      <canvas ref={canvasRef} className="absolute inset-0" style={{ mixBlendMode: 'screen' }} />
    </div>
  );
};
