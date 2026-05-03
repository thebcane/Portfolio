export interface Creator {
  name: string;
  avatar: string;
  youtubeUrl: string;
  subscribers: string;
  totalViews: string;
  videoCount: string;
  show?: string;
}

export interface Award {
  name: string;
  image: string;
  year: string;
  category: string;
  caption?: string;
}

export interface Client {
  logo: string;
  name: string;
}

export const profileData = {
  name: "Brendan Cane",
  title: "Audio Engineer & Director",
  email: "hellobcane@gmail.com",
  phone: "+1 (705) 539 0885",
  birthday: "--",
  location: "Toronto, Ontario",
  avatar: "/images/avatar.jpg",
  calendlyUrl: "https://calendly.com/hellobcane/free-first-episode",
  podcastAvailability: "2 spots open",
  bio: [
    "I'm Brendan, a multi-award-winning audio engineer from Toronto who's spent the last 10+ years turning noise into storytelling across immersive sound design, music production, and interactive media.",
    "As Head Audio Engineer at Ballen Studios, I mixed and mastered 300+ episodes of award-winning content that made history in November 2024 when we earned a Golden Globe nomination for our immersive storytelling—becoming one of the first podcasts ever nominated, and won multiple Webby Awards, reaching over 2.8 billion listeners worldwide. My work spans music production with Disney Channel, Warner Records, and Universal Music, creative direction for Amazon multimedia projects, and extensive 3D scene/environment design and cinematography for commercial promotions.",
    "I combine deep technical expertise with creative vision, specializing in cinematic audio production, spatial sound design, and adaptive audio systems. I graduated at the top of my class from Metalworks Institute and continue to push the boundaries of immersive storytelling through sound, regardless of the medium.",
  ],
  podcastBio: [
    "I'm Brendan, an audio engineer in Toronto. For the last three years I led audio at Ballen Studios on The MrBallen Podcast, Wartime Stories, Bedtime Stories, and Nexpo — 500+ episodes, 8M+ monthly downloads, a Golden Globe nomination, and multiple Webbys.",
    "Before that I tracked and mixed for Disney, Warner, and Universal. Now I'm taking on a small number of independent narrative shows.",
  ],
  podcastServices: {
    hero: {
      headline: "Your show, mixed by a Golden Globe nominee.",
      subhead: "Edit, mix, master. Delivered in 48 hours.",
      credentials: "Golden Globe nominated. 8M+ monthly downloads.\nMrBallen, Wartime Stories, Bedtime Stories, Nexpo — 500+ episodes.",
      ctaPrimary: "Get a free first episode",
      ctaSecondary: "Hear the difference",
    },
    freeOffer: {
      title: "Your first episode, on me.",
      description: "Send me a recent episode. I'll fully edit, mix, and master it — for free, no strings. You hear the difference before you commit to anything.",
      bullets: [
        "Full edit, mix, and master on a recent episode (up to 60 minutes).",
        "Delivered within 5 business days. You keep the file either way.",
        "No call required. Just send the raw stems and the latest published cut.",
      ],
    },
    beforeAfter: {
      title: "Hear the difference.",
      caption: "30-second clips. Same source, before and after.",
    },
    whatYouGet: {
      title: "What you get",
      items: [
        { label: "Edit, mix, master", description: "Every episode polished from raw recording to broadcast-ready file." },
        { label: "Light dialogue cleanup", description: "Noise reduction, breath shaping, plosive control, level matching." },
        { label: "Standard sound design", description: "Tasteful SFX and atmosphere where it adds something — not heavy production overhauls." },
        { label: "48-hour turnaround", description: "Stems in by Monday EOD, mastered episode in your hands by Wednesday." },
        { label: "One revision round", description: "Per-episode notes, timestamped. If something's off, I'll fix it." },
        { label: "Monthly catch-up call", description: "15–30 minutes to align on direction, talk feedback, and plan ahead." },
      ],
    },
    pricing: {
      eyebrow: "Weekly retainer",
      headline: "Weekly Show Retainer",
      tagline: "The anchor offer. Where most shows land.",
      tiers: {
        weekly: { label: "1 episode / week", price: 1800, detail: "4 episodes per month" },
        biweekly: { label: "2 episodes / week", price: 2800, detail: "8 episodes per month" },
      },
      footnote: "Up to 60 minutes per episode. Longer-form work, ad-stitching, and back-catalog cleanup quoted separately.",
    },
    premium: {
      eyebrow: "Tier 03",
      headline: "Premium Production",
      priceRange: "$4,500–$7,500",
      priceUnit: "/month",
      tagline: "For shows that need more than standard post.",
      bullets: [
        "Custom sound design and SFX",
        "Music selection and bed work",
        "Multi-voice / scene-based dialogue editing",
        "Additional revision rounds",
        "Weekly check-in calls",
      ],
      ctaLabel: "Talk about a custom scope",
    },
    whoFor: {
      title: "Who this is for",
      items: [
        "Narrative-driven shows",
        "5K+ active listeners",
        "True crime, history, documentary, fiction",
        "Hosts who want to focus on storytelling, not Pro Tools",
      ],
    },
    whoNotFor: {
      title: "Who this isn't for",
      items: [
        "Live or near-live formats",
        "Daily news shows",
        "Long-form interview chat with no post needed",
        "Anyone looking for the cheapest option — I'm not it",
      ],
    },
    faq: [
      {
        q: "What's the actual turnaround?",
        a: "48 hours from when you deliver clean stems. If you're recording Friday and want it published Monday, that works.",
      },
      {
        q: "What do you need from me?",
        a: "Multitrack stems (one file per speaker), the script or rundown if there is one, and any music or SFX cues you want featured. That's it.",
      },
      {
        q: "How do I send files?",
        a: "Dropbox, Google Drive, or WeTransfer — whatever you already use. I'll send the mastered episode back the same way.",
      },
      {
        q: "How do revisions work?",
        a: "One revision round is included per episode. Send notes timestamped (e.g. '12:34 — too much reverb on host'). Most shows don't use it.",
      },
      {
        q: "Can I pause or cancel?",
        a: "Yes. Month-to-month retainer, no minimum commitment. Pause for a season break, ramp back up when you're ready.",
      },
      {
        q: "Do you handle distribution or hosting?",
        a: "No — I deliver the finished file. You upload to Megaphone, Libsyn, Spotify for Podcasters, or wherever you already host.",
      },
    ],
    finalCta: {
      headline: "Ready to hear what your show could sound like?",
      button: "Get a free first episode",
    },
  },
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },
  services: [
    {
      icon: "layout",
      title: "Web Design",
      description: "The most modern and high-quality design made at a professional level.",
    },
    {
      icon: "code",
      title: "Web Development",
      description: "High-quality development of sites at the professional level.",
    },
    {
      icon: "smartphone",
      title: "Mobile Apps",
      description: "Professional development of applications for iOS and Android.",
    },
    {
      icon: "camera",
      title: "Photography",
      description: "I make high-quality photos of any category at a professional level.",
    },
  ],
  creators: [
    {
      name: "MrBallen",
      show: "The MrBallen Podcast",
      avatar: "/images/Creators/MrBallen.png",
      youtubeUrl: "https://www.youtube.com/@MrBallen",
      subscribers: "10.2M",
      totalViews: "2.8B",
      videoCount: "800+",
    },
    {
      name: "Nexpo",
      show: "Late Nights with Nexpo",
      avatar: "/images/Creators/Nexpo.png",
      youtubeUrl: "https://www.youtube.com/@Nexpo",
      subscribers: "3.1M",
      totalViews: "450M",
      videoCount: "200+",
    },
    {
      name: "Nick Crowley",
      avatar: "/images/Creators/NickCrowley.png",
      youtubeUrl: "https://www.youtube.com/@NickCrowley",
      subscribers: "2.8M",
      totalViews: "380M",
      videoCount: "150+",
    },
    {
      name: "Luke Lamana",
      show: "Wartime Stories",
      avatar: "/images/Creators/Wartime.png",
      youtubeUrl: "https://www.youtube.com/@WartimeStories",
      subscribers: "1.5M",
      totalViews: "250M",
      videoCount: "300+",
    },
    {
      name: "Bedtime Stories",
      show: "Bedtime Stories Podcast",
      avatar: "/images/Creators/Bedtime.png",
      youtubeUrl: "https://www.youtube.com/@BedtimeStoriesChannel",
      subscribers: "2.2M",
      totalViews: "420M",
      videoCount: "350+",
    },
  ] as Creator[],
  awards: [
    {
      name: "MrBallen Podcast - Golden Globe Nominee",
      image: "/images/Ballen-Golden-GlobeNomination.png",
      year: "2025",
      category: "Best Podcast Award",
      caption: "Among the first podcasts ever nominated by the Hollywood Foreign Press.",
    },
    {
      name: "MrBallen - Webby Winner",
      image: "/images/MrBallen-WebbyWinner-2023.png",
      year: "2023",
      category: "Podcast of the Year",
      caption: "The Webbys are the leading international award for digital media — podcast category.",
    },
    {
      name: "MrBallen - Webby Honoree",
      image: "/images/MrBallen-WebbyHonoree-2024.png",
      year: "2024",
      category: "True Crime",
      caption: "Top 5 in true crime out of 13,000+ entries worldwide.",
    },
    {
      name: "Wartime Stories - Webby Honoree",
      image: "/images/WartimeStories-WebbyHonoree-2025.png",
      year: "2025",
      category: "History",
      caption: "Recognized in the history & documentary category for immersive storytelling.",
    },
    {
      name: "Medical Mysteries - Webby Honoree",
      image: "/images/MedicalMysteries-WebbyHonoree-2024.png",
      year: "2024",
      category: "Health & Medical",
      caption: "Recognized for narrative excellence in the health & medical category.",
    },
  ] as Award[],
  clients: [
    { logo: "/images/Warner_Records_(grey).png", name: "Warner Records" },
    { logo: "/images/Universal Logo-grey.png", name: "Universal Music" },
    { logo: "/images/Disney_Channel_grey.png", name: "Disney Channel" },
    { logo: "/images/Ballen Studios Logo -grey.png", name: "Ballen Studios" },
    { logo: "/images/Amazon_Music_grey.png", name: "Amazon Music" },
  ] as Client[],
};
