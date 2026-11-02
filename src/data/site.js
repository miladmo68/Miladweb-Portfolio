/* Single source of truth for the portfolio content.
   Keep it in sync with the resume and the live projects. */

export const CONTACT = {
  email: "info@miladweb.com",
  phone: "+1 (437) 600-3139",
  phoneTel: "+14376003139",
  whatsapp: "https://wa.me/14376003139",
  location: "Toronto, Ontario, Canada",
  github: "https://github.com/miladmo68",
  linkedin: "https://www.linkedin.com/in/miladmo68/",
};

/* Client websites shown in the marquee (all built and shipped) */
export const CLIENTS = [
  "Fair Construction",
  "Zarsa Gold",
  "Kind Steps",
  "Intershine",
  "PEG Studio",
  "Sky Contracting",
  "Tarahan Choob",
  "Techfahm Systems",
];

export const STATS = [
  { value: "5+", label: "Years building for the web" },
  { value: "75+", label: "Projects shipped" },
  { value: "8", label: "Client websites live" },
];

export const PILLARS = [
  {
    title: "Product-grade frontends",
    text: "Dashboards, portals and web apps in React, Next.js and TypeScript, built from reusable, accessible components.",
  },
  {
    title: "Full-stack when it matters",
    text: "REST and GraphQL APIs with Node.js and Express, backed by MongoDB or PostgreSQL.",
  },
  {
    title: "Fast by default",
    text: "Core Web Vitals, lazy loading, smart caching and SEO baked in from the first commit.",
  },
  {
    title: "Shipped and maintained",
    text: "CI/CD on Vercel and AWS, tested with Jest and React Testing Library.",
  },
];

/* Featured case studies — strongest first.
   shots: full-page captures in src/assets/img/featured. The -sm files (760px /
   240px wide) scroll inside the preview frames; the large ones (1100px / 360px)
   load only in the full-screen viewer. */
export const FEATURED = [
  {
    title: "Northstar Ops",
    shots: {
      desktop: "northstar-desktop.jpg",
      mobile: "northstar-mobile.jpg",
      desktopSm: "northstar-desktop-sm.jpg",
      mobileSm: "northstar-mobile-sm.jpg",
    },
    kind: "Web App · Dashboard",
    img: "northstar-ops-dashboard.png",
    summary:
      "A fleet-intelligence dashboard that gives an operations team one screen for vehicles, routes, alerts and delivery performance.",
    points: [
      "KPI cards, utilization chart and live alerts feed",
      "Active-fleet table with driver, route, ETA and vehicle health",
      "Static Next.js export deployed automatically to GitHub Pages",
    ],
    tech: ["Next.js", "TypeScript", "React"],
    live: "https://miladmo68.github.io/northstar-ops-dashboard/",
    github: "https://github.com/miladmo68/northstar-ops-dashboard",
  },
  {
    title: "JobBuddy AI",
    shots: {
      desktop: "jobbuddy-desktop.jpg",
      mobile: "jobbuddy-mobile.jpg",
      desktopSm: "jobbuddy-desktop-sm.jpg",
      mobileSm: "jobbuddy-mobile-sm.jpg",
    },
    kind: "SaaS · AI",
    img: "job-apply-ai.png",
    summary:
      "A SaaS product that matches people with jobs and helps them apply with AI, from resume to application tracking.",
    points: [
      "AI job matching and application drafting with Google Gemini",
      "Dashboard for jobs, applications, saved jobs and resume",
      "Supabase auth and data, Stripe subscriptions and billing",
    ],
    tech: ["Next.js", "TypeScript", "Supabase", "Stripe", "Gemini"],
    live: "https://job-apply-ai-three.vercel.app/",
    github: "https://github.com/miladmo68/Job-Apply-AI",
  },
  {
    title: "MiLink",
    shots: {
      desktop: "milink-desktop.jpg",
      mobile: "milink-mobile.jpg",
      desktopSm: "milink-desktop-sm.jpg",
      mobileSm: "milink-mobile-sm.jpg",
    },
    kind: "Agency Platform",
    img: "Milink.png",
    summary:
      "The production platform for my Toronto web studio: marketing site, pricing and a client portal with billing.",
    points: [
      "Client and admin portals with Supabase authentication",
      "Stripe billing, push notifications and file delivery",
      "Animated, SEO-ready marketing pages for a local business",
    ],
    tech: ["Next.js", "Tailwind", "Supabase", "Stripe"],
    live: "https://milink.ca/",
    github: "https://github.com/miladmo68/milink-pro",
  },
  {
    title: "MapleGuard Insurance",
    shots: {
      desktop: "mapleguard-desktop.jpg",
      mobile: "mapleguard-mobile.jpg",
      desktopSm: "mapleguard-desktop-sm.jpg",
      mobileSm: "mapleguard-mobile-sm.jpg",
    },
    kind: "Website · Quote Flow",
    img: "mapleguard-insurance.png",
    summary:
      "An accessible insurance website for a Canadian provider, with product pages and a multi-step quote flow.",
    points: [
      "Multi-step quote form with React Hook Form and Zod validation",
      "Products, claims, agents, locations, careers and FAQ pages",
      "Structured data for SEO and a static export to GitHub Pages",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind", "Zod"],
    live: "https://miladmo68.github.io/MapleGuard-Insurance/",
    github: "https://github.com/miladmo68/MapleGuard-Insurance",
  },
  {
    title: "Kind Steps ABA",
    shots: {
      desktop: "kindsteps-desktop.jpg",
      mobile: "kindsteps-mobile.jpg",
      desktopSm: "kindsteps-desktop-sm.jpg",
      mobileSm: "kindsteps-mobile-sm.jpg",
    },
    kind: "Client Website",
    img: "kindsteps.png",
    summary:
      "A calm, bilingual website for an ABA therapy provider supporting neurodiverse children, teens and young adults across the GTA.",
    points: [
      "English and Persian versions of every page",
      "Free-consultation flow with a serverless contact form",
      "Accessible, warm visual design built for parents",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js"],
    live: "https://kindsteps.ca/",
    github: "https://github.com/miladmo68/Kind-Steps-",
  },
];

/* Skills — focused on the current stack */
export const STACK = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
  },
  {
    title: "UI & Motion",
    items: ["Tailwind CSS", "shadcn/ui", "Material UI", "Framer Motion", "Sass", "Responsive Design"],
  },
  {
    title: "State & Data",
    items: ["React Query", "Redux Toolkit", "Context API", "REST APIs", "GraphQL"],
  },
  {
    title: "Backend & Databases",
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "Testing & Delivery",
    items: ["Jest", "React Testing Library", "Git & GitHub", "Vercel", "AWS Amplify & S3", "Vite"],
  },
];

export const SERVICES = [
  {
    title: "Web Apps & Dashboards",
    text: "Data-rich dashboards, portals and SaaS products with React, Next.js and TypeScript.",
  },
  {
    title: "Business Websites",
    text: "Fast, modern websites that turn visitors into customers, built to rank on Google.",
  },
  {
    title: "E-commerce",
    text: "Online stores and product catalogs with smooth checkout and clean product pages.",
  },
  {
    title: "UI Engineering",
    text: "Pixel-accurate, accessible interfaces and reusable component systems from your designs.",
  },
  {
    title: "Performance & SEO",
    text: "Core Web Vitals, structured data and technical SEO that move real numbers.",
  },
  {
    title: "Care & Support",
    text: "Updates, monitoring and improvements so your site stays secure and up to date.",
  },
];

/* Client words — quoted verbatim from milink.ca/testimonials (MiLink is my web studio) */
export const TESTIMONIALS = [
  {
    quote:
      "We needed a website that looked as professional as the work we do, and Milink nailed it. They took our ideas and turned them into something modern, clean, and impressive. The attention to detail was excellent, and we're genuinely proud to share our new website.",
    name: "Fair Construction",
    role: "Construction & Building",
  },
  {
    quote:
      "What we loved most about working with Milink was how much care they put into the little details. They created a warm, welcoming website that truly reflects who we are and what we do. It's beautiful, easy to use, and exactly what we had envisioned.",
    name: "Kind Steps",
    role: "Therapy & Behavioral Services",
  },
  {
    quote:
      "Milink brought our vision to life in such a beautiful way. We wanted an elegant online store that would really let our jewelry shine, and that's exactly what they created. From the overall design to the smallest details, everything feels premium and thoughtfully crafted.",
    name: "Zarsa Gold",
    role: "Jewelry & E-Commerce",
  },
  {
    quote:
      "We wanted something fresh, modern, and easy for our customers to use, and Milink absolutely delivered. They made the whole process feel simple and understood our vision perfectly. The finished website looks fantastic and represents our brand beautifully.",
    name: "Intershine",
    role: "Professional Cleaning Services",
  },
  {
    quote:
      "Milink understood exactly what we wanted from day one. They gave our business a clean, professional website that really reflects the quality of our work. Everything feels polished, easy to navigate, and thoughtfully put together. We couldn't be happier with the result.",
    name: "Sky Contracting Inc.",
    role: "Renovation & Contracting",
  },
  {
    quote:
      "Our work is all about design, craftsmanship, and the details that make a difference. Milink understood that right away. They built a beautiful, minimal website that lets our projects speak for themselves. The final result feels elegant, modern, and very true to our brand.",
    name: "Tarahan Choob",
    role: "Cabinetry & Interior Design",
  },
  {
    quote:
      "Working with Milink was a great experience from start to finish. They really understood our creative direction and turned it into a website that feels modern, refined, and full of personality. Every detail was carefully considered, and the result exceeded our expectations.",
    name: "PEG Studio",
    role: "Custom Furniture & Interior Design",
  },
];
