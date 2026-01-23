"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  size?: "large" | "small";
  objectPosition?: string;
  objectFit?: "cover" | "contain";
}

export function HeroImage({ src, alt, title, subtitle, size = "small", objectPosition = "center", objectFit = "cover" }: HeroImageProps) {
  const heightClasses = size === "large"
    ? "h-[250px] sm:h-[350px] lg:h-[450px]"
    : "h-[150px] sm:h-[200px] lg:h-[250px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative w-[calc(100%+2rem)] -mx-4 sm:w-[calc(100%+3.75rem)] sm:-mx-[30px] xl:w-[calc(100%+5rem)] xl:-mx-[40px] overflow-hidden rounded-[14px] sm:rounded-[20px] mb-6 sm:mb-8 -mt-4 sm:-mt-[30px] xl:-mt-[40px]",
        heightClasses
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full", objectFit === "contain" ? "object-contain" : "object-cover")}
        style={{ objectPosition }}
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6 lg:p-10">
          {title && (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-1 sm:mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base lg:text-lg text-white/90">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
