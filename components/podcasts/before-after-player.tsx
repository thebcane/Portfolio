"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Loader2, ExternalLink } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { ShowDetailsDialog } from "@/components/podcasts/show-details-dialog";
import type { AudioCardData } from "@/lib/data/featured";

interface BeforeAfterPlayerProps {
  entries: AudioCardData[];
}

type Variant = "raw" | "mixed";

export function BeforeAfterPlayer({ entries }: BeforeAfterPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVariant, setActiveVariant] = useState<Variant>("raw");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const activeEntry = entries[activeIndex];
  const audioSrc =
    activeVariant === "mixed"
      ? activeEntry.audioFiles.mixed
      : activeEntry.audioFiles.unmixed;

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsPlaying(false);
    }
  };

  const handleVariantSwitch = (next: Variant) => {
    if (next === activeVariant || !audioRef.current) return;
    const wasPlaying = isPlaying;
    const position = audioRef.current.currentTime || 0;
    audioRef.current.dataset.savedPosition = position.toString();
    audioRef.current.dataset.wasPlaying = wasPlaying.toString();
    if (wasPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setIsLoading(true);
    setActiveVariant(next);
  };

  const handleEntrySwitch = (index: number) => {
    if (index === activeIndex || !audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
    setCurrentTime(0);
    setActiveIndex(index);
    setActiveVariant("raw");
    audio.dataset.savedPosition = "";
    audio.dataset.wasPlaying = "";

    const nextSrc = entries[index].audioFiles.unmixed;
    const currentResolvedSrc = new URL(audio.src || "", window.location.href).pathname;
    if (decodeURIComponent(currentResolvedSrc) !== nextSrc) {
      setIsLoading(true);
    } else {
      audio.currentTime = 0;
      setIsLoading(false);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => setIsLoading(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = async () => {
      setIsLoading(false);
      const savedPosition = parseFloat(audio.dataset.savedPosition || "0");
      if (savedPosition > 0) {
        audio.currentTime = savedPosition;
        audio.dataset.savedPosition = "";
        if (audio.dataset.wasPlaying === "true") {
          try {
            await audio.play();
            setIsPlaying(true);
            audio.dataset.wasPlaying = "";
          } catch (error) {
            console.error("Resume playback error:", error);
          }
        }
      }
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.src = audioSrc;
    audio.load();

    const failsafe = setTimeout(() => setIsLoading(false), 4000);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      clearTimeout(failsafe);
    };
  }, [audioSrc]);

  const shortTitle = (title: string) => title.split(":")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative content-card gradient-border rounded-[14px] sm:rounded-[20px] overflow-hidden"
    >
      <audio ref={audioRef} preload="metadata" aria-label={activeEntry.title} />

      {/* Top: thumbnail strip selector — hidden when only one entry */}
      {entries.length > 1 && (
      <div className="border-b border-white/5 p-4 sm:p-5 flex gap-2 sm:gap-3 overflow-x-auto has-scrollbar">
        {entries.map((entry, i) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => handleEntrySwitch(i)}
            className={`flex-shrink-0 flex items-center gap-3 px-3 py-2 rounded-lg border transition-all ${i === activeIndex
              ? "border-primary/50 bg-primary/10"
              : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
          >
            {entry.thumbnail && (
              <img
                src={entry.thumbnail}
                alt={entry.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-md object-cover flex-shrink-0"
              />
            )}
            <div className="text-left min-w-0">
              <p
                className={`text-xs sm:text-sm font-medium truncate max-w-[140px] sm:max-w-[180px] ${i === activeIndex ? "text-primary" : "text-foreground"
                  }`}
              >
                {shortTitle(entry.title)}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate max-w-[140px] sm:max-w-[180px]">
                {entry.category}
              </p>
            </div>
          </button>
        ))}
      </div>
      )}

      {/* Main 2-column layout: cover left, content right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEntry.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-7"
        >
          {/* LEFT: cover — clickable to open details */}
          {activeEntry.thumbnail && (
            <button
              type="button"
              onClick={() => setDetailsOpen(true)}
              aria-label={`Open details for ${shortTitle(activeEntry.title)}`}
              className="group flex-shrink-0 w-full sm:w-60 lg:w-80 xl:w-[22rem] cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
            >
              <img
                src={activeEntry.thumbnail}
                alt={activeEntry.title}
                className="w-full aspect-square rounded-xl object-cover shadow-2xl shadow-black/50 ring-1 ring-white/5 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          )}

          {/* RIGHT: identity + stats + A/B + transport */}
          <div className="flex-1 min-w-0 flex flex-col gap-5 sm:gap-6">
            {/* Identity */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/70 font-medium mb-1.5">
                  Now playing —{" "}
                  <span
                    className={
                      activeVariant === "mixed"
                        ? "text-primary"
                        : "text-muted-foreground/80"
                    }
                  >
                    {activeVariant === "mixed" ? "After" : "Before"}
                  </span>
                </p>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-1">
                  {shortTitle(activeEntry.title)}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {activeEntry.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                aria-label={`Open details for ${shortTitle(activeEntry.title)}`}
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 text-muted-foreground/80 hover:text-foreground transition-colors mt-0.5"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Stats spec row */}
            {activeEntry.showcaseStats && activeEntry.showcaseStats.length > 0 && (
              <dl className="grid grid-cols-3 gap-3 sm:gap-5 pb-5 sm:pb-6 border-b border-white/5">
                {activeEntry.showcaseStats.map((stat, i) => (
                  <div key={i} className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 font-medium mb-1 truncate">
                      {stat.label}
                    </dt>
                    <dd className="text-base sm:text-lg lg:text-xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {/* A/B toggle */}
            <div
              className="grid grid-cols-2 gap-1.5 p-1.5 rounded-xl border border-white/10 bg-black/30"
              role="tablist"
              aria-label="Before / after audio versions"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeVariant === "raw"}
                onClick={() => handleVariantSwitch("raw")}
                disabled={isLoading}
                className={`relative px-4 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all ${activeVariant === "raw"
                  ? "bg-white/10 text-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-60 mb-0.5">
                  Before
                </span>
                Raw
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeVariant === "mixed"}
                onClick={() => handleVariantSwitch("mixed")}
                disabled={isLoading}
                className={`relative px-4 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all ${activeVariant === "mixed"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span className="block text-[10px] uppercase tracking-wider opacity-60 mb-0.5">
                  After
                </span>
                Mixed
              </button>
            </div>

            {/* Transport: play + progress + time */}
            <div className="flex items-center gap-4 sm:gap-5">
              <button
                type="button"
                onClick={togglePlayPause}
                disabled={isLoading}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 self-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center shadow-xl shadow-primary/30 disabled:opacity-50"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                )}
              </button>

              <div className="flex-1 pt-4 min-w-0 flex flex-col justify-center gap-2.5">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSliderChange}
                  className="cursor-pointer"
                  aria-label="Audio progress"
                  disabled={isLoading}
                />
                <div className="text-xs text-muted-foreground tabular-nums">
                  {formatTime(currentTime)}{" "}
                  <span className="text-muted-foreground/50">
                    / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <ShowDetailsDialog
        data={activeEntry}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-[14px] sm:rounded-[20px]">
          <Loader2 className="w-7 h-7 animate-spin text-primary" />
        </div>
      )}
    </motion.div>
  );
}
