"use client";

import { motion } from "framer-motion";
import { ArrowRight, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicesHeroProps {
  headline: string;
  subhead: string;
  credentials: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  bannerSrc?: string;
}

export function ServicesHero({
  headline,
  subhead,
  credentials,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  bannerSrc = "/images/Banners/Brendan_Banner_1.png",
}: ServicesHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3.75rem)] sm:-mx-[30px] xl:w-[calc(100%+5rem)] xl:-mx-[40px] overflow-hidden rounded-[14px] sm:rounded-[20px] mb-2 sm:mb-4 -mt-4 sm:-mt-[30px] xl:-mt-[40px]",
        "min-h-[560px] sm:min-h-[500px] lg:min-h-[560px]"
      )}
    >
      {/* Banner image — full coverage, no heavy global tinting */}
      <img
        src={bannerSrc}
        alt="Brendan Cane"
        className="absolute inset-0 w-full h-full object-cover object-[78%_-120px] sm:object-right"
      />

      {/* Mobile gradient: vertical (top portrait visible, bottom solid for text) */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12, 12, 16, 0.35) 0%, rgba(12, 12, 16, 0.55) 30%, rgba(12, 12, 16, 0.9) 55%, rgba(12, 12, 16, 0.98) 75%, rgba(12, 12, 16, 1) 100%)",
        }}
      />

      {/* Desktop gradient: horizontal (left solid, right transparent) */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(to right, rgba(12, 12, 16, 0.97) 0%, rgba(12, 12, 16, 0.92) 30%, rgba(12, 12, 16, 0.55) 55%, rgba(12, 12, 16, 0.15) 75%, rgba(12, 12, 16, 0) 100%)",
        }}
      />

      {/* Content — bottom on mobile, left half on desktop */}
      <div className="relative h-full min-h-[560px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-end sm:justify-center p-5 sm:p-10 lg:p-14">
        <div className="max-w-[460px] lg:max-w-[520px] space-y-3 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 backdrop-blur-md text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            14+ years of audio excellence
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold tracking-tight leading-[1.05] text-white">
            {headline}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/85 font-light leading-snug">
            {subhead}
          </p>

          <p className="text-xs sm:text-sm text-white/65 font-light leading-relaxed border-l-2 border-primary/60 pl-4 whitespace-pre-line">
            {credentials}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={ctaPrimaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              <Upload className="w-4 h-4" />
              {ctaPrimaryLabel}
            </a>
            <a
              href={ctaSecondaryHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-md text-white text-sm sm:text-base font-medium hover:bg-white/10 transition-colors"
            >
              {ctaSecondaryLabel}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
