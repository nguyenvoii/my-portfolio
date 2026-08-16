import { useState, useRef, useEffect } from 'react';
import unlastingMp3 from '/assets/music/unlasting.mp3';

export const FloatingMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [frequencyData, setFrequencyData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
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
    if (!audio || !hasStarted) return;

    let isSetup = false;
    let isCancelled = false;

    const setupAudioContext = async () => {
      if (isSetup || isCancelled) return;

      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
          console.log('Web Audio API not supported');
          return;
        }

        // Create or resume audio context
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContextClass();
        }

        const audioContext = audioContextRef.current;

        // Resume context if suspended (required for user gesture)
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        // Create analyser
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Good balance between resolution and performance

        // Check if source already exists
        if (!analyserRef.current) {
          try {
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyserRef.current = analyser;
            isSetup = true;
          } catch (corsError) {
            console.log('CORS restriction - using simulated waveform:', corsError);

            // Use simulation instead
            isSetup = true;
            analyserRef.current = null;
          }
        }

        const updateFrequency = () => {
          if (isCancelled) return;

          if (analyserRef.current && isPlaying) {
            const bufferLength = analyserRef.current.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyserRef.current.getByteFrequencyData(dataArray);

            // Distribute frequencies evenly across 16 bars
            const distributedFrequencies = [];
            const barsPerSection = Math.floor(bufferLength / 16);

            for (let i = 0; i < 16; i++) {
              const startIndex = i * barsPerSection;
              let sum = 0;

              // Average frequencies in each section
              for (let j = 0; j < barsPerSection; j++) {
                sum += dataArray[startIndex + j] || 0;
              }

              const average = sum / barsPerSection;
              // Normalize to 0-100 and boost mid-high frequencies for better visual
              const normalized = (average / 255) * 100;
              const boosted = Math.min(normalized * 1.2, 100); // 20% boost
              distributedFrequencies.push(boosted);
            }

            setFrequencyData(distributedFrequencies);
          } else if (isPlaying) {
            // Fallback simulation when CORS blocks
            const simulated = Array.from({ length: 16 }, () => {
              const base = Math.random() * 40 + 20;
              const variation = Math.sin(Date.now() / 200) * 15;
              return Math.max(15, Math.min(base + variation, 85));
            });
            setFrequencyData(simulated);
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
      isCancelled = true;
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