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
      {/* Dynamic Background with Gradient Fade */}
      <div
        className="absolute inset-0"
        style={{
          background: bgGradient,
          transition: 'background 0.3s ease-out'
        }}
      />

      {/* Noise overlay for texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/png;base64,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")`
        }}
      />

      {/* Aurora Core - Pulsing Center */}
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(0, 245, 255, ${auroraOpacity}) 0%, rgba(123, 104, 238, ${auroraOpacity * 0.6}) 50%, transparent 70%)`,
          opacity: auroraPulse,
          transform: `scale(${1 + progress * 0.005})`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
        }}
      />

      {/* Secondary Aurora Ring */}
      <div
        className="absolute w-64 h-64 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, rgba(74, 144, 226, ${auroraOpacity * 0.8}) 0%, transparent 60%)`,
          opacity: auroraPulse * 0.7,
          transform: `scale(${1 + progress * 0.008})`,
          transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          animationDelay: '0.5s'
        }}
      />

      {/* Loading Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        {/* Aurora Spinner */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            {/* Outer Ring */}
            <div
              className="w-24 h-24 border-4 border-transparent rounded-full animate-spin"
              style={{
                borderTopColor: `rgba(0, 245, 255, ${0.3 + progress * 0.005})`,
                borderRightColor: `rgba(123, 104, 238, ${0.2 + progress * 0.004})`,
                transition: 'border-color 0.3s ease-out'
              }}
            />

            {/* Inner Ring */}
            <div
              className="absolute inset-2 w-20 h-20 border-3 border-transparent rounded-full animate-spin"
              style={{
                animationDirection: 'reverse',
                borderBottomColor: `rgba(74, 144, 226, ${0.4 + progress * 0.006})`,
                borderLeftColor: `rgba(0, 245, 255, ${0.3 + progress * 0.005})`,
                transition: 'border-color 0.3s ease-out'
              }}
            />

            {/* Core */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: 0.5 + progress * 0.005
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle, #00f5ff 0%, #7b68ee 100%)`,
                  boxShadow: `0 0 20px rgba(0, 245, 255, ${auroraOpacity}), 0 0 40px rgba(123, 104, 238, ${auroraOpacity * 0.6})`
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-8">
          <h2 className="text-2xl font-semibold" style={{ color: '#f8f9fa' }}>
            Getting things ready...
          </h2>

          {/* Aurora Energy Cup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Steam Effects */}
              <div className="steam-effect" style={{
                position: 'absolute',
                width: '8px',
                height: '25px',
                background: 'linear-gradient(to top, rgba(0, 245, 255, 0.8), transparent)',
                borderRadius: '10px',
                top: '-35px',
                left: '15px',
                animation: 'steam 1.5s linear infinite',
                animationDelay: '0.2s',
                filter: 'blur(2px)',
                opacity: auroraOpacity
              }} />
              <div className="steam-effect" style={{
                position: 'absolute',
                width: '8px',
                height: '25px',
                background: 'linear-gradient(to top, rgba(123, 104, 238, 0.8), transparent)',
                borderRadius: '10px',
                top: '-35px',
                left: '35px',
                animation: 'steam 1.5s linear infinite',
                animationDelay: '0.5s',
                filter: 'blur(2px)',
                opacity: auroraOpacity
              }} />
              <div className="steam-effect" style={{
                position: 'absolute',
                width: '8px',
                height: '25px',
                background: 'linear-gradient(to top, rgba(74, 144, 226, 0.8), transparent)',
                borderRadius: '10px',
                top: '-35px',
                left: '55px',
                animation: 'steam 1.5s linear infinite',
                animationDelay: '0.8s',
                filter: 'blur(2px)',
                opacity: auroraOpacity
              }} />

              {/* Energy Cup */}
              <div
                className="cup-container"
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '70px',
                  border: '4px solid #00f5ff',
                  borderTop: '0',
                  borderRadius: '0 0 20px 20px',
                  background: `linear-gradient(180deg, #7b68ee 0%, #4a90e2 50%, #00f5ff 100%)`,
                  backgroundSize: '100% 200%',
                  backgroundPosition: `0 ${80 - (progress * 0.8)}px`,
                  boxShadow: `0 0 20px rgba(0, 245, 255, ${auroraOpacity * 0.5})`,
                  transition: 'background-position 0.1s linear'
                }}
              >
                {/* Cup Handle */}
                <div
                  style={{
                    position: 'absolute',
                    right: '-25px',
                    top: '10px',
                    width: '25px',
                    height: '30px',
                    border: '4px solid #00f5ff',
                    borderLeft: '0',
                    borderRadius: '0 15px 15px 0',
                    boxShadow: '0 0 10px rgba(0, 245, 255, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, #00f5ff 0%, #7b68ee 50%, #4a90e2 100%)`,
                  boxShadow: `0 0 10px rgba(0, 245, 255, ${auroraOpacity * 0.8})`
                }}
              />
            </div>

            {/* Progress Messages */}
            <div className="flex justify-between mt-3 items-center">
              <span className="text-sm transition-all duration-300" style={{ color: '#8fa3bf' }}>
                {progress < 20 && 'Warming up...'}
                {progress >= 20 && progress < 40 && 'Picking some colors...'}
                {progress >= 40 && progress < 60 && 'Setting things up...'}
                {progress >= 60 && progress < 80 && 'Adding a little magic...'}
                {progress >= 80 && progress < 100 && 'Almost there... ✨'}
                {progress >= 100 && 'Welcome! ♡'}
              </span>
              <span className="text-sm font-semibold" style={{ color: '#00f5ff' }}>
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Light Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top ambient */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/3 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, rgba(0, 245, 255, ${auroraOpacity * 0.3}) 0%, transparent 70%)`,
            transition: 'opacity 0.3s ease-out'
          }}
        />

        {/* Bottom ambient */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/3 blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, rgba(123, 104, 238, ${auroraOpacity * 0.2}) 0%, transparent 70%)`,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      </div>
    </div>
  );
};
