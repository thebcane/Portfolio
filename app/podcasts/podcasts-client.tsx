"use client";

import Link from "next/link";
import { ArrowRight, Upload } from "lucide-react";
import { profileData } from "@/lib/data/profile";
import { featuredData } from "@/lib/data/featured";
import type { AudioCardData } from "@/lib/data/featured";
import { ClientsMarquee } from "@/components/clients-marquee";
import { FeaturedCreators } from "@/components/featured-creators";
import { AwardsRow } from "@/components/awards-row";
import { ServicesHero } from "@/components/podcasts/services-hero";
import { CredentialsBand } from "@/components/podcasts/credentials-band";
import { SectionHeader } from "@/components/podcasts/section-header";
import { FreeOffer } from "@/components/podcasts/free-offer";
import { BeforeAfterPlayer } from "@/components/podcasts/before-after-player";
import { PricingCard } from "@/components/podcasts/pricing-card";
import { PremiumCard } from "@/components/podcasts/premium-card";
import { WhoItsFor } from "@/components/podcasts/who-its-for";
import { FaqSection } from "@/components/podcasts/faq-section";
import { StickyCta } from "@/components/podcasts/sticky-cta";
import { LinkPreview } from "@/components/ui/link-preview";

const linkClass =
  "font-medium underline decoration-muted-foreground/30 hover:decoration-foreground transition-colors";

export function PodcastsClient() {
  const services = profileData.podcastServices;

  const beforeAfterEntries = featuredData.featuredCards.filter(
    (card): card is AudioCardData =>
      card.type === "audio" && card.showcaseBeforeAfter === true
  );

  const stats = [
    { value: "500+", label: "Episodes mixed & mastered" },
    { value: "8M+", label: "Monthly downloads delivered" },
    { value: "1", label: "Golden Globe nomination" },
    { value: "3×", label: "Webby Award recognition" },
  ];

  return (
    <>
      <main className="my-[15px] mx-3 mb-[75px] min-w-[259px] sm:mt-[60px] sm:mb-[100px] xl:max-w-[1200px] xl:mx-auto xl:my-[60px] xl:mb-[60px]">
        <div className="main-content relative w-full mx-auto overflow-x-hidden sm:overflow-x-visible">
          <article className="sidebar min-h-full active relative">
            {/* Top back-link in place of tab nav */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 xl:top-8 xl:right-8 z-20">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md text-xs sm:text-sm text-white/80 hover:text-white hover:bg-black/60 transition-colors"
              >
                Go to portfolio
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-4 sm:p-[30px] xl:p-[40px] pb-[75px] xl:pb-[40px] overflow-x-hidden sm:overflow-x-visible">
              {/* 1. HERO with banner image */}
              <ServicesHero
                headline={services.hero.headline}
                subhead={services.hero.subhead}
                credentials={services.hero.credentials}
                ctaPrimaryLabel={services.hero.ctaPrimary}
                ctaPrimaryHref="/get-a-free-episode"
                ctaSecondaryLabel={services.hero.ctaSecondary}
                ctaSecondaryHref="#before-after"
              />

              {/* Clients marquee — mirrors homepage layout under hero */}
              <div className="mt-8 sm:mt-10">
                <ClientsMarquee clients={profileData.clients} variant="equal" />
              </div>

              {/* Tightened podcast bio — uses LinkPreview to match homepage bio styling */}
              <section className="space-y-4 sm:space-y-6 mt-10 sm:mt-14 mb-12 sm:mb-16 text-base sm:text-lg text-foreground/90 font-light leading-relaxed">
                <p>
                  I'm Brendan, an audio engineer in Toronto. For the last three years I led audio at{" "}
                  <LinkPreview url="https://www.ballenstudios.com" className={linkClass}>
                    Ballen Studios
                  </LinkPreview>
                  {" "}on{" "}
                  <LinkPreview url="https://www.youtube.com/@MrBallen" className={linkClass}>
                    The MrBallen Podcast
                  </LinkPreview>
                  ,{" "}
                  <LinkPreview url="https://www.youtube.com/@WartimeStories" className={linkClass}>
                    Wartime Stories
                  </LinkPreview>
                  ,{" "}
                  <LinkPreview url="https://www.youtube.com/@BedtimeStoriesChannel" className={linkClass}>
                    Bedtime Stories
                  </LinkPreview>
                  , and{" "}
                  <LinkPreview url="https://www.youtube.com/@Nexpo" className={linkClass}>
                    Nexpo
                  </LinkPreview>
                  {" "}— 500+ episodes, 8M+ monthly downloads, a{" "}
                  <LinkPreview
                    url="https://podnews.net/press-release/golden-globes-eligible-podcasts-26"
                    className={linkClass}
                  >
                    Golden Globe nomination
                  </LinkPreview>
                  , and multiple{" "}
                  <LinkPreview url="https://winners.webbyawards.com" className={linkClass}>
                    Webbys
                  </LinkPreview>
                  .
                </p>
                <p>
                  Before that I produced, tracked, and mixed for{" "}
                  <LinkPreview url="https://www.disneychannel.ca" className={linkClass}>
                    Disney Channel
                  </LinkPreview>
                  ,{" "}
                  <LinkPreview url="https://www.warnerrecords.com" className={linkClass}>
                    Warner Records
                  </LinkPreview>
                  , and{" "}
                  <LinkPreview url="https://www.universalmusic.com" className={linkClass}>
                    Universal Music
                  </LinkPreview>
                  {" "}— work spanning artist development, single and album production, and creative direction across multiple charting releases.
                </p>
                <p>
                  I graduated at the top of my class from{" "}
                  <LinkPreview url="https://www.metalworksinstitute.com" className={linkClass}>
                    Metalworks Institute
                  </LinkPreview>
                  {" "}and have spent the last decade-plus chasing one thing: cinematic, emotionally precise audio that pulls listeners deeper into the story. Now I'm taking on a small number of independent narrative shows that want that same level of craft.
                </p>
              </section>

              {/* Credentials stat band */}
              <div className="mb-16 sm:mb-20">
                <CredentialsBand stats={stats} />
              </div>

              {/* 2. FREE OFFER */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="01"
                  eyebrow="Start here"
                  title="Try me, on me."
                  description="Send me a recent episode. I'll edit, mix, and master it for free. Hear the difference before you commit to anything."
                />
                <div className="mt-8 sm:mt-10">
                  <FreeOffer
                    title={services.freeOffer.title}
                    description={services.freeOffer.description}
                    bullets={services.freeOffer.bullets}
                    ctaLabel={services.hero.ctaPrimary}
                    ctaHref="/get-a-free-episode"
                  />
                </div>
              </section>

              {/* 3. BEFORE / AFTER */}
              {beforeAfterEntries.length > 0 && (
                <section id="before-after" className="mb-16 sm:mb-24 scroll-mt-8">
                  <SectionHeader
                    number="02"
                    eyebrow="Hear the proof"
                    title={services.beforeAfter.title}
                    description={services.beforeAfter.caption}
                  />
                  <div className="mt-8 sm:mt-10">
                    <BeforeAfterPlayer entries={beforeAfterEntries} />
                  </div>
                </section>
              )}

              {/* 3. PRICING — anchor retainer + premium tier */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="03"
                  eyebrow="The investment"
                  title="Pick the right cadence."
                  description="Predictable monthly cost. No per-minute charges, no surprise bills."
                />
                <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 items-stretch">
                  <div className="lg:col-span-3">
                    <PricingCard
                      eyebrow={services.pricing.eyebrow}
                      headline={services.pricing.headline}
                      tagline={services.pricing.tagline}
                      tiers={services.pricing.tiers}
                      footnote={services.pricing.footnote}
                      ctaLabel={services.hero.ctaPrimary}
                      ctaHref="/get-a-free-episode"
                      includes={services.whatYouGet.items}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <PremiumCard
                      eyebrow={services.premium.eyebrow}
                      headline={services.premium.headline}
                      priceRange={services.premium.priceRange}
                      priceUnit={services.premium.priceUnit}
                      tagline={services.premium.tagline}
                      bullets={services.premium.bullets}
                      ctaLabel={services.premium.ctaLabel}
                      ctaHref="/get-a-free-episode"
                    />
                  </div>
                </div>
              </section>

              {/* 4. WHO IT'S FOR */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="04"
                  eyebrow="Honest fit check"
                  title="Is this the right fit?"
                  description="I work best with a specific kind of show. Better to know upfront."
                />
                <div className="mt-8 sm:mt-10">
                  <WhoItsFor
                    forTitle={services.whoFor.title}
                    forItems={services.whoFor.items}
                    notForTitle={services.whoNotFor.title}
                    notForItems={services.whoNotFor.items}
                  />
                </div>
              </section>

              {/* 5. CREATORS */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="05"
                  eyebrow="Shows I've shaped"
                  title="The voices behind the audio."
                  description="Hosts and creators whose shows I've engineered, mixed, and mastered."
                />
                <div className="mt-6 sm:mt-8">
                  <FeaturedCreators
                    creators={profileData.creators}
                    showTitles
                    heading=""
                  />
                </div>
              </section>

              {/* 6. AWARDS */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="06"
                  eyebrow="Recognition"
                  title="Award-winning audio."
                  description="Hardware-equivalent recognition from the industry's most respected institutions."
                />
                <div className="mt-6 sm:mt-8">
                  <AwardsRow
                    awards={profileData.awards}
                    showCaptions
                    heading=""
                  />
                </div>
              </section>

              {/* 7. FAQ */}
              <section className="mb-16 sm:mb-24">
                <SectionHeader
                  number="07"
                  eyebrow="Practical questions"
                  title="Frequently asked questions."
                />
                <div className="mt-8 sm:mt-10">
                  <FaqSection items={services.faq} />
                </div>
              </section>

              {/* 11. FINAL CTA */}
              <section className="relative content-card gradient-border rounded-[14px] sm:rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[140px] rounded-full" />
                </div>
                <div className="relative p-8 sm:p-12 lg:p-16 text-center space-y-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium">
                    Ready when you are
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl mx-auto leading-[1.1]">
                    {services.finalCta.headline}
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground font-light max-w-xl mx-auto">
                    Free first episode. No call required. Just send me your stems.
                  </p>
                  <Link
                    href="/get-a-free-episode"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-primary text-primary-foreground text-base sm:text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                  >
                    <Upload className="w-4 h-4" />
                    {services.finalCta.button}
                  </Link>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>

      <StickyCta
        label="Get a free first episode"
        href="/get-a-free-episode"
      />
    </>
  );
}
