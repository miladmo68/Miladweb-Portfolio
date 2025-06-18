// ──────────────────────────────────────────────────────────────
// src/components/Project.jsx
// uniform 16 : 9 cards • slide-up overlay • custom filter-chip colours
// ──────────────────────────────────────────────────────────────
import React, { useState } from "react";
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

/* 3 ▸ FULL PROJECT ARRAY (unchanged names / order) */
const PROJECTS = [
  // ——— Web Apps ———
  {
    title: "Millionaire Quiz",
    img: "Millionaire-Quiz.png",
    link: "https://miladmo68.github.io/Millionaire-Quiz/",
    cat: "app",
  },
  {
    title: "Tic-Tac-Toe",
    img: "tic-tac-toe.png",
    link: "https://miladmo68.github.io/tic-tac-toe/",
    cat: "app",
  },
  {
    title: "Expenses",
    img: "expenses.jpg",
    link: "https://miladmo68.github.io/expenses/",
    cat: "app",
  },
  {
    title: "Fast Pizza",
    img: "fast-pizza.png",
    link: "https://miladmo68.github.io/fast-pizza/",
    cat: "app",
  },
  {
    title: "Image Gallery",
    img: "Image-Gallery.jpg",
    link: "https://miladmo68.github.io/Image-Gallery/",
    cat: "app",
  },
  {
    title: "Countdown App",
    img: "Countdown.png",
    link: "https://miladmo68.github.io/Countdown/",
    cat: "app",
  },
  {
    title: "Bank App",
    img: "Bank-App.png",
    link: "https://miladmo68.github.io/Bank-App/",
    cat: "app",
  },
  {
    title: "Usepopcorn",
    img: "usepopcorn.jpg",
    link: "https://miladmo68.github.io/usepopcorn/",
    cat: "app",
  },
  {
    title: "Gym App",
    img: "gym-app.jpg",
    link: "https://miladmo68.github.io/Gym-App/",
    cat: "app",
  },
  {
    title: "Travel List",
    img: "travel-list.png",
    link: "https://miladmo68.github.io/travel-list/",
    cat: "app",
  },
  {
    title: "Investment Calculator",
    img: "Investment-Calculator.png",
    link: "https://miladmo68.github.io/Investment-Calculator/",
    cat: "app",
  },
  {
    title: "Play List",
    img: "PlayList.jpg",
    link: "https://miladmo68.github.io/PlayList/",
    cat: "app",
  },
  {
    title: "Movieland",
    img: "Movieland.jpg",
    link: "https://miladmo68.github.io/Movieland/",
    cat: "app",
  },
  {
    title: "Pokedex",
    img: "Pokedex.jpg",
    link: "https://miladmo68.github.io/Pokedex/",
    cat: "app",
  },
  {
    title: "Classy Weather",
    img: "classy-weather.jpg",
    link: "https://miladmo68.github.io/classy-weather/",
    cat: "app",
  },
  {
    title: "Quiz App",
    img: "Quiz-App.png",
    link: "https://miladmo68.github.io/react-quiz/",
    cat: "app",
  },
  {
    title: "Upload Image ▶ GDrive",
    img: "uploadImageToGoogleDrive.png",
    link: "https://github.com/miladmo68/upload-Image-To-Google-Drive",
    cat: "app",
  },
  {
    title: "Student System",
    img: "student-system.png",
    link: "https://github.com/miladmo68/student-system",
    cat: "app",
  },
  {
    title: "Sign Up",
    img: "SignUp.png",
    link: "https://miladmo68.github.io/SignUp/",
    cat: "app",
  },
  {
    title: "Shopping Cart",
    img: "SHOPPING-CART.png",
    link: "https://miladmo68.github.io/Shopping-Cart/",
    cat: "app",
  },
  {
    title: "Google Login Registration",
    img: "Google-Login-Registration.png",
    link: "https://github.com/miladmo68/Google-Login-Registration",
    cat: "app",
  },
  {
    title: "Full-stack Employment",
    img: "fullstack-employment.png",
    link: "https://github.com/miladmo68/Fullstack-Employment",
    cat: "app",
  },
  {
    title: "Food Recipe App",
    img: "Food-Recipe-App.png",
    link: "https://miladmo68.github.io/Food-Recipe-App/",
    cat: "app",
  },
  {
    title: "Expense Tracker",
    img: "Expense-Tracker.png",
    link: "https://miladmo68.github.io/Expense-Tracker/",
    cat: "app",
  },
  {
    title: "Contact API App",
    img: "Contact-API-App.png",
    link: "https://github.com/miladmo68/Contact-API-App",
    cat: "app",
  },
  {
    title: "Feeder",
    img: "Feeder.jpg",
    link: "https://miladmo68.github.io/Feeder/",
    cat: "app",
  },
  {
    title: "Todo List",
    img: "Todo-List.jpg",
    link: "https://miladmo68.github.io/Todo-List/",
    cat: "app",
  },
  {
    title: "Eat & Split",
    img: "eat-n-split.png",
    link: "https://miladmo68.github.io/eat-n-split/",
    cat: "app",
  },
  {
    title: "PlacePicker",
    img: "Place-Picker.png",
    link: "https://miladmo68.github.io/Place-Picker/",
    cat: "app",
  },
  {
    title: "Chat App",
    img: "Chat-App.jpg",
    link: "https://miladmo68.github.io/Chat-App/",
    cat: "app",
  },
  {
    title: "SpaceX",
    img: "SpaceX.jpg",
    link: "https://miladmo68.github.io/SpaceX/",
    cat: "app",
  },
  {
    title: "Atomic Blog",
    img: "Atomic-blog.jpg",
    link: "https://miladmo68.github.io/Atomic-blog/",
    cat: "app",
  },
  {
    title: "Workout Timer",
    img: "workout-timer.png",
    link: "https://miladmo68.github.io/workout-timer/",
    cat: "app",
  },
  {
    title: "Project Management",
    img: "Project-Management.png",
    link: "https://miladmo68.github.io/Project-Management/",
    cat: "app",
  },
  {
    title: "Quiz App (alt.)",
    img: "Quiz-App1.png",
    link: "https://miladmo68.github.io/Quiz-App/",
    cat: "app",
  },

  // ——— Web Designs ———
  {
    title: "Intershine",
    img: "intershine.png",
    link: "https://intershine.ca/",
    cat: "web",
  },
  {
    title: "Fair Construction",
    img: "fairconstruction.jpg",
    link: "https://fairconstruction.ca/",
    cat: "web",
  },
  {
    title: "Tarahan Choob",
    img: "tarahanchoob.jpg",
    link: "https://tarahanchoob.com/",
    cat: "web",
  },
  {
    title: "Sky Contracting",
    img: "sky.jpg",
    link: "https://skyinc.ca/",
    cat: "web",
  },
  {
    title: "Techfahm Systems",
    img: "Techfahm.jpg",
    link: "https://Techfahm.com/",
    cat: "web",
  },
  { title: "Zarsa Gold", img: "zarsagold.jpg", link: "#", cat: "web" },
  { title: "Milad Web", img: "milad.png", link: "#", cat: "web" },
  { title: "Spa", img: "Spa.jpg", link: "#", cat: "web" },
  { title: "Jahan Ariya", img: "jahanariya.jpg", link: "#", cat: "web" },
  { title: "Asiakar Auto", img: "asiakar.png", link: "#", cat: "web" },
  { title: "Javan Food", img: "javanfood.png", link: "#", cat: "web" },
  { title: "Samanor", img: "samanor.jpg", link: "#", cat: "web" },
  { title: "Poya Josh", img: "poyajosh.jpg", link: "#", cat: "web" },
  { title: "RAAGS", img: "RAAGS.jpg", link: "#", cat: "web" },
  { title: "Hefaz System", img: "hefazsystem.jpg", link: "#", cat: "web" },
  { title: "Iran Golden", img: "irangolden.jpg", link: "#", cat: "web" },
  { title: "Auto Studio", img: "carstudio.jpg", link: "#", cat: "web" },
  {
    title: "Bakirkoy Zeugma",
    img: "bakirkoyzeugmaapart.jpg",
    link: "#",
    cat: "web",
  },
  { title: "Octove Agency", img: "octove.jpg", link: "#", cat: "web" },
  { title: "Net Lady", img: "netlady.jpg", link: "#", cat: "web" },
  { title: "Ide System", img: "idesystem.jpg", link: "#", cat: "web" },
  { title: "Tasvir Bartar", img: "tasvirbartar.jpg", link: "#", cat: "web" },
  { title: "MDF 14", img: "mdf14.jpg", link: "#", cat: "web" },
  {
    title: "Insurance Darmani",
    img: "insurance-darmani.jpg",
    link: "#",
    cat: "web",
  },
  { title: "Metal Works", img: "metal.jpg", link: "#", cat: "web" },
  { title: "Sidhu Clinic", img: "Sidhu-Clinic.jpg", link: "#", cat: "web" },
];

/* 4 ▸ card settings */
const CARD_W = 380;
const ASPECT_16_9 = "56.25%"; // 16:9 ⇒  9 / 16

/* 5 ▸ component */
export default function Project() {
  const [filter, setFilter] = useState("all");
  const visible =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);

  /* modal state */
  const [open, setOpen] = useState(false);
  const [modalImg, setImg] = useState("");
  const [modalTitle, setTitle] = useState("");

  const preview = (p) => {
    setImg(getImg(p.img));
    setTitle(p.title);
    setOpen(true);
  };

  return (
    <Box component="section" id="projects" sx={{ py: 8 }}>
      {/* heading */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight={700}>
          Portfolio
        </Typography>
        <Typography sx={{ maxWidth: 640, mx: "auto", mt: 1 }}>
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
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={1}
        mb={5}
      >
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <Chip
              key={f.value}
              label={f.label}
              clickable
              onClick={() => setFilter(f.value)}
              sx={{
                color: active ? "#ffffff" : "#252525",

                // color: "#3b3b3b", // text always white
                backgroundColor: active ? "#5000ca" : "#f5f5f5",
                border: "1px solid",
                borderColor: active ? "#5000ca" : "#252525",
                padding: "6px 10px",
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: active ? "#5000ca" : "#e7d8fd",
                  color: active ? "#fff" : "#5000ca",
                  borderColor: "#5000ca",
                },
              }}
            />
          );
        })}
      </Box>

      {/* project grid */}
      <Grid container spacing={4} justifyContent="center">
        {visible.map((p) => (
          <Grid item key={p.title}>
            <Card
              elevation={4}
              sx={{
                width: CARD_W,
                overflow: "hidden",
                position: "relative",
                transition: "transform .25s",
                "&:hover": { transform: "scale(1.04)" },
                "&:hover .overlay": { transform: "translateY(0)", opacity: 1 },
              }}
            >
              {/* thumbnail */}
              <Box
                sx={{
                  width: "100%",
                  pt: ASPECT_16_9,
                  backgroundImage: `url(${getImg(p.img)})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
                onClick={() => preview(p)}
              />

              {/* overlay bar */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 56,
                  bgcolor: "rgba(0,0,0,0.7)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                  gap: 1,
                  transform: "translateY(100%)",
                  opacity: 0,
                  transition: "all .25s",
                }}
              >
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ flexGrow: 1, pl: 0.5 }}
                >
                  {p.title}
                </Typography>

                <Tooltip title="Preview">
                  <IconButton
                    size="small"
                    sx={{ color: "white" }}
                    onClick={() => preview(p)}
                  >
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
        ))}
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
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "transparent",
          }}
        >
          {modalTitle}
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "center",
            bgcolor: "transparent",
          }}
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
  );
}
