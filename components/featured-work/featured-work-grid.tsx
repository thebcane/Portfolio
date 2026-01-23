'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioCard } from './audio-card';
import { ProjectCard } from './project-card';
import { featuredData } from '@/lib/data/featured';

export function FeaturedWorkGrid() {
  const handleSeeAllProjects = () => {
    // Scroll to portfolio section
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-5">
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {featuredData.featuredCards.map((card, index) => {
          if (card.type === 'audio') {
            return <AudioCard key={card.id} data={card} index={index} />;
          } else if (card.type === 'project') {
            return <ProjectCard key={card.id} data={card} index={index} />;
          }
          // Skip video cards in this grid as they're handled elsewhere
          return null;
        })}
      </div>

      {/* See All Projects Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center pt-2"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={handleSeeAllProjects}
          className="group"
        >
          See All Projects
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </section>
  );
}
