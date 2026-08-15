import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

// Type for browser setInterval/setTimeout
type TimerId = ReturnType<typeof setInterval> | null;

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // Auto-play by default
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<TimerId>(null);

  useEffect(() => {
    // Auto-play on mount with better error handling
    const audio = audioRef.current;
    if (audio) {
      // Attempt autoplay with multiple strategies
      const attemptAutoplay = async () => {
        try {
          // First attempt: direct play
          await audio.play();
          setIsPlaying(true);
        } catch (err) {
          console.log('Auto-play prevented, trying alternative approach:', err);

          // Second attempt: after a small delay
          setTimeout(async () => {
            try {
              await audio.play();
              setIsPlaying(true);
            } catch (retryErr) {
              console.log('Auto-play still prevented, user interaction required:', retryErr);
              setIsPlaying(false);
            }
          }, 1000);
        }
      };

      attemptAutoplay();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
      <div className="glass-panel px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-full border border-aurora/30 aurora-glow hover:border-aurora/60 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-aurora/20 border-2 border-aurora flex items-center justify-center hover:bg-aurora/30 hover:scale-110 transition-all duration-300 flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Song Info */}
          <div className="text-left flex-shrink-0 min-w-0">
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-soft-white truncate">unlasting</div>
            <div className="text-[10px] sm:text-xs text-gray-400 truncate">LiSA</div>
          </div>

          {/* Waveform Animation */}
          <div className="hidden sm:flex items-end gap-0.5 h-5 sm:h-6 md:h-8 flex-shrink-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-aurora/60 rounded-full transition-all duration-150 ease-out"
                style={{
                  height: isPlaying ? `${Math.random() * 100}%` : '20%',
                  transitionDuration: `${150 + Math.random() * 100}ms`,
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-16 sm:w-24 h-1 bg-midnight/50 rounded-full overflow-hidden flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-aurora to-sky-blue transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
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