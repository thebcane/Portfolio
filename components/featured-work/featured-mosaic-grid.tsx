'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredData, type FeaturedCard } from '@/lib/data/featured';
import { AudioShowcaseCard } from '@/components/featured-work/audio-showcase-card';
import { VideoLandscapeCard } from '@/components/featured-work/video-landscape-card';
import { VideoStemPlayerCard } from '@/components/featured-work/video-stem-player-card';
import { MusicShowcaseCard } from '@/components/featured-work/music-showcase-card';
import MultipleSelector, { type Option } from '@/components/ui/multiselect';
import { Button } from '@/components/ui/button';

// Constants
const INITIAL_COUNT = 12;
const LOAD_INCREMENT = 6;

/**
 * Determines card column span based on card type
 * Video cards span 2 columns (landscape format)
 * Audio/Music cards span 1 column (portrait format)
 */
const getCardSpanClass = (card: FeaturedCard): string => {
  return card.type === 'video' ? 'md:col-span-2' : 'md:col-span-1';
};

export function FeaturedMosaicGrid() {
  // State
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Extract all cards (audio, video, music - NOT project)
  const allCards = useMemo(() => {
    return featuredData.featuredCards.filter(
      (card) => card.type === 'audio' || card.type === 'video' || card.type === 'music'
    );
  }, []);

  // Extract unique tags from all cards
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();

    allCards.forEach((card) => {
      if (card.tags) {
        card.tags.forEach((tag) => tagSet.add(tag));
      }
    });

    return Array.from(tagSet)
      .sort()
      .map((tag) => ({
        value: tag,
        label: tag,
      }));
  }, [allCards]);

  // Filter cards based on selected tags (OR logic)
  const filteredCards = useMemo(() => {
    if (selectedTags.length === 0) return allCards;

    return allCards.filter((card) => {
      if (!card.tags || card.tags.length === 0) return false;

      return card.tags.some((cardTag) =>
        selectedTags.some((selected) => selected.value === cardTag)
      );
    });
  }, [allCards, selectedTags]);

  // Slice visible cards based on pagination
  const visibleCards = useMemo(() => {
    return filteredCards.slice(0, visibleCount);
  }, [filteredCards, visibleCount]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [selectedTags]);

  // Load more handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_INCREMENT);
  };

  // Check if more cards available
  const hasMore = visibleCount < filteredCards.length;

  // Render card based on type
  const renderCard = (card: FeaturedCard, index: number) => {
    if (card.type === 'audio') {
      return <AudioShowcaseCard data={card} index={index} />;
    }

    if (card.type === 'video') {
      // Check if video has audio stems - use VideoStemPlayerCard if so
      const hasStems = card.videoFile && card.audioStems && card.audioStems.length > 0;
      console.log('Video card rendering:', {
        id: card.id,
        title: card.title,
        hasVideoFile: !!card.videoFile,
        hasAudioStems: !!card.audioStems,
        stemsCount: card.audioStems?.length,
        willUseVideoStemPlayerCard: hasStems
      });

      if (hasStems) {
        return <VideoStemPlayerCard data={card} index={index} />;
      }
      // Otherwise use standard video card
      return <VideoLandscapeCard data={card} index={index} />;
    }

    if (card.type === 'music') {
      return <MusicShowcaseCard data={card} index={index} />;
    }

    return null;
  };

  // Get card wrapper class with proper span
  const getCardClass = (card: FeaturedCard) => {
    return getCardSpanClass(card);
  };

  return (
    <section className="space-y-6">
      {/* Filter UI */}
      <div className="mb-6">
        <MultipleSelector
          value={selectedTags}
          onChange={setSelectedTags}
          defaultOptions={allTags}
          placeholder="Filter by tags..."
          className="max-w-2xl"
          hidePlaceholderWhenSelected
          emptyIndicator={<p className="text-center text-sm text-muted-foreground">No tags found</p>}
        />
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visibleCards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={getCardClass(card)}
            >
              {renderCard(card, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg mb-4">
            No work found matching selected tags
          </p>
          <Button variant="outline" onClick={() => setSelectedTags([])}>
            Clear Filters
          </Button>
        </motion.div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            className="group"
          >
            Load More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      )}

      {/* End of List Message */}
      {!hasMore && filteredCards.length > INITIAL_COUNT && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8"
        >
          You've reached the end!
        </motion.p>
      )}
    </section>
  );
}
