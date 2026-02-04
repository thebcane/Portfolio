export type FeaturedCardType = 'audio' | 'video' | 'project' | 'music';

export interface AudioCardData {
  type: 'audio';
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  audioFiles: {
    mixed: string;
    unmixed: string;
  };
  toggleLabels?: {
    primary: string;    // Label for "mixed" version (default: "Mixed")
    secondary: string;  // Label for "unmixed" version (default: "Unmixed")
  };
  thumbnail?: string;
  duration?: string;
  videoEmbed?: string; // YouTube, Vimeo, or other embed URL
  links?: {
    label: string;
    url: string;
    icon?: 'youtube' | 'spotify' | 'instagram' | 'twitter' | 'website' | 'apple' | 'link';
  }[];
  tools?: {
    name: string;
    logo: string;
  }[];
}

export interface MusicCardData {
  type: 'music';
  id: string;
  title: string;
  artist?: string;
  description?: string;
  tags?: string[];
  audioFile: string;
  thumbnail?: string;
  genre?: string;
  duration?: string;
  releaseDate?: string;
  label?: string;
  labelLogo?: string; // Path to label/client logo
  plays?: string; // Display string like "3.7M Plays"
  credits?: string[];
  spotifyEmbed?: string; // Spotify embed URL
  youtubeEmbed?: string; // YouTube embed URL
  links?: {
    label: string;
    url: string;
    icon?: 'spotify' | 'apple' | 'youtube' | 'link';
  }[];
  tools?: {
    name: string;
    logo: string;
  }[];
}

export interface VideoCardData {
  type: 'video';
  id: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  thumbnail: string;
  videoEmbed?: string; // YouTube, Vimeo, or other embed URL (optional if using videoFile)

  // NEW: For local video files with audio stems
  videoFile?: string;           // Path to local video file (e.g., "/videos/The VVitch - Video Preview.mp4")
  audioStems?: {                // Array of audio stem options
    label: string;              // Display name: "Full Scene", "Foley+Amb", "Music"
    audioPath: string;          // Path to audio file: "/audio/The VVitch - Full Scene.mp3"
  }[];

  awards?: string[];
  role?: string[];
  technicalDetails?: {
    format?: string;
    duration?: string;
    client?: string;
    year?: string;
  };
  links?: {
    label: string;
    url: string;
    icon?: 'youtube' | 'instagram' | 'twitter' | 'website' | 'link';
  }[];
  tools?: {
    name: string;
    logo: string;
  }[];
}

export interface ProjectCardData {
  type: 'project';
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
}

export type FeaturedCard = AudioCardData | VideoCardData | ProjectCardData | MusicCardData;

export const featuredData = {
  featuredCards: [
    {
      type: 'video' as const,
      id: 'video-0',
      title: 'Animation Reel - 3D Motion Graphics',
      description: 'A comprehensive showcase of 3D animation and motion graphics work created for Amazon promotional campaigns and MrBallen\'s social media platforms. This reel features projects that reached millions of viewers across Amazon\'s platforms and social media channels. Each piece was conceptualized, modeled, and rendered from the ground up—combining technical expertise with creative storytelling. The work demonstrates proficiency in full 3D production pipelines, from initial concept and modeling through final compositing and effects work.',
      category: 'Animation & VFX',
      tags: ['3D Animation', 'Blender', 'Unreal Engine', 'Motion Graphics', 'VFX', 'Amazon'],
      thumbnail: '/images/Animation Reel Thumbail.png',
      videoEmbed: 'https://www.youtube.com/embed/blwF2wGUIUE',
      role: [
        '3D Artist - Complete scene ideation, modeling, and planning in Blender',
        'Technical Artist - Developed custom node groups for scattering, rain effects, and procedural materials',
        'Texture Artist - Created materials from original photography and procedural textures',
        'Character Animator - Performed character animation when required',
        'Real-time Artist - Utilized Unreal Engine for select projects',
        'Editor & Compositor - Final editing in Premiere Pro with VFX pass in After Effects',
      ],
      technicalDetails: {
        format: 'Animation Reel',
        client: 'Amazon / MrBallen Social Media',
        year: '2023-2024',
      },
      awards: [
        'Reached millions of viewers across Amazon platforms and MrBallen\'s social media',
        'Featured in promotional campaigns for Amazon',
      ],
      links: [
        { label: 'Watch on YouTube', url: 'https://youtu.be/blwF2wGUIUE', icon: 'youtube' },
      ],
      tools: [
        { name: 'Blender', logo: '/images/Blender logo.png' },
        { name: 'Unreal Engine', logo: '/images/UnrealEngine Logo.png' },
        { name: 'Adobe Premiere Pro', logo: '/images/PremiereLogo.png' },
        { name: 'Adobe After Effects', logo: '/images/AfterEffectsLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-1',
      title: 'Wartime Stories',
      description: 'Every soldier has a story. Some, they try to forget. Others, they can’t stop thinking about – stories that no one else would believe happened. Something that terrified them. Something they cannot explain. \n\nFrom Ballen Studios, and hosted by Marine Corp Reconnaissance veteran, Luke Lamana, this is Wartime Stories. A weekly podcast that is a mix of horror, mystery, and awe inspiring tales. Where the strange, dark & mysterious meets the battlefield and beyond.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Wartime Stories.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-2',
      title: 'MrBallen Podcast: Strange, Dark & Mysterious Stories',
      description: 'The flagship podcast from Ballen Studios that started it all. Hosted by John Allen (MrBallen), this true crime and mystery podcast presents strange, dark, and mysterious content delivered in captivating story format. Each episode features meticulously researched tales of the unexplained, bizarre crimes, and chilling mysteries—all enhanced with immersive sound design and atmospheric audio production. With billions of views across platforms, MrBallen has become one of the most recognized voices in true crime storytelling.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'True Crime', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/MrBallen Podcast SDM.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-3',
      title: 'Late Nights with Nexpo',
      description: 'From Ballen Studios, the official podcast of acclaimed YouTube creator Nexpo brings the most bizarre and chilling true stories and mysteries to the audio format. Featuring deep dives into internet mysteries, disturbing true crime, and unexplained phenomena, each episode is crafted with Nexpo\'s signature investigative style and enhanced with immersive soundscapes. Listen to unravel the unexplained through meticulously researched content paired with atmospheric audio design that pulls you into each unsettling mystery.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'Mystery', 'True Crime', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Late Nights with Nexpo.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-4',
      title: 'A Twist of History',
      description: 'The course of history never follows a straight line. Very often, we can pinpoint a remarkable, thrilling twist that changes everything that follows. From Ballen Studios, A Twist of History explores these pivotal moments—the epic stories that have shaped the world we now live in. Each episode examines a critical turning point in human history, brought to life through cinematic sound design and immersive audio storytelling that transports listeners to these world-changing moments.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'History', 'Documentary', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Twist of History.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-5',
      title: 'Medical Mysteries',
      description: 'We trust doctors with our lives—they are some of the most educated and well-respected members of society. But what happens when they can\'t diagnose a patient? This high-stakes medical procedural follows patients as they suffer from bizarre, often terrifying illnesses that doctors never learned about in medical school. A Spotify Original from Parcast, Medical Mysteries combines medical drama with immersive sound design to explore the most baffling cases in modern medicine, where life and death hang in the balance of the unexplainable.',
      category: 'Parcast/Spotify',
      tags: ['Podcast', 'Sound Design', 'Medical', 'Mystery', 'Documentary'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Medical Mysteries.png',
      links: [
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://parcast.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-6',
      title: 'Bedtime Stories',
      description: 'From Ballen Studios, welcome to Bedtime Stories—but don\'t expect sweet dreams. From the paranormal to the supernatural, unsolved mysteries to strange deaths, cryptids to the most disturbing of true crime, this podcast brings you stories from around the world, all told in a unique and bone-chilling way. Each Wednesday, settle in for tales that blur the line between reality and nightmare, enhanced with atmospheric sound design that will keep you up long after the episode ends.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'Paranormal', 'True Crime', 'Horror'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Bedtime Stories.jpg',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-7',
      title: 'Redacted: Declassified Mysteries',
      description: 'Behind the closed doors of government offices and military compounds lie hidden stories and buried secrets from the darkest corners of history. From the hitmakers at Wondery and Ballen Studios, Redacted pulls back the curtain on once-classified information, exposing the secrets and lies behind the world\'s most powerful institutions. Each week, Marine Corps Reconnaissance veteran Luke Lamana investigates declassified documents and covert operations, brought to life with cinematic sound design that reveals what they never wanted you to know.',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'Military', 'History', 'Documentary', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Redacted.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'audio-8',
      title: 'Run Fool!',
      description: 'Out of the terrifying mind of Rodney Barnes comes RUN, FOOL!—a compendium of grisly and harrowing tales guaranteed to make you scream. Pull up a seat at the campfire and lean in for a new breed of modern ghost story. From the page to the screen and now straight to your ears, acclaimed writer Rodney Barnes (known for genre-defining stories about monsters, demons, vampires, and the occult) tells a new story each week, each from a different place and period, all equally frightening—and all brought together with gripping and immersive sound design. If you get too scared... RUN, FOOL!',
      category: 'Ballen Studios',
      tags: ['Podcast', 'Sound Design', 'Horror', 'Fiction', 'Supernatural', 'Immersive Audio'],
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
      thumbnail: '/images/Run Fool.png',
      links: [
        { label: 'YouTube', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Spotify', url: 'https://open.spotify.com/show/example', icon: 'spotify' },
        { label: 'Apple Podcasts', url: 'https://podcasts.apple.com/example', icon: 'apple' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'dialog-1',
      title: 'Podcast Voice Cleanup - Noise Reduction',
      description: 'Professional noise reduction and background cleanup for podcast recording. This sample demonstrates advanced noise profiling and spectral editing techniques to remove persistent background hum, HVAC noise, and environmental artifacts while preserving vocal clarity and natural tone. The process involved multi-pass noise reduction, surgical EQ to target specific frequency ranges, and careful dynamics control to maintain consistent presence throughout the recording.',
      category: 'Dialog Editing',
      tags: ['Dialog Editing', 'Noise Reduction', 'Podcast', 'Restoration'],
      audioFiles: {
        mixed: '/audio/dialog-noise-reduction-after.mp3',
        unmixed: '/audio/dialog-noise-reduction-before.mp3',
      },
      toggleLabels: {
        primary: 'After',
        secondary: 'Before'
      },
      thumbnail: '/images/dialog-noise-reduction-thumb.jpg',
      tools: [
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'dialog-2',
      title: 'De-essing & Plosive Removal',
      description: 'Surgical de-essing and plosive correction for voice-over work. This example showcases targeted frequency reduction to tame harsh sibilance without dulling the overall vocal brightness, combined with precise plosive removal using spectral editing and strategic high-pass filtering. The result maintains vocal energy and articulation while eliminating distracting mouth noises and breath artifacts.',
      category: 'Dialog Editing',
      tags: ['Dialog Editing', 'De-essing', 'Voice-Over', 'Vocal Mixing'],
      audioFiles: {
        mixed: '/audio/dialog-deessing-after.mp3',
        unmixed: '/audio/dialog-deessing-before.mp3',
      },
      toggleLabels: {
        primary: 'After',
        secondary: 'Before'
      },
      thumbnail: '/images/dialog-deessing-thumb.jpg',
      tools: [
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'dialog-3',
      title: 'Vocal Mixing & EQ Enhancement',
      description: 'Complete vocal mixing chain demonstrating professional EQ shaping, compression, and tonal enhancement. This sample illustrates a full vocal processing workflow: corrective EQ to address resonances and boxiness, creative EQ for presence and air, transparent compression for consistency, subtle saturation for warmth, and final limiting for broadcast loudness standards. The transformation brings studio-quality polish to a raw recording while maintaining natural vocal character.',
      category: 'Dialog Editing',
      tags: ['Dialog Editing', 'Vocal Mixing', 'EQ', 'Compression'],
      audioFiles: {
        mixed: '/audio/dialog-vocal-mixing-after.mp3',
        unmixed: '/audio/dialog-vocal-mixing-before.mp3',
      },
      toggleLabels: {
        primary: 'After',
        secondary: 'Before'
      },
      thumbnail: '/images/dialog-vocal-mixing-thumb.jpg',
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
    {
      type: 'audio' as const,
      id: 'dialog-4',
      title: 'Dialogue Repair & Restoration',
      description: 'Advanced audio restoration techniques applied to damaged or degraded dialog recordings. This comprehensive repair work demonstrates the restoration of audio with clipping distortion, drop-outs, phase issues, and severe background interference. Using a combination of spectral repair, declipping algorithms, phase correction, and creative problem-solving, the damaged source material is transformed into usable, professional-quality dialog. Ideal for salvaging irreplaceable recordings or fixing technical issues from field recordings.',
      category: 'Dialog Editing',
      tags: ['Dialog Editing', 'Restoration', 'Audio Repair', 'Dialogue Repair'],
      audioFiles: {
        mixed: '/audio/dialog-restoration-after.mp3',
        unmixed: '/audio/dialog-restoration-before.mp3',
      },
      toggleLabels: {
        primary: 'After',
        secondary: 'Before'
      },
      thumbnail: '/images/dialog-restoration-thumb.jpg',
      tools: [
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-1',
      title: 'Storytime with MrBallen',
      description: 'From Ballen Studios, Storytime with MrBallen brings the strange, dark, and mysterious stories you love into a format perfect for the whole family. Hosted by John Allen (MrBallen), this YouTube series features captivating tales told with his signature storytelling style, enhanced with immersive sound design and atmospheric audio that brings each story to life. Whether you\'re gathered around for family viewing or enjoying a solo journey into the unknown, Storytime delivers unforgettable narratives that showcase the art of audio-visual storytelling.',
      category: 'Ballen Studios',
      tags: ['YouTube', 'Sound Design', 'Storytelling', 'Mystery', 'Immersive Audio'],
      thumbnail: '/images/Storytime-Thumbnail.jpg',
      videoEmbed: 'https://www.youtube.com/embed/8SEDCUaL0hY',
      role: [
        'Lead Audio Engineer - Full sound design and mixing',
        'Immersive audio production and atmospheric sound',
        'Post-production audio supervision',
      ],
      technicalDetails: {
        format: 'YouTube Series',
        duration: '300+ Episodes',
        client: 'Ballen Studios',
        year: '2023-2024',
      },
      links: [
        { label: 'Watch on YouTube', url: 'https://youtu.be/8SEDCUaL0hY', icon: 'youtube' },
        { label: 'Ballen Studios', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
        { label: 'Website', url: 'https://ballenstudios.com', icon: 'website' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-2',
      title: 'Final Fantasy X - Opening Cinematic',
      description: 'A complete audio reimagining of the iconic Final Fantasy X opening sequence. This beloved JRPG from Square Enix tells the story of Tidus, a star blitzball player transported to the world of Spira, where he joins summoner Yuna on her pilgrimage to defeat the monstrous Sin. The opening cinematic showcases the destruction of Zanarkand, setting the stage for one of gaming\'s most emotional journeys. This personal project features comprehensive sound design including all SFX, music composition, foley work, and field recordings captured with an Aston Spirit microphone.',
      category: 'Case Study',
      tags: ['Video Game', 'Sound Design', 'Foley', 'Composition', 'Field Recording'],
      thumbnail: '/images/FFX-thumbnail.jpg',
      videoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      role: [
        'Sound Designer - Complete SFX library creation',
        'Composer - Original score composition and arrangement',
        'Foley Artist - All performance and recording',
        'Recording Engineer - Field recording and microphone work',
        'Mixing Engineer - Final mix and master in Ableton & Studio One',
      ],
      technicalDetails: {
        format: 'Game Cinematic Re-score',
        duration: '4 minutes',
        client: 'Case Study',
        year: '2024',
      },
      links: [
        { label: 'Watch on YouTube', url: 'https://youtube.com/example', icon: 'youtube' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-3',
      title: 'The VVitch - Audio Production',
      description: 'An atmospheric audio redesign of Robert Eggers\' critically acclaimed folk horror masterpiece. The VVitch (2015) follows a Puritan family in 1630s New England as they encounter forces of evil in the woods beyond their remote farm. Known for its historical authenticity and unsettling atmosphere, the film explores themes of religious paranoia, isolation, and the unknown. This case study showcases period-appropriate sound design, eerie environmental textures, and haunting musical elements—all captured and crafted using an Aston Spirit microphone for foley and field recording work.',
      category: 'Case Study',
      tags: ['Horror Film', 'Sound Design', 'Foley', 'Composition', 'Interactive Audio'],
      thumbnail: '/images/VVITCH Thumbnail.png',

      // Local video file with interactive audio stems
      videoFile: '/videos/The VVitch - Video Preview.mp4',
      audioStems: [
        { label: 'Full Scene', audioPath: '/audio/The VVitch - Full Scene.wav' },
        { label: 'Foley+Amb', audioPath: '/audio/The VVitch - Foley+Amb.wav' },
        { label: 'Music', audioPath: '/audio/The VVitch - Music.wav' }
      ],

      role: [
        'Sound Designer - Period-appropriate SFX and environmental design',
        'Composer - Dark ambient score and musical textures',
        'Foley Artist - Organic material performance and recording',
        'Recording Engineer - Field recording and atmospheric capture',
        'Mixing Engineer - Immersive mix in Ableton & Studio One',
      ],
      technicalDetails: {
        format: 'Film Scene Re-score',
        duration: '6 minutes',
        client: 'Case Study',
        year: '2024',
      },
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-4',
      title: 'Ponyo - Amazon Preview',
      description: 'An enchanting audio production for Studio Ghibli\'s beloved animated fantasy Ponyo. Directed by Hayao Miyazaki, this heartwarming tale follows a goldfish princess who befriends a human boy and dreams of becoming human herself. The film is celebrated for its hand-drawn animation, environmental themes, and childlike wonder inspired by Hans Christian Andersen\'s The Little Mermaid. This Amazon promotional preview features custom sound design, underwater acoustics, orchestral composition, and field-recorded natural elements—all captured with an Aston Spirit microphone. Note: Original vocal stems were unavailable, resulting in rough vocal integration in the final mix.',
      category: 'Case Study',
      tags: ['Animation', 'Sound Design', 'Foley', 'Orchestral', 'Field Recording'],
      thumbnail: '/images/ponyo-amazon.jpg',

      // Local video file with interactive audio stems
      videoFile: '/videos/Ponyo-Full Scene.mp4',
      audioStems: [
        { label: 'Full Scene', audioPath: '/audio/Ponyo-Full Scene.mp3' },
        { label: 'Foley+Amb', audioPath: '/audio/Ponyo-foley+Amb.mp3' },
        { label: 'Music', audioPath: '/audio/Ponyo-Music.mp3' },
        { label: 'Music & Foley', audioPath: '/audio/Ponyo-NoVocals.mp3' }
      ],

      role: [
        'Sound Designer - Whimsical SFX and underwater soundscapes',
        'Composer - Orchestral arrangements and musical themes',
        'Foley Artist - Water elements and environmental textures',
        'Recording Engineer - Natural environment field recording',
        'Mixing Engineer - Theatrical mix in Ableton & Studio One',
      ],
      technicalDetails: {
        format: 'Promotional Preview',
        duration: '2 minutes',
        client: 'Case Study',
        year: '2024',
      },
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-5',
      title: 'MaXXXine - Trailer Production',
      description: 'A gritty audio reimagining of the trailer for Ti West\'s MaXXXine, the thrilling conclusion to his X horror trilogy. Set in 1985 Los Angeles, MaXXXine follows adult film star Maxine Minx as she pursues Hollywood stardom while a mysterious killer stalks the city\'s elite. The film blends slasher horror with dark satire of the entertainment industry, featuring neon-soaked 80s aesthetics and Mia Goth\'s captivating performance. This case study showcases period-accurate sound design, synth-heavy composition, urban atmosphere, and tension-building audio work—all recorded with an Aston Spirit microphone. Note: Original vocal stems were unavailable, affecting vocal clarity in the final trailer mix.',
      category: 'Case Study',
      tags: ['Horror Film', 'Trailer', 'Sound Design', '80s Aesthetic', 'Composition'],
      thumbnail: '/images/maxxine-thumbnail.png',
      videoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      role: [
        'Sound Designer - 80s-inspired SFX and urban soundscapes',
        'Composer - Synth-driven score and trailer music',
        'Foley Artist - Period-appropriate material performance',
        'Recording Engineer - Urban environment and texture capture',
        'Mixing Engineer - High-impact trailer mix in Ableton & Studio One',
      ],
      technicalDetails: {
        format: 'Film Trailer Re-score',
        duration: '2.5 minutes',
        client: 'Case Study',
        year: '2024',
      },
      links: [
        { label: 'Watch on YouTube', url: 'https://youtube.com/example', icon: 'youtube' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-8',
      title: 'Terrifier 3 - Trailer Production',
      description: 'An intense audio production for the Terrifier 3 trailer, the latest installment in Damien Leone\'s cult horror franchise. Terrifier 3 continues the terrifying saga of Art the Clown, delivering brutal slasher horror with unflinching gore and suspense. This case study showcases comprehensive sound design including all SFX work, original score composition, and complete mixing—creating a visceral and tension-filled trailer experience. All audio elements were crafted with an Aston Spirit microphone for foley and field recording work. Note: Original vocal stems were unavailable, resulting in rough vocal integration in the final mix.',
      category: 'Case Study',
      tags: ['Horror Film', 'Trailer', 'Sound Design', 'Composition', 'Mixing'],
      thumbnail: '/images/Terrifier-3.jpg',

      // Local video file with interactive audio stems
      videoFile: '/videos/Terrifier - Full Scene.mp4',
      audioStems: [
        { label: 'Full Scene', audioPath: '/audio/Terrifier - Full Scene.mp3' },
        { label: 'Music & Foley', audioPath: '/audio/Terrifier - NoVocals.mp3' }
      ],

      role: [
        'Sound Designer - Complete SFX library creation and horror soundscapes',
        'Composer - Original score composition and arrangement',
        'Mixing Engineer - Full trailer mix in Ableton & Studio One',
        'Foley Artist - All performance and recording',
        'Recording Engineer - Field recording and texture capture',
      ],
      technicalDetails: {
        format: 'Film Trailer Re-score',
        duration: '2.5 minutes',
        client: 'Case Study',
        year: '2024',
      },
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-6',
      title: 'Wartime Stories - YouTube Channel',
      description: 'From Ballen Studios, Wartime Stories brings powerful military narratives to YouTube. Hosted by Marine Corps Reconnaissance veteran Luke Lamana, this YouTube channel delivers weekly episodes where soldiers share their most unforgettable experiences—stories of the strange, mysterious, and unexplainable from the battlefield and beyond. Each episode features immersive sound design and atmospheric audio production that enhances these compelling first-person accounts, creating an engaging audio-visual experience that honors the voices of those who served.',
      category: 'Ballen Studios',
      tags: ['YouTube', 'Sound Design', 'Military Stories', 'Documentary', 'Immersive Audio'],
      thumbnail: '/images/Wartime Stories - Thumbnail.jpg',
      videoEmbed: 'https://www.youtube.com/embed/QkRRERFPfEM',
      role: [
        'Lead Audio Engineer - Full sound design and mixing',
        'Immersive audio production and atmospheric sound',
        'Post-production audio supervision',
      ],
      technicalDetails: {
        format: 'YouTube Series',
        client: 'Ballen Studios',
        year: '2023-2024',
      },
      links: [
        { label: 'Watch on YouTube', url: 'https://www.youtube.com/watch?v=QkRRERFPfEM', icon: 'youtube' },
        { label: 'Wartime Stories Channel', url: 'https://youtube.com/@ballenstudios', icon: 'youtube' },
      ],
    },
    {
      type: 'video' as const,
      id: 'video-7',
      title: 'Nexpo - YouTube Channel',
      description: 'Nexpo is one of YouTube\'s most acclaimed creators in the internet mystery and true crime space, known for his meticulous research and captivating storytelling. His channel features deep dives into disturbing internet mysteries, unexplained phenomena, and unsettling true crime cases. Each video combines investigative journalism with cinematic presentation, enhanced by atmospheric sound design and immersive audio that draws viewers into the darkest corners of the internet. With millions of subscribers and hundreds of millions of views, Nexpo has established himself as a leading voice in digital mystery content.',
      category: 'YouTube Creator',
      tags: ['YouTube', 'Sound Design', 'Internet Mysteries', 'True Crime', 'Documentary'],
      thumbnail: '/images/Nexpo Youtube Thumbnail.jpg',
      videoEmbed: 'https://www.youtube.com/embed/cTvENiN4DiE',
      role: [
        'Sound Designer - Atmospheric audio and environmental design',
        'Audio Engineer - Mixing and post-production',
        'Immersive soundscape creation',
      ],
      technicalDetails: {
        format: 'YouTube Series',
        client: 'Nexpo',
        year: '2023-2024',
      },
      links: [
        { label: 'Watch on YouTube', url: 'https://www.youtube.com/watch?v=cTvENiN4DiE', icon: 'youtube' },
        { label: 'Nexpo Channel', url: 'https://www.youtube.com/@Nexpo', icon: 'youtube' },
      ],
    },
    {
      type: 'project' as const,
      id: 'project-1',
      title: 'E-Commerce Platform',
      description: 'Full-stack marketplace with real-time inventory management and secure payment processing.',
      category: 'Web Development',
      image: '/images/project-1.jpg',
      link: '#',
    },
    {
      type: 'audio' as const,
      id: 'audio-6',
      title: 'Digital Waves',
      description: 'Electronic composition exploring the intersection of organic and synthetic sound design.',
      category: 'Sound Design',
      audioFiles: {
        mixed: '/audio/Wartime Stories Scene-mixed.mp3',
        unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
      },
    },
    {
      type: 'project' as const,
      id: 'project-2',
      title: 'Portfolio Redesign',
      description: 'Modern, responsive portfolio site built with Next.js, featuring smooth animations and optimized performance.',
      category: 'UI/UX Design',
      image: '/images/project-2.jpg',
      link: '#',
    },
    {
      type: 'music' as const,
      id: 'music-1',
      title: 'Caught Feelings',
      artist: 'Mckenzie Small',
      description: 'A vibrant pop anthem from Disney Channel star Mckenzie Small, showcasing her powerful vocals and relatable storytelling. Mckenzie is an actress and singer known for her role in Disney\'s "Saturdays" and has been building a dedicated fanbase with her authentic pop sound and engaging performances. This track represents a collaborative effort bringing together top-tier songwriters, producers, and the artist to create a polished, radio-ready production that resonates with young audiences.',
      tags: ['Pop', 'Production', 'Songwriting', 'Mixing'],
      audioFile: '/audio/caught-feelings.mp3',
      thumbnail: '/images/Caught Feelings.jpg',
      genre: 'Pop',
      plays: '3.7M Plays',
      label: 'Disney Records / Disney Channel',
      labelLogo: '/images/Disney_Channel_grey.png',
      credits: [
        'Producer - Collaborated on full production',
        'Songwriter - Co-wrote and ideated the track',
        'Mix Engineer - Mixing and audio refinement',
        'Coordination - Direct work with artist and writing team',
      ],
      spotifyEmbed: 'https://open.spotify.com/embed/track/3PftjXtZ9ldP7a8LTOxWCr?utm_source=generator',
      links: [
        { label: 'Listen on Spotify', url: 'https://open.spotify.com/track/3PftjXtZ9ldP7a8LTOxWCr', icon: 'spotify' },
        { label: 'Mckenzie Small on Spotify', url: 'https://open.spotify.com/artist/03euI3RvhxVZ5fio13dzco', icon: 'spotify' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
        { name: 'Studio One', logo: '/images/StudioOneLogo.png' },
      ],
    },
    {
      type: 'music' as const,
      id: 'music-2',
      title: 'What I Know',
      artist: 'Derin Falana',
      description: 'A hard-hitting rap track that showcases Derin Falana\'s lyrical prowess and authentic storytelling. This production blends contemporary hip-hop elements with creative sonic textures, resulting in a polished, professional sound that has resonated with audiences worldwide. The collaborative production process involved close work with another producer and the artist to ensure the vision was fully realized.',
      tags: ['Rap', 'Hip-Hop', 'Production', 'Mixing'],
      audioFile: '/audio/what-i-know.mp3',
      thumbnail: '/images/What I Know.jpg',
      genre: 'Rap',
      plays: '1.59M Plays',
      label: 'Independent',
      credits: [
        'Producer - Full beat production and arrangement',
        'Mix Engineer - Complete mixing and audio processing',
        'Collaboration - Worked with co-producer and artist',
      ],
      spotifyEmbed: 'https://open.spotify.com/embed/track/2JMzOp5CxyyYarvGbdnPna?utm_source=generator',
      links: [
        { label: 'Listen on Spotify', url: 'https://open.spotify.com/track/2JMzOp5CxyyYarvGbdnPna', icon: 'spotify' },
        { label: 'Derin Falana on Spotify', url: 'https://open.spotify.com/artist/5yjfk1YZOcpDKqLEgvE9WG', icon: 'spotify' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
    {
      type: 'music' as const,
      id: 'music-3',
      title: 'Like 1999 (from "Valley" Album)',
      artist: 'Valley',
      description: 'A standout track from Valley\'s critically acclaimed indie-pop album. Valley, the Toronto-based band known for their infectious melodies and nostalgic sound, has garnered millions of streams worldwide. This project involved comprehensive creative direction—from album design and artwork to song ideation, with contributions to writing and production. Working alongside Mike Brandolino throughout multiple projects including Disney collaborations, this album represents a deep creative partnership and a polished indie-pop vision released through Universal Music.',
      tags: ['Indie-Pop', 'Album Design', 'Songwriting', 'Production', 'Creative Direction'],
      audioFile: '/audio/like-1999.mp3',
      thumbnail: '/images/Like 1999.jpg',
      genre: 'Indie-Pop',
      plays: '31.5M Plays',
      label: 'Universal Music',
      labelLogo: '/images/Universal Logo-grey.png',
      credits: [
        'Creative Director - Album design and artwork direction',
        'Songwriter - Song ideation and co-writing',
        'Producer - Production contributions across album',
        'Collaboration - Ongoing work with Mike Brandolino of Valley',
      ],
      spotifyEmbed: 'https://open.spotify.com/embed/track/1NfqGbaWcZLor12cITE5Fv?utm_source=generator',
      links: [
        { label: 'Listen on Spotify', url: 'https://open.spotify.com/track/1NfqGbaWcZLor12cITE5Fv', icon: 'spotify' },
        { label: 'Valley on Spotify', url: 'https://open.spotify.com/artist/7blXVKBSxdFZsIqlhdViKc', icon: 'spotify' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
    {
      type: 'music' as const,
      id: 'music-4',
      title: 'I\'m Coming Home (Hush the Kings Remix)',
      artist: 'Skylar Grey',
      description: 'An explosive electronic remix of Skylar Grey\'s emotional ballad that took Asia by storm. This high-energy reimagining transformed the original into a festival-ready anthem, amassing over 10 million plays and gaining significant radio play across Asian markets. The production showcases a complete transformation from the source material—featuring dynamic electronic elements, powerful drops, and a polished mix and master that translates across club systems and radio airwaves alike.',
      tags: ['Electronic', 'Remix', 'Production', 'Mixing', 'Mastering'],
      audioFile: '/audio/coming-home-remix.mp3',
      thumbnail: '/images/Skylar Grey - Coming Home.jpg',
      genre: 'Electronic',
      plays: '10M+ Plays',
      label: 'Independent / Warner Records',
      labelLogo: '/images/Warner_Records_(grey).png',
      credits: [
        'Producer - Full electronic production and remix arrangement',
        'Mix Engineer - Complete mixing for club and radio',
        'Mastering Engineer - Final master for commercial release',
        'Success - 10M+ plays with extensive Asian radio rotation',
      ],
      youtubeEmbed: 'https://www.youtube.com/embed/n1fQVrM4jK8',
      links: [
        { label: 'Watch on YouTube', url: 'https://youtu.be/n1fQVrM4jK8', icon: 'youtube' },
      ],
      tools: [
        { name: 'Ableton Live', logo: '/images/abletonlogo.png' },
        { name: 'Pro Tools', logo: '/images/Protools Logo.png' },
      ],
    },
  ] as FeaturedCard[],
};
