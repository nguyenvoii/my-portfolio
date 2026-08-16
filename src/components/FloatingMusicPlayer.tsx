import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto-play after website loads
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
    }, 2500);

    return () => {
      clearTimeout(autoPlayTimer);
    };
  }, [hasStarted]);

  // Setup Web Audio API for frequency analysis
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize audio context and analyser
    const setupAudioContext = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Small FFT size for performance

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateFrequency = () => {
          if (analyserRef.current && isPlaying) {
            analyserRef.current.getByteFrequencyData(dataArray);

            // Convert to array and normalize to 0-100 range
            const frequencies = Array.from(dataArray).map(value => (value / 255) * 100);
            setFrequencyData(frequencies);
          }

          animationRef.current = requestAnimationFrame(updateFrequency);
        };

        updateFrequency();
      } catch (err) {
        console.log('Web Audio API setup failed:', err);
      }
    };

    setupAudioContext();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

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
      <div className="glass-panel px-5 py-3 rounded-xl border border-aurora/20 hover:border-aurora/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-lg bg-aurora/15 border border-aurora/30 flex items-center justify-center hover:bg-aurora/25 hover:border-aurora/50 transition-all duration-300 flex-shrink-0"
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
            <div className="text-xs font-medium text-soft-white truncate leading-tight">unlasting</div>
            <div className="text-[9px] text-gray-400 truncate leading-tight">LiSA • SAO</div>
          </div>

          {/* Audio-Reactive Waveform */}
          <div className="flex items-end gap-0.5 h-4">
            {frequencyData.length > 0 ? (
              frequencyData.slice(0, 12).map((frequency, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-aurora/50 rounded-full transition-all duration-75 ease-out"
                  style={{
                    height: `${Math.max(15, frequency)}%`,
                    backgroundColor: frequency > 60 ? '#00f5ff' : 'rgba(0, 245, 255, 0.5)',
                  }}
                />
              ))
            ) : (
              // Static waveform when not playing
              [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-aurora/50 rounded-full"
                  style={{ height: '15%' }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={unlastingMp3}
        loop
        preload="auto"
        crossOrigin="anonymous"
        onError={() => console.log('Audio loading error')}
        onCanPlayThrough={() => {
          const audio = audioRef.current;
          if (audio && isPlaying) {
            audio.play().catch(err => console.log('Auto-play prevented:', err));
          }
        }}
      />
    </div>
  );
};