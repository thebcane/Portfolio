"use client";

import { profileData } from "@/lib/data/profile";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HeroImage } from "@/components/hero-image";
import { AudioShowcaseGrid } from "@/components/featured-work/audio-showcase-grid";
import { VideoShowcaseGrid } from "@/components/featured-work/video-showcase-grid";
import { Marquee } from "@/components/ui/marquee";
import { LinkPreview } from "@/components/ui/link-preview";
import { Users, Eye, Video } from "lucide-react";

export function AboutSection() {
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);

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
      <Marquee speed={20} className="my-6">
        {profileData.clients.map((client, index) => (
          <div
            key={index}
            className="relative h-[50px] w-[150px] mx-[2rem] flex items-center justify-center"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={150}
              height={50}
              className="object-contain"
              unoptimized
            />
          </div>
        ))}
      </Marquee>

      {/* About Me Text */}
      <section>
        <div className="space-y-[15px] sm:space-y-10 text-foreground text-sm sm:text-[15px] font-light leading-relaxed">
          <div>
            I'm Brendan—a multi-award-winning audio engineer from Toronto who's spent the last 10+ years turning noise into storytelling across immersive sound design, vocal/dialog editing, music production, and interactive media.
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
            {" "}for our immersive storytelling—becoming one of the first podcasts ever nominated—and won multiple{" "}
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

      {/* Video/Visual Projects */}
      <section className="video-projects">
        <VideoShowcaseGrid />
      </section>

      {/* What I've Done */}
      <section className="featured-work">
        <AudioShowcaseGrid />
      </section>

      {/* Creators */}
      <section className="creators mb-[30px]">
        <h3 className="text-lg sm:text-2xl font-semibold capitalize mb-5">Featured Creators</h3>
        <div className="flex justify-start items-start gap-[15px] sm:gap-[30px] -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory">
          {profileData.creators.map((creator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[280px] sm:min-w-[320px] snap-center cursor-pointer"
              onClick={() => setSelectedCreator(index)}
            >
              <div className="content-card p-[15px] sm:p-[30px] pt-[45px] sm:pt-[25px] relative">
                <figure className="absolute top-0 left-0 transform translate-x-[15px] sm:translate-x-[30px] -translate-y-[25px] sm:-translate-y-[30px] bg-gradient-to-br from-[hsl(240,1%,25%)] to-[hsl(0,0%,19%)] rounded-[14px] sm:rounded-[20px] shadow-[var(--shadow-1)]">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-[60px] h-[60px] sm:w-20 sm:h-20 rounded-[14px] sm:rounded-[20px] object-cover"
                  />
                </figure>
                <h4 className="text-base sm:text-lg font-semibold capitalize mb-[7px] sm:mb-[10px] ml-0 sm:ml-[95px]">{creator.name}</h4>
                <div className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 opacity-60" />
                      Subscribers:
                    </span>
                    <span className="font-medium">{creator.subscribers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 opacity-60" />
                      Total Views:
                    </span>
                    <span className="font-medium">{creator.totalViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 opacity-60" />
                      Videos:
                    </span>
                    <span className="font-medium">{creator.videoCount}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creator Modal */}
        <Dialog
          open={selectedCreator !== null}
          onOpenChange={() => setSelectedCreator(null)}
        >
          <DialogContent className="sm:max-w-[680px]">
            {selectedCreator !== null && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 sm:gap-[25px] mb-4">
                    <figure className="bg-gradient-to-br from-[hsl(240,1%,25%)] to-[hsl(0,0%,19%)] rounded-[18px]">
                      <img
                        src={profileData.creators[selectedCreator].avatar}
                        alt={profileData.creators[selectedCreator].name}
                        className="w-[65px] h-[65px] sm:w-20 sm:h-20 rounded-[18px] object-cover"
                      />
                    </figure>
                    <div>
                      <DialogTitle className="text-lg sm:text-xl">
                        {profileData.creators[selectedCreator].name}
                      </DialogTitle>
                      <a
                        href={profileData.creators[selectedCreator].youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-[15px] text-muted-foreground hover:text-foreground font-light transition-colors underline"
                      >
                        Visit YouTube Channel
                      </a>
                    </div>
                  </div>
                </DialogHeader>
                <DialogDescription className="text-sm sm:text-[15px] text-foreground font-light leading-relaxed space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 opacity-60" />
                      Subscribers:
                    </span>
                    <span className="font-medium text-foreground">{profileData.creators[selectedCreator].subscribers}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Eye className="w-4 h-4 opacity-60" />
                      Total Views:
                    </span>
                    <span className="font-medium text-foreground">{profileData.creators[selectedCreator].totalViews}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Video className="w-4 h-4 opacity-60" />
                      Videos:
                    </span>
                    <span className="font-medium text-foreground">{profileData.creators[selectedCreator].videoCount}</span>
                  </div>
                </DialogDescription>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>

      {/* Awards */}
      <section className="awards mb-[30px]">
        <h3 className="text-lg sm:text-2xl font-semibold capitalize mb-5">Awards & Recognition</h3>
        <div className="flex justify-start items-stretch gap-[15px] sm:gap-[30px] -mx-4 sm:-mx-[30px] px-4 sm:px-[30px] py-[25px] sm:py-[30px] pb-[35px] overflow-x-auto has-scrollbar snap-x snap-mandatory">
          {profileData.awards.map((award, index) => {
            const getAwardColor = (name: string) => {
              if (name.includes("Golden Globe")) return "text-amber-400";
              if (name.includes("Winner")) return "text-yellow-500";
              if (name.includes("Honoree")) return "text-slate-300";
              return "text-foreground";
            };

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
                  <h4 className={`text-base sm:text-lg font-semibold mb-1 ${getAwardColor(award.name)}`}>
                    {awardType}
                  </h4>
                  <p className="text-sm sm:text-[15px] text-foreground font-medium mb-2">{showName}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground font-light mb-1">{award.category}</p>
                  <time className="text-xs sm:text-sm text-muted-foreground font-light">{award.year}</time>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
