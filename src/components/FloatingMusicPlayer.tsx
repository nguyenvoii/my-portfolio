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

    let isSetup = false;

    const setupAudioContext = async () => {
      if (isSetup) return;

      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          console.log('Web Audio API not supported');
          return;
        }

        const audioContext = new AudioContextClass();

        // Create analyser
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 128; // Higher for better resolution

        // Connect audio element to analyser and destination
        try {
          const source = audioContext.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          analyserRef.current = analyser;
          isSetup = true;

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
        } catch (corsError) {
          console.log('CORS restriction - using simulated waveform:', corsError);

          // Fall back to simulated waveform based on playback
          const simulateWaveform = () => {
            if (isPlaying && audio.currentTime > 0) {
              // Simulate frequency data based on time
              const simulated = Array.from({ length: 32 }, () => {
                return Math.random() * 60 + 20; // Random values 20-80%
              });
              setFrequencyData(simulated);
            }

            animationRef.current = requestAnimationFrame(simulateWaveform);
          };

          simulateWaveform();
        }
      } catch (err) {
        console.log('Web Audio API setup failed:', err);
      }
    };

    // Setup on first play
    if (hasStarted && !analyserRef.current) {
      setupAudioContext();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasStarted, isPlaying]);

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
      <div className="glass-panel px-6 py-3 rounded-xl border border-aurora/20 hover:border-aurora/40 transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-lg bg-aurora/15 border border-aurora/30 flex items-center justify-center hover:bg-aurora/25 hover:border-aurora/50 transition-all duration-300 flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
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

          {/* Song Info */}
          <div className="text-left min-w-0">
            <div className="text-xs font-medium text-soft-white truncate leading-tight">unlasting</div>
            <div className="text-[10px] text-gray-400 truncate leading-tight">LiSA • SAO</div>
          </div>

          {/* Audio-Reactive Waveform - Larger */}
          <div className="flex items-end gap-1 h-6">
            {frequencyData.length > 0 ? (
              frequencyData.slice(0, 16).map((frequency, i) => (
                <div
                  key={i}
                  className="w-1 bg-aurora/50 rounded-full transition-all duration-75 ease-out"
                  style={{
                    height: `${Math.max(20, frequency)}%`,
                    backgroundColor: frequency > 60 ? '#00f5ff' : 'rgba(0, 245, 255, 0.6)',
                    boxShadow: frequency > 70 ? '0 0 8px rgba(0, 245, 255, 0.8)' : 'none'
                  }}
                />
              ))
            ) : (
              // Static waveform when not playing
              [...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-aurora/40 rounded-full"
                  style={{ height: '20%' }}
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