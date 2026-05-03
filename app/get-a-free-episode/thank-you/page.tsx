import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thanks — Brendan Cane",
  description: "Your stems are in. I'll be in touch within 48 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="my-[15px] mx-3 mb-[75px] min-w-[259px] sm:mt-[60px] sm:mb-[100px] xl:max-w-[900px] xl:mx-auto xl:my-[60px] xl:mb-[60px]">
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

          <div className="p-5 sm:p-[40px] xl:p-[60px] pb-[75px] xl:pb-[60px]">
            <div className="content-card gradient-border rounded-[14px] sm:rounded-[20px] p-8 sm:p-12 lg:p-16 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 mb-6">
                <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
                Got it. Thanks for sending.
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground font-light leading-relaxed mb-8 max-w-md mx-auto">
                I'll listen through your episode and reply within 48 hours with next steps. The mastered file lands in your inbox within 5 business days.
              </p>

              <div className="text-left space-y-4 max-w-md mx-auto mb-10 text-sm text-foreground/80 font-light">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium">
                  What happens next
                </p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary/60" />
                    I confirm receipt and check your stems
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary/60" />
                    Edit, mix, and master — full pass, not a rough cut
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-primary/60" />
                    You get the finished file. No call required.
                  </li>
                </ul>
              </div>

              <Link
                href="/podcasts"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/15 bg-white/[0.03] text-foreground text-sm font-medium hover:bg-white/[0.06] hover:border-white/25 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to services
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
