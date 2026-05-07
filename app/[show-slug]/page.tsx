import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { outreachShows, RESERVED_SLUGS } from "@/lib/data/outreach";
import { OutreachClient } from "./outreach-client";

interface PageProps {
  params: Promise<{ "show-slug": string }>;
}

export function generateStaticParams() {
  return Object.keys(outreachShows).map((slug) => ({ "show-slug": slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "show-slug": slug } = await params;
  const show = outreachShows[slug];
  if (!show) return {};

  const title = `${show.showName} — a quick before/after from Brendan Cane`;
  const description = `${show.hostFirstName}, hit play on the before/after I put together for ${show.showName}. The vocal chain I'd use if I were mixing it full-time.`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function OutreachShowPage({ params }: PageProps) {
  const { "show-slug": slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const show = outreachShows[slug];
  if (!show) notFound();

  return <OutreachClient show={show} />;
}
