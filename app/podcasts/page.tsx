import type { Metadata } from "next";
import { PodcastsClient } from "./podcasts-client";

export const metadata: Metadata = {
  title: "Podcast Audio Post-Production — Brendan Cane",
  description:
    "Full audio post for independent narrative podcasts. Edit, mix, master with 48-hour turnaround. Golden Globe nominated. 500+ episodes for MrBallen, Wartime Stories, Bedtime Stories, and Nexpo. Get a free first episode.",
  openGraph: {
    title: "Podcast Audio Post-Production — Brendan Cane",
    description:
      "Edit, mix, master with 48-hour turnaround for independent narrative podcasts. Golden Globe nominated audio engineer behind MrBallen and Wartime Stories.",
    type: "website",
    images: ["/images/headshot-brendan-02.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast Audio Post-Production — Brendan Cane",
    description:
      "Edit, mix, master with 48-hour turnaround for independent narrative podcasts. Get a free first episode.",
    images: ["/images/headshot-brendan-02.png"],
  },
};

export default function PodcastsPage() {
  return <PodcastsClient />;
}
