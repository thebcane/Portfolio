'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, ExternalLink, Youtube, Instagram, Twitter, Globe, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import type { VideoCardData } from '@/lib/data/featured';

// Helper function to get the appropriate icon for a link
const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case 'youtube':
      return <Youtube className="w-4 h-4" />;
    case 'instagram':
      return <Instagram className="w-4 h-4" />;
    case 'twitter':
      return <Twitter className="w-4 h-4" />;
    case 'website':
      return <Globe className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

// Helper function to format time (seconds to MM:SS)
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function VideoLandscapeCard({
  data,
  index = 0,
}: {
  data: VideoCardData;
  index?: number;
}) {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  // Video player state (only used when videoFile and audioStems exist)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStemIndex, setCurrentStemIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  // Handle play/pause
  const togglePlayPause = async () => {
    if (!videoRef.current || !audioRefs.current[currentStemIndex]) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        audioRefs.current[currentStemIndex].pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        await audioRefs.current[currentStemIndex].play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
    }
  };

  // Handle scrubbing
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Handle stem change
  const handleStemChange = (value: string) => {
    const newIndex = parseInt(value);

    // Pause current audio
    if (audioRefs.current[currentStemIndex]) {
      audioRefs.current[currentStemIndex].pause();
      audioRefs.current[currentStemIndex].volume = 0;
    }

    // Play new audio if video is playing
    if (isPlaying && audioRefs.current[newIndex]) {
      audioRefs.current[newIndex].currentTime = videoRef.current?.currentTime || 0;
      audioRefs.current[newIndex].volume = volume;
      audioRefs.current[newIndex].play();
    } else if (audioRefs.current[newIndex]) {
      audioRefs.current[newIndex].volume = volume;
    }

    setCurrentStemIndex(newIndex);
  };

  // Sync video and audio on timeupdate
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !data.audioStems) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);

      // Sync all audio elements with drift correction
      audioRefs.current.forEach((audio, index) => {
        if (audio && !isSeeking) {
          const drift = Math.abs(audio.currentTime - video.currentTime);
          if (drift > 0.3) {
            audio.currentTime = video.currentTime;
          }
        }
      });
    };

    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded, duration:', video.duration);
      setDuration(video.duration);
    };

    // Set duration immediately if metadata already loaded
    if (video.duration && video.duration > 0 && duration === 0) {
      console.log('Setting duration immediately:', video.duration);
      setDuration(video.duration);
    }

    const handleSeeking = () => {
      setIsSeeking(true);
      audioRefs.current.forEach((audio) => {
        if (audio) audio.pause();
      });
    };

    const handleSeeked = () => {
      setIsSeeking(false);
      const currentTime = video.currentTime;
      audioRefs.current.forEach((audio, index) => {
        if (audio) {
          audio.currentTime = currentTime;
          if (isPlaying && index === currentStemIndex) {
            audio.play();
          }
        }
      });
    };

    const handleEnded = () => {
      setIsPlaying(false);
      audioRefs.current.forEach((audio) => {
        if (audio) audio.pause();
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, currentStemIndex, isSeeking, data.audioStems]);

  // Handle loading state
  useEffect(() => {
    if (!data.audioStems || !isModalOpen || !data.videoFile) return;

    let loadedCount = 0;
    const totalAssets = 1 + data.audioStems.length;

    const checkAllLoaded = () => {
      loadedCount++;
      console.log(`Loaded ${loadedCount} of ${totalAssets} assets`);
      if (loadedCount >= totalAssets) {
        setIsLoading(false);
        // Set duration when loading completes if not already set
        if (video && video.duration && duration === 0) {
          console.log('Setting duration after loading completes:', video.duration);
          setDuration(video.duration);
        }
      }
    };

    const handleError = (assetName: string) => {
      console.error(`Failed to load ${assetName}, marking as loaded anyway`);
      checkAllLoaded();
    };

    const video = videoRef.current;

    // Check if video is already ready
    if (video) {
      console.log('Video element exists, readyState:', video.readyState);
      // ReadyState 1 (HAVE_METADATA) is enough - we just need duration
      if (video.readyState >= 1) {
        console.log('✅ Video already loaded (readyState >= 1)');
        checkAllLoaded();
      } else {
        console.log('⏳ Waiting for video to load...');
        // Use loadedmetadata instead of canplay - fires earlier
        video.addEventListener('loadedmetadata', () => {
          console.log('✅ Video metadata loaded');
          checkAllLoaded();
        }, { once: true });
        video.addEventListener('error', () => handleError('video'), { once: true });
      }
    } else {
      console.error('❌ Video element not found in ref!');
    }

    // Check if audio files are already ready
    audioRefs.current.forEach((audio, idx) => {
      if (audio) {
        const stemLabel = data.audioStems?.[idx]?.label || `stem-${idx}`;
        if (audio.readyState >= 4) {
          console.log(`✅ Audio "${stemLabel}" already loaded`);
          checkAllLoaded();
        } else {
          console.log(`⏳ Waiting for audio "${stemLabel}" to load...`);
          audio.addEventListener('canplaythrough', () => {
            console.log(`✅ Audio "${stemLabel}" loaded`);
            checkAllLoaded();
          }, { once: true });
          audio.addEventListener('error', () => handleError(`audio-${stemLabel}`), { once: true });
        }
      }
    });

    // Fallback timeout - if loading takes > 10 seconds, just show the player anyway
    const timeout = setTimeout(() => {
      console.warn('Loading timeout - showing player anyway');
      setIsLoading(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
      if (video) {
        video.removeEventListener('canplay', checkAllLoaded);
        video.removeEventListener('error', () => handleError('video'));
      }
      audioRefs.current.forEach((audio, idx) => {
        if (audio) {
          audio.removeEventListener('canplaythrough', checkAllLoaded);
          audio.removeEventListener('error', () => handleError(`audio-${idx}`));
        }
      });
    };
  }, [data.audioStems, isModalOpen, data.videoFile ?? null]);

  // Update audio volume when stem changes
  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      if (audio) {
        audio.volume = index === currentStemIndex ? volume : 0;
      }
    });
  }, [currentStemIndex, volume]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative w-full max-w-[800px] mx-auto"
    >
      {/* Main Card Container */}
      <div
        className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Thumbnail Image - Landscape aspect ratio */}
        {data.thumbnail && (
          <div className="relative w-full aspect-video bg-[hsl(0,0%,28%)]">
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill
              className="object-cover transition-all duration-300"
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
            {/* Overlay gradient on hover */}
            <div
              className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
            {/* Play Button - Centered, appears on hover */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                         flex items-center justify-center
                         transition-all duration-300 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Watch video"
            >
              <Play className="w-6 h-6 text-black fill-black ml-1" />
            </motion.button>
          </div>
        )}

        {/* Bottom Bar - Title only */}
        <div className="relative bg-[#18191E] backdrop-blur-md">
          <div className="px-6 py-4 flex items-center justify-between min-h-[60px]">
            <div className="flex flex-col">
              <h3 className="text-white text-base font-semibold">{data.title}</h3>
              <p className="text-white/60 text-sm">{data.category}</p>
            </div>
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

          <div className="mt-4 space-y-6">
            {/* Video Player with Audio Stems OR Video Embed */}
            {data.videoFile && data.audioStems ? (
              // Custom Video Player with Audio Stems
              <div className="w-full">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                  {/* Video Element (muted) */}
                  <video
                    ref={videoRef}
                    src={data.videoFile}
                    className="absolute inset-0 w-full h-full"
                    muted
                    preload="auto"
                  />

                  {/* Hidden Audio Elements */}
                  {data.audioStems.map((stem, idx) => (
                    <audio
                      key={idx}
                      ref={(el) => {
                        if (el) audioRefs.current[idx] = el;
                      }}
                      src={stem.audioPath}
                      preload="auto"
                    />
                  ))}

                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
                      <div className="text-center space-y-3">
                        <Loader2 className="w-12 h-12 mx-auto text-white animate-spin" />
                        <p className="text-white text-sm">Loading video and audio...</p>
                      </div>
                    </div>
                  )}

                  {/* Custom Controls Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {/* Top Controls - Stem Selector */}
                    <div className="p-4 pointer-events-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-white text-sm font-medium">Listen to:</span>
                        <Select
                          value={currentStemIndex.toString()}
                          onValueChange={handleStemChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-[180px] bg-black/70 backdrop-blur-sm border-white/10 text-white">
                            <SelectValue placeholder="Select audio" />
                          </SelectTrigger>
                          <SelectContent className="bg-black/90 backdrop-blur-md border-white/10">
                            {data.audioStems.map((stem, idx) => (
                              <SelectItem
                                key={idx}
                                value={idx.toString()}
                                className="text-white hover:bg-white/10"
                              >
                                {stem.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pointer-events-auto">
                      {/* Scrubber */}
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        disabled={isLoading}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer mb-3
                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                                 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3
                                 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                      />

                      {/* Playback Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={togglePlayPause}
                            disabled={isLoading}
                            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center
                                     transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={isPlaying ? 'Pause' : 'Play'}
                          >
                            {isPlaying ? (
                              <Pause className="w-5 h-5 text-black fill-black" />
                            ) : (
                              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                            )}
                          </button>

                          <span className="text-white text-sm font-medium">
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-white" />
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            disabled={isLoading}
                            className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer
                                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                                     [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3
                                     [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : data.videoEmbed ? (
              // Standard Video Embed (YouTube/Vimeo)
              <div className="w-full">
                {data.videoEmbed.includes('dQw4w9WgXcQ') ? (
                  // Coming Soon Banner for placeholder videos
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-muted/80 to-muted border border-border flex items-center justify-center">
                    <div className="text-center space-y-3 px-6">
                      <Play className="w-16 h-16 mx-auto text-muted-foreground/40" />
                      <h4 className="text-xl font-semibold text-foreground">Video Preview Coming Soon!</h4>
                      <p className="text-sm text-muted-foreground max-w-md">
                        The video for this project is currently being prepared. Check back shortly to see the full showcase.
                      </p>
                    </div>
                  </div>
                ) : (
                  // Actual video embed
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={data.videoEmbed}
                      title={`${data.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                )}
              </div>
            ) : null}

            {/* Tags Section - Below video */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 -mt-2">
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

            {/* Two-column layout on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Main content (2/3 width on desktop) */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">About This Project</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.description}
                  </p>
                </div>

                {/* Awards & Achievements Section */}
                {data.awards && data.awards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Awards & Recognition</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {data.awards.map((award, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="flex-1">{award}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* My Role Section */}
                {data.role && data.role.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">My Role</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {data.role.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right column - Links and metadata (1/3 width on desktop) */}
              <div className="space-y-4">
                {/* Links Card */}
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

                {/* Technical Details */}
                {data.technicalDetails && (
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <h4 className="text-sm font-semibold mb-3">Details</h4>
                    <div className="space-y-3 text-sm">
                      {data.technicalDetails.format && (
                        <div>
                          <p className="text-muted-foreground mb-1">Format</p>
                          <p className="font-medium">{data.technicalDetails.format}</p>
                        </div>
                      )}
                      {data.technicalDetails.duration && (
                        <div>
                          <p className="text-muted-foreground mb-1">Duration</p>
                          <p className="font-medium">{data.technicalDetails.duration}</p>
                        </div>
                      )}
                      {data.technicalDetails.client && (
                        <div>
                          <p className="text-muted-foreground mb-1">Client</p>
                          <p className="font-medium">{data.technicalDetails.client}</p>
                        </div>
                      )}
                      {data.technicalDetails.year && (
                        <div>
                          <p className="text-muted-foreground mb-1">Year</p>
                          <p className="font-medium">{data.technicalDetails.year}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tools Section - Full width at bottom */}
            {data.tools && data.tools.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <h4 className="text-sm font-semibold mb-4">Tools & Software</h4>
                <TooltipProvider delayDuration={200}>
                  <div className="flex flex-wrap gap-6 justify-start items-center">
                    {data.tools.map((tool, idx) => {
                      // Check if it's a wider logo (Blender or Unreal Engine)
                      const isWideLogo = tool.name.includes('Blender') || tool.name.includes('Unreal');
                      return (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <div
                              className={`relative h-12 transition-transform hover:scale-110 cursor-pointer ${
                                isWideLogo ? 'w-24' : 'w-12'
                              }`}
                            >
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
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
