'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AudioShowcaseCard } from './audio-showcase-card';
import { MusicShowcaseCard } from './music-showcase-card';
import { featuredData } from '@/lib/data/featured';
import type { AudioCardData, MusicCardData } from '@/lib/data/featured';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

/**
 * Grid component that displays audio and music cards in the showcase style
 * with larger artwork-focused design, hover animations, and interactive elements
 */
export function AudioShowcaseGrid() {
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  // Get all audio and music cards with thumbnails, mixed together
  const showcaseCards = useMemo(() => {
    const audioCards = featuredData.featuredCards.filter(
      (card): card is AudioCardData => card.type === 'audio' && card.thumbnail !== undefined
    );
    const musicCards = featuredData.featuredCards.filter(
      (card): card is MusicCardData => card.type === 'music' && card.thumbnail !== undefined
    );

    // Mix audio and music cards together in an alternating pattern
    const mixed: (AudioCardData | MusicCardData)[] = [];
    const maxLength = Math.max(audioCards.length, musicCards.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < audioCards.length) mixed.push(audioCards[i]);
      if (i < musicCards.length) mixed.push(musicCards[i]);
    }

    return mixed;
  }, []);

  // Extract all unique tags from the cards and convert to Options
  const tagOptions = useMemo(() => {
    const tags = new Set<string>();
    showcaseCards.forEach((card) => {
      if ('tags' in card && card.tags) {
        card.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags)
      .sort()
      .map((tag) => ({ value: tag.toLowerCase(), label: tag }));
  }, [showcaseCards]);

  // Filter cards based on selected tags
  const filteredCards = useMemo(() => {
    if (selectedTags.length === 0) return showcaseCards;
    return showcaseCards.filter((card) => {
      if (!('tags' in card) || !card.tags) return false;
      // Show card if it has ANY of the selected tags
      return selectedTags.some((selectedTag) =>
        card.tags?.some((cardTag) => cardTag.toLowerCase() === selectedTag.value)
      );
    });
  }, [showcaseCards, selectedTags]);

  return (
    <section className="space-y-6">
      {/* Title and Filter Multi-Select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <h3 className="text-lg sm:text-2xl font-semibold capitalize">Music & Audio Shows</h3>
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

      {/* Horizontal scrolling grid with 2 rows, 3 columns */}
      <div className="grid grid-rows-2 grid-flow-col auto-cols-[minmax(200px,1fr)] md:auto-cols-[minmax(240px,1fr)] gap-6 -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory">
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, index) => {
            if (card.type === 'music') {
              return <MusicShowcaseCard key={card.id} data={card} index={index} />;
            }
            return <AudioShowcaseCard key={card.id} data={card} index={index} />;
          })}
        </AnimatePresence>
      </div>

      {/* Optional: Add a description or CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>Explore my work in audio production, sound design, and music composition</p>
      </motion.div>
    </section>
  );
}
