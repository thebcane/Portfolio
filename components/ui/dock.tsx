"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"

interface DockProps {
  className?: string
  items: {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick?: () => void
    tooltip?: string
  }[]
  activeLabel?: string
}

export default function Dock({ items, className, activeLabel }: DockProps) {
  const [hovered, setHovered] = React.useState<number | null>(null)

  return (
    <div className={cn("flex items-center justify-center w-full py-8", className)}>
      <motion.div
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "flex items-end gap-2 px-3 py-2 rounded-2xl shadow-lg"
        )}
        style={{
          transform: "perspective(600px) rotateX(10deg)", // arc layout illusion
          background: "rgba(26, 28, 34, 0.65)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        }}
      >
        <TooltipProvider delayDuration={100}>
          {items.map((item, i) => {
            const isActive = activeLabel === item.label
            const isHovered = hovered === i

            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isHovered ? 1.2 : 1,
                      rotate: isHovered ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex flex-col items-center"
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "rounded-xl relative px-4 py-1.5 h-auto",
                        "transition-colors",
                        "hover:bg-transparent",
                        (isActive || isHovered) ? "border border-border" : "border-0",
                        isHovered && "shadow-lg shadow-primary/10"
                      )}
                      onClick={() => {
                        item.onClick?.()
                      }}
                    >
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                      {/* Active glow effect */}
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-xl bg-primary/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Button>

                    {/* Active indicator dot below */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      />
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs bg-card border-border">
                  {item.tooltip || item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </motion.div>
    </div>
  )
}
