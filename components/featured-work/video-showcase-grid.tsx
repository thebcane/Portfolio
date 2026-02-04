'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoLandscapeCard } from './video-landscape-card';
import { featuredData } from '@/lib/data/featured';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { ScrollNavigation } from '@/components/ui/scroll-navigation';

/**
 * Grid component that displays video cards in landscape format
 * with hover animations and interactive elements
 */
export function VideoShowcaseGrid() {
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  // Get all video cards
  const videoCards = useMemo(
    () =>
      featuredData.featuredCards.filter(
        (card) => card.type === 'video' && card.thumbnail
      ),
    []
  );

  // Extract all unique tags from the video cards and convert to Options
  const tagOptions = useMemo(() => {
    const tags = new Set<string>();
    videoCards.forEach((card) => {
      if ('tags' in card && card.tags) {
        card.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags)
      .sort()
      .map((tag) => ({ value: tag.toLowerCase(), label: tag }));
  }, [videoCards]);

  // Filter cards based on selected tags
  const filteredCards = useMemo(() => {
    if (selectedTags.length === 0) return videoCards;
    return videoCards.filter((card) => {
      if (!('tags' in card) || !card.tags) return false;
      // Show card if it has ANY of the selected tags
      return selectedTags.some((selectedTag) =>
        card.tags?.some((cardTag) => cardTag.toLowerCase() === selectedTag.value)
      );
    });
  }, [videoCards, selectedTags]);

  return (
    <section className="space-y-6">
      {/* Title and Filter Multi-Select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h3 className="text-lg sm:text-2xl font-semibold capitalize">Visual Projects</h3>
        <div className="w-full sm:w-auto sm:min-w-[280px] sm:max-w-[320px]">
          <MultipleSelector
            value={selectedTags}
            onChange={setSelectedTags}
            defaultOptions={tagOptions}
            placeholder="Filter by tags..."
            hideClearAllButton={false}
            hidePlaceholderWhenSelected
            emptyIndicator={
              <p className="text-center text-sm text-muted-foreground">No tags found</p>
            }
          />
        </div>
      </div>

      {/* Horizontal scrolling grid with 2 rows, continuing horizontally */}
      <div className="relative">
        <ScrollNavigation containerId="video-showcase-scroll" />
        <div
          id="video-showcase-scroll"
          className="grid grid-rows-2 grid-flow-col auto-cols-[60%] md:auto-cols-[55%] lg:auto-cols-[45%] gap-6 -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory"
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => {
              if (card.type === 'video') {
                return <VideoLandscapeCard key={card.id} data={card} index={index} />;
              }
              return null;
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Empty state if no videos */}
      {filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <p>No videos found for the selected tag.</p>
        </motion.div>
      )}
    </section>
  );
}
