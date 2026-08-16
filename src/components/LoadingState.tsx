import { useState, useEffect } from 'react';

interface LoadingStateProps {
  onComplete: () => void;
}

export const LoadingState = ({ onComplete }: LoadingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Color interpolation helper
  const lerpColor = (color1: string, color2: string, t: number): string => {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    if (!c1 || !c2) return color1;

    const r = Math.round(c1.r + (c2.r - c1.r) * t);
    const g = Math.round(c1.g + (c2.g - c1.g) * t);
    const b = Math.round(c1.b + (c2.b - c1.b) * t);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    const minLoadTime = 1500; // 1.5 seconds for faster loading
    let hasReached100 = false;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minLoadTime) * 100, 100);
      setProgress(newProgress);

      // Only start exit when progress reaches exactly 100% and stays there
      if (newProgress >= 100 && !hasReached100) {
        hasReached100 = true;
        // Wait a moment at 100% then start exit animation
        setTimeout(() => {
          setIsExiting(true);
          // Complete after exit animation
          setTimeout(() => onComplete(), 800);
        }, 400);
        return; // Stop animation loop
      }

      if (newProgress < 100) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      hasReached100 = true; // Prevent any pending callbacks
    };
  }, [onComplete]);

  // Calculate dynamic background gradient based on progress
  const bgGradient = `linear-gradient(180deg,
    ${lerpColor('#0a0a0f', '#0a1628', Math.min(progress * 0.3 / 100, 1))} 0%,
    ${lerpColor('#0a1628', '#1a2a4a', Math.min(progress * 0.6 / 100, 1))} 50%,
    ${lerpColor('#1a2a4a', '#00f5ff', Math.min(progress * 0.4 / 100, 1))} 100%
  )`;

  // Aurora pulse effect based on progress
  const auroraPulse = Math.sin((progress / 100) * Math.PI) * 0.8;
  const auroraOpacity = (progress / 100) * 0.6;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${
        isExiting ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-1000 ease-in-out`}
    >
      {/* Simple elegant background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, #0a0a0f 0%, #0a1628 50%, #1a2a4a 100%)`,
        }}
      />

      {/* Single aurora glow effect */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(0, 245, 255, ${auroraOpacity * 0.4}) 0%, rgba(123, 104, 238, ${auroraOpacity * 0.2}) 50%, transparent 70%)`,
          opacity: auroraPulse,
          transform: `scale(${1 + progress * 0.003})`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        }}
      />

      {/* Loading Content */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6">
        <div className="text-center space-y-6">
          {/* Simple title */}
          <h2 className="text-xl font-medium text-soft-white/90">
            Loading experience
          </h2>

          {/* Elegant progress circle */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full border-2 border-white/5" />

              {/* Progress arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#auroraGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} 283`}
                  className="transition-all duration-300 ease-out"
                  style={{
                    filter: `drop-shadow(0 0 8px rgba(0, 245, 255, ${auroraOpacity * 0.6}))`
                  }}
                />
                <defs>
                  <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="50%" stopColor="#7b68ee" />
                    <stop offset="100%" stopColor="#4a90e2" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Percentage in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-semibold" style={{ color: '#00f5ff' }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>

          {/* Status message */}
          <div className="h-6">
            <span className="text-sm text-gray-400 transition-all duration-300">
              {progress < 25 && 'Initializing...'}
              {progress >= 25 && progress < 50 && 'Loading assets...'}
              {progress >= 50 && progress < 75 && 'Preparing components...'}
              {progress >= 75 && progress < 100 && 'Almost ready...'}
              {progress >= 100 && 'Welcome! ✨'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
