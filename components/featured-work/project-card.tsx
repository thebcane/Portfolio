'use client';

import { motion } from 'framer-motion';
import { Briefcase, ExternalLink } from 'lucide-react';
import type { ProjectCardData } from '@/lib/data/featured';

export function ProjectCard({
  data,
  index = 0
}: {
  data: ProjectCardData;
  index?: number;
}) {
  const handleClick = () => {
    if (data.link) {
      window.open(data.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative gradient-border p-5 sm:p-[30px] rounded-[14px] shadow-[var(--shadow-2)] z-[1] flex flex-col transition-shadow ${
        data.link ? 'cursor-pointer hover:shadow-[var(--shadow-3)]' : ''
      }`}
      onClick={handleClick}
    >
      {/* Optional thumbnail */}
      {data.image && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex items-start gap-[18px]">
        <div className="icon-box flex-shrink-0 mt-[5px]">
          <Briefcase className="w-[18px] h-[18px]" />
        </div>
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold capitalize mb-[7px]">
            {data.title}
          </h4>
          <p className="text-xs text-muted-foreground mb-3">{data.category}</p>
          <p className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* External link indicator */}
      {data.link && (
        <div className="absolute top-5 sm:top-[30px] right-5 sm:right-[30px]">
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}
