import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);

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

  // Simple CSS animation for waveform
  useEffect(() => {
    if (isPlaying) {
      let frame = 0;
      const animate = () => {
        frame++;
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

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
    <div className="fixed bottom-4 right-4 z-40">
      <div className="glass-panel px-6 py-3 rounded-xl border border-aurora/20 hover:border-aurora/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-lg bg-aurora/15 border border-aurora/30 flex items-center justify-center hover:bg-aurora/25 hover:border-aurora/50 transition-all duration-300 flex-shrink-0"
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-aurora" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-aurora ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="text-left min-w-0">
            <div className="text-xs font-medium text-soft-white truncate leading-tight">unlasting</div>
            <div className="text-[10px] text-gray-400 truncate leading-tight">LiSA • SAO</div>
          </div>

          <div className="flex items-end gap-1 h-6">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-aurora/60 rounded-full"
                style={{
                  animation: isPlaying ? 'wave 1s ease-in-out infinite' : 'none',
                  animationDelay: `${Math.abs(i - 7.5) * 0.1}s`,
                  height: '20%',
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
            50% { height: ${50 + Math.random() * 40}%; opacity: 1; }
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