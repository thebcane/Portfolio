"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfterPlayer } from "@/components/podcasts/before-after-player";
import type { AudioCardData } from "@/lib/data/featured";
import type { OutreachShow } from "@/lib/data/outreach";

interface OutreachClientProps {
  show: OutreachShow;
}

export function OutreachClient({ show }: OutreachClientProps) {
  const entry: AudioCardData = {
    type: "audio",
    id: `outreach-${show.showName}`,
    title: show.showName,
    description: show.showDescription ?? "",
    category: show.episodeTitle,
    audioFiles: show.audioFiles,
    thumbnail: show.thumbnail,
    showcaseBeforeAfter: true,
  };

  return (
    <main className="my-[15px] mx-3 mb-[75px] min-w-[259px] sm:mt-[60px] sm:mb-[100px] xl:max-w-[860px] xl:mx-auto xl:my-[60px]">
      <article className="p-4 sm:p-[30px] xl:p-[40px] space-y-10 sm:space-y-14">
        {/* 1. Headline */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-5"
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium">
            Brendan Cane — Audio Engineer
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">
            {show.hostFirstName}, a quick before/after on {show.showName}.
          </h1>
        </motion.header>

        {/* 2. Setup paragraph — per-show copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg text-foreground/85 font-light leading-relaxed max-w-2xl whitespace-pre-line"
        >
          {show.setupParagraph}
          {"\n\n"}
          Hit play and toggle between the before and after. The difference is most obvious on headphones.
        </motion.p>

        {/* 3. Before / After player */}
        <BeforeAfterPlayer entries={[entry]} />

        {/* 4. What changed */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium">
            What changed
          </h2>
          <ul className="space-y-3">
            {show.whatChanged.map((bullet, i) => (
              <li
                key={i}
                className="flex gap-3 text-base sm:text-lg text-foreground/85 font-light leading-relaxed"
              >
                <span className="text-primary/70 mt-[0.4em] text-xs select-none">
                  ●
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* 5. Credentials block */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="content-card gradient-border rounded-[14px] sm:rounded-[20px] p-5 sm:p-6 text-sm sm:text-base text-foreground/85 font-light leading-relaxed"
        >
          <p>
            Three years leading audio at Ballen Studios. <strong className="font-semibold text-foreground">500+ episodes</strong> across <strong className="font-semibold text-foreground">MrBallen</strong>, <strong className="font-semibold text-foreground">Wartime Stories</strong>, <strong className="font-semibold text-foreground">Bedtime Stories</strong>, and <strong className="font-semibold text-foreground">Nexpo</strong> — averaging <strong className="font-semibold text-foreground">~10M monthly downloads</strong>, earning a <strong className="font-semibold text-foreground">Golden Globe nomination</strong> and 4 Webby awards.
          </p>
          <p className="mt-3">
            More at{" "}
            <a
              href="https://brendancane.com"
              className="inline-flex items-baseline gap-1 font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors"
            >
              brendancane.com
              <ArrowUpRight className="w-3.5 h-3.5 self-center" aria-hidden="true" />
            </a>
          </p>
        </motion.section>

        {/* 6. Offer + contact */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <p className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed">
            If you'd like to hear a full episode this way, I'll mix one for free. Email me at{" "}
            <a
              href={`mailto:hellobcane@gmail.com?subject=${encodeURIComponent(
                `Free episode mix — ${show.showName}`
              )}`}
              className="font-medium text-primary underline decoration-primary/40 hover:decoration-primary transition-colors"
            >
              hellobcane@gmail.com
            </a>
            .
          </p>
        </motion.section>
      </article>
    </main>
  );
}
