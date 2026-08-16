import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Start paused, auto-play after loading
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-panel p-2.5 rounded-xl border border-aurora/20 hover:border-aurora/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          {/* Play/Pause Button - Compact */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-lg bg-aurora/15 border border-aurora/30 flex items-center justify-center hover:bg-aurora/25 hover:border-aurora/50 transition-all duration-300 flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-2.5 h-2.5 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Song Info - Minimal */}
          <div className="text-left min-w-0">
            <div className="text-[10px] font-medium text-soft-white truncate leading-tight">unlasting</div>
            <div className="text-[8px] text-gray-500 truncate leading-tight">LiSA</div>
          </div>

          {/* Compact Waveform */}
          <div className="flex items-end gap-0.5 h-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-aurora/50 rounded-full transition-all duration-150 ease-out"
                style={{
                  height: isPlaying ? `${25 + Math.random() * 75}%` : '15%',
                  transitionDuration: `${80 + Math.random() * 120}ms`,
                }}
              />
            ))}
          </div>
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
  );
};