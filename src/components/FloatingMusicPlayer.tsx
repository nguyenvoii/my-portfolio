import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

// Type for browser setInterval/setTimeout
type TimerId = ReturnType<typeof setInterval> | null;

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Start paused, auto-play after loading
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<TimerId>(null);

  useEffect(() => {
    // Auto-play after website loads (when loading completes)
    const autoPlayTimer = setTimeout(async () => {
      const audio = audioRef.current;
      if (audio && !hasStarted) {
        try {
          await audio.play();
          setIsPlaying(true);
          setHasStarted(true);
        } catch (err) {
          console.log('Auto-play prevented by browser, waiting for user interaction:', err);
          setIsPlaying(false);
        }
      }
    }, 2500); // Wait for loading animation to complete

    return () => {
      clearTimeout(autoPlayTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.log('Play prevented:', err);
        setIsPlaying(false);
      });
      intervalRef.current = setInterval(() => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      }, 100);
    } else {
      audio.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <div className="glass-panel p-3 sm:p-4 rounded-xl border border-aurora/30 hover:border-aurora/50 transition-all duration-300 hover:scale-105">
        <div className="flex flex-col gap-2">
          {/* Main player row */}
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-aurora/20 border-2 border-aurora flex items-center justify-center hover:bg-aurora/30 hover:scale-110 transition-all duration-300 flex-shrink-0"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Song Info */}
            <div className="text-left flex-shrink-0 min-w-0">
              <div className="text-sm sm:text-base font-medium text-soft-white truncate">unlasting</div>
              <div className="text-xs text-gray-400 truncate">LiSA • Sword Art Online</div>
            </div>
          </div>

          {/* Progress bar row */}
          <div className="h-1 bg-midnight/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-aurora to-sky-blue transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Waveform Animation */}
          <div className="flex items-end gap-1 h-6 justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-aurora/60 rounded-full transition-all duration-150 ease-out"
                style={{
                  height: isPlaying ? `${30 + Math.random() * 70}%` : '20%',
                  transitionDuration: `${100 + Math.random() * 150}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={unlastingMp3}
          loop
          preload="auto"
          onError={() => console.log('Audio loading error')}
          onCanPlayThrough={() => {
            // Try to play when audio is ready
            const audio = audioRef.current;
            if (audio && isPlaying) {
              audio.play().catch(err => console.log('Auto-play prevented:', err));
            }
          }}
        />
      </div>
    </div>
  );
};