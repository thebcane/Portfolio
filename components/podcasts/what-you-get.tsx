"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WhatYouGetProps {
  items: { label: string; description: string }[];
}

export function WhatYouGet({ items }: WhatYouGetProps) {
  return (
    <ul className="divide-y divide-white/8">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
          className="grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,280px)_minmax(0,1fr)] gap-x-5 sm:gap-x-8 gap-y-2 py-6 sm:py-8 first:pt-0 last:pb-0 items-baseline"
        >
          <span className="text-xs font-mono tabular-nums text-primary/60 tracking-widest pt-1">
            0{i + 1}
          </span>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight">
            {item.label}
          </h3>

          <p className="col-start-2 sm:col-start-3 text-sm sm:text-base text-muted-foreground font-light leading-relaxed flex items-start gap-3 pt-1 sm:pt-2">
            <Check
              className="w-4 h-4 text-primary/70 mt-0.5 flex-shrink-0"
              strokeWidth={2.5}
            />
            <span>{item.description}</span>
          </p>
        </motion.li>
      ))}
    </ul>
  );
}
