# Personal Portfolio with Heavy Animations

Modern portfolio website built with Next.js, Tailwind CSS, and GSAP ScrollTrigger for immersive scroll-driven animations.

## Features

- **Hero Section**: Multiple scroll triggers with parallax backgrounds, text morphing effects, and shape animations
- **Skills Section**: Horizontal scroll showcase with staggered card reveals and animated progress bars
- **Projects Gallery**: Parallax image effects, scroll-triggered reveals, and hover-like scaling animations
- **Contact Form**: Micro-animations on inputs, pulse effects, and smooth form reveals
- **Tech Stack**: Next.js 16, TypeScript, Tailwind CSS, GSAP ScrollTrigger

## Getting Started Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploying to GitHub Pages

### Step 1: Create GitHub Repository

```bash
cd C:\Voi\vibecode\webgioithieubanthan

# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Portfolio with GSAP animations"
```

### Step 2: Create Repository on GitHub

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `portfolio` or `username.github.io`)
3. Don't initialize with README (we already have one)

### Step 3: Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. The workflow file in `.github/workflows/deploy.yml` will automatically deploy

### Step 5: Verify Deployment

1. Go to **Actions** tab to see deployment progress
2. Once complete, your site will be at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Customization

### Update Personal Info

Edit `app/page.tsx`:
- Replace "Developer Portfolio" with your name/title
- Update skills in the skills array
- Add your actual projects
- Update contact form action

### Adjust Animations

GSAP animations are in the `useEffect` hook in `app/page.tsx`. Key parameters:
- `duration`: Animation length in seconds
- `scrollTrigger.start/end`: When animations trigger
- `scrub`: Smoothness of scroll-linked animations
- `stagger`: Delay between element animations

### Modify Colors

Tailwind classes control colors:
- Background: `bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900`
- Text: `text-white`, `text-purple-400`
- Borders: `border-purple-500/20`

## Animation Techniques Used

1. **Scroll-Driven Storytelling**: Each section has multiple scroll triggers
2. **Parallax Effects**: Backgrounds and images move at different speeds
3. **Staggered Reveals**: Elements animate in sequence
4. **Horizontal Scroll**: Skills section scrolls horizontally
5. **Morphing Shapes**: Hero section shapes transform on scroll
6. **Micro-Interactions**: Form inputs and buttons have subtle animations

## Tech Stack Details

- **Next.js**: React framework with static export for GitHub Pages
- **GSAP ScrollTrigger**: Industry-standard scroll animation library
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## Resources & References

**GSAP Inspiration:**
- [GSAP Showcase](https://gsap.com/showcase/) - Award-winning examples
- [60+ ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/) - Code examples
- [GSAP Vault](https://gsapvault.com/blog/gsap-animation-examples) - Production-ready animations

**Portfolio Examples:**
- [21 Developer Portfolios](https://colorlib.com/wp/developer-portfolios/) - Real examples
- [Awwwards Portfolios](https://www.awwwards.com/websites/portfolio/) - Award-winning designs
- [Lee Robinson](https://leerob.io/) - Dark mode developer aesthetic
- [Bruno Simon](https://www.bruno-simon.com/) - 3D/WebGL inspiration

## Troubleshooting

**Build Errors:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**GitHub Pages Not Updating:**
- Check Actions tab for workflow errors
- Ensure GitHub Actions is selected in Pages settings (not branch deploy)
- Wait 1-2 minutes for deployment to complete

**ScrollTrigger Not Working:**
- Ensure `gsap.registerPlugin(ScrollTrigger)` is called
- Check browser console for errors
- Verify sections have enough height for scroll triggers

## License

MIT