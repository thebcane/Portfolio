'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Youtube, Music, Instagram, Twitter, Globe, Apple, ExternalLink } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import type { AudioCardData } from '@/lib/data/featured';

// Helper function to get the appropriate icon for a link
const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case 'youtube':
      return <Youtube className="w-4 h-4" />;
    case 'spotify':
      return <Music className="w-4 h-4" />;
    case 'instagram':
      return <Instagram className="w-4 h-4" />;
    case 'twitter':
      return <Twitter className="w-4 h-4" />;
    case 'apple':
      return <Apple className="w-4 h-4" />;
    case 'website':
      return <Globe className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

export function AudioShowcaseCard({
  data,
  index = 0,
}: {
  data: AudioCardData;
  index?: number;
}) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMixed, setIsMixed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Toggle labels (defaults to "Mixed"/"Unmixed" if not specified)
  const primaryLabel = data.toggleLabels?.primary || 'Mixed';
  const secondaryLabel = data.toggleLabels?.secondary || 'Unmixed';

  // Audio source
  const audioSrc = isMixed ? data.audioFiles.mixed : data.audioFiles.unmixed;

  // Play/Pause toggle
  const togglePlayPause = async () => {
    if (!audioRef.current) {
      console.error('Audio ref is null');
      return;
    }

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

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Audio loading error');
      setIsLoading(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
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
      className="relative w-full max-w-[400px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        aria-label={data.title}
        data-saved-position="0"
        data-was-playing="false"
      />

      {/* Main Card Container */}
      <div
        className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer h-full flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Artwork Image - Width constrained, height auto */}
        {data.thumbnail && (
          <div className="relative w-full aspect-square flex-shrink-0">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className={`object-cover transition-all duration-500 ${
                !isMixed ? 'grayscale' : 'grayscale-0'
              }`}
              priority
            />
            {/* Tag Badges - Top left corner */}
            {data.tags && data.tags.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-20 max-w-[calc(100%-24px)]">
                {showAllTags ? (
                  <>
                    {data.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-xs font-medium rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAllTags(false);
                      }}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                    >
                      −
                    </button>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10">
                      {data.tags[0]}
                    </span>
                    {data.tags.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAllTags(true);
                        }}
                        className="px-2 py-0.5 text-xs font-medium rounded-md bg-black/70 text-white backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-colors"
                      >
                        +{data.tags.length - 1}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Play/Pause Button - Bottom right corner over artwork */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          disabled={isLoading}
          className="absolute bottom-20 right-6 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                     flex items-center justify-center
                     hover:scale-110 active:scale-95 transition-transform duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-black fill-black" />
          ) : (
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          )}
        </motion.button>

        {/* Bottom Bar - Extended with category info */}
        <div className="relative bg-[#18191E] backdrop-blur-md flex-grow flex flex-col">
          {/* Main interactive area */}
          <div className="px-6 py-4 flex items-center justify-center min-h-[60px] w-full flex-grow">
            {/* Centered content - toggle between default and hover state */}
            <AnimatePresence mode="wait">
              {!isHovered ? (
                // Default state - Project/Show name (Desktop only)
                <motion.p
                  key="default"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block text-white/80 text-sm font-medium text-center absolute"
                >
                  {data.title}
                </motion.p>
              ) : (
                // Hover state - Mix/Unmixed toggle with full width spacing
                <motion.div
                  key="hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between w-full absolute left-0 right-0 px-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isMixed ? 'mixed' : 'unmixed'}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="text-white text-sm font-medium"
                    >
                      {isMixed ? primaryLabel : secondaryLabel}
                    </motion.span>
                  </AnimatePresence>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                      id={`mix-toggle-${data.id}`}
                      checked={isMixed}
                      onCheckedChange={handleVersionToggle}
                      disabled={isLoading}
                      aria-label="Toggle between mixed and unmixed versions"
                      className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/30"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile/Tablet - Always show toggle */}
            <div className="flex lg:hidden items-center justify-between w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMixed ? 'mixed' : 'unmixed'}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-white text-sm font-medium"
                >
                  {isMixed ? primaryLabel : secondaryLabel}
                </motion.span>
              </AnimatePresence>
              <div onClick={(e) => e.stopPropagation()}>
                <Switch
                  id={`mix-toggle-mobile-${data.id}`}
                  checked={isMixed}
                  onCheckedChange={handleVersionToggle}
                  disabled={isLoading}
                  aria-label="Toggle between mixed and unmixed versions"
                  className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/30"
                />
              </div>
            </div>
          </div>

          {/* Category info bar - Always visible */}
          <div className="px-6 py-3 border-t border-white/5 flex items-center justify-center gap-2">
            <Music className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/60 font-medium">{data.category}</span>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{data.title}</DialogTitle>
            <DialogDescription className="text-base">
              {data.category}
            </DialogDescription>
          </DialogHeader>

          {/* Tags Section - Below title */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium rounded-md bg-muted text-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4">
            {/* Mobile: Artwork first - Hidden on desktop */}
            <div className="md:hidden mb-6 flex flex-col items-center">
              {/* Audio Player Card */}
              <div className="relative w-full max-w-[280px]">
                <div className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)]">
                  {/* Artwork */}
                  {data.thumbnail && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          !isMixed ? 'grayscale' : 'grayscale-0'
                        }`}
                      />
                    </div>
                  )}

                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className="absolute bottom-16 right-4 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                               flex items-center justify-center
                               hover:scale-110 active:scale-95 transition-transform duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-black fill-black" />
                    ) : (
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    )}
                  </motion.button>

                  {/* Bottom Bar with Toggle */}
                  <div className="relative bg-[#18191E] backdrop-blur-md">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isMixed ? 'mixed' : 'unmixed'}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-white text-sm font-medium"
                        >
                          {isMixed ? primaryLabel : secondaryLabel}
                        </motion.span>
                      </AnimatePresence>
                      <Switch
                        id={`mix-toggle-modal-mobile-${data.id}`}
                        checked={isMixed}
                        onCheckedChange={handleVersionToggle}
                        disabled={isLoading}
                        aria-label="Toggle between mixed and unmixed versions"
                        className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Two-column layout with Text on left, Artwork on right */}
            <div className="hidden md:flex flex-row gap-6 mb-6">
              {/* Left column - Text content */}
              <div className="flex-1 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">About This Project</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>

                {/* Awards & Achievements Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Awards & Recognition</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">Golden Globe Nomination - Best Television Limited Series (2024)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">Multiple Webby Awards Winner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">2.8 Billion+ Global Listeners</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right column - Artwork and Links */}
              <div className="w-[280px] flex-shrink-0 space-y-4">
                {/* Audio Player Card */}
                <div className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)]">
                  {/* Artwork */}
                  {data.thumbnail && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          !isMixed ? 'grayscale' : 'grayscale-0'
                        }`}
                      />
                    </div>
                  )}

                  {/* Play/Pause Button */}
                  <motion.button
                    onClick={togglePlayPause}
                    disabled={isLoading}
                    className="absolute bottom-16 right-4 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                               flex items-center justify-center
                               hover:scale-110 active:scale-95 transition-transform duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-black fill-black" />
                    ) : (
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    )}
                  </motion.button>

                  {/* Bottom Bar with Toggle */}
                  <div className="relative bg-[#18191E] backdrop-blur-md">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isMixed ? 'mixed' : 'unmixed'}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="text-white text-sm font-medium"
                        >
                          {isMixed ? primaryLabel : secondaryLabel}
                        </motion.span>
                      </AnimatePresence>
                      <Switch
                        id={`mix-toggle-modal-desktop-${data.id}`}
                        checked={isMixed}
                        onCheckedChange={handleVersionToggle}
                        disabled={isLoading}
                        aria-label="Toggle between mixed and unmixed versions"
                        className="data-[state=checked]:bg-white/30 data-[state=unchecked]:bg-white/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Links Card - Desktop only */}
                {data.links && data.links.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-3">Links</h4>
                    <div className="space-y-2">
                      {data.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span className="group-hover:scale-110 transition-transform">
                            {getLinkIcon(link.icon)}
                          </span>
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: About and Awards sections - Shown on mobile only */}
            <div className="md:hidden space-y-6 mb-6 flex flex-col items-center">
              {/* Description */}
              <div className="w-full text-center">
                <h3 className="text-lg font-semibold mb-2">About This Project</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              </div>

              {/* Awards & Achievements Section */}
              <div className="w-full max-w-md">
                <h3 className="text-lg font-semibold mb-3 text-center">Awards & Recognition</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center">Golden Globe Nomination - Best Television Limited Series (2024)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center">Multiple Webby Awards Winner</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center">2.8 Billion+ Global Listeners</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Full-width content sections below */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              {/* My Role Section */}
              <div className="w-full max-w-md md:max-w-none">
                <h3 className="text-lg font-semibold mb-3 text-center md:text-left">My Role</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center md:text-left">Head Audio Engineer - Mixed and mastered 300+ episodes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center md:text-left">Cinematic sound design and immersive audio production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span className="flex-1 text-center md:text-left">Spatial audio implementation and post-production</span>
                  </li>
                </ul>
              </div>

              {/* Video Embed Section */}
              {data.videoEmbed && (
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Video Preview</h3>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={data.videoEmbed}
                      title={`${data.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Technical Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center md:text-left">
                    <p className="text-muted-foreground mb-1">Format</p>
                    <p className="font-medium">Immersive Audio Drama</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">{data.duration || '300+ Episodes'}</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-muted-foreground mb-1">Studio</p>
                    <p className="font-medium">Ballen Studios</p>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-muted-foreground mb-1">Year</p>
                    <p className="font-medium">2023-2024</p>
                  </div>
                </div>
              </div>

              {/* Links Section - Mobile only, at the bottom */}
              {data.links && data.links.length > 0 && (
                <div className="w-full max-w-[280px] md:hidden">
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-3 text-center">Links</h4>
                    <div className="space-y-2">
                      {data.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                          <span className="group-hover:scale-110 transition-transform">
                            {getLinkIcon(link.icon)}
                          </span>
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tools Section - Full width at bottom */}
              {data.tools && data.tools.length > 0 && (
                <div className="w-full">
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <h4 className="text-sm font-semibold mb-4 text-center md:text-left">Tools & Software</h4>
                    <TooltipProvider delayDuration={200}>
                      <div className="flex flex-wrap gap-6 justify-center md:justify-start items-center">
                        {data.tools.map((tool, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <div className="relative w-12 h-12 transition-transform hover:scale-110 cursor-pointer">
                                <Image
                                  src={tool.logo}
                                  alt={tool.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tool.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </TooltipProvider>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
