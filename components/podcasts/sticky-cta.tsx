"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload } from "lucide-react";

interface StickyCtaProps {
  label: string;
  href: string;
  showAfterY?: number;
}

export function StickyCta({ label, href, showAfterY = 600 }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfterY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          className="fixed bottom-[88px] left-6 right-6 sm:left-8 sm:right-8 z-40 xl:hidden pointer-events-none"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-2xl shadow-primary/30 border border-primary/30 backdrop-blur-md"
          >
            <Upload className="w-4 h-4" />
            {label}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
