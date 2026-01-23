# Audio Showcase Card Component

A beautiful, interactive audio player component designed to showcase your mix/master work with before/after comparisons.

## Features

- **Artwork-focused design** with large album cover display
- **Hover animations** - Bottom text and toggle slide up smoothly when hovering
- **Play/Pause functionality** with visual feedback
- **Grayscale filter** - Artwork becomes black & white when paused
- **Mixed/Unmixed toggle** with smooth text transition animation
- **Responsive design** - Works beautifully on all screen sizes

## Component Files

- `audio-showcase-card.tsx` - Main card component
- `audio-showcase-grid.tsx` - Grid wrapper for displaying multiple cards
- `audio-card.tsx` - Original compact audio card (still available)

## Usage

### Option 1: Replace the existing FeaturedWorkGrid

In [about.tsx](components/sections/about.tsx), replace the import and component:

```tsx
// Change this:
import { FeaturedWorkGrid } from "@/components/featured-work/featured-work-grid";

// To this:
import { AudioShowcaseGrid } from "@/components/featured-work/audio-showcase-grid";

// Then in the JSX, change:
<FeaturedWorkGrid />

// To:
<AudioShowcaseGrid />
```

### Option 2: Use individual AudioShowcaseCard components

```tsx
import { AudioShowcaseCard } from "@/components/featured-work/audio-showcase-card";
import { featuredData } from "@/lib/data/featured";

export function MyComponent() {
  const audioCard = featuredData.featuredCards.find(
    (card) => card.type === 'audio' && card.id === 'audio-1'
  );

  return (
    <div className="max-w-[400px] mx-auto">
      <AudioShowcaseCard data={audioCard} index={0} />
    </div>
  );
}
```

### Option 3: Create a custom layout

```tsx
import { AudioShowcaseCard } from "@/components/featured-work/audio-showcase-card";

export function CustomShowcase() {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {featuredData.featuredCards
        .filter((card) => card.type === 'audio' && card.thumbnail)
        .map((card, index) => (
          <AudioShowcaseCard key={card.id} data={card} index={index} />
        ))}
    </div>
  );
}
```

## Data Structure

To use the AudioShowcaseCard, your audio data in [featured.ts](lib/data/featured.ts) must include a `thumbnail` field:

```typescript
{
  type: 'audio' as const,
  id: 'audio-1',
  title: 'Wartime Stories',
  description: 'A cinematic audio composition...',
  category: 'Ballen Studios',
  audioFiles: {
    mixed: '/audio/Wartime Stories Scene-mixed.mp3',
    unmixed: '/audio/Wartime Stories Scene-unmixed.mp3',
  },
  thumbnail: '/images/Wartime Stories.png', // Required for showcase card
}
```

## Component Props

### AudioShowcaseCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `AudioCardData` | required | Audio card data object |
| `index` | `number` | `0` | Index for staggered animation delay |

### AudioCardData Interface

```typescript
interface AudioCardData {
  type: 'audio';
  id: string;
  title: string;
  description: string;
  category: string; // Displayed as top-left brand text
  audioFiles: {
    mixed: string;    // Path to mixed audio file
    unmixed: string;  // Path to unmixed audio file
  };
  thumbnail?: string; // Path to artwork image (required for showcase card)
  duration?: string;
}
```

## Styling & Customization

The component uses Tailwind CSS classes and can be customized by modifying [audio-showcase-card.tsx](components/featured-work/audio-showcase-card.tsx):

### Key styling areas:

1. **Card dimensions**: `aspect-[3/4]` - Change to adjust card proportions
2. **Max width**: `max-w-[400px]` - Adjust maximum card size
3. **Border radius**: `rounded-[20px]` - Modify corner roundness
4. **Grayscale effect**: `grayscale` class on the image when not playing
5. **Text colors**: White text with various opacity levels
6. **Button size**: `w-20 h-20` for the play/pause button

### Hover behavior customization:

The hover section uses Framer Motion's `AnimatePresence` for smooth transitions. Adjust the animation in the component:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.3, ease: 'easeOut' }} // Adjust timing here
>
```

## Audio Files

Place your audio files in the `public/audio/` directory:

```
public/
  audio/
    Wartime Stories Scene-mixed.mp3
    Wartime Stories Scene-unmixed.mp3
  images/
    Wartime Stories.png
```

## Logo/Brand Icon

The component includes a placeholder brand icon in the top-left corner. To customize it:

1. **Replace with an image**:
```tsx
<Image
  src="/images/your-logo.png"
  alt="Brand logo"
  width={40}
  height={40}
  className="rounded-full"
/>
```

2. **Use a different icon**:
```tsx
import { Music } from 'lucide-react';

<Music className="w-6 h-6 text-white" />
```

3. **Remove it entirely**: Delete the top-left div section

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Audio format support depends on browser (MP3 is widely supported)

## Accessibility

The component includes:
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML
- Screen reader friendly

## Performance Notes

- Images use Next.js `Image` component with `priority` flag for faster loading
- Audio files are preloaded with `metadata` only to save bandwidth
- Smooth position preservation when toggling between mixed/unmixed versions

## Troubleshooting

### Audio doesn't play
- Check that audio files exist in `public/audio/` directory
- Verify file paths in `featured.ts` are correct
- Check browser console for errors

### Thumbnail doesn't show
- Verify image exists at the path specified in `thumbnail` field
- Check that the path starts with `/images/` (relative to `public/`)
- Try using `.jpg` or `.webp` if `.png` causes issues

### Hover animation doesn't work
- Ensure you're not on a touch device (hover is disabled on mobile)
- Check that `isHovered` state is being set correctly

## Examples in Production

See the component in action in the "What I've Done" section of the About page.
