import { useEffect, useRef, useState } from 'react';

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMusicSection, setIsMusicSection] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Move dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      // Move ring with slight delay
      if (ringRef.current) {
        setTimeout(() => {
          if (ringRef.current) {
            ringRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
          }
        }, 50);
      }
    };

    const checkHoverTarget = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering over interactive elements
      const interactiveSelectors = [
        'a',
        'button',
        '.interactive',
        '[role="button"]',
      ];

      const isInteractive = interactiveSelectors.some(selector =>
        target.closest(selector)
      );

      setIsHovering(isInteractive);

      // Check if in music section
      const musicSection = target.closest('#section-music');
      setIsMusicSection(!!musicSection);
    };

    const handleMouseOver = (e: MouseEvent) => {
      checkHoverTarget(e);
    };

    const handleMouseOut = (e: MouseEvent) => {
      checkHoverTarget(e);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (window.innerWidth < 768) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className={`custom-cursor cursor-dot transition-transform duration-75 ${
          isHovering ? 'scale-150' : ''
        } ${isMusicSection ? 'bg-aurora animate-pulse-soft' : ''}`}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring transition-all duration-300 ${
          isHovering
            ? 'scale-150 border-aurora-soft'
            : 'border-aurora'
        } ${isMusicSection ? 'border-sky-blue/50' : ''}`}
      />

      {/* Interactive hint */}
      {isHovering && (
        <div
          className="custom-cursor pointer-events-none text-xs text-aurora/80 font-mono"
          style={{
            transform: `translate(${position.x + 20}px, ${position.y + 20}px)`,
          }}
        >
          {isMusicSection ? '♪' : '→'}
        </div>
      )}
    </>
  );
};
