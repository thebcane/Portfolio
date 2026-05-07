# Brendan Cane - Personal Portfolio

A modern, responsive personal portfolio website built with Next.js 14, Framer Motion, and Shadcn UI components. Features a dark theme with smooth animations and intelligent responsive behavior.

## Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and interactive elements
- **Responsive Design**: Mobile-first approach with intelligent breakpoints
- **Dark Theme**: Elegant dark color scheme with gold accents
- **Component Library**: Shadcn UI components for consistent design
- **Form Validation**: React Hook Form with Zod schema validation
- **Portfolio Filtering**: Dynamic project filtering by category
- **Testimonial Modal**: Interactive testimonial showcase

## Structure

### Sections

1. **About** - Bio, services, testimonials, and clients
2. **Resume** - Education, experience, and skills with animated progress bars
3. **Portfolio** - Filterable project showcase with hover effects
4. **Contact** - Contact form with validation and contact information

### Key Features

- **Sidebar**: Collapsible profile sidebar with contact info (mobile) / sticky sidebar (desktop)
- **Navigation**: Bottom navigation (mobile) / top-right navigation (desktop)
- **Animations**: Page transitions, hover effects, and scroll-triggered animations
- **Responsive Breakpoints**:
  - xs: 450px
  - sm: 580px
  - md: 768px
  - lg: 1024px
  - xl: 1250px (sidebar + content layout)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
personal-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── sidebar.tsx         # Profile sidebar component
│   ├── navigation.tsx      # Tab navigation
│   ├── ui/                 # Shadcn UI components
│   ├── sections/           # Page sections (About, Resume, etc.)
│   └── features/           # Feature components
├── lib/
│   ├── data/              # Static data files
│   │   ├── profile.ts
│   │   ├── resume.ts
│   │   └── projects.ts
│   └── utils.ts           # Utility functions
└── public/
    └── images/            # Images and assets
```

## Customization

### Update Personal Information

Edit the data files in `lib/data/`:

- **profile.ts**: Name, bio, services, testimonials, social links
- **resume.ts**: Education, experience, skills
- **projects.ts**: Portfolio projects and categories

### Replace Placeholder Images

Replace images in `public/images/`:

- `avatar.jpg` - Your profile photo
- `avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg` - Testimonial photos
- `project-1.jpg` through `project-9.jpg` - Project screenshots
- `logo-1.png` through `logo-4.png` - Client logos

### Customize Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 7%;
  --foreground: 0 0% 84%;
  --accent: 45 100% 51%;
  /* ... more variables */
}
```

## Adding a New Outreach Page

Outreach pages live at `brendancane.com/{show-slug}` and are built from a single template at `app/[show-slug]/`. Each page is a personalized before/after for one podcast host.

### Steps

1. **Drop the audio files** into `public/audio/`:
   - `before-{slug}.mp3` (raw / unmixed)
   - `after-{slug}.mp3` (mixed)

2. **(Optional) Drop a thumbnail** into `public/images/` — the show's cover art improves the player visual. PNG/JPG, square.

3. **Add the show to `lib/data/outreach.ts`** as a new key in `outreachShows`:

   ```ts
   "murder-she-told": {
     hostFirstName: "Kristen",
     showName: "Murder, She Told",
     episodeTitle: "The Disappearance of Christopher Bird",  // clean title shown under the player
     setupParagraph:                                          // 1–2 sentences, rewrite per show
       "I took the intro from your episode on Christopher Bird and ran it through the vocal chain I'd use if I were mixing the show full-time.",
     audioFiles: {
       unmixed: "/audio/before-murder-she-told.mp3",
       mixed:   "/audio/after-murder-she-told.mp3",
     },
     thumbnail: "/images/murder-she-told.jpg",  // optional
     showDescription:                           // optional — fills the "About this show" modal
       "Murder, She Told is a true crime podcast …",
     whatChanged: [                             // rewrite per show — these are the actual changes you made
       "Tightened vocal EQ. Pulled the muddy 250-400 Hz buildup, opened the top end so the consonants land.",
       "De-essed and tamed mouth noise without dulling the natural texture of your voice.",
       // 3–5 bullets, plain-language, no em dashes
     ],
   },
   ```

   **Two fields that change for every show:**
   - `setupParagraph` — your own intro to what they're about to hear. The page automatically appends "Hit play and toggle between the before and after. The difference is most obvious on headphones." after it, so don't write that part.
   - `whatChanged` — the specific moves you actually made on *their* audio. These will differ every time. Plain language, no em dashes (use periods).

4. **Pick a slug** that doesn't collide with an existing top-level route. Reserved slugs are tracked in `RESERVED_SLUGS` (`api`, `podcasts`, `get-a-free-episode`). Unknown slugs return 404 because the route uses `dynamicParams = false` with `generateStaticParams`.

5. **Build & deploy**. The page is statically generated at build time. Verify:
   ```bash
   npm run build
   ```
   You should see `/your-slug` listed under the `●` (SSG) section.

### What's templated vs. variable

**Variable per show:** slug, host first name, show name, episode title, setup paragraph, audio files, "what changed" bullets, (optional) thumbnail, (optional) show description.

**Templated:** headline structure, the trailing "Hit play and toggle…" line, credentials block, mailto offer.

The page reuses `BeforeAfterPlayer` from `/podcasts`. Don't fork the player; if it needs a change, change it once and verify both pages still look right.

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Shadcn UI** - Component library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Design inspiration from [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) by codewithsadee.
