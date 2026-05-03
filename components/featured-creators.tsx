"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Eye, Video } from "lucide-react";
import { ScrollNavigation } from "@/components/ui/scroll-navigation";
import type { Creator } from "@/lib/data/profile";

interface FeaturedCreatorsProps {
  creators: Creator[];
  showTitles?: boolean;
  heading?: string;
  scrollId?: string;
}

export function FeaturedCreators({
  creators,
  showTitles = false,
  heading = "Featured Creators",
  scrollId = "featured-creators-scroll",
}: FeaturedCreatorsProps) {
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);

  return (
    <section className="creators mb-[30px]">
      {heading && (
        <h3 className="text-lg sm:text-2xl font-semibold capitalize mb-5">
          {heading}
        </h3>
      )}
      <div className="relative">
        <ScrollNavigation containerId={scrollId} />
        <div
          id={scrollId}
          className="flex justify-start items-start gap-[15px] sm:gap-[30px] -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory"
        >
        {creators.map((creator, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[280px] sm:min-w-[320px] snap-center cursor-pointer"
            onClick={() => setSelectedCreator(index)}
          >
            <div className="content-card p-[15px] sm:p-[30px] pt-[45px] sm:pt-[25px] relative">
              <figure className="absolute top-0 left-0 transform translate-x-[15px] sm:translate-x-[30px] -translate-y-[25px] sm:-translate-y-[30px] bg-gradient-to-br from-[hsl(240,1%,25%)] to-[hsl(0,0%,19%)] rounded-[14px] sm:rounded-[20px] shadow-[var(--shadow-1)]">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-[60px] h-[60px] sm:w-20 sm:h-20 rounded-[14px] sm:rounded-[20px] object-cover"
                />
              </figure>
              <h4 className="text-base sm:text-lg font-semibold capitalize mb-[3px] sm:mb-[4px] ml-0 sm:ml-[95px]">
                {creator.name}
              </h4>
              {showTitles && creator.show && (
                <p className="text-xs sm:text-sm text-muted-foreground font-light mb-[7px] sm:mb-[10px] ml-0 sm:ml-[95px] truncate">
                  {creator.show}
                </p>
              )}
              {!showTitles && <div className="mb-[4px] sm:mb-[6px]" />}
              <div className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 opacity-60" />
                    Subscribers:
                  </span>
                  <span className="font-medium">{creator.subscribers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 opacity-60" />
                    Total Views:
                  </span>
                  <span className="font-medium">{creator.totalViews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 opacity-60" />
                    Videos:
                  </span>
                  <span className="font-medium">{creator.videoCount}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      {/* Creator Modal */}
      <Dialog
        open={selectedCreator !== null}
        onOpenChange={() => setSelectedCreator(null)}
      >
        <DialogContent className="sm:max-w-[680px]">
          {selectedCreator !== null && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 sm:gap-[25px] mb-4">
                  <figure className="bg-gradient-to-br from-[hsl(240,1%,25%)] to-[hsl(0,0%,19%)] rounded-[18px]">
                    <img
                      src={creators[selectedCreator].avatar}
                      alt={creators[selectedCreator].name}
                      className="w-[65px] h-[65px] sm:w-20 sm:h-20 rounded-[18px] object-cover"
                    />
                  </figure>
                  <div>
                    <DialogTitle className="text-lg sm:text-xl">
                      {creators[selectedCreator].name}
                    </DialogTitle>
                    {showTitles && creators[selectedCreator].show && (
                      <p className="text-sm text-muted-foreground mb-1">
                        {creators[selectedCreator].show}
                      </p>
                    )}
                    <a
                      href={creators[selectedCreator].youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-[15px] text-muted-foreground hover:text-foreground font-light transition-colors underline"
                    >
                      Visit YouTube Channel
                    </a>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 opacity-60" />
                    Subscribers:
                  </span>
                  <span className="font-medium text-foreground">
                    {creators[selectedCreator].subscribers}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Eye className="w-4 h-4 opacity-60" />
                    Total Views:
                  </span>
                  <span className="font-medium text-foreground">
                    {creators[selectedCreator].totalViews}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Video className="w-4 h-4 opacity-60" />
                    Videos:
                  </span>
                  <span className="font-medium text-foreground">
                    {creators[selectedCreator].videoCount}
                  </span>
                </div>
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
