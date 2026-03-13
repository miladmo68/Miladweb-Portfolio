import { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";

/* 1 ▸ load every screenshot that lives in src/assets/img */
const images = import.meta.glob("../assets/img/*.{png,jpg,jpeg,gif}", {
  eager: true,
  import: "default",
});
const getImg = (file) => images[`../assets/img/${file}`];

/* 2 ▸ filter buttons */
const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web App", value: "app" },
  { label: "Web Design", value: "web" },
];

/* 3 ▸ FULL PROJECT ARRAY */
const PROJECTS = [
  { title: "Millionaire Quiz", img: "Millionaire-Quiz.png", link: "https://miladmo68.github.io/Millionaire-Quiz/", cat: "app" },
  { title: "Zarsa Gold2", img: "zarsagold2.png", link: "https://zarsa2.vercel.app/", cat: "web" },
  { title: "Kind Steps", img: "kindsteps.png", link: "https://kindsteps.ca/", cat: "web" },
  { title: "Tic-Tac-Toe", img: "tic-tac-toe.png", link: "https://miladmo68.github.io/tic-tac-toe/", cat: "app" },
  { title: "Intershine", img: "intershine.png", link: "https://intershine.ca/", cat: "web" },
  { title: "Expenses", img: "expenses.jpg", link: "https://miladmo68.github.io/expenses/", cat: "app" },
  { title: "Contact Manager", img: "Contact-Manager.png", link: "https://contact-manager-coral-one.vercel.app/", cat: "app" },
  { title: "Book Library", img: "Book-Library.png", link: "https://miladmo68.github.io/Book-Library/", cat: "app" },
  { title: "Milink", img: "Milink.png", link: "https://milink.ca/", cat: "web" },
  { title: "User Directory", img: "MY-USER-DIRECTORY.png", link: "https://miladmo68.github.io/User-Directory/", cat: "app" },
  { title: "Fair Construction", img: "fairconstruction.jpg", link: "https://fairconstruction.ca/", cat: "web" },
  { title: "Note App", img: "NoteApp.png", link: "https://miladmo68.github.io/Note-App/", cat: "app" },
  { title: "Tarahan Choob", img: "tarahanchoob.jpg", link: "#", cat: "web" },
  { title: "Todos Redux Toolkit", img: "Todos-Redux-Toolkit.png", link: "https://miladmo68.github.io/Todos-Redux-Toolkit/", cat: "app" },
  { title: "ShopEase", img: "ShopEase.png", link: "https://miladmo68.github.io/products", cat: "app" },
  { title: "Sky Contracting", img: "sky.jpg", link: "https://skyinc.ca/", cat: "web" },
  { title: "Quick Notes", img: "Quick-Notes.png", link: "https://miladmo68.github.io/QuickNotes/", cat: "app" },
  { title: "Countries Info App", img: "COUNTRIES-INFO-APP.png", link: "https://miladmo68.github.io/Countries-Info-App/#//", cat: "app" },
  { title: "Techfahm Systems", img: "Techfahm.jpg", link: "https://Techfahm.com/", cat: "web" },
  { title: "Fast Pizza", img: "fast-pizza.png", link: "https://miladmo68.github.io/fast-pizza/", cat: "app" },
  { title: "Image Gallery", img: "Image-Gallery.jpg", link: "https://miladmo68.github.io/Image-Gallery/", cat: "app" },
  { title: "Zarsa Gold", img: "zarsagold.jpg", link: "https://miladmo68.github.io/zarsa1/", cat: "web" },
  { title: "Countdown App", img: "Countdown.png", link: "https://miladmo68.github.io/Countdown/", cat: "app" },
  { title: "Bank App", img: "Bank-App.png", link: "https://miladmo68.github.io/Bank-App/", cat: "app" },
  { title: "Milad Web", img: "miladweb2.png", link: "https://miladmo68.github.io/Portfolio/", cat: "web" },
  { title: "E-commerce Store", img: "E-commerce-Store.png", link: "https://miladmo68.github.io/E-commerce-Store/", cat: "app" },
  { title: "Usepopcorn", img: "usepopcorn.jpg", link: "https://miladmo68.github.io/usepopcorn/", cat: "app" },
  { title: "Spa", img: "Spa.jpg", link: "#", cat: "web" },
  { title: "Gym App", img: "gym-app.jpg", link: "https://miladmo68.github.io/Gym-App/", cat: "app" },
  { title: "Task Manager", img: "Task-Manager.png", link: "https://miladmo68.github.io/Task-Manager/", cat: "app" },
  { title: "Jahan Ariya", img: "jahanariya.jpg", link: "#", cat: "web" },
  { title: "Travel List", img: "travel-list.png", link: "https://miladmo68.github.io/travel-list/", cat: "app" },
  { title: "Investment Calculator", img: "Investment-Calculator.png", link: "https://miladmo68.github.io/Investment-Calculator/", cat: "app" },
  { title: "Asiakar Auto", img: "asiakar.png", link: "#", cat: "web" },
  { title: "Play List", img: "PlayList.jpg", link: "https://miladmo68.github.io/PlayList/", cat: "app" },
  { title: "Movieland", img: "Movieland.jpg", link: "https://miladmo68.github.io/Movieland/", cat: "app" },
  { title: "Javan Food", img: "javanfood.png", link: "#", cat: "web" },
  { title: "Pokedex", img: "Pokedex.jpg", link: "https://miladmo68.github.io/Pokedex/", cat: "app" },
  { title: "Classy Weather", img: "classy-weather.jpg", link: "https://miladmo68.github.io/classy-weather/", cat: "app" },
  { title: "Samanor", img: "samanor.jpg", link: "#", cat: "web" },
  { title: "Quiz App", img: "Quiz-App.png", link: "https://miladmo68.github.io/react-quiz/", cat: "app" },
  { title: "Upload Image ▶ GDrive", img: "uploadImageToGoogleDrive.png", link: "https://github.com/miladmo68/upload-Image-To-Google-Drive", cat: "app" },
  { title: "Poya Josh", img: "poyajosh.jpg", link: "#", cat: "web" },
  { title: "Student System", img: "student-system.png", link: "https://github.com/miladmo68/student-system", cat: "app" },
  { title: "Sign Up", img: "SignUp.png", link: "https://miladmo68.github.io/SignUp/", cat: "app" },
  { title: "RAAGS", img: "RAAGS.jpg", link: "#", cat: "web" },
  { title: "Shopping Cart", img: "SHOPPING-CART.png", link: "https://miladmo68.github.io/Shopping-Cart/", cat: "app" },
  { title: "Google Login Registration", img: "Google-Login-Registration.png", link: "https://github.com/miladmo68/Google-Login-Registration", cat: "app" },
  { title: "Hefaz System", img: "hefazsystem.jpg", link: "#", cat: "web" },
  { title: "Full-stack Employment", img: "fullstack-employment.png", link: "https://github.com/miladmo68/Fullstack-Employment", cat: "app" },
  { title: "Food Recipe App", img: "Food-Recipe-App.png", link: "https://miladmo68.github.io/Food-Recipe-App/", cat: "app" },
  { title: "Milad Web 2", img: "milad.png", link: "#", cat: "web" },
  { title: "Expense Tracker", img: "Expense-Tracker.png", link: "https://miladmo68.github.io/Expense-Tracker/", cat: "app" },
  { title: "Contact API App", img: "Contact-API-App.png", link: "https://github.com/miladmo68/Contact-API-App", cat: "app" },
  { title: "Iran Golden", img: "irangolden.jpg", link: "#", cat: "web" },
  { title: "Feeder", img: "Feeder.jpg", link: "https://miladmo68.github.io/Feeder/", cat: "app" },
  { title: "Todo List", img: "Todo-List.jpg", link: "https://miladmo68.github.io/Todo-List/", cat: "app" },
  { title: "Auto Studio", img: "carstudio.jpg", link: "#", cat: "web" },
  { title: "Eat & Split", img: "eat-n-split.png", link: "https://miladmo68.github.io/eat-n-split/", cat: "app" },
  { title: "Octove Agency", img: "octove.jpg", link: "#", cat: "web" },
  { title: "PlacePicker", img: "Place-Picker.png", link: "https://miladmo68.github.io/Place-Picker/", cat: "app" },
  { title: "Bakirkoy Zeugma", img: "bakirkoyzeugmaapart.jpg", link: "#", cat: "web" },
  { title: "Chat App", img: "Chat-App.jpg", link: "https://miladmo68.github.io/Chat-App/", cat: "app" },
  { title: "Net Lady", img: "netlady.jpg", link: "#", cat: "web" },
  { title: "SpaceX", img: "SpaceX.jpg", link: "https://miladmo68.github.io/SpaceX/", cat: "app" },
  { title: "Ide System", img: "idesystem.jpg", link: "#", cat: "web" },
  { title: "Atomic Blog", img: "Atomic-blog.jpg", link: "https://miladmo68.github.io/Atomic-blog/", cat: "app" },
  { title: "Tasvir Bartar", img: "tasvirbartar.jpg", link: "#", cat: "web" },
  { title: "Workout Timer", img: "workout-timer.png", link: "https://miladmo68.github.io/workout-timer/", cat: "app" },
  { title: "MDF 14", img: "mdf14.jpg", link: "#", cat: "web" },
  { title: "Project Management", img: "Project-Management.png", link: "https://miladmo68.github.io/Project-Management/", cat: "app" },
  { title: "Insurance Darmani", img: "insurance-darmani.jpg", link: "#", cat: "web" },
  { title: "Quiz App 1", img: "Quiz-App1.png", link: "https://miladmo68.github.io/Quiz-App/", cat: "app" },
  { title: "Metal Works", img: "metal.jpg", link: "#", cat: "web" },
  { title: "Sidhu Clinic", img: "Sidhu-Clinic.jpg", link: "#", cat: "web" },
];

const CARD_W = 380;
const ASPECT_16_9 = "56.25%";

export default function Project() {
  const [filter, setFilter] = useState("all");
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef({});

  const [open, setOpen] = useState(false);
  const [modalImg, setImg] = useState("");
  const [modalTitle, setTitle] = useState("");

  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  /* FIX 1 — reset animation set when filter changes */
  const handleFilter = (val) => {
    setFilter(val);
    setVisibleCards(new Set());
    cardRefs.current = {};
  };

  /* FIX 2 — card entrance animation via IntersectionObserver */
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
  }, [filter]);

  const preview = (p) => {
    setImg(getImg(p.img));
    setTitle(p.title);
    setOpen(true);
  };

  return (
    <div className="container">
      <Box component="section" id="projects" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>

        {/* heading */}
        <Box textAlign="center" mb={{ xs: 4, sm: 5, md: 6 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" } }}
          >
            Portfolio
          </Typography>
          <Typography sx={{ maxWidth: 640, mx: "auto", mt: 1, px: 2, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
            A selection of my recent work. See more on{" "}
            <Box
              component="a"
              href="https://github.com/miladmo68"
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "underline", fontWeight: 500 }}
            >
              GitHub
            </Box>
            .
          </Typography>
        </Box>

        {/* filter chips */}
        <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mb={{ xs: 3, sm: 4, md: 5 }} px={2}>
          {FILTERS.map((f) => {
            const active = filter === f.value;
            return (
              <Chip
                key={f.value}
                label={f.label}
                clickable
                onClick={() => handleFilter(f.value)}
                sx={{
                  color: active ? "#ffffff" : "#252525",
                  backgroundColor: active ? "#1e3a8a" : "#f5f5f5",
                  border: "1px solid",
                  borderColor: active ? "#1e3a8a" : "#252525",
                  padding: "6px 10px",
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: active ? "#1e3a8a" : "#dbeafe",
                    color: active ? "#fff" : "#1e3a8a",
                    borderColor: "#1e3a8a",
                  },
                }}
              />
            );
          })}
        </Box>

        {/* project grid */}
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center" sx={{ px: { xs: 1, sm: 2 } }}>
          {visible.map((p, index) => {
            const isVisible = visibleCards.has(p.title);
            const delay = Math.min(index * 0.055, 0.7);

            return (
              <Grid
                key={`${filter}-${p.title}`}
                ref={(el) => (cardRefs.current[p.title] = el)}
                data-card-id={p.title}
                sx={{
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
                  elevation={4}
                  sx={{
                    width: { xs: "calc(100vw - 40px)", sm: 360, md: CARD_W },
                    maxWidth: CARD_W,
                    overflow: "hidden",
                    position: "relative",
                    /* light mode: clean white card */
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(30, 58, 138, 0.14)",
                    borderRadius: "12px",
                    /* dark mode: blue-tinted surface, clearly distinct from page bg */
                    ".dark-mode &": {
                      backgroundColor: "rgba(30, 58, 138, 0.22)",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                      backdropFilter: "blur(8px)",
                    },
                    transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1), box-shadow 0.32s ease, border-color 0.32s ease",
                    "&:hover": {
                      transform: "translateY(-7px) scale(1.018)",
                      boxShadow: "0 16px 48px rgba(30,58,138,0.45), 0 0 0 1px rgba(37,99,235,0.3)",
                      borderColor: "rgba(37, 99, 235, 0.55)",
                    },
                    ".dark-mode &:hover": {
                      boxShadow: "0 16px 48px rgba(59,130,246,0.35), 0 0 0 1px rgba(59,130,246,0.4)",
                      borderColor: "rgba(59, 130, 246, 0.55)",
                    },
                    "&:hover .overlay": {
                      transform: "translateY(0)",
                      opacity: 1,
                    },
                    "@media (hover: none)": {
                      "&:active": { transform: "scale(0.97)" },
                    },
                  }}
                >
                  {/* thumbnail */}
                  <Box position="relative" sx={{ width: "100%", pt: ASPECT_16_9 }}>
                    <Box
                      component="img"
                      src={getImg(p.img)}
                      alt={p.title}
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer",
                        transition: "transform 0.35s ease",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                      onClick={() => preview(p)}
                    />
                  </Box>

                  {/* FIX 3 — overlay: hover on desktop, always visible on mobile */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: 52,
                      background: "linear-gradient(to right, rgba(30,58,138,0.92), rgba(14,165,233,0.82))",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      px: 1,
                      gap: 1,
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
                      /* always show on touch/mobile — no hover on touch screens */
                      "@media (hover: none)": {
                        transform: "translateY(0)",
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{ flexGrow: 1, pl: 0.5, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
                    >
                      {p.title}
                    </Typography>

                    <Tooltip title="Preview">
                      <IconButton size="small" sx={{ color: "white" }} onClick={() => preview(p)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {p.link !== "#" && (
                      <Tooltip title="Visit">
                        <IconButton
                          size="small"
                          sx={{ color: "white" }}
                          component="a"
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* preview dialog */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="lg"
          fullWidth
          sx={{ ".MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,.9)" } }}
        >
          <DialogTitle
            sx={{
              p: 1.2,
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#3a3a3a",
              color: "#fff",
            }}
          >
            {modalTitle}
            <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={{ p: 0, display: "flex", justifyContent: "center", bgcolor: "transparent" }}
          >
            <Box
              component="img"
              src={modalImg}
              alt={modalTitle}
              sx={{ width: "100%", height: "auto" }}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
}
