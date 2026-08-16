import { useState, useEffect } from 'react';

interface LoadingStateProps {
  onComplete: () => void;
}

export const LoadingState = ({ onComplete }: LoadingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    let rafId: number;
    const minLoadTime = 1800; // Slightly longer for better experience
    let hasReached100 = false;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minLoadTime) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100 && !hasReached100) {
        hasReached100 = true;
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => onComplete(), 600);
        }, 300);
        return;
      }

      if (newProgress < 100) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      hasReached100 = true;
    };
  }, [onComplete]);

  // Aurora colors based on progress
  const auroraIntensity = progress / 100;
  const glowOpacity = Math.min(0.3 + auroraIntensity * 0.4, 0.7);

  // Contextual microcopy based on progress
  const getLoadingMessage = (prog: number) => {
    if (prog < 20) return 'Warming up...';
    if (prog < 40) return 'Loading assets...';
    if (prog < 60) return 'Building experience...';
    if (prog < 80) return 'Adding finishing touches...';
    if (prog < 100) return 'Almost ready...';
    return 'Welcome! ✨';
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${
        isExiting ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-700 ease-out`}
    >
      {/* Aurora gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, rgba(0, 245, 255, ${glowOpacity * 0.15}) 0%, rgba(123, 104, 238, ${glowOpacity * 0.1}) 40%, transparent 70%), linear-gradient(180deg, #0a0a0f 0%, #0a1628 100%)`,
        }}
      />

      {/* Ambient aurora glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, rgba(0, 245, 255, ${glowOpacity * 0.2}) 0%, rgba(123, 104, 238, ${glowOpacity * 0.15}) 30%, transparent 70%)`,
          opacity: auroraIntensity,
          transform: `scale(${0.8 + auroraIntensity * 0.2})`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-8">
        <div className="text-center space-y-8">
          {/* Brand/Title */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aurora via-sky-blue to-aurora bg-[length:200%_auto] animate-gradient">
              Loading Portfolio
            </h1>
            <p className="text-sm text-gray-400">
              {getLoadingMessage(progress)}
            </p>
          </div>

          {/* Modern progress bar with glow */}
          <div className="space-y-4">
            {/* Progress bar container */}
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
              {/* Glow effect behind bar */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-50"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(0, 245, 255, ${glowOpacity}), transparent)`,
                  transform: `scaleX(${progress / 100})`,
                  transformOrigin: 'left',
                  transition: 'transform 0.1s linear'
                }}
              />

              {/* Actual progress bar */}
              <div
                className="h-full rounded-full transition-all duration-100 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00f5ff, #7b68ee, #4a90e2)',
                  backgroundSize: '200% 100%',
                  boxShadow: `0 0 20px rgba(0, 245, 255, ${glowOpacity * 0.8})`
                }}
              />
            </div>

            {/* Progress details */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Preparing your experience
              </span>
              <span className="text-sm font-semibold" style={{ color: '#00f5ff' }}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          {/* Subtle loading hint */}
          <div className="pt-4">
            <p className="text-xs text-gray-600 italic">
              Building with logic & melody
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
