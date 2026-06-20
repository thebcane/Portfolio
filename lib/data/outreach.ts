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
  // Set this when there's no before/after of *their* audio (e.g. you only have their
  // finished stereo mix, not stems). The page reframes the player as an example from one
  // of YOUR shows. When set: audioFiles/episodeTitle/thumbnail/showDescription should all
  // describe the EXAMPLE show, not the prospect's. setupParagraph carries the honest "why".
  demo?: {
    exampleShowName: string;   // Your show the clip is pulled from, e.g. "Wartime Stories"
  };
}

export const outreachShows: Record<string, OutreachShow> = {
  "murder-she-told": {
    hostFirstName: "Kristen",
    showName: "Murder, She Told",
    episodeTitle: "The Disappearance of Christopher Bird",
    setupParagraph:
      "I took the intro from your Christopher Bird episode and gave it a full edit and mix. Same audio, different treatment. The 'before' is your published version, the 'after' is what it could sound like. Not to mention the time you save by not editing yourself.",
    audioFiles: {
      unmixed: "/audio/chrisbird intro unmixed.mp3",
      mixed: "/audio/chrisbird intro - mixed.mp3",
    },
    thumbnail: "/images/murdershetold.png",
    showDescription:
      "Murder, She Told is a true crime podcast shedding light on the cold cases and unsolved murders, missing persons, and crime stories that often get overlooked from Maine, New England, and small towns from away.",
    whatChanged: [
      "P's and B's were popping throughout the episode. Cleaned them all up in this intro. \"Into something far more...\" at the 22-second mark is a clear example.",
      "Tightened vocal EQ. Pulled the muddy 250-400 Hz buildup, opened the top end so the consonants come through.",
      "More consistent compression for level, so you sit forward and steady the whole way through.",
      "Loudness landed at -16 LUFS, consistent with what Spotify and Apple normalize to.",
    ],
  },

  // DEMO-STYLE PAGE — Obscura's audio could be improved, but it can't be remixed from the
  // finished stereo file (would need stems). So the player shows an example from Wartime Stories.
  // TODO: replace placeholder copy + host name, and point audioFiles/thumbnail at the real demo clip.
  obscura: {
    hostFirstName: "TODO",       // Obscura host's first name
    showName: "Obscura",
    // For a demo, this is the EXAMPLE clip's episode — shown as the player subtitle.
    episodeTitle: "Wartime Stories — sample scene",
    setupParagraph:
      "I'd love to show you a before/after on your own audio, but I'd need the raw stems — the separated vocal, music, and FX tracks — not the finished stereo file, since once everything's bounced together it can't be cleanly un-mixed. So here's a before/after from one of my own shows instead, so you can hear the kind of lift I'd bring to Obscura.",
    audioFiles: {
      unmixed: "/audio/Wartime Stories Scene-unmixed.mp3",
      mixed: "/audio/Wartime Stories Scene-mixed.mp3",
    },
    // Cover of the EXAMPLE show, not Obscura. TODO: add a Wartime Stories cover image.
    thumbnail: undefined,
    showDescription:
      "Wartime Stories is a narrative history podcast — the kind of dialogue, music, and sound-design-heavy production where mixing makes the biggest difference.",
    whatChanged: [
      "TODO: describe what you did on this demo clip — vocal cleanup, EQ, compression, loudness target, etc.",
    ],
    demo: {
      exampleShowName: "Wartime Stories",
    },
  },
};

// Slugs already used by other top-level routes — outreach pages must not collide.
export const RESERVED_SLUGS = new Set([
  "api",
  "podcasts",
  "get-a-free-episode",
]);
