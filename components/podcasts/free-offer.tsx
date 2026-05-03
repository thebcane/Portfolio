"use client";

import { motion } from "framer-motion";
import { Check, Gift, Upload } from "lucide-react";

interface FreeOfferProps {
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
}

export function FreeOffer({
  title,
  description,
  bullets,
  ctaLabel,
  ctaHref,
}: FreeOfferProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative content-card gradient-border rounded-[14px] sm:rounded-[20px] overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative">
        {/* Top: horizontal split — left intro, right bullets */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 lg:pb-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
              <Gift className="w-3.5 h-3.5" />
              The Offer
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.1]">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed max-w-md">
              {description}
            </p>
          </div>

          <ul className="space-y-3 lg:border-l lg:border-white/10 lg:pl-12 self-center">
            {bullets.map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm sm:text-[15px] text-foreground/90 font-light"
              >
                <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: full-width CTA band */}
        <div className="relative border-t border-white/5 px-6 sm:px-10 lg:px-12 py-5 sm:py-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/[0.015] text-center sm:text-left">
          <p className="text-sm text-muted-foreground font-light max-w-md">
            No call required. Just send me the file.
          </p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
