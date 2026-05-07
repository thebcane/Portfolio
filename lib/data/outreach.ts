export interface OutreachShow {
  hostFirstName: string;
  showName: string;
  episodeTitle: string;        // Clean title shown as the player subtitle (e.g. "The Disappearance of Christopher Bird")
  setupParagraph: string;      // Per-show intro copy. Rewrite for every show — describes what they're about to hear and why it matters for *their* show.
  audioFiles: {
    unmixed: string;
    mixed: string;
  };
  thumbnail?: string;
  showDescription?: string;    // Populates the "About this show" modal that opens from the player
  whatChanged: string[];
}

export const outreachShows: Record<string, OutreachShow> = {
  "murder-she-told": {
    hostFirstName: "Kristen",
    showName: "Murder, She Told",
    episodeTitle: "The Disappearance of Christopher Bird",
    setupParagraph:
      "I took the intro from your Christopher Bird episode and gave it a full mix. Same audio, different treatment. The 'before' is your published version, the 'after' is what it could sound like.",
    audioFiles: {
      unmixed: "/audio/Wartime Stories Scene-unmixed.mp3",
      mixed: "/audio/Wartime Stories Scene-mixed.mp3",
    },
    thumbnail: "/images/murdershetold.png",
    showDescription:
      "Murder, She Told is a true crime podcast shedding light on the cold cases and unsolved murders, missing persons, and crime stories that often get overlooked from Maine, New England, and small towns from away.",
    whatChanged: [
      "P's and B's were popping throughout the episode. Cleaned them all up in this intro. \"Into something far more...\" at the 22-second mark is a clear example.",
      "Tightened vocal EQ. Pulled the muddy 250-400 Hz buildup, opened the top end so the consonants come through.",
      "More consistent compression for level, so you sit forward and steady the whole way through.",
      "Light treatment on the theme music to widen and fill it out, then matched the level between your VO and the theme so the handoff doesn't lurch.",
      "Loudness landed at -16 LUFS, consistent with what Spotify and Apple normalize to.",
    ],
  },
};

// Slugs already used by other top-level routes — outreach pages must not collide.
export const RESERVED_SLUGS = new Set([
  "api",
  "podcasts",
  "get-a-free-episode",
]);
