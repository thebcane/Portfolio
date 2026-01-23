"use client";

import { HeroImage } from "@/components/hero-image";
import { FeaturedMosaicGrid } from "@/components/featured-work/featured-mosaic-grid";

export function PortfolioSection() {
  return (
    <div className="space-y-8">
      {/* Hero Image */}
      <HeroImage
        src="/images/Banners/Brendan_Banner_2.png"
        alt="Portfolio"
        title="Featured Work"
        subtitle="Explore my audio, video, and music production work"
        size="small"
        objectPosition="bottom"
      />

      {/* Featured Mosaic Grid */}
      <FeaturedMosaicGrid />
    </div>
  );
}
