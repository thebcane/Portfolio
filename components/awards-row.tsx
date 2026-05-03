"use client";

import { motion } from "framer-motion";
import { ScrollNavigation } from "@/components/ui/scroll-navigation";
import type { Award } from "@/lib/data/profile";

interface AwardsRowProps {
  awards: Award[];
  showCaptions?: boolean;
  heading?: string;
  scrollId?: string;
}

export function AwardsRow({
  awards,
  showCaptions = false,
  heading = "Awards & Recognition",
  scrollId = "awards-row-scroll",
}: AwardsRowProps) {
  const getAwardColor = (name: string) => {
    if (name.includes("Golden Globe")) return "text-amber-400";
    if (name.includes("Winner")) return "text-yellow-500";
    if (name.includes("Honoree")) return "text-slate-300";
    return "text-foreground";
  };

  return (
    <section className="awards mb-[30px]">
      {heading && (
        <h3 className="text-lg sm:text-2xl font-semibold capitalize mb-5">
          {heading}
        </h3>
      )}
      <div className="relative">
        <ScrollNavigation containerId={scrollId} />
        <div
          id={scrollId}
          className="flex justify-start items-stretch gap-[15px] sm:gap-[30px] -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory"
        >
        {awards.map((award, index) => {
          const [showName, awardType] = award.name.split(" - ");

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] snap-center"
            >
              <div className="content-card p-[15px] sm:p-[30px] flex flex-col items-center text-center h-full">
                <figure className="mb-4 w-full aspect-square max-w-[200px] flex items-center justify-center overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={award.image}
                    alt={award.name}
                    className="w-full h-full object-contain"
                  />
                </figure>
                <h4
                  className={`text-base sm:text-lg font-semibold mb-1 ${getAwardColor(
                    award.name
                  )}`}
                >
                  {awardType}
                </h4>
                <p className="text-sm sm:text-[15px] text-foreground font-medium mb-2">
                  {showName}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-light mb-1">
                  {award.category}
                </p>
                <time className="text-xs sm:text-sm text-muted-foreground font-light">
                  {award.year}
                </time>
                {showCaptions && award.caption && (
                  <p className="text-xs sm:text-sm text-muted-foreground/80 font-light italic leading-relaxed mt-3 px-2">
                    {award.caption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
