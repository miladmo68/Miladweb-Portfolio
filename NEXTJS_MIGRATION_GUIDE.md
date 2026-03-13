# Next.js Migration Guide

## 🚀 Your Portfolio is Now Next.js Ready!

### What's Been Done:

✅ Converted to Next.js 15 with App Router
✅ Added comprehensive SEO metadata
✅ Optimized images with Next.js Image component
✅ Made hero section fully responsive (mobile, tablet, laptop, desktop)
✅ Added scroll animations to all sections
✅ Created API route for contact form
✅ Improved performance with dynamic imports
✅ Added proper semantic HTML for better SEO

### File Structure:

```
portfolio-nextjs/
├── app/
│   ├── layout.jsx          # Root layout with SEO metadata
│   ├── page.jsx            # Home page
│   ├── globals.scss        # Global styles
│   └── api/
│       └── contact/
│           └── route.js    # Contact form API
├── components/
│   ├── Main.jsx            # Hero section (fully responsive)
│   ├── About.jsx           # About section with animations
│   ├── Skills.jsx          # Skills section
│   ├── Project.jsx         # Projects portfolio
│   ├── Services.jsx        # Services timeline
│   ├── Contact.jsx         # Contact form
│   ├── Navigation.jsx      # Navigation bar
│   └── Footer.jsx          # Footer
├── styles/
│   ├── Main.scss           # Hero section styles
│   ├── Contact.scss        # Contact form styles
│   ├── Project.scss        # Projects styles
│   ├── Timeline.scss       # Services timeline styles
│   └── Footer.scss         # Footer styles
├── public/
│   ├── favicon.png
│   ├── milad.png
│   ├── bg-dark.png
│   ├── bg-light.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── [all project images]
├── next.config.mjs
├── package-nextjs.json
└── tailwind.config.js
```

### Installation Steps:

1. **Backup your current project** (just in case)

2. **Rename package.json and use the new one:**

   ```bash
   mv package.json package-vite-backup.json
   mv package-nextjs.json package.json
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Copy all files from `public/` folder** (images, favicons, etc.)
   - Make sure all your project images are in the `public/` folder

5. **Set up environment variables** (create `.env.local`):

   ```env
   # Email configuration (for contact form)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=recipient@email.com
   ```

6. **Run development server:**

   ```bash
   npm run dev
   ```

7. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### Responsive Breakpoints:

- **Mobile Small**: 320px - 480px
- **Mobile Medium**: 481px - 767px
- **Tablet**: 768px - 1024px
- **Laptop**: 1025px - 1440px
- **Desktop**: 1441px+

### SEO Improvements:

1. **Metadata**: Comprehensive title, description, keywords
2. **Open Graph**: Social media sharing optimization
3. **Twitter Cards**: Twitter sharing optimization
4. **Semantic HTML**: Proper heading hierarchy
5. **Alt Text**: All images have descriptive alt text
6. **Structured Data**: Ready for schema.org markup
7. **Sitemap**: Already in public folder
8. **Robots.txt**: Already configured

### Performance Optimizations:

1. **Image Optimization**: Using Next.js Image component
2. **Code Splitting**: Dynamic imports for heavy components
3. **Lazy Loading**: Projects section loads on demand
4. **Scroll Animations**: Intersection Observer for smooth animations
5. **Font Optimization**: Google Fonts with Next.js font loader

### What's Different from Vite:

1. **No more `index.html`** - Next.js handles this
2. **`app/` directory** instead of `src/`
3. **API routes** built-in (no need for separate backend)
4. **Automatic routing** based on file structure
5. **Better SEO** out of the box
6. **Image optimization** automatic
7. **Font optimization** automatic

### Testing Checklist:

- [ ] Hero section responsive on all devices
- [ ] Navigation works on mobile/desktop
- [ ] All sections animate on scroll
- [ ] Contact form submits successfully
- [ ] Projects filter works
- [ ] Theme toggle (dark/light mode) works
- [ ] All images load properly
- [ ] Social media links work
- [ ] Smooth scrolling between sections

### Deployment:

**Vercel (Recommended):**

```bash
npm install -g vercel
vercel
```

**Netlify:**

```bash
npm run build
# Upload .next folder
```

### Need Help?

- Check Next.js docs: https://nextjs.org/docs
- Vercel deployment: https://vercel.com/docs
- Contact form not working? Check `.env.local` file

### Notes:

- All animations are optimized for performance
- Hero section uses `clamp()` for fluid typography
- Images use Next.js Image for automatic optimization
- Contact form uses server-side API route (more secure)
- All components are client-side rendered where needed ("use client")
