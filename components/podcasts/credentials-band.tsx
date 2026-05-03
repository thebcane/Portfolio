"use client";

import { motion } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

interface CredentialsBandProps {
  stats: Stat[];
}

export function CredentialsBand({ stats }: CredentialsBandProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="content-card gradient-border rounded-[14px] sm:rounded-[20px] p-6 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`text-center lg:text-left ${
              i > 0 ? "lg:border-l lg:border-white/10 lg:pl-8" : ""
            }`}
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent mb-1">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground font-light leading-snug">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
