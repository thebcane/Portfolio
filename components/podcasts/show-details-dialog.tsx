"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Youtube,
  Music,
  Instagram,
  Twitter,
  Globe,
  Apple,
  ExternalLink,
} from "lucide-react";
import type { AudioCardData } from "@/lib/data/featured";

interface ShowDetailsDialogProps {
  data: AudioCardData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getLinkIcon = (iconType?: string) => {
  switch (iconType) {
    case "youtube":
      return <Youtube className="w-4 h-4" />;
    case "spotify":
      return <Music className="w-4 h-4" />;
    case "instagram":
      return <Instagram className="w-4 h-4" />;
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "apple":
      return <Apple className="w-4 h-4" />;
    case "website":
      return <Globe className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

export function ShowDetailsDialog({
  data,
  open,
  onOpenChange,
}: ShowDetailsDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <div className="flex items-start gap-4 sm:gap-5">
            {data.thumbnail && (
              <img
                src={data.thumbnail}
                alt={data.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0 shadow-lg"
              />
            )}
            <div className="flex-1 min-w-0 text-left">
              <DialogTitle className="text-xl sm:text-2xl font-semibold mb-1">
                {data.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {data.category}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tags */}
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

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-2 text-foreground">
            About this show
          </h3>
          <p className="text-sm text-muted-foreground font-light leading-relaxed whitespace-pre-line">
            {data.description}
          </p>
        </div>

        {/* Showcase stats */}
        {data.showcaseStats && data.showcaseStats.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-lg border border-white/10 bg-white/[0.02]">
            {data.showcaseStats.map((stat, i) => (
              <div key={i} className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 font-medium mb-1 truncate">
                  {stat.label}
                </p>
                <p className="text-base sm:text-lg font-semibold tracking-tight text-foreground leading-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        {data.links && data.links.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold mb-3 text-foreground">
              Where to listen
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-white/10 bg-white/[0.03] text-foreground hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                >
                  {getLinkIcon(link.icon)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {data.tools && data.tools.length > 0 && (
          <div className="mt-5 p-4 rounded-lg border border-white/10 bg-white/[0.02]">
            <h4 className="text-xs font-semibold mb-3 text-foreground uppercase tracking-wider">
              Tools used
            </h4>
            <TooltipProvider delayDuration={200}>
              <div className="flex flex-wrap gap-5 items-center">
                {data.tools.map((tool, idx) => (
                  <Tooltip key={idx}>
                    <TooltipTrigger asChild>
                      <div className="relative w-10 h-10 transition-transform hover:scale-110 cursor-pointer">
                        <Image
                          src={tool.logo}
                          alt={tool.name}
                          fill
                          className="object-contain"
                          unoptimized
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
        )}
      </DialogContent>
    </Dialog>
  );
}
