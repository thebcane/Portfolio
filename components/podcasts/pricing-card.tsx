"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Upload } from "lucide-react";

interface IncludedItem {
  label: string;
  description: string;
}

interface Tier {
  label: string;
  price: number;
  detail: string;
}

interface PricingCardProps {
  eyebrow: string;
  headline: string;
  tagline: string;
  tiers: { weekly: Tier; biweekly: Tier };
  footnote: string;
  ctaLabel: string;
  ctaHref: string;
  includes?: IncludedItem[];
}

const formatPrice = (n: number) => `$${n.toLocaleString()}`;

export function PricingCard({
  eyebrow,
  headline,
  tagline,
  tiers,
  footnote,
  ctaLabel,
  ctaHref,
  includes,
}: PricingCardProps) {
  const [active, setActive] = useState<"weekly" | "biweekly">("weekly");
  const [expanded, setExpanded] = useState(false);

  const tier = tiers[active];

  return (
    <motion.div
      id="pricing"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative content-card gradient-border rounded-[14px] sm:rounded-[20px] overflow-hidden h-full flex flex-col"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative p-6 sm:p-10 lg:p-12 flex flex-col flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium mb-2">
              {eyebrow}
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {headline}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground font-light mt-1">
              {tagline}
            </p>
          </div>

          <span className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] uppercase tracking-[0.18em] font-medium whitespace-nowrap">
            Most popular
          </span>
        </div>

        {/* Tier toggle */}
        <div
          className="grid grid-cols-2 gap-1.5 p-1.5 rounded-xl border border-white/10 bg-black/30 mb-8"
          role="tablist"
          aria-label="Episodes per week"
        >
          {(["weekly", "biweekly"] as const).map((key) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(key)}
                className={`relative px-3 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tiers[key].label}
              </button>
            );
          })}
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
                  {formatPrice(tier.price)}
                </span>
                <span className="text-lg sm:text-xl text-muted-foreground font-light">
                  /month
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-light">
                {tier.detail} · Up to 60 minutes each
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 mb-6"
        >
          <Upload className="w-4 h-4" />
          {ctaLabel}
        </a>

        {/* Expandable "What's included" */}
        {includes && includes.length > 0 && (
          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="w-full flex items-center justify-between gap-4 px-4 py-3.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-primary/70 font-medium">
                What's included
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="pt-4 px-1 space-y-3.5">
                    {includes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 py-1.5 border-b border-white/5 last:border-b-0 last:pb-0"
                      >
                        <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground mb-0.5">
                            {item.label}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <p className="text-xs text-muted-foreground/70 font-light leading-relaxed text-center mt-6">
          {footnote}
        </p>
      </div>
    </motion.div>
  );
}
