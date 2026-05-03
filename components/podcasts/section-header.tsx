"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  number?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center max-w-2xl mx-auto" : ""}
    >
      <div
        className={`flex items-center gap-3 mb-3 sm:mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {number && (
          <span className="text-xs font-mono tabular-nums text-primary/70 tracking-widest">
            — {number}
          </span>
        )}
        {eyebrow && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 font-medium">
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.15] mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
