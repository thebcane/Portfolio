"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface WhoItsForProps {
  forTitle: string;
  forItems: string[];
  notForTitle: string;
  notForItems: string[];
}

export function WhoItsFor({
  forTitle,
  forItems,
  notForTitle,
  notForItems,
}: WhoItsForProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="content-card gradient-border p-6 sm:p-8 rounded-[14px] relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Check className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <h3 className="text-lg sm:text-xl font-semibold">{forTitle}</h3>
          </div>
          <ul className="space-y-3">
            {forItems.map((item, i) => (
              <li
                key={i}
                className="text-sm sm:text-[15px] text-foreground/90 font-light leading-relaxed pl-6 relative"
              >
                <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="content-card p-6 sm:p-8 rounded-[14px] relative overflow-hidden"
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400/80">
              <X className="w-5 h-5" strokeWidth={2.5} />
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground">
              {notForTitle}
            </h3>
          </div>
          <ul className="space-y-3">
            {notForItems.map((item, i) => (
              <li
                key={i}
                className="text-sm sm:text-[15px] text-muted-foreground font-light leading-relaxed pl-6 relative"
              >
                <span className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full bg-rose-400/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
