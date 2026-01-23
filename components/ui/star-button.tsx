"use client";

import React, { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface StarBackgroundProps {
  color?: string;
}

function StarBackground({ color }: StarBackgroundProps) {
  return (
    <svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_408_119)">
        {/* Generate more, smaller stars across the entire viewBox */}
        {Array.from({ length: 80 }).map((_, i) => {
          const x = (i * 17 + Math.sin(i) * 30) % 400;
          const y = (i * 13 + Math.cos(i) * 25) % 80;
          const size = 0.4 + (i % 3) * 0.15;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={size}
              fill={color || "currentColor"}
              opacity={0.3 + (i % 4) * 0.15}
            />
          );
        })}
      </g>
      <defs>
        <clipPath id="clip0_408_119">
          <rect width="400" height="80" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

interface StarButtonProps {
  children: ReactNode;
  lightWidth?: number;
  duration?: number;
  lightColor?: string;
  backgroundColor?: string;
  borderWidth?: number;
  className?: string;
}

export function StarButton({
  children,
  lightWidth = 110,
  duration = 3,
  lightColor = "#FAFAFA",
  backgroundColor = "currentColor",
  borderWidth = 2,
  className,
  ...props
}: StarButtonProps) {
  const pathRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const div = pathRef.current;
      div.style.setProperty(
        "--path",
        `path('M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0')`,
      );
    }
  }, []);

  return (
    <button
      style={
        {
          "--duration": duration,
          "--light-width": `${lightWidth}px`,
          "--light-color": lightColor,
          "--border-width": `${borderWidth}px`,
          isolation: "isolate",
        } as CSSProperties
      }
      ref={pathRef}
      className={cn(
        "relative z-[3] overflow-hidden h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 group/star-button",
        className,
      )}
      {...props}
    >
      <div
        className="absolute aspect-square inset-0 animate-star-btn bg-[radial-gradient(ellipse_at_center,var(--light-color),transparent,transparent)]"
        style={
          {
            offsetPath: "var(--path)",
            offsetDistance: "0%",
            width: "var(--light-width)",
          } as CSSProperties
        }
      />
      <div
        className="absolute inset-0 dark:border-white/15 border-black/10 z-[4] overflow-hidden rounded-[inherit] dark:text-black text-white"
        style={{ borderWidth: "var(--border-width)" }}
        aria-hidden="true"
      >
        <StarBackground color={backgroundColor} />
      </div>
      <span className="z-10 relative bg-gradient-to-t dark:from-white dark:to-neutral-500 from-black to-neutral-400 inline-flex items-center justify-center gap-2 text-transparent bg-clip-text">
        {children}
      </span>
    </button>
  );
}
