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
