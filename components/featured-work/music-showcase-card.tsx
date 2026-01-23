'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';
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
import type { MusicCardData } from '@/lib/data/featured';

// Helper function to get the appropriate icon for a link
const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case 'spotify':
      return <Music className="w-4 h-4" />;
    default:
      return <Music className="w-4 h-4" />;
  }
};

export function MusicShowcaseCard({
  data,
  index = 0,
}: {
  data: MusicCardData;
  index?: number;
}) {
  // State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Audio loading error');
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

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
        src={data.audioFile}
        preload="metadata"
        aria-label={data.title}
      />

      {/* Main Card Container */}
      <div
        className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer h-full flex flex-col"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Artwork Image */}
        {data.thumbnail && (
          <div className="relative w-full aspect-square flex-shrink-0">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover"
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
          className="absolute bottom-20 right-6 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                     flex items-center justify-center
                     hover:scale-110 active:scale-95 transition-transform duration-200"
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

        {/* Bottom Bar - Extended with label info */}
        <div className="relative bg-[#18191E] backdrop-blur-md flex-grow flex flex-col">
          {/* Main interactive area */}
          <div className="px-6 py-4 flex items-center justify-center min-h-[60px] w-full flex-grow">
            {/* Centered content - toggle between default and hover state */}
            <AnimatePresence mode="wait">
              {!isHovered ? (
                // Default state - Track name (Desktop only)
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
                // Hover state - "Listen Now" text
                <motion.div
                  key="hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-full absolute"
                >
                  <span className="text-white text-sm font-medium">
                    Listen Now
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile/Tablet - Always show "Listen Now" */}
            <div className="flex lg:hidden items-center justify-center w-full">
              <span className="text-white text-sm font-medium">
                Listen Now
              </span>
            </div>
          </div>

          {/* Label info bar - Always visible */}
          <div className="px-6 py-3 border-t border-white/5 flex items-center justify-center gap-2">
            <Music className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/60 font-medium">
              {data.label || data.genre || 'Music'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{data.title}</DialogTitle>
            {data.artist && (
              <DialogDescription className="text-base">
                {data.artist}
              </DialogDescription>
            )}
          </DialogHeader>

          <div className="mt-4">
            {/* Spotify Embed Section - Full width at top (if available) */}
            {data.spotifyEmbed && (
              <div className="w-full mb-6">
                <div className="relative w-full rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={data.spotifyEmbed}
                    title={`${data.title} Spotify player`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* YouTube Embed Section - Full width at top (if available and no Spotify) */}
            {data.youtubeEmbed && !data.spotifyEmbed && (
              <div className="w-full mb-6">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                  <iframe
                    src={data.youtubeEmbed}
                    title={`${data.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Tags Section - Below embeds */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
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

            {/* Mobile: Artwork first - Hidden on desktop */}
            <div className="md:hidden mb-6 flex flex-col items-center">
              {/* Artwork/Audio Player Card */}
              <div className="relative w-full max-w-[280px]">
                <div className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)]">
                  {/* Artwork */}
                  {data.thumbnail && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Play/Pause Button - Only show if no embed */}
                  {!data.spotifyEmbed && !data.youtubeEmbed && (
                    <>
                      <motion.button
                        onClick={togglePlayPause}
                        className="absolute bottom-16 right-4 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                                   flex items-center justify-center
                                   hover:scale-110 active:scale-95 transition-transform duration-200"
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

                      {/* Bottom Bar with "Listen Now" */}
                      <div className="relative bg-[#18191E] backdrop-blur-md">
                        <div className="px-4 py-3 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            Listen Now
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop: Two-column layout with Text on left, Artwork on right */}
            <div className="hidden md:flex flex-row gap-6 mb-6">
              {/* Left column - Text content */}
              <div className="flex-1 space-y-6">
                {/* Description */}
                {data.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About This Track</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {data.description}
                    </p>
                  </div>
                )}

                {/* Credits Section */}
                {data.credits && data.credits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Credits</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {data.credits.map((credit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="flex-1">{credit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right column - Artwork and Links */}
              <div className="w-[280px] flex-shrink-0 space-y-4">
                {/* Artwork Card */}
                <div className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)]">
                  {/* Artwork */}
                  {data.thumbnail && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Play/Pause Button and Bottom Bar - Only show if no embed */}
                  {!data.spotifyEmbed && !data.youtubeEmbed && (
                    <>
                      <motion.button
                        onClick={togglePlayPause}
                        className="absolute bottom-16 right-4 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                                   flex items-center justify-center
                                   hover:scale-110 active:scale-95 transition-transform duration-200"
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

                      {/* Bottom Bar with "Listen Now" */}
                      <div className="relative bg-[#18191E] backdrop-blur-md">
                        <div className="px-4 py-3 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            Listen Now
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Links Card - Desktop only */}
                {data.links && data.links.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-3">Listen On</h4>
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

                {/* Label Card - Desktop only */}
                {data.label && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-2">Label</h4>
                    {data.labelLogo && (
                      <div className="mb-3 flex items-center justify-center p-2">
                        <Image
                          src={data.labelLogo}
                          alt={`${data.label} logo`}
                          width={180}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">{data.label}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: About and Credits sections - Shown on mobile only */}
            <div className="md:hidden space-y-6 mb-6 flex flex-col items-center">
              {/* Description */}
              {data.description && (
                <div className="w-full text-center">
                  <h3 className="text-lg font-semibold mb-2">About This Track</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {data.description}
                  </p>
                </div>
              )}

              {/* Credits Section */}
              {data.credits && data.credits.length > 0 && (
                <div className="w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">Credits</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {data.credits.map((credit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                        <span className="flex-1 text-center">{credit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Full-width content sections below */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              {/* Technical Details */}
              {(data.genre || data.duration || data.releaseDate || data.plays) && (
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {data.genre && (
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-1">Genre</p>
                        <p className="font-medium">{data.genre}</p>
                      </div>
                    )}
                    {data.plays && (
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-1">Plays</p>
                        <p className="font-medium">{data.plays}</p>
                      </div>
                    )}
                    {data.duration && (
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-1">Duration</p>
                        <p className="font-medium">{data.duration}</p>
                      </div>
                    )}
                    {data.label && (
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-1">Label</p>
                        <p className="font-medium">{data.label}</p>
                      </div>
                    )}
                    {data.releaseDate && (
                      <div className="text-center md:text-left">
                        <p className="text-muted-foreground mb-1">Release Date</p>
                        <p className="font-medium">{data.releaseDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Links Section - Mobile only, at the bottom */}
              {data.links && data.links.length > 0 && (
                <div className="w-full max-w-[280px] md:hidden">
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-3 text-center">Listen On</h4>
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
