'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Youtube, Instagram, Twitter, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

export function VideoShowcaseCard({
  data,
  index = 0,
}: {
  data: VideoCardData;
  index?: number;
}) {
  // State
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative w-full max-w-[400px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card Container */}
      <div
        className="relative rounded-[20px] overflow-hidden bg-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[hsl(0,0%,22%)] transition-all duration-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] hover:scale-[1.02] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Artwork Image - Width constrained, height auto */}
        {data.thumbnail && (
          <div className="relative w-full aspect-square">
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
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        )}

        {/* Play Button - Centered over artwork, appears on hover */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]
                     flex items-center justify-center
                     transition-all duration-300 ${
                       isHovered
                         ? 'opacity-100 scale-100'
                         : 'opacity-0 scale-75'
                     }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Watch video"
        >
          <Play className="w-6 h-6 text-black fill-black ml-1" />
        </motion.button>

        {/* Bottom Bar - Always visible, centered content */}
        <div className="relative bg-[#18191E] backdrop-blur-md">
          <div className="px-6 py-4 flex items-center justify-center min-h-[60px]">
            <p className="text-white/80 text-sm font-medium text-center">
              Watch Now
            </p>
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

          <div className="mt-4 space-y-6">
            {/* Video Embed Section - Full width at top */}
            {data.videoEmbed && (
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
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
