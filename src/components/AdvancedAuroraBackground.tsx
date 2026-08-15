import { useEffect, useRef } from 'react';

export const AdvancedAuroraBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // Create aurora particles
    const createAuroraParticles = () => {
      const colors = [
        'rgba(0, 245, 255, ',  // Cyan
        'rgba(123, 104, 238, ', // Purple
        'rgba(74, 144, 226, ',  // Blue
        'rgba(138, 43, 226, ',  // Purple-blue
        'rgba(0, 191, 255, ',   // Deep sky blue
      ];

      for (let i = 0; i < 120; i++) {
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

    // Create snow particles with better balance
    const createSnowParticles = () => {
      const particleCount = 250; // Balanced amount

      for (let i = 0; i < particleCount; i++) {
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

    createAuroraParticles();
    createSnowParticles();

    // Animation loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />
    </div>
  );
};