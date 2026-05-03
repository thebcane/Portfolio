"use client";

import { profileData } from "@/lib/data/profile";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroImage } from "@/components/hero-image";
import { AudioShowcaseGrid } from "@/components/featured-work/audio-showcase-grid";
import { VideoShowcaseGrid } from "@/components/featured-work/video-showcase-grid";
import { ClientsMarquee } from "@/components/clients-marquee";
import { FeaturedCreators } from "@/components/featured-creators";
import { AwardsRow } from "@/components/awards-row";
import { LinkPreview } from "@/components/ui/link-preview";

export function AboutSection() {
  return (
    <div className="space-y-[35px]">
      {/* Hero Image */}
      <HeroImage
        src="/images/headshot-brendan-02.png"
        alt="About Brendan Cane"
        title="Brendan Cane"
        subtitle="Learn more about my journey and what I do"
        size="large"
        objectFit="cover"
        objectPosition="center top"
      />

      {/* Clients Marquee */}
      <ClientsMarquee clients={profileData.clients} variant="equal" />

      {/* About Me Text */}
      <section>
        <div className="space-y-[15px] sm:space-y-10 text-foreground text-sm sm:text-[15px] font-light leading-relaxed">
          <div>
            I'm Brendan, a multi-award-winning audio engineer from Toronto who's spent the last 10+ years turning noise into storytelling across immersive sound design, vocal/dialog editing, music production, and interactive media.
          </div>
          <div>
            As Head Audio Engineer at{" "}
            <LinkPreview
              url="https://www.ballenstudios.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Ballen Studios
            </LinkPreview>
            , I mixed and mastered 300+ episodes of award-winning content that made history in November 2024 when we earned a{" "}
            <LinkPreview
              url="https://podnews.net/press-release/golden-globes-eligible-podcasts-26"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Golden Globe nomination
            </LinkPreview>
            {" "}for our immersive storytelling, becoming one of the first podcasts ever nominated, and won multiple{" "}
            <LinkPreview
              url="https://winners.webbyawards.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Webby Awards
            </LinkPreview>
            , reaching over{" "}
            <LinkPreview
              url="https://socialblade.com/youtube/handle/mrballen"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              2.8 billion listeners worldwide
            </LinkPreview>
            . My work spans music production with{" "}
            <LinkPreview
              url="https://www.disneychannel.ca"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Disney Channel
            </LinkPreview>
            ,{" "}
            <LinkPreview
              url="https://www.warnerrecords.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Warner Records
            </LinkPreview>
            , and{" "}
            <LinkPreview
              url="https://www.universalmusic.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Universal Music
            </LinkPreview>
            , creative direction for{" "}
            <LinkPreview
              url="https://music.amazon.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Amazon
            </LinkPreview>
            {" "}multimedia projects, and extensive 3D scene/environment design and cinematography for commercial promotions.
          </div>
          <div>
            I combine deep technical expertise with creative vision, specializing in cinematic audio production, vocal/dialog editing and restoration, spatial sound design, and adaptive audio systems. I graduated at the top of my class from{" "}
            <LinkPreview
              url="https://www.metalworksinstitute.com"
              className="font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              Metalworks Institute
            </LinkPreview>
            {" "}and continue to push the boundaries of immersive storytelling through sound, regardless of the medium.
          </div>
        </div>
      </section>

      {/* Music & Audio Shows — moved up, this is the lead-with section */}
      <section className="featured-work">
        <AudioShowcaseGrid />
      </section>

      {/* Podcast services CTA strip — funnels narrative-podcast traffic to /podcasts */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="content-card gradient-border p-5 sm:p-7 rounded-[14px] flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
      >
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-wider text-primary/80 font-medium mb-1">
            Podcast hosts
          </p>
          <h4 className="text-base sm:text-lg font-semibold mb-1">
            Producing a narrative podcast?
          </h4>
          <p className="text-sm text-muted-foreground font-light leading-relaxed">
            Edit, mix, and master with a 48-hour turnaround. See the dedicated services page for pricing and a free first episode offer.
          </p>
        </div>
        <Link
          href="/podcasts"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary/40 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Podcast services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.section>

      {/* Visual Projects — demoted, smaller heading + caption */}
      <section className="video-projects pt-2">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium mb-[-8px]">
          Also: 3D, animation, and game-audio work
        </p>
        <VideoShowcaseGrid />
      </section>

      {/* Creators */}
      <FeaturedCreators creators={profileData.creators} />

      {/* Awards */}
      <AwardsRow awards={profileData.awards} />
    </div>
  );
}
