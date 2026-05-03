"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import type { Client } from "@/lib/data/profile";

interface ClientsMarqueeProps {
  clients: Client[];
  variant?: "equal" | "ballen-prominent";
}

export function ClientsMarquee({
  clients,
  variant = "equal",
}: ClientsMarqueeProps) {
  if (variant === "ballen-prominent") {
    const ballen = clients.find((c) => c.name === "Ballen Studios");
    const others = clients.filter((c) => c.name !== "Ballen Studios");

    return (
      <div className="content-card gradient-border rounded-[14px] sm:rounded-[20px] p-8 sm:p-12 lg:p-16">
        <div className="flex flex-col items-center gap-10 lg:gap-14">
          {ballen && (
            <div className="flex flex-col items-center gap-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-primary/70 font-medium">
                Three years leading audio at
              </p>
              <div className="relative h-[100px] sm:h-[140px] lg:h-[160px] w-[300px] sm:w-[400px] lg:w-[460px] flex items-center justify-center">
                <Image
                  src={ballen.logo}
                  alt={ballen.name}
                  width={460}
                  height={160}
                  className="object-contain w-full h-full opacity-95"
                  unoptimized
                />
              </div>
            </div>
          )}

          {others.length > 0 && (
            <>
              <div className="w-full max-w-[420px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex flex-col items-center gap-6 w-full">
                <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground/70 font-medium">
                  Plus work with
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 lg:gap-x-20 gap-y-7">
                  {others.map((client, index) => (
                    <div
                      key={index}
                      className="relative h-[44px] sm:h-[56px] lg:h-[64px] w-[130px] sm:w-[170px] lg:w-[190px] flex items-center justify-center opacity-55 hover:opacity-90 transition-opacity"
                    >
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={190}
                        height={64}
                        className="object-contain w-full h-full"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <Marquee speed={20} className="my-6">
      {clients.map((client, index) => (
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
  );
}
