"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface PremiumCardProps {
  eyebrow: string;
  headline: string;
  priceRange: string;
  priceUnit: string;
  tagline: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}

export function PremiumCard({
  eyebrow,
  headline,
  priceRange,
  priceUnit,
  tagline,
  bullets,
  ctaLabel,
  ctaHref,
}: PremiumCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative content-card rounded-[14px] sm:rounded-[20px] overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 font-medium mb-2">
              {eyebrow}
            </p>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
              {headline}
            </h3>
          </div>
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-accent flex-shrink-0">
            <Sparkles className="w-5 h-5" strokeWidth={1.75} />
          </span>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground font-light mb-6 leading-relaxed">
          {tagline}
        </p>

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground/90">
              {priceRange}
            </span>
            <span className="text-sm text-muted-foreground font-light">
              {priceUnit}
            </span>
          </div>
          <p className="text-xs text-muted-foreground/70 font-light mt-1">
            Scope-dependent. Quoted per show.
          </p>
        </div>

        {/* What's different */}
        <div className="flex-1 mb-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60 font-medium mb-3">
            Includes everything in retainer, plus
          </p>
          <ul className="space-y-2.5">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-foreground/85 font-light leading-relaxed"
              >
                <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-accent/60" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-between gap-2 px-5 py-3.5 rounded-lg border border-white/15 bg-white/[0.03] text-foreground text-sm font-medium hover:bg-white/[0.06] hover:border-white/25 transition-colors"
        >
          <span>{ctaLabel}</span>
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
        </a>
      </div>
    </motion.div>
  );
}
