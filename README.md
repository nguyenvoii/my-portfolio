# Nguyễn Voi - Personal Portfolio Website

A personal portfolio website for Nguyễn Voi (Nguyễn Anh Phi), a guitarist and software developer. Built with React, TypeScript, Vite, and GSAP.

## 🎸 Concept

**Logic × Melody** - A portfolio that represents both technical skills and musical identity.

The website feels like a personal interactive world, not a corporate template. It features:
- Anime-inspired aesthetic with atmospheric blue skies and aurora effects
- Scroll-driven storytelling through different life aspects
- Interactive elements and smooth animations
- Focus on personality rather than buzzwords

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **3D**: Three.js (optional future enhancements)
- **Hosting**: GitHub Pages ready

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to GitHub Pages

1. Update `vite.config.ts` base path if needed:
```typescript
base: '/repository-name/', // For GitHub Pages under a subdirectory
// or
base: '/', // For custom domain or root GitHub Pages
```

2. Build the project:
```bash
npm run build
```

3. Deploy the `dist` folder to GitHub Pages using one of these methods:

### Method 1: GitHub CLI
```bash
gh-pages -d dist
```

### Method 2: Manual deployment
- Push the built files to the `gh-pages` branch
- Or use GitHub Actions for automatic deployment

### Method 3: GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 📁 Project Structure

```
portofil2.0/
├── public/
│   └── assets/
│       └── avatar.jpg
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── AuroraBackground.tsx
│   │   ├── BuildSection.tsx
│   │   ├── ConnectSection.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ExploreSection.tsx
│   │   ├── HeroSection.tsx
│   │   ├── MusicSection.tsx
│   │   ├── Navigation.tsx
│   │   └── ProjectsSection.tsx
│   ├── data/
│   │   ├── artists.ts
│   │   ├── content.ts
│   │   └── projects.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── animations.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Key Features

- **Cinematic Hero**: Animated entry with avatar, aurora, and snow effects
- **Scroll Storytelling**: Each section transitions smoothly as you scroll
- **Interactive Navigation**: Desktop floating nav with section indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Accessibility**: Reduced motion support, semantic HTML, keyboard navigation
- **Performance**: Optimized animations, lazy loading, efficient rendering

## 📝 Content Management

### Adding Projects
Edit `src/data/projects.ts`:
```typescript
{
  id: 'project-id',
  title: 'Project Name',
  description: 'What you built and learned',
  technologies: ['React', 'TypeScript'],
  status: 'completed', // or 'in-progress', 'learning'
  image: '/path/to/screenshot',
  github: 'https://github.com/nguyenvoi/project',
  demo: 'https://demo-url',
  featured: true,
}
```

### Updating Skills
Edit `src/data/content.ts` in the `skills` array.

### Adding Music
Update `src/data/artists.ts` for new artists/bands you listen to.

### Social Links
Update `socialLinks` array in `src/data/content.ts`.

## 🎵 Audio Setup

The music player architecture is in place. To add actual audio:

1. Place your audio file in `public/assets/music/`
2. Update the `featuredTrack` in `src/data/content.ts`:
```typescript
export const featuredTrack = {
  title: 'unlasting',
  artist: 'LiSA',
  audioSrc: '/assets/music/unlasting.mp3', // Add your file
};
```

3. The player will automatically use the audio file when available.

## ⚡ Performance Features

- **Code Splitting**: React vendor, animation vendor, and main app split into separate chunks
- **Lazy Loading**: Components load as needed
- **Optimized Animations**: GPU-accelerated transforms and opacity
- **Reduced Motion**: Respects user preferences for accessibility
- **Mobile Optimized**: Simplified effects on smaller devices

## 🎯 Future Enhancements

Possible additions:
- Actual audio playback in music player
- More 3D elements with Three.js
- Advanced music visualization
- Blog/writing section
- Guitar practice tracker
- SAO-inspired interactive elements

## 📱 Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile

## 🤝 Contributing

This is a personal portfolio, but suggestions and improvements are welcome!

## 📄 License

Personal portfolio website - Nguyễn Voi © 2025

---

**Built with logic & melody** ⚡🎸
