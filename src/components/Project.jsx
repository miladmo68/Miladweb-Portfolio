import { useState, useEffect, useRef } from "react";
import { Box, Grid, Card, Chip, Dialog, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/styles/ProjectCards.scss";

import { getImg } from "../utils/images";

/* 2 ▸ filter buttons */
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web App", value: "app" },
  { label: "Web Design", value: "web" },
];

/* 3 ▸ FULL PROJECT ARRAY — best first inside each category.
   live / github are optional: buttons only render when the link exists. */
const PROJECTS = [
  /* ── Web App ── */
  {
    title: "MiLink Analytics",
    img: "analytics-dashboard.png",
    cat: "app",
    live: "https://analytics-dashboard-seven-snowy.vercel.app/",
    github: "https://github.com/miladmo68/Analytics-Dashboard",
    tech: ["React", "TypeScript", "Tailwind", "Gemini"],
  },
  {
    title: "Contact Manager",
    img: "Contact-Manager.png",
    cat: "app",
    live: "https://contact-manager-coral-one.vercel.app/",
    github: "https://github.com/miladmo68/Contact-Manager",
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "MiLink Wealth Dashboard",
    img: "milink-dashboard.png",
    cat: "app",
    live: "https://milink-dashboard.vercel.app/",
    github: "https://github.com/miladmo68/Milink-Dashboard",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Full-stack Employment",
    img: "fullstack-employment.png",
    cat: "app",
    github: "https://github.com/miladmo68/Fullstack-Employment",
    tech: ["React", "Spring Boot", "Java"],
  },
  {
    title: "E-commerce Store",
    img: "E-commerce-Store.png",
    cat: "app",
    live: "https://miladmo68.github.io/E-commerce-Store/",
    github: "https://github.com/miladmo68/E-commerce-Store",
    tech: ["React", "React Router", "Tailwind"],
  },
  {
    title: "ShopEase",
    img: "ShopEase.png",
    cat: "app",
    live: "https://miladmo68.github.io/ShopEase/",
    github: "https://github.com/miladmo68/ShopEase",
    tech: ["React", "React Router", "Tailwind"],
  },
  {
    title: "Fast Pizza",
    img: "fast-pizza.png",
    cat: "app",
    live: "https://miladmo68.github.io/fast-pizza/",
    github: "https://github.com/miladmo68/fast-pizza",
    tech: ["React", "Redux Toolkit", "React Router"],
  },
  {
    title: "Millionaire Quiz",
    img: "Millionaire-Quiz.png",
    cat: "app",
    live: "https://miladmo68.github.io/Millionaire-Quiz/",
    github: "https://github.com/miladmo68/Millionaire-Quiz",
    tech: ["React"],
  },
  {
    title: "Contact API App",
    img: "Contact-API-App.png",
    cat: "app",
    github: "https://github.com/miladmo68/Contact-API-App",
    tech: ["React", "Spring Boot", "REST API"],
  },
  {
    title: "Shopping Cart",
    img: "SHOPPING-CART.png",
    cat: "app",
    live: "https://miladmo68.github.io/Shopping-Cart/",
    github: "https://github.com/miladmo68/Shopping-Cart",
    tech: ["React", "Redux Toolkit", "Tailwind"],
  },
  {
    title: "Expense Tracker",
    img: "Expense-Tracker.png",
    cat: "app",
    live: "https://miladmo68.github.io/Expense-Tracker/",
    github: "https://github.com/miladmo68/Expense-Tracker",
    tech: ["React", "Chakra UI", "ApexCharts"],
  },
  {
    title: "Bank App",
    img: "Bank-App.png",
    cat: "app",
    live: "https://miladmo68.github.io/Bank-App/",
    github: "https://github.com/miladmo68/Bank-App",
    tech: ["React", "Redux", "Redux Thunk"],
  },
  {
    title: "Google Login Registration",
    img: "Google-Login-Registration.png",
    cat: "app",
    github: "https://github.com/miladmo68/Google-Login-Registration",
    tech: ["React", "Spring Boot", "OAuth"],
  },
  {
    title: "Usepopcorn",
    img: "usepopcorn.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/usepopcorn/",
    github: "https://github.com/miladmo68/usepopcorn",
    tech: ["React", "REST API"],
  },
  {
    title: "Book Library",
    img: "Book-Library.png",
    cat: "app",
    live: "https://miladmo68.github.io/Book-Library/",
    github: "https://github.com/miladmo68/Book-Library",
    tech: ["React", "React Router", "Tailwind"],
  },
  {
    title: "Countries Info App",
    img: "COUNTRIES-INFO-APP.png",
    cat: "app",
    live: "https://miladmo68.github.io/Countries-Info-App/",
    github: "https://github.com/miladmo68/Countries-Info-App",
    tech: ["React", "React Router", "Tailwind"],
  },
  {
    title: "Todos Redux Toolkit",
    img: "Todos-Redux-Toolkit.png",
    cat: "app",
    live: "https://miladmo68.github.io/Todos-Redux-Toolkit/",
    github: "https://github.com/miladmo68/Todos-Redux-Toolkit",
    tech: ["React", "Redux Toolkit", "Tailwind"],
  },
  {
    title: "Quick Notes",
    img: "Quick-Notes.png",
    cat: "app",
    live: "https://miladmo68.github.io/QuickNotes/",
    github: "https://github.com/miladmo68/QuickNotes",
    tech: ["React", "Redux Toolkit", "Tailwind"],
  },
  {
    title: "User Directory",
    img: "MY-USER-DIRECTORY.png",
    cat: "app",
    live: "https://miladmo68.github.io/User-Directory/",
    github: "https://github.com/miladmo68/User-Directory",
    tech: ["React", "Axios", "Tailwind"],
  },
  {
    title: "Student System",
    img: "student-system.png",
    cat: "app",
    github: "https://github.com/miladmo68/student-system",
    tech: ["Java", "JavaScript"],
  },
  {
    title: "Upload Image ▶ GDrive",
    img: "uploadImageToGoogleDrive.png",
    cat: "app",
    github: "https://github.com/miladmo68/upload-Image-To-Google-Drive",
    tech: ["Java", "Google Drive API"],
  },
  {
    title: "Task Manager",
    img: "Task-Manager.png",
    cat: "app",
    live: "https://miladmo68.github.io/Task-Manager/",
    github: "https://github.com/miladmo68/Task-Manager",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Food Recipe App",
    img: "Food-Recipe-App.png",
    cat: "app",
    live: "https://miladmo68.github.io/Food-Recipe-App/",
    github: "https://github.com/miladmo68/Food-Recipe-App",
    tech: ["React", "React Router", "Tailwind"],
  },
  {
    title: "Quiz App",
    img: "Quiz-App.png",
    cat: "app",
    live: "https://miladmo68.github.io/react-quiz/",
    github: "https://github.com/miladmo68/react-quiz",
    tech: ["React", "JSON Server"],
  },
  {
    title: "Pokedex",
    img: "Pokedex.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/Pokedex/",
    github: "https://github.com/miladmo68/Pokedex",
    tech: ["React", "Axios", "Styled Components"],
  },
  {
    title: "SpaceX",
    img: "SpaceX.jpg",
    cat: "app",
    github: "https://github.com/miladmo68/SpaceX",
    tech: ["React", "Axios", "Styled Components"],
  },
  {
    title: "Note App",
    img: "NoteApp.png",
    cat: "app",
    live: "https://miladmo68.github.io/Note-App/",
    github: "https://github.com/miladmo68/Note-App",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Expenses",
    img: "expenses.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/expenses/",
    github: "https://github.com/miladmo68/expenses",
    tech: ["React"],
  },
  {
    title: "Gym App",
    img: "gym-app.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/Gym-App/",
    github: "https://github.com/miladmo68/Gym-App",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Movieland",
    img: "Movieland.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/Movieland/",
    github: "https://github.com/miladmo68/Movieland",
    tech: ["React", "REST API"],
  },
  {
    title: "Classy Weather",
    img: "classy-weather.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/classy-weather/",
    github: "https://github.com/miladmo68/classy-weather",
    tech: ["React", "REST API"],
  },
  {
    title: "Chat App",
    img: "Chat-App.jpg",
    cat: "app",
    github: "https://github.com/miladmo68/Chat-App",
    tech: ["Node.js", "JavaScript"],
  },
  {
    title: "Project Management",
    img: "Project-Management.png",
    cat: "app",
    live: "https://miladmo68.github.io/Project-Management/",
    github: "https://github.com/miladmo68/Project-Management",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Image Gallery",
    img: "Image-Gallery.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/Image-Gallery/",
    github: "https://github.com/miladmo68/Image-Gallery",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Atomic Blog",
    img: "Atomic-blog.jpg",
    cat: "app",
    live: "https://miladmo68.github.io/Atomic-blog/",
    github: "https://github.com/miladmo68/Atomic-blog",
    tech: ["React"],
  },
  {
    title: "Travel List",
    img: "travel-list.png",
    cat: "app",
    live: "https://miladmo68.github.io/travel-list/",
    github: "https://github.com/miladmo68/travel-list",
    tech: ["React"],
  },
  {
    title: "Investment Calculator",
    img: "Investment-Calculator.png",
    cat: "app",
    live: "https://miladmo68.github.io/Investment-Calculator/",
    github: "https://github.com/miladmo68/Investment-Calculator",
    tech: ["React"],
  },
  {
    title: "Eat & Split",
    img: "eat-n-split.png",
    cat: "app",
    live: "https://miladmo68.github.io/eat-n-split/",
    github: "https://github.com/miladmo68/eat-n-split",
    tech: ["React"],
  },
  {
    title: "Workout Timer",
    img: "workout-timer.png",
    cat: "app",
    live: "https://miladmo68.github.io/workout-timer/",
    github: "https://github.com/miladmo68/workout-timer",
    tech: ["React"],
  },
  {
    title: "PlacePicker",
    img: "Place-Picker.png",
    cat: "app",
    live: "https://miladmo68.github.io/Place-Picker/",
    github: "https://github.com/miladmo68/Place-Picker",
    tech: ["React"],
  },
  {
    title: "Countdown App",
    img: "Countdown.png",
    cat: "app",
    live: "https://miladmo68.github.io/Countdown/",
    github: "https://github.com/miladmo68/Countdown",
    tech: ["React"],
  },
  {
    title: "Tic-Tac-Toe",
    img: "tic-tac-toe.png",
    cat: "app",
    live: "https://miladmo68.github.io/tic-tac-toe/",
    github: "https://github.com/miladmo68/tic-tac-toe",
    tech: ["React"],
  },

  /* ── Web Design ── */
  {
    title: "Zarsa Gold2",
    img: "zarsagold2.png",
    cat: "web",
    live: "https://zarsa2.vercel.app/",
    github: "https://github.com/miladmo68/zarsa2",
    tech: ["HTML", "JavaScript", "Vercel"],
  },
  {
    title: "Fair Construction",
    img: "fairconstruction.png",
    cat: "web",
    live: "https://fairconstruction-ca.vercel.app/",
    github: "https://github.com/miladmo68/fairconstruction.ca",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Intershine",
    img: "intershine.png",
    cat: "web",
    live: "https://intershine-ca.vercel.app/",
    github: "https://github.com/miladmo68/intershine.ca",
    tech: ["HTML", "Node.js", "Express"],
  },
  {
    title: "Sky Contracting",
    img: "sky.jpg",
    cat: "web",
    live: "https://skyinc.ca/",
  },
  {
    title: "Techfahm Systems",
    img: "Techfahm.jpg",
    cat: "web",
    live: "https://Techfahm.com/",
  },
  {
    title: "Woodline",
    img: "tarahanchoob.png",
    cat: "web",
    live: "https://woodline-ir.vercel.app/",
    github: "https://github.com/miladmo68/woodline.ir",
    tech: ["HTML", "Node.js", "Express"],
  },
  {
    title: "PEG Studio",
    img: "pegstudio.png",
    cat: "web",
    live: "https://peg-studio-ten.vercel.app/",
    github: "https://github.com/miladmo68/PegStudio",
    tech: ["HTML", "SCSS", "JavaScript"],
  },
  {
    title: "Milad Web",
    img: "miladweb2.png",
    cat: "web",
    live: "https://miladmo68.github.io/Portfolio/",
    github: "https://github.com/miladmo68/Portfolio",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Zarsa Gold",
    img: "zarsagold.jpg",
    cat: "web",
    live: "https://miladmo68.github.io/zarsa1/",
    github: "https://github.com/miladmo68/zarsa1",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Spa",
    img: "Spa.jpg",
    cat: "web",
    tech: ["HTML", "CSS", "JavaScript"],
  },

  /* ── Earlier web design work (screenshots only) ── */
  {
    title: "Tarahan Choob",
    img: "tarahanchoob.jpg",
    cat: "web",
  },
  {
    title: "Jahan Ariya",
    img: "jahanariya.jpg",
    cat: "web",
  },
  {
    title: "Asiakar Auto",
    img: "asiakar.png",
    cat: "web",
  },
  {
    title: "Javan Food",
    img: "javanfood.png",
    cat: "web",
  },
  {
    title: "Samanor",
    img: "samanor.jpg",
    cat: "web",
  },
  {
    title: "Poya Josh",
    img: "poyajosh.jpg",
    cat: "web",
  },
  {
    title: "RAAGS",
    img: "RAAGS.jpg",
    cat: "web",
  },
  {
    title: "Hefaz System",
    img: "hefazsystem.jpg",
    cat: "web",
  },
  {
    title: "Iran Golden",
    img: "irangolden.jpg",
    cat: "web",
  },
  {
    title: "Auto Studio",
    img: "carstudio.jpg",
    cat: "web",
  },
  {
    title: "Octove Agency",
    img: "octove.jpg",
    cat: "web",
  },
  {
    title: "Bakirkoy Zeugma",
    img: "bakirkoyzeugmaapart.jpg",
    cat: "web",
  },
  {
    title: "Net Lady",
    img: "netlady.jpg",
    cat: "web",
  },
  {
    title: "Ide System",
    img: "idesystem.jpg",
    cat: "web",
  },
  {
    title: "Tasvir Bartar",
    img: "tasvirbartar.jpg",
    cat: "web",
  },
  {
    title: "MDF 14",
    img: "mdf14.jpg",
    cat: "web",
  },
  {
    title: "Insurance Darmani",
    img: "insurance-darmani.jpg",
    cat: "web",
  },
  {
    title: "Metal Works",
    img: "metal.jpg",
    cat: "web",
  },
  {
    title: "Sidhu Clinic",
    img: "Sidhu-Clinic.jpg",
    cat: "web",
  },
];

/* "All" view: alternate Web App / Web Design, keeping each list's own order */
const interleave = (list) => {
  const apps = list.filter((p) => p.cat === "app");
  const webs = list.filter((p) => p.cat === "web");
  const out = [];
  for (let i = 0; i < Math.max(apps.length, webs.length); i++) {
    if (i < apps.length) out.push(apps[i]);
    if (i < webs.length) out.push(webs[i]);
  }
  return out;
};
const ALL_PROJECTS = interleave(PROJECTS);

const CARD_W = 380;

/* how many projects to show before "Show More" — same behaviour on every screen */
const PAGE_MOBILE = 6;
const PAGE_DESKTOP = 9;

const CAT_LABEL = { app: "Web App", web: "Web Design" };

/* Live / Code links — rendered only when the project actually has them */
function ProjectLinks({ project, size = "sm" }) {
  return (
    <>
      {project.live && (
        <a
          className={`pc-btn pc-btn--primary pc-btn--${size}`}
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live site`}
        >
          <LaunchIcon fontSize="inherit" />
          Live
        </a>
      )}
      {project.github && (
        <a
          className={`pc-btn pc-btn--ghost pc-btn--${size}`}
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
        >
          <GitHubIcon fontSize="inherit" />
          Code
        </a>
      )}
    </>
  );
}

export default function Project() {
  const [filter, setFilter] = useState("all");
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef({});
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [limit, setLimit] = useState(PAGE_DESKTOP);
  const [loadingMore, setLoadingMore] = useState(false);
  const [active, setActive] = useState(null);

  const step = isMobile ? PAGE_MOBILE : PAGE_DESKTOP;

  /* detect mobile and keep the initial page size in sync with the breakpoint */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 599px)");
    const apply = (matches) => {
      setIsMobile(matches);
      setLimit(matches ? PAGE_MOBILE : PAGE_DESKTOP);
    };
    apply(mq.matches);
    const handler = (e) => apply(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const allFiltered =
    filter === "all" ? ALL_PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  /* show a few first on every screen, reveal the rest with the button */
  const visible = allFiltered.slice(0, limit);
  const hasMore = limit < allFiltered.length;

  /* reset animation set when filter changes */
  const handleFilter = (val) => {
    setFilter(val);
    setVisibleCards(new Set());
    cardRefs.current = {};
    setLimit(step);
  };

  const handleShowMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLimit((prev) => prev + step);
      setLoadingMore(false);
    }, 300);
  };

  /* section fade-in — same scroll entrance as the other sections */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-in");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* card entrance animation via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-card-id");
            if (id) setVisibleCards((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10px 0px" },
    );

    const t = setTimeout(() => {
      Object.values(cardRefs.current).forEach((el) => {
        if (el) observer.observe(el);
      });
    }, 30);

    return () => {
      clearTimeout(t);
      observer.disconnect();
    };
  }, [filter, limit]);

  return (
    <div className="container">
      <Box
        ref={sectionRef}
        component="section"
        id="projects"
        className="fade-in-section"
        aria-labelledby="projects-heading"
        sx={{ py: { xs: 4, sm: 6, md: 8 } }}
      >
        {/* heading */}
        <header className="s-head s-head--left s-container s-projects-head">
          <p className="s-eyebrow is-in">
            <span className="s-eyebrow-dot" aria-hidden="true" />
            Archive
          </p>
          <h2 id="projects-heading" className="s-title is-in">
            More projects
          </h2>
          <p className="s-lead is-in">
            Web apps, experiments and client websites — filter by type. More on{" "}
            <a href="https://github.com/miladmo68" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            .
          </p>
        </header>

        {/* filter chips */}
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
          mb={{ xs: 3, sm: 4, md: 5 }}
          px={2}
          role="group"
          aria-label="Filter projects"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <Chip
                key={f.value}
                label={f.label}
                clickable
                aria-pressed={isActive}
                onClick={() => handleFilter(f.value)}
                className={`project-filter${isActive ? " is-active" : ""}`}
              />
            );
          })}
        </Box>

        {/* project grid */}
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
          sx={{ px: { xs: 1, sm: 2 } }}
        >
          {visible.map((p, index) => {
            const isVisible = visibleCards.has(p.title);
            const delay = Math.min((index % step) * 0.055, 0.5);

            return (
              <Grid
                key={`${filter}-${p.title}`}
                ref={(el) => (cardRefs.current[p.title] = el)}
                data-card-id={p.title}
                sx={{
                  display: "flex",
                  opacity: 0,
                  transform: "translateY(28px)",
                  animation: isVisible
                    ? `cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s forwards`
                    : "none",
                  "@keyframes cardIn": {
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none !important",
                    opacity: "1 !important",
                    transform: "none !important",
                  },
                }}
              >
                <Card
                  component="article"
                  elevation={0}
                  className="project-card"
                  sx={{
                    width: { xs: "calc(100vw - 40px)", sm: 360, md: CARD_W },
                    maxWidth: CARD_W,
                  }}
                >
                  {/* thumbnail — opens the preview */}
                  <button
                    type="button"
                    className="pc-thumb"
                    onClick={() => setActive(p)}
                    aria-label={`Preview ${p.title}`}
                  >
                    <img
                      src={getImg(p.img)}
                      alt={`${p.title} — ${CAT_LABEL[p.cat]} screenshot`}
                      loading="lazy"
                      decoding="async"
                      width="380"
                      height="214"
                    />
                    <span className="pc-thumb-hint" aria-hidden="true">
                      <VisibilityIcon fontSize="inherit" /> Preview
                    </span>
                  </button>

                  <div className="pc-body">
                    <div className="pc-head">
                      <h3 className="pc-title">{p.title}</h3>
                      <span className={`pc-cat pc-cat--${p.cat}`}>
                        {CAT_LABEL[p.cat]}
                      </span>
                    </div>

                    {p.tech?.length > 0 && (
                      <ul className="pc-tech" aria-label="Tech stack">
                        {p.tech.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}

                    <div className="pc-actions">
                      <button
                        type="button"
                        className="pc-btn pc-btn--ghost pc-btn--sm"
                        onClick={() => setActive(p)}
                      >
                        <VisibilityIcon fontSize="inherit" />
                        Preview
                      </button>
                      <ProjectLinks project={p} />
                    </div>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* show-more button */}
        {hasMore && (
          <Box display="flex" justifyContent="center" mt={5}>
            <button
              type="button"
              className="projects-more-btn"
              onClick={handleShowMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <span className="projects-more-spinner" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                <>Show More ({allFiltered.length - limit})</>
              )}
            </button>
          </Box>
        )}

        {/* preview dialog */}
        <Dialog
          open={Boolean(active)}
          onClose={() => setActive(null)}
          maxWidth="lg"
          fullWidth
          className="project-dialog"
          aria-labelledby="project-dialog-title"
          slotProps={{
            backdrop: { className: "project-dialog-backdrop" },
            paper: { className: "project-dialog-paper" },
          }}
        >
          {active && (
            <>
              <div className="pd-header">
                <div className="pd-heading">
                  <span className={`pc-cat pc-cat--${active.cat}`}>
                    {CAT_LABEL[active.cat]}
                  </span>
                  <h3 id="project-dialog-title" className="pd-title">
                    {active.title}
                  </h3>
                </div>
                <IconButton
                  onClick={() => setActive(null)}
                  aria-label="Close preview"
                  className="pd-close"
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <div className="pd-image">
                <img
                  src={getImg(active.img, "full")}
                  alt={`${active.title} preview`}
                />
              </div>

              {(active.live || active.github || active.tech?.length > 0) && (
                <div className="pd-footer">
                  {active.tech?.length > 0 && (
                    <ul className="pc-tech" aria-label="Tech stack">
                      {active.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  <div className="pd-actions">
                    <ProjectLinks project={active} size="lg" />
                  </div>
                </div>
              )}
            </>
          )}
        </Dialog>
      </Box>
    </div>
  );
}
