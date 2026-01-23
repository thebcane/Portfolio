'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import type { AudioCardData } from '@/lib/data/featured';

export function AudioCard({
  data,
  index = 0
}: {
  data: AudioCardData;
  index?: number;
}) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMixed, setIsMixed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Audio source
  const audioSrc = isMixed ? data.audioFiles.mixed : data.audioFiles.unmixed;

  // Play/Pause toggle
  const togglePlayPause = async () => {
    if (!audioRef.current) {
      console.error('Audio ref is null');
      return;
    }

    console.log('Toggle play/pause, currently:', isPlaying);
    console.log('Audio src:', audioRef.current.src);
    console.log('Audio ready state:', audioRef.current.readyState);

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  // Handle version toggle (mix ↔ unmixed)
  const handleVersionToggle = (checked: boolean) => {
    if (!audioRef.current) return;

    console.log('Toggle version, checked:', checked, 'current:', isMixed);

    const currentPosition = audioRef.current.currentTime || 0;
    const wasPlaying = isPlaying;

    // Save state to dataset for restoration
    audioRef.current.dataset.savedPosition = currentPosition.toString();
    audioRef.current.dataset.wasPlaying = wasPlaying.toString();

    setIsLoading(true);
    setIsMixed(checked);

    // Pause current audio first
    if (wasPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Progress slider change
  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  // Format time helper
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Audio loading error');
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Update source when version changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = async () => {
      setIsLoading(false);

      // If there was a saved position, restore it
      const savedPosition = parseFloat(audio.dataset.savedPosition || '0');
      if (savedPosition > 0) {
        audio.currentTime = savedPosition;
        audio.dataset.savedPosition = '';

        // Resume playback if it was playing before
        if (audio.dataset.wasPlaying === 'true') {
          try {
            await audio.play();
            setIsPlaying(true);
            audio.dataset.wasPlaying = '';
          } catch (error) {
            console.error('Resume playback error:', error);
          }
        }
      }
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.src = audioSrc;
    audio.load();

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioSrc]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative gradient-border p-5 sm:p-[30px] rounded-[14px] shadow-[var(--shadow-2)] z-[1] flex flex-col"
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        aria-label={data.title}
        data-saved-position="0"
        data-was-playing="false"
      />

      {/* Header */}
      <div className="flex items-start gap-[18px] mb-4">
        <div className="icon-box flex-shrink-0 mt-[5px]">
          <Music className="w-[18px] h-[18px]" />
        </div>
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold capitalize mb-[7px]">
            {data.title}
          </h4>
          <p className="text-xs text-muted-foreground">{data.category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed mb-5">
        {data.description}
      </p>

      {/* Audio Controls */}
      <div className="space-y-3 mt-auto">
        {/* Progress Slider */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="cursor-pointer"
            aria-label="Audio progress"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-4 relative z-10">
          {/* Play/Pause Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Button clicked!');
              togglePlayPause();
            }}
            disabled={isLoading}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="h-10 w-10 rounded-full hover:bg-primary/10 relative z-10"
            type="button"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </Button>

          {/* Mix/Unmixed Toggle */}
          <div className="flex items-center gap-2 relative z-10">
            <Switch
              id={`mix-toggle-${data.id}`}
              checked={isMixed}
              onCheckedChange={(checked) => {
                console.log('Switch changed!', checked);
                handleVersionToggle(checked);
              }}
              disabled={isLoading}
              aria-label="Toggle between mixed and unmixed versions"
            />
            <Label
              htmlFor={`mix-toggle-${data.id}`}
              className="text-xs cursor-pointer"
            >
              {isMixed ? 'Mixed' : 'Unmixed'}
            </Label>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-[14px]">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}
    </motion.div>
  );
}
