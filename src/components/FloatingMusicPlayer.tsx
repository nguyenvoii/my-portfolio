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
      <div className="glass-panel p-3 rounded-lg border border-aurora/30 hover:border-aurora/50 transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-aurora/20 border-2 border-aurora flex items-center justify-center hover:bg-aurora/30 hover:scale-110 transition-all duration-300 flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-3 h-3 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Song Info */}
          <div className="text-left min-w-0">
            <div className="text-xs font-medium text-soft-white truncate">unlasting</div>
            <div className="text-[10px] text-gray-400 truncate">LiSA • SAO</div>
          </div>

          {/* Waveform Animation */}
          <div className="flex items-end gap-0.5 h-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-0.5 bg-aurora/60 rounded-full transition-all duration-150 ease-out"
                style={{
                  height: isPlaying ? `${30 + Math.random() * 70}%` : '20%',
                  transitionDuration: `${100 + Math.random() * 150}ms`,
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