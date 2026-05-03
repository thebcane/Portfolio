import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IntakeForm } from "@/components/podcasts/intake-form";

export const metadata: Metadata = {
  title: "Get a free first episode — Brendan Cane",
  description:
    "Send me your stems and I'll fully edit, mix, and master your next episode for free. Golden Globe nominated audio engineer for narrative podcasts.",
  openGraph: {
    title: "Get a free first episode — Brendan Cane",
    description:
      "Send me your stems and I'll fully edit, mix, and master your next episode for free.",
    type: "website",
    images: ["/images/headshot-brendan-02.png"],
  },
};

export default function GetAFreeEpisodePage() {
  return (
    <main className="my-[15px] mx-3 mb-[75px] min-w-[259px] sm:mt-[60px] sm:mb-[100px] xl:max-w-[1000px] xl:mx-auto xl:my-[60px] xl:mb-[60px]">
      <div className="main-content relative w-full mx-auto">
        <article className="sidebar min-h-full active relative">
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 xl:top-8 xl:right-8 z-20">
            <Link
              href="/podcasts"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-black/40 backdrop-blur-md text-xs sm:text-sm text-white/80 hover:text-white hover:bg-black/60 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to services
            </Link>
          </div>

          <div className="p-5 sm:p-[30px] xl:p-[40px] pb-[75px] xl:pb-[40px]">
            <header className="mb-10 sm:mb-12 max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium mb-3">
                Free first episode
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
                Send me your stems. I'll mix your next episode for free.
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                Full edit, mix, and master on a recent episode (up to 60 minutes). Delivered within 5 business days. You keep the file either way.
              </p>
            </header>

            <section className="content-card rounded-[14px] sm:rounded-[20px] p-5 sm:p-8 lg:p-10">
              <IntakeForm />
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
