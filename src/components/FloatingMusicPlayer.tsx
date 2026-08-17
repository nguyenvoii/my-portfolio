import { useState, useRef, useEffect, useMemo } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

const BAR_COUNT = 16;

// Bell-curve shaped bars: tall in the middle, short at the edges,
// each with its own peak/duration/delay so the wave undulates outward
// from the center instead of every bar pulsing to the same height.
const waveBars = [...Array(BAR_COUNT)].map((_, i) => {
  const center = (BAR_COUNT - 1) / 2;
  const distance = Math.abs(i - center) / center; // 0 = center, 1 = edge
  const amplitude = 1 - distance * 0.7;
  const peak = Math.round(35 + amplitude * 55 + Math.random() * 10);
  const duration = 0.7 + Math.random() * 0.4 + distance * 0.3;
  const delay = distance * 0.18 + Math.random() * 0.08;
  return { peak, duration, delay };
});

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bars = useMemo(() => waveBars, []);

  useEffect(() => {
    // Auto-play after loading
    const timer = setTimeout(async () => {
      const audio = audioRef.current;
      if (audio) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.log('Auto-play blocked');
        }
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.play().catch(console.log);
    } else {
      audio?.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="fixed bottom-20 sm:bottom-4 right-2 sm:right-4 z-40">
      <div className="glass-panel px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-aurora/20 hover:border-aurora/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md max-w-[200px] sm:max-w-none">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={togglePlay}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-aurora/15 border border-aurora/30 flex items-center justify-center hover:bg-aurora/25 hover:border-aurora/50 transition-all duration-300 flex-shrink-0"
          >
            {isPlaying ? (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="text-left min-w-0">
            <div className="text-[10px] sm:text-xs font-medium text-soft-white truncate leading-tight">unlasting</div>
            <div className="text-[8px] sm:text-[10px] text-gray-400 truncate leading-tight">LiSA • SAO</div>
          </div>

          <div className="hidden sm:flex items-end gap-1 h-4 sm:h-5 md:h-6">
            {bars.map((bar, i) => (
              <div
                key={i}
                className="w-1 bg-aurora/60 rounded-full"
                style={{
                  animation: isPlaying
                    ? `wave ${bar.duration}s ease-in-out infinite`
                    : 'none',
                  animationDelay: `${bar.delay}s`,
                  height: '20%',
                  ['--peak' as string]: `${bar.peak}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes wave {
            0%, 100% { height: 20%; opacity: 0.6; }
            50% { height: var(--peak); opacity: 1; }
          }
        `}
      </style>

      <audio
        ref={audioRef}
        src={unlastingMp3}
        loop
        preload="auto"
      />
    </div>
  );
};