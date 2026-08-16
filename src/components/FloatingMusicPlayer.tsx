import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

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

  // Setup Web Audio API for frequency analysis - ALWAYS RUN when playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let animationFrameId: number;
    let isCancelled = false;

    const startAudioAnalysis = async () => {
      if (isCancelled || !isPlaying) return;

      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        // Get or create audio context
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContextClass();
        }

        const audioContext = audioContextRef.current;

        // Resume context if needed
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        // Create analyser if not exists
        if (!analyserRef.current) {
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;

          try {
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyserRef.current = analyser;
          } catch (corsError) {
            console.log('CORS restriction, using simulation');
            analyserRef.current = null;
          }
        }

        const updateFrequency = () => {
          if (isCancelled || !isPlaying) {
            setFrequencyData([]);
            return;
          }

          if (analyserRef.current) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            // Distribute evenly across 16 bars
            const distributedFrequencies = [];
            const barsPerSection = Math.floor(bufferLength / 16);

            for (let i = 0; i < 16; i++) {
              const startIndex = i * barsPerSection;
              let sum = 0;

              for (let j = 0; j < barsPerSection; j++) {
                sum += dataArray[startIndex + j] || 0;
              }

              const average = sum / barsPerSection;
              const normalized = (average / 255) * 100;
              const boosted = Math.min(normalized * 1.3, 100); // Boost for visibility
              distributedFrequencies.push(boosted);
            }

            setFrequencyData(distributedFrequencies);
          } else {
            // Simulation with smooth animation
            const time = Date.now() / 150;
            const simulated = Array.from({ length: 16 }, (_, i) => {
              const base = 25 + Math.sin(time + i * 0.5) * 20;
              const variation = Math.sin(time * 2 + i) * 15;
              return Math.max(15, Math.min(base + variation, 85));
            });
            setFrequencyData(simulated);
          }

          animationFrameId = requestAnimationFrame(updateFrequency);
        };

        updateFrequency();
      } catch (err) {
        console.log('Audio analysis error:', err);
      }
    };

    startAudioAnalysis();

    return () => {
      isCancelled = true;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, hasStarted]);

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
    if (!hasStarted) {
      setHasStarted(true);
    }
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

          {/* Audio-Reactive Waveform - Evenly Distributed */}
          <div className="flex items-end gap-1 h-6">
            {frequencyData.length > 0 && isPlaying ? (
              frequencyData.map((frequency, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full transition-all duration-75 ease-out"
                  style={{
                    height: `${Math.max(20, frequency)}%`,
                    backgroundColor: frequency > 60 ? '#00f5ff' : 'rgba(0, 245, 255, 0.6)',
                    boxShadow: frequency > 70 ? '0 0 8px rgba(0, 245, 255, 0.8)' : 'none',
                    opacity: 0.8 + (frequency / 500) // Subtle opacity variation
                  }}
                />
              ))
            ) : (
              // Static waveform when not playing
              [...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-aurora/40 rounded-full"
                  style={{
                    height: '20%',
                    opacity: 0.5
                  }}
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